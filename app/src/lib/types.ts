export interface Passage {
  id: string;
  index: number;
  kind: 'text' | 'heading' | 'equation' | 'figure' | 'visualization' | 'table';
  heading: string;
  text: string;
  latex: string[];
  description?: string;
  hash: string;
  narration?: string;
  before?: string;
  after?: string;
  level?: number;
  depth?: string;
  lesson?: string;
  noNarration?: boolean;
  supplement?: string;
  views?: Record<string, Partial<Passage>>;
}
export interface Section {
  id: string;
  title: string;
  level: number;
  start: number;
  end: number;
  endPassage: string;
  summary?: string;
}
export interface BookPage {
  id: string;
  title: string;
  description: string;
  html: string;
  segments: Passage[];
  outline: Section[];
}
export interface BookEntry {
  id: string;
  title: string;
  summary: string;
  outline: Section[];
}
export interface Settings {
  openaiKey: string;
  elevenKey: string;
  model: string;
  realtimeModel: string;
  realtimeVoice: string;
  voiceId: string;
  voiceName: string;
  ttsModel: string;
  remember: boolean;
}
export interface Issue {
  message: string;
  detail?: string;
  requestId?: string;
  retryable?: boolean;
}
export interface Word {
  text: string;
  start: number;
  end: number;
  startTime: number;
  endTime: number;
}
export interface AudioClip {
  blob: Blob;
  text: string;
  words: Word[];
  requestId?: string;
}
