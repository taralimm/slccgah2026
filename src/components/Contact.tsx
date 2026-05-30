import { MapPin, Mail, Phone, ExternalLink, Compass } from 'lucide-react';
import virtualTourPreview from '../assets/images/slcc-campus.png';

export default function Contact() {
  return (
    <div className="py-12 sm:py-16 bg-white min-h-screen grid-overlay">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-4 mb-14">
          <span className="text-xs font-bold text-[#0038a8] uppercase tracking-wider block">Outreach Channel</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">Contact Secretariat Committee</h1>
          <p className="text-slate-600 max-w-xl mx-auto">Have questions about ticket distributions, batch coordination, or accommodations in Cebu? Reach out to us directly via email or our hotline numbers listed below.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          
          {/* Left Column contact details card */}
          <div className="flex flex-col justify-between glass-card bg-slate-50/50 p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-3">Secretariat Committee</h3>
              
              <div className="space-y-6 text-sm text-slate-600 mt-6">
                
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#0038a8] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-slate-800">Saint Louis College-Cebu Campus</p>
                    <p className="text-slate-500 mt-0.5">Sudlon, Maguikay, Mandaue City, 6014 Cebu, Philippines</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#0038a8] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-slate-800">Secretariat Email</p>
                    <p className="text-[#0038a8] font-semibold mt-0.5">charles8mendoza@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#0038a8] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-slate-800">Phone Hotline</p>
                    <p className="text-slate-500 mt-0.5">+63 (32) 346 1259 / +63 917 336 3560</p>
                  </div>
                </div>

              </div>
            </div>

            <div className="bg-[#0038a8]/5 border border-[#0038a8]/10 rounded-xl p-4 text-xs text-slate-600">
              <p className="font-semibold text-[#0038a8] mb-1">Office Hours</p>
              <p>Monday to Friday: 8:00 AM – 5:00 PM (PST)</p>
            </div>
          </div>

          {/* Right Column: Interactive 360 Virtual Tour Portal */}
          <div className="glass-card bg-slate-50/50 p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h3 className="text-xl font-bold text-slate-900">Virtual Campus Tour</h3>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Active Tour
                </span>
              </div>
              
              <p className="text-sm text-slate-600 mt-4 leading-relaxed">
                Take a nostalgic walk down memory lane! Step onto the school grounds, explore the campus gymnasium, and view SLCC's student facilities online through our fully immersive 360° interactive experience.
              </p>
            </div>

            {/* Premium 3D-feeling clickable preview container */}
            <a 
              href="https://tour.panoee.net/6a096508fe2dd61456d9eb50/img_20260514_102714_00_056"
              target="_blank"
              rel="noopener noreferrer"
              className="block group relative rounded-xl overflow-hidden border border-slate-200 shadow-md aspect-[16/10] bg-slate-100 cursor-zoom-in"
              title="Click to start full 360° panoramic virtual tour"
            >
              <img 
                src={virtualTourPreview} 
                alt="SLCC Campus 360 Virtual Tour Preview" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              
              {/* Dark overlay & Play Button Accent */}
              <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors duration-300 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 bg-white/95 text-[#0038a8] rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300 relative">
                    {/* Ring animation */}
                    <span className="absolute inset-0 rounded-full border-4 border-white/50 animate-ping opacity-75"></span>
                    <Compass className="w-8 h-8 animate-[spin_12s_linear_infinite]" />
                  </div>
                  <span className="bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-lg border border-white/10 shadow-lg">
                    Launch Interactive Tour 🌐
                  </span>
                </div>
              </div>

              {/* Angle orientation info banner at the top edge */}
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[9px] font-mono font-bold text-slate-800 px-2 py-1 rounded shadow-xs max-w-xs truncate">
                📸 High-Definition 360° Panorama
              </div>
            </a>

            <div className="pt-2">
              <a 
                href="https://tour.panoee.net/6a096508fe2dd61456d9eb50/img_20260514_102714_00_056"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-[#0038a8] hover:bg-[#002e8c] text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2"
              >
                Open 360° Virtual Tour
                <ExternalLink className="w-4 h-4" />
              </a>
              <p className="text-[10px] text-center text-slate-400 mt-2 font-mono">
                Hosted via panoee.net. Compatible with Desktop, Mobile, and VR Headsets.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
