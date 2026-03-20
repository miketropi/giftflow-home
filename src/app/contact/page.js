'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Mail,
  Send,
  Sparkles,
  CheckCircle,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const REVEAL = 'top bottom-=72';

const SUBJECT_OPTIONS = [
  { value: '', label: 'Select a subject' },
  { value: 'general', label: 'General inquiry' },
  { value: 'pro', label: 'Giftflow Pro / licensing' },
  { value: 'support', label: 'Technical support' },
  { value: 'feature', label: 'Feature request' },
  { value: 'bug', label: 'Bug report' },
];

export default function Contact() {
  const rootRef = useRef(null);
  const heroRef = useRef(null);
  const sectionRef = useRef(null);
  const glowRef = useRef(null);
  const parallaxRef = useRef(null);
  const cardRef = useRef(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject) {
      newErrors.subject = 'Please select a subject';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const sendEmail = async (data) => {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        subject: data.subject,
        message: data.message,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await sendEmail(formData);
      setSubmitStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: '',
      });
      setErrors({});
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let refreshT;

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(
          root.querySelectorAll('[data-contact-hero], [data-contact-piece]'),
          { opacity: 1, y: 0, x: 0, scale: 1 }
        );
        return;
      }

      const heroChildren = heroRef.current?.querySelectorAll('[data-contact-hero]');
      if (heroChildren?.length) {
        gsap.fromTo(
          heroChildren,
          { opacity: 0, y: 40, filter: 'blur(6px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.82,
            stagger: 0.1,
            ease: 'power3.out',
            delay: 0.06,
          }
        );
      }

      const section = sectionRef.current;
      const glow = glowRef.current;
      const parallax = parallaxRef.current;
      const card = cardRef.current;

      if (card) {
        const pieces = card.querySelectorAll('[data-contact-piece]');
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
              trigger: card,
              start: REVEAL,
              toggleActions: 'play none none none',
              invalidateOnRefresh: true,
            },
          }
        );
      }

      if (section && glow) {
        gsap.fromTo(
          glow,
          { yPercent: -6, scale: 1 },
          {
            yPercent: 11,
            scale: 1.05,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.12,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      if (section && parallax) {
        gsap.fromTo(
          parallax,
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
      }

      refreshT = window.setTimeout(() => ScrollTrigger.refresh(), 150);
      requestAnimationFrame(() => requestAnimationFrame(() => ScrollTrigger.refresh()));
    }, root);

    return () => {
      window.clearTimeout(refreshT);
      ctx.revert();
    };
  }, []);

  const inputBase =
    'w-full rounded-xl border bg-zinc-900/70 px-4 py-3 text-base text-zinc-100 placeholder:text-zinc-400 outline-none transition-shadow focus:border-primary/50 focus:ring-2 focus:ring-primary/25';
  const inputOk = `${inputBase} border-white/15`;
  const inputErr = `${inputBase} border-red-400/50 bg-red-950/20`;

  const labelClass = 'mb-2 block text-sm font-medium text-zinc-300';

  return (
    <main ref={rootRef} className="min-h-screen bg-zinc-950 text-zinc-100">
      <section
        ref={sectionRef}
        className="relative overflow-hidden pb-20 pt-14 sm:pb-28 sm:pt-16"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-15%,rgba(255,122,0,0.1),transparent_55%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900/85 to-zinc-950"
          aria-hidden
        />
        <div
          ref={glowRef}
          className="pointer-events-none absolute left-1/2 top-24 h-[min(32rem,90vw)] w-[min(44rem,120vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,122,0,0.12),transparent_62%)] blur-3xl will-change-transform"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div ref={heroRef} className="mb-12 text-center sm:mb-14">
            <div
              data-contact-hero
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/8 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.14em] text-zinc-200 backdrop-blur-sm"
            >
              <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden />
              Get in touch
            </div>
            <h1
              data-contact-hero
              className="font-yeseva-one text-4xl font-normal text-white sm:text-5xl lg:text-[3.15rem]"
            >
              Contact us
            </h1>
            <p
              data-contact-hero
              className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg"
            >
              Questions about the free plugin, <span className="text-zinc-300">Pro</span>, or your stack—we read
              every message. For licensing and rollout, see{' '}
              <Link href="/pro" className="font-medium text-primary underline-offset-4 hover:underline">
                Giftflow Pro
              </Link>
              .
            </p>
          </div>

          <div ref={parallaxRef} className="will-change-transform">
            <article
              ref={cardRef}
              className="relative mx-auto max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] shadow-[0_24px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/45 to-transparent" />

              <div data-contact-piece className="border-b border-white/10 p-8 text-center sm:p-10">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/90 text-white shadow-lg shadow-primary/25">
                  <Mail className="h-7 w-7" strokeWidth={2} aria-hidden />
                </div>
                <h2 className="font-yeseva-one text-2xl text-white sm:text-3xl">Send a message</h2>
                <p className="mt-2 text-base text-zinc-300">
                  We typically reply within one business day.
                </p>
              </div>

              <div data-contact-piece className="p-6 sm:p-8 sm:pt-6">
                {submitStatus === 'success' && (
                  <div
                    className="mb-6 flex gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-left"
                    role="status"
                  >
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" aria-hidden />
                    <p className="text-sm font-medium text-emerald-100">
                      Thank you—your message is on its way. We&rsquo;ll get back to you soon.
                    </p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div
                    className="mb-6 flex gap-3 rounded-xl border border-red-400/35 bg-red-950/40 p-4 text-left"
                    role="alert"
                  >
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" aria-hidden />
                    <p className="text-sm font-medium text-red-100">
                      Something went wrong sending your message. Please try again or email us directly below.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div>
                      <label htmlFor="firstName" className={labelClass}>
                        First name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={errors.firstName ? inputErr : inputOk}
                        placeholder="Jane"
                        autoComplete="given-name"
                      />
                      {errors.firstName && (
                        <p className="mt-1.5 text-sm text-red-400">{errors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="lastName" className={labelClass}>
                        Last name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={errors.lastName ? inputErr : inputOk}
                        placeholder="Doe"
                        autoComplete="family-name"
                      />
                      {errors.lastName && (
                        <p className="mt-1.5 text-sm text-red-400">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className={labelClass}>
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={errors.email ? inputErr : inputOk}
                      placeholder="you@organization.org"
                      autoComplete="email"
                    />
                    {errors.email && <p className="mt-1.5 text-sm text-red-400">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="subject" className={labelClass}>
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={errors.subject ? inputErr : inputOk}
                    >
                      {SUBJECT_OPTIONS.map((opt) => (
                        <option key={opt.value || 'empty'} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    {errors.subject && (
                      <p className="mt-1.5 text-sm text-red-400">{errors.subject}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className={labelClass}>
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`${errors.message ? inputErr : inputOk} resize-none`}
                      placeholder="How can we help?"
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-sm text-red-400">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex w-full items-center justify-center gap-2 bg-primary py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/25 transition hover:bg-primary/90 ${
                      isSubmitting ? 'cursor-not-allowed opacity-60' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" aria-hidden />
                        Send message
                      </>
                    )}
                  </button>
                </form>
              </div>

              <div
                data-contact-piece
                className="border-t border-white/10 bg-zinc-950/40 px-6 py-6 text-center sm:px-8"
              >
                <p className="text-base text-zinc-300">
                  Prefer email?{' '}
                  <a
                    href="mailto:bearsthemes+giftflow@gmail.com"
                    className="font-medium text-primary hover:underline"
                  >
                    bearsthemes+giftflow@gmail.com
                  </a>
                </p>
                <Link
                  href="/pro#get-pro"
                  className="mt-4 inline-flex items-center gap-1 text-base font-medium text-zinc-300 transition hover:text-primary"
                >
                  Interested in Pro?
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
