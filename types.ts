
export interface Post {
  id: string;
  title: string;
  content: string;
  category: 'Event' | 'Notice' | 'Guide';
  date: string;
  imageUrl?: string;
}

export interface SiteConfig {
  siteName: string;
  slogan: string;
  heroDescription: string;
  telegramLink: string;
  kakaoLink: string;
  primaryColor: string;
  secondaryColor: string;
}

export interface Inquiry {
  id: string;
  name: string;
  contact: string;
  message: string;
  status: 'Pending' | 'Completed';
  date: string;
}

export type ViewMode = 'Public' | 'Admin';
