import React, { useState } from 'react';
import { Show } from '../types';

interface ShowDetailModalProps {
  show: Show;
  onClose: () => void;
  onWatchNow: (show: Show, epNum?: number) => void;
  onToggleWatchlist: (showId: string) => void;
  isInWatchlist: boolean;
  onSelectSimilarShow: (show: Show) => void;
  allShows: Show[];
}

export const ShowDetailModal: React.FC<ShowDetailModalProps> = ({
  show,
  onClose,
  onWatchNow,
  onToggleWatchlist,
  isInWatchlist,
  onSelectSimilarShow,
  allShows,
}) => {
  const [activeTab, setActiveTab] = useState<'episodes' | 'about' | 'similar'>('episodes');

  const similarShows = allShows
    .filter((s) => s.id !== show.id && (s.country === show.country || s.category === show.category))
    .slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#1f1f23] border border-[#4f4632]/60 rounded-2xl overflow-hidden shadow-2xl my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
        >
          <span className="material-symbols-outlined text-[22px]">close</span>
        </button>

        {/* Hero Header Banner */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden">
          <img
            src={show.bannerImage || show.landscapeImage}
            alt={show.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1f1f23] via-[#1f1f23]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1f1f23] via-[#1f1f23]/40 to-transparent" />

          {/* Banner Meta Content */}
          <div className="absolute bottom-4 left-4 sm:left-8 right-4 flex flex-col items-start gap-2">
            <div className="flex items-center gap-2 flex-wrap text-[10px] font-extrabold uppercase">
              {show.isViuOriginal && (
                <span className="bg-[#fdc500] text-[#3e2e00] px-2 py-0.5 rounded">
                  Viu Original
                </span>
              )}
              {show.isSimulcast && (
                <span className="bg-[#00e1fb] text-[#00363d] px-2 py-0.5 rounded">
                  Simulcast
                </span>
              )}
              {show.isVip && (
                <span className="bg-[#fe9d00] text-[#2b1700] px-2 py-0.5 rounded">
                  VIP
                </span>
              )}
              <span className="bg-[#292a2d] text-[#d2c5ab] px-2 py-0.5 rounded border border-[#4f4632]/40">
                {show.ageRating}
              </span>
              <span className="text-[#ffc483] flex items-center gap-0.5">
                ★ {show.rating}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#e3e2e6] tracking-tight">
              {show.title}
            </h2>
            {show.koreanTitle && (
              <span className="text-[13px] text-[#d2c5ab] -mt-1 font-medium">
                {show.koreanTitle}
              </span>
            )}

            {/* CTAs */}
            <div className="flex items-center gap-3 mt-1 flex-wrap">
              <button
                onClick={() => onWatchNow(show, 1)}
                className="bg-[#fdc500] text-[#3e2e00] font-bold text-[12px] sm:text-[13px] px-5 py-2.5 rounded-lg flex items-center gap-2 shadow-[0_0_15px_rgba(253,197,0,0.3)] hover:brightness-105 transition-all cursor-pointer"
              >
                <span
                  className="material-symbols-outlined text-[18px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  play_arrow
                </span>
                <span>Play Ep 1</span>
              </button>

              <button
                onClick={() => onToggleWatchlist(show.id)}
                className={`text-[12px] sm:text-[13px] font-bold px-4 py-2.5 rounded-lg flex items-center gap-1.5 border transition-all cursor-pointer ${
                  isInWatchlist
                    ? 'bg-[#fdc500]/20 border-[#fdc500] text-[#fdc500]'
                    : 'bg-white/10 hover:bg-white/20 border-white/20 text-[#e3e2e6]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isInWatchlist ? 'check' : 'add'}
                </span>
                <span>{isInWatchlist ? 'In Watchlist' : 'Watchlist'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="px-4 sm:px-8 border-b border-[#4f4632]/40 flex items-center gap-6 text-[13px] font-bold">
          <button
            onClick={() => setActiveTab('episodes')}
            className={`py-3 relative cursor-pointer ${
              activeTab === 'episodes'
                ? 'text-[#fdc500] border-b-2 border-[#fdc500]'
                : 'text-[#d2c5ab] hover:text-[#e3e2e6]'
            }`}
          >
            Episodes ({show.totalEpisodes})
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`py-3 relative cursor-pointer ${
              activeTab === 'about'
                ? 'text-[#fdc500] border-b-2 border-[#fdc500]'
                : 'text-[#d2c5ab] hover:text-[#e3e2e6]'
            }`}
          >
            Synopsis &amp; Details
          </button>
          <button
            onClick={() => setActiveTab('similar')}
            className={`py-3 relative cursor-pointer ${
              activeTab === 'similar'
                ? 'text-[#fdc500] border-b-2 border-[#fdc500]'
                : 'text-[#d2c5ab] hover:text-[#e3e2e6]'
            }`}
          >
            More Like This
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-4 sm:p-8 max-h-80 sm:max-h-96 overflow-y-auto">
          {activeTab === 'episodes' && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between text-[12px] text-[#d2c5ab] mb-1">
                <span>{show.releaseScheduleText}</span>
                <span className="text-[#00e1fb]">Express Subtitles Available</span>
              </div>

              {Array.from({ length: Math.min(show.totalEpisodes, 16) }).map((_, i) => {
                const epNum = i + 1;
                const isReleased = epNum <= show.currentEpisode;

                return (
                  <div
                    key={epNum}
                    onClick={() => isReleased && onWatchNow(show, epNum)}
                    className={`flex items-center gap-3.5 p-3 rounded-xl border transition-all ${
                      isReleased
                        ? 'bg-[#1b1b1f] hover:bg-[#292a2d] border-[#4f4632]/40 hover:border-[#fdc500]/60 cursor-pointer'
                        : 'bg-[#1b1b1f]/50 border-transparent opacity-60'
                    }`}
                  >
                    <div className="relative w-24 h-16 bg-[#121316] rounded-lg overflow-hidden shrink-0">
                      <img
                        src={show.landscapeImage || show.bannerImage}
                        alt={`Ep ${epNum}`}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[9px] px-1 rounded">
                        68m
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] font-bold text-white">
                          Episode {epNum}
                        </span>
                        {epNum === show.currentEpisode && (
                          <span className="bg-[#fdc500] text-[#3e2e00] text-[9px] font-extrabold px-1.5 rounded">
                            LATEST
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#d2c5ab] line-clamp-1 mt-0.5">
                        {isReleased
                          ? `Streaming in Full HD with multi-language subtitle tracks.`
                          : `Scheduled for upcoming broadcast.`}
                      </p>
                    </div>

                    {isReleased ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onWatchNow(show, epNum);
                        }}
                        className="w-9 h-9 rounded-full bg-[#fdc500]/15 hover:bg-[#fdc500] text-[#fdc500] hover:text-[#3e2e00] flex items-center justify-center transition-all cursor-pointer shrink-0"
                      >
                        <span
                          className="material-symbols-outlined text-[20px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          play_arrow
                        </span>
                      </button>
                    ) : (
                      <span className="text-[11px] text-[#d2c5ab] italic shrink-0">
                        Upcoming
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'about' && (
            <div className="flex flex-col gap-5 text-[13px] text-[#d2c5ab] leading-relaxed">
              <div>
                <h4 className="text-[12px] uppercase font-bold text-[#fdc500] tracking-wider mb-1">
                  Storyline
                </h4>
                <p className="text-[#e3e2e6] text-[14px] leading-relaxed">
                  {show.synopsis}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-[#4f4632]/40">
                <div>
                  <span className="text-[11px] uppercase font-bold text-[#d2c5ab] block">
                    Starring Cast
                  </span>
                  <span className="text-[#e3e2e6] font-semibold">
                    {show.cast.join(', ')}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] uppercase font-bold text-[#d2c5ab] block">
                    Genres &amp; Themes
                  </span>
                  <span className="text-[#e3e2e6] font-semibold">
                    {show.genres.join(' • ')}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] uppercase font-bold text-[#d2c5ab] block">
                    Country of Origin
                  </span>
                  <span className="text-[#e3e2e6] font-semibold">{show.country}</span>
                </div>

                <div>
                  <span className="text-[11px] uppercase font-bold text-[#d2c5ab] block">
                    Broadcast Schedule
                  </span>
                  <span className="text-[#e3e2e6] font-semibold">
                    {show.releaseScheduleText}
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'similar' && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {similarShows.map((sim) => (
                <div
                  key={sim.id}
                  onClick={() => onSelectSimilarShow(sim)}
                  className="group bg-[#1b1b1f] rounded-lg overflow-hidden border border-[#4f4632]/40 hover:border-[#fdc500] transition-all cursor-pointer p-2 flex flex-col gap-1.5"
                >
                  <div className="aspect-[2/3] rounded overflow-hidden bg-[#121316]">
                    <img
                      src={sim.posterImage}
                      alt={sim.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <h5 className="text-[12px] font-bold text-[#e3e2e6] group-hover:text-[#fdc500] truncate">
                    {sim.title}
                  </h5>
                  <div className="flex items-center justify-between text-[10px] text-[#d2c5ab]">
                    <span>{sim.genres[0]}</span>
                    <span className="text-[#ffc483]">★ {sim.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
