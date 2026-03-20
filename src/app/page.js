'use client';

import HeroSection from './components/HeroSection';
import HomeFeaturesSection from './components/HomeFeaturesSection';
import HomeBenefitsSection from './components/HomeBenefitsSection';
import HomePerfectForSection from './components/HomePerfectForSection';
import HomeSecuritySection from './components/HomeSecuritySection';
import HomeCtaSection from './components/HomeCtaSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <HomeFeaturesSection />
      <HomeBenefitsSection />
      <HomePerfectForSection />
      <HomeSecuritySection />
      <HomeCtaSection />
    </>
  );
}
