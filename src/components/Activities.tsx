import { useState } from 'react';
import { Info, ChevronRight, X, Calendar, MapPin, Award, Phone, Users, CheckSquare } from 'lucide-react';
import { ACTIVITIES_DATA, Activity } from '../data.js';

interface ActivitiesProps {
  triggerToast: (message: string, type: 'success' | 'error' | 'info') => void;
  navigateToTab: (tab: 'home' | 'activities' | 'gallery' | 'contact' | 'register' | 'admin') => void;
}

// Beautifully structured details component matching the visual layouts in the flyer posters
function ActivityDetailStructure({ id }: { id: string }) {
  if (id === 'pickleball') {
    return (
      <div className="space-y-4">
        {/* Ticket pricing info and Promos */}
        <div className="grid sm:grid-cols-2 gap-3.5">
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5 shadow-xs">
            <div className="w-8 h-8 rounded-full bg-amber-150 text-amber-800 flex items-center justify-center font-extrabold text-[#b45309] text-xs shrink-0 select-none">
              ₱800
            </div>
            <div>
              <p className="font-extrabold text-slate-900 text-[11px] uppercase tracking-wider">Registration fee</p>
              <p className="text-slate-600 text-[11px] mt-0.5">Applies per player / brackets entry</p>
            </div>
          </div>
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-2.5 shadow-xs">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-sm shrink-0 select-none">
              👕
            </div>
            <div>
              <p className="font-extrabold text-emerald-800 text-[11px] uppercase tracking-wider">Free Commemorative Jersey</p>
              <p className="text-slate-600 text-[10px] mt-0.5">Assured for registrations settled <span className="font-bold text-emerald-700">before May 31, 2026</span></p>
            </div>
          </div>
        </div>

        {/* Categories & Prizes aligned block */}
        <div className="border border-slate-100 rounded-xl overflow-hidden shadow-sm bg-slate-55/40">
          <div className="bg-[#0038a8]/5 border-b border-slate-100 px-4 py-2.5 flex items-center justify-between">
            <span className="text-xs font-bold text-[#0038a8] uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#0038a8]" /> Tournament Brackets & PRIZES
            </span>
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest bg-slate-150/50 px-2 py-0.5 rounded">SLSM Batch 01</span>
          </div>
          <div className="p-4 space-y-4 text-xs">
            {/* Executive Level */}
            <div>
              <p className="font-bold text-slate-950 text-xs flex items-center gap-1.5 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0038a8]"></span>
                EXECUTIVE LEVEL <span className="text-[10px] text-slate-500 font-normal italic">(Mens Low / Mixed Low / Womens Low)</span>
              </p>
              <div className="bg-white p-3 rounded-lg border border-slate-100 flex justify-between items-center text-[11px] font-mono shadow-xs">
                <div>🏆 <span className="text-slate-400 font-sans text-[10px]">Champ:</span> <span className="font-bold text-slate-800">₱5,000</span></div>
                <div className="text-slate-200 font-sans font-light">|</div>
                <div>🥈 <span className="text-slate-400 font-sans text-[10px]">1st RU:</span> <span className="font-semibold text-slate-700">₱3,000</span></div>
                <div className="text-slate-200 font-sans font-light">|</div>
                <div>🥉 <span className="text-slate-400 font-sans text-[10px]">2nd RU:</span> <span className="font-semibold text-slate-700">₱2,000</span></div>
              </div>
            </div>

            {/* Invitational Level */}
            <div>
              <p className="font-bold text-slate-950 text-xs flex items-center gap-1.5 mb-2 pt-2 border-t border-slate-100">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                INVITATIONAL LEVEL <span className="text-[10px] text-slate-500 font-normal italic">(Mixed Low & Mens Low)</span>
              </p>
              <div className="bg-white p-3 rounded-lg border border-slate-100 flex justify-between items-center text-[11px] font-mono shadow-xs mb-3">
                <div>🏆 <span className="text-slate-400 font-sans text-[10px]">Champ:</span> <span className="font-bold text-slate-800">₱5,000</span></div>
                <div className="text-slate-200 font-sans font-light">|</div>
                <div>🥈 <span className="text-slate-400 font-sans text-[10px]">1st RU:</span> <span className="font-semibold text-slate-700">₱3,000</span></div>
                <div className="text-slate-200 font-sans font-light">|</div>
                <div>🥉 <span className="text-slate-400 font-sans text-[10px]">2nd RU:</span> <span className="font-semibold text-slate-700">₱2,000</span></div>
              </div>

              <p className="font-bold text-slate-950 text-xs flex items-center gap-1.5 mb-2 pt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-600"></span>
                INVITATIONAL LEVEL <span className="text-[10px] text-slate-500 font-normal italic">(Mens Intermediate)</span>
              </p>
              <div className="bg-white p-3 rounded-lg border border-slate-100 flex justify-between items-center text-[11px] font-mono shadow-xs">
                <div>🏆 <span className="text-slate-400 font-sans text-[10px]">Champ:</span> <span className="font-bold text-slate-800">₱8,000</span></div>
                <div className="text-slate-200 font-sans font-light">|</div>
                <div>🥈 <span className="text-slate-400 font-sans text-[10px]">1st RU:</span> <span className="font-semibold text-slate-700">₱5,000</span></div>
                <div className="text-slate-200 font-sans font-light">|</div>
                <div>🥉 <span className="text-slate-400 font-sans text-[10px]">2nd RU:</span> <span className="font-semibold text-slate-700">₱3,000</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact and details footer */}
        <div className="grid sm:grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100 shadow-3xs">
            <span className="text-slate-400 font-bold uppercase text-[9px] tracking-wider shrink-0">Hotline:</span>
            <span className="font-extrabold text-[#0038a8] flex items-center gap-1">
              <Phone className="w-3 h-3 text-[#0038a8]/60" /> REX (0992 734 0142)
            </span>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100 shadow-3xs">
            <span className="text-slate-400 font-bold uppercase text-[9px] tracking-wider shrink-0">Arena:</span>
            <span className="font-semibold text-slate-700 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-400" /> SLCC Gymnasium
            </span>
          </div>
        </div>

        {/* Sponsors list powered by */}
        <div className="flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-100 pt-3">
          <span className="font-bold uppercase tracking-wider text-slate-400">Powered by</span>
          <div className="flex gap-2 font-black text-slate-600 uppercase">
            <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200/80">BAX</span>
            <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200/80">XP</span>
            <span className="bg-slate-100 px-2.5 py-0.5 rounded border border-[#0038a8]/20 bg-[#0038a8]/5 text-[#0038a8]">PROTECH XP</span>
          </div>
        </div>
      </div>
    );
  }

  if (id === 'musicfest') {
    return (
      <div className="space-y-4">
        {/* Ticket pricing info and features */}
        <div className="grid sm:grid-cols-2 gap-3.5">
          <div className="p-3 bg-indigo-50 border border-indigo-150 rounded-xl flex items-start gap-2.5 shadow-xs">
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm shrink-0">
              🎫
            </div>
            <div>
              <p className="font-extrabold text-slate-950 text-[11px] uppercase tracking-wider">Acoustic Access</p>
              <p className="text-slate-600 text-[10px] mt-0.5">₱250 Includes retro stickers & a complementary drink</p>
            </div>
          </div>
          <div className="p-3 bg-[#0038a8]/5 border border-[#0038a8]/10 rounded-xl flex items-start gap-2.5 shadow-xs">
            <div className="w-8 h-8 rounded-full bg-[#0038a8]/10 text-[#0038a8] flex items-center justify-center text-sm shrink-0">
              🎸
            </div>
            <div>
              <p className="font-extrabold text-[#0038a8] text-[11px] uppercase tracking-wider">Line-Up Style</p>
              <p className="text-slate-600 text-[10px] mt-0.5">Classic 90s unplugged rock & tribute acoustics</p>
            </div>
          </div>
        </div>

        {/* Timeline block */}
        <div className="border border-slate-100 rounded-xl overflow-hidden shadow-sm bg-slate-55/40">
          <div className="bg-[#0038a8]/5 border-b border-slate-100 px-4 py-2 flex items-center justify-between">
            <span className="text-xs font-bold text-[#0038a8] uppercase tracking-wider flex items-center gap-1.5">
              <Users className="w-4 h-4" /> Night Jams & Merchandise
            </span>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">PM Schedule</span>
          </div>
          <div className="p-3.5 space-y-2.5 text-xs text-slate-600">
            <div className="flex gap-2.5 items-start">
              <span className="font-mono text-[#0038a8] font-bold">17:00</span>
              <p><span className="font-extrabold text-slate-900 block mb-0.5">Merch & Food Fair Open:</span> Experience nostalgic visual displays, coordinate batch food stalls, and customize your own vinyl decals.</p>
            </div>
            <div className="flex gap-2.5 items-start pt-2 border-t border-slate-10/40">
              <span className="font-mono text-[#0038a8] font-bold">18:30</span>
              <p><span className="font-extrabold text-slate-900 block mb-0.5">Louisian Tribute Requests:</span> Dedicate legendary alternative and pop classics. Interactive jukebox system.</p>
            </div>
            <div className="flex gap-2.5 items-start pt-2 border-t border-slate-10/40">
              <span className="font-mono text-[#0038a8] font-bold">20:00</span>
              <p><span className="font-extrabold text-slate-900 block mb-0.5">Unplugged Main Acoustic Set:</span> Re-live the legendary hits from alternative bands in the outdoor lawn.</p>
            </div>
          </div>
        </div>

        {/* Details footer */}
        <div className="grid sm:grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            <span className="text-slate-400 font-bold uppercase text-[9px] tracking-wider shrink-0">Stage:</span>
            <span className="font-bold text-slate-700">Campus Plaza Open Grounds</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            <span className="text-slate-400 font-bold uppercase text-[9px] tracking-wider shrink-0">Vibe:</span>
            <span className="font-semibold text-indigo-700">Unplugged retro rock</span>
          </div>
        </div>
      </div>
    );
  }

  if (id === 'treeplanting') {
    return (
      <div className="space-y-4">
        {/* General Highlights */}
        <div className="grid sm:grid-cols-2 gap-3.5">
          <div className="p-3 bg-emerald-50 border border-emerald-150 rounded-xl flex items-start gap-2.5 shadow-xs">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm shrink-0">
              🌱
            </div>
            <div>
              <p className="font-extrabold text-emerald-850 text-[11px] uppercase tracking-wider">Mangrove Ecology</p>
              <p className="text-slate-600 text-[10px] mt-0.5">Seed 500+ healthy mangrove saplings inside protected Cebu zones</p>
            </div>
          </div>
          <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-2.5 shadow-xs">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm shrink-0">
              🍱
            </div>
            <div>
              <p className="font-extrabold text-blue-800 text-[11px] uppercase tracking-wider">Volunteer Kit</p>
              <p className="text-slate-600 text-[10px] mt-0.5">Free lunch box, hydration gear, and official ecology certificate</p>
            </div>
          </div>
        </div>

        {/* Schedule layout */}
        <div className="border border-slate-100 rounded-xl overflow-hidden shadow-sm bg-slate-55/40">
          <div className="bg-emerald-50/50 border-b border-emerald-100 px-4 py-2 flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
              <CheckSquare className="w-4 h-4" /> Assembly & Guidelines
            </span>
            <span className="text-[10px] text-emerald-700 font-bold uppercase">7:00 AM Departure</span>
          </div>
          <div className="p-3.5 space-y-2.5 text-xs text-slate-600">
            <div className="flex gap-2.5 items-start">
              <span className="font-mono text-emerald-800 font-bold">06:00</span>
              <p><span className="font-extrabold text-slate-900 block mb-0.5">Alumni Assembly:</span> Gather at the SLCC Main Hallways for safety brief, instructions, and environmental setup guide.</p>
            </div>
            <div className="flex gap-2.5 items-start pt-2 border-t border-slate-10/40">
              <span className="font-mono text-emerald-800 font-bold">07:00</span>
              <p><span className="font-extrabold text-slate-900 block mb-0.5">Shuttle caravan departure:</span> Safe, comfortable, and coordinated transportation provided to the coastal conservation area.</p>
            </div>
            <div className="flex gap-2.5 items-start pt-2 border-t border-slate-10/40">
              <span className="font-mono text-emerald-800 font-bold">08:00</span>
              <p><span className="font-extrabold text-slate-900 block mb-0.5">Planting Execution:</span> Coordinated team assignments. Saplings, boots, and tools provided free.</p>
            </div>
          </div>
        </div>

        {/* Details footer */}
        <div className="grid sm:grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            <span className="text-slate-400 font-bold uppercase text-[9px] tracking-wider shrink-0">Site Location:</span>
            <span className="font-bold text-slate-700">Consolacion Eco Mangrove Zone</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            <span className="text-slate-400 font-bold uppercase text-[9px] tracking-wider shrink-0">Ecology Partner:</span>
            <span className="font-semibold text-emerald-700">Ceb-DENR Office</span>
          </div>
        </div>
      </div>
    );
  }

  if (id === 'medical') {
    return (
      <div className="space-y-4">
        {/* General Highlights */}
        <div className="grid sm:grid-cols-2 gap-3.5">
          <div className="p-3 bg-red-50 border border-red-150 rounded-xl flex items-start gap-2.5 shadow-xs">
            <div className="w-8 h-8 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-sm shrink-0">
              ❤️
            </div>
            <div>
              <p className="font-extrabold text-red-850 text-[11px] uppercase tracking-wider">Clinics & Meds</p>
              <p className="text-slate-600 text-[10px] mt-0.5">Free consultations, dental decay extraction, and vital maintenance medicines</p>
            </div>
          </div>
          <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-2.5 shadow-xs">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-sm shrink-0">
              ⚖️
            </div>
            <div>
              <p className="font-extrabold text-blue-800 text-[11px] uppercase tracking-wider">Gratis Law Consulting</p>
              <p className="text-slate-600 text-[10px] mt-0.5">Free basic legal drafting, general witness advisory, and consultations</p>
            </div>
          </div>
        </div>

        {/* Schedule layout */}
        <div className="border border-slate-100 rounded-xl overflow-hidden shadow-sm bg-slate-55/40">
          <div className="bg-red-50/50 border-b border-red-100 px-4 py-2 flex items-center justify-between">
            <span className="text-xs font-bold text-red-800 uppercase tracking-wider flex items-center gap-1.5">
              <CheckSquare className="w-4 h-4" /> Available Civic Services
            </span>
            <span className="text-[10px] text-red-700 font-bold uppercase">8:00 AM – 4:00 PM</span>
          </div>
          <div className="p-3.5 space-y-2.5 text-xs text-slate-600">
            <p className="leading-relaxed"><span className="font-black text-slate-900 block mb-0.5">🩺 General Health screenings:</span> Diagnostic check-ups, sugar levels tests, and pediatric checks administered by registered alumni MDs.</p>
            <p className="leading-relaxed pt-2 border-t border-slate-10/40"><span className="font-black text-slate-900 block mb-0.5">🦷 Dental Station:</span> Safe tooth extractions and hygiene gift baskets containing kits and pediatric pastes.</p>
            <p className="leading-relaxed pt-2 border-t border-slate-10/40"><span className="font-black text-slate-900 block mb-0.5">⚖️ Legal Aid Corner:</span> Professional lawyers giving counsel on contracts, family estate parameters, and basic notarization.</p>
          </div>
        </div>

        {/* Details footer */}
        <div className="grid sm:grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            <span className="text-slate-400 font-bold uppercase text-[9px] tracking-wider shrink-0">Medical Venue:</span>
            <span className="font-bold text-slate-700">SLCC Elementary Hallways</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            <span className="text-slate-400 font-bold uppercase text-[9px] tracking-wider shrink-0">Volunteers:</span>
            <span className="font-semibold text-[#0038a8]">SLCC Alumni Doctors & Friends</span>
          </div>
        </div>
      </div>
    );
  }

  if (id === 'feeding') {
    return (
      <div className="space-y-4">
        {/* General Highlights */}
        <div className="grid sm:grid-cols-2 gap-3.5">
          <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl flex items-start gap-2.5 shadow-xs">
            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm shrink-0">
              🥣
            </div>
            <div>
              <p className="font-extrabold text-amber-850 text-[11px] uppercase tracking-wider">Nutrition Soup Kitchen</p>
              <p className="text-slate-600 text-[10px] mt-0.5">Giving healthy formulated meals and fruit desserts to municipal children</p>
            </div>
          </div>
          <div className="p-3 bg-pink-50 border border-pink-100 rounded-xl flex items-start gap-2.5 shadow-xs">
            <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-700 flex items-center justify-center text-sm shrink-0">
              🥳
            </div>
            <div>
              <p className="font-extrabold text-pink-800 text-[11px] uppercase tracking-wider">Youth Interaction</p>
              <p className="text-slate-600 text-[10px] mt-0.5">Spreading joy with storybook reading desks, custom bags, and school giveaways</p>
            </div>
          </div>
        </div>

        {/* Schedule layout */}
        <div className="border border-slate-100 rounded-xl overflow-hidden shadow-sm bg-slate-55/40">
          <div className="bg-amber-50/50 border-b border-amber-100 px-4 py-2 flex items-center justify-between">
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
              <CheckSquare className="w-4 h-4" /> Program Flow
            </span>
            <span className="text-[10px] text-amber-700 font-bold uppercase">Time: 9:00 AM – 12:00 PM</span>
          </div>
          <div className="p-3.5 space-y-2.5 text-xs text-slate-600 font-sans">
            <p className="leading-relaxed"><span className="font-black text-slate-900 block mb-0.5">🍲 Formulated Meals:</span> Serve iron-fortified proteins, delicious hot soup, vitamins, and local sweet-citrus fruits.</p>
            <p className="leading-relaxed pt-2 border-t border-slate-10/40"><span className="font-black text-slate-900 block mb-0.5">📖 Literacy Circle:</span> Interactive book-reading stations. Storytellers coordinate with the children for quick prizes.</p>
          </div>
        </div>

        {/* Details footer */}
        <div className="grid sm:grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            <span className="text-slate-400 font-bold uppercase text-[9px] tracking-wider shrink-0">Area:</span>
            <span className="font-bold text-slate-700">Sudlon Community Open Space</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            <span className="text-slate-400 font-bold uppercase text-[9px] tracking-wider shrink-0">Partners:</span>
            <span className="font-semibold text-[#0038a8]">SLCC Student Council</span>
          </div>
        </div>
      </div>
    );
  }

  if (id === 'homecoming') {
    return (
      <div className="space-y-4">
        {/* Requirements */}
        <div className="grid sm:grid-cols-2 gap-3.5">
          <div className="p-3 bg-blue-50 border border-blue-105 rounded-xl flex items-start gap-2.5 shadow-xs">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-[#0038a8] flex items-center justify-center font-bold text-sm shrink-0">
              🎫
            </div>
            <div>
              <p className="font-extrabold text-slate-950 text-[11px] uppercase tracking-wider">Fast-Pass QR Entrance</p>
              <p className="text-slate-600 text-[10px] mt-0.5">Redeem pre-registered Jotform QR keys securely at portal gates</p>
            </div>
          </div>
          <div className="p-3 bg-fuchsia-50 border border-fuchsia-100 rounded-xl flex items-start gap-2.5 shadow-xs">
            <div className="w-8 h-8 rounded-full bg-fuchsia-100 text-fuchsia-700 flex items-center justify-center text-sm shrink-0">
              🕺
            </div>
            <div>
              <p className="font-extrabold text-[#0038a8] text-[11px] uppercase tracking-wider">Recommended Style</p>
              <p className="text-slate-600 text-[10px] mt-0.5">Classic 90's Throwback! windbreakers, high flannels, retro sneakers</p>
            </div>
          </div>
        </div>

        {/* Schedule layout */}
        <div className="border border-slate-100 rounded-xl overflow-hidden shadow-sm bg-slate-55/40">
          <div className="bg-[#0038a8] border-b border-[#0038a8]/10 px-4 py-2 flex items-center justify-between text-white">
            <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4" /> HOMECOMING PROGRAM
            </span>
            <span className="text-[10px] font-bold uppercase">Main Gymnasium</span>
          </div>
          <div className="p-3.5 space-y-2 text-xs text-slate-650">
            <div className="flex justify-between items-center pb-1.5 border-b border-slate-100">
              <span className="font-bold text-[#0038a8] shrink-0 w-12 font-mono">16:00</span>
              <span className="text-slate-800 flex-grow text-left pl-2">Alumni Gates Open: Polaroid Photo Boothes & Welcome Mixtapes</span>
            </div>
            <div className="flex justify-between items-center pb-1.5 border-b border-slate-100">
              <span className="font-bold text-[#0038a8] shrink-0 w-12 font-mono">18:00</span>
              <span className="text-slate-800 flex-grow text-left pl-2">Welcome Dinner & Alumni Speech Panels</span>
            </div>
            <div className="flex justify-between items-center pb-1.5 border-b border-slate-100">
              <span className="font-bold text-[#0038a8] shrink-0 w-12 font-mono">19:30</span>
              <span className="text-slate-800 flex-grow text-left pl-2">Class Roll-Call Video Segment & Batch Salutations</span>
            </div>
            <div className="flex justify-between items-center pb-1.5 border-b border-slate-100">
              <span className="font-bold text-[#0038a8] shrink-0 w-12 font-mono">20:30</span>
              <span className="text-slate-800 flex-grow text-left pl-2">Homecoming Lucky Draw (Grand prize: Brand-new scooter!)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-bold text-[#0038a8] shrink-0 w-12 font-mono">21:15</span>
              <span className="text-slate-800 flex-grow text-left pl-2">Open Neon Dancefloor, Karaoke, & Live DJ Session</span>
            </div>
          </div>
        </div>

        {/* Details footer */}
        <div className="grid sm:grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100 animate-pulse">
            <span className="text-slate-400 font-bold uppercase text-[9px] tracking-wider shrink-0">Main Arena:</span>
            <span className="font-black text-[#0038a8]">SLCC Grand Arena Complex</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            <span className="text-slate-400 font-bold uppercase text-[9px] tracking-wider shrink-0">Coordinating:</span>
            <span className="font-semibold text-slate-700">General Secretariat Committee</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 p-3 rounded-lg flex items-start gap-2 border border-slate-100 text-xs">
      <Info className="w-4 h-4 text-[#0038a8] mt-0.5 flex-shrink-0" />
      <div>
        <p className="font-bold text-slate-850">More Event parameters coming soon</p>
        <p className="text-slate-500">Contact the Batch coordinators for specific inquiries.</p>
      </div>
    </div>
  );
}

export default function Activities({ triggerToast, navigateToTab }: ActivitiesProps) {
  // State to manage clickable modal popup
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

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
              <div className="hidden md:block absolute -left-36 top-1 text-right w-28 pr-4 select-none">
                <span className="font-extrabold text-[#0038a8] text-sm block">{act.date.split(',')[0]}</span>
                <span className="text-xs text-slate-400 font-semibold">{act.date.split(',')[1] ? act.date.split(',')[1].split('|')[0].trim() : '2026'}</span>
              </div>

              {/* Node Dot */}
              <button 
                onClick={() => setSelectedActivity(act)}
                className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-[#0038a8] hover:bg-[#0038a8] transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#0038a8]"
                title="View program details"
              >
                <div className="w-1.5 h-1.5 bg-[#0038a8] rounded-full group-hover:bg-white"></div>
              </button>

              {/* Timeline Content Material Card */}
              <div className="glass-card bg-white p-6 sm:p-8 rounded-2xl flex flex-col md:flex-row gap-6 hover:shadow-lg transition-all border border-slate-100">
                
                {/* Image Preview - Clickable to open Popup Flyer */}
                <div 
                  className="w-full md:w-1/3 rounded-xl overflow-hidden aspect-[4/3] bg-slate-100 flex-shrink-0 relative group/img cursor-zoom-in shadow-sm hover:shadow-md transition-all duration-300"
                  onClick={() => setSelectedActivity(act)}
                  title="Click to zoom flyer & open detailed visual guide"
                >
                  <img 
                    src={act.image} 
                    alt={act.title} 
                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
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
                      
                      if (currentSrc.toLowerCase().includes('pickleball')) {
                        let nextIndex = 0;
                        if (currentSrc.includes('SLCC_Pickleball')) nextIndex = 2;
                        else if (currentSrc.includes('slcc_pickleball')) nextIndex = 3;
                        else if (currentSrc.includes('/src/assets/images/')) nextIndex = 4;
                        else nextIndex = 1;
                        
                        target.src = fallbacks[nextIndex];
                      }
                    }}
                  />
                  {/* Absolute Zoom overlay banner */}
                  <div className="absolute inset-0 bg-[#0038a8]/35 opacity-0 group-hover/img:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-4 text-center">
                    <span className="w-9 h-9 bg-white text-[#0038a8] rounded-full flex items-center justify-center shadow-lg font-bold text-lg mb-1.5">🔍</span>
                    <span className="text-[10px] font-black tracking-widest uppercase">Click to expand</span>
                    <span className="text-[9px] opacity-90 mt-0.5">View visual guide & prizes</span>
                  </div>
                </div>

                {/* Info Content metadata */}
                <div className="flex-grow space-y-4 flex flex-col justify-between">
                  <div>
                    
                    {/* Top row */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="md:hidden text-xs font-bold text-[#0038a8] bg-[#0038a8]/5 px-2 py-0.5 rounded">{act.date.split('|')[0]}</span>
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        act.category === 'Main Event' ? 'bg-[#0038a8]/10 text-[#0038a8]' : 
                        act.category === 'Fundraising Activity' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                        'bg-indigo-50 text-indigo-700 border border-indigo-100'
                      }`}>
                        {act.category}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-[#0038a8] transition-colors leading-snug">
                      {act.title}
                    </h3>

                    <p className="text-slate-600 font-medium text-sm leading-relaxed mt-2">
                      {act.description}
                    </p>

                    {/* High Quality Structured Layout replaced the grey raw details block */}
                    <div className="mt-4">
                      <ActivityDetailStructure id={act.id} />
                    </div>

                  </div>

                  {/* Direct action targets */}
                  <div className="flex flex-wrap gap-2.5 pt-4 border-t border-slate-100">
                    {act.id === 'homecoming' ? (
                      <a 
                        href="https://form.jotform.com/260768214727059"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 bg-[#0038a8] hover:bg-[#002e8c] text-white rounded-xl text-xs font-bold inline-flex items-center gap-1.5 shadow-sm transition-colors"
                      >
                        Register Online
                        <ChevronRight className="w-3.5 h-3.5" />
                      </a>
                    ) : act.id === 'pickleball' ? (
                      <>
                        <button
                          onClick={() => setSelectedActivity(act)}
                          className="px-5 py-2.5 bg-[#0038a8]/10 hover:bg-[#0038a8] text-[#0038a8] hover:text-white rounded-xl text-xs font-bold shadow-3xs transition-all"
                        >
                          View Brackets & Details
                        </button>
                        <a 
                          href="https://docs.google.com/forms/d/e/1FAIpQLSdm8D0Un9hgHo3CeofOWVUjnew8uzPNO22hysia7L3Ck8ZM2Q/viewform"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold inline-flex items-center gap-1.5 shadow-md transition-colors"
                        >
                          Register Now
                          <ChevronRight className="w-3.5 h-3.5" />
                        </a>
                      </>
                    ) : (
                      <button
                        onClick={() => setSelectedActivity(act)}
                        className="px-5 py-2.5 bg-[#0038a8]/10 hover:bg-[#0038a8] text-[#0038a8] hover:text-white rounded-xl text-xs font-bold shadow-3xs transition-all"
                      >
                        View Brackets & Details
                      </button>
                    )}
                  </div>

                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Structured Details Popup Modals - Opens when clicking preview image or View details */}
      {selectedActivity && (
        <div 
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-50 flex items-center justify-center p-4 transition-all duration-300"
          onClick={() => setSelectedActivity(null)}
        >
          <div 
            className="bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col md:flex-row border border-slate-100 relative divide-y md:divide-y-0 md:divide-x divide-slate-100 transition-all transform scale-100 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button */}
            <button 
              onClick={() => setSelectedActivity(null)}
              className="absolute top-4 right-4 z-20 bg-white hover:bg-slate-100 text-slate-650 hover:text-slate-900 border border-slate-200 p-2.5 rounded-full shadow-lg transition-all flex items-center justify-center focus:outline-none"
              title="Close info flyer"
            >
              <X className="w-4.5 h-4.5" />
            </button>

            {/* Left Column: Visual Flyer Poster */}
            <div className="w-full md:w-1/2 p-4 sm:p-6 bg-slate-50 flex flex-col justify-center items-center select-none relative min-h-[260px] md:min-h-0">
              <div className="relative group/modalimg rounded-xl overflow-hidden border border-slate-200 shadow-md aspect-[3/4] w-full max-w-[290px] bg-slate-100">
                <img 
                  src={selectedActivity.image} 
                  alt={selectedActivity.title} 
                  className="w-full h-full object-cover rounded-xl"
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
                    
                    if (currentSrc.toLowerCase().includes('pickleball')) {
                      let nextIndex = 0;
                      if (currentSrc.includes('SLCC_Pickleball')) nextIndex = 2;
                      else if (currentSrc.includes('slcc_pickleball')) nextIndex = 3;
                      else if (currentSrc.includes('/src/assets/images/')) nextIndex = 4;
                      else nextIndex = 1;
                      
                      target.src = fallbacks[nextIndex];
                    }
                  }}
                />
                <a 
                  href={selectedActivity.image} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="absolute inset-0 bg-black/45 opacity-0 group-hover/modalimg:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1.5 focus:outline-none"
                  title="Open image in new browser tab"
                >
                  🔍 View Full High-Res Poster
                </a>
              </div>
              <p className="text-[10px] text-slate-400 mt-2 font-mono italic">Poster flyer coordinates. Click image to open in raw scale</p>
            </div>

            {/* Right Column: Detailed Program Fields & Action targets */}
            <div className="w-full md:w-1/2 p-6 sm:p-8 overflow-y-auto max-h-[50vh] md:max-h-[85vh] flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    selectedActivity.category === 'Main Event' ? 'bg-[#0038a8]/10 text-[#0038a8]' : 
                    selectedActivity.category === 'Fundraising Activity' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                    'bg-indigo-50 text-indigo-700 border border-indigo-100'
                  }`}>
                    {selectedActivity.category}
                  </span>
                  <span className="text-[11px] font-extrabold text-[#0038a8] font-mono select-none">
                    {selectedActivity.date.split('|')[0].trim()}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
                    {selectedActivity.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium mt-1">
                    📅 Schedule: {selectedActivity.date}
                  </p>
                </div>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {selectedActivity.description}
                </p>

                {/* Structured details parameters */}
                <div className="pt-2">
                  <ActivityDetailStructure id={selectedActivity.id} />
                </div>
              </div>

              {/* Action layout */}
              <div className="flex items-center gap-3 pt-5 border-t border-slate-100">
                {selectedActivity.id === 'homecoming' ? (
                  <a 
                    href="https://docs.google.com/forms/d/e/1FAIpQLSdm8D0Un9hgHo3CeofOWVUjnew8uzPNO22hysia7L3Ck8ZM2Q/viewform"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 bg-[#0038a8] hover:bg-[#002e8c] text-white text-center rounded-xl text-xs sm:text-sm font-bold shadow-md transition-colors inline-flex items-center justify-center gap-1.5"
                  >
                    Register Online
                    <ChevronRight className="w-4 h-4" />
                  </a>
                ) : selectedActivity.id === 'pickleball' ? (
                  <a 
                    href="https://docs.google.com/forms/d/e/1FAIpQLSdm8D0Un9hgHo3CeofOWVUjnew8uzPNO22hysia7L3Ck8ZM2Q/viewform"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-center rounded-xl text-xs sm:text-sm font-bold shadow-md transition-colors inline-flex items-center justify-center gap-1.5"
                  >
                    Register Now
                    <ChevronRight className="w-4 h-4" />
                  </a>
                ) : (
                  <button
                    onClick={() => {
                      triggerToast(`Opening outreach channel. Ask about ${selectedActivity.title}!`, 'success');
                      setSelectedActivity(null);
                      navigateToTab('contact');
                    }}
                    className="flex-1 py-3 bg-[#0038a8] hover:bg-[#002e8c] text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition-colors"
                  >
                    Register / Inquire Now
                  </button>
                )}
                <button
                  onClick={() => setSelectedActivity(null)}
                  className="px-4 py-3 border border-slate-200 hover:border-slate-305 text-slate-500 hover:text-slate-850 rounded-xl text-xs sm:text-sm font-bold transition-all"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
