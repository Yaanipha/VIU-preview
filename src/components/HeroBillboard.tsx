import React from 'react';
import { Show } from '../types';

interface HeroBillboardProps {
  show: Show;
  onWatchNow: (show: Show, episodeNumber?: number) => void;
  onToggleWatchlist: (showId: string) => void;
  isInWatchlist: boolean;
  onShare: (show: Show) => void;
  onOpenDetails: (show: Show) => void;
}

export const HeroBillboard: React.FC<HeroBillboardProps> = ({
  show,
  onWatchNow,
  onToggleWatchlist,
  isInWatchlist,
  onShare,
  onOpenDetails,
}) => {
  return (
    <section className="relative w-full h-[520px] lg:h-[580px] overflow-hidden flex items-end select-none">
      {/* Background Key Visual with Cinematic Vignette */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-1000 ease-out transform cursor-pointer"
        style={{
          backgroundImage: `url('${show.bannerImage}')`,
        }}
        onClick={() => onOpenDetails(show)}
        role="button"
        tabIndex={0}
        aria-label={`View details for ${show.title}`}
      />

      {/* Deep Cinematic Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e11] via-[#0d0e11]/85 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0d0e11] via-[#0d0e11]/60 to-transparent pointer-events-none" />

      {/* Hero Content Wrapper */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-14 pb-10 sm:pb-12 flex flex-col items-start max-w-4xl">
        {/* Badge & Metadata Ribbon */}
        <div className="flex items-center gap-2.5 mb-3 flex-wrap text-[10px] font-extrabold tracking-wider">
          {show.isViuOriginal && (
            <span className="bg-[#fdc500] text-[#3e2e00] px-2.5 py-0.5 rounded uppercase flex items-center gap-1 shadow-sm">
              <span
                className="material-symbols-outlined text-[13px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              Viu Original
            </span>
          )}

          {show.isSimulcast && (
            <span className="border border-[#00e1fb]/80 text-[#00e1fb] px-2 py-0.5 rounded flex items-center gap-1.5 bg-[#1f1f23]/60 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00e1fb] animate-pulse" />
              Simulcast Express
            </span>
          )}

          <span className="bg-[#292a2d]/90 text-[#d2c5ab] px-2 py-0.5 rounded border border-[#4f4632]/40">
            {show.ageRating}
          </span>

          <span className="text-[#d2c5ab] font-normal text-[11px] sm:text-[12px]">
            {show.totalEpisodes} Episodes • {show.releaseScheduleText}
          </span>
        </div>

        {/* Show Title */}
        <h1
          onClick={() => onOpenDetails(show)}
          className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#e3e2e6] tracking-tight mb-2 drop-shadow-md cursor-pointer hover:text-[#fdc500] transition-colors"
        >
          {show.title}
        </h1>

        {/* Subtitle status & genres */}
        <div className="text-[13px] text-[#fdc500] font-bold mb-3 tracking-wide flex items-center gap-2 flex-wrap">
          <span>{show.episodeTag}</span>
          <span className="text-[#4f4632]">•</span>
          <span className="text-[#d2c5ab] font-normal text-[13px]">
            {show.genres.join(', ')}
          </span>
          <span className="text-[#4f4632]">•</span>
          <span className="text-[#ffc483] flex items-center text-[12px] gap-0.5 font-bold">
            <span
              className="material-symbols-outlined text-[14px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
            {show.rating} Rating
          </span>
        </div>

        {/* Synopsis Logline */}
        <p className="text-[13px] sm:text-[14px] text-[#d2c5ab] max-w-2xl line-clamp-3 mb-6 leading-relaxed">
          {show.synopsis}
        </p>

        {/* Action Buttons */}
        <div className="flex items-center gap-3.5 flex-wrap">
          <button
            onClick={() => onWatchNow(show, 1)}
            className="bg-[#fdc500] text-[#3e2e00] font-['Plus_Jakarta_Sans',sans-serif] text-[13px] font-extrabold px-6 py-3 rounded-lg flex items-center gap-2.5 transition-all duration-200 active:scale-95 shadow-[0_0_20px_rgba(253,197,0,0.4)] hover:brightness-105 cursor-pointer"
          >
            <span
              className="material-symbols-outlined text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              play_arrow
            </span>
            <span>Watch Ep 1 Now</span>
          </button>

          <button
            onClick={() => onToggleWatchlist(show.id)}
            className={`border font-['Plus_Jakarta_Sans',sans-serif] text-[13px] font-bold px-5 py-3 rounded-lg flex items-center gap-2 transition-all duration-150 backdrop-blur-md cursor-pointer ${
              isInWatchlist
                ? 'bg-[#fdc500]/20 border-[#fdc500] text-[#fdc500]'
                : 'bg-white/10 hover:bg-white/20 border-white/20 text-[#e3e2e6]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">
              {isInWatchlist ? 'check' : 'add'}
            </span>
            <span>{isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}</span>
          </button>

          <button
            onClick={() => onShare(show)}
            className="bg-[#1f1f23]/80 hover:bg-[#1f1f23] border border-[#4f4632]/50 text-[#d2c5ab] hover:text-[#e3e2e6] p-3 rounded-lg flex items-center justify-center transition-colors backdrop-blur-sm cursor-pointer"
            title="Share Title"
          >
            <span className="material-symbols-outlined text-[20px]">share</span>
          </button>

          <button
            onClick={() => onOpenDetails(show)}
            className="bg-[#1f1f23]/80 hover:bg-[#1f1f23] border border-[#4f4632]/50 text-[#d2c5ab] hover:text-[#e3e2e6] px-4 py-3 rounded-lg flex items-center justify-center gap-1.5 text-[13px] font-bold transition-colors backdrop-blur-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">info</span>
            <span>More Info</span>
          </button>
        </div>
      </div>
    </section>
  );
};
