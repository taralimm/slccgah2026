import { Clock, ArrowRight, BookOpen, ChevronRight } from 'lucide-react';
import { ACTIVITIES_DATA } from '../data.js';

interface HomeProps {
  countdown: { days: number; hours: number; minutes: number; seconds: number };
  navigateToTab: (tab: 'home' | 'activities' | 'gallery' | 'contact' | 'register' | 'admin') => void;
}

export default function Home({ countdown, navigateToTab }: HomeProps) {
  return (
    <div>
      
      {/* HER0 AREA WITH RETRO TEXT AND countdown */}
      <section className="relative gradient-bg-hero grid-overlay overflow-hidden py-16 sm:py-24 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            
            {/* Left Column Intro Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Retro Blue Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0038a8]/10 text-[#0038a8] font-bold text-xs uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5" />
                Countdown to the Grand Reunion 📣
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-none">
                Saint Louis College-Cebu <br />
                <span className="gradient-text-blue font-display">Grand Alumni Homecoming</span> 2026
              </h1>

              <p className="text-2xl font-black text-[#0038a8] tracking-tight">
                Theme: 90's Throwback Reunion 🕺💿
              </p>

              <p className="text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 font-medium">
                Reconnect. Celebrate. Party Like It's 1999. From mixtapes to arcade games, we're turning back the clock for one epic night of nostalgic fun and lasting SLCC pride.
              </p>

              {/* Action buttons */}
              <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4 pt-2">
                <a 
                  href="https://form.jotform.com/260768214727059"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="blue-glow-btn text-white px-7 py-3 rounded-full font-bold text-base inline-flex items-center gap-2 cursor-pointer"
                >
                  Register for Homecoming
                  <ArrowRight className="w-5 h-5" />
                </a>
                <button 
                  onClick={() => navigateToTab('activities')}
                  className="bg-white border border-slate-200 hover:border-slate-300 text-slate-700 px-7 py-3 rounded-full font-bold text-base transition-all"
                >
                  View Activities
                </button>
              </div>

              {/* Counting metrics timer box */}
              <div className="pt-6">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest text-center lg:text-left mb-2">
                  SAVE THE DATE: AUGUST 1, 2026 (SATURDAY)
                </p>
                <div className="flex justify-center lg:justify-start gap-3">
                  <div className="bg-white px-4 py-3 rounded-xl shadow-sm border border-slate-100 text-center min-w-[70px]">
                    <span className="font-extrabold text-[#0038a8] text-2xl sm:text-3xl block">{countdown.days}</span>
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Days</span>
                  </div>
                  <div className="bg-white px-4 py-3 rounded-xl shadow-sm border border-slate-100 text-center min-w-[70px]">
                    <span className="font-extrabold text-[#0038a8] text-2xl sm:text-3xl block">{countdown.hours}</span>
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Hours</span>
                  </div>
                  <div className="bg-white px-4 py-3 rounded-xl shadow-sm border border-slate-100 text-center min-w-[70px]">
                    <span className="font-extrabold text-[#0038a8] text-2xl sm:text-3xl block">{countdown.minutes}</span>
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Mins</span>
                  </div>
                  <div className="bg-white px-4 py-3 rounded-xl shadow-sm border border-slate-100 text-center min-w-[70px]">
                    <span className="font-extrabold text-[#0038a8] text-2xl sm:text-3xl block">{countdown.seconds}</span>
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Secs</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column Featured Promo Image Card */}
            <div className="lg:col-span-5 mt-12 lg:mt-0 relative flex justify-center">
              <div className="bg-white p-3 rounded-2xl shadow-xl border border-slate-100 w-full max-w-sm flex flex-col gap-3">
                <div className="rounded-xl overflow-hidden bg-slate-100 relative aspect-[4/3] flex items-center justify-center">
                  <img 
                    src="/registration-hero.jpg" 
                    alt="SLCC Alumni Homecoming Poster" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-1.5 space-y-1">
                  <span className="text-xs font-bold text-[#0038a8] uppercase">90's BASH OFFICIAL POSTER</span>
                  <h4 className="font-bold text-slate-900 leading-snug">Get ready to rewind time and relive the ultimate 90's vibe! 🎧✨</h4>
                  <p className="text-xs text-slate-500">Reconnect with old friends and relive the good times. Save your seats early!</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* WELCOME INFORMATIVE SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-8">
          <div className="w-16 h-16 bg-[#0038a8]/5 rounded-full flex items-center justify-center mx-auto">
            <BookOpen className="w-8 h-8 text-[#0038a8]" />
          </div>
          <div className="space-y-3">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Welcome Home, Louisian Alumni!
            </h2>
            <div className="w-16 h-1 bg-[#0038a8] mx-auto rounded-full"></div>
          </div>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            From class hallways to professional milestones, we're returning to our roots. Our 2026 Grand Alumni Homecoming is a grand reunion celebration of spirit, memories, and shared success. This calendar highlights activities designed to trigger retro joy, foster environmental health, and deliver free support services to the community. Join us in making this homecoming genuinely legendary.
          </p>
          
          {/* Visual grid stats preview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6">
            <div className="p-5 bg-slate-50 rounded-xl rounded-b-lg border-b-2 border-b-[#0038a8]">
              <span className="text-3xl font-bold text-slate-900 block font-display">6</span>
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wide">Activities</span>
            </div>
            <div className="p-5 bg-slate-50 rounded-xl rounded-b-lg border-b-2 border-b-[#0038a8]">
              <span className="text-3xl font-bold text-slate-900 block font-display">2</span>
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wide">Fundraisers</span>
            </div>
            <div className="p-5 bg-slate-50 rounded-xl rounded-b-lg border-b-2 border-b-[#0038a8]">
              <span className="text-3xl font-bold text-slate-900 block font-display">3</span>
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wide">Outreaches</span>
            </div>
            <div className="p-5 bg-slate-50 rounded-xl rounded-b-lg border-b-2 border-b-[#0038a8]">
              <span className="text-3xl font-bold text-slate-900 block font-display">August 1</span>
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wide">The Grand Event</span>
            </div>
          </div>

        </div>
      </section>

      {/* PRE-HOMECOMING CHRONOLOGICAL ACTIVITIES PANEL */}
      <section className="py-20 bg-slate-50 grid-overlay">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-[#0038a8] text-sm font-bold uppercase tracking-wider block mb-1">CHRONOLOGICAL PROGRAM</span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display">Pre-Homecoming & Homecoming Schedule</h2>
            </div>
            <button 
              onClick={() => navigateToTab('activities')}
              className="mt-4 md:mt-0 text-[#0038a8] hover:text-[#002e8c] font-bold text-sm inline-flex items-center gap-1.5"
            >
              View All Details
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ACTIVITIES_DATA.map((act) => (
              <div key={act.id} className="glass-card rounded-2xl overflow-hidden glass-card-hover flex flex-col h-full bg-white">
                
                {/* Event Banner */}
                <div className="h-48 overflow-hidden bg-slate-100 relative group">
                  <img 
                    src={act.image} 
                    alt={act.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.currentTarget;
                      const currentSrc = target.src || '';
                      
                      if (currentSrc.toLowerCase().includes('pickleball')) {
                        const fallbacks = [
                          "/SLCC Pickleball event banner.jpg",
                          "/SLCC_Pickleball_event_banner.jpg",
                          "/slcc_pickleball_event_banner.jpg",
                          "/src/assets/images/SLCC Pickleball event banner.jpg",
                          "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80"
                        ];
                        let nextIndex = 0;
                        if (currentSrc.includes('SLCC_Pickleball')) nextIndex = 2;
                        else if (currentSrc.includes('slcc_pickleball')) nextIndex = 3;
                        else if (currentSrc.includes('/src/assets/images/')) nextIndex = 4;
                        else nextIndex = 1;
                        
                        target.src = fallbacks[nextIndex];
                      } else if (currentSrc.toLowerCase().includes('musicfest')) {
                        target.src = "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80";
                      }
                    }}
                  />
                  <div className="absolute top-4 left-4 bg-white/95 px-3 py-1.5 rounded-lg text-xs font-bold shadow-md text-slate-800">
                    {act.date}
                  </div>
                </div>

                {/* Info body */}
                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className={`inline-block px-2.5 py-1 rounded text-[10px] font-bold uppercase ${
                      act.category === 'Main Event' ? 'bg-[#0038a8]/10 text-[#0038a8]' : 
                      act.category === 'Fundraising Activity' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                      'bg-indigo-50 text-indigo-700 border border-indigo-100'
                    }`}>
                      {act.category}
                    </span>
                    <h4 className="text-lg font-bold text-slate-900 group-hover:text-[#0038a8] transition-colors leading-snug">
                      {act.title}
                    </h4>
                    <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed">
                      {act.description}
                    </p>
                  </div>

                  <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">Learn more info</span>
                    <button
                      onClick={() => navigateToTab('activities')}
                      className="p-1 px-3 text-xs bg-slate-100 hover:bg-[#0038a8] hover:text-white rounded-full font-bold transition-all text-slate-700"
                    >
                      View
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FEATURED FUNDRAISING SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-sm font-bold text-[#0038a8] uppercase">MAKE AN IMPACT 🏅</span>
            <h2 className="text-3xl font-extrabold text-slate-900">Featured Fundraising Initiatives</h2>
            <p className="text-slate-600">Proceeds and funding goals from these events go directly toward rebuilding facilities and supporting non-profit community drives aligned with SLCC.</p>
          </div>

          <div className="space-y-12">
            
            {/* Fundraising 1: Pickleball */}
            <div className="flex flex-col lg:flex-row gap-8 items-center bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-100">
              <div className="w-full lg:w-1/2 rounded-xl overflow-hidden aspect-[16/10] bg-slate-200">
                <img 
                  src="/SLCC Pickleball event banner.jpg" 
                  alt="Pickleball Tournament Poster" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.currentTarget;
                    const currentSrc = target.src || '';
                    const fallbacks = [
                      "/SLCC Pickleball event banner.jpg",
                      "/SLCC_Pickleball_event_banner.jpg",
                      "/slcc_pickleball_event_banner.jpg",
                      "/src/assets/images/SLCC Pickleball event banner.jpg",
                      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80"
                    ];
                    
                    let nextIndex = 0;
                    if (currentSrc.includes('SLCC_Pickleball')) nextIndex = 2;
                    else if (currentSrc.includes('slcc_pickleball')) nextIndex = 3;
                    else if (currentSrc.includes('/src/assets/images/')) nextIndex = 4;
                    else nextIndex = 1;
                    
                    target.src = fallbacks[nextIndex];
                  }}
                />
              </div>
              <div className="w-full lg:w-1/2 space-y-4">
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block">Featured fundraiser</span>
                <h3 className="text-2xl font-extrabold text-slate-900">1st Louisian Pickleball Tournament</h3>
                <p className="text-sm font-semibold text-slate-500">Date: June 20–21, 2026</p>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Experience the high-energy excitement of the pickleball court! Our fundraising tournament provides a recreational platform for competitive sport and community networking. All proceeds go directly to supporting primary logistics for our Grand Alumni Homecoming.
                </p>
                <div className="pt-2">
                  <button 
                    onClick={() => navigateToTab('activities')}
                    className="px-6 py-2.5 bg-[#0038a8] text-white hover:bg-[#002e8c] rounded-full text-sm font-bold transition-colors"
                  >
                    Learn Tournament Details
                  </button>
                </div>
              </div>
            </div>

            {/* Fundraising 2: Music Fest */}
            <div className="flex flex-col lg:flex-row-reverse gap-8 items-center bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-100">
              <div className="w-full lg:w-1/2 rounded-xl overflow-hidden aspect-[16/10] bg-slate-200 relative group/homeimg">
                <img 
                  src="/Musicfest-flyer.jpg" 
                  alt="Louisian Music Fest" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover/homeimg:scale-102"
                  onError={(e) => {
                    const target = e.currentTarget;
                    const currentSrc = target.src || '';
                    if (currentSrc.toLowerCase().includes('musicfest')) {
                      target.src = "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80";
                    }
                  }}
                />
              </div>
              <div className="w-full lg:w-1/2 space-y-4">
                <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-150 px-2.5 py-0.5 rounded uppercase tracking-wider inline-block">Featured fundraiser</span>
                <h3 className="text-2xl font-extrabold text-slate-900">Louisian Music Fest</h3>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-semibold">
                  <span className="flex items-center gap-1">📅 Saturday, June 27</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">📍 J-Cob’s Cosina Bar & KTV</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Some friendships start in the classroom. Others start at a gig. On June 27, we're bringing together Louisians, old friends, new faces, and music lovers for a night of live performances, cold beer, and great memories in the making. 🍻🎶🤘 Featuring live sets from <strong>Nicholay, Pointblank Cebu, ILK PH, The Manyanas, Stallions of the Burning Church, System Undone</strong>, and <strong>WED at Wendy's</strong>. Gate entry package includes 1 FREE Beer!
                </p>
                <div className="pt-2">
                  <button 
                    onClick={() => navigateToTab('activities')}
                    className="px-6 py-2.5 bg-[#0038a8] text-white hover:bg-[#002e8c] rounded-full text-sm font-bold transition-colors"
                  >
                    View Band Line-Up & Details
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
