export type NavCategory = 
  | 'Home'
  | 'Fresh Releases'
  | 'Korean Drama'
  | 'Chinese Drama'
  | 'Variety & Reality'
  | 'Viu Originals'
  | 'My Watchlist';

export type FilterPill = 
  | 'All Releases'
  | 'Express from Korea'
  | 'New Simulcasts'
  | 'Viu Originals'
  | 'Completed Series'
  | 'Dubbed in English';

export type CountryFilter = 
  | 'All Countries'
  | 'South Korea'
  | 'China'
  | 'Japan'
  | 'Thailand'
  | 'Indonesia';

export type SortFilter = 
  | 'Latest Updated'
  | 'Most Popular'
  | 'IMDb Rating';

export type BadgeType = 'Viu Original' | 'VIP' | 'SIMULCAST' | 'FREE' | 'NEW';

export interface Episode {
  id: string;
  showId: string;
  episodeNumber: number;
  title: string;
  thumbnail: string;
  durationMinutes: number;
  releaseTime: string;
  description: string;
}

export interface Show {
  id: string;
  title: string;
  koreanTitle?: string;
  country: 'South Korea' | 'China' | 'Japan' | 'Thailand' | 'Indonesia';
  category: 'Korean Drama' | 'Chinese Drama' | 'Variety & Reality' | 'Viu Originals' | 'Anime';
  bannerImage: string;
  posterImage: string;
  landscapeImage: string;
  isViuOriginal?: boolean;
  isSimulcast?: boolean;
  isVip?: boolean;
  isFree?: boolean;
  isCompleted?: boolean;
  hasEnglishDub?: boolean;
  rating: number;
  ageRating: string;
  totalEpisodes: number;
  currentEpisode: number;
  episodeTag: string; // e.g. "Ep 14 NEW", "Ep 10 / 16", "Ep 12 / 12 (Finale)"
  duration?: string; // e.g. "68 min"
  releaseScheduleText: string; // e.g. "Every Fri-Sat", "Updated every Sat & Sun"
  updatedTimeAgo?: string; // e.g. "2 hours ago", "Today, 17:30"
  genres: string[];
  cast: string[];
  director?: string;
  synopsis: string;
  trendingRank?: number;
  isHeroFeatured?: boolean;
  episodesList?: Episode[];
}

export interface ScheduleItem {
  id: string;
  day: 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';
  timeText: string; // e.g. "21:00 KST • SIMULCAST"
  showId: string;
  showTitle: string;
  episodeNumber: number;
  note: string; // e.g. "Express Subtitles Ready"
  thumbnail: string;
  badgeType?: 'SIMULCAST' | 'VARIETY' | 'VIP EARLY' | 'MULTI-AUDIO';
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isVip: boolean;
  vipExpiry?: string;
  watchlist: string[]; // show IDs
  reminders: string[]; // schedule item IDs
}
