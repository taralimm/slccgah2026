import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  ChevronDown, 
  Copy, 
  Check, 
  HelpCircle, 
  Sparkles, 
  Info,
  DollarSign, 
  Calendar, 
  Award,
  CreditCard,
  Send
} from 'lucide-react';

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: 'general' | 'host' | 'activities' | 'pledges' | 'payment';
  keywords: string[];
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 1,
    question: "When is the Homecoming?",
    answer: "The Grand Alumni Homecoming is scheduled on August 1, 2026 (Saturday). Mark your calendars and prepare to reunite with batchmates!",
    category: 'general',
    keywords: ["date", "when", "homecoming", "time", "schedule", "calendar", "day", "august"]
  },
  {
    id: 2,
    question: "What is the scope as the host batch?",
    answer: "As the host batch, our scope is to act as the main organizer of the pre-homecoming, during-homecoming, and post-homecoming activities for CY 2026. This includes organizing, facilitating, and financing these activities.",
    category: 'host',
    keywords: ["host", "batch", "scope", "organizer", "organizing", "financing", "activities", "role", "duty", "responsibility"]
  },
  {
    id: 3,
    question: "What are the key activities lined up for our hosting?",
    answer: "Our hosting lineup includes: (1) The Grand Homecoming reunion event itself; (2) Corporate Social Responsibility (CSR) initiatives such as medical missions, feeding programs, legal services, tree planting, etc.; (3) The Batch School Project; and (4) Sports events.",
    category: 'activities',
    keywords: ["activities", "projects", "program", "lineup", "hosting", "sports", "csr", "medical mission", "feeding", "tree planting", "school project", "events"]
  },
  {
    id: 4,
    question: "What are the batch's key fundraisers?",
    answer: "The batch's key fundraisers to support the CY 2026 hosting are: (1) ticket sales for the homecoming event; (2) cash pledges; (3) sports tournaments (like pickleball); (4) solicitations and sponsorships; and (5) other auxiliary initiatives (such as the Louisian Music Fest).",
    category: 'pledges',
    keywords: ["fundraisers", "funds", "money", "raising", "ticket sales", "cash pledges", "sports", "solicitations", "sponsorships", "music fest"]
  },
  {
    id: 5,
    question: "I am no longer based in the Philippines; how can I help?",
    answer: "Even if you are living abroad, you can play a critical role! You can help by: (1) donating in the form of a cash pledge to support hosting activities; and (2) helping to disseminate information and invite batchmates, especially those who are currently out of the loop.",
    category: 'general',
    keywords: ["abroad", "overseas", "help", "support", "philippines", "outside", "donate", "cash pledge", "disseminate", "share", "information"]
  },
  {
    id: 6,
    question: "How much are we aiming to come up as batch host?",
    answer: "We are targeting approximately PHP 800,000 total budget to finance all the pre, during, and post homecoming events and community projects. This ballpark budget is patterned with reference to the successful hosting of the previous batches.",
    category: 'host',
    keywords: ["money", "aim", "target", "budget", "finance", "how much", "cost", "800k", "ballpark", "funds"]
  },
  {
    id: 7,
    question: "What is the concept behind the proposed/recommended 6K pledge per person?",
    answer: "The 6K cash pledge recommendation is broken down as PHP 1,000 per month from each person until the total recommended pledge of PHP 6,000 is met by July 2026.",
    category: 'pledges',
    keywords: ["6k", "pledge", "monthly", "donate", "concept", "installment", "recommendation", "1k"]
  },
  {
    id: 8,
    question: "Can I donate more or less than the proposed cash pledge per person?",
    answer: "Yes, absolutely! If you donate more than PHP 6,000, it is highly appreciated as it can cover for some of our batchmates who may have financial constraints. We need all the financial support we can get from everyone, so any amount will make a difference if you cannot commit to the recommended tier. You may also pool and give cash pledges as a group.",
    category: 'pledges',
    keywords: ["donate", "more", "less", "contribution", "financial", "limit", "group", "constraint", "support", "any amount"]
  },
  {
    id: 9,
    question: "What perks will I get for giving the recommended cash pledge (Php 6K)?",
    answer: "Contributing the recommended cash pledge of PHP 6,000 entitles you to free admission to the Grand Homecoming Reunion on the 1st of August. You will not need to buy any separate admission ticket.",
    category: 'pledges',
    keywords: ["perks", "benefit", "free", "admission", "ticket", "reunion", "payment", "inclusion", "6k"]
  },
  {
    id: 10,
    question: "If I provide the recommended pledge (Php 6K) and am unable to join the homecoming reunion on Aug 1, can I transfer the ticket?",
    answer: "Yes, you may nominate another batchmate from Saint Louis College-Cebu to join the homecoming reunion on your behalf. The working committee will contact you to verify and confirm your nominated representative. If you can't find anyone, you can notify the committee to forego the ticket transfer so it can be recorded appropriately for tracking.",
    category: 'general',
    keywords: ["transfer", "ticket", "unable", "join", "nominate", "representative", "proxy", "absent", "attendance", "behalf"]
  },
  {
    id: 11,
    question: "How do I give my cash pledge, and who should I notify?",
    answer: "You can make your cash pledge transfer directly to our official batch BPI Bank account. Once you complete the transaction, please notify our Finance Committee Heads (Cheryll Quejano Pino or Irene Sanico Tuazon) so they can issue your official acknowledgement receipt. Use our interactive BPI payment card below to copy the bank details or scan the official QR code!",
    category: 'payment',
    keywords: ["how to", "pay", "transfer", "bank", "account", "bpi", "cheryll", "irene", "qr", "receipt", "scan", "finance"]
  }
];

