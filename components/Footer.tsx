import React from 'react';
import { Twitter, Facebook, Instagram, Heart, Code, Users, Send } from 'lucide-react';
import { FooterRipples } from './BackgroundEffects';
import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer id="footer" className="relative mt-0 border-t border-white/5 bg-[#050505] overflow-hidden">
      <FooterRipples />

      <div className="relative z-10 container mx-auto px-6 pt-20 pb-10">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 border-b border-white/5 pb-16">

          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-crimson rounded-lg flex items-center justify-center">
                <span className="font-display text-2xl font-bold text-white">OH</span>
              </div>
              <div>
                <h4 className="font-playfair text-xl font-bold text-white leading-none">{t('footer.title')}</h4>
                <p className="text-[10px] text-crimson uppercase tracking-widest mt-1">1993 - 2025</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              {t('footer.description')}
            </p>
            <div className="flex gap-4">
              {[Twitter, Facebook, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-crimson hover:text-white hover:border-crimson transition-all duration-300">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">

            <div className="space-y-4">
              <h5 className="text-white font-bold uppercase tracking-wider text-sm">{t('footer.col.media')}</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                {['videos', 'photos', 'audios', 'speeches'].map(k => (
                  <li key={k}><a href="#" className="hover:text-crimson transition-colors">{t(`footer.link.${k}`)}</a></li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h5 className="text-white font-bold uppercase tracking-wider text-sm">{t('footer.col.writings')}</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                {['poems', 'quotes', 'writings'].map(k => (
                  <li key={k}><a href="#" className="hover:text-crimson transition-colors">{t(`footer.link.${k}`)}</a></li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h5 className="text-white font-bold uppercase tracking-wider text-sm">{t('footer.col.explore')}</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                {['biography', 'timeline', 'events', 'locations', 'tributes', 'news'].map(k => (
                  <li key={k}><a href="#" className="hover:text-crimson transition-colors">{t(`footer.link.${k}`)}</a></li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h5 className="text-white font-bold uppercase tracking-wider text-sm">{t('footer.col.contact')}</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                {['documents', 'social', 'requests'].map(k => (
                  <li key={k}><a href="#" className="hover:text-crimson transition-colors">{t(`footer.link.${k}`)}</a></li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
          <div className="bg-gradient-to-r from-crimson/10 to-transparent border border-crimson/20 rounded-2xl p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Heart size={100} />
            </div>
            <h3 className="text-2xl font-playfair font-bold text-white mb-2">{t('footer.tribute.title')}</h3>
            <p className="text-gray-400 mb-6 max-w-sm">{t('footer.tribute.subtitle')}</p>
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-crimson text-white rounded-lg font-bold hover:bg-white hover:text-crimson transition-all cursor-pointer">
              {t('footer.tribute.btn')} <Send size={16} />
            </button>

          </div>

          <div className="flex flex-col gap-6 md:pl-12">
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                <Code size={24} />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">{t('footer.dev.by')}</p>
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold text-lg">{t('footer.dev.name')}</span>
                  <a href="https://www.facebook.com/share/17wLMBYMJY/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors" title="Facebook"><Facebook size={16} /></a>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform">
                <Users size={24} />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">{t('footer.collab.by')}</p>
                <span className="text-white font-bold text-lg">{t('footer.collab.name')}</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/5 text-xs text-gray-500">
        <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
          <span>&copy; 2025 {t('footer.rights.name')} • {t('footer.rights')}</span>
          <span className="hidden md:block w-1 h-1 bg-gray-700 rounded-full"></span>
          <span className="flex items-center gap-2 text-gray-300">
            {t('footer.in_memory')} <span className="animate-pulse">🕊️</span>
          </span>
        </div>

        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-white transition-colors">{t('footer.legal.privacy')}</a>
          <a href="#" className="hover:text-white transition-colors">{t('footer.legal.terms')}</a>
          <a href="#" className="hover:text-white transition-colors">{t('footer.legal.dev')}</a>
        </div>
      </div>

    </footer>
  );
}