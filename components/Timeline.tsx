import React from 'react';
import { Flag, Heart, Baby, BookOpen, Skull, MapPin, GraduationCap, Briefcase, Flame, Users, Mic, Landmark, Megaphone, HeartCrack, Scale, Plane } from 'lucide-react';
import { TimelineConstellation } from './BackgroundEffects';
import { useLanguage } from '../contexts/LanguageContext';

const Timeline: React.FC = () => {
  const { t, language } = useLanguage();
  const isBengali = language === 'bn';

  const events = [
    {
      year: '1993',
      date: 'June 30',
      title: t('timeline.born.title'),
      description: t('timeline.born.desc'),
      location: 'Nalchity, Jhalakathi',
      icon: <Baby className="w-5 h-5 text-white" />,
      highlight: false
    },
    {
      year: '2010',
      date: 'Jan 01',
      title: t('timeline.edu.secondary.title'),
      description: t('timeline.edu.secondary.desc'),
      location: 'Jhalakathi, Bangladesh',
      icon: <BookOpen className="w-5 h-5 text-white" />,
      highlight: false
    },
    {
      year: '2011',
      date: 'Jan 01',
      title: t('timeline.edu.uni.title'),
      description: t('timeline.edu.uni.desc'),
      location: 'University of Dhaka',
      icon: <GraduationCap className="w-5 h-5 text-white" />,
      highlight: false
    },
    {
      year: '2024',
      date: 'Jan 01',
      title: t('timeline.career.title'),
      description: t('timeline.career.desc'),
      location: 'Dhaka, Bangladesh',
      icon: <Briefcase className="w-5 h-5 text-white" />,
      highlight: false
    },
    {
      year: '2024',
      date: 'July 01',
      title: t('timeline.activism.july.title'),
      description: t('timeline.activism.july.desc'),
      location: 'Rampura, Dhaka',
      icon: <Flame className="w-5 h-5 text-crimson" />,
      highlight: true
    },
    {
      year: '2024',
      date: 'Aug 08',
      title: t('timeline.inqilab.form.title'),
      description: t('timeline.inqilab.form.desc'),
      location: null,
      icon: <Users className="w-5 h-5 text-white" />,
      highlight: false
    },
    {
      year: '2024',
      date: 'Aug 13',
      title: t('timeline.inqilab.role.title'),
      description: t('timeline.inqilab.role.desc'),
      location: 'Dhaka, Bangladesh',
      icon: <Mic className="w-5 h-5 text-crimson" />,
      highlight: false
    },
    {
      year: '2025',
      date: 'May 24',
      title: t('timeline.politics.govt.title'),
      description: t('timeline.politics.govt.desc'),
      location: 'University of Dhaka',
      icon: <Landmark className="w-5 h-5 text-white" />,
      highlight: false
    },
    {
      year: '2025',
      date: 'Sep 14',
      title: t('timeline.politics.campaign.title'),
      description: t('timeline.politics.campaign.desc'),
      location: null,
      icon: <Megaphone className="w-5 h-5 text-white" />,
      highlight: false
    },
    {
      year: '2025',
      date: 'Dec 12',
      title: t('timeline.assassination.title'),
      description: t('timeline.assassination.desc'),
      location: 'Paltan, Dhaka',
      icon: <Skull className="w-5 h-5 text-crimson" />,
      highlight: true
    },
    {
      year: '2025',
      date: 'Dec 13-15',
      title: t('timeline.medical.title'),
      description: t('timeline.medical.desc'),
      location: 'Dhaka to Singapore',
      icon: <Plane className="w-5 h-5 text-white" />,
      highlight: false
    },
    {
      year: '2025',
      date: 'Dec 18',
      title: t('timeline.death.title'),
      description: t('timeline.death.desc'),
      location: 'Singapore',
      icon: <HeartCrack className="w-5 h-5 text-crimson" />,
      highlight: true
    },
    {
      year: '2025',
      date: 'Dec 20',
      title: t('timeline.funeral.title'),
      description: t('timeline.funeral.desc'),
      location: 'Parliament Plaza',
      icon: <Flag className="w-5 h-5 text-white" />,
      highlight: false
    },
    {
      year: '2025',
      date: 'Dec 25',
      title: t('timeline.protests.title'),
      description: t('timeline.protests.desc'),
      location: 'Nationwide',
      icon: <Flame className="w-5 h-5 text-crimson" />,
      highlight: false
    },
    {
      year: '2026',
      date: 'Jan 15',
      title: t('timeline.foundation.title'),
      description: t('timeline.foundation.desc'),
      location: 'Dhaka',
      icon: <Heart className="w-5 h-5 text-white" />,
      highlight: false
    },
    {
      year: 'Today',
      date: 'Ongoing',
      title: t('timeline.justice_now.title'),
      description: t('timeline.justice_now.desc'),
      location: 'International Crimes Tribunal',
      icon: <Scale className="w-5 h-5 text-crimson" />,
      highlight: true
    }
  ];

  return (
    <>
      <TimelineConstellation />
      <div className="relative z-10">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 text-white ${isBengali ? 'font-bengali' : 'font-display'}`}>
             {t('timeline.title')}
          </h2>
          <p className="text-gray-400">{t('timeline.subtitle')}</p>
          <div className="h-1 w-16 bg-crimson mx-auto rounded-full mt-4"></div>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Central Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-white/20 to-transparent md:-translate-x-1/2"></div>

          <div className="space-y-12">
            {events.map((event, index) => (
              <div key={index} className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Spacer for desktop alignment */}
                <div className="hidden md:block w-1/2"></div>
                
                {/* Timeline Node */}
                <div className={`absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-4 flex items-center justify-center z-10 bg-deep-900 ${event.highlight ? 'border-crimson shadow-[0_0_15px_rgba(224,60,49,0.8)] scale-110' : 'border-gray-600'}`}>
                  <div className={`w-2.5 h-2.5 rounded-full ${event.highlight ? 'bg-crimson animate-pulse' : 'bg-gray-400'}`}></div>
                </div>

                {/* Content Card */}
                <div className="pl-12 md:pl-0 w-full md:w-1/2 md:px-8">
                  <div className={`
                    group relative p-6 rounded-xl border transition-all duration-300
                    ${event.highlight 
                      ? 'bg-crimson/5 border-crimson/40 shadow-[0_0_30px_rgba(224,60,49,0.1)] hover:bg-crimson/10' 
                      : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 shadow-xl'
                    }
                    backdrop-blur-xl
                  `}>
                    <div className="flex items-center justify-between mb-4">
                       <span className={`px-3 py-1 text-xs font-bold rounded-full border ${event.highlight ? 'bg-crimson/20 border-crimson text-crimson' : 'bg-white/10 border-white/20 text-gray-300'}`}>
                         {event.year}
                       </span>
                       <div className={`p-2 rounded-full border ${event.highlight ? 'bg-crimson/10 border-crimson/30' : 'bg-white/5 border-white/10'}`}>
                         {event.icon}
                       </div>
                    </div>
                    
                    <h3 className={`text-xl md:text-2xl font-bold mb-1 text-white group-hover:text-crimson transition-colors ${isBengali ? 'font-bengali' : 'font-display'}`}>
                      {event.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 mb-3">
                        <span className={`text-sm font-semibold ${event.highlight ? 'text-crimson' : 'text-gray-400'}`}>{event.date}</span>
                        {event.location && (
                           <>
                             <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                             <span className="text-xs text-gray-500 flex items-center gap-1"><MapPin size={10} /> {event.location}</span>
                           </>
                        )}
                    </div>
                    
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Timeline;