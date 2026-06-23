import { useState, useEffect } from 'react';
import { Camera, X, Play, Pause, ChevronLeft, ChevronRight, ExternalLink, Image, Database, Sparkles } from 'lucide-react';
import { GALLERY_DATA } from '../data.js';

export default function Gallery() {
  const [galleryFilter, setGalleryFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  
  // Supabase live photos state
  const [supabasePhotos, setSupabasePhotos] = useState<any[]>([]);
  const [supabaseConfigured, setSupabaseConfigured] = useState<boolean>(false);
  const [loadingSupabase, setLoadingSupabase] = useState<boolean>(false);

  // Slideshow states
  const [slideIndex, setSlideIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  // Fetch live pickleball photos from our Supabase API proxy on load
  useEffect(() => {
    setLoadingSupabase(true);
    fetch('/api/pickleball-photos')
      .then(res => res.json())
      .then(data => {
        if (data.configured && data.photos && data.photos.length > 0) {
          setSupabasePhotos(data.photos);
          setSupabaseConfigured(true);
        } else {
          setSupabaseConfigured(data.configured || false);
        }
      })
      .catch(err => {
        console.error('Error loading Supabase bucket photo updates:', err);
      })
      .finally(() => {
        setLoadingSupabase(false);
      });
  }, []);

  // Compute actual list of photos to display based on the selected filter
  const getFilteredPhotos = () => {
    // 1. Gather static curated photos
    const staticFiltered = galleryFilter === 'all' 
      ? GALLERY_DATA 
      : GALLERY_DATA.filter(img => img.album.toLowerCase().replace(/\s+/g, '') === galleryFilter.replace(/\s+/g, ''));

    // 2. Gather live Supabase photos if filter corresponds to pickleball or all
    if (galleryFilter === 'all') {
      return [...supabasePhotos, ...staticFiltered];
    } else if (galleryFilter === 'pickleball') {
      const staticPickleball = GALLERY_DATA.filter(img => img.album.toLowerCase() === 'pickleball');
      return [...supabasePhotos, ...staticPickleball];
    } else {
      return staticFiltered;
    }
  };

  const filteredGallery = getFilteredPhotos();

  // Specifically filter pickleball action photos for our gorgeous carousel/slideshow
  const pickleballPhotos = [
    ...supabasePhotos,
    ...GALLERY_DATA.filter(img => img.album.toLowerCase() === 'pickleball')
  ];

  // Auto-slide side effect for the interactive slideshow
  useEffect(() => {
    if (!autoplay || pickleballPhotos.length <= 1 || galleryFilter !== 'pickleball') return;
    const interval = setInterval(() => {
      setSlideIndex(prev => (prev + 1) % pickleballPhotos.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [autoplay, pickleballPhotos.length, galleryFilter]);

  const handleNextSlide = () => {
    setSlideIndex(prev => (prev + 1) % pickleballPhotos.length);
  };

  const handlePrevSlide = () => {
    setSlideIndex(prev => (prev - 1 + pickleballPhotos.length) % pickleballPhotos.length);
  };

  return (
    <div className="py-12 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center space-y-4 mb-12">
          <span className="text-xs font-extrabold text-[#0038a8] uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full inline-block">Visual Archives</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">Photo Gallery & Album Archives</h1>
          <p className="text-slate-600 max-w-xl mx-auto text-sm sm:text-base">
            Browse historic snapshots, prep tournaments, and community outreach milestones leading up to the Grand Homecoming.
          </p>
        </div>

        {/* Gallery category filters */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-10">
          <button 
            onClick={() => setGalleryFilter('all')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 ${galleryFilter === 'all' ? 'bg-[#0038a8] text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-250'}`}
          >
            All Albums
          </button>
          <button 
            onClick={() => {
              setGalleryFilter('pickleball');
              setSlideIndex(0);
            }}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 ${galleryFilter === 'pickleball' ? 'bg-[#0038a8] text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-250'}`}
          >
            🏓 Pickleball Tournament
          </button>
          <button 
            onClick={() => setGalleryFilter('musicfest')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 ${galleryFilter === 'musicfest' ? 'bg-[#0038a8] text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-250'}`}
          >
            🎸 Louisian Music Fest
          </button>
          <button 
            onClick={() => setGalleryFilter('treeplanting')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 ${galleryFilter === 'treeplanting' ? 'bg-[#0038a8] text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-250'}`}
          >
            🌳 Tree Planting
          </button>
          <button 
            onClick={() => setGalleryFilter('medical')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 ${galleryFilter === 'medical' ? 'bg-[#0038a8] text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-250'}`}
          >
            🩺 Medical Mission
          </button>
          <button 
            onClick={() => setGalleryFilter('feeding')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 ${galleryFilter === 'feeding' ? 'bg-[#0038a8] text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-250'}`}
          >
            🍲 Feeding Program
          </button>
          <button 
            onClick={() => setGalleryFilter('homecoming')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 ${galleryFilter === 'homecoming' ? 'bg-[#0038a8] text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-250'}`}
          >
            🎉 Grand Homecoming
          </button>
        </div>

        {/* --- DYNAMIC SLIDESHOW SECTION --- */}
        {galleryFilter === 'pickleball' && pickleballPhotos.length > 0 && (
          <div className="mb-12 bg-slate-900 rounded-2xl overflow-hidden shadow-xl border border-slate-800">
            <div className="p-4 sm:p-6 border-b border-slate-800 bg-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#38bdf8]"></span>
                  </span>
                  <h2 className="text-white text-lg font-bold flex items-center gap-2">
                    Pickleball Tournament Carousel
                  </h2>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  {supabaseConfigured 
                    ? '⚡ Live photos loaded dynamically from your gallery-photos/Pickleball Supabase folder' 
                    : '✨ Event action shots. Sync your Supabase coordinates to connect.'}
                </p>
              </div>
              
              {/* Autoplay togglers and Slide Indicators */}
              <div className="flex items-center gap-3 self-end sm:self-auto">
                <button 
                  onClick={() => setAutoplay(!autoplay)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition flex items-center gap-1.5"
                >
                  {autoplay ? (
                    <>
                      <Pause className="w-3.5 h-3.5 text-yellow-400" /> Pause Auto
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 text-[#00ea8c]" /> Autoplay
                    </>
                  )}
                </button>
                <div className="text-xs text-slate-400 font-mono bg-slate-950 px-2.5 py-1.5 rounded border border-slate-800">
                  {slideIndex + 1} / {pickleballPhotos.length}
                </div>
              </div>
            </div>

            {/* Main Slideshow viewport */}
            <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full bg-slate-950 flex items-center justify-center overflow-hidden group">
              <img 
                src={pickleballPhotos[slideIndex].url} 
                alt="Pickleball Match Highlights"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-700 ease-in-out scale-102"
              />
              
              {/* Left arrow overlay */}
              <button
                onClick={handlePrevSlide}
                className="absolute left-4 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition opacity-0 group-hover:opacity-100 focus:outline-none"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Right arrow overlay */}
              <button
                onClick={handleNextSlide}
                className="absolute right-4 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition opacity-0 group-hover:opacity-100 focus:outline-none"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Meta Caption strip overlay - only show if there is a title or description */}
              {(pickleballPhotos[slideIndex].title || pickleballPhotos[slideIndex].desc) && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 pt-16 flex flex-col justify-end">
                  {pickleballPhotos[slideIndex].title && (
                    <h3 className="text-white text-base sm:text-xl font-bold leading-tight">
                      {pickleballPhotos[slideIndex].title}
                    </h3>
                  )}
                  {pickleballPhotos[slideIndex].desc && (
                    <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl line-clamp-2">
                      {pickleballPhotos[slideIndex].desc}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Miniature visual indicator bar */}
            <div className="flex items-center justify-center gap-1.5 p-3 bg-slate-950 border-t border-slate-900">
              {pickleballPhotos.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setSlideIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${idx === slideIndex ? 'w-6 bg-[#38bdf8]' : 'w-2 bg-slate-700 hover:bg-slate-500'}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* --- DYNAMIC EXTERNAL FACEBOOK ALBUM CTA --- */}
        <div className="mb-10 bg-gradient-to-r from-[#0038a8] to-blue-850 rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-6 border-l-8 border-[#00ea8c]">
          <div className="space-y-2 text-center md:text-left">
            <span className="inline-block bg-[#00ea8c] text-[#0038a8] text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full tracking-wider">
              Official Social Roll
            </span>
            <h3 className="text-lg sm:text-xl font-bold font-display">
              View the Complete Full Album Coverage
            </h3>
            <p className="text-blue-100 text-xs sm:text-sm max-w-2xl">
              Our official action cameras captured hundreds of raw action sequences, player poses, and commemorative class frames during this tournament iteration. Browse them all on our official alumni timeline.
            </p>
          </div>
          <a 
            href="https://www.facebook.com/share/p/15u4Xx8TMoX/"
            target="_blank" 
            rel="noopener noreferrer"
            className="whitespace-nowrap px-6 py-3 bg-white text-[#0038a8] hover:bg-[#00ea8c] hover:text-[#0038a8] rounded-xl font-bold text-sm tracking-wide shadow transition-all duration-200 flex items-center justify-center gap-2 shrink-0 border border-white"
          >
            Visit Full Facebook Album <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Supabase loading alert indicator */}
        {loadingSupabase && (
          <div className="mb-8 p-3 text-center bg-[#0038a8]/5 text-[#0038a8] rounded-lg text-xs font-semibold flex items-center justify-center gap-2 animate-pulse">
            <Database className="w-4 h-4 animate-spin" /> Querying custom Supabase Storage bucket media files...
          </div>
        )}

        {/* Masonry-style Grid content with zoom states - ONLY shown for non-Pickleball filters or for static albums */}
        {galleryFilter !== 'pickleball' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredGallery.map((img, idx) => (
              <div 
                key={img.id}
                onClick={() => setLightboxIndex(idx)}
                className="group relative rounded-xl overflow-hidden aspect-video sm:aspect-square bg-slate-100 shadow-sm hover:shadow-lg cursor-pointer transition-all border border-slate-250/50 hover:border-slate-300"
              >
                <img 
                  src={img.url} 
                  alt={img.title || "Gallery photo"} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 flex flex-col justify-end p-5 transition-opacity duration-200">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[#00ea8c] text-[10px] font-extrabold uppercase tracking-widest">{img.album}</span>
                    {img.isSupabase && (
                      <span className="text-white bg-sky-600/70 text-[8px] font-bold px-1 py-0.5 rounded flex items-center gap-0.5 border border-sky-400">
                        Live ☁️
                      </span>
                    )}
                  </div>
                  {img.title && <h4 className="text-white text-base font-bold leading-tight mt-0.5">{img.title}</h4>}
                  {img.desc && <p className="text-slate-300 text-xs mt-1 line-clamp-2">{img.desc}</p>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Inline feedback if filter yields blank */}
        {filteredGallery.length === 0 && (
          <div className="p-16 text-center border-2 border-dashed border-slate-250 rounded-2xl max-w-sm sm:max-w-md mx-auto my-12 bg-white">
            <Camera className="w-12 h-12 text-slate-350 mx-auto mb-4" />
            <h4 className="font-bold text-slate-700">No photos in this album yet</h4>
            <p className="text-slate-500 text-xs mt-2 leading-relaxed">
              These pictures are reserved and will populate instantly once media uploads are pushed into your live Supabase database or backend bucket.
            </p>
          </div>
        )}

        {/* Lightbox Viewer modal overlay */}
        {lightboxIndex !== null && filteredGallery[lightboxIndex] && (
          <div className="fixed inset-0 bg-slate-950/95 z-55 flex items-center justify-center p-4 transition-all w-full h-full">
            
            {/* Close button */}
            <button 
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 text-white hover:text-slate-300 p-2 text-sm font-bold flex items-center gap-1.5 bg-slate-900/60 hover:bg-slate-900 rounded-lg transition"
            >
              <X className="w-5 h-5" /> Close
            </button>

            <div className="max-w-4xl w-full flex flex-col justify-center items-center gap-4">
              
              <div className="relative aspect-video max-h-[70vh] bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex items-center justify-center">
                <img 
                  src={filteredGallery[lightboxIndex].url} 
                  alt={filteredGallery[lightboxIndex].title || "Enlarged view"} 
                  referrerPolicy="no-referrer"
                  className="max-h-[70vh] w-auto max-w-full object-contain"
                />
              </div>

              <div className="text-center text-slate-200 space-y-1 max-w-xl">
                <span className="text-[#38bdf8] text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-1.5 font-mono">
                  Album: {filteredGallery[lightboxIndex].album} 
                  {filteredGallery[lightboxIndex].isSupabase && (
                    <span className="bg-sky-600/30 text-sky-300 border border-sky-500 text-[8px] px-1 py-0.5 rounded">LIVE STORAGE BUCKET</span>
                  )}
                </span>
                {filteredGallery[lightboxIndex].title && <h3 className="text-lg sm:text-xl font-bold">{filteredGallery[lightboxIndex].title}</h3>}
                {filteredGallery[lightboxIndex].desc && <p className="text-slate-400 text-xs sm:text-sm">{filteredGallery[lightboxIndex].desc}</p>}
              </div>

              {/* Left/Right switches */}
              <div className="flex items-center gap-8 mt-2">
                <button 
                  onClick={() => setLightboxIndex(prev => prev !== null ? (prev - 1 + filteredGallery.length) % filteredGallery.length : null)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-white hover:text-slate-300 text-xs font-bold transition flex items-center gap-1"
                >
                  ← Prev
                </button>
                <button 
                  onClick={() => setLightboxIndex(prev => prev !== null ? (prev + 1) % filteredGallery.length : null)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-white hover:text-slate-300 text-xs font-bold transition flex items-center gap-1"
                >
                  Next →
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
