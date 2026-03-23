'use client';

import { createContext, useContext } from 'react';
import { usePathname } from 'next/navigation';

const MarketingLightContext = createContext(false);

/** True on marketing routes that use the bright shell (home, Pro, Contact, Blog). */
export function isMarketingLightPath(pathname) {
  if (!pathname) return false;
  if (pathname === '/') return true;
  if (pathname === '/pro' || pathname === '/contact') return true;
  if (pathname.startsWith('/blog')) return true;
  return false;
}

/** @deprecated Prefer useMarketingLight — kept for existing imports */
export function useBrightHome() {
  return useContext(MarketingLightContext);
}

export function useMarketingLight() {
  return useContext(MarketingLightContext);
}

export default function BrightHomeProvider({ children }) {
  const pathname = usePathname();
  return (
    <MarketingLightContext.Provider value={isMarketingLightPath(pathname)}>
      {children}
    </MarketingLightContext.Provider>
  );
}
