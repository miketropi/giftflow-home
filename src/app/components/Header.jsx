'use client';

import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, Download, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const SCROLL_SOLID_THRESHOLD = 48;

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [solidBar, setSolidBar] = useState(!isHome);

  useEffect(() => {
    if (!isHome) {
      setSolidBar(true);
      return;
    }
    const onScroll = () => {
      setSolidBar(window.scrollY > SCROLL_SOLID_THRESHOLD);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  const headerRef = useRef(null);
  const brandRef = useRef(null);
  const navInnerRef = useRef(null);
  const ctaRef = useRef(null);
  const mobileToolsRef = useRef(null);
  const glowRef = useRef(null);

  const downloadHref =
    process.env.NEXT_PUBLIC_DOWNLOAD_URL?.trim() || '/#download';
  const downloadIsExternal = downloadHref.startsWith('http');

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
    return [
      'rounded-md px-2 py-1.5 text-sx font-semibold tracking-wide transition-colors duration-200 sm:px-3 sm:py-2',
      active
        ? 'text-white'
        : 'text-zinc-200 hover:text-white',
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

  const overlayMode = isHome && !solidBar;

  return (
    <header
      ref={headerRef}
      className={`fixed left-0 right-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ease-out ${
        overlayMode
          ? 'border-b border-white/15 bg-zinc-950/25 shadow-none backdrop-blur-md supports-[backdrop-filter]:bg-zinc-950/20'
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
            overlayMode ? 'bg-primary/[0.08] opacity-70' : 'bg-primary/[0.14] opacity-100'
          }`}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[var(--giftflow-header-height)] items-center justify-between gap-4">
          <div ref={brandRef} className="flex min-w-0 flex-shrink-0 items-center">
            <Link
              href="/"
              className={`flex items-baseline gap-1.5 outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 ${
                overlayMode ? 'focus-visible:ring-offset-black/40' : 'focus-visible:ring-offset-zinc-950'
              }`}
            >
              <span className="font-yeseva-one text-2xl text-white sm:text-[1.65rem]">
                Giftflow
              </span>
              {process.env.NEXT_PUBLIC_PLG_VERSION && (
                <span className="hidden font-google-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400 sm:inline">
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
                            active ? 'text-white' : 'text-primary/80'
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
              <Link
                href={downloadHref}
                target={downloadIsExternal ? '_blank' : undefined}
                rel={downloadIsExternal ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center gap-2 border-2 border-primary bg-primary px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-black/25 transition hover:border-primary/90 hover:bg-primary/90 lg:px-5"
              >
                <Download className="h-4 w-4" aria-hidden />
                Download
              </Link>
            </div>
          </div>

          <div
            ref={mobileToolsRef}
            className="flex flex-shrink-0 items-center gap-2 md:hidden"
          >
            <Link
              href={downloadHref}
              target={downloadIsExternal ? '_blank' : undefined}
              rel={downloadIsExternal ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center justify-center border-2 border-primary bg-primary p-2.5 text-white transition hover:border-primary/90 hover:bg-primary/90"
              aria-label="Download plugin"
            >
              <Download className="h-5 w-5" aria-hidden />
            </Link>
            <label
              htmlFor="mobile-menu-toggle"
              className="inline-flex cursor-pointer items-center justify-center rounded-lg border-2 border-zinc-500 bg-zinc-900/80 p-2.5 text-zinc-100 transition hover:border-zinc-400 hover:bg-zinc-800 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
            >
              <span className="sr-only">Open menu</span>
              <Menu className="h-5 w-5" strokeWidth={2} aria-hidden />
            </label>
          </div>
        </div>

        <input type="checkbox" id="mobile-menu-toggle" className="peer hidden" />
        <div className="hidden peer-checked:block md:hidden">
          <div className="border-t border-zinc-600/80 bg-zinc-950/98 px-2 py-4 shadow-inner backdrop-blur-xl">
            <div className="flex flex-col gap-0.5">
              {navigationItems.map((item) => {
                const active = linkIsActive(item.href);
                const isPro = item.href === '/pro';
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center justify-center gap-2 rounded-lg px-3 py-3 text-base font-semibold transition-colors ${
                      active
                        ? 'bg-white/15 text-white'
                        : 'text-zinc-200 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {isPro && (
                      <Sparkles
                        className={`h-5 w-5 shrink-0 ${active ? 'text-white' : 'text-primary/80'}`}
                        strokeWidth={2}
                        aria-hidden
                      />
                    )}
                    {item.name}
                  </Link>
                );
              })}
            </div>
            <Link
              href={downloadHref}
              target={downloadIsExternal ? '_blank' : undefined}
              rel={downloadIsExternal ? 'noopener noreferrer' : undefined}
              className="mt-4 flex w-full items-center justify-center gap-2 border border-primary/35 bg-primary py-3.5 text-base font-semibold text-white transition hover:bg-primary/90"
            >
              <Download className="h-5 w-5" aria-hidden />
              Download plugin
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
