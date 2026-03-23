'use client';

import { useBrightHome } from './BrightHomeProvider';

export default function TopBar() {
  const brightHome = useBrightHome();

  return (
    <div
      className={`fixed left-0 right-0 top-0 z-[60] flex h-11 items-center justify-center border-b px-4 ${
        brightHome
          ? 'border-amber-200/80 bg-gradient-to-r from-amber-50 via-orange-50/90 to-amber-50 text-zinc-800'
          : 'border-white/10 bg-black text-white'
      }`}
      role="banner"
    >
      <p
        className={`max-w-full truncate text-center text-xs sm:text-[14px] ${
          brightHome ? 'text-zinc-700' : ''
        }`}
      >
        <span className="font-semibold">WordPress Plugin</span>
        <span className={`mx-2 ${brightHome ? 'text-zinc-400' : 'opacity-70'}`}>•</span>
        <span className={brightHome ? 'text-zinc-700' : 'opacity-90'}>
          Manage Donations, Donors & Campaigns
        </span>
        <span className={`mx-2 hidden sm:inline ${brightHome ? 'text-zinc-400' : 'opacity-70'}`}>
          •
        </span>
        <span className={`hidden sm:inline ${brightHome ? 'text-zinc-700' : 'opacity-90'}`}>
          Modern & Easy to Use
        </span>
      </p>
    </div>
  );
}
