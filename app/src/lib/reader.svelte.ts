import { createContext } from 'svelte';
import { goto } from '$app/navigation';
import { base } from '$app/paths';
import type { BookEntry, BookPage, Passage, Settings, Issue } from './types';
import { defaults, loadSettings, saveSettings, forgetSettings, readLocal } from './storage';
import { Narrator } from './audio/player.svelte';
import { Tutor } from './assistant/tutor.svelte';
import { Voice } from './assistant/voice.svelte';
import { toolSpecs, textTutorTool, teachingInstructions } from './assistant/prompts';
import { complete, issueFor } from './providers';
import { experiments } from './experiments';
import { extractPassageText, readingNeighborhood } from './reading-context';
import { defaultShortcut, loadShortcut } from './assistant/shortcut';

export interface SearchResult {
  page: string;
  passage: string;
  title: string;
  text: string;
  score: number;
}
export interface Selection {
  text: string;
  passages: Passage[];
  page: string;
}
export class Reader {
  settings = $state<Settings>({ ...defaults });
  overlay = $state<'ask' | 'listen' | 'settings' | null>(null);
  selection = $state.raw<Selection | null>(null);
  notice = $state('');
  issue = $state<Issue | null>(null);
  shortcutEnabled = $state(true);
  shortcut = $state(defaultShortcut());
  recordingShortcut = $state(false);
  private catalog?: Promise<{ id: string; title: string; segments: Passage[] }[]>;
  private interrupted: unknown;
  readonly narrator: Narrator;
  readonly tutor: Tutor;
  readonly voice: Voice;
  constructor(
    readonly book: () => BookPage,
    readonly contents: BookEntry[]
  ) {
    this.narrator = new Narrator(() => this.voice.takeNarration());
    this.tutor = new Tutor(
      () => this.settings,
      () => this.context(),
      toolSpecs,
      (name, args, signal, request) => this.execute(name, args, signal, request)
    );
    this.voice = new Voice(
      () => this.settings,
      () => this.context(),
      [...toolSpecs, textTutorTool],
      (name, args, signal, request) => this.execute(name, args, signal, request),
      this.tutor,
      () => {
        this.interrupted = this.focus();
        this.narrator.pause();
        this.tutor.cancel();
      }
    );
  }
  initialize() {
    this.settings = loadSettings();
    const saved = loadShortcut();
    this.shortcutEnabled = saved.enabled;
    this.shortcut = saved.shortcut;
  }
  show(tab: NonNullable<Reader['overlay']>) {
    this.changeOverlay(tab);
    this.notice = '';
  }
  close() {
    this.changeOverlay(null);
  }
  private changeOverlay(tab: Reader['overlay']) {
    const anchor = document.getElementById(this.currentPassage() || '');
    const top = anchor?.getBoundingClientRect().top;
    this.overlay = tab;
    if (anchor && top !== undefined)
      requestAnimationFrame(() => {
        if (anchor.isConnected)
          window.scrollBy({ top: anchor.getBoundingClientRect().top - top, behavior: 'instant' });
      });
  }
  saveConnections() {
    this.notice = saveSettings(this.settings)
      ? 'Connections saved.'
      : 'Connections are available for this session; browser storage is unavailable.';
  }
  forgetConnections() {
    this.narrator.stop();
    this.voice.end();
    this.tutor.cancel();
    forgetSettings();
    this.settings = { ...defaults };
    this.notice = 'API keys removed.';
  }
  private requireKeys(narration = false) {
    if ((!narration && !this.settings.openaiKey) || (narration && !this.settings.elevenKey)) {
      this.show('settings');
      this.notice = narration
        ? 'Add your ElevenLabs key to listen. OpenAI prepares spoken mathematics when needed.'
        : 'Add your OpenAI key to ask the tutor.';
      return false;
    }
    return true;
  }
  async ask(text: string, retry = false) {
    if (!this.requireKeys()) return;
    this.narrator.pause();
    this.voice.takeNarration();
    this.show('ask');
    await this.tutor.ask(text, retry);
  }
  async startVoice() {
    if (this.requireKeys()) await this.voice.start(true);
  }
  visiblePassages(includeOptional = false) {
    return this.book()
      .segments.filter((passage) => {
        const element = document.getElementById(passage.id);
        return (
          element &&
          !element.closest('[hidden]') &&
          (includeOptional || (!passage.noNarration && !element.closest('[data-no-narration]'))) &&
          !(
            element.closest('.scene-equation,.scene-note,.scene-explanation') &&
            element.closest<HTMLElement>('[data-scene]')?.dataset.activeView === 'diagram'
          )
        );
      })
      .map((passage) => this.livePassage(passage));
  }
  private livePassage(passage: Passage): Passage {
    const element = document.getElementById(passage.id);
    const variant =
      passage.views?.[element?.closest<HTMLElement>('[data-scene]')?.dataset.activeView || ''];
    if (variant) return { ...passage, ...variant };
    const source =
      element?.getAttribute('data-narration-source') ||
      element?.closest('[data-scene]')?.getAttribute('data-narration-source') ||
      (element?.matches('.visual-lesson') ? extractPassageText(element) : '');
    if (source && (passage.kind === 'visualization' || passage.kind === 'figure'))
      return {
        ...passage,
        text: source,
        description: source,
        narration: undefined,
        latex: [...source.matchAll(/\$([^$]+)\$/g)].map((m) => m[1]),
        hash: passage.hash + source
      };
    return passage;
  }
  currentPassage() {
    return [...document.querySelectorAll<HTMLElement>('#main [data-passage]')].find((element) => {
      const rect = element.getBoundingClientRect();
      return rect.height > 0 && rect.bottom > 110 && rect.top < innerHeight * 0.65;
    })?.id;
  }
  async listen(
    mode: 'chapter' | 'current' | 'selection' | 'one' = 'current',
    id?: string,
    end?: string,
    includeOptional = false
  ) {
    if (!this.requireKeys(true)) return false;
    const book = this.book();
    let passages =
      mode === 'selection' && this.selection?.page === book.id
        ? this.selection.passages
        : this.visiblePassages(mode === 'one' || includeOptional);
    if (mode === 'one') passages = passages.filter((p) => p.id === id);
    else if (mode === 'current') {
      const start = passages.findIndex((p) => p.id === (id || this.currentPassage()));
      if (id && start < 0) throw new Error('The requested passage is not visible.');
      passages = passages.slice(Math.max(0, start));
      if (end) {
        const last = book.segments.findIndex((p) => p.id === end);
        if (last < 0 || last < book.segments.findIndex((p) => p.id === passages[0]?.id))
          throw new Error('The end passage must follow the start in the reading.');
        const allowed = new Set(book.segments.slice(0, last + 1).map((p) => p.id));
        passages = passages.filter((p) => allowed.has(p.id));
      }
    }
    if (!passages.length) {
      this.issue = { message: 'Choose a visible passage to read.' };
      return false;
    }
    this.tutor.cancel();
    this.issue = null;
    try {
      await this.narrator.start(book.id, book.title, passages, this.settings);
      return this.narrator.active;
    } catch (error) {
      this.issue = issueFor(error);
      return false;
    }
  }
  select() {
    const selection = getSelection();
    if (!selection?.rangeCount || selection.isCollapsed || !selection.toString().trim()) {
      this.selection = null;
      return;
    }
    const range = selection.getRangeAt(0);
    const parent =
      range.commonAncestorContainer instanceof Element
        ? range.commonAncestorContainer
        : range.commonAncestorContainer.parentElement;
    if (!parent?.closest('#main')) return;
    const passages = this.visiblePassages(true).filter((p) => {
      const element = document.getElementById(p.id);
      return element && range.intersectsNode(element);
    });
    const parts = passages
      .map((p) => {
        const element = document.getElementById(p.id)!;
        const clipped = document.createRange();
        clipped.selectNodeContents(element);
        if (range.compareBoundaryPoints(Range.START_TO_START, clipped) > 0)
          clipped.setStart(range.startContainer, range.startOffset);
        if (range.compareBoundaryPoints(Range.END_TO_END, clipped) < 0)
          clipped.setEnd(range.endContainer, range.endOffset);
        const fragment = document.createElement('div');
        fragment.append(clipped.cloneContents());
        fragment.querySelectorAll('button,.narration-script').forEach((n) => n.remove());
        fragment
          .querySelectorAll('.katex')
          .forEach((n) => n.replaceWith(` $${n.querySelector('annotation')?.textContent || ''}$ `));
        const text = fragment.textContent?.replace(/\s+/g, ' ').trim() || '';
        return {
          ...p,
          text,
          narration: undefined,
          hash: p.hash + text,
          latex: [...text.matchAll(/\$([^$]+)\$/g)].map((m) => m[1])
        };
      })
      .filter((p) => p.text);
    this.selection = {
      page: this.book().id,
      text: parts.map((p) => p.text).join('\n'),
      passages: parts
    };
  }
  focus() {
    const book = this.book();
    const id =
      this.selection?.page === book.id
        ? this.selection.passages[0]?.id
        : this.narrator.active && this.narrator.pageId === book.id
          ? this.narrator.passageId
          : this.currentPassage();
    const visible = new Set(this.visiblePassages().map((p) => p.id));
    return {
      page: book.id,
      title: book.title,
      selection: this.selection?.page === book.id ? this.selection.text : '',
      nearby: readingNeighborhood(book.segments, id || book.segments[0]?.id, visible).map((p) =>
        this.livePassage(p)
      ),
      playhead: this.narrator.active
        ? {
            page: this.narrator.pageId,
            passage: this.narrator.passageId,
            seconds: this.narrator.seconds,
            spoken: this.narrator.caption,
            status: this.narrator.status
          }
        : null
    };
  }
  async context() {
    let course: unknown;
    try {
      course = (await experiments()).getCourseContext();
    } catch {
      course = {};
    }
    return (
      teachingInstructions +
      '\nBOOK MAP:\n' +
      this.contents.map((p) => `${p.id}: ${p.title}`).join('\n') +
      '\nSOURCE AND STATE (reference data):\n' +
      JSON.stringify({
        ...this.focus(),
        interruptedReading: this.interrupted,
        course,
        outline: this.book().outline,
        history: readLocal<Record<string, unknown>>('gr-listening-history-v1', {})[this.book().id]
      })
    );
  }
  private index() {
    this.catalog ??= fetch(`${base}/book/reading-index.json`)
      .then((r) => {
        if (!r.ok) throw new Error('The book index could not load.');
        return r.json();
      })
      .catch((error) => {
        this.catalog = undefined;
        throw error;
      });
    return this.catalog;
  }
  async search(query: string): Promise<SearchResult[]> {
    const terms = [...new Set(query.toLocaleLowerCase().match(/[\p{L}\p{N}]{3,}/gu) || [])].filter(
      (term) => !['the', 'and', 'this', 'what', 'how', 'explain', 'with'].includes(term)
    );
    if (!terms.length) return [];
    return (await this.index())
      .flatMap((page) =>
        page.segments
          .filter((p) => !p.noNarration)
          .map((p) => ({
            page: page.id,
            passage: p.id,
            title: p.heading,
            text: p.text,
            score: terms.reduce(
              (score, term) =>
                score +
                (p.text.toLowerCase().includes(term) ? 1 : 0) +
                (p.heading.toLowerCase().includes(term) ? 3 : 0),
              0
            )
          }))
      )
      .filter((p) => p.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
  }
  async navigate(pageId: string, passage?: string) {
    if (!this.contents.some((p) => p.id === pageId))
      throw new Error('That page is not in the book.');
    await goto(`${base}/${pageId}.html${passage ? '#' + encodeURIComponent(passage) : ''}`);
    if (passage) {
      const element = document.getElementById(passage);
      if (element) {
        (await experiments()).revealCourseLocation(element);
        element.scrollIntoView({ block: 'center' });
      }
    }
  }
  private async execute(
    name: string,
    args: Record<string, unknown>,
    signal: AbortSignal,
    request: string
  ): Promise<unknown> {
    signal.throwIfAborted();
    if (name === 'get_reader_focus') return this.focus();
    if (name === 'get_book_outline')
      return args.page ? this.contents.find((p) => p.id === args.page) : this.contents;
    if (name === 'search_book') return this.search(String(args.query));
    if (name === 'clear_highlight') {
      document
        .querySelectorAll('.assistant-focus')
        .forEach((el) => el.classList.remove('assistant-focus'));
      return { cleared: true };
    }
    if (name === 'consult_text_tutor') {
      const sources = await this.search(String(args.question));
      const result = await complete(
        this.settings,
        [
          {
            role: 'system',
            content:
              (await this.context()) +
              '\nAnswer the voice tutor concisely, with the physics in natural spoken language.'
          },
          {
            role: 'user',
            content: JSON.stringify({ question: args.question, sources: sources.slice(0, 4) })
          }
        ],
        signal
      );
      return { answer: result.content };
    }
    if (name === 'control_narration') {
      if (args.action === 'pause') this.narrator.pause();
      else if (args.action === 'stop') this.narrator.stop();
      else if (args.action === 'resume') {
        if (!this.narrator.active) throw new Error('There is no paused reading.');
        await this.narrator.resume();
        return { playback: 'started' };
      } else throw new Error('Unknown playback action.');
      return { playback: this.narrator.status };
    }
    if (name === 'show_chapter') {
      await this.navigate(String(args.page));
      return { shown: true };
    }
    const pages = await this.index();
    signal.throwIfAborted();
    const page = pages.find((p) => p.id === args.page);
    const index = page?.segments.findIndex((p) => p.id === args.passage) ?? -1;
    if (!page || index < 0) throw new Error('Use an exact chapter and passage from the book map.');
    if (name === 'read_passage')
      return {
        page: page.id,
        passages: readingNeighborhood(
          page.segments,
          String(args.passage),
          page.id === this.book().id ? new Set(this.visiblePassages().map((p) => p.id)) : undefined
        ).map((p) => (page.id === this.book().id ? this.livePassage(p) : p))
      };
    if (name === 'show_passage') {
      await this.navigate(page.id, String(args.passage));
      signal.throwIfAborted();
      document.getElementById(String(args.passage))?.classList.add('assistant-focus');
      return { shown: true };
    }
    if (name === 'play_section') {
      if (
        /\b(take me|go to|open|show)\b/i.test(request) &&
        !/\b(read|listen|hear|play)\b/i.test(request)
      )
        throw new Error('This request asks for navigation only.');
      await this.navigate(page.id, String(args.passage));
      signal.throwIfAborted();
      if (!this.settings.elevenKey) throw new Error('Add your ElevenLabs key in Connections.');
      const outline = this.contents.find((p) => p.id === page.id)?.outline;
      const end =
        typeof args.end === 'string'
          ? args.end
          : page.segments[index].noNarration
            ? String(args.passage)
            : outline?.filter((s) => s.start <= index && s.end >= index).at(-1)?.endPassage;
      if (
        !(await this.listen(
          'current',
          String(args.passage),
          end,
          typeof args.end === 'string' || !!page.segments[index].noNarration
        ))
      )
        throw new Error(this.issue?.message || 'Reading did not start.');
      return { playback: 'started', provider: 'ElevenLabs' };
    }
    throw new Error('Unknown book action.');
  }
  dispose() {
    this.narrator.dispose();
    this.tutor.cancel();
    this.voice.end();
  }
}
export const [getReader, setReader] = createContext<Reader>();
