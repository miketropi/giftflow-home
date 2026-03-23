'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, Globe, Settings, BarChart3, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const REVEAL_START = 'top bottom-=80';

const MESH_PATTERN_LIGHT =
  'url("data:image/svg+xml,%3Csvg width=\'72\' height=\'72\' viewBox=\'0 0 72 72\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%2318181b\' fill-opacity=\'0.04\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")';

const MESH_PATTERN_DARK =
  'url("data:image/svg+xml,%3Csvg width=\'72\' height=\'72\' viewBox=\'0 0 72 72\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.055\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")';

export const BENEFIT_ITEMS = [
  {
    id: 'setup',
    icon: Clock,
    title: 'Minutes to first donation',
    text: 'Sensible defaults and guided steps mean your team publishes a working form without a week-long integration project.',
  },
  {
    id: 'responsive',
    icon: Globe,
    title: 'Looks right on every screen',
    text: 'Layouts adapt from phones to desktops so donors complete gifts wherever they find your campaign.',
  },
  {
    id: 'brand',
    icon: Settings,
    title: 'Match your brand, not ours',
    text: 'Tune colors, copy, and blocks so checkout feels like the rest of your WordPress site—not a generic iframe.',
  },
  {
    id: 'scale',
    icon: BarChart3,
    title: 'Grows from pilot to peak season',
    text: 'Same stack for a single appeal or many concurrent funds—no rip-and-replace when volume spikes.',
  },
];

export default function HomeBenefitsSection({ variant = 'dark' }) {
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
      const introEls = head.querySelectorAll('[data-benefit-intro]');
      const cards = grid.querySelectorAll('[data-benefit-card]');

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
        { opacity: 0, y: 36, filter: 'blur(6px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
        },
        0
      );

      master.fromTo(
        cards,
        {
          opacity: 0,
          y: 42,
          scale: 0.94,
          rotateX: 5,
          transformOrigin: 'center top',
          filter: 'blur(4px)',
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          filter: 'blur(0px)',
          duration: 0.64,
          stagger: { each: 0.075, from: 'start' },
          ease: 'power3.out',
        },
        0.12
      );

      gsap.fromTo(
        head,
        { y: 0 },
        {
          y: -24,
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
          y: -38,
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
          { yPercent: -6 },
          {
            yPercent: 11,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.05,
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
      id="benefits"
      aria-labelledby="benefits-heading"
      className={`relative overflow-hidden border-t py-24 sm:py-28 lg:py-32 ${
        isLight
          ? 'border-zinc-200/80 bg-gradient-to-b from-orange-50/40 via-white to-amber-50/35'
          : 'border-white/[0.06] bg-gradient-to-b from-zinc-900 via-zinc-950 to-black'
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
            ? 'bg-[radial-gradient(ellipse_80%_48%_at_30%_-10%,rgba(255,122,0,0.11),transparent_52%),radial-gradient(ellipse_60%_40%_at_100%_40%,rgba(251,191,36,0.09),transparent_55%)]'
            : 'bg-[radial-gradient(ellipse_80%_48%_at_25%_-15%,rgba(255,122,0,0.1),transparent_50%)]'
        }`}
        aria-hidden
      />

      <div
        ref={glowRef}
        className="pointer-events-none absolute left-1/2 top-1/4 h-[min(28rem,85vw)] w-[min(48rem,130vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,122,0,0.14),transparent_62%)] blur-3xl will-change-transform"
        aria-hidden
      />

      <div
        className={`pointer-events-none absolute inset-0 ${
          isLight
            ? 'bg-gradient-to-b from-white/75 via-transparent to-amber-50/20'
            : 'bg-gradient-to-b from-zinc-950/85 via-transparent to-black/85'
        }`}
        aria-hidden
      />
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent ${
          isLight ? 'via-zinc-200/90' : 'via-white/12'
        }`}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 [perspective:1500px]">
        <div
          ref={headRef}
          className="mx-auto mb-14 max-w-3xl text-center will-change-transform sm:mb-16 lg:mb-20"
        >
          <div
            data-benefit-intro
            className={`mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] shadow-sm backdrop-blur-sm ${
              isLight
                ? 'border-amber-200/90 bg-white/95 text-zinc-700'
                : 'border-white/12 bg-white/[0.06] text-zinc-200'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden />
            Experience
          </div>
          <h2
            id="benefits-heading"
            data-benefit-intro
            className={`font-yeseva-one text-[2rem] font-normal leading-[1.12] sm:text-4xl lg:text-[2.65rem] lg:leading-[1.08] ${
              isLight ? 'text-zinc-900' : 'text-white'
            }`}
          >
            Modern admin,{' '}
            <span className="mt-1 block bg-gradient-to-r from-primary via-orange-500 to-amber-500 bg-clip-text text-transparent sm:mt-0 sm:inline">
              calm day-to-day
            </span>
          </h2>
          <p
            data-benefit-intro
            className={`mt-5 text-base leading-relaxed sm:text-lg ${
              isLight ? 'text-zinc-600' : 'text-zinc-400'
            }`}
          >
            Giftflow stays out of the way until you need it—fast setup, responsive donor flows, and room to grow.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-4 will-change-transform sm:gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 [transform-style:preserve-3d]"
        >
          {BENEFIT_ITEMS.map((item, index) => {
            const Icon = item.icon;
            return (
              <article
                key={item.id}
                data-benefit-card
                className={`group relative flex flex-col overflow-hidden rounded-2xl border p-6 shadow-lg backdrop-blur-xl transition-shadow duration-300 sm:p-7 ${
                  isLight
                    ? 'border-zinc-200/90 bg-white/95 ring-1 ring-zinc-100/80 shadow-zinc-200/35 hover:border-primary/30 hover:shadow-xl hover:shadow-zinc-200/40'
                    : 'border-white/[0.09] bg-white/[0.04] ring-1 ring-white/[0.04] shadow-black/30 hover:border-primary/25 hover:bg-white/[0.06]'
                }`}
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-90" />
                <div
                  className={`pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full blur-2xl transition-opacity duration-500 group-hover:opacity-100 ${
                    isLight ? 'bg-primary/11 opacity-65' : 'bg-primary/16 opacity-45'
                  }`}
                  aria-hidden
                />

                <div className="relative flex items-start justify-between gap-2">
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

                <h3
                  className={`relative mt-5 text-left text-base font-bold leading-snug sm:text-lg ${
                    isLight ? 'text-zinc-900' : 'text-white'
                  }`}
                >
                  {item.title}
                </h3>
                <p
                  className={`relative mt-3 flex-1 text-left text-[15px] leading-relaxed sm:text-base ${
                    isLight ? 'text-zinc-600' : 'text-zinc-400'
                  }`}
                >
                  {item.text}
                </p>

                <div
                  className={`relative mt-6 flex items-center gap-2 border-t pt-4 ${
                    isLight ? 'border-zinc-200/80' : 'border-white/[0.08]'
                  }`}
                >
                  <Sparkles className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                  <span
                    className={`text-xs font-semibold uppercase tracking-[0.12em] ${
                      isLight ? 'text-zinc-500' : 'text-zinc-500'
                    }`}
                  >
                    Operator-friendly
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
