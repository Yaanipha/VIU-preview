import React, { useState } from 'react';
import { Show, NavCategory } from '../types';

interface CategoryViewProps {
  category: NavCategory;
  shows: Show[];
  onSelectShow: (show: Show) => void;
  onPlayEpisode: (show: Show) => void;
  onToggleWatchlist: (showId: string) => void;
  watchlist: string[];
}

export const CategoryView: React.FC<CategoryViewProps> = ({
  category,
  shows,
  onSelectShow,
  onPlayEpisode,
}) => {
  const [selectedGenre, setSelectedGenre] = useState<string>('All');

  // Filter shows for this category
  let categoryShows = shows;
  if (category === 'Korean Drama') {
    categoryShows = shows.filter((s) => s.country === 'South Korea');
  } else if (category === 'Chinese Drama') {
    categoryShows = shows.filter((s) => s.country === 'China');
  } else if (category === 'Variety & Reality') {
    categoryShows = shows.filter((s) => s.category === 'Variety & Reality' || s.genres.includes('Variety'));
  } else if (category === 'Viu Originals') {
    categoryShows = shows.filter((s) => s.isViuOriginal);
  }

  // Extract unique genres
  const allGenres = Array.from(
    new Set(categoryShows.flatMap((s) => s.genres))
  );

  const filteredShows = selectedGenre === 'All'
    ? categoryShows
    : categoryShows.filter((s) => s.genres.includes(selectedGenre));

  const spotlightShow = categoryShows[0];

  return (
    <div className="w-full">
      {/* Category Mini Hero Spotlight */}
      {spotlightShow && (
        <section className="relative w-full h-[380px] sm:h-[440px] overflow-hidden flex items-end">
          <img
            src={spotlightShow.bannerImage}
            alt={spotlightShow.title}
            className="absolute inset-0 w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e11] via-[#0d0e11]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0e11] via-[#0d0e11]/50 to-transparent" />

          <div className="relative z-10 px-4 sm:px-6 lg:px-14 pb-8 max-w-2xl">
            <span className="bg-[#fdc500] text-[#3e2e00] text-[10px] font-extrabold px-2.5 py-0.5 rounded uppercase tracking-wider mb-2 inline-block">
              {category} Spotlight
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#e3e2e6] tracking-tight mb-2">
              {spotlightShow.title}
            </h1>
            <p className="text-[13px] text-[#d2c5ab] line-clamp-2 mb-4 leading-relaxed">
              {spotlightShow.synopsis}
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onPlayEpisode(spotlightShow)}
                className="bg-[#fdc500] text-[#3e2e00] font-extrabold text-[12px] px-5 py-2.5 rounded-lg flex items-center gap-2 hover:brightness-105 transition-all cursor-pointer"
              >
                <span
                  className="material-symbols-outlined text-[18px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  play_arrow
                </span>
                <span>Watch Now</span>
              </button>
              <button
                onClick={() => onSelectShow(spotlightShow)}
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-[12px] px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
              >
                More Info
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Genre Filter Pills */}
      <div className="px-4 sm:px-6 lg:px-14 py-4 bg-[#121316] border-b border-[#4f4632]/30 flex items-center gap-2 overflow-x-auto hide-scrollbar">
        <button
          onClick={() => setSelectedGenre('All')}
          className={`text-[11px] font-extrabold px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all cursor-pointer ${
            selectedGenre === 'All'
              ? 'bg-[#fdc500] text-[#3e2e00]'
              : 'bg-[#1f1f23] text-[#d2c5ab] hover:text-white border border-[#4f4632]/40'
          }`}
        >
          All {category}
        </button>
        {allGenres.map((genre) => (
          <button
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            className={`text-[11px] font-extrabold px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all cursor-pointer ${
              selectedGenre === genre
                ? 'bg-[#fdc500] text-[#3e2e00]'
                : 'bg-[#1f1f23] text-[#d2c5ab] hover:text-white border border-[#4f4632]/40'
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Category Grid */}
      <div className="px-4 sm:px-6 lg:px-14 py-8">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-[#e3e2e6]">
            {selectedGenre === 'All' ? `All ${category} Releases` : `${selectedGenre} Titles`}
          </h2>
          <span className="text-[12px] text-[#d2c5ab]">
            {filteredShows.length} titles available
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
          {filteredShows.map((show) => (
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e11] via-transparent to-transparent opacity-80" />

                {/* Top badge */}
                <div className="absolute top-2 left-2 flex flex-col gap-1 items-start">
                  {show.isViuOriginal && (
                    <span className="bg-[#fdc500] text-[#3e2e00] text-[9px] font-extrabold px-2 py-0.5 rounded uppercase shadow">
                      Viu Original
                    </span>
                  )}
                  {show.isVip && !show.isViuOriginal && (
                    <span className="bg-gradient-to-r from-[#fdc500] to-[#fe9d00] text-[#2b1700] text-[9px] font-extrabold px-2 py-0.5 rounded shadow">
                      VIP
                    </span>
                  )}
                </div>

                <span className="absolute bottom-2 right-2 bg-[#0d0e11]/85 backdrop-blur text-[#fdc500] text-[10px] px-1.5 py-0.5 rounded border border-[#4f4632]/40 font-bold">
                  {show.episodeTag}
                </span>

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
                  <span className="text-[#00e1fb]">{show.releaseScheduleText}</span>
                  <span className="text-[#ffc483] font-bold">★ {show.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
