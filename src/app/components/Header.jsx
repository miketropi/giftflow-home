'use client';

import { useRef, useLayoutEffect, useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Menu,
  Download,
  Sparkles,
  X,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { useBrightHome } from './BrightHomeProvider';

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
  const pathname = usePathname();
  const marketingLight = useBrightHome();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [portalEl, setPortalEl] = useState(null);

  const headerRef = useRef(null);
  const mobileBackdropRef = useRef(null);
  const mobilePanelRef = useRef(null);
  const mobileDrawerTlRef = useRef(null);
  const mobileNavOpenRef = useRef(false);
  const isClosingDrawerRef = useRef(false);
  const brandRef = useRef(null);
  const navInnerRef = useRef(null);
  const ctaRef = useRef(null);
  const mobileToolsRef = useRef(null);
  const glowRef = useRef(null);

  const downloadHref =
    process.env.NEXT_PUBLIC_DOWNLOAD_URL?.trim() || '/#download';
  const downloadIsExternal = downloadHref.startsWith('http');
  const demoHref =
    process.env.NEXT_PUBLIC_DEMO_URL?.trim() || '/pro';
  const demoIsExternal = demoHref.startsWith('http');

  const navigationItems = [
    { name: 'Home', href: '/' },
    // { name: 'Features', href: '/#features' },
    { name: 'Giftflow Pro', href: '/pro' },
    { name: 'Articles', href: '/blog' },
    { name: 'Contact', href: '/contact' }, 
    // documentation
    { name: 'Documentation', href: 'https://giftflow-doc.beplus-agency.cloud/', target: '_blank' },
  ];

  const linkIsActive = (href) => {
    if (href === '/') return pathname === '/';
    if (href.startsWith('/#')) return false;
    if (href === '/blog') {
      return pathname === '/blog' || pathname.startsWith('/blog/');
    }
    return pathname === href;
  };

  const closeMobileNav = useCallback(() => {
    if (!mobileNavOpenRef.current || isClosingDrawerRef.current) return;

    const backdrop = mobileBackdropRef.current;
    const panel = mobilePanelRef.current;

    mobileDrawerTlRef.current?.kill();
    mobileDrawerTlRef.current = null;

    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!backdrop || !panel || reduceMotion) {
      setMobileNavOpen(false);
      return;
    }

    isClosingDrawerRef.current = true;

    const intro = panel.querySelectorAll('[data-mobile-drawer-intro]');
    const items = panel.querySelectorAll('[data-mobile-nav-item]');
    const footer = panel.querySelector('[data-mobile-nav-footer]');

    const tl = gsap.timeline({
      defaults: { ease: 'power2.in' },
      onComplete: () => {
        isClosingDrawerRef.current = false;
        setMobileNavOpen(false);
      },
    });

    tl.to(items, {
      opacity: 0,
      x: 22,
      duration: 0.2,
      stagger: { each: 0.04, from: 'end' },
    });
    if (footer) {
      tl.to(footer, { opacity: 0, y: 14, duration: 0.22 }, '<45%');
    }
    tl.to(intro, { opacity: 0, y: -10, duration: 0.22, stagger: 0.05 }, '<35%');
    tl.to(backdrop, { opacity: 0, duration: 0.34, ease: 'power2.inOut' }, '<40%');
    tl.to(panel, { xPercent: 100, duration: 0.52, ease: 'power3.inOut' }, '<28%');

    mobileDrawerTlRef.current = tl;
  }, []);

  useEffect(() => {
    setPortalEl(document.body);
  }, []);

  useLayoutEffect(() => {
    mobileNavOpenRef.current = mobileNavOpen;
  }, [mobileNavOpen]);

  useEffect(() => {
    closeMobileNav();
  }, [pathname, closeMobileNav]);

  useLayoutEffect(() => {
    if (!mobileNavOpen) return undefined;

    const backdrop = mobileBackdropRef.current;
    const panel = mobilePanelRef.current;
    if (!backdrop || !panel) return undefined;

    mobileDrawerTlRef.current?.kill();
    mobileDrawerTlRef.current = null;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const intro = panel.querySelectorAll('[data-mobile-drawer-intro]');
    const items = panel.querySelectorAll('[data-mobile-nav-item]');
    const footer = panel.querySelector('[data-mobile-nav-footer]');

    if (reduceMotion) {
      gsap.set(backdrop, { opacity: 1 });
      gsap.set(panel, { xPercent: 0 });
      gsap.set([...intro, ...items, footer].filter(Boolean), {
        opacity: 1,
        x: 0,
        y: 0,
      });
      return undefined;
    }

    gsap.set(backdrop, { opacity: 0 });
    gsap.set(panel, { xPercent: 100 });
    gsap.set(intro, { opacity: 0, y: -14 });
    gsap.set(items, { opacity: 0, x: 32 });
    if (footer) gsap.set(footer, { opacity: 0, y: 20 });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.to(backdrop, { opacity: 1, duration: 0.42, ease: 'power2.out' });
    tl.to(
      panel,
      { xPercent: 0, duration: 0.68, ease: 'power4.out' },
      '<18%'
    );
    tl.to(
      intro,
      { opacity: 1, y: 0, duration: 0.48, stagger: 0.08 },
      '-=0.42'
    );
    tl.to(
      items,
      {
        opacity: 1,
        x: 0,
        duration: 0.46,
        stagger: 0.07,
        ease: 'power3.out',
      },
      '-=0.36'
    );
    if (footer) {
      tl.to(
        footer,
        { opacity: 1, y: 0, duration: 0.44, ease: 'power3.out' },
        '-=0.3'
      );
    }

    mobileDrawerTlRef.current = tl;

    return () => {
      tl.kill();
      if (mobileDrawerTlRef.current === tl) mobileDrawerTlRef.current = null;
    };
  }, [mobileNavOpen]);

  useEffect(() => {
    if (!mobileNavOpen) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeMobileNav();
    };
    document.addEventListener('keydown', onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [mobileNavOpen, closeMobileNav]);

  useLayoutEffect(() => {
    const header = headerRef.current;
    const brand = brandRef.current;
    const navInner = navInnerRef.current;
    const cta = ctaRef.current;
    const mobileTools = mobileToolsRef.current;
    const glow = glowRef.current;
    if (!header) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
      .matches;

    const ctx = gsap.context(() => {
      if (reduceMotion) return;

      const navLinks = navInner?.querySelectorAll('a[data-nav-link]') ?? [];

      gsap.set([brand, ...navLinks, cta, mobileTools].filter(Boolean), {
        opacity: 0,
        y: -14,
      });

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        delay: 0.06,
      });

      tl.to(brand, { opacity: 1, y: 0, duration: 0.55 });
      tl.to(
        navLinks,
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.055 },
        '-=0.38'
      );
      tl.to(cta, { opacity: 1, y: 0, duration: 0.45 }, '-=0.32');
      tl.to(
        mobileTools,
        { opacity: 1, y: 0, duration: 0.4 },
        '-=0.35'
      );

      if (glow) {
        gsap.fromTo(
          glow,
          { x: -40, opacity: 0.5 },
          {
            x: 40,
            opacity: 0.85,
            ease: 'none',
            scrollTrigger: {
              trigger: document.documentElement,
              start: 'top top',
              end: 'max',
              scrub: 1.25,
              invalidateOnRefresh: true,
            },
          }
        );
      }
    }, header);

    return () => ctx.revert();
  }, []); 

  const linkClass = (href) => {
    const active = linkIsActive(href);
    const base =
      'rounded-md px-2 py-1.5 text-sm font-semibold tracking-wide transition-colors duration-200 sm:px-3 sm:py-2';
    if (marketingLight) {
      return [
        base,
        active ? 'text-primary' : 'text-zinc-700 hover:text-zinc-950',
      ].join(' ');
    }
    return [
      base,
      active ? 'text-white' : 'text-zinc-200 hover:text-white',
    ].join(' ');
  };

  const linkUnderline = (href) => {
    const active = linkIsActive(href);
    return (
      <span className="mt-1 flex h-1 w-full justify-center px-2" aria-hidden>
        <span
          className={`h-full max-w-[2.75rem] rounded-full bg-primary shadow-[0_0_8px_rgba(255,122,0,0.45)] transition-transform duration-300 ease-out ${
            active ? 'w-full scale-x-100' : 'w-full origin-center scale-x-0 group-hover:scale-x-100'
          }`}
        />
      </span>
    );
  };

  return (
    <header
      ref={headerRef}
      className={`fixed left-0 right-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ease-out ${
        marketingLight
          ? 'border-b border-zinc-200/90 bg-white/90 shadow-sm backdrop-blur-xl supports-[backdrop-filter]:bg-white/85'
          : 'border-b border-zinc-600/80 bg-zinc-950/92 shadow-[0_4px_24px_rgba(0,0,0,0.35)] backdrop-blur-xl supports-[backdrop-filter]:bg-zinc-950/88'
      }`}
      style={{ top: 'var(--giftflow-topbar-height)' }}
    >
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <div
          ref={glowRef}
          className={`absolute -left-1/4 top-1/2 h-24 w-[min(28rem,70vw)] -translate-y-1/2 rounded-full blur-3xl will-change-transform transition-opacity duration-300 ${
            marketingLight
              ? 'bg-primary/[0.12] opacity-90'
              : 'bg-primary/[0.14] opacity-100'
          }`}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[var(--giftflow-header-height)] items-center justify-between gap-4">
          <div ref={brandRef} className="flex min-w-0 flex-shrink-0 items-center">
            <Link
              href="/"
              className={`flex items-baseline gap-1.5 outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 ${
                marketingLight
                  ? 'focus-visible:ring-offset-white'
                  : 'focus-visible:ring-offset-zinc-950'
              }`}
            >
              <span
                className={`font-yeseva-one text-2xl sm:text-[1.65rem] ${
                  marketingLight ? 'text-zinc-900' : 'text-white'
                }`}
              >
                Giftflow
              </span>
              {process.env.NEXT_PUBLIC_PLG_VERSION && (
                <span
                  className={`hidden font-google-sans text-[10px] font-semibold uppercase tracking-[0.14em] sm:inline ${
                    marketingLight ? 'text-zinc-500' : 'text-zinc-400'
                  }`}
                >
                  v{process.env.NEXT_PUBLIC_PLG_VERSION}
                </span>
              )}
            </Link>
          </div>

          {/* Desktop: nav + download aligned right */}
          <div className="hidden min-w-0 items-center gap-3 md:flex lg:gap-4">
            <nav
              ref={navInnerRef}
              className="flex min-w-0 flex-wrap items-center justify-end gap-1 lg:gap-2"
              aria-label="Main"
            >
              {navigationItems.map((item) => {
                const isPro = item.href === '/pro';
                const active = linkIsActive(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    target={item.target ? '_blank' : undefined}
                    rel={item.target ? 'noopener noreferrer' : undefined}
                    data-nav-link
                    className={`group flex flex-col items-center ${linkClass(item.href)}`}
                  >
                    <span className="inline-flex items-center gap-1.5 px-1">
                      {isPro && (
                        <Sparkles
                          className={`h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4 ${
                            marketingLight
                              ? 'text-primary'
                              : active
                                ? 'text-white'
                                : 'text-primary/80'
                          }`}
                          strokeWidth={2}
                          aria-hidden
                        />
                      )}
                      {item.name}
                    </span>
                    {linkUnderline(item.href)}
                  </Link>
                );
              })}
            </nav>

            <div ref={ctaRef} className="flex-shrink-0">
              <div className="flex items-center gap-2">
                <Link
                  href={demoHref}
                  target={demoIsExternal ? '_blank' : undefined}
                  rel={demoIsExternal ? 'noopener noreferrer' : undefined}
                  className={`inline-flex items-center gap-2 rounded-md border px-4 py-2.5 text-sm font-semibold transition lg:px-5 ${
                    marketingLight
                      ? 'border-zinc-300 bg-white text-zinc-900 hover:border-zinc-400 hover:bg-zinc-50'
                      : 'border-white/25 bg-white/10 text-white hover:border-white/40 hover:bg-white/15'
                  }`}
                >
                  <ExternalLink className="h-4 w-4" aria-hidden />
                  View demo
                </Link>
                <Link
                  href={downloadHref}
                  target={downloadIsExternal ? '_blank' : undefined}
                  rel={downloadIsExternal ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center gap-2 rounded-md border border-primary bg-primary px-4 py-2.5 text-sm font-bold text-white transition hover:border-primary/90 hover:bg-primary/90 lg:px-5"
                >
                  <Download className="h-4 w-4" aria-hidden />
                  Download
                </Link>
              </div>
            </div>
          </div>

          <div
            ref={mobileToolsRef}
            className="flex flex-shrink-0 items-center gap-2 md:hidden"
          >
            <Link
              href={demoHref}
              target={demoIsExternal ? '_blank' : undefined}
              rel={demoIsExternal ? 'noopener noreferrer' : undefined}
              className={`inline-flex items-center justify-center rounded-md border p-2.5 transition ${
                marketingLight
                  ? 'border-zinc-300 bg-white text-zinc-800 hover:border-zinc-400 hover:bg-zinc-50'
                  : 'border-zinc-500 bg-zinc-900/80 text-zinc-100 hover:border-zinc-400 hover:bg-zinc-800 hover:text-white'
              }`}
              aria-label="View demo"
            >
              <ExternalLink className="h-5 w-5" aria-hidden />
            </Link>
            <Link
              href={downloadHref}
              target={downloadIsExternal ? '_blank' : undefined}
              rel={downloadIsExternal ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center justify-center rounded-md border border-primary bg-primary p-2.5 text-white transition hover:border-primary/90 hover:bg-primary/90"
              aria-label="Download plugin"
            >
              <Download className="h-5 w-5" aria-hidden />
            </Link>
            <button
              type="button"
              id="giftflow-mobile-menu-trigger"
              className={`inline-flex cursor-pointer items-center justify-center rounded-lg border-2 p-2.5 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                marketingLight
                  ? 'border-zinc-300 bg-white text-zinc-800 hover:border-zinc-400 hover:bg-zinc-50 focus-visible:ring-offset-white'
                  : 'border-zinc-500 bg-zinc-900/80 text-zinc-100 hover:border-zinc-400 hover:bg-zinc-800 hover:text-white focus-visible:ring-offset-zinc-950'
              }`}
              aria-expanded={mobileNavOpen}
              aria-controls="giftflow-mobile-nav"
              onClick={() => setMobileNavOpen(true)}
            >
              <span className="sr-only">Open menu</span>
              <Menu className="h-5 w-5" strokeWidth={2} aria-hidden />
            </button>
          </div>
        </div>
      </div>

      {portalEl &&
        mobileNavOpen &&
        createPortal(
          <div className="md:hidden">
            <div
              ref={mobileBackdropRef}
              className={`fixed inset-0 z-[110] will-change-[opacity] ${
                marketingLight
                  ? 'bg-zinc-950/[0.33] backdrop-blur-md'
                  : 'bg-black/60 backdrop-blur-md'
              }`}
              aria-hidden
              onClick={closeMobileNav}
            />
            <aside
              ref={mobilePanelRef}
              id="giftflow-mobile-nav"
              role="dialog"
              aria-modal="true"
              aria-labelledby="giftflow-mobile-nav-title"
              className={`fixed inset-y-0 right-0 z-[120] flex w-[min(100vw-10px,22rem)] flex-col overflow-hidden shadow-[0_0_0_1px_rgba(0,0,0,0.04),-24px_0_80px_-20px_rgba(0,0,0,0.25)] will-change-transform ${
                marketingLight
                  ? 'border-l border-zinc-200/90 bg-white text-zinc-900'
                  : 'border-l border-white/[0.08] bg-zinc-950 text-white'
              }`}
            >
              {/* Ambient accents */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
                <div
                  className={`absolute -right-1/4 top-0 h-[min(55%,24rem)] w-[min(120%,20rem)] rounded-full blur-3xl ${
                    marketingLight ? 'bg-primary/[0.11]' : 'bg-primary/[0.14]'
                  }`}
                />
                <div
                  className={`absolute -left-1/3 bottom-0 h-[min(45%,18rem)] w-[min(100%,16rem)] rounded-full blur-3xl ${
                    marketingLight ? 'bg-amber-200/35' : 'bg-orange-950/40'
                  }`}
                />
                <div
                  className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent ${
                    marketingLight ? 'via-primary/40' : 'via-primary/30'
                  }`}
                />
              </div>

              <div className="relative flex min-h-0 flex-1 flex-col">
                <div
                  className={`shrink-0 px-5 pb-4 pt-[max(1rem,env(safe-area-inset-top))] ${
                    marketingLight
                      ? 'border-b border-zinc-200/80 bg-white/40'
                      : 'border-b border-white/[0.07] bg-zinc-950/40'
                  }`}
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div>
                      <p
                        data-mobile-drawer-intro
                        className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${
                          marketingLight ? 'text-zinc-500' : 'text-zinc-500'
                        }`}
                      >
                        Navigate
                      </p>
                      <h2
                        id="giftflow-mobile-nav-title"
                        data-mobile-drawer-intro
                        className="font-yeseva-one mt-1.5 text-2xl tracking-tight"
                      >
                        Giftflow
                      </h2>
                      <p
                        data-mobile-drawer-intro
                        className={`mt-1 max-w-[13rem] text-[13px] leading-snug ${
                          marketingLight ? 'text-zinc-600' : 'text-zinc-400'
                        }`}
                      >
                        Donations &amp; campaigns for WordPress.
                      </p>
                    </div>
                    <button
                      type="button"
                      data-mobile-drawer-intro
                      onClick={closeMobileNav}
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                        marketingLight
                          ? 'border-zinc-200/90 bg-white/90 text-zinc-700 shadow-sm hover:border-zinc-300 hover:bg-zinc-50 focus-visible:ring-offset-white'
                          : 'border-white/15 bg-white/[0.06] text-zinc-200 hover:border-white/25 hover:bg-white/[0.1] focus-visible:ring-offset-zinc-950'
                      }`}
                      aria-label="Close menu"
                    >
                      <X className="h-5 w-5" strokeWidth={2} aria-hidden />
                    </button>
                  </div>
                </div>

                <nav
                  className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-5"
                  aria-label="Mobile"
                >
                  <p
                    className={`mb-3 px-2 text-[10px] font-semibold uppercase tracking-[0.2em] ${
                      marketingLight ? 'text-zinc-400' : 'text-zinc-500'
                    }`}
                  >
                    Pages
                  </p>
                  <ul className="flex flex-col gap-1.5">
                    {navigationItems.map((item, itemIndex) => {
                      const active = linkIsActive(item.href);
                      const isPro = item.href === '/pro';
                      const isExternal = Boolean(item.target);
                      return (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            target={item.target ? '_blank' : undefined}
                            rel={item.target ? 'noopener noreferrer' : undefined}
                            data-mobile-nav-item
                            aria-current={active ? 'page' : undefined} 
                            onClick={closeMobileNav}
                            className={`group relative flex w-full items-center gap-3 overflow-hidden rounded-md px-3.5 py-3.5 text-[15px] font-semibold tracking-tight transition-colors duration-200 ${
                              marketingLight
                                ? active
                                  ? 'bg-primary/[0.09] text-primary ring-1 ring-primary/20'
                                  : 'text-zinc-800 hover:bg-zinc-100/90 hover:text-zinc-950'
                                : active
                                  ? 'bg-white/[0.1] text-white ring-1 ring-white/15'
                                  : 'text-zinc-300 hover:bg-white/[0.06] hover:text-white'
                            }`}
                          >
                            {active && (
                              <span
                                className="absolute left-0 top-1/2 h-9 w-[3px] -translate-y-1/2 rounded-full bg-primary shadow-[0_0_12px_rgba(255,122,0,0.45)]"
                                aria-hidden
                              />
                            )}
                            <span className="relative flex min-w-0 flex-1 items-center gap-2.5">
                              {isPro && (
                                <span
                                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                                    marketingLight
                                      ? 'bg-primary/12 text-primary'
                                      : 'bg-primary/20 text-primary'
                                  }`}
                                >
                                  <Sparkles
                                    className="h-[18px] w-[18px]"
                                    strokeWidth={2}
                                    aria-hidden
                                  />
                                </span>
                              )}
                              {!isPro && (
                                <span
                                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-bold tabular-nums ${
                                    marketingLight
                                      ? 'bg-zinc-100 text-zinc-500'
                                      : 'bg-white/[0.06] text-zinc-500'
                                  }`}
                                >
                                  {String(itemIndex + 1).padStart(2, '0')}
                                </span>
                              )}
                              <span className="min-w-0 flex-1 text-left leading-snug">
                                {item.name}
                              </span>
                            </span>
                            {isExternal ? (
                              <ExternalLink
                                className={`h-4 w-4 shrink-0 opacity-50 transition group-hover:opacity-80 ${
                                  marketingLight ? 'text-zinc-600' : 'text-zinc-400'
                                }`}
                                aria-hidden
                              />
                            ) : (
                              <ChevronRight
                                className={`h-4 w-4 shrink-0 opacity-35 transition duration-200 group-hover:translate-x-0.5 group-hover:opacity-70 ${
                                  marketingLight ? 'text-zinc-600' : 'text-zinc-400'
                                }`}
                                aria-hidden
                              />
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>

                <div
                  data-mobile-nav-footer
                  className={`shrink-0 border-t px-4 py-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] ${
                    marketingLight
                      ? 'border-zinc-200/80 bg-gradient-to-t from-amber-50/50 to-white/80'
                      : 'border-white/[0.08] bg-gradient-to-t from-zinc-900/90 to-zinc-950/80'
                  }`}
                >
                  <p
                    className={`mb-2.5 px-1 text-center text-[11px] font-medium leading-snug ${
                      marketingLight ? 'text-zinc-500' : 'text-zinc-500'
                    }`}
                  >
                    Free core plugin · Pro for scale
                  </p>
                  <Link
                    href={demoHref}
                    target={demoIsExternal ? '_blank' : undefined}
                    rel={demoIsExternal ? 'noopener noreferrer' : undefined}
                    onClick={closeMobileNav}
                    className={`mb-2 flex w-full items-center justify-center gap-2 rounded-md border py-3 text-[15px] font-semibold transition ${
                      marketingLight
                        ? 'border-zinc-300 bg-white text-zinc-800 hover:border-zinc-400 hover:bg-zinc-50'
                        : 'border-white/15 bg-white/[0.06] text-zinc-100 hover:border-white/30 hover:bg-white/[0.1]'
                    }`}
                  >
                    <ExternalLink className="h-4 w-4" aria-hidden />
                    View demo
                  </Link>
                  <Link
                    href={downloadHref}
                    target={downloadIsExternal ? '_blank' : undefined}
                    rel={downloadIsExternal ? 'noopener noreferrer' : undefined}
                    onClick={closeMobileNav}
                    className="flex w-full items-center justify-center gap-2 rounded-md border-2 border-primary bg-primary py-3.5 text-[15px] font-bold text-white shadow-lg shadow-primary/25 transition hover:border-primary/90 hover:bg-primary/90 active:scale-[0.99]"
                  >
                    <Download className="h-5 w-5" aria-hidden />
                    Download plugin
                  </Link>
                </div>
              </div>
            </aside>
          </div>,
          portalEl
        )}
    </header>
  );
}
