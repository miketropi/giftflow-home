'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Sparkles,
  Check,
  X,
  Gift,
  Users,
  Mail,
  Puzzle,
  Repeat,
  FileDown,
  ArrowRight,
  Download,
  Bot,
  ClipboardList,
  Infinity,
  Headphones,
  Gauge,
  Layers,
  CreditCard,
  RefreshCw,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FREE_HIGHLIGHTS = [
  {
    icon: Gift,
    title: 'Campaigns that feel native',
    text: 'Appeals, goals, progress, and story-driven layouts—published from the block editor your team already knows.',
  },
  {
    icon: Users,
    title: 'Donor memory, not spreadsheets',
    text: 'Profiles, history, and context in one WordPress-native hub so handoffs between comms and finance stay clean.',
  },
  {
    icon: ClipboardList,
    title: 'Donation operations',
    text: 'Statuses, adjustments, and admin workflows tuned for real-world reconciliation—not a toy demo.',
  },
  {
    icon: Mail,
    title: 'Notifications that carry your voice',
    text: 'Receipts, thank-yous, and campaign updates with templates you can iterate without redeploying code.',
  },
  {
    icon: Bot,
    title: 'Abuse resistance',
    text: 'CAPTCHA and guardrails at the edge of checkout so bots bounce before they burn finance time.',
  },
  {
    icon: Puzzle,
    title: 'Gateways for one-time gifts',
    text: 'Stripe and PayPal (and more) for standard checkout—Pro adds the subscription layer on the same rails.',
  },
];

const PRO_HIGHLIGHTS = [
  {
    icon: Repeat,
    title: 'Recurring revenue, same admin',
    text: 'Stripe & PayPal subscriptions, renewals, and dunning-friendly flows—activated without migrating donors.',
  },
  {
    icon: FileDown,
    title: 'Exports built for finance',
    text: 'Structured donor, gift, and campaign exports for accounting, audits, CRM sync, and board-ready reporting.',
  },
  {
    icon: Gauge,
    title: 'Scale without a rewrite',
    text: 'When volume or compliance asks more of your stack, Pro extends what you already shipped on the free core.',
  },
  {
    icon: Headphones,
    title: 'Closer product alignment',
    text: 'Roadmap-weighted features for organizations standardizing on Giftflow—talk to us about fit and rollout.',
  },
];

/** At-a-glance matrix under the tablets */
const PRICING_MATRIX = [
  { label: 'WordPress-native admin', free: true, pro: true },
  { label: 'Campaigns & donor records', free: true, pro: true },
  { label: 'Email notifications & receipts', free: true, pro: true },
  { label: 'CAPTCHA / bot friction', free: true, pro: true },
  { label: 'One-time checkout (Stripe / PayPal)', free: true, pro: true },
  { label: 'Recurring / subscriptions', free: false, pro: true },
  { label: 'Data export (finance & ops)', free: false, pro: true },
];

/** How free + Pro compose on one WordPress install */
const FIT_TOGETHER_STEPS = [
  {
    step: 1,
    icon: Layers,
    title: 'One admin surface',
    text: 'Pro is an add-on, not a second product. Campaigns, donors, receipts, and settings stay in the same WordPress screens your team already learned—no parallel CRM to reconcile.',
  },
  {
    step: 2,
    icon: CreditCard,
    title: 'Same gateways, stronger modes',
    text: 'One-time checkout ships in the free core on Stripe, PayPal, and the rails you enable. Pro turns on recurring and renewal flows on those same connections—no gateway migration project.',
  },
  {
    step: 3,
    icon: FileDown,
    title: 'Exports when finance needs proof',
    text: 'When month-end, audits, or integrations need structured data, Pro adds finance-grade exports. The operational story still lives in WordPress; spreadsheets and pipelines get what they need.',
  },
  {
    step: 4,
    icon: RefreshCw,
    title: 'One roadmap, steady shipping',
    text: 'Core and Pro evolve together—security fixes, WordPress compatibility, and gateway updates land as a coherent release story instead of a frozen fork you maintain alone.',
  },
];

/** CTA card — quick trust lines before buttons */
const CTA_TRUST_LINES = [
  'Built on your existing free Giftflow install—no parallel product to learn.',
  'Unlock Stripe & PayPal recurring and finance exports when your roadmap says go.',
  'We reply with a concrete next step: licensing, rollout, and gateway fit.',
];

const REVEAL = 'top bottom-=72';

