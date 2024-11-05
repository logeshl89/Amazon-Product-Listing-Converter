export interface SocialPost {
  id: string;
  platform: 'instagram' | 'facebook' | 'twitter';
  content: string;
  images: string[];
  timestamp: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  platform?: 'instagram' | 'facebook' | 'twitter';
  username?: string;
}

export interface ConversionStatus {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  step: string;
  progress: number;
}