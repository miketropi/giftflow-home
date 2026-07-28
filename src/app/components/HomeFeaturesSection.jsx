'use client';

import { useRef, useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import {
  TrendingUp,
  Users,
  Heart,
  CreditCard,
  Mail,
  Shield,
  Zap,
  Sparkles,
} from 'lucide-react';


const REVEAL_START = 'top bottom-=80';

const MESH_PATTERN_LIGHT =
  'url("data:image/svg+xml,%3Csvg width=\'72\' height=\'72\' viewBox=\'0 0 72 72\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%2318181b\' fill-opacity=\'0.04\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")';

const MESH_PATTERN_DARK =
  'url("data:image/svg+xml,%3Csvg width=\'72\' height=\'72\' viewBox=\'0 0 72 72\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.055\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")';

/** Feature tiles — copy aligned with hero / carousel messaging */
export const FEATURE_ITEMS = [
  {
    id: 'campaigns',
    icon: TrendingUp,
    title: 'Campaign command center',
    description:
      'Launch appeals, set goals, and track progress in real time—without leaving WordPress or juggling side spreadsheets.',
  },
  {
    id: 'donors',
    icon: Users,
    title: 'Donor profiles that stay current',
    description:
      'See giving history, contact context, and patterns in one place so your team can thank and retain supporters faster.',
  },
  {
    id: 'checkout',
    icon: Heart,
    title: 'Checkout that feels on-brand',
    description:
      'Responsive donation flows that match your site, work on mobile, and reduce friction from intent to completed gift.',
  },
  {
    id: 'payments',
    icon: CreditCard,
    title: 'Stripe, PayPal, local bank & more',
    description:
      'Connect the gateways your finance team already uses—including local bank options—and grow into new rails when you need them.',
  },
  {
    id: 'email',
    icon: Mail,
    title: 'Email automation you can tune',
    description:
      'Receipts, thank-yous, and campaign updates send automatically; templates stay editable so voice and timing stay yours.',
  },
  {
    id: 'security',
    icon: Shield,
    title: 'Security where it belongs',
    description:
      'Sensitive payment data stays with PCI-scoped processors. Giftflow focuses on WordPress-native controls and regular updates.',
  },
];

export default function HomeFeaturesSection({ variant = 'dark' }) {
  const isLight = variant === 'light';
  const sectionRef = useRef(null);
  const headRef = useRef(null);
  const gridRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const head = headRef.current;
    const grid = gridRef.current;
    const glow = glowRef.current;
    if (!section || !head || !grid) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let refreshTimeoutId;

    const ctx = gsap.context(() => {
      const introEls = head.querySelectorAll('[data-feature-intro]');
      const cards = grid.querySelectorAll('[data-feature-card]');

      if (reduceMotion) {
        gsap.set([introEls, cards], {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          rotateX: 0,
          filter: 'none',
        });
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
        introEls,
        { opacity: 0, y: 38, filter: 'blur(6px)' },
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
        cards,
        {
          opacity: 0,
          y: 44,
          scale: 0.93,
          rotateX: 6,
          transformOrigin: 'center top',
          filter: 'blur(4px)',
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          filter: 'blur(0px)',
          duration: 0.68,
          stagger: { each: 0.065, from: 'start' },
          ease: 'power3.out',
        },
        0.14
      );

      gsap.fromTo(
        head,
        { y: 0 },
        {
          y: -26,
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
        grid,
        { y: 0 },
        {
          y: -42,
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

      if (glow) {
        gsap.fromTo(
          glow,
          { yPercent: -8 },
          {
            yPercent: 12,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.1,
              invalidateOnRefresh: true,
            },
          }
        );
      }

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
      id="features"
      className={`relative overflow-hidden py-24 sm:py-28 lg:py-32 ${
        isLight
          ? 'border-t border-zinc-200/80 bg-gradient-to-b from-white via-amber-50/35 to-orange-50/30'
          : 'border-t border-white/[0.06] bg-gradient-to-b from-zinc-900 via-zinc-950 to-black'
      }`}
    >
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
            ? 'bg-[radial-gradient(ellipse_85%_50%_at_50%_-15%,rgba(255,122,0,0.12),transparent_52%),radial-gradient(ellipse_55%_45%_at_100%_30%,rgba(251,191,36,0.1),transparent_55%)]'
            : 'bg-[radial-gradient(ellipse_85%_50%_at_50%_-20%,rgba(255,122,0,0.1),transparent_50%)]'
        }`}
        aria-hidden
      />

      <div
        ref={glowRef}
        className={`pointer-events-none absolute -left-1/4 top-0 h-[min(32rem,100vw)] w-[min(140%,56rem)] will-change-transform sm:left-0 sm:w-full ${
          isLight
            ? 'bg-[radial-gradient(ellipse_at_center,rgba(255,122,0,0.16),transparent_58%)]'
            : 'bg-[radial-gradient(ellipse_at_center,rgba(255,122,0,0.14),transparent_58%)]'
        }`}
        aria-hidden
      />

      <div
        className={`pointer-events-none absolute inset-0 ${
          isLight
            ? 'bg-gradient-to-b from-white/85 via-transparent to-amber-50/20'
            : 'bg-gradient-to-b from-zinc-950/90 via-transparent to-black/80'
        }`}
        aria-hidden
      />
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent ${
          isLight ? 'via-zinc-200/90' : 'via-white/12'
        }`}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 [perspective:1600px]">
        <div
          ref={headRef}
          className="mx-auto mb-14 max-w-3xl text-center will-change-transform sm:mb-16 lg:mb-20"
        >
          <div
            data-feature-intro
            className={`mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] shadow-sm backdrop-blur-sm ${
              isLight
                ? 'border-amber-200/90 bg-white/95 text-zinc-700'
                : 'border-white/12 bg-white/[0.06] text-zinc-200'
            }`}
          >
            <Zap className="h-3.5 w-3.5 text-primary" aria-hidden />
            WordPress-native toolkit
          </div>
          <h2
            data-feature-intro
            className={`font-bricolage-grotesque font-bold text-[2rem] font-bold leading-[1.12] sm:text-4xl lg:text-[2.65rem] lg:leading-[1.08] ${
              isLight ? 'text-zinc-900' : 'text-white'
            }`}
          >
            Everything you need{' '}
            <span className="mt-1 block bg-gradient-to-r from-primary via-orange-500 to-amber-500 bg-clip-text text-transparent sm:mt-0 sm:inline">
              to run giving on WordPress
            </span>
          </h2>
          <p
            data-feature-intro
            className={`mt-5 text-base leading-relaxed sm:text-lg ${
              isLight ? 'text-zinc-600' : 'text-zinc-400'
            }`}
          >
            One plugin spine for campaigns, donors, checkout, gateways, email, and security—so your site stays the
            hub, not a handoff.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-4 will-change-transform sm:gap-5 md:grid-cols-2 lg:grid-cols-6 lg:gap-6 [transform-style:preserve-3d]"
        >
          {FEATURE_ITEMS.map((feature, index) => {
            const Icon = feature.icon;
            const featured = feature.id === 'campaigns';
            const wideBottom = feature.id === 'security';
            const spanClass =
              feature.id === 'campaigns' || feature.id === 'donors'
                ? 'md:col-span-2 lg:col-span-3'
                : wideBottom
                  ? 'md:col-span-2 lg:col-span-6'
                  : 'lg:col-span-2';

            return (
              <article
                key={feature.id}
                data-feature-card
                className={`group relative flex flex-col overflow-hidden rounded-2xl border p-6 shadow-lg backdrop-blur-xl transition-shadow duration-300 sm:p-7 lg:p-8 ${spanClass} ${
                  featured
                    ? isLight
                      ? 'border-primary/25 bg-white/95 ring-2 ring-primary/10 shadow-xl shadow-primary/5'
                      : 'border-primary/30 bg-white/[0.06] ring-2 ring-primary/15 shadow-xl shadow-black/40'
                    : isLight
                      ? 'border-zinc-200/90 bg-white/95 ring-1 ring-zinc-100/80 shadow-zinc-200/35 hover:border-primary/30 hover:shadow-xl hover:shadow-zinc-200/45'
                      : 'border-white/[0.09] bg-white/[0.04] ring-1 ring-white/[0.04] shadow-black/30 hover:border-primary/25 hover:bg-white/[0.06]'
                }`}
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/45 to-transparent opacity-80" />
                <div
                  className={`pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-100 ${
                    isLight ? 'bg-primary/12 opacity-60' : 'bg-primary/18 opacity-40'
                  }`}
                  aria-hidden
                />

                <div className="relative flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white shadow-lg shadow-primary/25 ${
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

                  <h3
                    className={`relative mt-5 text-lg font-bold leading-snug sm:text-xl ${
                      isLight ? 'text-zinc-900' : 'text-white'
                    }`}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className={`relative mt-3 flex-1 text-[15px] leading-relaxed sm:text-base ${
                      isLight ? 'text-zinc-600' : 'text-zinc-400'
                    }`}
                  >
                    {feature.description}
                  </p>
                </div>

                <div
                  className={`relative mt-6 flex shrink-0 items-center gap-2 border-t pt-4 ${
                    isLight ? 'border-zinc-200/80' : 'border-white/[0.08]'
                  }`}
                >
                  <Sparkles className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                  <span
                    className={`text-xs font-semibold uppercase tracking-[0.12em] lg:text-center ${
                      isLight ? 'text-zinc-500' : 'text-zinc-500'
                    }`}
                  >
                    Included in Giftflow
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
