import { Camera, X } from 'lucide-react';
import { GALLERY_DATA } from '../data.js';

interface GalleryProps {
  galleryFilter: string;
  setGalleryFilter: (filter: string) => void;
  lightboxIndex: number | null;
  setLightboxIndex: (index: number | null | ((prev: number | null) => number | null)) => void;
}

export default function Gallery({
  galleryFilter,
  setGalleryFilter,
  lightboxIndex,
  setLightboxIndex
}: GalleryProps) {
  const filteredGallery = galleryFilter === 'all' 
    ? GALLERY_DATA 
    : GALLERY_DATA.filter(img => img.album.toLowerCase().replace(/\s+/g, '') === galleryFilter.replace(/\s+/g, ''));

  return (
    <div className="py-12 sm:py-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-4 mb-12">
          <span className="text-xs font-bold text-[#0038a8] uppercase tracking-wider block">Visual Throwbacks</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">Photo Gallery & Album Archives</h1>
          <p className="text-slate-600 max-w-xl mx-auto">Browse historic snapshots, prep runs, and activities leading up to the Saint Louis College-Cebu homecoming night.</p>
        </div>

        {/* Gallery category filters */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-10">
          <button 
            onClick={() => setGalleryFilter('all')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all ${galleryFilter === 'all' ? 'bg-[#0038a8] text-white shadow-md' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
          >
            All Albums
          </button>
          <button 
            onClick={() => setGalleryFilter('pickleball')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all ${galleryFilter === 'pickleball' ? 'bg-[#0038a8] text-white shadow-md' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
          >
            Pickleball Tournament
          </button>
          <button 
            onClick={() => setGalleryFilter('musicfest')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all ${galleryFilter === 'musicfest' ? 'bg-[#0038a8] text-white shadow-md' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
          >
            Louisian Music Fest
          </button>
          <button 
            onClick={() => setGalleryFilter('treeplanting')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all ${galleryFilter === 'treeplanting' ? 'bg-[#0038a8] text-white shadow-md' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
          >
            Tree Planting
          </button>
          <button 
            onClick={() => setGalleryFilter('medical')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all ${galleryFilter === 'medical' ? 'bg-[#0038a8] text-white shadow-md' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
          >
            Medical Mission
          </button>
          <button 
            onClick={() => setGalleryFilter('feeding')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all ${galleryFilter === 'feeding' ? 'bg-[#0038a8] text-white shadow-md' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
          >
            Feeding Program
          </button>
          <button 
            onClick={() => setGalleryFilter('homecoming')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all ${galleryFilter === 'homecoming' ? 'bg-[#0038a8] text-white shadow-md' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
          >
            Grand Homecoming
          </button>
        </div>

        {/* Masonry-style Grid content with zoom states */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredGallery.map((img, idx) => (
            <div 
              key={img.id}
              onClick={() => setLightboxIndex(idx)}
              className="group relative rounded-xl overflow-hidden aspect-video sm:aspect-square bg-slate-100 shadow-sm hover:shadow-lg cursor-pointer transition-all border border-slate-100"
            >
              <img 
                src={img.url} 
                alt={img.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 flex flex-col justify-end p-4 transition-opacity duration-200">
                <span className="text-[#00ea8c] text-[9px] font-bold uppercase tracking-wider">{img.album}</span>
                <h4 className="text-white text-base font-bold leading-tight mt-0.5">{img.title}</h4>
                <p className="text-slate-300 text-xs mt-1">{img.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Inline feedback if filter yields blank */}
        {filteredGallery.length === 0 && (
          <div className="p-16 text-center border-2 border-dashed border-slate-200 rounded-2xl max-w-md mx-auto my-12">
            <Camera className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h4 className="font-bold text-slate-700">No photos in this album yet</h4>
            <p className="text-slate-500 text-xs mt-2">These pictures are reserved and will populate instantly during actual launch execution of homecoming activities.</p>
          </div>
        )}

        {/* Lightbox Viewer modal overlay */}
        {lightboxIndex !== null && filteredGallery[lightboxIndex] && (
          <div className="fixed inset-0 bg-slate-950/90 z-50 flex items-center justify-center p-4">
            
            {/* Close button */}
            <button 
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 text-white hover:text-slate-300 p-2 text-sm font-bold flex items-center gap-1.5 focus:outline-none"
            >
              <X className="w-6 h-6" /> Close
            </button>

            <div className="max-w-4xl w-full flex flex-col justify-center items-center gap-4">
              
              <div className="relative aspect-video max-h-[70vh] bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex items-center justify-center">
                <img 
                  src={filteredGallery[lightboxIndex].url} 
                  alt={filteredGallery[lightboxIndex].title} 
                  className="max-h-[70vh] w-auto max-w-full object-contain"
                />
              </div>

              <div className="text-center text-slate-200 space-y-1 max-w-xl">
                <span className="text-[#38bdf8] text-xs font-extrabold uppercase tracking-wide">Album: {filteredGallery[lightboxIndex].album}</span>
                <h3 className="text-xl font-bold">{filteredGallery[lightboxIndex].title}</h3>
                <p className="text-slate-400 text-sm">{filteredGallery[lightboxIndex].desc}</p>
              </div>

              {/* Left/Right switches */}
              <div className="flex items-center gap-10 mt-2">
                <button 
                  onClick={() => setLightboxIndex(prev => prev !== null ? (prev - 1 + filteredGallery.length) % filteredGallery.length : null)}
                  className="text-white hover:text-slate-300 text-base font-bold flex items-center gap-1"
                >
                  ← Prev
                </button>
                <button 
                  onClick={() => setLightboxIndex(prev => prev !== null ? (prev + 1) % filteredGallery.length : null)}
                  className="text-white hover:text-slate-300 text-base font-bold flex items-center gap-1"
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
