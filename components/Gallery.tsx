import React, { useState, useEffect, useRef } from 'react';
import { Maximize2, X, Loader2, Play, Filter, Image, Film, AlertCircle, ImageOff } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface GalleryItem {
  src: string;
  caption: string;
  type: 'image' | 'video';
}

import { d, encryptedVideoArgs, encryptedPhotoArgs } from '../config/secureMedia';

const rawVideoUrls = encryptedVideoArgs.map(d);
const rawPhotoUrls = encryptedPhotoArgs.map(d);

// Process video URLs
const videoItems: GalleryItem[] = rawVideoUrls.map((url, index) => {
  const secureUrl = url.replace(/^http:/, 'https:');

  return {
    src: secureUrl,
    caption: `Archive Footage ${index + 1}`,
    type: 'video'
  };
});

// Process photo URLs
const photoItems: GalleryItem[] = rawPhotoUrls.map((url, index) => {
  // Normalize HTTPS and ensure /api/uploads path if missing
  let secureUrl = url.replace(/^http:/, 'https:');
  if (secureUrl.includes('/uploads/') && !secureUrl.includes('/api/uploads/')) {
    secureUrl = secureUrl.replace('/uploads/', '/api/uploads/');
  }

  return {
    src: secureUrl,
    caption: `Archive Photo ${index + 1}`,
    type: 'image'
  };
});

// Interleave videos and photos (e.g. 1 video, then ~5 photos)
const fallbackItems: GalleryItem[] = [];
let vIdx = 0;
let pIdx = 0;

while (vIdx < videoItems.length || pIdx < photoItems.length) {
  if (vIdx < videoItems.length) {
    fallbackItems.push(videoItems[vIdx++]);
  }
  // Add up to 5 photos for every 1 video
  for (let i = 0; i < 5; i++) {
    if (pIdx < photoItems.length) {
      fallbackItems.push(photoItems[pIdx++]);
    }
  }
}

const VideoThumbnail: React.FC<{ src: string }> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleMouseEnter = () => {
    if (hasError) return;
    const video = videoRef.current;
    if (video) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          // Auto-play was prevented or other error, typically silent catch
        });
      }
    }
  };

  const handleMouseLeave = () => {
    if (hasError) return;
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0; // Reset preview
    }
  };

  if (hasError) {
    return (
      <div className="w-full h-64 bg-white/5 flex flex-col items-center justify-center p-6 text-center border-b border-white/5 transition-colors group-hover:bg-white/10">
        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4 backdrop-blur-sm shadow-inner ring-1 ring-white/5">
          <Film className="text-gray-500 group-hover:text-crimson transition-colors duration-500" size={32} />
        </div>
        <span className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Preview Unavailable</span>
        <span className="text-[10px] text-gray-600">Media source unreachable</span>
      </div>
    );
  }

  return (
    <div
      className="w-full h-full relative bg-deep-800"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {!loaded && <div className="absolute inset-0 bg-white/10 animate-pulse z-20" />}

      <video
        ref={videoRef}
        src={src}
        className={`w-full h-full object-cover grayscale group-hover:grayscale-0 transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        muted
        loop
        playsInline
        preload="metadata"
        onLoadedData={() => setLoaded(true)}
        onError={() => {
          setHasError(true);
          setLoaded(true);
        }}
      />
      {loaded && !hasError && (
        <div className="absolute top-4 right-4 bg-crimson/80 p-2 rounded-full z-20 opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none">
          <Play size={16} className="text-white fill-current" />
        </div>
      )}
    </div>
  );
};

const GalleryImage: React.FC<{ src: string; caption: string }> = ({ src, caption }) => {
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="w-full h-64 bg-white/5 flex flex-col items-center justify-center p-6 text-center border-b border-white/5 transition-colors group-hover:bg-white/10">
        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4 backdrop-blur-sm shadow-inner ring-1 ring-white/5">
          <ImageOff className="text-gray-500 group-hover:text-crimson transition-colors duration-500" size={32} />
        </div>
        <span className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Image Unavailable</span>
        <span className="text-[10px] text-gray-600">Media source unreachable</span>
      </div>
    );
  }

  return (
    <>
      {/* Skeleton */}
      {!loaded && (
        <div className="absolute inset-0 bg-white/10 animate-pulse z-20 h-64" />
      )}

      {/* Hover Overlay - Only show when loaded to avoid weird overlay on skeleton */}
      <div className={`absolute inset-0 bg-black/50 group-hover:bg-transparent transition-colors duration-500 z-10 ${loaded ? 'opacity-100' : 'opacity-0'}`}></div>

      <img
        src={src}
        alt={caption}
        className={`w-full h-auto object-cover transform group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => {
          setHasError(true);
          setLoaded(true);
        }}
      />
    </>
  );
};

type FilterType = 'all' | 'image' | 'video';

