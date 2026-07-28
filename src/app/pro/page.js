'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { gsap, ScrollTrigger } from '@/lib/gsap';
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
  Clock,
  Zap,
  Crown,
} from 'lucide-react';


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

const PRO_PLANS = [
  {
    key: 'monthly',
    icon: Clock,
    label: 'Monthly',
    price: '$19.99',
    period: '/month',
    description: 'Flexible billing—pause or cancel anytime.',
    features: [
      'Recurring donations (Stripe & PayPal)',
      'Finance-grade data exports',
      'Premium email support',
      'All Core features included',
      'One site license',
    ],
    highlighted: false,
  },
  {
    key: 'annual',
    icon: Zap,
    label: 'Annual',
    price: '$191.88',
    period: '/year',
    sub: '$15.99/mo',
    badge: 'Best Value',
    description: 'Save 20% — the choice growing teams make.',
    features: [
      'Recurring donations (Stripe & PayPal)',
      'Finance-grade data exports',
      'Priority email support',
      'All Core features included',
      'One site license',
    ],
    highlighted: true,
  },
  {
    key: 'lifetime',
    icon: Crown,
    label: 'Lifetime',
    price: '$579.99',
    period: 'one-time',
    description: 'Pay once, use forever. No recurring fees ever.',
    features: [
      'Recurring donations (Stripe & PayPal)',
      'Finance-grade data exports',
      'Priority email support',
      'All Core features included',
      'Unlimited site licenses',
    ],
    highlighted: false,
  },
];

