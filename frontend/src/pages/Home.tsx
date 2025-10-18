import React from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { ServicesSection } from '../components/ServicesSection';
import { HowItWorks } from '../components/HowItWorks';
import { ProvidersSection } from '../components/ProvidersSection';
import { Testimonials } from '../components/Testimonials';
import { AppSection } from '../components/AppSection';
import { Footer } from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <ServicesSection />
        <HowItWorks />
        <ProvidersSection />
        <Testimonials />
        <AppSection />
      </main>
      <Footer />
    </div>
  );
}
