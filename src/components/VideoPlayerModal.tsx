import React, { useState, useEffect } from 'react';
import { Show, Episode } from '../types';

interface VideoPlayerModalProps {
  show: Show;
  initialEpisodeNumber?: number;
  onClose: () => void;
  onOpenDetails: (show: Show) => void;
  isVipUser?: boolean;
  onOpenVipModal: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  show,
  initialEpisodeNumber = 1,
  onClose,
  onOpenDetails,
  isVipUser = false,
  onOpenVipModal,
}) => {
  const [currentEpNum, setCurrentEpNum] = useState<number>(initialEpisodeNumber);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [progressSec, setProgressSec] = useState<number>(342); // 5m 42s
  const [totalSec] = useState<number>(68 * 60); // 68 mins
  const [volume, setVolume] = useState<number>(80);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [selectedQuality, setSelectedQuality] = useState<string>('1080p');
  const [selectedSubtitle, setSelectedSubtitle] = useState<string>('English');
  const [selectedAudio, setSelectedAudio] = useState<string>('Korean (Original)');
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showEpDrawer, setShowEpDrawer] = useState<boolean>(false);

  // Playback timer simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgressSec((prev) => {
          if (prev >= totalSec) {
            setIsPlaying(false);
            return totalSec;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, totalSec]);

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remSecs = Math.floor(secs % 60);
    return `${mins.toString().padStart(2, '0')}:${remSecs.toString().padStart(2, '0')}`;
  };

  const currentEpisode: Episode = show.episodesList?.find(
    (e) => e.episodeNumber === currentEpNum
  ) || {
    id: `${show.id}-ep-${currentEpNum}`,
    showId: show.id,
    episodeNumber: currentEpNum,
    title: `Episode ${currentEpNum}`,
    thumbnail: show.landscapeImage || show.bannerImage,
    durationMinutes: 68,
    releaseTime: 'Available Now',
    description: `Episode ${currentEpNum} of ${show.title}. Streaming in Full HD 1080p with express localized subtitles.`,
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between overflow-hidden animate-fadeIn">
      {/* Player Header Bar */}
      <div className="flex items-center justify-between p-4 sm:p-6 bg-gradient-to-b from-black/90 via-black/50 to-transparent z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            title="Back to Browse"
          >
            <span className="material-symbols-outlined text-[24px]">arrow_back</span>
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[#fdc500] font-extrabold text-[12px] uppercase">
                Now Streaming
              </span>
              <span className="text-white/40">•</span>
              <span className="text-white/70 text-[12px]">
                {show.title} - Episode {currentEpNum}
              </span>
            </div>
            <h2 className="text-white text-[16px] sm:text-[18px] font-bold truncate max-w-md">
              {currentEpisode.title}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Episode List Trigger */}
          <button
            onClick={() => setShowEpDrawer(!showEpDrawer)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[12px] font-bold transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">video_library</span>
            <span className="hidden sm:inline">Episodes</span>
          </button>

          {/* More details */}
          <button
            onClick={() => {
              onClose();
              onOpenDetails(show);
            }}
            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[12px] font-bold transition-colors hidden sm:block cursor-pointer"
          >
            Show Details
          </button>

          {/* Close Player */}
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>
      </div>

      {/* Center Video Canvas Area */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden">
        {/* Background Video Mock Art */}
        <img
          src={show.bannerImage || show.landscapeImage}
          alt={show.title}
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.7] transform scale-100"
        />

        {/* Ambient Glow & Center Play State */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 pointer-events-none" />

        {/* Simulated Subtitle Render on Screen */}
        {selectedSubtitle !== 'Off' && (
          <div className="absolute bottom-28 inset-x-0 flex justify-center px-4 pointer-events-none z-10">
            <div className="bg-black/75 backdrop-blur-sm text-white text-[15px] sm:text-[18px] font-semibold px-4 py-1.5 rounded-md shadow-2xl tracking-wide max-w-xl text-center border border-white/10">
              {progressSec % 10 < 5
                ? '“If you open that safe tonight, there is no turning back.”'
                : '“Then let it burn. The truth has waited ten years in the dark.”'}
            </div>
          </div>
        )}

        {/* Play / Pause Big Center Trigger */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="relative z-10 w-20 h-20 rounded-full bg-[#fdc500]/95 hover:bg-[#fdc500] text-[#3e2e00] flex items-center justify-center shadow-[0_0_40px_rgba(253,197,0,0.5)] transform hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <span
            className="material-symbols-outlined text-[42px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {isPlaying ? 'pause' : 'play_arrow'}
          </span>
        </button>

        {/* Settings Flyout */}
        {showSettings && (
          <div className="absolute right-6 bottom-24 bg-[#1f1f23] border border-[#4f4632] rounded-xl p-4 shadow-2xl z-30 w-72 text-[12px] text-[#e3e2e6] flex flex-col gap-3">
            <div>
              <p className="text-[10px] uppercase font-bold text-[#d2c5ab] mb-1.5">
                Streaming Quality
              </p>
              <div className="grid grid-cols-3 gap-1.5">
                {['720p', '1080p', '4K VIP'].map((q) => (
                  <button
                    key={q}
                    onClick={() => {
                      if (q === '4K VIP' && !isVipUser) {
                        onOpenVipModal();
                      } else {
                        setSelectedQuality(q);
                      }
                    }}
                    className={`py-1.5 px-2 rounded font-bold text-center border ${
                      selectedQuality === q
                        ? 'bg-[#fdc500] text-[#3e2e00] border-[#fdc500]'
                        : 'bg-[#292a2d] border-[#4f4632]/50 text-[#e3e2e6] hover:border-[#fdc500]'
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] uppercase font-bold text-[#d2c5ab] mb-1.5">
                Subtitles
              </p>
              <select
                value={selectedSubtitle}
                onChange={(e) => setSelectedSubtitle(e.target.value)}
                className="w-full bg-[#292a2d] border border-[#4f4632] rounded p-1.5 text-[11px] text-[#e3e2e6] focus:outline-none"
              >
                <option value="English">English</option>
                <option value="繁體中文">繁體中文 (Traditional Chinese)</option>
                <option value="简体中文">简体中文 (Simplified Chinese)</option>
                <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                <option value="ภาษาไทย">ภาษาไทย (Thai)</option>
                <option value="Off">Off</option>
              </select>
            </div>

            <div>
              <p className="text-[10px] uppercase font-bold text-[#d2c5ab] mb-1.5">
                Audio Track
              </p>
              <select
                value={selectedAudio}
                onChange={(e) => setSelectedAudio(e.target.value)}
                className="w-full bg-[#292a2d] border border-[#4f4632] rounded p-1.5 text-[11px] text-[#e3e2e6] focus:outline-none"
              >
                <option value="Korean (Original)">Korean (Original)</option>
                <option value="Cantonese Dub">Cantonese Dub</option>
                <option value="Mandarin Dub">Mandarin Dub</option>
                <option value="English Dub">English Dub</option>
                <option value="Thai Dub">Thai Dub</option>
              </select>
            </div>
          </div>
        )}

        {/* Episode Selector Drawer */}
        {showEpDrawer && (
          <div className="absolute right-0 inset-y-0 w-80 bg-[#121316]/95 border-l border-[#4f4632]/50 backdrop-blur-xl p-4 overflow-y-auto z-30 flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#4f4632]/40">
              <h3 className="text-[14px] font-bold text-white">Episodes ({show.totalEpisodes})</h3>
              <button
                onClick={() => setShowEpDrawer(false)}
                className="text-[#d2c5ab] hover:text-white text-[16px]"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-2.5">
              {Array.from({ length: Math.min(show.totalEpisodes, 16) }).map((_, i) => {
                const epNum = i + 1;
                const isCurrent = epNum === currentEpNum;
                return (
                  <button
                    key={epNum}
                    onClick={() => {
                      setCurrentEpNum(epNum);
                      setProgressSec(0);
                      setIsPlaying(true);
                      setShowEpDrawer(false);
                    }}
                    className={`flex items-center gap-2.5 p-2 rounded-lg text-left transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-[#fdc500]/20 border border-[#fdc500]'
                        : 'bg-[#1f1f23] hover:bg-[#292a2d] border border-transparent'
                    }`}
                  >
                    <div className="relative w-20 h-12 bg-[#0d0e11] rounded overflow-hidden shrink-0">
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
                      <div
                        className={`text-[12px] font-bold truncate ${
                          isCurrent ? 'text-[#fdc500]' : 'text-white'
                        }`}
                      >
                        Episode {epNum}
                      </div>
                      <div className="text-[10px] text-[#d2c5ab] truncate">
                        {epNum <= show.currentEpisode ? 'Stream Now' : 'Upcoming'}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Video Control Bar */}
      <div className="p-4 sm:p-6 bg-gradient-to-t from-black/95 via-black/75 to-transparent z-20 flex flex-col gap-2">
        {/* Timeline Slider */}
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-[#d2c5ab] font-mono">
            {formatTime(progressSec)}
          </span>
          <div
            className="flex-1 relative h-2 bg-white/20 rounded-full cursor-pointer group"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickPos = (e.clientX - rect.left) / rect.width;
              setProgressSec(Math.floor(clickPos * totalSec));
            }}
          >
            <div
              className="h-full bg-[#fdc500] rounded-full relative"
              style={{ width: `${(progressSec / totalSec) * 100}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow scale-0 group-hover:scale-100 transition-transform" />
            </div>
          </div>
          <span className="text-[11px] text-[#d2c5ab] font-mono">
            {formatTime(totalSec)}
          </span>
        </div>

        {/* Playback Controls Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4 text-white">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1 hover:text-[#fdc500] transition-colors cursor-pointer"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              <span
                className="material-symbols-outlined text-[28px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {isPlaying ? 'pause' : 'play_arrow'}
              </span>
            </button>

            <button
              onClick={() => setProgressSec((prev) => Math.max(0, prev - 10))}
              className="p-1 hover:text-[#fdc500] transition-colors cursor-pointer"
              title="Rewind 10s"
            >
              <span className="material-symbols-outlined text-[24px]">replay_10</span>
            </button>

            <button
              onClick={() => setProgressSec((prev) => Math.min(totalSec, prev + 10))}
              className="p-1 hover:text-[#fdc500] transition-colors cursor-pointer"
              title="Fast Forward 10s"
            >
              <span className="material-symbols-outlined text-[24px]">forward_10</span>
            </button>

            {/* Volume Control */}
            <div className="flex items-center gap-1.5 ml-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="hover:text-[#fdc500] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[22px]">
                  {isMuted || volume === 0 ? 'volume_off' : 'volume_up'}
                </span>
              </button>
              <input
                type="range"
                min="0"
                max="100"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setVolume(Number(e.target.value));
                  if (isMuted) setIsMuted(false);
                }}
                className="w-16 sm:w-20 accent-[#fdc500] h-1.5 cursor-pointer"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-white">
            {/* Resolution indicator */}
            <span className="bg-[#fdc500]/20 text-[#fdc500] text-[10px] font-bold px-2 py-0.5 rounded border border-[#fdc500]/30 hidden sm:inline">
              {selectedQuality}
            </span>

            {/* Subtitle track button */}
            <button
              onClick={() => setSelectedSubtitle(selectedSubtitle === 'Off' ? 'English' : 'Off')}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                selectedSubtitle !== 'Off' ? 'text-[#fdc500]' : 'text-white/60 hover:text-white'
              }`}
              title={`Subtitles: ${selectedSubtitle}`}
            >
              <span className="material-symbols-outlined text-[22px]">subtitles</span>
            </button>

            {/* Audio / Quality Settings Menu */}
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-1.5 hover:text-[#fdc500] transition-colors cursor-pointer"
              title="Audio & Quality Settings"
            >
              <span className="material-symbols-outlined text-[22px]">settings</span>
            </button>

            {/* Next Episode button */}
            {currentEpNum < show.totalEpisodes && (
              <button
                onClick={() => {
                  setCurrentEpNum((prev) => prev + 1);
                  setProgressSec(0);
                  setIsPlaying(true);
                }}
                className="flex items-center gap-1 text-[12px] font-bold text-white hover:text-[#fdc500] transition-colors cursor-pointer"
              >
                <span className="hidden sm:inline">Next Ep</span>
                <span className="material-symbols-outlined text-[20px]">skip_next</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
