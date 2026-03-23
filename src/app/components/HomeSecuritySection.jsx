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
  ArrowDown,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const REVEAL_START = 'top bottom-=80';

const MESH_PATTERN_LIGHT =
  'url("data:image/svg+xml,%3Csvg width=\'72\' height=\'72\' viewBox=\'0 0 72 72\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%2318181b\' fill-opacity=\'0.04\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")';

const MESH_PATTERN_DARK =
  'url("data:image/svg+xml,%3Csvg width=\'72\' height=\'72\' viewBox=\'0 0 72 72\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.055\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")';

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

export default function HomeSecuritySection({ variant = 'dark' }) {
  const isLight = variant === 'light';
  const sectionRef = useRef(null);
  const glowRef = useRef(null);
  const leftParallaxRef = useRef(null);
  const rightParallaxRef = useRef(null);
  const rightCardRef = useRef(null);
  const cardInnerRef = useRef(null);
  const trustLineRef = useRef(null);
  const trustStackRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const glow = glowRef.current;
    const leftParallax = leftParallaxRef.current;
    const rightParallax = rightParallaxRef.current;
    const rightCard = rightCardRef.current;
    const cardInner = cardInnerRef.current;
    const trustLine = trustLineRef.current;
    const trustStack = trustStackRef.current;
    if (!section || !leftParallax || !rightParallax || !rightCard || !cardInner) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let refreshTimeoutId;

    const ctx = gsap.context(() => {
      const leftIntro = leftParallax.querySelectorAll('[data-security-intro]');
      const listItems = leftParallax.querySelectorAll('[data-security-item]');
      const cardParts = cardInner.querySelectorAll('[data-security-card]');
      const trustSteps = cardInner.querySelectorAll('[data-trust-step]');

      if (reduceMotion) {
        gsap.set([leftIntro, listItems, rightCard, cardParts, trustSteps], {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          filter: 'none',
        });
        if (trustLine) gsap.set(trustLine, { scaleY: 1 });
        return;
      }

      const stBase = {
        trigger: section,
        start: REVEAL_START,
        toggleActions: 'play none none none',
        invalidateOnRefresh: true,
      };

      const master = gsap.timeline({ scrollTrigger: stBase });

      master.fromTo(
        leftIntro,
        { opacity: 0, y: 36, filter: 'blur(6px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.72,
          stagger: 0.1,
          ease: 'power3.out',
        },
        0
      );

      master.fromTo(
        listItems,
        { opacity: 0, y: 40, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.62,
          stagger: { each: 0.075, from: 'start' },
          ease: 'power3.out',
        },
        0.12
      );

      master.fromTo(
        rightCard,
        { opacity: 0, y: 48, scale: 0.96, rotateX: 4, transformOrigin: 'center top' },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 0.88,
          ease: 'power4.out',
        },
        0.08
      );

      master.fromTo(
        cardParts,
        { opacity: 0, y: 26, filter: 'blur(4px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.55,
          stagger: 0.07,
          ease: 'power2.out',
        },
        0.32
      );

      master.fromTo(
        trustSteps,
        { opacity: 0, x: 28 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.11,
          ease: 'power3.out',
        },
        0.48
      );

      if (trustLine && trustStack) {
        gsap.set(trustLine, { scaleY: 0, transformOrigin: 'top center' });
        gsap.to(trustLine, {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: trustStack,
            start: 'top 78%',
            end: 'bottom 45%',
            scrub: 0.65,
            invalidateOnRefresh: true,
          },
        });
      }

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
              scrub: 1.15,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      gsap.fromTo(
        leftParallax,
        { y: 0 },
        {
          y: -28,
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
          y: -44,
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

      requestAnimationFrame(() => {
        requestAnimationFrame(() => ScrollTrigger.refresh());
      });
      refreshTimeoutId = window.setTimeout(() => ScrollTrigger.refresh(), 140);
    }, section);

    return () => {
      window.clearTimeout(refreshTimeoutId);
      ctx.revert();
    };
  }, [isLight]);

  return (
    <section
      ref={sectionRef}
      id="security"
      aria-labelledby="security-heading"
      className={`relative overflow-hidden border-t py-24 sm:py-28 lg:py-32 ${
        isLight
          ? 'border-zinc-200/80 bg-gradient-to-b from-orange-50/35 via-white to-amber-50/40'
          : 'border-white/5 bg-gradient-to-b from-zinc-900 via-zinc-950 to-black'
      }`}
    >
      {/* Mesh + wash */}
      <div
        className={`pointer-events-none absolute inset-0 ${
          isLight ? 'opacity-[0.4] mix-blend-multiply' : 'opacity-[0.22]'
        }`}
        style={{
          backgroundImage: isLight ? MESH_PATTERN_LIGHT : MESH_PATTERN_DARK,
        }}
        aria-hidden
      />
      <div
        className={`pointer-events-none absolute inset-0 ${
          isLight
            ? 'bg-[radial-gradient(ellipse_90%_55%_at_15%_-10%,rgba(255,122,0,0.14),transparent_50%),radial-gradient(ellipse_70%_50%_at_100%_20%,rgba(251,191,36,0.12),transparent_55%)]'
            : 'bg-[radial-gradient(ellipse_90%_55%_at_10%_-15%,rgba(255,122,0,0.12),transparent_50%)]'
        }`}
        aria-hidden
      />

      <div
        ref={glowRef}
        className="pointer-events-none absolute -right-1/4 top-1/4 h-[min(36rem,95vw)] w-[min(44rem,125vw)] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,122,0,0.16),transparent_62%)] blur-3xl will-change-transform sm:right-0 sm:w-[38rem]"
        aria-hidden
      />

      <div
        className={`pointer-events-none absolute inset-0 ${
          isLight
            ? 'bg-gradient-to-b from-white/80 via-transparent to-amber-50/25'
            : 'bg-gradient-to-b from-transparent via-zinc-950/50 to-black/90'
        }`}
        aria-hidden
      />
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent ${
          isLight ? 'via-zinc-200/90' : 'via-white/12'
        }`}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-20">
          {/* Left: narrative + bento points */}
          <div
            ref={leftParallaxRef}
            className="will-change-transform lg:w-[54%] lg:max-w-none lg:flex-none [perspective:1200px]"
          >
            <div
              data-security-intro
              className={`mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] shadow-sm backdrop-blur-sm ${
                isLight
                  ? 'border-amber-200/90 bg-white/95 text-zinc-700'
                  : 'border-white/12 bg-white/[0.06] text-zinc-200'
              }`}
            >
              <Shield className="h-3.5 w-3.5 text-primary" aria-hidden />
              Security
            </div>
            <h2
              id="security-heading"
              data-security-intro
              className={`font-yeseva-one text-[2rem] font-normal leading-[1.12] sm:text-4xl lg:text-[2.65rem] lg:leading-[1.08] ${
                isLight ? 'text-zinc-900' : 'text-white'
              }`}
            >
              Where sensitive work stops—
              <span
                className={`mt-1 block bg-gradient-to-r from-primary via-orange-500 to-amber-500 bg-clip-text text-transparent sm:mt-0 sm:inline sm:pl-2`}
              >
                and Giftflow begins
              </span>
            </h2>
            <p
              data-security-intro
              className={`mt-5 max-w-xl text-base leading-relaxed sm:text-lg ${
                isLight ? 'text-zinc-600' : 'text-zinc-400'
              }`}
            >
              Giftflow keeps donations and admin in WordPress. PCI-heavy work stays with the gateways you already
              use—the same story as the Security tile in Features, with boundaries spelled out for reviewers.
            </p>

            <ul className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5">
              {SECURITY_POINTS.map((item, index) => {
                const Icon = item.icon;
                return (
                  <li
                    key={item.id}
                    data-security-item
                    className={`group relative overflow-hidden rounded-2xl border p-5 shadow-sm transition-shadow duration-300 sm:p-6 ${
                      isLight
                        ? 'border-zinc-200/90 bg-white/95 ring-1 ring-zinc-100/80 hover:border-primary/30 hover:shadow-lg hover:shadow-zinc-200/40'
                        : 'border-white/[0.09] bg-white/[0.04] ring-1 ring-white/[0.04] hover:border-primary/25 hover:bg-white/[0.06]'
                    }`}
                  >
                    <div
                      className={`pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full blur-2xl transition-opacity duration-500 group-hover:opacity-100 ${
                        isLight ? 'bg-primary/10 opacity-70' : 'bg-primary/15 opacity-50'
                      }`}
                      aria-hidden
                    />
                    <div className="relative flex flex-col gap-3">
                      <div className="flex items-start justify-between gap-3">
                        <span
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white shadow-lg shadow-primary/20 ${
                            isLight
                              ? 'bg-gradient-to-br from-primary to-orange-600'
                              : 'bg-gradient-to-br from-primary to-orange-700'
                          }`}
                        >
                          <Icon className="h-6 w-6" strokeWidth={2} aria-hidden />
                        </span>
                        <span
                          className={`font-google-sans-code text-xs font-semibold tabular-nums tracking-wider ${
                            isLight ? 'text-zinc-300' : 'text-zinc-600'
                          }`}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <div>
                        <p
                          className={`text-[17px] font-semibold leading-snug ${
                            isLight ? 'text-zinc-900' : 'text-white'
                          }`}
                        >
                          {item.title}
                        </p>
                        <p
                          className={`mt-2 text-[15px] leading-relaxed ${
                            isLight ? 'text-zinc-600' : 'text-zinc-400'
                          }`}
                        >
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right: trust stack card */}
          <div
            ref={rightParallaxRef}
            className="w-full will-change-transform [perspective:1400px] lg:sticky lg:top-[calc(var(--giftflow-header-stack)+1.25rem)] lg:w-[46%] lg:flex-1 lg:self-start"
          >
            <div
              ref={rightCardRef}
              className={`relative min-h-[22rem] overflow-hidden rounded-3xl border shadow-2xl backdrop-blur-xl sm:min-h-[24rem] [transform-style:preserve-3d] ${
                isLight
                  ? 'border-zinc-200/90 bg-white/95 shadow-zinc-300/35 ring-1 ring-amber-100/40'
                  : 'border-white/[0.1] bg-zinc-950/80 shadow-black/60 ring-1 ring-white/[0.06]'
              }`}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
              <div
                className={`pointer-events-none absolute inset-0 ${
                  isLight
                    ? 'bg-[radial-gradient(ellipse_100%_80%_at_50%_-20%,rgba(255,122,0,0.09),transparent_55%)]'
                    : 'bg-[radial-gradient(ellipse_100%_80%_at_50%_-25%,rgba(255,122,0,0.1),transparent_50%)]'
                }`}
                aria-hidden
              />

              <div
                ref={cardInnerRef}
                className="relative flex h-full flex-col px-6 py-8 sm:px-9 sm:py-10 lg:px-10 lg:py-11"
              >
                <div data-security-card className="mb-1 flex justify-center">
                  <div className="relative">
                    <div
                      className="absolute inset-0 scale-150 rounded-full bg-primary/25 blur-2xl"
                      aria-hidden
                    />
                    <div
                      className={`relative flex h-[4.25rem] w-[4.25rem] items-center justify-center rounded-2xl border sm:h-[4.75rem] sm:w-[4.75rem] ${
                        isLight
                          ? 'border-primary/20 bg-gradient-to-br from-primary/12 to-amber-50/80'
                          : 'border-primary/25 bg-gradient-to-br from-primary/20 to-zinc-900/80'
                      }`}
                    >
                      <Shield
                        className="h-11 w-11 text-primary sm:h-12 sm:w-12"
                        strokeWidth={1.1}
                        aria-hidden
                      />
                    </div>
                  </div>
                </div>

                <h3
                  data-security-card
                  className={`text-center font-yeseva-one text-xl sm:text-2xl ${
                    isLight ? 'text-zinc-900' : 'text-white'
                  }`}
                >
                  Trust stack
                </h3>
                <p
                  data-security-card
                  className={`mx-auto mt-2 max-w-sm text-center text-sm leading-relaxed sm:text-[15px] ${
                    isLight ? 'text-zinc-600' : 'text-zinc-400'
                  }`}
                >
                  Donors hit your site, processors move money, WordPress holds the operational story you need to run
                  campaigns.
                </p>

                <div ref={trustStackRef} className="relative mt-8 flex-1">
                  <div
                    ref={trustLineRef}
                    className={`absolute left-[18px] top-10 bottom-10 z-0 w-[3px] rounded-full sm:left-[19px] ${
                      isLight
                        ? 'bg-gradient-to-b from-primary/45 via-zinc-200/90 to-zinc-200/30'
                        : 'bg-gradient-to-b from-primary/50 via-white/15 to-white/5'
                    }`}
                    aria-hidden
                  />

                  <ul className="relative z-[1] flex flex-col gap-4 sm:gap-5">
                    {TRUST_STACK.map((row, i) => {
                      const RowIcon = row.icon;
                      const isLast = i === TRUST_STACK.length - 1;
                      return (
                        <li key={row.id}>
                          <div data-trust-step className="flex gap-4 sm:gap-5">
                            <div className="relative flex shrink-0 flex-col items-center pt-1">
                              <span
                                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 shadow-md sm:h-11 sm:w-11 ${
                                  isLight
                                    ? 'border-white bg-gradient-to-br from-white to-amber-50/90 text-primary shadow-zinc-200/50 ring-2 ring-primary/15'
                                    : 'border-zinc-800 bg-gradient-to-br from-zinc-800 to-zinc-950 text-primary shadow-black/40 ring-2 ring-primary/20'
                                }`}
                              >
                                <RowIcon className="h-[18px] w-[18px] sm:h-5 sm:w-5" strokeWidth={2} aria-hidden />
                              </span>
                              {!isLast && (
                                <ArrowDown
                                  className={`mt-1 h-3.5 w-3.5 opacity-40 sm:hidden ${
                                    isLight ? 'text-zinc-500' : 'text-zinc-500'
                                  }`}
                                  aria-hidden
                                />
                              )}
                            </div>
                            <div
                              className={`min-w-0 flex-1 rounded-2xl border px-4 py-3.5 sm:px-5 sm:py-4 ${
                                isLight
                                  ? 'border-zinc-200/85 bg-gradient-to-br from-amber-50/60 to-white/90'
                                  : 'border-white/[0.08] bg-white/[0.04]'
                              }`}
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div>
                                  <p
                                    className={`text-[15px] font-semibold sm:text-base ${
                                      isLight ? 'text-zinc-900' : 'text-white'
                                    }`}
                                  >
                                    {row.label}
                                  </p>
                                  <p
                                    className={`mt-1 text-sm leading-snug ${
                                      isLight ? 'text-zinc-600' : 'text-zinc-400'
                                    }`}
                                  >
                                    {row.detail}
                                  </p>
                                </div>
                                <span
                                  className={`shrink-0 font-google-sans-code text-[11px] font-semibold tabular-nums tracking-wider ${
                                    isLight ? 'text-zinc-400' : 'text-zinc-500'
                                  }`}
                                >
                                  L{i + 1}
                                </span>
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <p
                  data-security-card
                  className={`mt-6 rounded-2xl border px-4 py-3 text-center text-[13px] leading-relaxed sm:text-sm ${
                    isLight
                      ? 'border-emerald-200/70 bg-emerald-50/50 text-emerald-900'
                      : 'border-emerald-500/25 bg-emerald-500/[0.08] text-emerald-100/90'
                  }`}
                >
                  <CheckCircle
                    className={`mr-1.5 inline h-4 w-4 align-text-bottom ${
                      isLight ? 'text-emerald-600' : 'text-emerald-400'
                    }`}
                    aria-hidden
                  />
                  <span className="font-medium">For reviewers:</span> no card vault in core—processors and your policies
                  define the rest.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
