import React, { useState, useEffect } from 'react';
import { Flame, Send, MapPin, Calendar, Heart, MessageSquare } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Tribute {
    id: string;
    name: string;
    message: string;
    location?: string;
    date: string;
    isCandle?: boolean;
}

const Tributes: React.FC = () => {
    const { t, language } = useLanguage();
    const [tributes, setTributes] = useState<Tribute[]>([]);
    const [candleCount, setCandleCount] = useState(0);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [location, setLocation] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hasLitCandle, setHasLitCandle] = useState(false);

    useEffect(() => {
        const storedTributes = localStorage.getItem('hadi_tributes_v1');
        const storedCandles = localStorage.getItem('hadi_candle_count');
        const userHasLit = localStorage.getItem('hadi_user_lit_candle');

        const seedData: Tribute[] = [
            {
                id: 'seed-1',
                name: 'Rohit',
                message: 'Your voice will echo through generations. We will not forget.',
                location: 'Dhaka',
                date: new Date('2025-12-25T10:00:00').toISOString()
            },
            {
                id: 'seed-2',
                name: 'Sarah Rahman',
                message: 'Inna lillahi wa inna ilayhi raji\'un. A true hero of the soil.',
                location: 'Chittagong',
                date: new Date('2025-12-26T14:30:00').toISOString()
            }
        ];

        if (storedTributes) {
            setTributes(JSON.parse(storedTributes));
        } else {
            setTributes(seedData);
        }

        if (storedCandles) {
            setCandleCount(parseInt(storedCandles));
        } else {
            setCandleCount(142); // Initial seed count
        }

        if (userHasLit) {
            setHasLitCandle(true);
        }
    }, []);

    const handleLightCandle = () => {
        if (hasLitCandle) return;

        const newCount = candleCount + 1;
        setCandleCount(newCount);
        setHasLitCandle(true);
        localStorage.setItem('hadi_candle_count', newCount.toString());
        localStorage.setItem('hadi_user_lit_candle', 'true');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim() || !name.trim()) return;

        setIsSubmitting(true);

        const newTribute: Tribute = {
            id: Date.now().toString(),
            name,
            message,
            location,
            date: new Date().toISOString(),
        };

        const updatedTributes = [newTribute, ...tributes];
        setTributes(updatedTributes);
        localStorage.setItem('hadi_tributes_v1', JSON.stringify(updatedTributes));

        // Reset form
        setName('');
        setMessage('');
        setLocation('');
        setIsSubmitting(false);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        if (language === 'bn') {
            return date.toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' });
        }
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    return (
        <div className="relative z-10 space-y-16">

            <div className="text-center space-y-6">
                <h2 className="font-playfair text-4xl md:text-6xl font-bold text-white">
                    {language === 'bn' ? 'শ্রদ্ধাঞ্জলি' : 'Tributes via Light'}
                </h2>

                <p className="text-gray-400 max-w-xl mx-auto text-lg">
                    {language === 'bn'
                        ? 'শহীদ উসমান হাদীর স্মরণে একটি প্রদীপ জ্বালান এবং আপনার শ্রদ্ধাঞ্জলি জানান।'
                        : 'Light a candle to honor the memory of Shaheed Osman Hadi and leave your message for the world to see.'}
                </p>

                <div className="flex flex-col items-center justify-center gap-4 py-8">
                    <button
                        onClick={handleLightCandle}
                        disabled={hasLitCandle}
                        className={`relative group transition-all duration-500 ${hasLitCandle ? 'cursor-default' : 'cursor-pointer hover:scale-110'}`}
                    >
                        <div className={`absolute inset-0 bg-crimson/20 blur-[40px] rounded-full transition-opacity duration-1000 ${hasLitCandle ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'}`}></div>
                        <Flame
                            size={80}
                            className={`
                        transition-all duration-700 
                        ${hasLitCandle ? 'text-crimson animate-pulse fill-crimson' : 'text-gray-600 group-hover:text-crimson/50'}
                    `}
                            strokeWidth={1}
                        />
                    </button>
                    <div className="text-center">
                        <span className="text-3xl font-bold text-white block">{candleCount}</span>
                        <span className="text-xs text-gray-500 uppercase tracking-widest">
                            {language === 'bn' ? 'প্রদীপ প্রজ্বলিত' : 'Candles Lit'}
                        </span>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto px-4">

                <div className="md:col-span-1">
                    <div className="sticky top-24 bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-2xl shadow-xl">
                        <div className="flex items-center gap-3 mb-6">
                            <MessageSquare className="text-crimson" size={24} />
                            <h3 className="text-2xl font-bold text-white">
                                {language === 'bn' ? 'বার্তা লিখুন' : 'Leave a Tribute'}
                            </h3>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                                    {language === 'bn' ? 'নাম' : 'Your Name'}
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-crimson focus:outline-none transition-colors"
                                    placeholder={language === 'bn' ? 'আপনার নাম' : 'Enter your name'}
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                                    {language === 'bn' ? 'অবস্থান' : 'Location (Optional)'}
                                </label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3.5 text-gray-500" size={16} />
                                    <input
                                        type="text"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white focus:border-crimson focus:outline-none transition-colors"
                                        placeholder={language === 'bn' ? 'ঢাকা, বাংলাদেশ' : 'Dhaka, Bangladesh'}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                                    {language === 'bn' ? 'বার্তা' : 'Message'}
                                </label>
                                <textarea
                                    required
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-crimson focus:outline-none transition-colors h-32 resize-none"
                                    placeholder={language === 'bn' ? 'শহীদ হাদীর স্মরণে...' : 'Share your thoughts...'}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-crimson hover:bg-red-700 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-crimson/20 transition-all flex items-center justify-center gap-2 group"
                            >
                                <span>{language === 'bn' ? 'জমা দিন' : 'Post Tribute'}</span>
                                <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    </div>
                </div>

                <div className="md:col-span-2">
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6 border-b border-white/10 pb-4">
                        {language === 'bn' ? 'সকল বার্তা' : 'Recent Tributes'}
                    </h3>



                    <div className="columns-1 md:columns-2 gap-6 space-y-6">
                        {tributes.map((tribute) => (
                            <div
                                key={tribute.id}
                                className="break-inside-avoid bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-6 transition-all duration-300 hover:border-crimson/30 hover:shadow-lg hover:shadow-crimson/5 group animate-fadeIn"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-crimson to-deep-900 flex items-center justify-center text-white font-bold text-sm">
                                            {tribute.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-200 text-sm">{tribute.name}</h4>
                                            {tribute.location && (
                                                <p className="text-[10px] text-gray-500 flex items-center gap-1">
                                                    <MapPin size={8} /> {tribute.location}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <Flame size={14} className="text-crimson/40 group-hover:text-crimson transition-colors" />
                                </div>

                                <p className="text-gray-300 text-sm leading-relaxed font-serif italic mb-4">
                                    "{tribute.message}"
                                </p>

                                <div className="flex items-center justify-between text-[10px] text-gray-600 border-t border-white/5 pt-3">
                                    <span className="flex items-center gap-1">
                                        <Calendar size={10} />
                                        {formatDate(tribute.date)}
                                    </span>
                                    <span className="group-hover:text-crimson transition-colors flex items-center gap-1 cursor-pointer">
                                        <Heart size={10} /> Like
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {tributes.length === 0 && (
                        <div className="text-center py-20 text-gray-500">
                            <p>{language === 'bn' ? 'এখনও কোন বার্তা নেই। প্রথম বার্তাটি দিন।' : 'No tributes yet. Be the first to light a candle.'}</p>
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
};

export default Tributes;
