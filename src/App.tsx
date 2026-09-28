/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import {
  NavCategory,
  FilterPill,
  CountryFilter,
  SortFilter,
  Show,
  ScheduleItem,
  UserProfile,
} from './types';
import { SHOWS_DATA, WEEKLY_SCHEDULE } from './data/shows';
import { TopNavBar } from './components/TopNavBar';
import { HeroBillboard } from './components/HeroBillboard';
import { FilterBar } from './components/FilterBar';
import { FreshDropsSection } from './components/FreshDropsSection';
import { SimulcastsSection } from './components/SimulcastsSection';
import { WeeklyScheduleSection } from './components/WeeklyScheduleSection';
import { TrendingBentoSection } from './components/TrendingBentoSection';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { ShowDetailModal } from './components/ShowDetailModal';
import { VipModal } from './components/VipModal';
import { AuthModal } from './components/AuthModal';
import { WatchlistSection } from './components/WatchlistSection';
import { CategoryView } from './components/CategoryView';
import { Footer } from './components/Footer';

export default function App() {
  // Navigation & Screen View
  const [currentTab, setCurrentTab] = useState<NavCategory>('Fresh Releases');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filters
  const [activePill, setActivePill] = useState<FilterPill>('All Releases');
  const [selectedCountry, setSelectedCountry] = useState<CountryFilter>('All Countries');
  const [selectedSort, setSelectedSort] = useState<SortFilter>('Latest Updated');

  // Modals & Active Viewers
  const [activeVideoShow, setActiveVideoShow] = useState<{
    show: Show;
    episodeNumber: number;
  } | null>(null);
  const [activeDetailShow, setActiveDetailShow] = useState<Show | null>(null);
  const [isVipModalOpen, setIsVipModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [infoModalTopic, setInfoModalTopic] = useState<string | null>(null);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3200);
  };

  // User Profile
  const [user, setUser] = useState<UserProfile | null>({
    id: 'user-default-1',
    name: 'Viu Viewer',
    email: 'viewer@viu.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    isVip: false,
    watchlist: ['midnight-in-cheongdam', 'scalpel-of-truth'],
    reminders: ['sched-sat-1'],
  });

  // Watchlist Actions
  const handleToggleWatchlist = (showId: string) => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    const isInList = user.watchlist.includes(showId);
    const updatedList = isInList
      ? user.watchlist.filter((id) => id !== showId)
      : [...user.watchlist, showId];

    setUser({
      ...user,
      watchlist: updatedList,
    });

    const targetShow = SHOWS_DATA.find((s) => s.id === showId);
    showToast(
      isInList
        ? `Removed "${targetShow?.title || 'Title'}" from Watchlist`
        : `Added "${targetShow?.title || 'Title'}" to Watchlist!`
    );
  };

  // Reminder Actions
  const handleToggleReminder = (item: ScheduleItem) => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    const hasReminder = user.reminders.includes(item.id);
    const updated = hasReminder
      ? user.reminders.filter((id) => id !== item.id)
      : [...user.reminders, item.id];

    setUser({
      ...user,
      reminders: updated,
    });

    showToast(
      hasReminder
        ? `Reminder removed for ${item.showTitle}`
        : `🔔 Reminder set for ${item.showTitle} (${item.day} ${item.timeText.split('•')[0].trim()})`
    );
  };

  // Share Action
  const handleShare = (show: Show) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast(`Link copied to clipboard: ${show.title}`);
    } else {
      showToast(`Link ready to share for ${show.title}`);
    }
  };

  // Upgrade VIP
  const handleUpgradeSuccess = (plan: string) => {
    if (!user) {
      setUser({
        id: `user-${Date.now()}`,
        name: 'VIP Member',
        email: 'vip.member@viu.com',
        avatar: '',
        isVip: true,
        watchlist: ['midnight-in-cheongdam', 'scalpel-of-truth', 'queen-of-victoria-harbor'],
        reminders: ['sched-sat-1'],
      });
    } else {
      setUser({
        ...user,
        isVip: true,
      });
    }
    setIsVipModalOpen(false);
    showToast('🎉 Welcome to Viu VIP! 1080p/4K HDR & No Ads activated.');
  };

  // Paginated "Load More Releases" state
  const [loadMoreCount, setLoadMoreCount] = useState<number>(0);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setLoadMoreCount((prev) => prev + 1);
      setIsLoadingMore(false);
      showToast('Loaded 12 additional fresh releases!');
    }, 600);
  };

  // Filter shows based on current filters
  const filteredShows = useMemo(() => {
    let list = [...SHOWS_DATA];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          (s.koreanTitle && s.koreanTitle.toLowerCase().includes(q)) ||
          s.cast.some((c) => c.toLowerCase().includes(q)) ||
          s.genres.some((g) => g.toLowerCase().includes(q))
      );
    }

    // Pill filter
    if (activePill === 'Express from Korea') {
      list = list.filter((s) => s.country === 'South Korea');
    } else if (activePill === 'New Simulcasts') {
      list = list.filter((s) => s.isSimulcast);
    } else if (activePill === 'Viu Originals') {
      list = list.filter((s) => s.isViuOriginal);
    } else if (activePill === 'Completed Series') {
      list = list.filter((s) => s.isCompleted);
    } else if (activePill === 'Dubbed in English') {
      list = list.filter((s) => s.hasEnglishDub);
    }

    // Country filter
    if (selectedCountry !== 'All Countries') {
      list = list.filter((s) => s.country === selectedCountry);
    }

    // Sort
    if (selectedSort === 'Most Popular') {
      list.sort((a, b) => (a.trendingRank || 99) - (b.trendingRank || 99));
    } else if (selectedSort === 'IMDb Rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [searchQuery, activePill, selectedCountry, selectedSort]);

  // Specific content sets
  const heroShow = SHOWS_DATA.find((s) => s.id === 'midnight-in-cheongdam') || SHOWS_DATA[0];

  // Section 1: Fresh Drops (5 landscape cards)
  const freshDropsShows = useMemo(() => {
    const ids = [
      'law-of-the-sovereign',
      'song-of-the-tide',
      'palace-of-jade-embers',
      'iron-wok-masters-2024',
      'neon-chronos-zero',
    ];
    return ids.map((id) => SHOWS_DATA.find((s) => s.id === id)!).filter(Boolean);
  }, []);

  // Section 2: Simulcasts (6 portrait cards)
  const simulcastsShows = useMemo(() => {
    const ids = [
      'scalpel-of-truth',
      'echoes-of-the-cosmos',
      'serendipity-in-seoul',
      'the-busan-wiretap',
      'shadow-blade-of-joseon',
      'youthful-symphony',
    ];
    return ids.map((id) => SHOWS_DATA.find((s) => s.id === id)!).filter(Boolean);
  }, []);

  // Section 4: Trending Bento (6 portrait cards)
  const trendingShows = useMemo(() => {
    const ids = [
      'queen-of-victoria-harbor',
      'bangkok-midnight-drift',
      'blueprint-of-my-heart',
      'justice-without-fear',
      'midnight-tokyo-diner',
      'love-in-algorhythms',
    ];
    return ids.map((id) => SHOWS_DATA.find((s) => s.id === id)!).filter(Boolean);
  }, []);

  // Watchlist items
  const watchlistShows = useMemo(() => {
    if (!user) return [];
    return SHOWS_DATA.filter((s) => user.watchlist.includes(s.id));
  }, [user]);

  return (
    <div className="bg-[#0d0e11] text-[#e3e2e6] font-['Plus_Jakarta_Sans',sans-serif] antialiased min-h-screen flex flex-col selection:bg-[#fdc500] selection:text-[#3e2e00]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1f1f23] text-[#fdc500] border border-[#fdc500]/50 px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2.5 text-[13px] font-bold animate-slideUp">
          <span
            className="material-symbols-outlined text-[18px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            check_circle
          </span>
          <span className="text-white">{toastMessage}</span>
        </div>
      )}

      {/* Top Header Navigation Bar */}
      <TopNavBar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        shows={SHOWS_DATA}
        onSelectShow={(show) => setActiveDetailShow(show)}
        onOpenVipModal={() => setIsVipModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        user={user}
        onSignOut={() => {
          setUser(null);
          showToast('Signed out successfully.');
        }}
        watchlistCount={user?.watchlist.length || 0}
      />

      {/* MAIN CANVAS */}
      <main className="flex-grow w-full max-w-full">
        {/* Render View Based on Active Tab */}
        {currentTab === 'My Watchlist' ? (
          <WatchlistSection
            watchlistShows={watchlistShows}
            onSelectShow={(show) => setActiveDetailShow(show)}
            onPlayEpisode={(show) => setActiveVideoShow({ show, episodeNumber: 1 })}
            onRemoveFromWatchlist={handleToggleWatchlist}
            onBrowseMore={() => setCurrentTab('Fresh Releases')}
          />
        ) : currentTab === 'Fresh Releases' || currentTab === 'Home' ? (
          <>
            {/* FEATURED SPOTLIGHT SHOWCASE HERO (High-Impact Widescreen Billboard) */}
            <HeroBillboard
              show={heroShow}
              onWatchNow={(show, ep) => setActiveVideoShow({ show, episodeNumber: ep || 1 })}
              onToggleWatchlist={handleToggleWatchlist}
              isInWatchlist={Boolean(user?.watchlist.includes(heroShow.id))}
              onShare={handleShare}
              onOpenDetails={(show) => setActiveDetailShow(show)}
            />

            {/* CATEGORY HEADER & STICKY FILTER ROW */}
            <FilterBar
              activePill={activePill}
              onSelectPill={setActivePill}
              selectedCountry={selectedCountry}
              onSelectCountry={setSelectedCountry}
              selectedSort={selectedSort}
              onSelectSort={setSelectedSort}
              title="Fresh Releases"
              totalFilteredCount={filteredShows.length}
            />

            {/* CONTENT SECTIONS WRAPPER */}
            <div className="px-4 sm:px-6 lg:px-14 py-8 lg:py-12 flex flex-col gap-10 lg:gap-14">
              {/* If filtering or searching is active, show the filtered grid view first */}
              {(activePill !== 'All Releases' ||
                selectedCountry !== 'All Countries' ||
                selectedSort !== 'Latest Updated' ||
                searchQuery.trim().length > 0) && (
                <section className="bg-[#1f1f23]/60 p-4 sm:p-6 rounded-xl border border-[#4f4632]/40">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-[#e3e2e6] flex items-center gap-2">
                      <span className="text-[#fdc500]">Filtered Releases:</span>
                      <span>{activePill}</span>
                      {selectedCountry !== 'All Countries' && (
                        <span className="text-[#d2c5ab] text-sm">({selectedCountry})</span>
                      )}
                    </h3>
                    <button
                      onClick={() => {
                        setActivePill('All Releases');
                        setSelectedCountry('All Countries');
                        setSelectedSort('Latest Updated');
                        setSearchQuery('');
                      }}
                      className="text-xs font-bold text-[#fdc500] hover:underline"
                    >
                      Reset Filters
                    </button>
                  </div>

                  {filteredShows.length === 0 ? (
                    <div className="py-12 text-center text-[#d2c5ab] text-[13px]">
                      No titles matched your selected filters. Try choosing another category!
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {filteredShows.map((show) => (
                        <div
                          key={show.id}
                          onClick={() => setActiveDetailShow(show)}
                          className="group relative rounded-lg overflow-hidden bg-[#1f1f23] border border-[#4f4632]/40 hover:scale-[1.04] amber-glow-hover flex flex-col cursor-pointer transition-all"
                        >
                          <div className="relative aspect-[2/3] w-full overflow-hidden bg-[#121316]">
                            <img
                              src={show.posterImage}
                              alt={show.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                            <span className="absolute bottom-2 right-2 bg-[#0d0e11]/85 backdrop-blur text-[#fdc500] text-[10px] px-1.5 py-0.5 rounded font-bold">
                              {show.episodeTag}
                            </span>
                          </div>
                          <div className="p-2.5">
                            <h4 className="text-[13px] font-bold text-[#e3e2e6] group-hover:text-[#fdc500] truncate">
                              {show.title}
                            </h4>
                            <div className="flex items-center justify-between text-[10px] text-[#d2c5ab] mt-1">
                              <span>{show.genres[0]}</span>
                              <span className="text-[#ffc483]">★ {show.rating}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              )}

              {/* SECTION 1: TODAY'S FRESH DROPS (16:9 Landscape Video Cards) */}
              <FreshDropsSection
                shows={freshDropsShows}
                onSelectShow={(show) => setActiveDetailShow(show)}
                onPlayEpisode={(show) => setActiveVideoShow({ show, episodeNumber: 1 })}
                onViewAll={() => showToast('Showing all 18 Today Drops')}
              />

              {/* SECTION 2: HOT SIMULCASTS - EXPRESS FROM KOREA (2:3 Portrait Poster Rail) */}
              <SimulcastsSection
                shows={simulcastsShows}
                onSelectShow={(show) => setActiveDetailShow(show)}
                onPlayEpisode={(show) => setActiveVideoShow({ show, episodeNumber: 1 })}
              />

              {/* SECTION 3: WEEKLY RELEASE EXPRESS SCHEDULE */}
              <WeeklyScheduleSection
                scheduleItems={WEEKLY_SCHEDULE}
                shows={SHOWS_DATA}
                onSelectShow={(show) => setActiveDetailShow(show)}
                onToggleReminder={handleToggleReminder}
                reminders={user?.reminders || []}
              />

              {/* SECTION 4: TRENDING ASIAN DRAMAS & VIU ORIGINALS (Bento / Mixed Card Grid) */}
              <TrendingBentoSection
                shows={trendingShows}
                onSelectShow={(show) => setActiveDetailShow(show)}
                onPlayEpisode={(show) => setActiveVideoShow({ show, episodeNumber: 1 })}
              />

              {/* PAGINATION / INFINITE LOAD BUTTON */}
              <section className="flex flex-col items-center justify-center py-6 gap-3">
                <p className="text-[12px] sm:text-[13px] text-[#d2c5ab]">
                  Showing {24 + loadMoreCount * 12} of 142 titles in Fresh Releases
                </p>
                <button
                  onClick={handleLoadMore}
                  disabled={isLoadingMore}
                  className="bg-[#1f1f23] hover:bg-[#292a2d] border border-[#4f4632]/50 hover:border-[#fdc500] text-[#e3e2e6] text-[13px] font-bold px-8 py-3 rounded-lg flex items-center gap-2.5 transition-all duration-200 active:scale-95 group cursor-pointer disabled:opacity-50"
                >
                  <span
                    className={`material-symbols-outlined text-[#fdc500] text-[20px] transition-transform duration-500 ${
                      isLoadingMore ? 'animate-spin' : 'group-hover:rotate-180'
                    }`}
                  >
                    sync
                  </span>
                  <span>{isLoadingMore ? 'Loading Titles...' : 'Load More Releases'}</span>
                </button>
              </section>
            </div>
          </>
        ) : (
          /* Specialized Category Screens (Korean Drama, Chinese Drama, Variety & Reality, Viu Originals) */
          <CategoryView
            category={currentTab}
            shows={SHOWS_DATA}
            onSelectShow={(show) => setActiveDetailShow(show)}
            onPlayEpisode={(show) => setActiveVideoShow({ show, episodeNumber: 1 })}
            onToggleWatchlist={handleToggleWatchlist}
            watchlist={user?.watchlist || []}
          />
        )}
      </main>

      {/* FOOTER */}
      <Footer onOpenAppInfo={(topic) => setInfoModalTopic(topic)} />

      {/* MODAL: Video Player Theater */}
      {activeVideoShow && (
        <VideoPlayerModal
          show={activeVideoShow.show}
          initialEpisodeNumber={activeVideoShow.episodeNumber}
          onClose={() => setActiveVideoShow(null)}
          onOpenDetails={(show) => {
            setActiveVideoShow(null);
            setActiveDetailShow(show);
          }}
          isVipUser={Boolean(user?.isVip)}
          onOpenVipModal={() => setIsVipModalOpen(true)}
        />
      )}

      {/* MODAL: Show Details Dialog */}
      {activeDetailShow && (
        <ShowDetailModal
          show={activeDetailShow}
          onClose={() => setActiveDetailShow(null)}
          onWatchNow={(show, epNum) => {
            setActiveDetailShow(null);
            setActiveVideoShow({ show, episodeNumber: epNum || 1 });
          }}
          onToggleWatchlist={handleToggleWatchlist}
          isInWatchlist={Boolean(user?.watchlist.includes(activeDetailShow.id))}
          onSelectSimilarShow={(similar) => setActiveDetailShow(similar)}
          allShows={SHOWS_DATA}
        />
      )}

      {/* MODAL: VIP Upgrade */}
      {isVipModalOpen && (
        <VipModal
          onClose={() => setIsVipModalOpen(false)}
          onUpgradeSuccess={handleUpgradeSuccess}
          isAlreadyVip={Boolean(user?.isVip)}
        />
      )}

      {/* MODAL: Auth / Sign In */}
      {isAuthModalOpen && (
        <AuthModal
          onClose={() => setIsAuthModalOpen(false)}
          onLoginSuccess={(loggedUser) => {
            setUser(loggedUser);
            setIsAuthModalOpen(false);
            showToast(`Welcome back, ${loggedUser.name}!`);
          }}
        />
      )}

      {/* MODAL: Info / Help / App Store Dialog */}
      {infoModalTopic && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1f1f23] border border-[#4f4632] rounded-xl p-6 max-w-md w-full shadow-2xl text-[#e3e2e6] relative">
            <button
              onClick={() => setInfoModalTopic(null)}
              className="absolute top-3.5 right-3.5 text-[#d2c5ab] hover:text-white"
            >
              ✕
            </button>
            <h3 className="text-lg font-bold text-white mb-2">{infoModalTopic}</h3>
            <p className="text-[13px] text-[#d2c5ab] leading-relaxed mb-4">
              Viu is your premier OTT entertainment destination across Southeast Asia, the Middle
              East, and South Africa, providing high-definition streaming with fast localized
              subtitles in Traditional Chinese, Simplified Chinese, English, Bahasa Indonesia, and
              Thai.
            </p>
            <div className="bg-[#121316] p-3 rounded-lg border border-[#4f4632]/40 text-[12px] text-[#fdc500]">
              Available on iOS App Store, Android Google Play, and major Smart TV platforms (Samsung
              Tizen, LG webOS, Android TV, and Apple TV).
            </div>
            <button
              onClick={() => setInfoModalTopic(null)}
              className="mt-4 w-full bg-[#fdc500] text-[#3e2e00] font-bold py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
