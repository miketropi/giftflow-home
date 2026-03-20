'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  TrendingUp,
  Users,
  Heart,
  CreditCard,
  Mail,
  Shield,
  Zap,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

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

export default function HomeFeaturesSection() {
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
          duration: 0.75,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: head,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        grid.children,
        { opacity: 0, y: 48, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          stagger: 0.08,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: grid,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        head,
        { y: 0 },
        {
          y: -32,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        grid,
        { y: 0 },
        {
          y: -48,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      if (glow) {
        gsap.to(glow, {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative overflow-hidden bg-zinc-950 py-24 sm:py-28"
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute -left-1/4 top-0 h-[480px] w-[150%] bg-[radial-gradient(ellipse_at_center,rgba(255,122,0,0.12),transparent_55%)] will-change-transform sm:left-0 sm:w-full"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-zinc-950/80 to-zinc-950"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={headRef} className="mx-auto mb-16 max-w-3xl text-center will-change-transform">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/8 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.14em] text-zinc-200 backdrop-blur-sm">
            <Zap className="h-3.5 w-3.5 text-primary" aria-hidden />
            WordPress-native toolkit
          </div>
          <h2 className="font-yeseva-one text-3xl font-normal text-white sm:text-4xl lg:text-[2.5rem] lg:leading-tight">
            Everything you need to run giving on WordPress
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-300 sm:text-lg">
            One plugin spine for campaigns, donors, checkout, gateways, email, and security—so your site stays the hub, not a handoff.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6 will-change-transform"
        >
          {FEATURE_ITEMS.map((feature) => {
            const Icon = feature.icon;
            return (
              <article
                key={feature.id}
                className="group relative flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-lg shadow-black/20 backdrop-blur-md transition-colors duration-300 hover:border-primary/35 hover:bg-white/[0.07] sm:p-8"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white shadow-md shadow-primary/20 transition-transform duration-300 group-hover:scale-105">
                  <Icon className="h-6 w-6" strokeWidth={2} aria-hidden />
                </div>
                <h3 className="text-lg font-bold text-white sm:text-xl">
                  {feature.title}
                </h3>
                <p className="mt-3 line-clamp-4 min-h-[5.5rem] flex-1 text-[15px] leading-relaxed text-zinc-300 sm:min-h-[6rem] sm:text-base">
                  {feature.description}
                </p>
                <span className="mt-5 inline-flex text-sm font-semibold uppercase tracking-wide text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Included in Giftflow
                </span>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
