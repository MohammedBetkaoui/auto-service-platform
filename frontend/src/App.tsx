import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { HowItWorks } from './components/HowItWorks';
import { ProvidersSection } from './components/ProvidersSection';
import { Testimonials } from './components/Testimonials';
import { AppSection } from './components/AppSection';
import { Footer } from './components/Footer';
import { RegisterPage } from './components/RegisterPage';
import { LoginPage } from './components/LoginPage';
import { DashboardPage } from './components/DashboardPage';
import { LavageService } from './components/services/LavageService';
import { EntretienService } from './components/services/EntretienService';
import { AssistanceService } from './components/services/AssistanceService';
import { DetailingService } from './components/services/DetailingService';
import { BatterieService } from './components/services/BatterieService';
import { CarburantService } from './components/services/CarburantService';
import { ScrollToTop } from './components/ScrollToTop';
import { ScrollProgress } from './components/ScrollProgress';
import { PageLoader } from './components/PageLoader';
import { AuthProvider } from './contexts/AuthContext';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<'home' | 'register' | 'login' | 'dashboard' | 'service-lavage' | 'service-entretien' | 'service-assistance' | 'service-detailing' | 'service-batterie' | 'service-carburant'>('home');

  // Simple hash-based routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      
      // Scroll to top on page change
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      if (hash === 'register' || hash === 'inscription') {
        setCurrentPage('register');
      } else if (hash === 'login' || hash === 'connexion') {
        setCurrentPage('login');
      } else if (hash === 'dashboard' || hash === 'tableau-de-bord') {
        setCurrentPage('dashboard');
      } else if (hash === 'service-lavage') {
        setCurrentPage('service-lavage');
      } else if (hash === 'service-entretien') {
        setCurrentPage('service-entretien');
      } else if (hash === 'service-assistance') {
        setCurrentPage('service-assistance');
      } else if (hash === 'service-detailing') {
        setCurrentPage('service-detailing');
      } else if (hash === 'service-batterie') {
        setCurrentPage('service-batterie');
      } else if (hash === 'service-carburant') {
        setCurrentPage('service-carburant');
      } else {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Show loader on initial mount
  if (isLoading) {
    return <PageLoader onLoadComplete={() => setIsLoading(false)} />;
  }

  if (currentPage === 'register') {
    return (
      <AuthProvider>
        <RegisterPage />
      </AuthProvider>
    );
  }

  if (currentPage === 'login') {
    return (
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    );
  }

  if (currentPage === 'dashboard') {
    return (
      <AuthProvider>
        <DashboardPage />
      </AuthProvider>
    );
  }

  if (currentPage === 'service-lavage') {
    return (
      <AuthProvider>
        <Header />
        <LavageService />
        <Footer />
        <ScrollToTop />
      </AuthProvider>
    );
  }

  if (currentPage === 'service-entretien') {
    return (
      <AuthProvider>
        <Header />
        <EntretienService />
        <Footer />
        <ScrollToTop />
      </AuthProvider>
    );
  }

  if (currentPage === 'service-assistance') {
    return (
      <AuthProvider>
        <Header />
        <AssistanceService />
        <Footer />
        <ScrollToTop />
      </AuthProvider>
    );
  }

  if (currentPage === 'service-detailing') {
    return (
      <AuthProvider>
        <Header />
        <DetailingService />
        <Footer />
        <ScrollToTop />
      </AuthProvider>
    );
  }

  if (currentPage === 'service-batterie') {
    return (
      <AuthProvider>
        <Header />
        <BatterieService />
        <Footer />
        <ScrollToTop />
      </AuthProvider>
    );
  }

  if (currentPage === 'service-carburant') {
    return (
      <AuthProvider>
        <Header />
        <CarburantService />
        <Footer />
        <ScrollToTop />
      </AuthProvider>
    );
  }

  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#0A0A0A]">
        <ScrollProgress />
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
        <ScrollToTop />
      </div>
    </AuthProvider>
  );
}
