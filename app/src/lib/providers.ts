import type { AudioClip, Issue, Settings, Word } from './types';

export class ProviderError extends Error {
  readonly issue: Issue;
  constructor(
    message: string,
    readonly status: number,
    detail = '',
    requestId = '',
    retryable = false
  ) {
    super(message);
    this.name = 'ProviderError';
    this.issue = { message, detail, requestId, retryable };
  }
}
export function issueFor(error: unknown): Issue {
  return error instanceof ProviderError
    ? error.issue
    : {
        message: error instanceof Error ? error.message : 'Something went wrong. Please try again.'
      };
}
export function isCancelled(error: unknown) {
  return error instanceof Error && error.name === 'AbortError';
}
export function delay(ms: number, signal?: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    signal?.throwIfAborted();
    const abort = () => {
      clearTimeout(timer);
      reject(new DOMException('Cancelled', 'AbortError'));
    };
    const timer = setTimeout(() => {
      signal?.removeEventListener('abort', abort);
      resolve();
    }, ms);
    signal?.addEventListener('abort', abort, { once: true });
  });
}
export async function providerRequest(
  url: string,
  key: string,
  body?: unknown,
  signal?: AbortSignal,
  eleven = false
): Promise<Response> {
  const provider = eleven ? 'ElevenLabs' : 'OpenAI';
  if (!key.trim()) throw new ProviderError(`Add your ${provider} key in Connections.`, 401);
  for (let attempt = 0; ; attempt++) {
    signal?.throwIfAborted();
    let response: Response;
    try {
      response = await fetch(url, {
        method: body === undefined ? 'GET' : 'POST',
        headers: {
          [eleven ? 'xi-api-key' : 'authorization']: eleven ? key : `Bearer ${key}`,
          ...(body === undefined ? {} : { 'content-type': 'application/json' })
        },
        ...(body === undefined ? {} : { body: JSON.stringify(body) }),
        signal: AbortSignal.any([...(signal ? [signal] : []), AbortSignal.timeout(60000)])
      });
    } catch (error) {
      signal?.throwIfAborted();
      // An ambiguous network failure may have incurred usage. Do not silently replay it.
      throw new ProviderError(
        `Couldn’t reach ${provider}. Try again when your connection is ready.`,
        0,
        error instanceof Error ? error.message : '',
        '',
        true
      );
    }
    if (response.ok) return response;
    const data = await response.json().catch(() => ({}));
    const detail = String(
      data.error?.message || data.detail?.message || data.detail || data.message || ''
    ).slice(0, 1200);
    const code = String(data.error?.code || data.detail?.status || '');
    const retryable =
      [429, 500, 502, 503, 504].includes(response.status) &&
      !/quota|credit|billing/i.test(code + detail);
    if (retryable && attempt < 2) {
      const retry = Number(response.headers.get('retry-after'));
      await delay(Math.min(5000, retry > 0 ? retry * 1000 : 500 * 2 ** attempt), signal);
      continue;
    }
    const message =
      response.status === 401 || response.status === 403
        ? `Check your ${provider} key and its permissions in Connections.`
        : response.status === 429
          ? `${provider} is unavailable for this account right now. Check your quota or try again shortly.`
          : response.status === 404
            ? `The selected ${eleven ? 'voice or speech model' : 'model'} isn’t available to this account.`
            : response.status === 400 || response.status === 422
              ? `${provider} couldn’t accept this request. Check the model settings.`
              : `${provider} couldn’t finish this request. You can retry without losing your place.`;
    throw new ProviderError(
      message,
      response.status,
      detail,
      response.headers.get('x-request-id') || response.headers.get('request-id') || '',
      retryable
    );
  }
}
export interface ToolCall {
  id: string;
  type: 'function';
  function: { name: string; arguments: string };
}
export interface ChatMessage {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string | null;
  tool_calls?: ToolCall[];
  tool_call_id?: string;
}
export interface ToolDefinition {
  type: string;
  name: string;
  description: string;
  parameters: object;
}
export async function complete(
  settings: Settings,
  messages: ChatMessage[],
  signal?: AbortSignal,
  tools?: ToolDefinition[],
  json = false
) {
  const response = await providerRequest(
    'https://api.openai.com/v1/chat/completions',
    settings.openaiKey,
    {
      model: settings.model,
      messages,
      max_completion_tokens: json ? 6000 : 5000,
      ...(json ? { response_format: { type: 'json_object' } } : {}),
      ...(tools?.length ? { tools: tools.map(({ type, ...fn }) => ({ type, function: fn })) } : {})
    },
    signal
  );
  const data = await response.json();
  if (data.choices?.[0]?.finish_reason === 'length')
    throw new Error('The answer reached its length limit. Try a smaller passage.');
  const message = data.choices?.[0]?.message as ChatMessage | undefined;
  if (!message) throw new Error('The tutor returned an empty answer. Please retry.');
  return message;
}
interface Alignment {
  characters: string[];
  character_start_times_seconds: number[];
  character_end_times_seconds: number[];
}
export function alignedWords(alignment?: Alignment): Word[] {
  if (!alignment?.characters?.length) return [];
  const text = alignment.characters.join('');
  const starts: number[] = [],
    ends: number[] = [];
  alignment.characters.forEach((character, i) => {
    for (let j = 0; j < character.length; j++) {
      starts.push(alignment.character_start_times_seconds[i]);
      ends.push(alignment.character_end_times_seconds[i]);
    }
  });
  return [...text.matchAll(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu)]
    .map((match) => ({
      text: match[0],
      start: match.index,
      end: match.index + match[0].length,
      startTime: starts[match.index],
      endTime: ends[match.index + match[0].length - 1]
    }))
    .filter((word) => Number.isFinite(word.startTime) && Number.isFinite(word.endTime));
}
export async function synthesize(
  settings: Settings,
  text: string,
  previous: string,
  signal: AbortSignal
): Promise<AudioClip> {
  if (!settings.voiceId) throw new Error('Choose a narrator in Connections.');
  const response = await providerRequest(
    `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(settings.voiceId)}/with-timestamps?output_format=mp3_44100_128`,
    settings.elevenKey,
    {
      text,
      model_id: settings.ttsModel,
      ...(previous && settings.ttsModel !== 'eleven_v3'
        ? { previous_text: previous.slice(-1500) }
        : {})
    },
    signal,
    true
  );
  const data = await response.json();
  if (!data.audio_base64) throw new Error('The narrator returned no audio. Please retry.');
  const alignment: Alignment | undefined = data.alignment || data.normalized_alignment;
  return {
    blob: new Blob([Uint8Array.from(atob(data.audio_base64), (c) => c.charCodeAt(0))], {
      type: 'audio/mpeg'
    }),
    text: alignment?.characters?.join('') || text,
    words: alignedWords(alignment),
    requestId: response.headers.get('request-id') || undefined
  };
}
export async function voices(
  settings: Settings,
  signal?: AbortSignal
): Promise<{ voice_id: string; name: string }[]> {
  const response = await providerRequest(
    'https://api.elevenlabs.io/v1/voices',
    settings.elevenKey,
    undefined,
    signal,
    true
  );
  return (await response.json()).voices || [];
}
