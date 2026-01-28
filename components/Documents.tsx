import React from 'react';
import { FileText, Newspaper, Shield, ExternalLink, Download } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Documents: React.FC = () => {
  const { t, language } = useLanguage();
  const isBengali = language === 'bn';

  const documents = [
    {
      type: 'statement',
      title: isBengali ? 'ইনকিলাব মঞ্চের ঘোষণাপত্র' : 'Manifesto of Inqilab Moncho',
      date: 'Aug 13, 2024',
      size: '2.4 MB',
      icon: <Shield size={20} className="text-crimson" />
    },
    {
      type: 'press',
      title: isBengali ? 'প্রথম আলো: হাদির মানচিত্র বিতর্ক' : 'Prothom Alo: Hadi\'s Map Controversy',
      date: 'July 22, 2025',
      size: '1.1 MB',
      icon: <Newspaper size={20} className="text-gray-400" />
    },
    {
      type: 'legal',
      title: isBengali ? 'নির্বাচন কমিশন: ঢাকা-৮ প্রার্থিতা' : 'EC Filing: Dhaka-8 Candidacy',
      date: 'Nov 05, 2025',
      size: '850 KB',
      icon: <FileText size={20} className="text-gray-400" />
    },
    {
      type: 'press',
      title: isBengali ? 'ডেইলি স্টার সম্পাদকীয়: আধিপত্যবাদ' : 'Daily Star Op-Ed: On Hegemony',
      date: 'Sep 10, 2024',
      size: '1.8 MB',
      icon: <Newspaper size={20} className="text-gray-400" />
    }
  ];

  return (
    <div className="relative z-10">
      <div className="text-center mb-16">
        <h2 className={`text-4xl md:text-5xl font-bold mb-4 text-white ${isBengali ? 'font-bengali' : 'font-display uppercase tracking-widest'}`}>
          {t('docs.title')}
        </h2>
        <div className="h-1 w-16 bg-crimson mx-auto rounded-full mb-4"></div>
        <p className="text-gray-400 max-w-lg mx-auto">{t('docs.desc')}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {documents.map((doc, idx) => (
          <div key={idx} className="group flex items-center gap-6 p-6 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-crimson/30 rounded-xl transition-all duration-300">
            <div className="h-16 w-16 rounded-lg bg-black/40 flex items-center justify-center shrink-0 border border-white/5 group-hover:border-crimson/20 transition-colors">
              {doc.icon}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-crimson">
                  {doc.type === 'statement' && t('docs.type.statement')}
                  {doc.type === 'press' && t('docs.type.press')}
                  {doc.type === 'legal' && t('docs.type.legal')}
                </span>
                <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                <span className="text-xs text-gray-500">{doc.date}</span>
              </div>
              <h3 className={`text-lg font-bold text-gray-200 truncate group-hover:text-white transition-colors ${isBengali ? 'font-bengali' : 'font-sans'}`}>
                {doc.title}
              </h3>
              <p className="text-xs text-gray-500 mt-1">{doc.size} • PDF Document</p>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 rounded-full hover:bg-crimson hover:text-white text-gray-400 transition-colors" title="View">
                <ExternalLink size={18} />
              </button>
              <button className="p-2 rounded-full hover:bg-crimson hover:text-white text-gray-400 transition-colors" title="Download">
                <Download size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Documents;