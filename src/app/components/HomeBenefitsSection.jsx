'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, Globe, Settings, BarChart3, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

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

export default function HomeBenefitsSection() {
  const sectionRef = useRef(null);
  const headRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const head = headRef.current;
    const grid = gridRef.current;
    if (!section || !head || !grid) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set([head.children, grid.children], { opacity: 1, y: 0, rotateX: 0, scale: 1 });
        return;
      }

      gsap.fromTo(
        head.children,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.72,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: head, start: 'top 88%', toggleActions: 'play none none none' },
        }
      );

      gsap.fromTo(
        grid.children,
        { opacity: 0, y: 44, rotateX: 12 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.62,
          stagger: 0.1,
          ease: 'back.out(1.25)',
          scrollTrigger: { trigger: grid, start: 'top 90%', toggleActions: 'play none none none' },
        }
      );

      gsap.fromTo(head, { y: 0 }, {
        y: -28,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
      });

      gsap.fromTo(grid, { y: 0 }, {
        y: -44,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-t border-white/5 bg-zinc-900 py-24 sm:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,122,0,0.08),transparent)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={headRef} className="mx-auto mb-16 max-w-3xl text-center will-change-transform">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.14em] text-zinc-200 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden />
            Experience
          </div>
          <h2 className="font-yeseva-one text-3xl font-normal text-white sm:text-4xl lg:text-[2.5rem]">
            Modern admin, calm day-to-day
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-300 sm:text-lg">
            Giftflow stays out of the way until you need it—fast setup, responsive donor flows, and room to grow.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 will-change-transform [perspective:1200px]"
        >
          {BENEFIT_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.id}
                className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center backdrop-blur-md transition-colors duration-300 hover:border-primary/30 hover:bg-white/[0.06] sm:p-7"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/90 text-white shadow-lg shadow-primary/15 transition-transform duration-300 group-hover:scale-105">
                  <Icon className="h-6 w-6" strokeWidth={2} aria-hidden />
                </div>
                <h3 className="text-base font-bold text-white sm:text-lg">{item.title}</h3>
                <p className="mt-2 line-clamp-4 min-h-[5rem] text-[15px] leading-relaxed text-zinc-300 sm:text-base">
                  {item.text}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
