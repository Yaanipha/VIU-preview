import React, { useState } from 'react';

interface VipModalProps {
  onClose: () => void;
  onUpgradeSuccess: (plan: string) => void;
  isAlreadyVip?: boolean;
}

export const VipModal: React.FC<VipModalProps> = ({
  onClose,
  onUpgradeSuccess,
  isAlreadyVip = false,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<'1month' | '3months' | '12months'>('12months');

  const plans = [
    {
      id: '1month',
      title: '1 Month',
      price: '$5.98',
      period: 'Billed monthly',
      badge: null,
    },
    {
      id: '3months',
      title: '3 Months',
      price: '$14.98',
      period: 'Save 15% ($4.99/mo)',
      badge: 'Popular',
    },
    {
      id: '12months',
      title: '12 Months',
      price: '$49.98',
      period: 'Save 30% ($4.16/mo)',
      badge: 'Best Value',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-xl bg-gradient-to-b from-[#1f1f23] to-[#121316] border border-[#fdc500]/40 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(253,197,0,0.2)] text-[#e3e2e6] my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Crown Icon Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#fe9d00] to-[#fdc500] text-[#2b1700] flex items-center justify-center shadow-[0_0_20px_rgba(253,197,0,0.5)] mb-3">
            <span
              className="material-symbols-outlined text-[32px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              workspace_premium
            </span>
          </div>

          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            {isAlreadyVip ? 'You Are a Viu VIP Member' : 'Unlock Viu VIP Experience'}
          </h2>
          <p className="text-[13px] text-[#d2c5ab] mt-1 max-w-sm">
            Enjoy exclusive Asian dramas, priority simulcasts, and zero video advertisements.
          </p>
        </div>

        {/* VIP Benefits Checklist */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6 bg-[#0d0e11]/80 p-4 rounded-xl border border-[#4f4632]/40 text-[12px]">
          <div className="flex items-center gap-2">
            <span className="text-[#fdc500] font-bold">✓</span>
            <span>Zero Video Advertisements</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#fdc500] font-bold">✓</span>
            <span>Priority Simulcasts within 4-8 hrs</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#fdc500] font-bold">✓</span>
            <span>Full HD 1080p &amp; 4K Ultra HD</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#fdc500] font-bold">✓</span>
            <span>Unlimited Offline Downloads</span>
          </div>
          <div className="flex items-center gap-2 sm:col-span-2">
            <span className="text-[#fdc500] font-bold">✓</span>
            <span>Simultaneous Streaming on Smart TV, Tablet &amp; Mobile</span>
          </div>
        </div>

        {/* Plan Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {plans.map((p) => {
            const isSelected = selectedPlan === p.id;
            return (
              <div
                key={p.id}
                onClick={() => setSelectedPlan(p.id as any)}
                className={`relative p-3 rounded-xl border cursor-pointer text-center transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#fdc500]/15 border-[#fdc500] shadow-[0_0_15px_rgba(253,197,0,0.25)]'
                    : 'bg-[#1b1b1f] border-[#4f4632]/40 hover:border-[#9b8f78]'
                }`}
              >
                {p.badge && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#fe9d00] text-[#2b1700] text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {p.badge}
                  </span>
                )}
                <div>
                  <h4 className="text-[12px] font-bold text-white mt-1">{p.title}</h4>
                  <div className="text-[18px] font-extrabold text-[#fdc500] my-1">
                    {p.price}
                  </div>
                </div>
                <div className="text-[10px] text-[#d2c5ab]">{p.period}</div>
              </div>
            );
          })}
        </div>

        {/* Upgrade Action Button */}
        <button
          onClick={() => onUpgradeSuccess(selectedPlan)}
          className="w-full bg-[#fdc500] hover:bg-[#f5bf00] text-[#3e2e00] font-extrabold text-[14px] py-3.5 rounded-xl shadow-[0_0_25px_rgba(253,197,0,0.4)] transition-all transform active:scale-98 cursor-pointer flex items-center justify-center gap-2"
        >
          <span
            className="material-symbols-outlined text-[20px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            bolt
          </span>
          <span>{isAlreadyVip ? 'Renew VIP Membership' : 'Start VIP Membership Now'}</span>
        </button>

        <p className="text-[10px] text-[#d2c5ab]/70 text-center mt-3">
          Cancel anytime from account settings. Local taxes may apply.
        </p>
      </div>
    </div>
  );
};
