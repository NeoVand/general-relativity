import { afterEach, describe, expect, it, vi } from 'vitest';
import { providerRequest, ProviderError, alignedWords } from '../src/lib/providers';
afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
});
describe('provider failures', () => {
  it('retries temporary failures without emitting intermediate UI errors', async () => {
    vi.useFakeTimers();
    const fetch = vi
      .fn()
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ error: { message: 'Unavailable' } }), { status: 503 })
      )
      .mockResolvedValue(new Response('{}'));
    vi.stubGlobal('fetch', fetch);
    const request = providerRequest('https://api.openai.com/test', 'test', {});
    await vi.runAllTimersAsync();
    expect((await request).status).toBe(200);
    expect(fetch).toHaveBeenCalledTimes(2);
  });
  it('keeps useful diagnostic details and request IDs for invalid requests', async () => {
    const fetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ error: { message: 'Unsupported parameter' } }), {
        status: 400,
        headers: { 'x-request-id': 'req-example' }
      })
    );
    vi.stubGlobal('fetch', fetch);
    try {
      await providerRequest('https://api.openai.com/test', 'test', {});
      throw Error('expected failure');
    } catch (error) {
      expect(error).toBeInstanceOf(ProviderError);
      expect((error as ProviderError).issue).toMatchObject({
        detail: 'Unsupported parameter',
        requestId: 'req-example',
        retryable: false
      });
    }
    expect(fetch).toHaveBeenCalledTimes(1);
  });
  it('does not replay account quota failures', async () => {
    const fetch = vi
      .fn()
      .mockResolvedValue(
        new Response(
          JSON.stringify({ error: { code: 'insufficient_quota', message: 'Insufficient quota' } }),
          { status: 429 }
        )
      );
    vi.stubGlobal('fetch', fetch);
    await expect(providerRequest('https://api.openai.com/test', 'test', {})).rejects.toBeInstanceOf(
      ProviderError
    );
    expect(fetch).toHaveBeenCalledTimes(1);
  });
  it('cancels before sending a provider request', async () => {
    const fetch = vi.fn();
    vi.stubGlobal('fetch', fetch);
    const controller = new AbortController();
    controller.abort();
    await expect(
      providerRequest('https://api.openai.com/test', 'test', {}, controller.signal)
    ).rejects.toMatchObject({ name: 'AbortError' });
    expect(fetch).not.toHaveBeenCalled();
  });
  it('maintains correct character timing through unicode text', () => {
    const characters = Array.from('A 😀 clock');
    const words = alignedWords({
      characters,
      character_start_times_seconds: characters.map((_, i) => i),
      character_end_times_seconds: characters.map((_, i) => i + 1)
    });
    expect(words.map((w) => w.text)).toEqual(['A', 'clock']);
    expect(words[1].startTime).toBe(4);
    expect(words[1].start).toBe(5);
  });
});
