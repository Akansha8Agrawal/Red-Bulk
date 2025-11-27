export interface VideoRecommendation {
  id: number;
  title: string;
  focus: string;
  dayLabel: string;
  videoUrl: string;
}

export interface WebhookResponse {
  videoRecommendations: VideoRecommendation[];
}

export type AppState = 'INPUT' | 'LOADING' | 'RESULTS' | 'ERROR';
