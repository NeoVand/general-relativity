# SvelteKit reader

A new Svelte 5 / SvelteKit application with strict TypeScript. The manuscript,
figures, course records, notebook data format, and calibrated physics models remain
shared with the original application at the repository root.

## Run locally

Use Node 24 or later. From the repository root:

```sh
npm ci
npm --prefix app ci
npm run dev:v2
```

Open http://127.0.0.1:5173/chapter-0.html. The first step installs the dependencies
used by the shared content builders; the second installs the new application.
Reading, experiments, search, and the notebook work without API keys. Add your
own provider credentials in **Ask → Connections** to use the companion.

## Build and verify

```sh
npm run build:v2
npm run check:v2
npm run test:v2
npm run test:v2:browser
```

The browser suite starts the development server automatically if needed. It uses
local Chrome on macOS, or Playwright Chromium elsewhere (install with
`cd app && npx playwright install chromium`). All provider calls in these tests
are mocked; they do not spend account credits. `BOOK_URL` can point the suite at
an already running server.

`npm --prefix app run format:check` checks formatting. Output from the static
build is in `app/build/`. Existing chapter `.html` URLs and anchors are preserved.
For a subdirectory host, use `BASE_PATH=/general-relativity npm run build:v2`.
The existing Pages workflow continues to publish the original application until
a separate cutover; this change does not deploy anything.

## Boundaries

- `src/routes/` owns routing and a persistent reader layout. A reader context is
  created per layout, rather than storing user state in a shared server module.
- `src/lib/components/` contains the reader controls, nonmodal floating companion,
  compact listening panel and player, header search, grouped icon sidebar, and account settings.
- `src/lib/assistant/` owns typed chat, WebRTC voice, cancellation, custom
  shortcuts, and book-tool handoffs. Microphone capture and playback have
  separate states; closing the window keeps the session available in the player. The book stays interactive. Wide screens reserve reading space beside the window; mobile uses a compact floating panel.
- `src/lib/audio/` groups adjacent source passages, prepares mathematical speech,
  maps timestamps back to passages and words, and schedules decoded audio on one
  AudioContext timeline. It prebuffers about two minutes and retains about a
  minute behind the playhead. Finished audio remains available in the disk cache.
- `src/lib/providers.ts` handles provider responses, bounded retries for transient
  HTTP failures, cancellation, and detailed final errors. Expected cancellation
  does not surface an error. Request details are available inline if recovery fails.
- `src/lib/storage.ts` keeps the established settings, notebook, and listening
  history formats. Keys remain tab-scoped unless remembering them is enabled.
- `scripts/prepare.ts` runs the shared content builders into `app/.book-build`,
  imports authored content and metadata, and bundles the existing laboratory
  runtime behind the typed adapter in `src/lib/experiments.ts`. Generated files
  are ignored. The old reader, router, and companion are not loaded in this app.

The laboratory runtime and manuscript builders are still the existing JavaScript
modules. They are deliberately retained with their scientific validation suites;
this is not a claim that every model has already been converted to TypeScript.
They can be moved to typed modules and individual Svelte components incrementally.

## Listening and voice behavior

Adjacent paragraphs, headings, and mathematical explanations share longer audio
requests. Supported ElevenLabs models receive preceding text for continuity;
Eleven v3 does not support that parameter. Audio is scheduled continuously when
the next clip is ready. A network stall may still cause buffering, and audible
prosody needs a listening review with the selected real voice.

The player has pause/resume, 15-second skips, speed, stop, and optional captions.
It has no per-clip progress bar. **Listening → Spoken explanations** allows editing
the current passage, saving it locally, and replaying the correction. Corrections
are keyed to the source hash so changed manuscript text does not inherit stale
speech. Prior-version generated audio is left in place but is not reused for the
new grouped requests.

Holding the configured shortcut interrupts reading without focusing the controls
or opening the dialog. Releasing it turns off the microphone before sending the
question. Navigation tools wait for spoken output to finish; stale interrupted
turns cannot perform actions. End voice closes microphone tracks and the peer
connection. Typed conversations and active reading survive chapter navigation.

## Validation performed

The new suite covers inline mathematics on desktop and mobile, all 37 page
routes, readable space beside chat, sidebar collapse and flyouts, header search, Earth texture loading, button contrast, floating equation tools, safe tutor math, conversation persistence, narration
batching and previous-text context, pause/resume and cancellation, editable
speech, retries, source boundaries, diagnostics, notebook persistence, voice
interruption, delayed tool execution, and microphone cleanup.

The existing polar-coordinate and four relativity-laboratory suites also pass
against this app on desktop and mobile, including controls, persistence, CSV
exports, notebook restoration, and no-JavaScript content. Provider behavior is
verified with mocks; live OpenAI/ElevenLabs calls and subjective voice quality have
not been evaluated in this development pass.
