'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { Heart, Zap, CheckCircle, ExternalLink } from 'lucide-react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import HeroActivityCarousel from './HeroActivityCarousel';


const VIDEO_SRC = 'https://pub-0645c3b9d3674132af6b362484df0f3c.r2.dev/videos/Abstract%20Blue%20Liquid%20Waves%20Background.mp4';

const ROTATING_AUDIENCES = [
  'Churches',
  'Non-Profits',
  'Schools',
  'Communities',
  'WordPress',
];

export default function HeroSection({ variant = 'dark' }) {
  const isLight = variant === 'light';
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const rotateTrackRef = useRef(null);
  const descRef = useRef(null);
  const carouselRef = useRef(null);
  const ctaRef = useRef(null);
  const checksRef = useRef(null);
  const downloadHref =
    process.env.NEXT_PUBLIC_DOWNLOAD_URL?.trim() || '/#download';

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.src = VIDEO_SRC;
          video.load();
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(video);

    const onReady = () => setVideoReady(true);
    video.addEventListener('canplay', onReady);

    return () => {
      observer.disconnect();
      video.removeEventListener('canplay', onReady);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isMobile = window.matchMedia('(max-width: 767px)').matches;
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 1 })
        .fromTo(badgeRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 }, 0.3)
        .fromTo(headingRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8 }, 0.5)
        .fromTo(descRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 }, 0.8)
        .fromTo(ctaRef.current, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.6 }, 1.0)
        .fromTo(checksRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, 1.2)
        .fromTo(
          carouselRef.current,
          { opacity: 0, x: 56, y: 20, scale: 0.96 },
          { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.95, ease: 'power3.out' },
          0.65
        );

      const parallaxTrigger = {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      };

      if (!reduceMotion && !isMobile) {
        gsap.to(videoRef.current, {
          yPercent: 30,
          scale: 1.1,
          scrollTrigger: parallaxTrigger,
        });

        gsap.to(contentRef.current, {
          yPercent: -15,
          opacity: isLight ? 0.5 : 0.2,
          scrollTrigger: parallaxTrigger,
        });

        gsap.to(carouselRef.current, {
          yPercent: -18,
          scrollTrigger: parallaxTrigger,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isLight]);

  useEffect(() => {
    const track = rotateTrackRef.current;
    if (!track) return;

    let master;

    const start = () => {
      const lineEl = track.querySelector('[data-rotate-line]');
      const lineHeight = lineEl?.getBoundingClientRect().height || 48;

      gsap.set(track, { y: 0 });

      master = gsap.timeline({ repeat: -1, delay: 1.8 });
      for (let i = 0; i < ROTATING_AUDIENCES.length; i++) {
        master.to(track, {
          y: -(i + 1) * lineHeight,
          duration: 0.55,
          ease: 'power2.inOut',
        });
        master.to({}, { duration: 2.2 });
      }
      master.set(track, { y: 0 });
    };

    requestAnimationFrame(() => requestAnimationFrame(start));

    return () => {
      master?.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative -mt-[var(--giftflow-header-stack)] flex min-h-[92svh] items-center overflow-hidden pt-[var(--giftflow-header-stack)] sm:min-h-[90vh] ${
        isLight
          ? 'bg-gradient-to-br from-amber-50 via-orange-50/50 to-white'
          : ''
      }`}
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        className={`absolute inset-0 h-full w-full object-cover will-change-transform transition-opacity duration-1000 ${
          videoReady
            ? isLight
              ? 'opacity-[0.38] mix-blend-multiply'
              : 'opacity-100'
            : 'opacity-0'
        }`}
      />

      <div
        ref={overlayRef}
        className={`absolute inset-0 opacity-0 ${
          isLight
            ? 'bg-gradient-to-b from-white/92 via-amber-50/80 to-orange-50/85'
            : 'bg-black/60'
        }`}
      />

      <div
        ref={contentRef}
        className="relative z-10 mx-auto w-full max-w-7xl px-4 py-12 will-change-transform sm:px-6 sm:py-16 lg:px-8 lg:py-20"
      >
        <div className="grid grid-cols-1 items-center gap-8 md:gap-10 lg:grid-cols-2 lg:gap-14">

          <div className="relative order-2 lg:order-1">
            <div
              ref={badgeRef}
              className={`mb-5 inline-flex max-w-full items-center rounded-full border px-3.5 py-2 text-xs font-medium opacity-0 backdrop-blur-sm sm:mb-6 sm:px-4 sm:text-sm ${
                isLight
                  ? 'border-amber-200/90 bg-white/90 text-zinc-800 shadow-sm'
                  : 'border-white/20 bg-white/10 text-white'
              }`}
            >
              <Zap className="mr-2 h-4 w-4 shrink-0 text-primary" />
              <span className="truncate sm:whitespace-nowrap">
                WordPress Plugin for Donations, Donors &amp; Campaigns
              </span>
            </div>

            <h1
              ref={headingRef}
              className={`mb-5 text-3xl font-bold leading-tight opacity-0 sm:mb-6 sm:text-5xl lg:text-6xl ${
                isLight ? 'text-zinc-950' : 'text-white'
              }`}
            >
              Complete Donation Solution
              <br />
              <span className="inline-flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span>For</span>
                <span className="inline-block h-[1.15em] min-w-[5ch] overflow-hidden align-bottom sm:min-w-[6ch]">
                  <span
                    ref={rotateTrackRef}
                    className="flex flex-col text-primary will-change-transform"
                  >
                    {ROTATING_AUDIENCES.map((word) => (
                      <span
                        key={word}
                        data-rotate-line
                        className="block leading-[1.15] whitespace-nowrap"
                      >
                        {word}
                      </span>
                    ))}
                    <span
                      className="block leading-[1.15] whitespace-nowrap text-primary"
                      aria-hidden
                    >
                      {ROTATING_AUDIENCES[0]}
                    </span>
                  </span>
                </span>
              </span>
            </h1>

            <p
              ref={descRef}
              className={`mb-7 max-w-xl text-base leading-relaxed opacity-0 sm:mb-8 sm:text-lg ${
                isLight ? 'text-zinc-700' : 'text-zinc-100'
              }`}
            >
              Manage donations, donors, and campaigns with modern features and
              extensible architecture. Everything you need in one powerful plugin.
            </p>

            <div
              ref={ctaRef}
              className="mb-8 flex flex-col gap-3 opacity-0 sm:mb-10 sm:flex-row sm:gap-4"
            >
              <Link
                href={downloadHref}
                className="flex items-center justify-center bg-primary px-6 py-3.5 rounded-md text-base font-semibold text-white transition-all duration-200 hover:bg-primary/90 sm:px-8 sm:py-4"
              >
                Download Free Plugin
                <Heart className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href={process.env.NEXT_PUBLIC_DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center px-6 py-3.5 text-center text-base font-semibold backdrop-blur-sm transition-all duration-200 sm:px-8 sm:py-4 rounded-md ${
                  isLight
                    ? 'border border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-50'
                    : 'border border-white/40 bg-white/12 text-white hover:bg-white/20'
                }`} 
                aria-label="View demo"
              >
                <ExternalLink className="mr-2 h-5 w-5" aria-hidden />
                View Demo
              </Link>
            </div>

            <div
              ref={checksRef}
              className={`grid grid-cols-1 gap-2.5 text-sm opacity-0 sm:flex sm:flex-wrap sm:gap-x-6 sm:gap-y-3 ${
                isLight ? 'text-zinc-700' : 'text-zinc-100'
              }`}
            >
              <div className="flex items-center">
                <CheckCircle
                  className={`mr-2 h-5 w-5 ${isLight ? 'text-emerald-600' : 'text-green-400'}`}
                />
                WordPress 6.0+
              </div>
              <div className="flex items-center">
                <CheckCircle
                  className={`mr-2 h-5 w-5 ${isLight ? 'text-emerald-600' : 'text-green-400'}`}
                />
                PHP 7.4+
              </div>
              <div className="flex items-center">
                <CheckCircle
                  className={`mr-2 h-5 w-5 ${isLight ? 'text-emerald-600' : 'text-green-400'}`}
                />
                Free &amp; Premium Available
              </div>
            </div>
          </div>

          <HeroActivityCarousel
            ref={carouselRef}
            variant={variant}
            className="order-1 mb-2 lg:order-2 lg:mb-0"
          />
        </div>
      </div>
    </section>
  );
}
