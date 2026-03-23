'use client';

import Link from 'next/link';
import {
  Github,
  Youtube,
  Shield,
  Rocket,
  Heart,
  Mail,
  Sparkles,
  Lock,
} from 'lucide-react';
import { useBrightHome } from './BrightHomeProvider';

export default function Footer() {
  const brightHome = useBrightHome();
  const currentYear = new Date().getFullYear();
  const downloadHref =
    process.env.NEXT_PUBLIC_DOWNLOAD_URL?.trim() || '/#download';

  const footerLinks = {
    product: [
      { name: 'Features', href: '/#features' },
      { name: 'Giftflow Pro', href: '/pro' },
      { name: 'Pricing', href: '/pro#pricing' },
      { name: 'Download', href: downloadHref },
      { name: 'Changelog', href: '#changelog' },
    ],
    support: [
      { name: 'Documentation', href: '/documentation' },
      { name: 'Help Center', href: '#help' },
      { name: 'Community', href: '#community' },
      { name: 'Contact Us', href: '/contact' },
    ],
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Careers', href: '#careers' },
      { name: 'Privacy Policy', href: '#privacy' },
    ],
  };

  const socialLinks = [
    { name: 'GitHub', href: '#', icon: Github },
    { name: 'YouTube', href: '#', icon: Youtube },
  ];

  const renderLink = (link) => {
    const isInternal =
      link.href.startsWith('/') && !link.href.startsWith('//');
    const className = brightHome
      ? 'text-base text-zinc-600 transition-colors duration-200 hover:text-primary'
      : 'text-base text-zinc-300 transition-colors duration-200 hover:text-primary';

    if (isInternal) {
      return (
        <Link href={link.href} className={className}>
          {link.name}
        </Link>
      );
    }

    return (
      <a href={link.href} className={className}>
        {link.name}
      </a>
    );
  };

  return (
    <footer
      className={`relative overflow-hidden border-t ${
        brightHome
          ? 'border-zinc-200 bg-gradient-to-b from-amber-50/40 via-white to-orange-50/30'
          : 'border-white/10 bg-zinc-950'
      }`}
    >
      <div
        className={`pointer-events-none absolute inset-0 ${
          brightHome
            ? 'bg-gradient-to-b from-white/80 via-transparent to-amber-50/20'
            : 'bg-gradient-to-b from-zinc-900/80 via-zinc-950 to-black'
        }`}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[min(100%,48rem)] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4 flex items-center">
              <h3
                className={`font-yeseva-one text-2xl tracking-tight sm:text-3xl ${
                  brightHome ? 'text-zinc-900' : 'text-zinc-100'
                }`}
              >
                <span className="text-primary">Giftflow</span>
              </h3>
            </div>
            <p
              className={`mb-6 text-base leading-relaxed ${
                brightHome ? 'text-zinc-600' : 'text-zinc-300'
              }`}
            >
              Donations, donors, and campaigns in WordPress—with a modern flow
              you can extend.
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className={`inline-flex items-center gap-2 text-base font-medium transition-colors duration-200 hover:text-primary ${
                      brightHome ? 'text-zinc-600' : 'text-zinc-300'
                    }`}
                    aria-label={social.name}
                    title={social.name}
                  >
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary ${
                        brightHome
                          ? 'border-zinc-200 bg-white text-zinc-700 shadow-sm'
                          : 'border-white/15 bg-white/8 text-zinc-200'
                      }`}
                    >
                      <IconComponent className="h-4 w-4" aria-hidden />
                    </span>
                    <span>{social.name}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Product */}
          <div>
            <h4
              className={`mb-4 flex items-center text-sm font-semibold uppercase tracking-wide ${
                brightHome ? 'text-zinc-800' : 'text-zinc-200'
              }`}
            >
              Product
              <Rocket className="ml-1.5 h-4 w-4 text-primary" aria-hidden />
            </h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>{renderLink(link)}</li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4
              className={`mb-4 flex items-center text-sm font-semibold uppercase tracking-wide ${
                brightHome ? 'text-zinc-800' : 'text-zinc-200'
              }`}
            >
              Support
              <Heart className="ml-1.5 h-4 w-4 text-primary" aria-hidden />
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>{renderLink(link)}</li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4
              className={`mb-4 flex items-center text-sm font-semibold uppercase tracking-wide ${
                brightHome ? 'text-zinc-800' : 'text-zinc-200'
              }`}
            >
              Company
              <Shield className="ml-1.5 h-4 w-4 text-primary" aria-hidden />
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>{renderLink(link)}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div
          className={`mt-14 border-t pt-10 ${brightHome ? 'border-zinc-200' : 'border-white/10'}`}
        >
          <div
            className={`max-w-xl rounded-2xl border p-6 backdrop-blur-md sm:p-8 ${
              brightHome
                ? 'border-zinc-200 bg-white shadow-md shadow-zinc-200/30'
                : 'border-white/10 bg-white/[0.04] shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset]'
            }`}
          >
            <h4
              className={`mb-2 flex items-center text-lg font-semibold ${
                brightHome ? 'text-zinc-900' : 'text-zinc-100'
              }`}
            >
              Stay in the loop
              <Mail className="ml-2 h-5 w-5 text-primary" aria-hidden />
            </h4>
            <p
              className={`mb-5 text-base ${brightHome ? 'text-zinc-600' : 'text-zinc-300'}`}
            >
              Plugin updates, release notes, and WordPress donation tips—when
              we send them.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                name="footer-email"
                autoComplete="email"
                placeholder="you@example.com"
                className={`min-h-11 flex-1 rounded-md border px-4 py-2.5 text-base outline-none transition-shadow focus:border-primary/50 focus:ring-2 focus:ring-primary/30 ${
                  brightHome
                    ? 'border-zinc-200 bg-zinc-50 text-zinc-900 placeholder:text-zinc-500'
                    : 'border-white/20 bg-zinc-900/60 text-zinc-100 placeholder:text-zinc-400'
                }`}
              />
              <button
                type="button"
                className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-6 py-2.5 text-base font-semibold text-white shadow-lg shadow-primary/25 transition-opacity hover:opacity-90"
              >
                Subscribe
                <Sparkles className="ml-1.5 h-4 w-4" aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className={`relative z-10 border-t ${
          brightHome
            ? 'border-zinc-200 bg-white/90'
            : 'border-white/10 bg-black/50'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div
            className={`flex flex-col items-center justify-between gap-4 text-base md:flex-row md:gap-0 ${
              brightHome ? 'text-zinc-600' : 'text-zinc-300'
            }`}
          >
            <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-6">
              <span className="flex flex-wrap items-center justify-center gap-x-1 text-center">
                © {currentYear} Giftflow. Made with{' '}
                <Heart
                  className="mx-0.5 inline h-4 w-4 text-primary"
                  aria-hidden
                />
                for WordPress
              </span>
              <span className="hidden text-zinc-500 sm:inline">•</span>
              <span>All rights reserved</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <a
                href="#terms"
                className="transition-colors hover:text-primary"
              >
                Terms of Service
              </a>
              <a
                href="#cookies"
                className="transition-colors hover:text-primary"
              >
                Cookie Policy
              </a>
              <span className="inline-flex items-center gap-1 rounded-full border border-primary/40 bg-primary/12 px-2.5 py-1 text-sm font-medium text-primary">
                <Lock className="h-3 w-3" aria-hidden />
                GDPR Compliant
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
