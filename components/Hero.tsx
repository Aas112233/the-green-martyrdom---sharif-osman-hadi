import React from 'react';
import { ArrowRight, Flame, Shield } from 'lucide-react';
import { HeroEmbers } from './BackgroundEffects';
import { useLanguage } from '../contexts/LanguageContext';

const Hero: React.FC = () => {
  const { t, language } = useLanguage();
  const isBengali = language === 'bn';
  const heroImage = "https://img.youtube.com/vi/1eiYFRNWkv8/maxresdefault.jpg";

  const scrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute inset-0 bg-deep-900/90 z-10"></div>
        <img
          src={heroImage}
          alt="Background"
          className="w-full h-full object-cover opacity-30 blur-sm scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-900 via-deep-900/80 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-deep-900 via-deep-900/80 to-transparent z-10"></div>
      </div>


      <HeroEmbers />

      <div className="grid md:grid-cols-2 gap-12 items-center min-h-[85vh] relative z-20">
        <div className="space-y-8 order-2 md:order-1 relative">
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-crimson/30 bg-crimson/10 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-crimson animate-pulse"></span>
              <span className="text-crimson text-xs md:text-sm font-bold tracking-widest uppercase font-sans">{t('hero.dates')}</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
              <Shield size={12} className="text-gray-400" />
              <span className="text-gray-300 text-xs md:text-sm font-medium tracking-wide font-sans">{t('hero.guardian')}</span>
            </div>
          </div>

          <h1 className={`text-5xl md:text-6xl lg:text-8xl font-bold leading-[1.05] text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-gray-400 drop-shadow-sm ${isBengali ? 'font-bengali' : 'font-display uppercase tracking-tight'}`}>
            {t('hero.title.prefix')} <br />
            <span className="text-crimson drop-shadow-[0_0_25px_rgba(224,60,49,0.4)]">{t('hero.title.suffix')}</span>
          </h1>

          <div className="h-1.5 w-32 bg-gradient-to-r from-crimson to-transparent rounded-full"></div>

          <h2 className={`text-xl md:text-2xl font-serif italic text-gray-200 leading-snug ${isBengali ? 'font-bengali not-italic' : ''}`}>
            {t('hero.subtitle.role')} <br />
            <span className="text-gray-400 text-lg not-italic font-sans">{t('hero.subtitle.candidate')}</span>
          </h2>

          <p className="text-lg text-gray-300 font-light leading-relaxed max-w-xl">
            {t('hero.description')}
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href="#biography"
              onClick={(e) => scrollTo(e, '#biography')}
              className="cursor-pointer group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-crimson to-[#B02820] text-white rounded-lg font-medium tracking-wide shadow-[0_0_20px_rgba(224,60,49,0.4)] hover:shadow-[0_0_35px_rgba(224,60,49,0.6)] hover:scale-105 transition-all duration-300 border border-white/10 font-sans"
            >
              <span>{t('hero.button.bio')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#works"
              onClick={(e) => scrollTo(e, '#works')}
              className="cursor-pointer group inline-flex items-center gap-3 px-8 py-4 bg-white/5 text-white rounded-lg font-medium tracking-wide hover:bg-white/10 border border-white/10 transition-all duration-300 font-sans"
            >
              <span>{t('hero.button.works')}</span>
            </a>
          </div>
        </div>

        <div className="order-1 md:order-2 flex justify-center md:justify-end relative">
          <div className="relative w-full max-w-md aspect-[4/5] rounded-2xl overflow-hidden group">

            <div className="absolute inset-0 bg-crimson/20 blur-3xl rounded-full scale-110 animate-pulse-slow -z-10 opacity-60"></div>

            <div className="absolute inset-0 border border-white/10 rounded-2xl z-20 pointer-events-none ring-1 ring-white/5"></div>

            <img
              src={heroImage}
              alt="Portrait of Osman Hadi"
              className="w-full h-full object-cover rounded-2xl opacity-90 transition-transform duration-700 group-hover:scale-105 filter grayscale contrast-125 sepia-[.1]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-deep-900 via-deep-900/20 to-transparent z-10"></div>

            <div className="absolute bottom-8 left-6 right-6 z-20">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-xl shadow-2xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-crimson/20 rounded-full">
                    <Flame className="text-crimson w-5 h-5 shrink-0" />
                  </div>
                  <div>
                    <p className={`text-sm italic text-gray-200 leading-relaxed ${isBengali ? 'font-bengali not-italic' : 'font-serif'}`}>{t('hero.quote')}</p>
                    <p className="text-xs text-crimson mt-2 uppercase tracking-wider font-bold font-sans">{t('hero.quote.author')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;