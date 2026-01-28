import React, { useState } from 'react';
import { Video, Mic, Play } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Speeches: React.FC = () => {
  const { t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);

  const playlist = [
    { title: "Demand for National Government", duration: "14:20", date: "Oct 2025" },
    { title: "Press Briefing at DRU", duration: "08:45", date: "Nov 2025" },
    { title: "The Final Campaign Speech", duration: "22:10", date: "Dec 10, 2025" },
  ];

  const featuredVideoId = "1eiYFRNWkv8";

  return (
    <div className="relative z-10">
      <div className="text-center mb-16">
        <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4 text-white">{t('speeches.title')}</h2>
        <div className="h-1 w-16 bg-crimson mx-auto rounded-full"></div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Feature */}
        <div className="lg:col-span-2">
           <div className="relative aspect-video bg-black rounded-xl overflow-hidden border border-white/10 shadow-2xl group">
              {!isPlaying ? (
                <button 
                  onClick={() => setIsPlaying(true)}
                  className="w-full h-full relative block cursor-pointer group"
                  aria-label="Play Featured Speech"
                >
                  {/* Thumbnail Image as Background */}
                  <img 
                    src={`https://img.youtube.com/vi/${featuredVideoId}/maxresdefault.jpg`} 
                    alt="Speech Thumbnail" 
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-75 transition-opacity duration-500 scale-105 group-hover:scale-100 transform"
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-900/90 via-deep-900/20 to-transparent"></div>
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                    <div className="w-20 h-20 bg-crimson/90 rounded-full flex items-center justify-center text-white shadow-[0_0_30px_rgba(224,60,49,0.5)] group-hover:scale-110 group-hover:bg-crimson transition-all duration-300 backdrop-blur-sm border border-white/20">
                        <Play size={32} className="fill-current ml-1" />
                    </div>
                    <div className="mt-4 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                        <span className="text-xs font-bold uppercase tracking-wider text-white">Play Video</span>
                    </div>
                  </div>

                  {/* Bottom Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-left">
                     <div className="inline-flex items-center gap-2 px-3 py-1 bg-crimson text-white text-[10px] font-bold uppercase tracking-widest rounded mb-3">
                        Featured Address
                     </div>
                  </div>
                </button>
              ) : (
                <iframe 
                  width="100%" 
                  height="100%" 
                  src={`https://www.youtube.com/embed/${featuredVideoId}?autoplay=1&rel=0`} 
                  title="Sharif Osman Hadi Speech" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              )}
           </div>
           
           <h3 className="text-2xl font-playfair font-bold text-white mt-4">"Sovereignty cannot be compromised" - Address at Shahbag</h3>
           <p className="text-gray-400 mt-2">August 25, 2025 • A defining moment in the anti-hegemony movement.</p>
        </div>

        {/* Playlist */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 h-full backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6">
            <Mic className="text-crimson" size={20} />
            <h4 className="text-xl font-bold text-white">{t('speeches.recent')}</h4>
          </div>
          
          <div className="space-y-4">
            {playlist.map((item, idx) => (
              <div key={idx} className="group flex items-start gap-4 p-4 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 transition-all cursor-pointer">
                <div className="w-12 h-12 rounded bg-gray-800 flex items-center justify-center shrink-0 border border-white/5 group-hover:border-crimson/50 transition-colors">
                  <Video size={16} className="text-gray-400 group-hover:text-crimson" />
                </div>
                <div>
                  <h5 className="text-gray-200 font-medium leading-tight group-hover:text-white transition-colors">{item.title}</h5>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                    <span>{item.date}</span>
                    <span>•</span>
                    <span>{item.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-6 py-3 border border-white/20 hover:bg-crimson hover:border-crimson text-sm font-bold text-white uppercase tracking-widest transition-all rounded-lg">
             View All Archive
          </button>
        </div>
      </div>
    </div>
  );
};

export default Speeches;