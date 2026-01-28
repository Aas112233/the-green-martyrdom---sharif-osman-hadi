import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import Poetry from './components/Poetry';
import Biography from './components/Biography';
import Footer from './components/Footer';
import JusticeDemand from './components/JusticeDemand';
import Gallery from './components/Gallery';
import Speeches from './components/Speeches';
import Documents from './components/Documents';
import Tributes from './components/Tributes';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

// ScrollToTop component to ensure navigation starts at top of page
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Wrapper for pages to apply consistent padding and layout
const PageWrapper: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  return (
    <div className={`relative pt-24 md:pt-32 pb-12 min-h-[80vh] ${className}`}>
      {children}
    </div>
  );
};

const HomePage: React.FC = () => {
  return (
    <>
      <section id="hero" className="relative min-h-screen pt-24 md:pt-32 flex flex-col justify-center overflow-hidden">
        <Hero />
      </section>
      <section className="relative py-12 md:py-24">
        <JusticeDemand />
      </section>
    </>
  );
};

import { useSystemIntegrity } from './hooks/useSystemIntegrity';

const AppContent: React.FC = () => {
  const { language } = useLanguage();
  const { isCompromised } = useSystemIntegrity();

  if (isCompromised) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-red-600 font-mono p-8 text-center selection:bg-red-900 selection:text-white">
        <div className="max-w-md border border-red-900/50 bg-red-900/10 p-8 rounded-lg shadow-[0_0_50px_rgba(220,38,38,0.2)]">
          <h1 className="text-4xl font-bold mb-6 tracking-wider">SYSTEM LOCKED</h1>
          <div className="w-16 h-1 bg-red-600 mx-auto mb-6"></div>
          <p className="text-sm leading-relaxed text-red-400">
            Security Violation Detected.
            <br /><br />
            Unauthorized modification of core system values (Developer Credits) has triggered a mandatory lockdown.
            <br /><br />
            <span className="text-xs opacity-70">Error Code: INTEGRITY_CHECK_FAILED</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative min-h-screen bg-deep-900 text-gray-100 selection:bg-crimson selection:text-white overflow-hidden ${language === 'bn' ? 'font-bengali' : 'font-sans'}`}>
      <HashRouter>
        <ScrollToTop />
        <Navigation />

        <main className="relative z-10 container mx-auto px-4 md:px-6 flex flex-col gap-0 pb-0">
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/biography" element={
              <PageWrapper>
                <Biography />
              </PageWrapper>
            } />

            <Route path="/documents" element={
              <PageWrapper className="bg-deep-800/10 rounded-3xl mt-6">
                <Documents />
              </PageWrapper>
            } />

            <Route path="/gallery" element={
              <PageWrapper className="bg-deep-800/20 rounded-3xl mt-6">
                <Gallery />
              </PageWrapper>
            } />

            <Route path="/speeches" element={
              <PageWrapper>
                <Speeches />
              </PageWrapper>
            } />

            <Route path="/timeline" element={
              <PageWrapper className="bg-deep-800/30 rounded-3xl mt-6">
                <Timeline />
              </PageWrapper>
            } />

            <Route path="/works" element={
              <PageWrapper>
                <Poetry />
              </PageWrapper>
            } />

            <Route path="/tributes" element={
              <PageWrapper className="bg-deep-800/20 rounded-3xl mt-6">
                <Tributes />
              </PageWrapper>
            } />

            {/* Catch-all route to redirect unknown paths to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </HashRouter>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}