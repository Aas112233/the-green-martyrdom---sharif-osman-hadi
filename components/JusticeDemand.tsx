import React, { useState, useEffect, useRef } from 'react';
import { Download, Share2, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import html2canvas from 'html2canvas';

const JusticeDemand: React.FC = () => {
  const { t, language } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isGenerating, setIsGenerating] = useState(false);
  const isBengali = language === 'bn';

  useEffect(() => {
    // Event timestamp (Dec 12, 2025)
    const incidentTime = new Date('2025-12-12T00:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = now - incidentTime;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleDownload = async () => {
    if (cardRef.current && !isGenerating) {
      setIsGenerating(true);
      try {
        const element = cardRef.current;
        const canvas = await html2canvas(element, {
          backgroundColor: null,
          scale: 3,
          useCORS: true,
          logging: false,
          onclone: (clonedDoc) => {
            const clonedElement = clonedDoc.querySelector('[data-card-root]') as HTMLElement;
            if (clonedElement) {
              clonedElement.style.padding = '3rem';
              if (window.innerWidth < 768) {
                clonedElement.style.minWidth = '600px';
              }
            }
          }
        });

        const link = document.createElement('a');
        link.download = `Justice-for-Hadi-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      } catch (error) {
        console.error('Failed to generate image', error);
      } finally {
        setIsGenerating(false);
      }
    }
  };

  return (
    <div className="py-12 flex flex-col items-center justify-center px-4">
      {/* Downloadable Card Area */}
      <div
        ref={cardRef}
        data-card-root
        className="relative overflow-hidden w-full max-w-3xl bg-gradient-to-br from-[#1a0505] via-[#2a0a0a] to-[#0f0202] border border-crimson/50 rounded-2xl p-8 md:p-12 shadow-[0_0_50px_rgba(224,60,49,0.2)]"
      >
        <div className="absolute top-0 right-0 w-40 h-40 bg-crimson/10 blur-[60px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-crimson/10 blur-[60px] rounded-full pointer-events-none"></div>

        <div className="relative z-10 text-center space-y-8">

          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-crimson/10 border border-crimson/30 text-crimson animate-pulse">
              <Clock size={16} />
              <span className="text-xs font-bold tracking-widest uppercase font-sans">{t('justice.title')}</span>
            </div>

            <h3 className={`text-3xl md:text-5xl font-bold text-white leading-tight max-w-xl mx-auto ${isBengali ? 'font-bengali' : 'font-serif'}`}>
              {t('justice.subtitle')}
            </h3>
          </div>

          {/* Counter Grid */}
          <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[
              { label: t('justice.days'), value: timeLeft.days },
              { label: t('justice.hours'), value: timeLeft.hours },
              { label: t('justice.mins'), value: timeLeft.minutes },
              { label: t('justice.secs'), value: timeLeft.seconds },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center bg-black/40 border border-white/10 rounded-xl p-4 md:p-6 backdrop-blur-sm shadow-inner group hover:border-crimson/30 transition-colors"
              >
                <span className={`block text-3xl md:text-5xl font-bold text-crimson tabular-nums leading-none mb-2 ${isBengali ? 'font-bengali' : 'font-display'}`}>
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-[0.2em] font-sans">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-3 text-gray-500 text-sm font-medium pt-4 font-sans">
            <span className="text-crimson/80">#JusticeForHadi</span>
            <span className="w-1 h-1 rounded-full bg-gray-600"></span>
            <span>#InqilabMoncho</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-10 text-center space-y-4">
        <button
          onClick={handleDownload}
          disabled={isGenerating}
          className="group flex items-center gap-3 px-8 py-4 bg-crimson hover:bg-red-700 text-white rounded-full font-bold tracking-wide transition-all shadow-[0_0_20px_rgba(224,60,49,0.3)] hover:shadow-[0_0_30px_rgba(224,60,49,0.5)] hover:-translate-y-1 mx-auto disabled:opacity-70 disabled:cursor-not-allowed font-sans"
        >
          {isGenerating ? (
            <span className="animate-pulse">Generating...</span>
          ) : (
            <>
              <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {t('justice.download')}
            </>
          )}
        </button>

        <div className="flex items-center justify-center gap-2 text-gray-400 text-sm font-sans">
          <Share2 size={14} />
          <span>{t('justice.share')}</span>
        </div>
      </div>
    </div>
  );
};

export default JusticeDemand;