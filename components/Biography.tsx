import React from 'react';
import { BookOpen, GraduationCap, Globe, User, Briefcase, MapPin, Heart, AlertTriangle, ShieldAlert } from 'lucide-react';
import { BioSmoke } from './BackgroundEffects';
import { useLanguage } from '../contexts/LanguageContext';

const Biography: React.FC = () => {
  const { t } = useLanguage();

  return (
    <>
      <BioSmoke />
      <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-start">
        {/* Bio Text */}
        <div className="lg:col-span-8 space-y-12 text-gray-300 leading-relaxed">
          {/* Intro */}
          <div className="space-y-6 border-b border-white/5 pb-8">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6">{t('bio.title')}</h2>
            <p className="text-lg">
              {t('bio.intro')}
            </p>
            <p>
              {t('bio.intro.2')}
            </p>
          </div>

          {/* Early Life */}
          <div className="space-y-4">
            <h3 className="font-playfair text-2xl font-bold text-white flex items-center gap-3">
              <span className="w-8 h-[1px] bg-crimson"></span> {t('bio.early_life')}
            </h3>
            <p>{t('bio.early_life.text')}</p>
            <div className="grid md:grid-cols-2 gap-4 mt-2">
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg flex gap-3">
                 <BookOpen size={20} className="text-crimson mt-1 shrink-0"/> 
                 <div>
                   <h4 className="text-white font-bold text-sm">{t('bio.education.early')}</h4>
                   <p className="text-sm text-gray-400">{t('bio.education.early.val')}</p>
                 </div>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg flex gap-3">
                 <GraduationCap size={20} className="text-crimson mt-1 shrink-0"/> 
                 <div>
                   <h4 className="text-white font-bold text-sm">{t('bio.education.higher')}</h4>
                   <p className="text-sm text-gray-400">{t('bio.education.higher.val')}</p>
                 </div>
              </div>
            </div>
            <p className="text-sm mt-2">{t('bio.career')}</p>
          </div>

          {/* Activism & Politics */}
          <div className="space-y-4">
            <h3 className="font-playfair text-2xl font-bold text-white flex items-center gap-3">
               <span className="w-8 h-[1px] bg-crimson"></span> {t('bio.politics')}
            </h3>
            <div className="pl-4 border-l-2 border-white/10 space-y-4">
              <div>
                <h4 className="text-white font-bold text-lg mb-1">{t('bio.politics.july')}</h4>
                <p>{t('bio.politics.july.text')}</p>
              </div>
              <div>
                <h4 className="text-white font-bold text-lg mb-1">{t('bio.politics.inqilab')}</h4>
                <p>{t('bio.politics.inqilab.text')}</p>
              </div>
              <div>
                <h4 className="text-white font-bold text-lg mb-1">{t('bio.politics.stance')}</h4>
                <p>{t('bio.politics.stance.text')}</p>
              </div>
            </div>
          </div>

          {/* Controversy */}
          <div className="space-y-4 bg-white/5 p-6 rounded-xl border border-white/10">
            <h3 className="font-playfair text-xl font-bold text-white flex items-center gap-3">
               <AlertTriangle size={20} className="text-yellow-500" /> {t('bio.controversy')}
            </h3>
            <p className="text-sm">
              {t('bio.controversy.text')}
            </p>
          </div>

          {/* Assassination */}
          <div className="space-y-4">
            <h3 className="font-playfair text-2xl font-bold text-white flex items-center gap-3">
               <span className="w-8 h-[1px] bg-crimson"></span> {t('bio.assassination')}
            </h3>
            <p>
              {t('bio.assassination.text')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-400 marker:text-crimson">
              <li><strong>{t('bio.assassination.medical')}:</strong> {t('bio.assassination.medical.text')}</li>
              <li><strong>{t('bio.assassination.transfer')}:</strong> {t('bio.assassination.transfer.text')}</li>
              <li><strong>{t('bio.assassination.death')}:</strong> {t('bio.assassination.death.text')}</li>
            </ul>
            <div className="bg-crimson/10 border border-crimson/20 p-4 rounded-lg mt-4">
              <p className="text-crimson text-sm font-bold flex items-center gap-2">
                <ShieldAlert size={16}/> {t('bio.investigation')}
              </p>
              <p className="text-sm mt-1">{t('bio.investigation.text')}</p>
            </div>
          </div>

          {/* Aftermath */}
          <div className="space-y-4">
            <h3 className="font-playfair text-2xl font-bold text-white flex items-center gap-3">
               <span className="w-8 h-[1px] bg-crimson"></span> {t('bio.aftermath')}
            </h3>
            <p>
              {t('bio.aftermath.text')}
            </p>
            <p>
              {t('bio.aftermath.funeral')}
            </p>
          </div>
        </div>

        {/* Quick Facts / Stats Sidebox */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
          <div className="bg-deep-800/80 border border-white/10 rounded-xl overflow-hidden backdrop-blur-md shadow-2xl">
            <div className="bg-crimson/10 border-b border-crimson/20 p-5 text-center">
              <h3 className="font-playfair font-bold text-2xl text-white">{t('hero.title.prefix')} {t('hero.title.suffix')}</h3>
              <p className="text-xs text-crimson font-bold tracking-widest uppercase mt-2">{t('hero.dates')}</p>
            </div>
            
            <div className="p-6 flex justify-center border-b border-white/5 bg-black/20">
               <div className="w-40 h-48 bg-gray-800 rounded-lg overflow-hidden border border-white/10 relative shadow-inner">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Osman_Hadi.jpg/960px-Osman_Hadi.jpg" className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-500" alt="Sharif Osman Hadi" />
               </div>
            </div>

            <div className="divide-y divide-white/5 text-sm">
              <div className="p-4 hover:bg-white/5 transition-colors">
                <span className="text-gray-500 font-bold uppercase text-xs block mb-1">{t('stats.native_name')}</span>
                <span className="text-gray-200 font-playfair">ওসমান হাদি</span>
              </div>
              <div className="p-4 hover:bg-white/5 transition-colors">
                <span className="text-gray-500 font-bold uppercase text-xs block mb-1 flex items-center gap-2"><User size={12}/> {t('stats.born')}</span>
                <span className="text-gray-200">30 June 1993<br/><span className="text-gray-400 text-xs">Nalchity, Jhalokathi, Bangladesh</span></span>
              </div>
              <div className="p-4 hover:bg-white/5 transition-colors">
                <span className="text-gray-500 font-bold uppercase text-xs block mb-1 flex items-center gap-2"><Heart size={12}/> {t('stats.died')}</span>
                <span className="text-gray-200">18 December 2025 (aged 32)<br/><span className="text-gray-400 text-xs">Singapore General Hospital</span></span>
              </div>
              <div className="p-4 hover:bg-white/5 transition-colors">
                <span className="text-gray-500 font-bold uppercase text-xs block mb-1 flex items-center gap-2"><Briefcase size={12}/> {t('stats.profession')}</span>
                <span className="text-gray-200">Lecturer, University of Scholars</span>
              </div>
              <div className="p-4 hover:bg-white/5 transition-colors">
                <span className="text-gray-500 font-bold uppercase text-xs block mb-1">{t('stats.party')}</span>
                <span className="text-gray-200">Independent / Inqilab Moncho</span>
              </div>
              <div className="p-4 hover:bg-white/5 transition-colors">
                <span className="text-gray-500 font-bold uppercase text-xs block mb-1 flex items-center gap-2"><MapPin size={12}/> {t('stats.resting')}</span>
                <span className="text-gray-200">Mausoleum of Kazi Nazrul Islam, Dhaka</span>
              </div>
            </div>
            
            <div className="p-4 bg-white/5 border-t border-white/10 text-center">
              <a href="https://en.wikipedia.org/wiki/Osman_Hadi" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-crimson hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
                <Globe size={14} /> {t('stats.wiki')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Biography;