import React, { useState } from 'react';
import { ScheduleItem, Show } from '../types';

interface WeeklyScheduleSectionProps {
  scheduleItems: ScheduleItem[];
  shows: Show[];
  onSelectShow: (show: Show) => void;
  onToggleReminder: (item: ScheduleItem) => void;
  reminders: string[];
}

export const WeeklyScheduleSection: React.FC<WeeklyScheduleSectionProps> = ({
  scheduleItems,
  shows,
  onSelectShow,
  onToggleReminder,
  reminders,
}) => {
  const [activeDay, setActiveDay] = useState<'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN'>('SAT');

  const days: ('MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN')[] = [
    'MON',
    'TUE',
    'WED',
    'THU',
    'FRI',
    'SAT',
    'SUN',
  ];

  const filteredItems = scheduleItems.filter((item) => item.day === activeDay);

  return (
    <section className="bg-[#1f1f23] p-4 sm:p-6 rounded-xl border border-[#4f4632]/40 shadow-xl">
      {/* Top Header & Day Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[#fdc500] text-[28px]">
            calendar_month
          </span>
          <div>
            <h2 className="text-[18px] sm:text-[20px] font-bold text-[#e3e2e6]">
              Weekly Release Express Schedule
            </h2>
            <p className="text-[12px] sm:text-[13px] text-[#d2c5ab]">
              Never miss a new episode drop from your favorite ongoing drama
            </p>
          </div>
        </div>

        {/* Day Selector Pills */}
        <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto hide-scrollbar bg-[#0d0e11] p-1.5 rounded-lg border border-[#4f4632]/40 self-start lg:self-auto">
          {days.map((day) => {
            const isActive = activeDay === day;
            return (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`px-3 sm:px-3.5 py-1.5 rounded text-[10px] font-extrabold transition-all cursor-pointer flex items-center gap-1 ${
                  isActive
                    ? 'bg-[#fdc500] text-[#3e2e00] shadow-sm'
                    : 'text-[#d2c5ab] hover:text-[#e3e2e6] hover:bg-[#1f1f23]'
                }`}
              >
                <span>{day}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3e2e00]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Schedule Items for Selected Day */}
      {filteredItems.length === 0 ? (
        <div className="py-8 text-center text-[#d2c5ab] text-[13px]">
          No new broadcast scheduled for this day yet. Check back soon!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredItems.map((item) => {
            const isNotified = reminders.includes(item.id);
            const matchedShow = shows.find((s) => s.id === item.showId);

            return (
              <div
                key={item.id}
                onClick={() => matchedShow && onSelectShow(matchedShow)}
                className="flex items-center gap-3 p-3 rounded-lg bg-[#1b1b1f] border border-[#4f4632]/40 hover:border-[#fdc500]/60 transition-all duration-200 group cursor-pointer shadow"
              >
                {/* Square Thumbnail */}
                <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0 bg-[#121316] relative">
                  <img
                    src={item.thumbnail}
                    alt={item.showTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <span className="absolute bottom-0 inset-x-0 bg-[#fdc500] text-[#3e2e00] text-[9px] font-extrabold text-center leading-tight py-0.5">
                    EP {item.episodeNumber}
                  </span>
                </div>

                {/* Text Info */}
                <div className="flex-grow min-w-0">
                  <span className="text-[#00e1fb] text-[10px] uppercase font-bold tracking-wider block truncate">
                    {item.timeText}
                  </span>
                  <h4 className="text-[14px] font-bold text-[#e3e2e6] truncate group-hover:text-[#fdc500] transition-colors">
                    {item.showTitle}
                  </h4>
                  <p className="text-[12px] text-[#d2c5ab] truncate mt-0.5">
                    {item.note}
                  </p>
                </div>

                {/* Notification Bell Action */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleReminder(item);
                  }}
                  className={`p-1.5 rounded-full transition-colors cursor-pointer shrink-0 ${
                    isNotified
                      ? 'text-[#fdc500] bg-[#fdc500]/15'
                      : 'text-[#4f4632] group-hover:text-[#fdc500] hover:bg-[#292a2d]'
                  }`}
                  title={isNotified ? 'Reminder active' : 'Notify me when live'}
                >
                  <span
                    className="material-symbols-outlined text-[20px]"
                    style={{ fontVariationSettings: isNotified ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    notifications
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
