'use client';

import {
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import gsap from 'gsap';
import {
  CreditCard,
  Repeat,
  Code2,
  BookOpenCheck,
  LayoutGrid,
  LayoutDashboard,
  ChevronLeft,
  ChevronRight,
  Tag,
  MapPin,
} from 'lucide-react';

/**
 * Default slides: Giftflow product highlights (export for reuse / tests).
 * Fields: category, highlight, headline, body, bestFor, footnote, metrics, channel
 */
export const ACTIVITY_CAROUSEL_SLIDES = [
  {
    id: 'payment-gateways',
    Icon: CreditCard,
    category: 'Payments',
    highlight: 'Stripe · PayPal · Local bank rails · More',
    headline: 'Stripe, PayPal, and bank payouts inside WordPress',
    body: 'Connect Stripe, PayPal, and local bank transfers so donors pay the way they prefer. Your finance stack keeps compliance while Giftflow holds forms, receipts, and records inside WordPress without spinning up another silo.',
    bestFor: 'Teams that need cards, wallets, and local rails in one stack',
    footnote: 'Sensitive card data never touches your WordPress server',
    metrics: [
      { label: 'Stripe', value: 'Yes' },
      { label: 'PayPal', value: 'Yes' },
      { label: 'Bank', value: 'Yes' },
    ],
    channel: 'Gateway roadmap grows with your finance stack over time',
  },
  {
    id: 'giving-types',
    Icon: Repeat,
    category: 'Giving',
    highlight: 'One-time gifts · Recurring charges · Subscriptions',
    headline: 'One-time gifts and recurring plans in WordPress',
    body: 'Publish single gifts and subscription plans from the same toolkit. Donors choose amounts and cadence you allow; your team tracks renewals, upgrades, and pauses in one admin view instead of rebuilding spreadsheets every month.',
    bestFor: 'Funds that blend annual appeals with monthly sustainers',
    footnote: 'One profile ties every gift type to the same supporter',
    metrics: [
      { label: 'Once', value: 'Yes' },
      { label: 'Repeat', value: 'Yes' },
      { label: 'Plans', value: 'Yes' },
    ],
    channel: 'Stripe and PayPal billing hooks activate wherever supported',
  },
  {
    id: 'developer-friendly',
    Icon: Code2,
    category: 'Developers',
    highlight: 'Hooks · Patterns · Full developer documentation',
    headline: 'Hooks, patterns, and docs developers trust',
    body: 'See how data moves through Giftflow, when hooks fire, and how to extend the UI without forking. Ship custom themes, partner integrations, or internal tools faster because behavior is documented instead of reverse engineered from code.',
    bestFor: 'Agencies delivering bespoke WordPress experiences daily',
    footnote: 'Runnable examples live next to the reference documentation',
    metrics: [
      { label: 'Hooks', value: 'Yes' },
      { label: 'Docs', value: 'Yes' },
      { label: 'WP', value: 'Yes' },
    ],
    channel: 'Extend with code instead of maintaining a long-term fork',
  },
  {
    id: 'easy-setup',
    Icon: BookOpenCheck,
    category: 'Adoption',
    highlight: 'Fast setup · Staff guides · Blocks & shortcodes',
    headline: 'Fast setup with guides for everyday editors',
    body: 'Complete a short setup path, then share end-user docs for pages, blocks, and admin tasks. Editors ship donation experiences independently so engineering is not pulled in for every copy tweak, embed swap, or seasonal appeal.',
    bestFor: 'Volunteer-led teams that publish without developer help',
    footnote: 'Walkthroughs cover shortcodes, blocks, and key settings',
    metrics: [
      { label: 'Setup', value: 'Yes' },
      { label: 'Guides', value: 'Yes' },
      { label: 'Blocks', value: 'Yes' },
    ],
    channel: 'Day-to-day work stays inside familiar WordPress screens',
  },
  {
    id: 'core-suite',
    Icon: LayoutGrid,
    category: 'Operations',
    highlight: 'Campaigns · Donor profiles · Donation ledger',
    headline: 'Campaigns, donors, and gifts in one admin hub',
    body: 'Launch campaigns, enrich donor profiles, and log gifts without exporting CSVs to answer basic questions. Finance and fundraising share one ledger in WordPress so “who gave to what?” resolves in seconds instead of afternoon research.',
    bestFor: 'Operations teams juggling many funds, appeals, and grants',
    footnote: 'The dashboard remains the system of record for all gifts',
    metrics: [
      { label: 'Campaign', value: 'Yes' },
      { label: 'Donors', value: 'Yes' },
      { label: 'Gifts', value: 'Yes' },
    ],
    channel: 'Exports and reports mirror what administrators see live',
  },
  {
    id: 'donor-dashboard',
    Icon: LayoutDashboard,
    category: 'Donors',
    highlight: 'Portal · Gift history · Receipts · Subscriptions',
    headline: 'Donor portal for receipts, plans, and history',
    body: 'Let supporters sign in to review gifts, download receipts, and adjust recurring plans after you enable the portal. Support volume falls when answers live in a branded hub instead of scattered across inbox threads and PDF attachments.',
    bestFor: 'Organizations with loyal repeat donors and monthly givers',
    footnote: 'Enable the portal whenever you are ready for self-service',
    metrics: [
      { label: 'History', value: 'Yes' },
      { label: 'Receipts', value: 'Yes' },
      { label: 'Plans', value: 'Yes' },
    ],
    channel: 'Supports standard logins or secure magic-link entry flows',
  },
];

const DEFAULT_AUTO_MS = 4000;

const HeroActivityCarousel = forwardRef(function HeroActivityCarousel(
  {
    slides = ACTIVITY_CAROUSEL_SLIDES,
    autoIntervalMs = DEFAULT_AUTO_MS,
    className = '',
    variant = 'light',
    title = 'Why teams pick Giftflow',
    subtitle = 'Payments, giving types, docs, and donor tools—built for WordPress.',
    ariaLabel = 'Giftflow product highlights',
  },
  ref
) {
  const isLight = variant === 'light';
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [touchPaused, setTouchPaused] = useState(false);

  const chromeRef = useRef(null);
  const slidesViewportRef = useRef(null);
  const touchResumeTimerRef = useRef(null);
  const hoverTweenRef = useRef(null);
  const hoverPausedRef = useRef(false);
  const skipSlideRevealRef = useRef(true);

  const count = slides.length;
  const autoplayPaused = hoverPaused || touchPaused;

  useEffect(() => {
    hoverPausedRef.current = hoverPaused;
  }, [hoverPaused]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion || count === 0 || autoplayPaused) return;
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % count);
    }, autoIntervalMs);
    return () => window.clearInterval(id);
  }, [reducedMotion, autoIntervalMs, count, autoplayPaused]);

  useEffect(() => {
    return () => {
      if (touchResumeTimerRef.current) {
        window.clearTimeout(touchResumeTimerRef.current);
      }
      hoverTweenRef.current?.kill();
    };
  }, []);

  const handleMouseEnter = useCallback(() => {
    setHoverPaused(true);
    if (reducedMotion || !chromeRef.current) return;
    hoverTweenRef.current?.kill();
    hoverTweenRef.current = gsap.to(chromeRef.current, {
      // scale: 1.02,
      y: -6,
      duration: 0.45,
      ease: 'power2.out',
    });
  }, [reducedMotion]);

  const handleMouseLeave = useCallback(() => {
    setHoverPaused(false);
    if (!chromeRef.current) return;
    hoverTweenRef.current?.kill();
    hoverTweenRef.current = gsap.to(chromeRef.current, {
      scale: 1,
      y: 0,
      duration: 0.55,
      ease: 'power3.out',
    });
  }, []);

  const handleTouchStart = useCallback(() => {
    if (touchResumeTimerRef.current) {
      window.clearTimeout(touchResumeTimerRef.current);
      touchResumeTimerRef.current = null;
    }
    setTouchPaused(true);
    if (reducedMotion || !chromeRef.current) return;
    gsap.to(chromeRef.current, {
      scale: 1.012,
      duration: 0.25,
      ease: 'power2.out',
    });
  }, [reducedMotion]);

  const scheduleTouchResume = useCallback(() => {
    if (touchResumeTimerRef.current) {
      window.clearTimeout(touchResumeTimerRef.current);
    }
    touchResumeTimerRef.current = window.setTimeout(() => {
      setTouchPaused(false);
      touchResumeTimerRef.current = null;
      if (
        !reducedMotion &&
        chromeRef.current &&
        !hoverPausedRef.current
      ) {
        gsap.to(chromeRef.current, {
          scale: 1,
          duration: 0.4,
          ease: 'power2.inOut',
        });
      }
    }, 450);
  }, [reducedMotion]);

  /** Subtle GSAP reveal on slide change (active card only; skip first paint). */
  useLayoutEffect(() => {
    if (skipSlideRevealRef.current) {
      skipSlideRevealRef.current = false;
      return;
    }
    if (reducedMotion || !slidesViewportRef.current) return;
    const article = slidesViewportRef.current.querySelector(
      `[data-carousel-slide="${activeIndex}"] article`
    );
    if (!article) return;
    gsap.fromTo(
      article,
      { opacity: 0.88, y: 12, filter: 'blur(2px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.42,
        ease: 'power2.out',
      }
    );
  }, [activeIndex, reducedMotion]);

  useEffect(() => {
    setActiveIndex((i) => (i >= count ? 0 : i));
  }, [count]);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + count) % count);
  }, [count]);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % count);
  }, [count]);

  return (
    <div
      ref={ref}
      className={`relative w-full max-w-md mx-auto lg:max-w-none lg:mx-0 opacity-0 will-change-transform ${className}`}
      aria-roledescription="carousel"
      aria-label={ariaLabel}
    >
      <div
        ref={chromeRef}
        className={`relative overflow-hidden rounded-2xl p-4 will-change-transform sm:p-5 ${
          isLight
            ? 'border border-zinc-200/90 bg-white/95 shadow-xl shadow-zinc-200/45 ring-1 ring-amber-100/50 backdrop-blur-md'
            : 'border border-white/15 bg-zinc-950/85 shadow-2xl shadow-black/40 ring-1 ring-white/10 backdrop-blur-md'
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={scheduleTouchResume}
        onTouchCancel={scheduleTouchResume}
      >
        <div
          className={`pointer-events-none absolute inset-0 opacity-100 ${
            isLight
              ? 'bg-[radial-gradient(ellipse_120%_80%_at_100%_0%,rgba(255,122,0,0.08),transparent_50%),radial-gradient(ellipse_90%_60%_at_0%_100%,rgba(251,191,36,0.12),transparent_55%)]'
              : 'bg-[radial-gradient(ellipse_100%_70%_at_80%_-10%,rgba(255,122,0,0.12),transparent_50%)]'
          }`}
          aria-hidden
        />
        <div
          className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent ${
            isLight ? 'via-primary/35' : 'via-primary/25'
          }`}
          aria-hidden
        />
        <div className="relative z-10">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <p
              className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${
                isLight ? 'text-zinc-500' : 'text-zinc-400'
              }`}
            >
              Features
            </p>
            <h2
              className={`font-yeseva-one text-xl sm:text-2xl ${
                isLight ? 'text-zinc-900' : 'text-white'
              }`}
            >
              {title}
            </h2>
            <p
              className={`mt-1 max-w-[14rem] text-sm leading-relaxed ${
                isLight ? 'text-zinc-600' : 'text-zinc-300'
              }`}
            >
              {subtitle}
            </p>
          </div>
          <div className={`flex items-center gap-2 ${isLight ? 'text-zinc-700' : 'text-zinc-300'}`}>
            <button
              type="button"
              onClick={goPrev}
              className={`flex h-9 w-9 items-center justify-center rounded-lg border transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                isLight
                  ? 'border-zinc-300 bg-zinc-50 text-zinc-800 hover:border-zinc-400 hover:bg-white'
                  : 'border-white/20 bg-white/10 text-white hover:border-white/35 hover:bg-white/15'
              }`}
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={goNext}
              className={`flex h-9 w-9 items-center justify-center rounded-lg border transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                isLight
                  ? 'border-zinc-300 bg-zinc-50 text-zinc-800 hover:border-zinc-400 hover:bg-white'
                  : 'border-white/20 bg-white/10 text-white hover:border-white/35 hover:bg-white/15'
              }`}
              aria-label="Next slide"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          ref={slidesViewportRef}
          className={`min-h-[380px] overflow-hidden sm:min-h-[400px] ${isLight ? 'rounded-2xl' : 'rounded-xl'}`}
        >
          <div
            className={`flex ${reducedMotion ? '' : 'transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]'}`}
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {slides.map((item, i) => {
              const IconC = item.Icon;
              return (
                <div
                  key={item.id}
                  data-carousel-slide={i}
                  className="w-full shrink-0 px-0.5"
                  aria-hidden={i !== activeIndex}
                >
                  <article
                    className={
                      isLight
                        ? 'overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-md shadow-zinc-200/40 ring-1 ring-zinc-100/70'
                        : 'overflow-hidden rounded-2xl border border-white/12 bg-gradient-to-b from-zinc-900/70 to-zinc-950/90 shadow-lg shadow-black/30'
                    }
                  >
                    <div
                      className={
                        isLight
                          ? 'border-b border-amber-200/70 bg-gradient-to-r from-amber-50/95 via-white to-orange-50/40 px-5 py-3 sm:px-6'
                          : 'border-b border-white/10 bg-white/[0.06] px-5 py-3 sm:px-6'
                      }
                    >
                      <div className="flex min-h-[2.75rem] flex-wrap items-start justify-between gap-2">
                        <span
                          className={
                            isLight
                              ? 'inline-flex items-center rounded-full border border-primary/25 bg-primary/10 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-primary'
                              : 'inline-flex items-center rounded-full border border-primary/35 bg-primary/15 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-primary'
                          }
                        >
                          {item.category}
                        </span>
                        <span
                          className={`inline-flex max-w-[min(100%,16rem)] items-start gap-1 text-right text-xs font-semibold leading-snug sm:max-w-[55%] ${
                            isLight ? 'text-zinc-600' : 'text-zinc-300'
                          }`}
                        >
                          <Tag
                            className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${isLight ? 'text-zinc-400' : 'text-zinc-500'}`}
                            aria-hidden
                          />
                          <span className="line-clamp-2">{item.highlight}</span>
                        </span>
                      </div>
                    </div>

                    <div className="px-5 pb-5 pt-4 sm:px-6 sm:pb-6 sm:pt-5">
                      <div className="flex gap-4">
                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white shadow-md ${
                            isLight
                              ? 'bg-primary shadow-primary/25'
                              : 'bg-primary shadow-primary/30'
                          }`}
                        >
                          <IconC className="h-6 w-6" strokeWidth={2} aria-hidden />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3
                            className={`line-clamp-2 min-h-[3rem] text-lg font-bold leading-snug sm:min-h-[3.25rem] sm:text-xl ${
                              isLight ? 'text-zinc-900' : 'text-white'
                            }`}
                          >
                            {item.headline}
                          </h3>
                          <p
                            className={`mt-2 line-clamp-5 min-h-[7rem] text-[15px] leading-relaxed sm:min-h-[7.25rem] ${
                              isLight ? 'text-zinc-600' : 'text-zinc-300'
                            }`}
                          >
                            {item.body}
                          </p>
                        </div>
                      </div>

                      <div
                        className={
                          isLight
                            ? 'mt-4 grid grid-cols-3 divide-x divide-zinc-200/80 rounded-xl border border-zinc-200/80 bg-gradient-to-b from-amber-50/40 to-white'
                            : 'mt-4 grid grid-cols-3 divide-x divide-white/10 rounded-xl border border-white/12 bg-zinc-950/50'
                        }
                      >
                        {item.metrics.map((m) => (
                          <div key={m.label} className="px-2 py-2.5 text-center sm:px-3">
                            <p
                              className={`text-[11px] font-semibold uppercase tracking-wide ${
                                isLight ? 'text-zinc-500' : 'text-zinc-400'
                              }`}
                            >
                              {m.label}
                            </p>
                            <p
                              className={`mt-0.5 text-sm font-bold tabular-nums sm:text-base ${
                                isLight ? 'text-zinc-900' : 'text-white'
                              }`}
                            >
                              {m.value}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div
                        className={`mt-4 flex min-h-[4.25rem] flex-col gap-2 border-t pt-4 text-sm sm:flex-row sm:items-start sm:justify-between ${
                          isLight
                            ? 'border-amber-200/60 text-zinc-700'
                            : 'border-white/10 text-zinc-300'
                        }`}
                      >
                        <span
                          className={`inline-flex min-w-0 max-w-full items-start gap-1.5 font-medium sm:max-w-[48%] ${
                            isLight ? 'text-zinc-800' : 'text-zinc-200'
                          }`}
                        >
                          <MapPin
                            className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${isLight ? 'text-primary' : 'text-primary/80'}`}
                            aria-hidden
                          />
                          <span className="min-w-0">
                            <span
                              className={`block text-[11px] font-semibold uppercase tracking-wide ${
                                isLight ? 'text-zinc-500' : 'text-zinc-400'
                              }`}
                            >
                              Best for
                            </span>
                            <span className="line-clamp-2 leading-snug">{item.bestFor}</span>
                          </span>
                        </span>
                        <span
                          className={`min-h-[2.75rem] rounded-lg border px-2 py-1.5 font-mono text-[11px] leading-snug sm:max-w-[48%] sm:text-xs ${
                            isLight
                              ? 'border-amber-200/80 bg-amber-50/70 text-zinc-700'
                              : 'border-white/10 bg-zinc-950/60 text-zinc-400'
                          }`}
                        >
                          {item.channel}
                        </span>
                      </div>

                      <p
                        className={`mt-3 flex min-h-[2.5rem] items-start gap-1.5 text-xs leading-snug ${
                          isLight ? 'text-zinc-600' : 'text-zinc-400'
                        }`}
                      >
                        <span
                          className={`mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full ${
                            isLight ? 'bg-emerald-600' : 'bg-emerald-400'
                          }`}
                          aria-hidden
                        />
                        {item.footnote} · Giftflow for WordPress
                      </p>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>

        <div
          className={`mt-4 flex items-center justify-between gap-3 border-t pt-4 ${
            isLight ? 'border-amber-200/60' : 'border-white/10'
          }`}
          role="tablist"
          aria-label="Choose slide"
        >
          <div className="flex flex-1 gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === activeIndex}
                aria-label={`Slide ${i + 1}`}
                onClick={() => setActiveIndex(i)}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? 'bg-primary'
                    : isLight
                      ? 'bg-zinc-300 hover:bg-zinc-400'
                      : 'bg-white/30 hover:bg-white/45'
                }`}
              />
            ))}
          </div>
          <span
            className={`shrink-0 tabular-nums text-sm font-semibold ${
              isLight ? 'text-zinc-600' : 'text-zinc-300'
            }`}
          >
            {String(activeIndex + 1).padStart(2, '0')}
            <span className={isLight ? 'text-zinc-400' : 'text-zinc-500'}>/</span>
            {String(count).padStart(2, '0')}
          </span>
        </div>
        </div>
      </div>
    </div>
  );
});

HeroActivityCarousel.displayName = 'HeroActivityCarousel';

export default HeroActivityCarousel;
