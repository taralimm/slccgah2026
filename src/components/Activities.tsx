import { Info, ChevronRight } from 'lucide-react';
import { ACTIVITIES_DATA } from '../data.js';

interface ActivitiesProps {
  triggerToast: (message: string, type: 'success' | 'error' | 'info') => void;
  navigateToTab: (tab: 'home' | 'activities' | 'gallery' | 'contact' | 'register' | 'admin') => void;
}

export default function Activities({ triggerToast, navigateToTab }: ActivitiesProps) {
  return (
    <div className="py-12 sm:py-16 gradient-bg-hero grid-overlay">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="text-center space-y-4 mb-14">
          <span className="text-xs font-bold text-[#0038a8] uppercase tracking-wider block">Homecoming Progression Roadmap</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">Calendar of Activities</h1>
          <p className="text-slate-600 max-w-xl mx-auto">Track our chronological activities and community service runs starting from June up to the homecoming bonfire bash on August 1st.</p>
        </div>

        {/* Graphical Timeline Flow */}
        <div className="relative border-l-2 border-slate-200 ml-4 md:ml-32 space-y-14">
          {ACTIVITIES_DATA.map((act) => (
            <div key={act.id} className="relative group pl-8">
              
              {/* Date Tag Left Anchor */}
              <div className="hidden md:block absolute -left-36 top-1 text-right w-28 pr-4">
                <span className="font-extrabold text-[#0038a8] text-sm block">{act.date.split(',')[0]}</span>
                <span className="text-xs text-slate-400 font-medium">{act.date.split(',')[1] || '2026'}</span>
              </div>

              {/* Node Dot */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-[#0038a8] group-hover:bg-[#0038a8] transition-colors flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-[#0038a8] rounded-full group-hover:bg-white"></div>
              </div>

              {/* Timeline Content Material Card */}
              <div className="glass-card bg-white p-6 sm:p-8 rounded-2xl flex flex-col md:flex-row gap-6">
                
                {/* Image Preview */}
                <div className="w-full md:w-1/3 rounded-xl overflow-hidden aspect-[4/3] bg-slate-100 flex-shrink-0">
                  <img 
                    src={act.image} 
                    alt={act.title} 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info Content metadata */}
                <div className="flex-grow space-y-4 flex flex-col justify-between">
                  <div>
                    
                    {/* Top row */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="md:hidden text-xs font-bold text-[#0038a8]">{act.date}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        act.category === 'Main Event' ? 'bg-[#0038a8]/10 text-[#0038a8]' : 
                        act.category === 'Fundraising Activity' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                        'bg-indigo-50 text-indigo-700 border border-indigo-100'
                      }`}>
                        {act.category}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 leading-snug">
                      {act.title}
                    </h3>

                    <p className="text-slate-600 font-medium text-sm leading-relaxed mt-2">
                      {act.description}
                    </p>

                    <div className="bg-slate-50 p-3 rounded-lg flex items-start gap-2 border border-slate-100 text-xs mt-3">
                      <Info className="w-4 h-4 text-[#0038a8] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-slate-800">PART_DETAILS:</p>
                        <p className="text-slate-500">{act.details}</p>
                      </div>
                    </div>

                  </div>

                  {/* Direct action targets */}
                  <div className="flex flex-wrap gap-2.5 pt-2">
                    {act.id === 'homecoming' ? (
                      <a 
                        href="https://form.jotform.com/260768214727059"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-[#0038a8] hover:bg-[#002e8c] text-white rounded-full text-xs font-bold inline-flex items-center gap-1.5"
                      >
                        Register Online
                        <ChevronRight className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <button
                        onClick={() => triggerToast(`Contact committee organizers regarding specific details of ${act.title}.`, "info")}
                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-xs font-bold"
                      >
                        Inquire Info
                      </button>
                    )}
                    <button
                      onClick={() => navigateToTab('contact')}
                      className="px-4 py-2 border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-800 rounded-full text-xs font-bold inline-flex items-center gap-1.5"
                    >
                      Contact Committee
                    </button>
                  </div>

                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
