import React, { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.biography'), path: '/biography' },
    { name: t('nav.documents'), path: '/documents' },
    { name: t('nav.gallery'), path: '/gallery' },
    { name: t('nav.speeches'), path: '/speeches' },
    { name: t('nav.timeline'), path: '/timeline' },
    { name: t('nav.works'), path: '/works' },
    { name: language === 'bn' ? 'শ্রদ্ধাঞ্জলি' : 'Tributes', path: '/tributes' },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'bn' : 'en');
  };

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleLinkClick = (path: string) => {
    setIsOpen(false);
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const glassClass = "bg-deep-900/90 backdrop-blur-xl border-b border-white/10 shadow-lg";
  const transparentClass = "bg-transparent border-transparent py-6";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${scrolled || isOpen ? glassClass + ' py-4' : transparentClass}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center gap-2 group cursor-pointer"
          onClick={() => handleLinkClick('/')}
        >
          <div className="w-2 h-8 bg-crimson rounded-full group-hover:h-10 transition-all duration-300"></div>
          <span className="font-display text-xl md:text-2xl font-bold tracking-widest text-white">
            INQILAB <span className="text-gray-400">|</span> OSMAN HADI
          </span>
        </Link>

        <div className="hidden lg:flex gap-6 items-center">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => handleLinkClick(link.path)}
                className={`text-xs font-bold tracking-widest uppercase transition-colors duration-300 relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:h-[1px] after:bg-crimson after:transition-all after:duration-300 ${active ? 'text-crimson after:w-full' : 'text-gray-300 hover:text-crimson after:w-0 hover:after:w-full'} ${language === 'bn' ? 'font-bengali' : 'font-sans'}`}
              >
                {link.name}
              </Link>
            );
          })}

          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 hover:bg-white/10 transition-colors text-xs font-bold text-crimson ml-4"
            aria-label="Toggle Language"
          >
            <Globe size={14} />
            <span>{language === 'en' ? 'BN' : 'EN'}</span>
          </button>
        </div>

        <div className="flex items-center gap-4 lg:hidden">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-2 py-1 rounded border border-white/20 text-xs font-bold text-crimson"
          >
            {language === 'en' ? 'BN' : 'EN'}
          </button>

          <button
            className="text-white hover:text-crimson transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <div className={`lg:hidden absolute top-full left-0 w-full bg-deep-900/95 backdrop-blur-xl border-b border-white/10 overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[35rem] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="flex flex-col p-6 gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-lg text-gray-200 hover:text-crimson transition-colors cursor-pointer ${isActive(link.path) ? 'text-crimson pl-2 border-l-2 border-crimson' : ''} ${language === 'bn' ? 'font-bengali' : 'font-display uppercase'}`}
              onClick={() => handleLinkClick(link.path)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;