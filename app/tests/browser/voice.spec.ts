import { test, expect } from '@playwright/test';

test('hold-to-talk preserves focus, rejects stale actions, waits for speech, and closes microphone tracks', async ({
  page
}) => {
  await page.addInitScript(() => {
    sessionStorage.setItem(
      'gr-study-settings',
      JSON.stringify({ openaiKey: 'test-key', elevenKey: 'test-eleven', voiceId: 'test-voice' })
    );
    localStorage.setItem(
      'gr-voice-shortcut',
      JSON.stringify({ code: 'Space', ctrl: true, meta: false, alt: false, shift: true })
    );
    type Event = Record<string, any>;
    const state = {
      sent: [] as Event[],
      enabled: false,
      stopped: 0,
      closed: 0,
      channel: null as any
    };
    (window as any).__voice = state;
    const track = {
      kind: 'audio',
      get enabled() {
        return state.enabled;
      },
      set enabled(value: boolean) {
        state.enabled = value;
      },
      stop() {
        state.stopped++;
      }
    };
    Object.defineProperty(navigator.mediaDevices, 'getUserMedia', {
      value: async () => ({ getTracks: () => [track], getAudioTracks: () => [track] })
    });
    const emit = (event: Event) => state.channel.onmessage({ data: JSON.stringify(event) });
    (window as any).__emit = emit;
    HTMLMediaElement.prototype.play = async () => {};
    class Peer {
      connectionState = 'connected';
      addTrack() {}
      addTransceiver() {}
      createDataChannel() {
        const channel = {
          readyState: 'connecting',
          onopen: null as any,
          onmessage: null as any,
          send(raw: string) {
            const event = JSON.parse(raw);
            state.sent.push(event);
            if (event.type === 'session.update' && event.session.audio?.input)
              queueMicrotask(() =>
                emit({
                  type: 'session.updated',
                  session: { audio: { input: event.session.audio.input } }
                })
              );
            if (event.type === 'input_audio_buffer.commit')
              queueMicrotask(() =>
                emit({
                  type: 'input_audio_buffer.committed',
                  item_id: 'question-' + state.sent.length
                })
              );
          },
          close() {
            this.readyState = 'closed';
          }
        };
        state.channel = channel;
        return channel;
      }
      async createOffer() {
        return { sdp: 'test-offer' };
      }
      async setLocalDescription() {}
      async setRemoteDescription() {
        setTimeout(() => {
          state.channel.readyState = 'open';
          state.channel.onopen?.();
        }, 1);
      }
      close() {
        state.closed++;
      }
    }
    (window as any).RTCPeerConnection = Peer;
  });
  await page.route('https://api.openai.com/**', (route) =>
    route.request().url().includes('client_secrets')
      ? route.fulfill({ json: { value: 'test-secret' } })
      : route.fulfill({ body: 'test-answer' })
  );
  await page.goto('/chapter-0.html');
  await page.waitForFunction(() => document.body.dataset.readingReady === 'true');
  await page.locator('#main').focus();
  const focus = await page.evaluate(() => document.activeElement?.id);
  await page.keyboard.down('Control');
  await page.keyboard.down('Shift');
  await page.keyboard.down('Space');
  await expect.poll(() => page.evaluate(() => (window as any).__voice.enabled)).toBe(true);
  expect(await page.evaluate(() => document.activeElement?.id)).toBe(focus);
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await page.waitForTimeout(150);
  await page.keyboard.up('Space');
  await page.keyboard.up('Shift');
  await page.keyboard.up('Control');
  await expect.poll(() => page.evaluate(() => (window as any).__voice.enabled)).toBe(false);
  await page.evaluate(() => {
    const state = (window as any).__voice,
      emit = (window as any).__emit;
    const item = state.sent.length;
    emit({
      type: 'conversation.item.input_audio_transcription.completed',
      item_id: 'question-' + item,
      transcript: 'Take me to chapter 7.'
    });
  });
  await expect
    .poll(() =>
      page.evaluate(
        () => (window as any).__voice.sent.filter((e: any) => e.type === 'response.create').length
      )
    )
    .toBe(1);
  await page.evaluate(() => {
    const state = (window as any).__voice,
      emit = (window as any).__emit;
    const metadata = state.sent.findLast((e: any) => e.type === 'response.create').response
      .metadata;
    emit({ type: 'response.created', response: { id: 'response-one', metadata } });
    emit({ type: 'output_audio_buffer.started', response_id: 'response-one' });
    emit({
      type: 'response.done',
      response: {
        id: 'response-one',
        metadata,
        status: 'completed',
        output: [
          {
            type: 'function_call',
            call_id: 'open-seven',
            name: 'show_chapter',
            arguments: '{"page":"chapter-7"}'
          }
        ]
      }
    });
  });
  await page.waitForTimeout(100);
  await expect(page).toHaveURL(/chapter-0.html$/);
  await page.evaluate(() =>
    (window as any).__emit({ type: 'output_audio_buffer.stopped', response_id: 'response-one' })
  );
  await expect(page).toHaveURL(/chapter-7.html$/);
  // A late result from the old turn cannot navigate after a new interruption.
  await page.keyboard.down('Control');
  await page.keyboard.down('Shift');
  await page.keyboard.down('Space');
  await expect.poll(() => page.evaluate(() => (window as any).__voice.enabled)).toBe(true);
  await page.evaluate(() =>
    (window as any).__emit({
      type: 'response.done',
      response: {
        id: 'response-one',
        status: 'completed',
        output: [
          {
            type: 'function_call',
            call_id: 'stale',
            name: 'show_chapter',
            arguments: '{"page":"chapter-12"}'
          }
        ]
      }
    })
  );
  await page.waitForTimeout(100);
  await expect(page).toHaveURL(/chapter-7.html$/);
  await page.keyboard.up('Space');
  await page.keyboard.up('Shift');
  await page.keyboard.up('Control');
  await page.getByRole('button', { name: 'End voice conversation', exact: true }).click();
  expect(await page.evaluate(() => (window as any).__voice.stopped)).toBe(1);
  expect(await page.evaluate(() => (window as any).__voice.closed)).toBe(1);
});
