import React from 'react';
import { Quote, Book, Pen, ArrowRight, Feather } from 'lucide-react';
import { WorksLava } from './BackgroundEffects';
import { useLanguage } from '../contexts/LanguageContext';

const Poetry: React.FC = () => {
  const { t } = useLanguage();

  return (
    <>
      <WorksLava />
      <div className="relative z-10 py-12">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4 text-white">{t('works.title')}</h2>
          <div className="h-1 w-16 bg-crimson mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Featured Quote Card */}
          <div className="relative w-full">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-crimson/10 rounded-full blur-3xl opacity-50"></div>
            
            <div className="h-full relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl overflow-hidden flex flex-col justify-center">
               <div className="absolute inset-0 opacity-5 pointer-events-none" 
                 style={{ 
                   backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', 
                   backgroundSize: '32px 32px' 
                 }}>
              </div>
              
              <div className="relative z-10 text-center">
                <div className="mb-6 text-crimson opacity-80 flex justify-center">
                  <Quote size={40} className="rotate-180 fill-current" />
                </div>
                <h3 className="text-xl md:text-2xl font-playfair italic text-white/90 mb-6 leading-loose tracking-wide whitespace-pre-line">
                  {t('works.quote')}
                </h3>
                <div className="w-12 h-1 bg-crimson/50 rounded-full mx-auto mb-4"></div>
                <p className="text-sm text-gray-400">{t('works.pen_name')} <span className="text-white font-bold">Shimanto Sharif</span> (সীমান্ত শরিফ)</p>
              </div>
            </div>
          </div>

          {/* Bibliography List */}
          <div className="space-y-4">
            <div className="group bg-deep-800/50 border border-crimson/30 p-6 rounded-xl hover:bg-white/5 transition-all duration-300 relative overflow-hidden backdrop-blur-md">
               <div className="absolute top-0 right-0 p-2 bg-crimson text-white text-xs font-bold uppercase tracking-wider rounded-bl-xl">{t('works.key_pub')}</div>
               <div className="flex items-start gap-4">
                  <div className="p-3 bg-crimson/10 rounded-lg group-hover:bg-crimson/20 transition-colors">
                    <Book className="w-8 h-8 text-crimson" />
                  </div>
                  <div>
                    <h4 className="text-xl font-playfair font-bold text-white mb-1">{t('works.book_title')}</h4>
                    <p className="font-playfair text-gray-400 text-sm italic mb-2">"লাভায় লালশাক পুবের আকাশ"</p>
                    <p className="text-xs text-crimson mb-2 uppercase tracking-wide">{t('works.pub_info')}</p>
                    <p className="text-gray-400 text-sm leading-relaxed">
                       {t('works.book_desc')}
                    </p>
                  </div>
                </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-xl hover:border-white/20 transition-all backdrop-blur-md">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/5 rounded-lg">
                    <Feather className="w-6 h-6 text-gray-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-playfair font-bold text-white mb-1">{t('works.essays_title')}</h4>
                    <span className="text-xs uppercase tracking-widest text-gray-500 mb-2 block">{t('works.essays_sub')}</span>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {t('works.essays_desc')}
                    </p>
                  </div>
                </div>
            </div>

            <div className="bg-gradient-to-r from-crimson/20 to-deep-800 border border-crimson/20 p-6 rounded-xl mt-4 backdrop-blur-md">
               <div className="flex items-center gap-3 mb-2">
                 <Pen className="w-5 h-5 text-crimson" />
                 <h4 className="font-bold text-white">{t('works.archive_title')}</h4>
               </div>
               <p className="text-sm text-gray-300 mb-4">
                 {t('works.archive_desc')}
               </p>
               <button type="button" className="text-sm font-semibold text-crimson hover:text-white transition-colors uppercase tracking-wider flex items-center gap-2 cursor-pointer">
                 {t('works.view_archive')} <ArrowRight size={14} />
               </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Poetry;