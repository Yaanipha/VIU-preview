import React from 'react';
import { FilterPill, CountryFilter, SortFilter } from '../types';

interface FilterBarProps {
  activePill: FilterPill;
  onSelectPill: (pill: FilterPill) => void;
  selectedCountry: CountryFilter;
  onSelectCountry: (c: CountryFilter) => void;
  selectedSort: SortFilter;
  onSelectSort: (s: SortFilter) => void;
  title?: string;
  totalFilteredCount?: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  activePill,
  onSelectPill,
  selectedCountry,
  onSelectCountry,
  selectedSort,
  onSelectSort,
  title = 'Fresh Releases',
  totalFilteredCount,
}) => {
  const pills: FilterPill[] = [
    'All Releases',
    'Express from Korea',
    'New Simulcasts',
    'Viu Originals',
    'Completed Series',
    'Dubbed in English',
  ];

  return (
    <section className="sticky top-[52px] sm:top-[57px] z-40 bg-[#0d0e11]/95 backdrop-blur-md border-y border-[#4f4632]/40 py-2 sm:py-2.5 px-4 sm:px-6 lg:px-14 transition-all">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
        {/* Left: Category Title & Quick Filter Pills */}
        <div className="flex items-center gap-3 xl:gap-4 overflow-x-auto hide-scrollbar py-1">
          <div className="pr-3 border-r border-[#4f4632]/50 hidden sm:block shrink-0">
            <h2 className="text-[17px] font-bold text-[#e3e2e6] tracking-tight whitespace-nowrap">
              {title}
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 flex-nowrap">
            {pills.map((pill) => {
              const isSelected = activePill === pill;
              return (
                <button
                  key={pill}
                  onClick={() => onSelectPill(pill)}
                  className={`text-[11px] font-extrabold px-3 sm:px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all duration-150 cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#fdc500] text-[#3e2e00] shadow-sm font-black'
                      : 'bg-[#1f1f23] border border-[#4f4632]/50 text-[#d2c5ab] hover:text-[#e3e2e6] hover:border-[#9b8f78]'
                  }`}
                >
                  {pill === 'New Simulcasts' && (
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isSelected ? 'bg-[#3e2e00]' : 'bg-[#00e1fb]'
                      }`}
                    />
                  )}
                  <span>{pill}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Country & Sorting Controls */}
        <div className="flex items-center gap-2 sm:gap-3 self-end md:self-auto shrink-0">
          {totalFilteredCount !== undefined && (
            <span className="text-[11px] text-[#d2c5ab] hidden xl:inline-block">
              {totalFilteredCount} titles
            </span>
          )}

          {/* Country Dropdown */}
          <div className="relative inline-flex items-center">
            <select
              value={selectedCountry}
              onChange={(e) => onSelectCountry(e.target.value as CountryFilter)}
              className="bg-[#1f1f23] border border-[#4f4632]/50 text-[#d2c5ab] text-[11px] font-bold py-1.5 pl-3 pr-8 rounded-lg appearance-none cursor-pointer focus:outline-none focus:border-[#fdc500]"
            >
              <option value="All Countries">All Countries</option>
              <option value="South Korea">South Korea</option>
              <option value="China">China</option>
              <option value="Japan">Japan</option>
              <option value="Thailand">Thailand</option>
              <option value="Indonesia">Indonesia</option>
            </select>
            <span className="material-symbols-outlined text-[#d2c5ab] absolute right-2 pointer-events-none text-[16px]">
              expand_more
            </span>
          </div>

          {/* Sort Dropdown */}
          <div className="relative inline-flex items-center">
            <select
              value={selectedSort}
              onChange={(e) => onSelectSort(e.target.value as SortFilter)}
              className="bg-[#1f1f23] border border-[#4f4632]/50 text-[#d2c5ab] text-[11px] font-bold py-1.5 pl-3 pr-8 rounded-lg appearance-none cursor-pointer focus:outline-none focus:border-[#fdc500]"
            >
              <option value="Latest Updated">Sort: Latest Updated</option>
              <option value="Most Popular">Most Popular</option>
              <option value="IMDb Rating">IMDb Rating</option>
            </select>
            <span className="material-symbols-outlined text-[#d2c5ab] absolute right-2 pointer-events-none text-[16px]">
              sort
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
