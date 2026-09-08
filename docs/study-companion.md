# The talking textbook

The book now has a persistent Svelte 5 reader, built with Vite and deployed as static HTML on GitHub Pages. The original chapter URLs, anchors, pre-rendered LaTeX, SVG figures, and Three.js labs remain available. Client navigation replaces the chapter without replacing the companion, audio player, or voice call. The ordinary book is still readable with JavaScript disabled.

## Using it

Open **Listen** or **Ask** in the bottom-right corner. Under **Connections**, enter your OpenAI and ElevenLabs keys, choose a narrator, and save. **Find voices** retrieves the voices available to your ElevenLabs account. Select GPT-5.6 Terra or Sol for the text tutor and spoken explanations. Live conversation uses GPT Realtime 2.1, with its own selectable OpenAI voice.

- Listen to a whole chapter, start at the visible passage, or select text and read its containing passages.
- Equations and figures have small Listen and Explain actions. The landing-page Earth animation stays free of controls.
- Pause, resume, skip, replay, change speed, or turn off automatic scrolling. One following passage is prepared while the current passage plays.
- Inspect, edit, or regenerate the current spoken explanation. Prepare a chapter's explanations ahead of listening if desired.
- Ask by typing, or explicitly start a microphone conversation. The tutor can search the book, read a passage, and navigate to and highlight an exact source passage. Mute and End call release control of the microphone appropriately; closing the panel leaves an active call available from Ask.

## Narration and grounding

The build creates stable, addressable passages for prose, headings, exercise questions, tables, displayed equations, figures, and 3D visualizations. Equations retain their source LaTeX. SVG narration includes the explicit LaTeX labels, accessible description, and caption. Three.js narration includes the scene's physical explanation, formula, and limitations. Nearby manuscript paragraphs accompany each construct as context.

Ordinary prose can be spoken directly. Before speaking a mathematical or visual passage, the selected OpenAI model generates a separate natural-language explanation: what the relationship means, how its important quantities fit together, and how it connects to the physical idea. This script is stored separately from the visible mathematics. These explanations are generated on demand with the reader's key; they are not presented as pre-authored or independently verified textbook text. A reader can inspect and revise them. Generation errors stop playback with a retry path rather than silently speaking raw TeX.

The narrator uses ElevenLabs speech synthesis. Script and audio caches live in IndexedDB, with context-sensitive content hashes and model/voice identities. Replaying an unchanged cached passage avoids another provider request. The cache keeps approximately 80 MB or 300 entries and evicts older entries. Browser storage limits can make caching unavailable; reading still works. Long speech is split at sentence or word boundaries while preserving decimal numbers and mathematical wording.

The text tutor and Realtime tutor share four validated tools: `get_reader_focus`, `search_book`, `read_passage`, and `show_passage`. Targets must exist in the local book index. The tutor has no arbitrary URL navigation, shell, network-fetch, or page-script tool. The current chapter, selected or visible passage, and actual slider values ground explanations. Tool calls cannot access API keys. Model output passes through Markdown with raw HTML disabled, KaTeX, and DOMPurify before display.

## Keys and provider connections

This is a bring-your-own-key application: requests go directly from the reader's browser to OpenAI and ElevenLabs, without a project server or shared application key. Keys are kept in tab-scoped sessionStorage by default; device persistence in localStorage requires selecting **Remember keys on this device**. Both stores are unencrypted browser storage. **Forget keys** removes both copies and ends active work. Keys never enter the generated site, request URLs, tutor context, or narration cache. Microphone capture starts only after pressing Talk and the browser's permission flow. Speech sent to providers is processed under the reader's provider account.

Realtime follows Voicebook's WebRTC transport: the reader's own OpenAI key mints a short-lived client secret, which authenticates SDP negotiation and the WebRTC call. This BYOK deployment differs from a hosted service that should keep its application key on a server. Browser CORS policy, account permissions, provider quotas, secure-context requirements, and model availability still apply.

Provider references used for this implementation:

- [OpenAI Realtime WebRTC connection and client secrets](https://developers.openai.com/api/docs/guides/realtime-webrtc)
- [GPT Realtime 2.1](https://developers.openai.com/api/docs/models/gpt-realtime-2.1)
- [GPT-5.6 Terra](https://developers.openai.com/api/docs/models/gpt-5.6-terra) and [GPT-5.6 Sol](https://developers.openai.com/api/docs/models/gpt-5.6-sol)
- [ElevenLabs speech synthesis](https://elevenlabs.io/docs/api-reference/text-to-speech/convert)

## Development and verification

`npm run build` generates figures, the book, the semantic reading index, and the Svelte bundle. `npm run build:reader` rebuilds the application against existing figure assets. `npm run check` runs Svelte diagnostics. The Pages workflow also runs book checks, the 70 reading-layout checks, the figure audit, the 36 Three.js experience checks, and `npm run test:study`.

The study tests mock the provider boundary and WebRTC peer, while exercising real browser UI, media playback, IndexedDB, chapter navigation, tool handling, and settings. They check request model IDs and payloads, caching, math rendering, invalid-target rejection, microphone teardown, and light/dark desktop/mobile layouts. These tests verify the integration contract and browser behavior; live provider audio quality and account access require the reader's keys.

## Voicebook reuse

The Realtime transport was copied and adapted from `/Users/neo/repos/voicebook/src/lib/services/openai-realtime.ts`. The ElevenLabs and cloud text clients, narration rewriting, and grounded reader tools follow Voicebook's `elevenlabs.ts`, `cloud-llm.ts`, `narration-rewriter.ts`, and `assistant-context.ts`. Voicebook is copyright 2026 NeoVand and MIT licensed; its complete license is preserved in `vendor/voicebook/LICENSE`.
