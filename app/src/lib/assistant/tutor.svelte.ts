import type { Settings, Issue } from '../types';
import {
  complete,
  isCancelled,
  issueFor,
  type ChatMessage,
  type ToolDefinition
} from '../providers';
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  source?: 'voice' | 'text';
}
export type ExecuteTool = (
  name: string,
  args: Record<string, unknown>,
  signal: AbortSignal,
  request: string
) => Promise<unknown>;

export class Tutor {
  messages = $state<Message[]>([]);
  thinking = $state(false);
  issue = $state<Issue | null>(null);
  private controller?: AbortController;
  private generation = 0;
  lastQuestion = '';
  constructor(
    private settings: () => Settings,
    private context: () => Promise<string>,
    private tools: ToolDefinition[],
    private execute: ExecuteTool
  ) {}
  async ask(question: string, retry = false) {
    if (!question.trim() || this.thinking) return;
    this.lastQuestion = question;
    this.cancel();
    this.issue = null;
    this.thinking = true;
    if (!retry)
      this.messages.push({ id: crypto.randomUUID(), role: 'user', text: question, source: 'text' });
    const controller = (this.controller = new AbortController());
    const generation = this.generation;
    try {
      const input: ChatMessage[] = [
        { role: 'system', content: await this.context() },
        ...this.messages.slice(-20).map((m) => ({ role: m.role, content: m.text }))
      ];
      for (let i = 0; i < 7; i++) {
        const result = await complete(this.settings(), input, controller.signal, this.tools);
        if (generation !== this.generation) return;
        input.push(result);
        if (result.tool_calls?.length) {
          for (const call of result.tool_calls) {
            controller.signal.throwIfAborted();
            let output: unknown;
            try {
              output = await this.execute(
                call.function.name,
                JSON.parse(call.function.arguments),
                controller.signal,
                question
              );
            } catch (error) {
              controller.signal.throwIfAborted();
              output = { error: issueFor(error).message };
            }
            input.push({ role: 'tool', tool_call_id: call.id, content: JSON.stringify(output) });
          }
        } else {
          this.messages.push({
            id: crypto.randomUUID(),
            role: 'assistant',
            text: result.content || 'Please try asking about one passage.',
            source: 'text'
          });
          return;
        }
      }
      throw new Error('The tutor needed too many steps. Try a more specific question.');
    } catch (error) {
      if (generation === this.generation && !isCancelled(error)) this.issue = issueFor(error);
    } finally {
      if (generation === this.generation) this.thinking = false;
    }
  }
  cancel() {
    this.generation++;
    this.controller?.abort();
    this.thinking = false;
  }
  clear() {
    this.cancel();
    this.messages = [];
    this.issue = null;
  }
  transcript(id: string, role: Message['role'], text: string, delta = false) {
    let entry = this.messages.find((message) => message.id === id);
    if (!entry) {
      entry = { id, role, text: '', source: 'voice' };
      this.messages.push(entry);
      entry = this.messages.at(-1)!;
    }
    entry.text = delta ? entry.text + text : text;
  }
}
