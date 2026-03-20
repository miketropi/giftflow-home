'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Church, GraduationCap, Users, Target } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const PERFECT_FOR_ITEMS = [
  {
    id: 'nonprofit',
    icon: Heart,
    title: 'Non-profits & charities',
    description: 'Run appeals, grants, and general funds with clear reporting for boards and finance.',
  },
  {
    id: 'faith',
    icon: Church,
    title: 'Faith communities',
    description: 'Handle tithes, offerings, and mission trips with receipts donors recognize and trust.',
  },
  {
    id: 'education',
    icon: GraduationCap,
    title: 'Schools & universities',
    description: 'Collect scholarships, alumni gifts, and event registrations without duct-taping five tools.',
  },
  {
    id: 'community',
    icon: Users,
    title: 'Community & civic groups',
    description: 'Fund local projects and membership drives from the site you already maintain.',
  },
];

export default function HomePerfectForSection() {
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
        gsap.set([head.children, grid.children], { opacity: 1, y: 0, scale: 1 });
        return;
      }

      gsap.fromTo(
        head.children,
        { opacity: 0, y: 36 },
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
        { opacity: 0, y: 40, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.58,
          stagger: 0.09,
          ease: 'power3.out',
          scrollTrigger: { trigger: grid, start: 'top 90%', toggleActions: 'play none none none' },
        }
      );

      gsap.fromTo(head, { y: 0 }, {
        y: -26,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
      });

      gsap.fromTo(grid, { y: 0 }, {
        y: -40,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-t border-white/5 bg-zinc-950 py-24 sm:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.07] via-transparent to-zinc-950"
        aria-hidden
      />
      <div className="pointer-events-none absolute -right-32 top-1/4 h-80 w-80 rounded-full bg-primary/10 blur-3xl" aria-hidden />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={headRef} className="mx-auto mb-16 max-w-3xl text-center will-change-transform">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/8 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.14em] text-zinc-200 backdrop-blur-sm">
            <Target className="h-3.5 w-3.5 text-primary" aria-hidden />
            Who it&apos;s for
          </div>
          <h2 className="font-yeseva-one text-3xl font-normal text-white sm:text-4xl lg:text-[2.5rem]">
            Built for teams like yours
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-300 sm:text-lg">
            If you raise money on WordPress, Giftflow is shaped for your workflows—not generic e-commerce checkout.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 lg:gap-6 will-change-transform"
        >
          {PERFECT_FOR_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.id}
                className="group rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-md transition-all duration-300 hover:border-primary/35 hover:bg-white/[0.08] sm:p-7"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-zinc-900/80 text-primary transition-colors duration-300 group-hover:border-primary/25">
                  <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
                </div>
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-2 line-clamp-4 min-h-[5.5rem] text-[15px] leading-relaxed text-zinc-300 sm:text-base">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
