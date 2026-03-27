'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Globe,
  LayoutDashboard,
  Layers,
  MoreHorizontal,
  RefreshCw,
  Sparkles,
} from 'lucide-react';

const SCREENSHOT_BASE = 'https://ps.w.org/giftflow/assets';
const SCREENSHOT_COUNT = 11;

export const SCREENSHOT_URLS = Array.from({ length: SCREENSHOT_COUNT }, (_, i) => ({
  n: i + 1,
  src: `${SCREENSHOT_BASE}/screenshot-${i + 1}.jpg`,
}));

const ENTRY_HIGHLIGHTS = [
  {
    icon: LayoutDashboard,
    title: 'WP admin, as shipped',
    text: 'Settings, reports, and campaign tools—the same UI thousands of sites use in production.',
  },
  {
    icon: Layers,
    title: 'Donor journeys',
    text: 'Checkout, receipts, and donor-facing flows so you can judge clarity before you install.',
  },
  {
    icon: Globe,
    title: 'Straight from the directory',
    text: 'These frames match the assets hosted on WordPress.org—no mockups or retouched shots.',
  },
];

export default function HomeImageInAppSection({ variant = 'dark' }) {
  const isLight = variant === 'light';
  const [active, setActive] = useState(0);
  const thumbsScrollRef = useRef(null);
  const thumbBtnRefs = useRef([]);

  const go = useCallback((dir) => {
    setActive((i) => {
      const next = i + dir;
      if (next < 0) return SCREENSHOT_COUNT - 1;
      if (next >= SCREENSHOT_COUNT) return 0;
      return next;
    });
  }, []);

  const select = useCallback((index) => {
    setActive(index);
  }, []);

  useEffect(() => {
    const btn = thumbBtnRefs.current[active];
    const scroller = thumbsScrollRef.current;
    if (!btn || !scroller) return;
    btn.scrollIntoView({
      inline: 'center',
      block: 'nearest',
      behavior: 'auto',
    });
  }, [active]);

  const { src, n } = SCREENSHOT_URLS[active];

  const sectionSurface = isLight
    ? 'border-t border-zinc-200/70 bg-gradient-to-b from-white via-orange-50/20 to-amber-50/25'
    : 'border-t border-white/[0.06] bg-zinc-950';

  const textMuted = isLight ? 'text-zinc-600' : 'text-zinc-400';
  const textTitle = isLight ? 'text-zinc-900' : 'text-white';
  const textSub = isLight ? 'text-zinc-500' : 'text-zinc-400';
  const cardHighlight = isLight
    ? 'rounded-2xl border border-zinc-200/90 bg-white/90 p-4 shadow-sm ring-1 ring-zinc-100/80'
    : 'rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4 backdrop-blur-sm';
  const quoteCard = isLight
    ? 'rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-amber-50/40 p-5 ring-1 ring-primary/10'
    : 'rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 via-transparent to-amber-500/5 p-5 ring-1 ring-primary/15';

  return (
    <section
      id="in-app"
      aria-labelledby="in-app-heading"
      className={`relative py-16 sm:py-20 lg:py-24 ${sectionSurface}`}
    >
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent ${
          isLight ? 'via-zinc-200/80' : 'via-white/10'
        }`}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.2fr)] lg:items-center lg:gap-16 xl:gap-20">
          <div className="max-w-xl lg:max-w-none">
            <div className="mb-6 flex flex-wrap items-center gap-2 sm:gap-3">
              <div
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] shadow-sm ${
                  isLight
                    ? 'border-amber-200/90 bg-white text-zinc-700'
                    : 'border-primary/35 bg-primary/15 text-amber-50'
                }`}
              >
                <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden />
                Product tour
              </div>
              <div
                className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider ${
                  isLight ? 'border-zinc-200/90 bg-zinc-50 text-zinc-600' : 'border-white/10 bg-white/[0.06] text-zinc-300'
                }`}
              >
                wordpress.org
              </div>
            </div>
            <h2
              id="in-app-heading"
              className={`font-yeseva-one text-[2rem] font-normal leading-[1.08] sm:text-4xl lg:text-[2.65rem] ${textTitle}`}
            >
              <span className={isLight ? 'text-zinc-600' : 'text-zinc-300'}>Inside the experience</span>
              <span
                className={`mt-1 block ${
                  isLight
                    ? 'bg-gradient-to-r from-zinc-800 via-primary to-amber-600 bg-clip-text text-transparent'
                    : 'bg-gradient-to-r from-amber-100 via-white to-primary bg-clip-text text-transparent'
                }`}
              >
                frame by frame
              </span>
            </h2>
            <p className={`mt-5 text-base leading-relaxed sm:text-lg ${textMuted}`}>
              Use the gallery—each still is from the live plugin listing, so layout and copy match what installs see.
            </p>
            <ul className="mt-8 space-y-3" aria-label="What you are browsing">
              {ENTRY_HIGHLIGHTS.map(({ icon: Icon, title, text }) => (
                <li key={title} className={`flex gap-4 ${cardHighlight}`}>
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 ${
                      isLight
                        ? 'bg-gradient-to-br from-primary/15 to-amber-400/10 ring-primary/15'
                        : 'bg-gradient-to-br from-primary/25 to-amber-500/10 ring-primary/20'
                    }`}
                  >
                    <Icon className="h-5 w-5 text-primary" aria-hidden />
                  </span>
                  <div>
                    <p className={`font-semibold ${textTitle}`}>{title}</p>
                    <p className={`mt-1 text-sm leading-relaxed ${textSub}`}>{text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className={`mt-8 ${quoteCard}`}>
              <p className={`text-sm font-medium leading-relaxed ${isLight ? 'text-zinc-700' : 'text-zinc-200'}`}>
                <span className="text-primary">&ldquo;</span>
                Click a thumbnail to study real pixels—no mockups, no retouching.
                <span className="text-primary">&rdquo;</span>
              </p>
            </div>
            <div
              className={`mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-2 border-l-[3px] border-primary pl-5 ${textSub}`}
            >
              <span className={`font-yeseva-one text-4xl tabular-nums sm:text-5xl ${textTitle}`}>
                {String(n).padStart(2, '0')}
              </span>
              <span className="text-sm font-medium uppercase tracking-widest">of</span>
              <span className={`font-yeseva-one text-2xl tabular-nums sm:text-3xl ${isLight ? 'text-zinc-400' : 'text-zinc-400'}`}>
                {String(SCREENSHOT_COUNT).padStart(2, '0')}
              </span>
              <span className="w-full text-xs sm:pl-0">Current frame</span>
            </div>
          </div>

          <div className="min-w-0">
            <div
              className={`overflow-hidden shadow-[0_22px_56px_-18px_rgba(0,0,0,0.18),0_0_0_1px_rgba(0,0,0,0.06)] ${
                isLight ? 'rounded-[20px] bg-[#ececee]' : 'rounded-[20px] bg-[#2a2a2e]'
              }`}
            >
              <div
                className={`flex h-12 items-center gap-3 border-b px-4 sm:h-[3.25rem] sm:px-5 ${
                  isLight
                    ? 'border-black/[0.06] bg-gradient-to-b from-[#fbfbfb] to-[#e8e8ea]'
                    : 'border-white/[0.06] bg-gradient-to-b from-[#3d3d42] to-[#323236]'
                }`}
              >
                <span className="flex shrink-0 gap-2" aria-hidden>
                  <span className="h-3 w-3 rounded-full bg-[#ff6157] shadow-[inset_0_-1px_2px_rgba(0,0,0,0.25)] ring-1 ring-black/12 sm:h-3.5 sm:w-3.5" />
                  <span className="h-3 w-3 rounded-full bg-[#ffc130] shadow-[inset_0_-1px_2px_rgba(0,0,0,0.2)] ring-1 ring-black/10 sm:h-3.5 sm:w-3.5" />
                  <span className="h-3 w-3 rounded-full bg-[#2acb42] shadow-[inset_0_-1px_2px_rgba(0,0,0,0.2)] ring-1 ring-black/10 sm:h-3.5 sm:w-3.5" />
                </span>
                <div className="min-w-0 flex-1 text-center">
                  <p
                    className={`truncate text-[11px] font-semibold sm:text-xs ${
                      isLight ? 'text-zinc-600' : 'text-zinc-300'
                    }`}
                  >
                    Giftflow — Screenshots
                  </p>
                  <p className={`truncate font-mono text-[10px] sm:text-[11px] ${isLight ? 'text-zinc-400' : 'text-zinc-500'}`}>
                    wordpress.org/plugins/giftflow
                  </p>
                </div>
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${
                    isLight ? 'text-zinc-400 hover:bg-black/[0.04]' : 'text-zinc-500 hover:bg-white/[0.06]'
                  }`}
                  aria-hidden
                >
                  <MoreHorizontal className="h-4 w-4" />
                </span>
              </div>

              <div
                className={`flex items-center gap-2 border-b px-2 py-2 sm:gap-2.5 sm:px-3 sm:py-2.5 ${
                  isLight
                    ? 'border-black/[0.05] bg-[#f5f5f7]'
                    : 'border-white/[0.05] bg-[#353539]'
                }`}
              >
                <div
                  className={`pointer-events-none flex shrink-0 items-center gap-0.5 rounded-lg border p-1 shadow-sm ${
                    isLight
                      ? 'border-black/[0.06] bg-white/90'
                      : 'border-white/10 bg-white/10'
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-md ${isLight ? 'text-zinc-400' : 'text-zinc-500'}`}
                  >
                    <ArrowLeft className="h-4 w-4" strokeWidth={2} aria-hidden />
                  </span>
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-md ${isLight ? 'text-zinc-400' : 'text-zinc-500'}`}
                  >
                    <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
                  </span>
                </div>
                <div className="relative min-w-0 flex-1">
                  <div
                    className={`flex items-center gap-2 rounded-lg border py-2 pl-3 pr-10 shadow-sm sm:rounded-xl sm:py-2.5 sm:pl-3.5 ${
                      isLight
                        ? 'border-zinc-300/80 bg-white'
                        : 'border-zinc-600/60 bg-[#2c2c30]'
                    }`}
                  >
                    <Globe
                      className={`h-4 w-4 shrink-0 sm:h-[1.125rem] sm:w-[1.125rem] ${isLight ? 'text-emerald-600' : 'text-emerald-500'}`}
                      aria-hidden
                    />
                    <p
                      className={`min-w-0 truncate text-left font-mono text-[11px] leading-snug sm:text-xs ${
                        isLight ? 'text-zinc-800' : 'text-zinc-200'
                      }`}
                    >
                      <span className={isLight ? 'text-zinc-500' : 'text-zinc-500'}>https://</span>
                      wordpress.org/plugins/
                      <span className="font-semibold">giftflow</span>
                      <span className={isLight ? 'text-zinc-400' : 'text-zinc-500'}> · {n}</span>
                    </p>
                  </div>
                  <span
                    className={`pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 sm:right-3 ${
                      isLight ? 'text-zinc-400' : 'text-zinc-500'
                    }`}
                    aria-hidden
                  >
                    <RefreshCw className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </span>
                </div>
              </div>

              <div className={isLight ? 'bg-[#d8d8dc] p-1.5 sm:p-2' : 'bg-[#1e1e22] p-1.5 sm:p-2'}>
                <div
                  className={`relative overflow-hidden shadow-inner ${
                    isLight ? 'rounded-[12px] bg-white ring-1 ring-black/[0.06]' : 'rounded-[12px] bg-zinc-900 ring-1 ring-white/[0.08]'
                  } sm:rounded-[14px]`}
                >
                  <div className={`relative aspect-[4/3] w-full ${isLight ? 'bg-zinc-100' : 'bg-zinc-800'}`}>
                    <Image
                      key={src}
                      src={src}
                      alt={`Giftflow WordPress plugin screenshot ${n} of ${SCREENSHOT_COUNT}`}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      priority={n <= 2}
                      loading={n <= 2 ? 'eager' : undefined}
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/25 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between gap-2 p-3 sm:p-4">
                      <button
                        type="button"
                        onClick={() => go(-1)}
                        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/90 bg-white/95 text-zinc-800 shadow-md transition hover:bg-white sm:h-11 sm:w-11"
                        aria-label="Previous screenshot"
                      >
                        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                      </button>
                      <span className="truncate rounded-full border border-zinc-200/90 bg-white/95 px-3 py-1.5 text-center text-xs font-semibold text-zinc-800 shadow-sm sm:px-4 sm:py-2 sm:text-sm">
                        Frame {n} / {SCREENSHOT_COUNT}
                      </span>
                      <button
                        type="button"
                        onClick={() => go(1)}
                        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/90 bg-white/95 text-zinc-800 shadow-md transition hover:bg-white sm:h-11 sm:w-11"
                        aria-label="Next screenshot"
                      >
                        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5" role="tablist" aria-label="Screenshot thumbnails">
              <p className={`mb-2 text-xs font-semibold uppercase tracking-wider ${textSub}`}>All frames</p>
              <div
                ref={thumbsScrollRef}
                className="flex gap-2 overflow-x-auto pb-1 pt-0.5 [scrollbar-width:thin] sm:gap-2.5"
              >
                {SCREENSHOT_URLS.map(({ n: num, src: thumbSrc }, i) => {
                  const selected = i === active;
                  return (
                    <button
                      key={num}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      aria-label={`View screenshot ${num}`}
                      ref={(el) => {
                        thumbBtnRefs.current[i] = el;
                      }}
                      onClick={() => select(i)}
                      className={`relative shrink-0 snap-center overflow-hidden rounded-lg border transition-shadow duration-200 sm:rounded-xl ${
                        selected
                          ? 'border-primary shadow-[0_0_0_2px_rgba(255,122,0,0.35)] ring-2 ring-primary/30'
                          : isLight
                            ? 'border-zinc-200/90 bg-white shadow-sm hover:border-zinc-300'
                            : 'border-zinc-700 bg-zinc-900 hover:border-zinc-600'
                      }`}
                    >
                      <span className="relative block h-14 w-[4.75rem] sm:h-16 sm:w-[5.5rem]">
                        <Image
                          src={thumbSrc}
                          alt=""
                          fill
                          className="object-cover object-top"
                          sizes="100px"
                        />
                      </span>
                      <span
                        className={`absolute bottom-1 right-1 rounded px-1 py-0.5 text-[9px] font-bold tabular-nums ${
                          isLight ? 'bg-zinc-900/80 text-white' : 'bg-black/70 text-zinc-100'
                        }`}
                      >
                        {String(num).padStart(2, '0')}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
