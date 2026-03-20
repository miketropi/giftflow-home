'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Lock,
  CheckCircle,
  Shield,
  Server,
  KeyRound,
  RefreshCw,
  UserCog,
  Globe,
  Layers,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const REVEAL_START = 'top bottom-=72';

/** Bullets — aligned with Features security tile + clear boundaries */
export const SECURITY_POINTS = [
  {
    id: 'pci',
    icon: Server,
    title: 'Card data stays with processors',
    text: 'Stripe, PayPal, and bank flows own PCI scope. Giftflow orchestrates WordPress—not card storage on your host.',
  },
  {
    id: 'transit',
    icon: KeyRound,
    title: 'HTTPS by default',
    text: 'Donor traffic is encrypted in transit. What you store in WP follows your retention and consent policies.',
  },
  {
    id: 'updates',
    icon: RefreshCw,
    title: 'Shipped updates, not a dead fork',
    text: 'Regular plugin releases and WordPress-friendly patterns so security work compounds instead of freezing in time.',
  },
  {
    id: 'roles',
    icon: UserCog,
    title: 'Capabilities that respect teams',
    text: 'Role-aware admin, exports, and least-privilege flows so finance and comms see what they need—no extra surface area.',
  },
];

const TRUST_STACK = [
  {
    id: 'donor',
    icon: Globe,
    label: 'Donor & browser',
    detail: 'HTTPS to your domain',
  },
  {
    id: 'gateway',
    icon: Layers,
    label: 'Gateways you enable',
    detail: 'Stripe · PayPal · Bank rails',
  },
  {
    id: 'wp',
    icon: Lock,
    label: 'WordPress + Giftflow',
    detail: 'Campaigns, donors, receipts',
  },
];

