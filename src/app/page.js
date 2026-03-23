'use client';

import HeroSection from './components/HeroSection';
import HomeFeaturesSection from './components/HomeFeaturesSection';
import HomeBenefitsSection from './components/HomeBenefitsSection';
import HomePerfectForSection from './components/HomePerfectForSection';
import HomeSecuritySection from './components/HomeSecuritySection';
import HomeCtaSection from './components/HomeCtaSection';

export default function Home() {
  return (
    <main
      id="home"
      className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-orange-50/50 text-zinc-900"
    >
      <HeroSection variant="light" />
      <HomeFeaturesSection variant="light" />
      <HomeBenefitsSection variant="light" />
      <HomePerfectForSection variant="light" />
      <HomeSecuritySection variant="light" />
      <HomeCtaSection variant="light" />
    </main>
  );
}
