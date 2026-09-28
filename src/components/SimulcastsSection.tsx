import React, { useRef } from 'react';
import { Show } from '../types';

interface SimulcastsSectionProps {
  shows: Show[];
  onSelectShow: (show: Show) => void;
  onPlayEpisode: (show: Show) => void;
}

export const SimulcastsSection: React.FC<SimulcastsSectionProps> = ({
  shows,
  onSelectShow,
  onPlayEpisode,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 600;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-5">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 bg-[#fe9d00] rounded-full shrink-0" />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-[20px] sm:text-[22px] font-bold text-[#e3e2e6] tracking-tight">
                Hot Simulcasts - Express from Korea
              </h2>
              <span className="bg-[#fdc500]/15 text-[#fdc500] border border-[#fdc500]/30 px-2 py-0.5 rounded text-[10px] font-extrabold uppercase">
                Fast Subtitles
              </span>
            </div>
            <p className="text-[12px] sm:text-[13px] text-[#d2c5ab]">
              Broadcast in Korea, available on Viu within 4 to 8 hours with full localized subtitles
            </p>
          </div>
        </div>

        {/* Scroll Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleScroll('left')}
            className="w-8 h-8 rounded-full bg-[#1f1f23] border border-[#4f4632]/50 flex items-center justify-center text-[#e3e2e6] hover:border-[#fdc500] hover:text-[#fdc500] transition-colors cursor-pointer"
            title="Scroll Left"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_left</span>
          </button>
          <button
            onClick={() => handleScroll('right')}
            className="w-8 h-8 rounded-full bg-[#1f1f23] border border-[#4f4632]/50 flex items-center justify-center text-[#e3e2e6] hover:border-[#fdc500] hover:text-[#fdc500] transition-colors cursor-pointer"
            title="Scroll Right"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </div>
      </div>

      {/* 6-Card Portrait Grid / Carousel */}
      <div
        ref={scrollContainerRef}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4 lg:gap-5 overflow-x-auto hide-scrollbar scroll-smooth"
      >
        {shows.map((show) => {
          return (
            <div
              key={show.id}
              onClick={() => onSelectShow(show)}
              className="group relative rounded-lg overflow-hidden bg-[#1f1f23] border border-[#4f4632]/40 transition-all duration-300 hover:scale-[1.04] amber-glow-hover flex flex-col cursor-pointer shrink-0 shadow-lg"
            >
              {/* Poster 2:3 Aspect Ratio */}
              <div className="relative aspect-[2/3] w-full overflow-hidden bg-[#121316]">
                <img
                  src={show.posterImage}
                  alt={show.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e11] via-transparent to-transparent opacity-85 pointer-events-none" />

                {/* Top Badge */}
                <div className="absolute top-2 left-2 flex flex-col gap-1 items-start">
                  {show.isViuOriginal && (
                    <span className="bg-[#fdc500] text-[#3e2e00] text-[9px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider shadow">
                      Viu Original
                    </span>
                  )}
                  {show.isVip && !show.isViuOriginal && (
                    <span className="bg-gradient-to-r from-[#fdc500] to-[#fe9d00] text-[#2b1700] text-[9px] font-extrabold px-2 py-0.5 rounded shadow">
                      VIP
                    </span>
                  )}
                  {show.isSimulcast && !show.isViuOriginal && !show.isVip && (
                    <span className="bg-[#00e1fb] text-[#00363d] text-[9px] font-extrabold px-2 py-0.5 rounded shadow">
                      SIMULCAST
                    </span>
                  )}
                </div>

                {/* Episode Progress / Tracker Pill */}
                <span className="absolute bottom-2 right-2 bg-[#0d0e11]/90 backdrop-blur text-[#fdc500] text-[10px] px-1.5 py-0.5 rounded border border-[#4f4632]/50 font-bold">
                  {show.episodeTag}
                </span>

                {/* Play Button Overlay */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onPlayEpisode(show);
                  }}
                  className="absolute inset-0 m-auto w-11 h-11 rounded-full bg-[#fdc500]/90 text-[#3e2e00] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 transform group-hover:scale-110 shadow-lg"
                  title="Play Show"
                >
                  <span
                    className="material-symbols-outlined text-[24px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    play_arrow
                  </span>
                </button>
              </div>

              {/* Card Meta Content */}
              <div className="p-3">
                <h3 className="text-[14px] font-bold text-[#e3e2e6] group-hover:text-[#fdc500] transition-colors line-clamp-1">
                  {show.title}
                </h3>
                <p className="text-[11px] text-[#d2c5ab] line-clamp-1 mt-0.5">
                  {show.genres.slice(0, 2).join(', ')}
                </p>

                <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#4f4632]/30 text-[10px]">
                  <span className="text-[#d2c5ab] font-medium truncate">
                    {show.releaseScheduleText}
                  </span>
                  <span className="text-[#ffc483] flex items-center gap-0.5 font-bold shrink-0">
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
