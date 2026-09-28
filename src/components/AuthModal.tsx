import React, { useState } from 'react';
import { UserProfile } from '../types';

interface AuthModalProps {
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleDemoLogin = (vip: boolean = false) => {
    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      name: name.trim() || (vip ? 'VIP Member Min-ho' : 'Drama Fan Yu-jin'),
      email: email.trim() || (vip ? 'minho.vip@viu.com' : 'yujin.stream@viu.com'),
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      isVip: vip,
      watchlist: ['midnight-in-cheongdam', 'scalpel-of-truth', 'queen-of-victoria-harbor'],
      reminders: ['sched-sat-1'],
    };
    onLoginSuccess(newUser);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#1f1f23] border border-[#4f4632]/60 rounded-2xl p-6 sm:p-8 shadow-2xl text-[#e3e2e6] my-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <div className="text-center mb-6">
          <div className="text-2xl font-extrabold text-[#fdc500] font-['Plus_Jakarta_Sans',sans-serif] tracking-tight">
            Viu
          </div>
          <h3 className="text-xl font-bold text-white mt-1">Sign in to your account</h3>
          <p className="text-[12px] text-[#d2c5ab] mt-1">
            Sync your watchlist and continue watching on any screen
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleDemoLogin(false);
          }}
          className="flex flex-col gap-3.5"
        >
          <div>
            <label className="text-[11px] font-bold text-[#d2c5ab] uppercase mb-1 block">
              Display Name
            </label>
            <input
              type="text"
              placeholder="e.g. Min-ho Kim"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#121316] border border-[#4f4632]/60 rounded-lg px-3 py-2 text-[13px] text-white focus:outline-none focus:border-[#fdc500]"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-[#d2c5ab] uppercase mb-1 block">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#121316] border border-[#4f4632]/60 rounded-lg px-3 py-2 text-[13px] text-white focus:outline-none focus:border-[#fdc500]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#fdc500] text-[#3e2e00] font-bold text-[13px] py-2.5 rounded-lg mt-2 hover:brightness-105 transition-all cursor-pointer shadow-md"
          >
            Continue with Email
          </button>
        </form>

        <div className="relative my-5 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#4f4632]/40" />
          </div>
          <span className="relative bg-[#1f1f23] px-3 text-[11px] text-[#d2c5ab] uppercase tracking-wider">
            Or quick demo
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => handleDemoLogin(false)}
            className="w-full bg-[#292a2d] hover:bg-[#343538] border border-[#4f4632]/50 text-white font-semibold text-[12px] py-2 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
            Sign in as Standard Viewer
          </button>

          <button
            onClick={() => handleDemoLogin(true)}
            className="w-full bg-gradient-to-r from-[#fe9d00]/20 to-[#fdc500]/20 border border-[#fdc500]/60 text-[#fdc500] hover:bg-[#fdc500]/30 font-bold text-[12px] py-2 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <span
              className="material-symbols-outlined text-[18px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              workspace_premium
            </span>
            Sign in as VIP Subscriber
          </button>
        </div>
      </div>
    </div>
  );
};
