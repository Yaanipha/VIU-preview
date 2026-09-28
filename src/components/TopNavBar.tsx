import React, { useState } from 'react';
import { NavCategory, UserProfile, Show } from '../types';

interface TopNavBarProps {
  currentTab: NavCategory;
  onSelectTab: (tab: NavCategory) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  shows: Show[];
  onSelectShow: (show: Show) => void;
  onOpenVipModal: () => void;
  onOpenAuthModal: () => void;
  user: UserProfile | null;
  onSignOut: () => void;
  watchlistCount: number;
}

export const TopNavBar: React.FC<TopNavBarProps> = ({
  currentTab,
  onSelectTab,
  searchQuery,
  onSearchChange,
  shows,
  onSelectShow,
  onOpenVipModal,
  onOpenAuthModal,
  user,
  onSignOut,
  watchlistCount,
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('English');
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const searchResults = searchQuery.trim()
    ? shows.filter(
        (s) =>
          s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (s.koreanTitle && s.koreanTitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
          s.cast.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase())) ||
          s.genres.some((g) => g.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 5)
    : [];

  const navItems: { label: NavCategory; text: string }[] = [
    { label: 'Home', text: 'Home' },
    { label: 'Fresh Releases', text: 'Fresh Releases' },
    { label: 'Korean Drama', text: 'Korean Drama' },
    { label: 'Chinese Drama', text: 'Chinese Drama' },
    { label: 'Variety & Reality', text: 'Variety & Reality' },
    { label: 'Viu Originals', text: 'Viu Originals' },
  ];

  return (
    <header className="bg-[#121316]/95 backdrop-blur-md sticky top-0 z-50 shadow-md border-b border-[#4f4632]/40 transition-colors">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-14 py-2.5 max-w-full mx-auto w-full">
        {/* Brand & Main Navigation */}
        <div className="flex items-center gap-6 xl:gap-8">
          <button
            onClick={() => onSelectTab('Fresh Releases')}
            className="text-[22px] font-extrabold text-[#fdc500] tracking-tighter flex items-center gap-1 group cursor-pointer focus:outline-none"
          >
            <span className="font-['Plus_Jakarta_Sans',sans-serif]">Viu</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#fdc500] inline-block group-hover:scale-125 transition-transform duration-200"></span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-6">
            {navItems.map((item) => {
              const isActive = currentTab === item.label;
              return (
                <button
                  key={item.label}
                  onClick={() => onSelectTab(item.label)}
                  className={`text-[13px] font-bold tracking-wide transition-all duration-200 cursor-pointer pb-1 relative ${
                    isActive
                      ? 'text-[#fdc500] border-b-2 border-[#fdc500]'
                      : 'text-[#d2c5ab] hover:text-[#e3e2e6]'
                  }`}
                >
                  {item.text}
                </button>
              );
            })}

            {/* Watchlist Tab */}
            <button
              onClick={() => onSelectTab('My Watchlist')}
              className={`text-[13px] font-bold tracking-wide transition-all duration-200 cursor-pointer pb-1 relative flex items-center gap-1.5 ${
                currentTab === 'My Watchlist'
                  ? 'text-[#fdc500] border-b-2 border-[#fdc500]'
                  : 'text-[#d2c5ab] hover:text-[#e3e2e6]'
              }`}
            >
              <span>Watchlist</span>
              {watchlistCount > 0 && (
                <span className="bg-[#fdc500] text-[#3e2e00] text-[10px] font-extrabold px-1.5 py-0.2 rounded-full leading-tight">
                  {watchlistCount}
                </span>
              )}
            </button>
          </nav>
        </div>

        {/* Right Trailing Cluster */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Search bar on right with auto-complete */}
          <div className="relative hidden sm:flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-[#d2c5ab] text-[18px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 250)}
              placeholder="Search drama, shows, actors..."
              className="w-48 xl:w-64 bg-[#1f1f23] border border-[#4f4632]/50 rounded-full pl-9 pr-8 py-1.5 text-[12px] text-[#e3e2e6] placeholder:text-[#d2c5ab]/60 focus:outline-none focus:border-[#fdc500] focus:ring-1 focus:ring-[#fdc500] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 text-[#d2c5ab] hover:text-white text-[14px]"
              >
                ✕
              </button>
            )}

            {/* Live Search Results Popup */}
            {isSearchFocused && searchResults.length > 0 && (
              <div className="absolute top-10 left-0 right-0 bg-[#1f1f23] border border-[#4f4632] rounded-xl shadow-2xl p-2 z-50 flex flex-col gap-1">
                <div className="text-[10px] font-extrabold uppercase text-[#d2c5ab] px-2 py-1 tracking-wider border-b border-[#4f4632]/40">
                  Instant Results
                </div>
                {searchResults.map((show) => (
                  <button
                    key={show.id}
                    onMouseDown={() => {
                      onSelectShow(show);
                      onSearchChange('');
                    }}
                    className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-[#292a2d] text-left transition-colors cursor-pointer"
                  >
                    <img
                      src={show.posterImage}
                      alt={show.title}
                      className="w-8 h-11 object-cover rounded bg-[#121316]"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-[12px] font-bold text-[#e3e2e6] truncate">
                        {show.title}
                      </div>
                      <div className="text-[10px] text-[#d2c5ab] truncate">
                        {show.genres.join(', ')} • {show.country}
                      </div>
                    </div>
                    <span className="text-[11px] text-[#fdc500] font-bold">
                      ★ {show.rating}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="p-1.5 text-[#d2c5ab] hover:text-[#fdc500] transition-colors rounded-lg flex items-center justify-center cursor-pointer"
              title="Change Language"
            >
              <span className="material-symbols-outlined text-[20px]">translate</span>
            </button>
            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-[#1f1f23] border border-[#4f4632] rounded-xl shadow-2xl py-1 z-50 text-[12px]">
                {['English', '繁體中文', '简体中文', 'Bahasa Indonesia', 'ภาษาไทย'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setCurrentLang(lang);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-[#292a2d] transition-colors flex items-center justify-between ${
                      currentLang === lang ? 'text-[#fdc500] font-bold' : 'text-[#e3e2e6]'
                    }`}
                  >
                    <span>{lang}</span>
                    {currentLang === lang && <span>✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* VIP Upgrade Button */}
          <button
            onClick={onOpenVipModal}
            className={`font-['Plus_Jakarta_Sans',sans-serif] text-[11px] font-extrabold px-3 sm:px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all duration-200 active:scale-95 shadow-[0_0_12px_rgba(253,197,0,0.3)] cursor-pointer ${
              user?.isVip
                ? 'bg-gradient-to-r from-[#fe9d00] to-[#fdc500] text-[#2b1700] ring-1 ring-[#fdc500]'
                : 'bg-[#fdc500] text-[#3e2e00] hover:brightness-105'
            }`}
          >
            <span
              className="material-symbols-outlined text-[16px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              workspace_premium
            </span>
            <span className="whitespace-nowrap">
              {user?.isVip ? 'VIP Member' : 'Upgrade to VIP'}
            </span>
          </button>

          {/* Sign In or User Badge */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center gap-2 border border-[#4f4632]/50 bg-[#1f1f23] hover:border-[#fdc500] px-2.5 py-1 rounded-lg text-[12px] text-[#e3e2e6] transition-colors cursor-pointer"
              >
                <div className="w-5 h-5 rounded-full bg-[#fdc500] text-[#3e2e00] font-extrabold text-[10px] flex items-center justify-center">
                  {user.name[0]}
                </div>
                <span className="max-w-[70px] truncate hidden md:inline">{user.name}</span>
                <span className="material-symbols-outlined text-[16px] text-[#d2c5ab]">
                  expand_more
                </span>
              </button>

              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-[#1f1f23] border border-[#4f4632] rounded-xl shadow-2xl py-2 z-50 text-[12px]">
                  <div className="px-3 py-1.5 border-b border-[#4f4632]/40">
                    <p className="font-bold text-[#e3e2e6]">{user.name}</p>
                    <p className="text-[11px] text-[#d2c5ab] truncate">{user.email}</p>
                    <span className="inline-block mt-1 bg-[#fdc500]/20 text-[#fdc500] text-[9px] px-2 py-0.5 rounded font-extrabold">
                      {user.isVip ? 'VIP Active' : 'Free Tier'}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      onSelectTab('My Watchlist');
                      setProfileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-[#e3e2e6] hover:bg-[#292a2d] flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[16px]">bookmark</span>
                    My Watchlist ({watchlistCount})
                  </button>
                  <button
                    onClick={() => {
                      onOpenVipModal();
                      setProfileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-[#fdc500] hover:bg-[#292a2d] flex items-center gap-2 font-bold"
                  >
                    <span className="material-symbols-outlined text-[16px]">verified</span>
                    VIP Privileges
                  </button>
                  <div className="border-t border-[#4f4632]/40 my-1"></div>
                  <button
                    onClick={() => {
                      onSignOut();
                      setProfileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-red-400 hover:bg-[#292a2d] flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[16px]">logout</span>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="border border-[#4f4632]/60 text-[#e3e2e6] hover:text-[#fdc500] hover:border-[#fdc500] px-3.5 py-1.5 rounded-lg text-[11px] font-bold tracking-wide transition-colors cursor-pointer"
            >
              Sign In
            </button>
          )}

          {/* Account Profile Avatar Icon */}
          <button
            onClick={user ? () => setProfileMenuOpen(!profileMenuOpen) : onOpenAuthModal}
            aria-label="User Profile Avatar"
            className="text-[#d2c5ab] hover:text-[#e3e2e6] p-1 transition-colors cursor-pointer hidden sm:block"
          >
            <span className="material-symbols-outlined text-[26px]">account_circle</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-[#d2c5ab] hover:text-white p-1 lg:hidden cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-[26px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#121316] border-b border-[#4f4632]/40 px-4 py-3 flex flex-col gap-2">
          {/* Mobile search */}
          <div className="relative mb-2">
            <span className="material-symbols-outlined absolute left-3 top-2 text-[#d2c5ab] text-[18px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search drama, shows, actors..."
              className="w-full bg-[#1f1f23] border border-[#4f4632]/50 rounded-lg pl-9 pr-3 py-1.5 text-[13px] text-[#e3e2e6] placeholder:text-[#d2c5ab]/60 focus:outline-none focus:border-[#fdc500]"
            />
          </div>

          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                onSelectTab(item.label);
                setMobileMenuOpen(false);
              }}
              className={`text-left py-2 px-3 rounded-lg text-[14px] font-bold ${
                currentTab === item.label
                  ? 'bg-[#fdc500]/15 text-[#fdc500]'
                  : 'text-[#d2c5ab] hover:bg-[#1f1f23] hover:text-white'
              }`}
            >
              {item.text}
            </button>
          ))}

          <button
            onClick={() => {
              onSelectTab('My Watchlist');
              setMobileMenuOpen(false);
            }}
            className={`text-left py-2 px-3 rounded-lg text-[14px] font-bold flex items-center justify-between ${
              currentTab === 'My Watchlist'
                ? 'bg-[#fdc500]/15 text-[#fdc500]'
                : 'text-[#d2c5ab] hover:bg-[#1f1f23] hover:text-white'
            }`}
          >
            <span>My Watchlist</span>
            {watchlistCount > 0 && (
              <span className="bg-[#fdc500] text-[#3e2e00] text-[10px] px-2 py-0.5 rounded-full font-bold">
                {watchlistCount}
              </span>
            )}
          </button>
        </div>
      )}
    </header>
  );
};