export default function HomeSecuritySection() {
  const sectionRef = useRef(null);
  const glowRef = useRef(null);
  const leftParallaxRef = useRef(null);
  const rightParallaxRef = useRef(null);
  const rightCardRef = useRef(null);
  const listRef = useRef(null);
  const cardInnerRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const glow = glowRef.current;
    const leftParallax = leftParallaxRef.current;
    const rightParallax = rightParallaxRef.current;
    const rightCard = rightCardRef.current;
    const list = listRef.current;
    const cardInner = cardInnerRef.current;
    if (!section || !leftParallax || !rightParallax || !rightCard || !list || !cardInner) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let refreshTimeoutId;

    const ctx = gsap.context(() => {
      const leftIntro = leftParallax.querySelectorAll('[data-security-intro]');
      const listItems = list.querySelectorAll('[data-security-item]');
      const cardParts = cardInner.querySelectorAll('[data-security-card]');

      if (reduceMotion) {
        gsap.set([leftIntro, listItems, rightCard, cardParts], {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
        });
      } else {
        // Intro: badge, headline, lead — staggered; section trigger so it fires reliably
        gsap.fromTo(
          leftIntro,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.11,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: REVEAL_START,
              toggleActions: 'play none none none',
              invalidateOnRefresh: true,
            },
          }
        );

        gsap.fromTo(
          listItems,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.55,
            stagger: 0.09,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: REVEAL_START,
              toggleActions: 'play none none none',
              invalidateOnRefresh: true,
            },
          }
        );

        // Trust card shell — opacity, y, scale only on card node (not parallax wrapper)
        gsap.fromTo(
          rightCard,
          { opacity: 0, y: 28, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: REVEAL_START,
              toggleActions: 'play none none none',
              invalidateOnRefresh: true,
            },
          }
        );

        gsap.fromTo(
          cardParts,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: REVEAL_START,
              toggleActions: 'play none none none',
              invalidateOnRefresh: true,
            },
          }
        );

        // Parallax depth: glow drifts; columns move at different rates (wrappers only)
        if (glow) {
          gsap.fromTo(
            glow,
            { yPercent: -6 },
            {
              yPercent: 10,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2,
                invalidateOnRefresh: true,
              },
            }
          );
        }

        gsap.fromTo(
          leftParallax,
          { y: 0 },
          {
            y: -32,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );

        gsap.fromTo(
          rightParallax,
          { y: 0 },
          {
            y: -52,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      });
      refreshTimeoutId = window.setTimeout(() => {
        ScrollTrigger.refresh();
      }, 120);
    }, section);

    return () => {
      window.clearTimeout(refreshTimeoutId);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="security"
      aria-labelledby="security-heading"
      className="relative overflow-hidden border-t border-white/5 bg-zinc-900 py-24 sm:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,122,0,0.08),transparent)]"
        aria-hidden
      />

      <div
        ref={glowRef}
        className="pointer-events-none absolute -right-1/4 top-1/4 h-[min(32rem,90vw)] w-[min(42rem,120vw)] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,122,0,0.14),transparent_62%)] blur-2xl will-change-transform sm:right-0 sm:w-[36rem]"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/40 to-black"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-14 lg:flex-row lg:items-stretch lg:gap-16">
          <div
            ref={leftParallaxRef}
            className="will-change-transform lg:w-[52%] lg:max-w-2xl lg:flex-none"
          >
            <div
              data-security-intro
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.14em] text-zinc-200 backdrop-blur-sm"
            >
              <Shield className="h-3.5 w-3.5 text-primary" aria-hidden />
              Security
            </div>
            <h2
              id="security-heading"
              data-security-intro
              className="font-yeseva-one text-3xl font-normal leading-tight text-white sm:text-4xl lg:text-[2.45rem]"
            >
              Where sensitive work stops—and Giftflow begins
            </h2>
            <p
              data-security-intro
              className="mt-4 text-base leading-relaxed text-zinc-300 sm:text-lg"
            >
              Giftflow keeps donations and admin in WordPress. PCI-heavy work stays with the gateways you already
              use—the same story as the Security tile in Features, with boundaries spelled out for reviewers.
            </p>

            <ul ref={listRef} className="mt-10 space-y-5">
              {SECURITY_POINTS.map((item) => {
                const Icon = item.icon;
                return (
                  <li
                    key={item.id}
                    data-security-item
                    className="group flex gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md transition-colors duration-300 hover:border-primary/30 hover:bg-white/[0.06] sm:p-5"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/90 text-white shadow-lg shadow-primary/15 transition-transform duration-300 group-hover:scale-105">
                      <Icon className="h-6 w-6" strokeWidth={2} aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <p className="font-semibold text-white sm:text-[17px]">{item.title}</p>
                      <p className="mt-1 text-[15px] leading-relaxed text-zinc-300 sm:text-base">{item.text}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div ref={rightParallaxRef} className="w-full will-change-transform lg:w-[48%] lg:flex-1">
            <div
              ref={rightCardRef}
              className="relative h-full min-h-[20rem] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/50 backdrop-blur-md sm:min-h-[22rem]"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/45 to-transparent" />
              <div
                ref={cardInnerRef}
                className="relative flex h-full flex-col p-8 sm:p-10 lg:p-12"
              >
                <div data-security-card className="mb-2 flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl" aria-hidden />
                    <Shield
                      className="relative mx-auto h-[4.5rem] w-[4.5rem] text-primary sm:h-24 sm:w-24"
                      strokeWidth={1.15}
                      aria-hidden
                    />
                  </div>
                </div>
                <h3
                  data-security-card
                  className="text-center text-xl font-bold text-white sm:text-2xl"
                >
                  Simple trust stack
                </h3>
                <p
                  data-security-card
                  className="mx-auto mt-3 max-w-md text-center text-base leading-relaxed text-zinc-300"
                >
                  A simple stack: donors hit your site, processors handle money movement, WordPress stores the
                  operational story you need to run campaigns.
                </p>

                <div data-security-card className="mt-8 flex flex-1 flex-col gap-3 sm:mt-10">
                  {TRUST_STACK.map((row, i) => {
                    const RowIcon = row.icon;
                    return (
                      <div
                        key={row.id}
                        className="flex items-center gap-4 rounded-xl border border-white/10 bg-zinc-900/50 px-4 py-3.5 sm:px-5"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5 text-primary ring-1 ring-white/10">
                          <RowIcon className="h-5 w-5" strokeWidth={2} aria-hidden />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-white sm:text-base">{row.label}</p>
                          <p className="mt-0.5 text-sm text-zinc-300">{row.detail}</p>
                        </div>
                        <span className="hidden shrink-0 text-sm font-mono text-zinc-500 sm:block">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <p
                  data-security-card
                  className="mt-6 text-center text-sm leading-relaxed text-zinc-300"
                >
                  <CheckCircle className="mr-1 inline h-3.5 w-3.5 text-primary/90 align-text-bottom" aria-hidden />
                  For reviewers: no card vault in core—processors and your policies define the rest.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