function MatrixIcon({ ok }) {
  return ok ? (
    <Check className="mx-auto h-4 w-4 text-primary" strokeWidth={2.5} aria-label="Included" />
  ) : (
    <X className="mx-auto h-4 w-4 text-zinc-400" strokeWidth={2} aria-label="Not included" />
  );
}

export default function ProPage() {
  const rootRef = useRef(null);
  const heroRef = useRef(null);
  const pricingSectionRef = useRef(null);
  const pricingGlowRef = useRef(null);
  const pricingHeadRef = useRef(null);
  const freeParallaxRef = useRef(null);
  const proParallaxRef = useRef(null);
  const freeCardRef = useRef(null);
  const proCardRef = useRef(null);
  const matrixRef = useRef(null);
  const fitSectionRef = useRef(null);
  const fitGlowRef = useRef(null);
  const fitHeadRef = useRef(null);
  const fitContentParallaxRef = useRef(null);
  const fitCardsRef = useRef(null);
  const ctaSectionRef = useRef(null);
  const ctaGlowRef = useRef(null);
  const ctaParallaxRef = useRef(null);
  const ctaRef = useRef(null);

  const downloadUrl = process.env.NEXT_PUBLIC_DOWNLOAD_URL || '/#download';
  const proCtaUrl = process.env.NEXT_PUBLIC_PRO_URL || '/contact';

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let refreshT;

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(
          root.querySelectorAll(
            '[data-hero-child], [data-pricing-head], [data-tablet-piece], [data-matrix-row], [data-fit-head], [data-fit-piece], [data-cta-piece]'
          ),
          { opacity: 1, y: 0, x: 0, scale: 1 }
        );
        return;
      }

      // —— Init load: hero only (no scroll) ——
      const heroChildren = heroRef.current?.querySelectorAll('[data-hero-child]');
      if (heroChildren?.length) {
        gsap.fromTo(
          heroChildren,
          { opacity: 0, y: 44, filter: 'blur(6px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.85,
            stagger: 0.11,
            ease: 'power3.out',
            delay: 0.08,
          }
        );
      }

      const pricingSection = pricingSectionRef.current;
      const pricingHead = pricingHeadRef.current;
      const glow = pricingGlowRef.current;
      const freeParallax = freeParallaxRef.current;
      const proParallax = proParallaxRef.current;
      const freeCard = freeCardRef.current;
      const proCard = proCardRef.current;

      if (pricingSection && pricingHead) {
        const headEls = pricingHead.querySelectorAll('[data-pricing-head]');
        gsap.fromTo(
          headEls,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: pricingHead,
              start: REVEAL,
              toggleActions: 'play none none none',
              invalidateOnRefresh: true,
            },
          }
        );
      }

      // Tablet pieces (stagger inside each card)
      [freeCard, proCard].forEach((card) => {
        if (!card) return;
        const pieces = card.querySelectorAll('[data-tablet-piece]');
        gsap.fromTo(
          pieces,
          { opacity: 0, y: 28, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            stagger: 0.07,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: REVEAL,
              toggleActions: 'play none none none',
              invalidateOnRefresh: true,
            },
          }
        );
      });

      // Matrix rows
      const matrixRows = matrixRef.current?.querySelectorAll('[data-matrix-row]');
      if (matrixRows?.length) {
        gsap.fromTo(
          matrixRows,
          { opacity: 0, x: -16 },
          {
            opacity: 1,
            x: 0,
            duration: 0.45,
            stagger: 0.05,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: matrixRef.current,
              start: REVEAL,
              toggleActions: 'play none none none',
              invalidateOnRefresh: true,
            },
          }
        );
      }

      // Parallax: glow + asymmetric column drift (scroll-linked “smooth” depth)
      if (pricingSection && glow) {
        gsap.fromTo(
          glow,
          { yPercent: -8, scale: 1 },
          {
            yPercent: 14,
            scale: 1.06,
            ease: 'none',
            scrollTrigger: {
              trigger: pricingSection,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.15,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      if (pricingSection && freeParallax) {
        gsap.fromTo(
          freeParallax,
          { y: 0 },
          {
            y: -48,
            ease: 'none',
            scrollTrigger: {
              trigger: pricingSection,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      if (pricingSection && proParallax) {
        gsap.fromTo(
          proParallax,
          { y: 0 },
          {
            y: -72,
            ease: 'none',
            scrollTrigger: {
              trigger: pricingSection,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      // How it fits: head + cards + parallax
      const fitSection = fitSectionRef.current;
      const fitGlow = fitGlowRef.current;
      const fitHead = fitHeadRef.current;
      const fitContentParallax = fitContentParallaxRef.current;
      const fitCards = fitCardsRef.current;

      if (fitSection && fitHead) {
        const headEls = fitHead.querySelectorAll('[data-fit-head]');
        gsap.fromTo(
          headEls,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: fitHead,
              start: REVEAL,
              toggleActions: 'play none none none',
              invalidateOnRefresh: true,
            },
          }
        );
      }

      if (fitCards) {
        const pieces = fitCards.querySelectorAll('[data-fit-piece]');
        gsap.fromTo(
          pieces,
          { opacity: 0, y: 28, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: fitCards,
              start: REVEAL,
              toggleActions: 'play none none none',
              invalidateOnRefresh: true,
            },
          }
        );
      }

      if (fitSection && fitGlow) {
        gsap.fromTo(
          fitGlow,
          { yPercent: -6, scale: 1 },
          {
            yPercent: 12,
            scale: 1.05,
            ease: 'none',
            scrollTrigger: {
              trigger: fitSection,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.12,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      if (fitSection && fitContentParallax) {
        gsap.fromTo(
          fitContentParallax,
          { y: 0 },
          {
            y: -36,
            ease: 'none',
            scrollTrigger: {
              trigger: fitSection,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      // CTA section: card pieces + parallax (match How it fits energy)
      const ctaSection = ctaSectionRef.current;
      const ctaGlow = ctaGlowRef.current;
      const ctaParallax = ctaParallaxRef.current;
      const ctaCard = ctaRef.current;

      if (ctaCard) {
        const ctaPieces = ctaCard.querySelectorAll('[data-cta-piece]');
        gsap.fromTo(
          ctaPieces,
          { opacity: 0, y: 28, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.68,
            stagger: 0.09,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: ctaCard,
              start: REVEAL,
              toggleActions: 'play none none none',
              invalidateOnRefresh: true,
            },
          }
        );
      }

      if (ctaSection && ctaGlow) {
        gsap.fromTo(
          ctaGlow,
          { yPercent: -5, scale: 1 },
          {
            yPercent: 10,
            scale: 1.04,
            ease: 'none',
            scrollTrigger: {
              trigger: ctaSection,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.1,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      if (ctaSection && ctaParallax) {
        gsap.fromTo(
          ctaParallax,
          { y: 0 },
          {
            y: -32,
            ease: 'none',
            scrollTrigger: {
              trigger: ctaSection,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      refreshT = window.setTimeout(() => ScrollTrigger.refresh(), 150);
      requestAnimationFrame(() => requestAnimationFrame(() => ScrollTrigger.refresh()));
    }, root);

    return () => {
      window.clearTimeout(refreshT);
      ctx.revert();
    };
  }, []);

  return (
    <main ref={rootRef} className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10 pb-16 pt-14 sm:pb-20 sm:pt-16">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-10%,rgba(255,122,0,0.12),transparent_55%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl sm:right-10"
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div ref={heroRef}>
            <div
              data-hero-child
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/8 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.14em] text-zinc-200 backdrop-blur-sm"
            >
              <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden />
              Premium add-on
            </div>
            <h1
              data-hero-child
              className="font-yeseva-one text-4xl font-normal leading-tight text-white sm:text-5xl lg:text-[3.25rem]"
            >
              Giftflow <span className="text-primary">Pro</span>
            </h1>
            <p
              data-hero-child
              className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg"
            >
              The free plugin runs campaigns, donors, and donations in WordPress.{' '}
              <span className="text-zinc-300">Pro</span> unlocks recurring giving and finance-grade exports—on
              the same install, same gateways, same team habits.
            </p>
            <div
              data-hero-child
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5"
            >
              <Link
                href={proCtaUrl}
                className="inline-flex w-full items-center justify-center bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg shadow-primary/25 transition hover:bg-primary/90 sm:w-auto"
              >
                Get Pro
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden />
              </Link>
              <Link
                href={downloadUrl}
                target={downloadUrl.startsWith('http') ? '_blank' : undefined}
                rel={downloadUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="inline-flex w-full items-center justify-center border border-white/30 bg-white/8 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition hover:border-white/40 hover:bg-white/12 sm:w-auto"
              >
                <Download className="mr-2 h-5 w-5" aria-hidden />
                Download free plugin
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing tablets */}
      <section
        ref={pricingSectionRef}
        id="pricing"
        className="relative overflow-hidden border-b border-white/10 py-20 sm:py-28"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900/90 to-zinc-950"
          aria-hidden
        />
        <div
          ref={pricingGlowRef}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[min(44rem,120vw)] w-[min(56rem,140vw)] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(circle_at_center,rgba(255,122,0,0.14),transparent_62%)] blur-3xl will-change-transform"
          aria-hidden
        />

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div ref={pricingHeadRef} className="mx-auto max-w-3xl text-center">
            <p
              data-pricing-head
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3 py-1 text-sm font-semibold uppercase tracking-[0.14em] text-zinc-200"
            >
              Compare plans
            </p>
            <h2
              data-pricing-head
              className="font-yeseva-one text-3xl font-normal text-white sm:text-4xl lg:text-[2.65rem]"
            >
              Pricing that respects how WordPress teams buy
            </h2>
            <p data-pricing-head className="mt-4 text-base leading-relaxed text-zinc-300 sm:text-lg">
              Start on a <span className="text-zinc-300">forever-free core</span> your board can trust. Add Pro when
              recurring revenue and exports become non-negotiable—no rip-and-replace, no second CRM to learn.
            </p>
          </div>

          <div className="relative mt-16 lg:mt-20">
            {/* VS connector — desktop */}
            <div
              className="pointer-events-none absolute left-1/2 top-[min(12rem,28%)] z-20 hidden -translate-x-1/2 lg:block"
              aria-hidden
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-zinc-950/90 text-sm font-bold uppercase tracking-wider text-zinc-300 shadow-[0_0_40px_rgba(0,0,0,0.45)] backdrop-blur-md">
                vs
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-2 lg:gap-10 lg:items-start">
              {/* Free tablet */}
              <div ref={freeParallaxRef} className="will-change-transform lg:pt-4">
                <article
                  ref={freeCardRef}
                  className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  <div className="p-6 sm:p-8 lg:p-9">
                    <div data-tablet-piece className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-6">
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-zinc-200">Core</p>
                        <p className="mt-1 font-yeseva-one text-3xl text-white sm:text-4xl">Free</p>
                        <p className="mt-1 text-base text-zinc-300">Install from WordPress.org · No license key</p>
                      </div>
                      <div className="text-right">
                        <p className="flex items-center justify-end gap-1.5 text-2xl font-semibold tabular-nums text-white sm:text-3xl">
                          $0
                          <Infinity className="h-6 w-6 text-primary/90" aria-hidden />
                        </p>
                        <p className="text-sm text-zinc-300">Community & roadmap driven</p>
                      </div>
                    </div>

                    <p data-tablet-piece className="mt-6 text-base leading-relaxed text-zinc-300">
                      Everything you need to <span className="text-zinc-300">accept gifts, know your donors,</span>{' '}
                      and run appeals without duct-taping plugins together. Pro only layers on when your operating
                      model needs more.
                    </p>

                    <ul className="mt-8 space-y-4">
                      {FREE_HIGHLIGHTS.map(({ icon: Icon, title, text }) => (
                        <li
                          key={title}
                          data-tablet-piece
                          className="flex gap-4 rounded-2xl border border-white/5 bg-zinc-950/40 p-4 transition-colors hover:border-white/10"
                        >
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-primary ring-1 ring-white/10">
                            <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
                          </span>
                          <div className="min-w-0">
                            <p className="font-semibold text-zinc-100">{title}</p>
                            <p className="mt-1 text-[15px] leading-relaxed text-zinc-300">{text}</p>
                          </div>
                        </li>
                      ))}
                    </ul>

                    <div data-tablet-piece className="mt-8 rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-4 text-center">
                      <p className="text-sm font-medium uppercase tracking-wide text-zinc-200">Best for</p>
                      <p className="mt-1 text-sm text-zinc-300">
                        Teams launching giving programs, pilot campaigns, and one-time appeals at full fidelity.
                      </p>
                    </div>
                  </div>
                </article>
              </div>

              {/* Pro tablet */}
              <div ref={proParallaxRef} className="will-change-transform">
                <article
                  ref={proCardRef}
                  className="relative overflow-hidden rounded-3xl border border-primary/40 bg-gradient-to-b from-primary/[0.14] via-zinc-950/80 to-zinc-950 shadow-[0_28px_90px_rgba(255,122,0,0.12)] backdrop-blur-xl"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-90" />
                  <div className="absolute right-6 top-6 rounded-full border border-primary/60 bg-primary/25 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                    Add-on
                  </div>
                  <div className="p-6 sm:p-8 lg:p-9">
                    <div data-tablet-piece className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-6 pr-16 lg:pr-20">
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">Pro</p>
                        <p className="mt-1 font-yeseva-one text-3xl text-white sm:text-4xl">Scale the stack</p>
                        <p className="mt-1 text-base text-zinc-300">Licensed extension · Requires free Giftflow</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-semibold text-white sm:text-3xl">Custom</p>
                        <p className="text-sm text-zinc-300">Contact for quote</p>
                      </div>
                    </div>

                    <p data-tablet-piece className="mt-6 text-sm leading-relaxed text-zinc-300">
                      When <span className="text-white">predictable revenue</span> and{' '}
                      <span className="text-white">downstream data</span> matter, Pro extends the same plugin your
                      staff trained on—recurring engines plus exports that match how finance actually closes the
                      month.
                    </p>

                    <ul className="mt-8 space-y-4">
                      {PRO_HIGHLIGHTS.map(({ icon: Icon, title, text }) => (
                        <li
                          key={title}
                          data-tablet-piece
                          className="flex gap-4 rounded-2xl border border-primary/20 bg-zinc-950/50 p-4 transition-colors hover:border-primary/35"
                        >
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/25">
                            <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
                          </span>
                          <div className="min-w-0">
                            <p className="font-semibold text-white">{title}</p>
                            <p className="mt-1 text-[15px] leading-relaxed text-zinc-300">{text}</p>
                          </div>
                        </li>
                      ))}
                    </ul>

                    <div data-tablet-piece className="mt-8 flex flex-col gap-3 sm:flex-row">
                      <Link
                        href={proCtaUrl}
                        className="inline-flex flex-1 items-center justify-center bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition hover:bg-primary/90"
                      >
                        Talk sales
                        <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                      </Link>
                      <Link
                        href={downloadUrl}
                        target={downloadUrl.startsWith('http') ? '_blank' : undefined}
                        rel={downloadUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="inline-flex flex-1 items-center justify-center border border-white/30 bg-white/8 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/12"
                      >
                        Install free first
                      </Link>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>

          {/* Matrix */}
          <div
            ref={matrixRef}
            className="mt-16 overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/60 shadow-xl backdrop-blur-md sm:mt-20"
          >
            <div className="border-b border-white/10 bg-white/[0.03] px-4 py-4 sm:px-6">
              <p className="text-center text-sm font-semibold uppercase tracking-[0.14em] text-zinc-200">
                Feature snapshot
              </p>
            </div>
            <div className="divide-y divide-white/5">
              <div className="grid grid-cols-[1fr_4.5rem_4.5rem] gap-2 px-3 py-3 text-xs font-bold uppercase tracking-wide text-zinc-300 sm:grid-cols-[1fr_6rem_6rem] sm:px-5 sm:text-sm">
                <span className="pl-2 sm:pl-3">Capability</span>
                <span className="text-center text-zinc-300">Free</span>
                <span className="text-center text-primary">Pro</span>
              </div>
              {PRICING_MATRIX.map((row) => (
                <div
                  key={row.label}
                  data-matrix-row
                  className="grid grid-cols-[1fr_4.5rem_4.5rem] items-center gap-2 px-3 py-3.5 sm:grid-cols-[1fr_6rem_6rem] sm:px-5"
                >
                  <span className="pl-2 text-sm text-zinc-300 sm:pl-3">{row.label}</span>
                  <div className="flex justify-center">
                    <MatrixIcon ok={row.free} />
                  </div>
                  <div className="flex justify-center">
                    <MatrixIcon ok={row.pro} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it fits */}
      <section
        ref={fitSectionRef}
        id="how-it-fits"
        className="relative overflow-hidden border-t border-white/10 py-20 sm:py-28"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900/85 to-zinc-950"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_45%_at_30%_20%,rgba(255,122,0,0.07),transparent_55%)]"
          aria-hidden
        />
        <div
          ref={fitGlowRef}
          className="pointer-events-none absolute left-[15%] top-1/3 h-[min(28rem,85vw)] w-[min(36rem,95vw)] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,122,0,0.12),transparent_65%)] blur-3xl will-change-transform"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div ref={fitHeadRef} className="mx-auto max-w-3xl text-center">
            <p
              data-fit-head
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3 py-1 text-sm font-semibold uppercase tracking-[0.14em] text-zinc-200"
            >
              Architecture
            </p>
            <h2
              data-fit-head
              className="font-yeseva-one text-3xl font-normal text-white sm:text-4xl lg:text-[2.65rem]"
            >
              How it fits together
            </h2>
            <p data-fit-head className="mt-4 text-base leading-relaxed text-zinc-300 sm:text-lg">
              Giftflow stays one product on your server: the free plugin is the foundation, Pro is a licensed
              extension. Donors, staff, and finance each see a coherent story—no duplicate databases, no shadow
              checkout, no surprise handoffs when you turn subscriptions on.
            </p>
          </div>

          <div ref={fitContentParallaxRef} className="will-change-transform">
            <div
              ref={fitCardsRef}
              className="mt-14 grid gap-5 sm:mt-16 sm:gap-6 lg:grid-cols-2 lg:gap-7"
            >
              {FIT_TOGETHER_STEPS.map(({ step, icon: Icon, title, text }) => (
                <article
                  key={step}
                  data-fit-piece
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 shadow-xl shadow-black/30 backdrop-blur-md transition-colors duration-300 hover:border-primary/25 sm:p-7"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="flex gap-4">
                    <div className="flex shrink-0 flex-col items-center gap-3">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/90 text-white shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:scale-105">
                        <Icon className="h-6 w-6" strokeWidth={2} aria-hidden />
                      </span>
                      <span className="font-mono text-xs font-bold uppercase tracking-wide text-zinc-400">
                        {String(step).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="min-w-0 pt-0.5">
                      <h3 className="text-lg font-semibold text-white sm:text-xl">{title}</h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-zinc-300 sm:text-base">{text}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA — same section language as How it fits */}
      <section
        ref={ctaSectionRef}
        id="get-pro"
        className="relative overflow-hidden border-t border-white/10 py-20 sm:py-28"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900/90 to-black"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_70%_30%,rgba(255,122,0,0.08),transparent_55%)]"
          aria-hidden
        />
        <div
          ref={ctaGlowRef}
          className="pointer-events-none absolute right-[10%] top-1/4 h-[min(26rem,80vw)] w-[min(34rem,95vw)] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,122,0,0.14),transparent_62%)] blur-3xl will-change-transform"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div ref={ctaParallaxRef} className="will-change-transform">
            <article
              ref={ctaRef}
              className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-8 text-center shadow-[0_24px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:p-10 lg:p-12"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

              <p
                data-cta-piece
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/12 px-3 py-1 text-sm font-semibold uppercase tracking-[0.14em] text-primary"
              >
                <Sparkles className="h-3.5 w-3.5" aria-hidden />
                Next step
              </p>

              <h2
                data-cta-piece
                className="font-yeseva-one text-3xl font-normal text-white sm:text-4xl lg:text-[2.5rem]"
              >
                Ready for Pro?
              </h2>

              <p
                data-cta-piece
                className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-zinc-300 sm:text-lg"
              >
                Share your volume, gateways, and timeline—we will map the shortest path from your free install to
                recurring gifts and exports your finance team can trust.
              </p>

              <ul
                data-cta-piece
                className="mx-auto mt-8 max-w-xl space-y-3 text-left text-[15px] text-zinc-300 sm:text-base"
              >
                {CTA_TRUST_LINES.map((line) => (
                  <li
                    key={line}
                    className="flex gap-3 rounded-xl border border-white/5 bg-zinc-950/40 px-4 py-3 backdrop-blur-sm"
                  >
                    <Check
                      className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                      strokeWidth={2}
                      aria-hidden
                    />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>

              <div
                data-cta-piece
                className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5"
              >
                <Link
                  href={proCtaUrl}
                  className="inline-flex w-full items-center justify-center bg-primary px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition hover:bg-primary/90 sm:w-auto"
                >
                  Contact about Pro
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                </Link>
                <Link
                  href={downloadUrl}
                  target={downloadUrl.startsWith('http') ? '_blank' : undefined}
                  rel={downloadUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="inline-flex w-full items-center justify-center border border-white/30 bg-white/8 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/40 hover:bg-white/12 sm:w-auto"
                >
                  <Download className="mr-2 h-4 w-4" aria-hidden />
                  Get the free plugin first
                </Link>
                <Link
                  href="/"
                  className="inline-flex w-full items-center justify-center text-sm font-medium text-zinc-300 underline-offset-4 transition hover:text-zinc-100 sm:w-auto sm:px-2"
                >
                  Back to home
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
