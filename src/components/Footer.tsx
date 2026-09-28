import React from 'react';

interface FooterProps {
  onOpenAppInfo?: (topic: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAppInfo }) => {
  return (
    <footer className="bg-[#0d0e11] border-t border-[#4f4632]/40 mt-14">
      <div className="flex flex-col gap-6 px-4 sm:px-6 lg:px-14 py-8 sm:py-10 max-w-full mx-auto w-full">
        {/* Top Row: Brand & App Store Badges */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#4f4632]/30">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2.5">
              <span className="text-[22px] font-extrabold text-[#fdc500] font-['Plus_Jakarta_Sans',sans-serif]">
                Viu
              </span>
              <span className="text-[#d2c5ab] text-[10px] font-bold border border-[#4f4632]/50 px-2.5 py-0.5 rounded uppercase tracking-wider">
                Pan-Asian Entertainment Hub
              </span>
            </div>
            <p className="text-[12px] sm:text-[13px] text-[#d2c5ab] max-w-md leading-relaxed">
              Stream the latest premium Asian Dramas, Viu Originals, variety shows, and anime with express subtitles anytime, anywhere.
            </p>
          </div>

          {/* App Download Buttons */}
          <div className="flex items-center gap-3 flex-wrap">
            <div
              onClick={() => onOpenAppInfo?.('App Store')}
              className="flex items-center gap-2.5 px-3.5 py-2 rounded-lg bg-[#1f1f23] border border-[#4f4632]/40 text-[#e3e2e6] hover:border-[#fdc500] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[22px]">phone_iphone</span>
              <div className="flex flex-col text-left">
                <span className="text-[9px] text-[#d2c5ab] uppercase leading-none">
                  Available on
                </span>
                <span className="text-[12px] font-bold leading-tight">App Store</span>
              </div>
            </div>

            <div
              onClick={() => onOpenAppInfo?.('Google Play')}
              className="flex items-center gap-2.5 px-3.5 py-2 rounded-lg bg-[#1f1f23] border border-[#4f4632]/40 text-[#e3e2e6] hover:border-[#fdc500] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[22px]">play_shapes</span>
              <div className="flex flex-col text-left">
                <span className="text-[9px] text-[#d2c5ab] uppercase leading-none">
                  Get it on
                </span>
                <span className="text-[12px] font-bold leading-tight">Google Play</span>
              </div>
            </div>

            <div
              onClick={() => onOpenAppInfo?.('Smart TV')}
              className="flex items-center gap-2.5 px-3.5 py-2 rounded-lg bg-[#1f1f23] border border-[#4f4632]/40 text-[#e3e2e6] hover:border-[#fdc500] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[22px]">tv</span>
              <div className="flex flex-col text-left">
                <span className="text-[9px] text-[#d2c5ab] uppercase leading-none">
                  Watch on
                </span>
                <span className="text-[12px] font-bold leading-tight">Smart TV</span>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Row: Links */}
        <div className="flex flex-wrap items-center gap-x-6 sm:gap-x-8 gap-y-2 text-[12px] sm:text-[13px] text-[#d2c5ab]">
          {[
            'About Viu',
            'Terms & Conditions',
            'Privacy Policy',
            'Supported Devices',
            'FAQ & Help Center',
            'Connect with Us',
          ].map((item) => (
            <button
              key={item}
              onClick={() => onOpenAppInfo?.(item)}
              className="hover:text-[#fdc500] transition-colors cursor-pointer"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Bottom Row: Copyright */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-[#4f4632]/20">
          <p className="text-[12px] text-[#d2c5ab]/80">
            © 2024 Viu International Limited. All Rights Reserved.
          </p>

          <div className="flex items-center gap-4 text-[#d2c5ab] text-[18px]">
            <span
              className="material-symbols-outlined hover:text-[#fdc500] cursor-pointer transition-colors"
              title="Multi-language support"
            >
              language
            </span>
            <span
              className="material-symbols-outlined hover:text-[#fdc500] cursor-pointer transition-colors"
              title="Fast localized subtitles"
            >
              subtitles
            </span>
            <span
              className="material-symbols-outlined hover:text-[#fdc500] cursor-pointer transition-colors"
              title="Full HD 1080p / 4K UHD"
            >
              high_quality
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