const PLAN_URLS = {
  monthly: process.env.NEXT_PUBLIC_PRO_MONTHLY_URL,
  annual: process.env.NEXT_PUBLIC_PRO_ANNUAL_URL,
  lifetime: process.env.NEXT_PUBLIC_PRO_LIFETIME_URL,
};

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
  const proPlansSectionRef = useRef(null);
  const proPlansGlowRef = useRef(null);
  const proPlansHeadRef = useRef(null);
  const proPlansCardsRef = useRef(null);

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
            '[data-hero-child], [data-pricing-head], [data-tablet-piece], [data-matrix-row], [data-fit-head], [data-fit-piece], [data-cta-piece], [data-plans-head], [data-plans-card]'
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

      // Pro Plans: head + cards + parallax
      const proPlansSection = proPlansSectionRef.current;
      const proPlansGlow = proPlansGlowRef.current;
      const proPlansHead = proPlansHeadRef.current;
      const proPlansCards = proPlansCardsRef.current;

      if (proPlansSection && proPlansHead) {
        const headEls = proPlansHead.querySelectorAll('[data-plans-head]');
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
              trigger: proPlansHead,
              start: REVEAL,
              toggleActions: 'play none none none',
              invalidateOnRefresh: true,
            },
          }
        );
      }

      if (proPlansCards) {
        const cards = proPlansCards.querySelectorAll('[data-plans-card]');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 36, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: proPlansCards,
              start: REVEAL,
              toggleActions: 'play none none none',
              invalidateOnRefresh: true,
            },
          }
        );
      }

      if (proPlansSection && proPlansGlow) {
        gsap.fromTo(
          proPlansGlow,
          { yPercent: -6, scale: 1 },
          {
            yPercent: 12,
            scale: 1.05,
            ease: 'none',
            scrollTrigger: {
              trigger: proPlansSection,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.1,
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
    <main
      ref={rootRef}
      className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-orange-50/40 text-zinc-900"
    >
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-200/80 pb-14 pt-12 sm:pb-18 sm:pt-14">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-10%,rgba(255,122,0,0.12),transparent_55%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl sm:right-10"
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <div ref={heroRef}>
            <div
              data-hero-child
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.14em] text-primary shadow-sm"
            >
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              Pro Plans
            </div>
            <h1
              data-hero-child
              className="font-bricolage-grotesque font-bold text-4xl font-bold leading-tight text-zinc-900 sm:text-5xl lg:text-[3rem]"
            >
              Unlock Giftflow <span className="text-primary">Pro</span>
            </h1>
            <p
              data-hero-child
              className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-zinc-600 sm:text-lg"
            >
              Recurring donations, finance-grade exports, and priority support—on the same WordPress install your team already knows.
            </p>
            <div
              data-hero-child
              className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
            >
              <a
                href="#pro-plans"
                className="inline-flex w-full items-center justify-center bg-primary rounded-md px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/25 transition hover:bg-primary/90 sm:w-auto"
              >
                View plans
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden />
              </a>
              <Link
                href={downloadUrl}
                target={downloadUrl.startsWith('http') ? '_blank' : undefined}
                rel={downloadUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="inline-flex w-full items-center justify-center text-sm font-medium text-zinc-600 underline-offset-4 transition hover:text-zinc-900 sm:w-auto"
              >
                or try the free plugin first
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pro Plans */}
      <section
        ref={proPlansSectionRef}
        id="pro-plans"
        className="relative overflow-hidden border-b border-zinc-200/80 py-20 sm:py-28"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-amber-50/35 to-orange-50/25"
          aria-hidden
        />
        <div
          ref={proPlansGlowRef}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[min(44rem,120vw)] w-[min(56rem,140vw)] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(circle_at_center,rgba(255,122,0,0.1),transparent_62%)] blur-3xl will-change-transform"
          aria-hidden
        />

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div ref={proPlansHeadRef} className="mx-auto max-w-3xl text-center">
            <p
              data-plans-head
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-sm font-semibold uppercase tracking-[0.14em] text-primary shadow-sm"
            >
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              Pro Plans
            </p>
            <h2
              data-plans-head
              className="font-bricolage-grotesque font-bold text-3xl font-bold text-zinc-900 sm:text-4xl lg:text-[2.65rem]"
            >
              Simple, transparent pricing
            </h2>
            <p data-plans-head className="mt-4 text-base leading-relaxed text-zinc-600 sm:text-lg">
              One license unlocks every Pro feature. Pick the billing that fits how your organization budgets.
            </p>
          </div>

          <div ref={proPlansCardsRef} className="mt-16 grid gap-6 lg:grid-cols-3 lg:gap-5">
            {PRO_PLANS.map((plan) => {
              const planUrl = PLAN_URLS[plan.key] || process.env.NEXT_PUBLIC_PRO_CHECKOUT_URL || '/contact';
              const isHighlighted = plan.highlighted;

              return (
                <article
                  key={plan.key}
                  data-plans-card
                  className={`relative flex flex-col rounded-3xl backdrop-blur-xl transition-shadow duration-300 ${
                    isHighlighted
                      ? 'border-2 border-primary bg-gradient-to-b from-orange-50/95 via-white to-amber-50/80 shadow-[0_28px_90px_rgba(255,122,0,0.18)]'
                      : 'border border-zinc-200/90 bg-white shadow-xl shadow-zinc-200/40'
                  }`}
                >
                  {isHighlighted && (
                    <>
                      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/60 bg-primary px-4 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-primary/30">
                          <Zap className="h-3 w-3" aria-hidden />
                          {plan.badge}
                        </span>
                      </div>
                    </>
                  )}

                  {/* Card header */}
                  <div className={`px-6 pb-5 pt-8 sm:px-7 sm:pt-9 ${isHighlighted ? 'pt-10 sm:pt-11' : ''}`}>
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                          isHighlighted
                            ? 'bg-primary text-white shadow-lg shadow-primary/25'
                            : 'bg-zinc-100 text-zinc-600'
                        }`}
                      >
                        <plan.icon className="h-5 w-5" strokeWidth={2} aria-hidden />
                      </span>
                      <p className="text-lg font-semibold text-zinc-900">{plan.label}</p>
                    </div>

                    <div className="mt-5">
                      <div className="flex items-baseline gap-1">
                        <span className="font-bricolage-grotesque font-bold text-4xl text-zinc-900 sm:text-5xl">{plan.price}</span>
                        <span className="text-base text-zinc-500">{plan.period}</span>
                      </div>
                      {plan.sub && (
                        <p className="mt-1 text-sm font-medium text-primary">{plan.sub}</p>
                      )}
                    </div>

                    <p className="mt-3 text-[15px] leading-relaxed text-zinc-600">{plan.description}</p>
                  </div>

                  {/* Features */}
                  <div className="flex-1 px-6 pb-6 sm:px-7 sm:pb-7">
                    <ul className="space-y-3 rounded-2xl border border-zinc-200/90 bg-amber-50/50 p-4">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-[15px] text-zinc-700">
                          <Check
                            className={`mt-0.5 h-4 w-4 shrink-0 ${isHighlighted ? 'text-primary' : 'text-primary/80'}`}
                            strokeWidth={2.5}
                            aria-hidden
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <div className="px-6 pb-7 sm:px-7 sm:pb-8">
                    <Link
                      href={planUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex w-full items-center justify-center rounded-md px-6 py-3.5 text-sm font-semibold transition ${
                        isHighlighted
                          ? 'bg-primary text-white shadow-lg shadow-primary/25 hover:bg-primary/90'
                          : 'border border-zinc-300 bg-white text-zinc-900 hover:border-zinc-400 hover:bg-zinc-50'
                      }`}
                    >
                      {isHighlighted ? (
                        <>
                          Get {plan.label}
                          <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                        </>
                      ) : (
                        `Get ${plan.label}`
                      )}
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing tablets */}
      <section
        ref={pricingSectionRef}
        id="pricing"
        className="relative overflow-hidden border-b border-zinc-200/80 py-20 sm:py-28"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-amber-50/35 to-orange-50/25"
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
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-200/90 bg-white/95 px-3 py-1 text-sm font-semibold uppercase tracking-[0.14em] text-zinc-700 shadow-sm"
            >
              Compare plans
            </p>
            <h2
              data-pricing-head
              className="font-bricolage-grotesque font-bold text-3xl font-bold text-zinc-900 sm:text-4xl lg:text-[2.65rem]"
            >
              Pricing that respects how WordPress teams buy
            </h2>
            <p data-pricing-head className="mt-4 text-base leading-relaxed text-zinc-600 sm:text-lg">
              Start on a <span className="font-medium text-zinc-800">forever-free core</span> your board can trust. Add Pro when
              recurring revenue and exports become non-negotiable—no rip-and-replace, no second CRM to learn.
            </p>
          </div>

          <div className="relative mt-16 lg:mt-20">
            {/* VS connector — desktop */}
            <div
              className="pointer-events-none absolute left-1/2 top-[min(12rem,28%)] z-20 hidden -translate-x-1/2 lg:block"
              aria-hidden
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-200 bg-white text-sm font-bold uppercase tracking-wider text-zinc-600 shadow-lg shadow-zinc-200/50 backdrop-blur-md">
                vs
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-2 lg:gap-10 lg:items-start">
              {/* Free tablet */}
              <div ref={freeParallaxRef} className="will-change-transform lg:pt-4">
                <article
                  ref={freeCardRef}
                  className="relative overflow-hidden rounded-3xl border border-zinc-200/90 bg-white shadow-xl shadow-zinc-200/40 backdrop-blur-xl"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
                  <div className="p-6 sm:p-8 lg:p-9">
                    <div data-tablet-piece className="flex flex-wrap items-end justify-between gap-4 border-b border-zinc-200/90 pb-6">
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-zinc-500">Core</p>
                        <p className="mt-1 font-bricolage-grotesque font-bold text-3xl text-zinc-900 sm:text-4xl">Free</p>
                        <p className="mt-1 text-base text-zinc-600">Install from WordPress.org · No license key</p>
                      </div>
                      <div className="text-right">
                        <p className="flex items-center justify-end gap-1.5 text-2xl font-semibold tabular-nums text-zinc-900 sm:text-3xl">
                          $0
                          <Infinity className="h-6 w-6 text-primary/90" aria-hidden />
                        </p>
                        <p className="text-sm text-zinc-600">Community & roadmap driven</p>
                      </div>
                    </div>

                    <p data-tablet-piece className="mt-6 text-base leading-relaxed text-zinc-600">
                      Everything you need to <span className="font-medium text-zinc-800">accept gifts, know your donors,</span>{' '}
                      and run appeals without duct-taping plugins together. Pro only layers on when your operating
                      model needs more.
                    </p>

                    <ul className="mt-8 space-y-4">
                      {FREE_HIGHLIGHTS.map(({ icon: Icon, title, text }) => (
                        <li
                          key={title}
                          data-tablet-piece
                          className="flex gap-4 rounded-2xl border border-zinc-200/80 bg-amber-50/40 p-4 transition-colors hover:border-primary/25"
                        >
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-primary shadow-sm ring-1 ring-zinc-200/80">
                            <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
                          </span>
                          <div className="min-w-0">
                            <p className="font-semibold text-zinc-900">{title}</p>
                            <p className="mt-1 text-[15px] leading-relaxed text-zinc-600">{text}</p>
                          </div>
                        </li>
                      ))}
                    </ul>

                    <div data-tablet-piece className="mt-8 rounded-2xl border border-dashed border-zinc-300/90 bg-zinc-50/80 p-4 text-center">
                      <p className="text-sm font-medium uppercase tracking-wide text-zinc-600">Best for</p>
                      <p className="mt-1 text-sm text-zinc-700">
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
                  className="relative overflow-hidden rounded-3xl border border-primary/50 bg-gradient-to-b from-orange-50/95 via-white to-amber-50/80 shadow-[0_28px_90px_rgba(255,122,0,0.15)] backdrop-blur-xl"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-90" />
                  <div className="absolute right-6 top-6 rounded-full border border-primary/60 bg-primary/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                    Add-on
                  </div>
                  <div className="p-6 sm:p-8 lg:p-9">
                    <div data-tablet-piece className="flex flex-wrap items-end justify-between gap-4 border-b border-zinc-200/90 pb-6 pr-16 lg:pr-20">
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">Pro</p>
                        <p className="mt-1 font-bricolage-grotesque font-bold text-3xl text-zinc-900 sm:text-4xl">Scale the stack</p>
                        <p className="mt-1 text-base text-zinc-600">Licensed extension · Requires free Giftflow</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-semibold text-zinc-900 sm:text-3xl">Custom</p>
                        <p className="text-sm text-zinc-600">Contact for quote</p>
                      </div>
                    </div>

                    <p data-tablet-piece className="mt-6 text-sm leading-relaxed text-zinc-600 sm:text-base">
                      When <span className="font-semibold text-zinc-900">predictable revenue</span> and{' '}
                      <span className="font-semibold text-zinc-900">downstream data</span> matter, Pro extends the same plugin your
                      staff trained on—recurring engines plus exports that match how finance actually closes the
                      month.
                    </p>

                    <ul className="mt-8 space-y-4">
                      {PRO_HIGHLIGHTS.map(({ icon: Icon, title, text }) => (
                        <li
                          key={title}
                          data-tablet-piece
                          className="flex gap-4 rounded-2xl border border-primary/25 bg-white/90 p-4 shadow-sm transition-colors hover:border-primary/40"
                        >
                          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/25">
                            <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
                          </span>
                          <div className="min-w-0">
                            <p className="font-semibold text-zinc-900">{title}</p>
                            <p className="mt-1 text-[15px] leading-relaxed text-zinc-600">{text}</p>
                          </div>
                        </li>
                      ))}
                    </ul>

                    <div data-tablet-piece className="mt-8 flex flex-col gap-3 sm:flex-row">
                      <Link
                        href={ process.env.NEXT_PUBLIC_PRO_CHECKOUT_URL }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex flex-1 items-center justify-center bg-primary rounded-md px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition hover:bg-primary/90"
                      >
                        Get Pro Now
                        <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                      </Link>
                      <Link
                        href={downloadUrl}
                        target={downloadUrl.startsWith('http') ? '_blank' : undefined}
                        rel={downloadUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="inline-flex flex-1 items-center justify-center border border-zinc-300 bg-white rounded-md px-6 py-3.5 text-sm font-semibold text-zinc-900 backdrop-blur-sm transition hover:border-zinc-400 hover:bg-zinc-50"
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
            className="mt-16 overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-xl shadow-zinc-200/30 backdrop-blur-md sm:mt-20"
          >
            <div className="border-b border-zinc-200/90 bg-zinc-50/80 px-4 py-4 sm:px-6">
              <p className="text-center text-sm font-semibold uppercase tracking-[0.14em] text-zinc-600">
                Feature snapshot
              </p>
            </div>
            <div className="divide-y divide-zinc-200/80">
              <div className="grid grid-cols-[1fr_4.5rem_4.5rem] gap-2 px-3 py-3 text-xs font-bold uppercase tracking-wide text-zinc-600 sm:grid-cols-[1fr_6rem_6rem] sm:px-5 sm:text-sm">
                <span className="pl-2 sm:pl-3">Capability</span>
                <span className="text-center text-zinc-600">Free</span>
                <span className="text-center text-primary">Pro</span>
              </div>
              {PRICING_MATRIX.map((row) => (
                <div
                  key={row.label}
                  data-matrix-row
                  className="grid grid-cols-[1fr_4.5rem_4.5rem] items-center gap-2 px-3 py-3.5 sm:grid-cols-[1fr_6rem_6rem] sm:px-5"
                >
                  <span className="pl-2 text-sm text-zinc-700 sm:pl-3">{row.label}</span>
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
        className="relative overflow-hidden border-t border-zinc-200/80 py-20 sm:py-28"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-orange-50/40 via-white to-amber-50/30"
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
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div ref={fitHeadRef} className="mx-auto max-w-3xl text-center">
            <p
              data-fit-head
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-200/90 bg-white/95 px-3 py-1 text-sm font-semibold uppercase tracking-[0.14em] text-zinc-700 shadow-sm"
            >
              Architecture
            </p>
            <h2
              data-fit-head
              className="font-bricolage-grotesque font-bold text-3xl font-bold text-zinc-900 sm:text-4xl lg:text-[2.65rem]"
            >
              How it fits together
            </h2>
            <p data-fit-head className="mt-4 text-base leading-relaxed text-zinc-600 sm:text-lg">
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
                  className="group relative overflow-hidden rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-lg shadow-zinc-200/40 backdrop-blur-md transition-colors duration-300 hover:border-primary/35 sm:p-7"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="flex gap-4">
                    <div className="flex shrink-0 flex-col items-center gap-3">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/90 text-white shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:scale-105">
                        <Icon className="h-6 w-6" strokeWidth={2} aria-hidden />
                      </span>
                      <span className="font-mono text-xs font-bold uppercase tracking-wide text-zinc-500">
                        {String(step).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="min-w-0 pt-0.5">
                      <h3 className="text-lg font-semibold text-zinc-900 sm:text-xl">{title}</h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-zinc-600 sm:text-base">{text}</p>
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
        className="relative overflow-hidden border-t border-zinc-200/80 py-20 sm:py-28"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-amber-50/40 to-orange-50/50"
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
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div ref={ctaParallaxRef} className="will-change-transform">
            <article
              ref={ctaRef}
              className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-zinc-200/90 bg-white p-8 text-center shadow-xl shadow-zinc-200/50 backdrop-blur-xl sm:p-10 lg:p-12"
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
                className="font-bricolage-grotesque font-bold text-3xl font-bold text-zinc-900 sm:text-4xl lg:text-[2.5rem]"
              >
                Ready for Pro?
              </h2>

              <p
                data-cta-piece
                className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-zinc-600 sm:text-lg"
              >
                Share your volume, gateways, and timeline—we will map the shortest path from your free install to
                recurring gifts and exports your finance team can trust.
              </p>

              <ul
                data-cta-piece
                className="mx-auto mt-8 max-w-xl space-y-3 text-left text-[15px] text-zinc-700 sm:text-base"
              >
                {CTA_TRUST_LINES.map((line) => (
                  <li
                    key={line}
                    className="flex gap-3 rounded-xl border border-zinc-200/90 bg-amber-50/50 px-4 py-3 backdrop-blur-sm"
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
                  href={ process.env.NEXT_PUBLIC_PRO_CHECKOUT_URL }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center bg-primary rounded-md px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition hover:bg-primary/90 sm:w-auto"
                >
                  Get Pro Now
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                </Link>
                <Link
                  href={downloadUrl}
                  target={downloadUrl.startsWith('http') ? '_blank' : undefined}
                  rel={downloadUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="inline-flex w-full items-center justify-center border border-zinc-300 bg-white rounded-md px-8 py-4 text-sm font-semibold text-zinc-900 backdrop-blur-sm transition hover:border-zinc-400 hover:bg-zinc-50 sm:w-auto"
                >
                  <Download className="mr-2 h-4 w-4" aria-hidden />
                  Get the free plugin first
                </Link>
                <Link
                  href="/"
                  className="inline-flex w-full items-center justify-center text-sm font-medium text-zinc-600 underline-offset-4 transition hover:text-zinc-900 sm:w-auto sm:px-2"
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
