'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { Heart, Download } from 'lucide-react';


export default function HomeCtaSection({ variant = 'dark' }) {
  const isLight = variant === 'light';
  const sectionRef = useRef(null);
  const innerRef = useRef(null);
  const downloadHref =
    process.env.NEXT_PUBLIC_DOWNLOAD_URL?.trim() || '/#download';

  useEffect(() => {
    const section = sectionRef.current;
    const inner = innerRef.current;
    if (!section || !inner) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(inner.children, { opacity: 1, y: 0, scale: 1 });
        return;
      }

      gsap.fromTo(
        inner.children,
        { opacity: 0, y: 48, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: { trigger: inner, start: 'top 88%', toggleActions: 'play none none none' },
        }
      );

      gsap.fromTo(inner, { y: 0 }, {
        y: -32,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="download"
      className={`relative overflow-hidden border-t py-24 sm:py-28 ${
        isLight
          ? 'border-zinc-200/80 bg-gradient-to-t from-amber-100/60 via-orange-50/50 to-white'
          : 'border-white/10 bg-zinc-950'
      }`}
    >
      <div
        className={`pointer-events-none absolute inset-0 ${
          isLight
            ? 'bg-gradient-to-t from-primary/[0.08] via-transparent to-white/80'
            : 'bg-gradient-to-t from-black via-zinc-950 to-zinc-900'
        }`}
        aria-hidden
      />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-[120%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,122,0,0.12),transparent_65%)]" aria-hidden />

      <div
        ref={innerRef}
        className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8 will-change-transform"
      >
        <div
          className={`mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.14em] ${
            isLight
              ? 'border-amber-200/80 bg-white/95 text-zinc-700 shadow-sm'
              : 'border-white/20 bg-white/8 text-zinc-200'
          }`}
        >
          <Download className="h-3.5 w-3.5 text-primary" aria-hidden />
          WordPress.org ready
        </div>

        <h2
          className={`font-bricolage-grotesque font-bold text-3xl font-bold sm:text-4xl lg:text-[2.75rem] lg:leading-tight ${
            isLight ? 'text-zinc-900' : 'text-white'
          }`}
        >
          Ready to run giving on your site?
        </h2>
        <p
          className={`mx-auto mt-5 max-w-xl text-base leading-relaxed sm:text-lg ${
            isLight ? 'text-zinc-600' : 'text-zinc-300'
          }`}
        >
          Install from the plugin directory, connect a gateway, and publish your first campaign—free core with premium when you need more.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
          <Link
            href={downloadHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center bg-primary px-8 py-4 text-base rounded-md font-semibold text-white shadow-lg shadow-primary/25 transition hover:bg-primary/90 sm:w-auto"
          >
            Download free plugin
            <Heart className="ml-2 h-5 w-5" aria-hidden />
          </Link>
          <Link
            href="/blog"
            className={`inline-flex w-full items-center justify-center border px-8 py-4 text-base rounded-md font-semibold backdrop-blur-sm transition sm:w-auto ${
              isLight
                ? 'border-zinc-300 bg-white text-zinc-900 shadow-sm hover:border-zinc-400 hover:bg-zinc-50'
                : 'border-white/30 bg-white/8 text-white hover:border-white/40 hover:bg-white/12'
            }`}
          >
            Read articles
          </Link>
        </div>

        <p
          className={`mt-8 text-base ${isLight ? 'text-zinc-600' : 'text-zinc-300'}`}
        >
          Free core · Premium add-ons · WordPress 6.0+ · PHP 7.4+
        </p>
      </div>
    </section>
  );
}
