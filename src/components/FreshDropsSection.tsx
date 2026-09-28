import React from 'react';
import { Show } from '../types';

interface FreshDropsSectionProps {
  shows: Show[];
  onSelectShow: (show: Show) => void;
  onPlayEpisode: (show: Show) => void;
  onViewAll?: () => void;
}

export const FreshDropsSection: React.FC<FreshDropsSectionProps> = ({
  shows,
  onSelectShow,
  onPlayEpisode,
  onViewAll,
}) => {
  return (
    <section>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-5">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 bg-[#fdc500] rounded-full shrink-0" />
          <div>
            <h2 className="text-[20px] sm:text-[22px] font-bold text-[#e3e2e6] tracking-tight">
              Today's Fresh Drops
            </h2>
            <p className="text-[12px] sm:text-[13px] text-[#d2c5ab]">
              Streamed straight after broadcast with multi-language subtitles
            </p>
          </div>
        </div>

        <button
          onClick={onViewAll}
          className="text-[12px] sm:text-[13px] font-bold text-[#fdc500] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>View All ({shows.length})</span>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        </button>
      </div>

      {/* 5-Card Responsive Landscape Rail/Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-5">
        {shows.map((show) => {
          // Dynamic badge styling based on tag
          let badgeBg = 'bg-[#fdc500] text-[#3e2e00]';
          if (show.episodeTag.includes('SIMULCAST')) {
            badgeBg = 'bg-[#00e1fb] text-[#00363d]';
          } else if (show.episodeTag.includes('VIP')) {
            badgeBg = 'bg-[#ffc483] text-[#482900]';
          } else if (show.episodeTag.includes('FREE')) {
            badgeBg = 'bg-[#343538] text-[#e3e2e6] border border-[#4f4632]/50';
          }

          return (
            <div
              key={show.id}
              onClick={() => onSelectShow(show)}
              className="group bg-[#1f1f23] rounded-lg overflow-hidden border border-[#4f4632]/40 transition-all duration-300 hover:scale-[1.03] amber-glow-hover flex flex-col cursor-pointer shadow-lg relative"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-[#121316]">
                <img
                  src={show.landscapeImage || show.bannerImage}
                  alt={show.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e11]/90 via-transparent to-transparent pointer-events-none" />

                {/* Quick Play Button on Hover */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onPlayEpisode(show);
                  }}
                  className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-[#fdc500]/90 text-[#3e2e00] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 transform group-hover:scale-110 shadow-lg"
                  title="Play Episode"
                >
                  <span
                    className="material-symbols-outlined text-[26px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    play_arrow
                  </span>
                </button>

                {/* Top Badge */}
                <span
                  className={`absolute top-2.5 left-2.5 ${badgeBg} font-['Plus_Jakarta_Sans',sans-serif] text-[10px] px-2 py-0.5 rounded font-extrabold shadow tracking-wider`}
                >
                  {show.episodeTag}
                </span>

                {/* Duration */}
                {show.duration && (
                  <span className="absolute bottom-2 right-2 bg-[#0d0e11]/85 backdrop-blur text-[#e3e2e6] text-[10px] px-1.5 py-0.5 rounded border border-[#4f4632]/30 font-semibold">
                    {show.duration}
                  </span>
                )}
              </div>

              {/* Card Meta Content */}
              <div className="p-3.5 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-[15px] font-bold text-[#e3e2e6] group-hover:text-[#fdc500] transition-colors line-clamp-1">
                    {show.title}
                  </h3>
                  <p className="text-[12px] text-[#d2c5ab] line-clamp-1 mt-0.5">
                    {show.cast.length > 0
                      ? show.cast.slice(0, 2).join(', ')
                      : show.genres.join(' • ')}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#4f4632]/30 text-[#d2c5ab] text-[11px]">
                  <span className="text-[#00e1fb] flex items-center gap-1 font-medium">
                    <span className="material-symbols-outlined text-[13px]">schedule</span>
                    {show.updatedTimeAgo || 'Today'}
                  </span>
                  <span className="flex items-center gap-0.5 text-[#ffc483] font-bold">
                    <span
                      className="material-symbols-outlined text-[13px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    {show.rating}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
