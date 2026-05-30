import { MapPin, Mail, Phone } from 'lucide-react';

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
                    <p className="text-[#0038a8] font-semibold mt-0.5">slsbatch2001@gmail.com</p>
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

          {/* Right Column High Quality Map Location placeholder */}
          <div className="rounded-2xl overflow-hidden shadow-sm min-h-[320px] bg-slate-100 relative border border-slate-100 flex flex-col justify-between">
            {/* Visual representation of structural map grid */}
            <div className="absolute inset-0 grid-overlay flex items-center justify-center opacity-75 bg-[#0038a8]/5">
              <div className="text-center flex flex-col items-center gap-2 p-4">
                <div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-[#0038a8]">
                  <MapPin className="w-6 h-6 animate-bounce" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Campus Arena Coordinates</span>
                <p className="text-[11px] text-slate-400 font-mono">10.3441° N, 123.9312° E</p>
              </div>
            </div>

            {/* Gradient bottom block */}
            <div className="mt-auto w-full p-5 bg-gradient-to-t from-white via-white/90 to-transparent z-10 text-slate-900">
              <h4 className="font-extrabold text-slate-800">Saint Louis College-Cebu Map</h4>
              <p className="text-slate-500 text-xs mt-1">Sudlon, Maguikay, Mandaue City, Central Cebu</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
