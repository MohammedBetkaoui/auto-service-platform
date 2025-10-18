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

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'register' | 'login' | 'dashboard'>('home');

  // Simple hash-based routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash === 'register' || hash === 'inscription') {
        setCurrentPage('register');
      } else if (hash === 'login' || hash === 'connexion') {
        setCurrentPage('login');
      } else if (hash === 'dashboard' || hash === 'tableau-de-bord') {
        setCurrentPage('dashboard');
      } else {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (currentPage === 'register') {
    return <RegisterPage />;
  }

  if (currentPage === 'login') {
    return <LoginPage />;
  }

  if (currentPage === 'dashboard') {
    return <DashboardPage />;
  }

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