const Gallery: React.FC = () => {
  const { t } = useLanguage();
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch('/api/uploads/', {
          method: 'GET',
          headers: { 'Accept': 'application/json' }
        });

        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          const mappedItems: GalleryItem[] = data.map((item: any, index: number) => {
            let rawUrl = '';
            let caption = '';

            if (typeof item === 'string') {
              rawUrl = item;
              caption = `Archive Item ${index + 1}`;
            } else {
              rawUrl = item.url || item.filePath || item.path || item.file || '';
              caption = item.caption || item.title || item.description || item.name || `Archive Item ${index + 1}`;
            }

            const src = rawUrl.startsWith('http')
              ? rawUrl.replace(/^http:/, 'https:')
              : `https://api.hadiarchive.com${rawUrl.startsWith('/') ? '' : '/'}${rawUrl}`;

            const isVideo = src.match(/\.(mp4|webm|mov)$/i);

            return {
              src,
              caption,
              type: isVideo ? 'video' : 'image'
            };
          });

          const validItems = mappedItems.filter(item => item.src && item.src !== 'https://api.hadiarchive.com/');

          if (validItems.length > 0) {
            setItems(validItems);
            setLoading(false);
            return;
          }
        }
        throw new Error('No items found');
      } catch (err) {
        // Silently fall back to the provided combined list
        setItems(fallbackItems);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const filteredItems = items.filter(item => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

  const getCount = (type: FilterType) => {
    if (type === 'all') return items.length;
    return items.filter(i => i.type === type).length;
  };

  return (
    <div className="relative z-10">
      <div className="text-center mb-10">
        <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4 text-white">{t('gallery.title')}</h2>
        <div className="h-1 w-16 bg-crimson mx-auto rounded-full"></div>
      </div>

      {/* Sticky Filter Bar */}
      <div className="sticky top-20 z-40 mb-8 flex justify-center">
        <div className="flex items-center gap-2 p-1.5 bg-deep-900/80 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl">
          {[
            { id: 'all', label: t('gallery.filter.all'), icon: Filter },
            { id: 'image', label: t('gallery.filter.photos'), icon: Image },
            { id: 'video', label: t('gallery.filter.videos'), icon: Film }
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id as FilterType)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all ${filter === f.id
                ? 'bg-crimson text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
            >
              <f.icon size={14} />
              <span>{f.label}</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${filter === f.id ? 'bg-black/20 text-white' : 'bg-white/10 text-gray-400'}`}>
                {getCount(f.id as FilterType)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-10 h-10 text-crimson animate-spin mb-4" />
          <p className="text-gray-400 text-sm">Loading Archive...</p>
        </div>
      ) : (
        /* Scrollable Container with Masonry Layout */
        <div className="h-[85vh] overflow-y-auto pr-2 -mr-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 hover:scrollbar-thumb-crimson/50 transition-colors bg-black/20 border border-white/5 rounded-2xl p-4 shadow-inner">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredItems.map((item, idx) => (
              <div
                key={`${item.src}-${idx}`}
                className="break-inside-avoid mb-6 group relative overflow-hidden rounded-xl bg-white/5 border border-white/10 cursor-pointer w-full h-auto"
                onClick={() => setSelectedItem(item)}
              >
                {item.type === 'video' ? (
                  <VideoThumbnail src={item.src} />
                ) : (
                  <GalleryImage src={item.src} caption={item.caption} />
                )}

                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/70 to-transparent z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white font-playfair text-sm">{item.caption}</p>
                  <div className="flex items-center gap-2 text-crimson text-xs mt-1 font-bold uppercase tracking-wider">
                    <Maximize2 size={12} /> {t('gallery.view')}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Empty State */}
          {filteredItems.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full py-20 text-gray-500">
              <Filter size={48} className="mb-4 opacity-50" />
              <p>No items found in this category.</p>
            </div>
          )}
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4" onClick={() => setSelectedItem(null)}>
          <button
            className="absolute top-6 right-6 text-white hover:text-crimson transition-colors z-[70]"
            onClick={() => setSelectedItem(null)}
          >
            <X size={32} />
          </button>

          <div className="relative max-w-full max-h-[90vh] w-full md:w-auto flex justify-center" onClick={(e) => e.stopPropagation()}>
            {selectedItem.type === 'video' ? (
              <div className="w-full max-w-5xl relative bg-black rounded-lg overflow-hidden">
                <video
                  src={selectedItem.src}
                  controls
                  autoPlay
                  className="w-full max-h-[85vh] rounded-lg shadow-2xl border border-white/10"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement?.querySelector('.video-error-msg')?.classList.remove('hidden');
                  }}
                />
                <div className="video-error-msg hidden absolute inset-0 flex flex-col items-center justify-center text-white p-10 text-center">
                  <AlertCircle size={48} className="mb-4 text-crimson opacity-80" />
                  <p className="text-lg font-bold mb-2">Video Unavailable</p>
                  <p className="text-gray-400 text-sm">The requested media resource could not be loaded.</p>
                </div>
              </div>
            ) : (
              <img
                src={selectedItem.src}
                alt="Full view"
                className="max-w-full max-h-[90vh] rounded-lg shadow-2xl border border-white/10 mx-auto"
              />
            )}
          </div>
          <div className="absolute bottom-10 left-0 right-0 text-center pointer-events-none">
            <p className="inline-block bg-black/50 px-4 py-2 rounded-full text-gray-200 font-playfair backdrop-blur-sm">{selectedItem.caption}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;