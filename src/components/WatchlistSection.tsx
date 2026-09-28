import React from 'react';
import { Show } from '../types';

interface WatchlistSectionProps {
  watchlistShows: Show[];
  onSelectShow: (show: Show) => void;
  onPlayEpisode: (show: Show) => void;
  onRemoveFromWatchlist: (showId: string) => void;
  onBrowseMore: () => void;
}

export const WatchlistSection: React.FC<WatchlistSectionProps> = ({
  watchlistShows,
  onSelectShow,
  onPlayEpisode,
  onRemoveFromWatchlist,
  onBrowseMore,
}) => {
  return (
    <div className="px-4 sm:px-6 lg:px-14 py-8 max-w-full mx-auto w-full">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#4f4632]/40">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 bg-[#fdc500] rounded-full" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#e3e2e6] tracking-tight">
              My Watchlist
            </h1>
            <p className="text-[13px] text-[#d2c5ab]">
              Your saved ongoing dramas and favorite Viu Originals
            </p>
          </div>
        </div>

        <span className="text-[13px] font-bold text-[#fdc500] bg-[#fdc500]/15 px-3 py-1 rounded-full border border-[#fdc500]/30">
          {watchlistShows.length} Saved
        </span>
      </div>

      {watchlistShows.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center gap-4 bg-[#1f1f23]/40 rounded-2xl border border-[#4f4632]/30 p-8">
          <span className="material-symbols-outlined text-[64px] text-[#4f4632]">
            bookmark_border
          </span>
          <h3 className="text-xl font-bold text-[#e3e2e6]">Your watchlist is empty</h3>
          <p className="text-[13px] text-[#d2c5ab] max-w-md">
            Click "+ Add to Watchlist" on any drama or variety show to bookmark it for later.
          </p>
          <button
            onClick={onBrowseMore}
            className="mt-2 bg-[#fdc500] text-[#3e2e00] font-bold px-6 py-2.5 rounded-lg hover:brightness-105 transition-all cursor-pointer shadow-md"
          >
            Explore Fresh Releases
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
          {watchlistShows.map((show) => (
            <div
              key={show.id}
              onClick={() => onSelectShow(show)}
              className="group relative rounded-lg overflow-hidden bg-[#1f1f23] border border-[#4f4632]/40 transition-all duration-300 hover:scale-[1.04] amber-glow-hover flex flex-col cursor-pointer shadow-lg"
            >
              <div className="relative aspect-[2/3] w-full overflow-hidden bg-[#121316]">
                <img
                  src={show.posterImage}
                  alt={show.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e11] via-transparent to-transparent opacity-85" />

                {/* Remove button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveFromWatchlist(show.id);
                  }}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/70 hover:bg-red-600 text-white flex items-center justify-center transition-colors shadow z-10"
                  title="Remove from Watchlist"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>

                {/* Status Badge */}
                <span className="absolute bottom-2 right-2 bg-[#0d0e11]/85 backdrop-blur text-[#fdc500] text-[10px] px-1.5 py-0.5 rounded border border-[#4f4632]/40 font-bold">
                  {show.episodeTag}
                </span>

                {/* Play Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPlayEpisode(show);
                  }}
                  className="absolute inset-0 m-auto w-11 h-11 rounded-full bg-[#fdc500]/90 text-[#3e2e00] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-110 shadow-lg"
                >
                  <span
                    className="material-symbols-outlined text-[24px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    play_arrow
                  </span>
                </button>
              </div>

              <div className="p-3">
                <h3 className="text-[14px] font-bold text-[#e3e2e6] group-hover:text-[#fdc500] truncate">
                  {show.title}
                </h3>
                <p className="text-[11px] text-[#d2c5ab] truncate mt-0.5">
                  {show.genres.join(' • ')}
                </p>
                <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#4f4632]/30 text-[10px]">
                  <span className="text-[#00e1fb]">{show.country}</span>
                  <span className="text-[#ffc483] font-bold">★ {show.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