export default function Faqs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [copiedAccount, setCopiedAccount] = useState(false);

  const bankAccountNo = "0259336356";
  const bankAccountName = "Cheryll Quejano Pino";

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(bankAccountNo);
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  const toggleAccordion = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Filter logic based on category and search query
  const filteredFaqs = FAQ_DATA.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    
    if (!searchQuery.trim()) return matchesCategory;

    const query = searchQuery.toLowerCase();
    const matchesQuestion = faq.question.toLowerCase().includes(query);
    const matchesAnswer = faq.answer.toLowerCase().includes(query);
    const matchesKeywords = faq.keywords.some(kw => kw.toLowerCase().includes(query));

    return matchesCategory && (matchesQuestion || matchesAnswer || matchesKeywords);
  });

  // Highlight matches helper
  const renderHighlightedText = (text: string, search: string) => {
    if (!search.trim()) return text;
    const regex = new RegExp(`(${search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return (
      <>
        {parts.map((part, i) => 
          regex.test(part) ? (
            <mark key={i} className="bg-amber-100 text-[#0038a8] font-bold px-0.5 rounded">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  const categories = [
    { id: 'all', label: 'All Questions', icon: HelpCircle },
    { id: 'general', label: 'General Info', icon: Calendar },
    { id: 'host', label: 'Host Batch & Budget', icon: Award },
    { id: 'activities', label: 'Activities & Projects', icon: Sparkles },
    { id: 'pledges', label: 'Pledges & Perks', icon: DollarSign },
    { id: 'payment', label: 'How to Pay', icon: CreditCard },
  ];

  return (
    <div className="py-12 sm:py-16 bg-[#f8fafc] min-h-screen relative overflow-hidden">
      {/* Decorative top-right background blob */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header Section */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-150 rounded-full text-[#0038a8] text-xs font-bold uppercase tracking-wider animate-pulse">
            <HelpCircle className="w-4 h-4" />
            <span>Got Questions? We Have Answers</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0038a8] tracking-tight font-display">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Everything you need to know about the SLCC GAH 2026 hosting scope, event details, recommended cash pledges, and payment modes.
          </p>
        </div>

        {/* Search Bar & Stats */}
        <div className="mb-8 relative max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keywords (e.g. pledge, BPI, schedule, date)..."
              className="w-full pl-12 pr-10 py-4 bg-white border border-slate-200 focus:border-[#0038a8] focus:ring-2 focus:ring-indigo-100 rounded-2xl shadow-sm text-sm sm:text-base outline-none transition-all placeholder:text-slate-400"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 bg-slate-100 px-2 py-1 rounded"
              >
                Clear
              </button>
            )}
          </div>
          
          <div className="mt-3 flex justify-between items-center text-xs text-slate-500 px-2">
            <span>
              Showing <strong>{filteredFaqs.length}</strong> of <strong>{FAQ_DATA.length}</strong> questions
            </span>
            {searchQuery && (
              <span className="italic">
                Filtered by keyword "<span className="text-[#0038a8] font-semibold">{searchQuery}</span>"
              </span>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
          {categories.map((cat) => {
            const IconComponent = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setExpandedId(null);
                }}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                  isActive 
                    ? 'bg-[#0038a8] text-white shadow-md shadow-indigo-100 scale-102' 
                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <IconComponent className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4 mb-16">
          <AnimatePresence mode="popLayout">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, idx) => {
                const isExpanded = expandedId === faq.id;
                return (
                  <motion.div
                    key={faq.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className={`bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 ${
                      isExpanded ? 'border-indigo-200 ring-2 ring-indigo-50/50' : 'border-slate-100'
                    }`}
                  >
                    <button
                      onClick={() => toggleAccordion(faq.id)}
                      className="w-full p-5 sm:p-6 text-left flex justify-between items-start gap-4 focus:outline-none cursor-pointer"
                    >
                      <div className="flex items-start gap-3">
                        <span className="font-mono text-[#0038a8] font-bold text-sm bg-indigo-50 px-2 py-0.5 rounded-md shrink-0">
                          {idx + 1}
                        </span>
                        <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug font-display pr-2">
                          {renderHighlightedText(faq.question, searchQuery)}
                        </h3>
                      </div>
                      <span className={`p-1 rounded-full shrink-0 transition-transform duration-300 bg-slate-50 border border-slate-100 ${isExpanded ? 'rotate-180 text-[#0038a8] bg-indigo-50' : 'text-slate-400'}`}>
                        <ChevronDown className="w-4 h-4" />
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                          <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-slate-50 text-slate-600 text-xs sm:text-sm leading-relaxed space-y-3">
                            <p className="text-slate-700 whitespace-pre-wrap">
                              {renderHighlightedText(faq.answer, searchQuery)}
                            </p>
                            
                            {/* Special visual assist for the payment FAQ */}
                            {faq.id === 11 && (
                              <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between gap-3">
                                <div>
                                  <p className="font-mono text-[10px] text-slate-400 font-bold uppercase tracking-widest">BPI Bank Info</p>
                                  <p className="font-bold text-slate-800 text-xs sm:text-sm">{bankAccountName}</p>
                                  <p className="font-mono font-semibold text-[#0038a8] text-xs sm:text-sm">{bankAccountNo}</p>
                                </div>
                                <button
                                  onClick={handleCopyAccount}
                                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-100 active:scale-95 transition-all cursor-pointer"
                                >
                                  {copiedAccount ? (
                                    <>
                                      <Check className="w-3.5 h-3.5 text-green-600" />
                                      <span className="text-green-600 font-bold">Copied</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3.5 h-3.5" />
                                      <span>Copy Number</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            )}

                            {/* Tag pill rendering */}
                            <div className="flex flex-wrap gap-1.5 pt-2">
                              {faq.keywords.slice(0, 3).map((kw, i) => (
                                <span key={i} className="text-[10px] font-medium font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                                  #{kw}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            ) : (
              <motion.div 
                layout
                className="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-200 text-slate-500"
              >
                <div className="text-3xl mb-2">🔍</div>
                <p className="text-sm font-semibold">No questions found matching "{searchQuery}"</p>
                <p className="text-xs text-slate-400 mt-1">Try testing other simpler keywords or select a different category.</p>
                <button 
                  onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                  className="mt-4 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-[#0038a8] text-xs font-bold rounded-xl transition-all"
                >
                  Reset Filters & Search
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Beautiful high-fidelity Payment Guide Card Section */}
        <div className="bg-gradient-to-r from-[#0038a8] to-indigo-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          {/* Background visuals */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-amber-400/10 rounded-full blur-xl pointer-events-none" />

          <div className="relative grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left payment info text */}
            <div className="md:col-span-7 space-y-5">
              <span className="inline-block bg-[#00ea8c] text-[#0038a8] text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider">
                Official Settlement QR
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white leading-tight">
                How to Remit Your Cash Pledges
              </h2>
              <p className="text-indigo-100 text-xs sm:text-sm leading-relaxed">
                Remittances are securely deposited into our official host batch BPI Bank account. Once you complete your online transaction, please notify our Finance Heads to retrieve your formal acknowledgment receipt.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl border border-white/10">
                  <span className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-sm shrink-0">🏦</span>
                  <div className="text-xs">
                    <p className="text-indigo-200 font-mono text-[9px] uppercase tracking-wider">Bank Partner</p>
                    <p className="font-extrabold text-white">Bank of the Philippine Islands (BPI)</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl border border-white/10">
                  <span className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-sm shrink-0">👤</span>
                  <div className="text-xs">
                    <p className="text-indigo-200 font-mono text-[9px] uppercase tracking-wider">Account Name</p>
                    <p className="font-extrabold text-white">Cheryll Quejano Pino</p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 bg-white/10 p-3 rounded-xl border border-white/10">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-sm shrink-0">💳</span>
                    <div className="text-xs">
                      <p className="text-indigo-200 font-mono text-[9px] uppercase tracking-wider">Account Number</p>
                      <p className="font-extrabold font-mono text-white text-sm">0259336356</p>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyAccount}
                    className="px-3 py-1 bg-white hover:bg-slate-100 text-[#0038a8] rounded-lg text-xs font-black transition-all cursor-pointer shadow shrink-0"
                  >
                    {copiedAccount ? 'Copied ✓' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>

            {/* Right side BPI QR Mock */}
            <div className="md:col-span-5 flex flex-col items-center justify-center">
              <div className="bg-[#dc2626] text-white p-6 rounded-3xl shadow-xl w-full max-w-[300px] flex flex-col items-center border border-red-500">
                <span className="text-white font-black tracking-widest text-2xl font-display mb-0.5">BPI</span>
                <span className="text-[10px] text-red-100 font-bold uppercase tracking-widest mb-4">batch2001</span>
                
                {/* Real high-quality BPI InstaPay QR Code image */}
                <div className="bg-white p-4 rounded-2xl w-full aspect-square flex items-center justify-center relative overflow-hidden group/qr shadow-inner">
                  <img 
                    src="/cash-pledge-qr.png" 
                    alt="BPI InstaPay QR Code for Cash Pledge" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain transition-transform duration-350 group-hover/qr:scale-105"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Support CTA */}
        <div className="mt-16 text-center space-y-4">
          <p className="text-slate-500 text-xs sm:text-sm">
            Still need assistance or have individual queries? Reach out to our secretariat.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button 
              onClick={() => {
                const element = document.getElementById('contact-committee');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                } else {
                  // If we're inside another tab we can navigate to Contact tab!
                  // We can pass a callback if needed
                }
              }}
              className="px-6 py-2.5 bg-white hover:bg-slate-150 text-slate-800 border border-slate-200 hover:border-slate-300 font-bold text-xs sm:text-sm rounded-full shadow-sm transition-all cursor-pointer"
            >
              Contact Support Secretariat
            </button>
            <a 
              href="https://form.jotform.com/260768214727059"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-[#00ea8c] text-[#0038a8] font-black text-xs sm:text-sm rounded-full shadow-sm hover:scale-[1.01] transition-all"
            >
              Secure Your RSVP Ticket Now
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
