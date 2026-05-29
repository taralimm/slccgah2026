import React, { useState, useEffect, useRef } from 'react';
import { 
  Calendar, 
  Camera, 
  CheckCircle2, 
  Clock, 
  Mail, 
  MapPin, 
  Phone, 
  ChevronRight, 
  Upload, 
  User, 
  Users, 
  Menu, 
  X, 
  MessageSquare, 
  Info, 
  Check, 
  AlertCircle, 
  Eye, 
  RefreshCw, 
  ArrowRight, 
  Image as ImageIcon,
  Shield, 
  ExternalLink,
  Facebook,
  Search,
  BookOpen
} from 'lucide-react';
import { Registration, PaymentStatus, EmailLog, SystemStatus } from './types.js';

// Pre-Homecoming Activities Data
const ACTIVITIES_DATA = [
  {
    id: 'pickleball',
    title: "1st Louisian Pickleball Tournament",
    date: "June 20 & 21, 2026 | 8:00 AM",
    category: "Fundraising Activity",
    description: "Match up and smash at the court! In cooperation with SLSM Batch 01 - Alumni. Our pioneer pickleball gathering seeks to build camaraderie among alumni while raising funds for Homecoming.",
    details: "Reg Fee: ₱800. Free commemorative jersey if registered before May 31, 2026. Executive Level: Mens/Mixed/Womens Low (Prize: 5k, 3k, 2k). Invitational Level: Mixed Low & Mens Low (Prize: 5k, 3k, 2k), Mens Intermediate (Prize: 8k, 5k, 3k). Location: Saint Louis College of Cebu Gymnasium. Contact: REX 0992 734 0142. Powered by BAX, XP, PROTECH XP.",
    image: "public/SLCC Pickleball event banner.jpg"
  },
  {
    id: 'musicfest',
    title: "Louisian Music Fest",
    date: "June 27, 2026",
    category: "Fundraising Activity",
    description: "An open-air evening acoustic event featuring local nostalgic acoustic bands singing 90s alternative rock hits and pop classics.",
    details: "More Details Coming Soon",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 'treeplanting',
    title: "Tree Planting Activity",
    date: "July 11, 2026",
    category: "Community Outreach Activity",
    description: "Bridging alumni and environmental protection. Help us seed mangrove saplings and foster clean future coastlines for Saint Louis College-Cebu's future.",
    details: "More Details Coming Soon",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 'medical',
    title: "Medical & Dental Mission with Legal Services",
    date: "July 18, 2026",
    category: "Community Outreach Activity",
    description: "A comprehensive civic compassion service providing free basic health consults, dental checkups, essential medicines, and gratis legal counsel to neighbors.",
    details: "More Details Coming Soon",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 'feeding',
    title: "Feeding Program",
    date: "July 25, 2026",
    category: "Community Outreach Activity",
    description: "Spreading joy and proper nutrition to children in local community areas of consolacion and adjacent cities in Cebu.",
    details: "More Details Coming Soon",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 'homecoming',
    title: "SLCC Grand Alumni Homecoming 2026",
    date: "August 1, 2026",
    category: "Main Event",
    description: "The main arena night: '90's Throwback Reunion'. Get ready to throw it back to the dopest decade with retro photo zones, karaoke, trivia, and food panels.",
    details: "More Details Coming Soon",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80"
  }
];

// Gallery Images Data
const GALLERY_DATA = [] as Array<{ id: number; album: string; url: string; title: string; desc: string }>;

// Sponsors List
const SPONSORS_DATA = [
  { name: 'Partner Placeholder 1', logo: '' },
  { name: 'Partner Placeholder 2', logo: '' },
  { name: 'Sponsor Placeholder 1', logo: '' },
  { name: 'Sponsor Placeholder 2', logo: '' }
];

export default function App() {
  // Helper to get tab from pathname
  const getTabFromPath = () => {
    if (typeof window === 'undefined') return 'home';
    const path = window.location.pathname.replace(/^\/|\/$/g, '').toLowerCase();
    if (path === 'register') {
      window.location.href = 'https://form.jotform.com/260768214727059';
      return 'home';
    }
    if (['activities', 'gallery', 'contact', 'admin'].includes(path)) {
      return path as any;
    }
    return 'home';
  };

  const [currentTab, setCurrentTab] = useState<'home' | 'activities' | 'gallery' | 'contact' | 'register' | 'admin'>(getTabFromPath());

  const navigateToTab = (tab: 'home' | 'activities' | 'gallery' | 'contact' | 'register' | 'admin') => {
    if (tab === 'register') {
      window.open('https://form.jotform.com/260768214727059', '_blank', 'noopener,noreferrer');
      return;
    }
    setCurrentTab(tab);
    const newPath = tab === 'home' ? '/' : `/${tab}`;
    if (window.location.pathname !== newPath) {
      window.history.pushState({ tab }, '', newPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Custom toast notifications to avoid window.alert
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Gallery view lightbox states
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [galleryFilter, setGalleryFilter] = useState<string>('all');

  // Contact page states
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [contactSubmitting, setContactSubmitting] = useState(false);

  // Registration Page form states
  const [regForm, setRegForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    batchYear: '2026',
    hasCompanion: false,
    companionFirstName: '',
    companionLastName: '',
    companionEmail: '',
    companionPhone: '',
    companionAddress: '',
    companionBatchYear: '2026',
    referenceId: '',
    remarks: ''
  });
  const [proofFile, setProofFile] = useState<{ name: string; type: string; data: string } | null>(null);
  const [isSubmittingReg, setIsSubmittingReg] = useState(false);
  const [justRegistered, setJustRegistered] = useState(false);
  const [finalRefId, setFinalRefId] = useState('');

  // Admin section states
  const [adminPasscode, setAdminPasscode] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminRegistrations, setAdminRegistrations] = useState<Registration[]>([]);
  const [adminEmailLogs, setAdminEmailLogs] = useState<EmailLog[]>([]);
  const [adminStats, setAdminStats] = useState<SystemStatus | null>(null);
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminNotesText, setAdminNotesText] = useState<{ [regId: string]: string }>({});
  const [selectedRegForProof, setSelectedRegForProof] = useState<Registration | null>(null);
  const [adminTab, setAdminTab] = useState<'submissions' | 'emails' | 'dashboard'>('dashboard');

  // Helper toast trigger function
  const triggerToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 5000);
  };

  // Live Countdown Clock to August 1, 2026
  useEffect(() => {
    const targetDate = new Date("2026-08-01T08:00:00+08:00").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch admin dashboard info
  const fetchAdminData = async () => {
    setAdminLoading(true);
    try {
      const statsRes = await fetch('/api/stats');
      const statsData = await statsRes.json();
      setAdminStats(statsData);

      const regsRes = await fetch('/api/registrations');
      const regsData = await regsRes.json();
      setAdminRegistrations(regsData);

      const emailsRes = await fetch('/api/email-logs');
      const emailsData = await emailsRes.json();
      setAdminEmailLogs(emailsData);
    } catch (error) {
      console.error("Error fetching admin metrics:", error);
    } finally {
      setAdminLoading(false);
    }
  };

  // Automatically fetch stats on application load for standard previews
  useEffect(() => {
    fetch('/api/stats').then(res => res.json()).then(data => setAdminStats(data)).catch(console.error);
  }, []);

  // Sync tab selector with URL location path and hash
  useEffect(() => {
    const handleUrlSync = () => {
      // Check pathname first
      const path = window.location.pathname.replace(/^\/|\/$/g, '').toLowerCase();
      if (path === 'register') {
        window.location.href = 'https://form.jotform.com/260768214727059';
        return;
      }
      if (['activities', 'gallery', 'contact', 'admin'].includes(path)) {
        setCurrentTab(path as any);
        return;
      }
      
      // Check hash as fallback
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash === 'register') {
        window.location.href = 'https://form.jotform.com/260768214727059';
        return;
      }
      if (['activities', 'gallery', 'contact', 'admin'].includes(hash)) {
        setCurrentTab(hash as any);
      } else {
        setCurrentTab('home');
      }
    };

    handleUrlSync();
    window.addEventListener('popstate', handleUrlSync);
    window.addEventListener('hashchange', handleUrlSync);
    return () => {
      window.removeEventListener('popstate', handleUrlSync);
      window.removeEventListener('hashchange', handleUrlSync);
    };
  }, []);

  // Sync admin authentication
  useEffect(() => {
    if (isAdminAuthenticated) {
      fetchAdminData();
    }
  }, [isAdminAuthenticated]);

  // Handle file uploads (Proof of Payment)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    const maxSizeBytes = 8 * 1024 * 1024; // 8MB

    if (!allowedTypes.includes(file.type)) {
      triggerToast("Invalid file type. Please upload a JPG, PNG image or a PDF receipt document.", "error");
      return;
    }

    if (file.size > maxSizeBytes) {
      triggerToast("File is too large. High resolution uploads are restricted to 8MB max size.", "error");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setProofFile({
        name: file.name,
        type: file.type,
        data: reader.result as string
      });
      triggerToast(`Receipt connected: ${file.name}`, "success");
    };
    reader.onerror = () => {
      triggerToast("Failed to process local file upload. Reset and try again.", "error");
    };
    reader.readAsDataURL(file);
  };

  // Handle registration form submit
  const handleRegistrationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!regForm.firstName.trim() || !regForm.lastName.trim() || !regForm.email.trim() || !regForm.phone.trim()) {
      triggerToast("Please fill out all standard required primary details.", "error");
      return;
    }

    if (regForm.hasCompanion) {
      if (!regForm.companionFirstName.trim() || !regForm.companionLastName.trim()) {
        triggerToast("Companion option is enabled. Please input your Companion's First Name and Last Name.", "error");
        return;
      }
    }

    if (!regForm.referenceId.trim()) {
      triggerToast("Please input the unique payment Reference ID (from GCash or Bank reference receipt).", "error");
      return;
    }

    if (!proofFile) {
      triggerToast("Proof of payment upload is required to confirm your registration.", "error");
      return;
    }

    setIsSubmittingReg(true);
    try {
      const response = await fetch('/api/registrations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          registrant: {
            firstName: regForm.firstName,
            lastName: regForm.lastName,
            email: regForm.email,
            phone: regForm.phone,
            address: regForm.address,
            batchYear: regForm.batchYear
          },
          hasCompanion: regForm.hasCompanion,
          companion: regForm.hasCompanion ? {
            firstName: regForm.companionFirstName,
            lastName: regForm.companionLastName,
            email: regForm.companionEmail,
            phone: regForm.companionPhone,
            address: regForm.companionAddress,
            batchYear: regForm.companionBatchYear
          } : undefined,
          referenceId: regForm.referenceId,
          proofOfPaymentName: proofFile.name,
          proofOfPaymentType: proofFile.type,
          proofOfPaymentData: proofFile.data,
          remarks: regForm.remarks
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Server rejected registration details.');
      }

      setFinalRefId(data.registration.id);
      setJustRegistered(true);
      triggerToast("Homecoming online registration submission received!", "success");

      // Reset Form fields
      setRegForm({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        batchYear: '2026',
        hasCompanion: false,
        companionFirstName: '',
        companionLastName: '',
        companionEmail: '',
        companionPhone: '',
        companionAddress: '',
        companionBatchYear: '2026',
        referenceId: '',
        remarks: ''
      });
      setProofFile(null);
    } catch (err: any) {
      console.error(err);
      triggerToast(err.message || 'Network communication block. Please verify connections.', 'error');
    } finally {
      setIsSubmittingReg(false);
    }
  };

  // Handle contact form submission
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()) {
      triggerToast("Name, Email and Message details are required.", "error");
      return;
    }
    setContactSubmitting(true);
    setTimeout(() => {
      setContactSubmitting(false);
      triggerToast("Thank you! Your outreach report has been synced with the secretariat committee.", "success");
      setContactForm({ name: '', email: '', subject: '', message: '' });
    }, 1200);
  };

  // Handle Admin Passcode Login
  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    // Default interactive passcode for simple development evaluation
    if (adminPasscode.toLowerCase() === 'admin' || adminPasscode.toLowerCase() === 'slcc') {
      setIsAdminAuthenticated(true);
      triggerToast("Dashboard initialized. Welcome back, Admin.", "success");
    } else {
      triggerToast("Incorrect passcode. Try 'admin' to test.", "error");
    }
  };

  // Admin handle approve payment
  const handleApprovePayment = async (regId: string) => {
    const notes = adminNotesText[regId] || '';
    try {
      const res = await fetch(`/api/registrations/${regId}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes })
      });
      if (!res.ok) throw new Error("Could not execute approval.");
      triggerToast("Payment Approved and status synced fully.", "success");
      await fetchAdminData();
    } catch (err: any) {
      triggerToast(err.message, "error");
    }
  };

  // Admin handle reject payment
  const handleRejectPayment = async (regId: string) => {
    const notes = adminNotesText[regId] || '';
    if (!notes.trim()) {
      triggerToast("Notes/Review Flag reason must be supplied for Rejected payments.", "error");
      return;
    }
    try {
      const res = await fetch(`/api/registrations/${regId}/reject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes })
      });
      if (!res.ok) throw new Error("Could not execute rejection status.");
      triggerToast("Payment marked as rejected. Email dispatched.", "success");
      await fetchAdminData();
    } catch (err: any) {
      triggerToast(err.message, "error");
    }
  };

  // Set individual text notes dynamically
  const handleAdminNotesChange = (id: string, text: string) => {
    setAdminNotesText(prev => ({ ...prev, [id]: text }));
  };

  // Filtered gallery view list
  const filteredGallery = galleryFilter === 'all' 
    ? GALLERY_DATA 
    : GALLERY_DATA.filter(p => p.album === galleryFilter);

  // Years helper from 2026 to 1920 for registration lists
  const batchYears: string[] = [];
  for (let year = 2026; year >= 1920; year--) {
    batchYears.push(String(year));
  }

  return (
    <div className="min-h-screen flex flex-col antialiased bg-[#f8fafc] text-slate-800">
      
      {/* Dynamic Toast Message Overlay */}
      {toast && (
        <div className="fixed top-24 right-6 z-50 max-w-md bg-white border border-slate-200 shadow-2xl rounded-xl p-4 flex items-start gap-3 animate-bounce">
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
          ) : toast.type === 'error' ? (
            <AlertCircle className="w-6 h-6 text-rose-500 flex-shrink-0" />
          ) : (
            <Info className="w-6 h-6 text-blue-600 flex-shrink-0" />
          )}
          <div>
            <p className="text-sm font-semibold">{toast.message}</p>
          </div>
        </div>
      )}

      {/* HEADER & EMBEDDED NAVIGATION BAR */}
      <header className="sticky top-0 z-40 glass-navbar w-full shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Branding Logo */}
            <div 
              className="flex items-center gap-3 cursor-pointer" 
              onClick={() => { navigateToTab('home'); setMobileMenuOpen(false); }}
            >
              <div className="w-10 h-10 rounded-lg bg-[#0038a8] flex items-center justify-center text-white font-black text-xl tracking-tighter">
                SL
              </div>
              <div>
                <span className="font-extrabold text-lg sm:text-lg text-[#0038a8] block leading-tight font-display tracking-tight">
                  SLCC GAH 2026
                </span>
                <span className="text-xs text-slate-500 block">Saint Louis College-Cebu</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-7">
              <button 
                onClick={() => navigateToTab('home')}
                className={`text-sm font-semibold transition-colors ${currentTab === 'home' ? 'text-[#0038a8]' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Home
              </button>
              <button 
                onClick={() => navigateToTab('activities')}
                className={`text-sm font-semibold transition-colors ${currentTab === 'activities' ? 'text-[#0038a8]' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Calendar of Activities
              </button>
              <button 
                onClick={() => navigateToTab('gallery')}
                className={`text-sm font-semibold transition-colors ${currentTab === 'gallery' ? 'text-[#0038a8]' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Gallery
              </button>
              <button 
                onClick={() => navigateToTab('contact')}
                className={`text-sm font-semibold transition-colors ${currentTab === 'contact' ? 'text-[#0038a8]' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Contact
              </button>
              <a 
                href="https://form.jotform.com/260768214727059"
                target="_blank"
                rel="noopener noreferrer"
                className="blue-glow-btn text-white px-5 py-2.5 rounded-full text-sm font-semibold inline-flex items-center gap-2 cursor-pointer"
              >
                Register for Homecoming
                <ChevronRight className="w-4 h-4" />
              </a>
            </nav>

            {/* Mobile menu selector */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-700 hover:text-slate-900 focus:outline-none p-2"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 border-b border-slate-100 flex flex-col px-4 pt-3 pb-6 gap-3 animate-fadeIn">
            <button 
              onClick={() => { navigateToTab('home'); setMobileMenuOpen(false); }}
              className={`text-left px-3 py-2.5 rounded-lg text-base font-semibold ${currentTab === 'home' ? 'bg-[#0038a8]/5 text-[#0038a8]' : 'text-slate-700'}`}
            >
              Home
            </button>
            <button 
              onClick={() => { navigateToTab('activities'); setMobileMenuOpen(false); }}
              className={`text-left px-3 py-2.5 rounded-lg text-base font-semibold ${currentTab === 'activities' ? 'bg-[#0038a8]/5 text-[#0038a8]' : 'text-slate-700'}`}
            >
              Calendar of Activities
            </button>
            <button 
              onClick={() => { navigateToTab('gallery'); setMobileMenuOpen(false); }}
              className={`text-left px-3 py-2.5 rounded-lg text-base font-semibold ${currentTab === 'gallery' ? 'bg-[#0038a8]/5 text-[#0038a8]' : 'text-slate-700'}`}
            >
              Gallery
            </button>
            <button 
              onClick={() => { navigateToTab('contact'); setMobileMenuOpen(false); }}
              className={`text-left px-3 py-2.5 rounded-lg text-base font-semibold ${currentTab === 'contact' ? 'bg-[#0038a8]/5 text-[#0038a8]' : 'text-slate-700'}`}
            >
              Contact
            </button>
            <div className="h-px bg-slate-100 my-1"></div>
            <a 
              href="https://form.jotform.com/260768214727059"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full bg-[#0038a8] text-white text-center py-3 rounded-full font-bold block"
            >
              Register for Homecoming
            </a>
          </div>
        )}
      </header>

      {/* RENDER ACTIVE SCREEN/PAGE STATE */}
      <main className="flex-grow">
        
        {/* ================= HOME TAB VIEW CONTENT ================= */}
        {currentTab === 'home' && (
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
                          src="/src/assets/images/slcc_gah_promo_1779790415288.png" 
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
                        src="/src/assets/images/SLCC%20Pickleball%20event%20banner.jpg" 
                        alt="Pickleball Tournament Poster" 
                        className="w-full h-full object-cover"
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
                    <div className="w-full lg:w-1/2 rounded-xl overflow-hidden aspect-[16/10] bg-slate-200">
                      <img 
                        src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80" 
                        alt="Louisian Music Fest" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-full lg:w-1/2 space-y-4">
                      <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block">Featured fundraiser</span>
                      <h3 className="text-2xl font-extrabold text-slate-900">Louisian Music Fest</h3>
                      <p className="text-sm font-semibold text-slate-500">Date: June 27, 2026</p>
                      <p className="text-slate-600 leading-relaxed text-sm">
                        Jam with fellow Louisians! Our acoustic concert series plays alternative classics, vintage pop melodies, and legendary soundtracks from the 90s decade. Features professional production, interactive request boxes, food merchandise panels, and custom-brewed refreshments.
                      </p>
                      <div className="pt-2">
                        <button 
                          onClick={() => navigateToTab('activities')}
                          className="px-6 py-2.5 bg-[#0038a8] text-white hover:bg-[#002e8c] rounded-full text-sm font-bold transition-colors"
                        >
                          View Line-Ups & Tickets
                        </button>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </section>

            {/* SPONSORS SECTION */}
            <section className="py-20 bg-slate-50 border-t border-slate-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
                <span className="text-slate-400 font-extrabold text-xs uppercase tracking-widest block">Homecoming Sponsors & Community Partners</span>
                <div className="flex flex-wrap justify-center items-center gap-12 sm:gap-16">
                  {SPONSORS_DATA.map((spon, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-2 transition-all opacity-85 hover:opacity-100">
                      {spon.logo ? (
                        <img 
                          src={spon.logo} 
                          alt={spon.name} 
                          className="h-10 sm:h-12 object-contain bg-transparent rounded grayscale hover:grayscale-0 transition-all"
                        />
                      ) : (
                        <div className="h-12 w-36 border border-dashed border-slate-300 rounded-xl flex items-center justify-center bg-slate-100/60 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                          Placeholder
                        </div>
                      )}
                      <span className="text-[10px] text-slate-500 font-medium">{spon.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

          </div>
        )}


        {/* ================= CALENDAR OF ACTIVITIES TAB ================= */}
        {currentTab === 'activities' && (
          <div className="py-12 sm:py-16 gradient-bg-hero grid-overlay">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              
              <div className="text-center space-y-4 mb-14">
                <span className="text-xs font-bold text-[#0038a8] uppercase tracking-wider block">Homecoming Progression Roadmap</span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">Calendar of Activities</h1>
                <p className="text-slate-600 max-w-xl mx-auto">Track our chronological activities and community service runs starting from June up to the homecoming bonfire bash on August 1st.</p>
              </div>

              {/* Graphical Timeline Flow */}
              <div className="relative border-l-2 border-slate-200 ml-4 md:ml-32 space-y-14">
                {ACTIVITIES_DATA.map((act, idx) => (
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
        )}


        {/* ================= GALLERY TAB VIEW ================= */}
        {currentTab === 'gallery' && (
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
              {lightboxIndex !== null && (
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
        )}


        {/* ================= REGISTRATION FOR HOMECOMING TAB ================= */}
        {currentTab === 'register' && (
          <div className="py-12 sm:py-16 bg-[#f8fafc] grid-overlay">
            <div className="max-w-3xl mx-auto px-4 sm:px-6">

              {/* Success Page overlay if just registered */}
              {justRegistered ? (
                <div className="glass-card bg-white rounded-3xl p-8 sm:p-12 text-center space-y-8 animate-fadeIn border border-slate-200 shadow-2xl">
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-600 shadow-sm">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  
                  <div className="space-y-3">
                    <h1 className="text-3xl font-extrabold text-slate-900 font-display">🎉 Registration Received! 🎉</h1>
                    <p className="text-[#0038a8] font-bold text-sm tracking-wide">
                      YOUR SYSTEM REGISTRATION CODE: {finalRefId}
                    </p>
                    <div className="w-16 h-1 bg-[#0038a8] mx-auto rounded-full"></div>
                  </div>

                  <p className="text-slate-600 text-base leading-relaxed max-w-lg mx-auto">
                    Get ready to throw it back to the dopest decade! Think iconic music, epic throwback fits, and a night full of unforgettable reunions. Your uploaded proof of payment is now under review by our admin operations team.
                  </p>

                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 max-w-md mx-auto text-left space-y-2 text-sm">
                    <p className="font-bold text-slate-800">What happens next?</p>
                    <p className="text-slate-600">1. Verification: We will manual-verify your submitted GCash reference index.</p>
                    <p className="text-slate-600">2. Confirmation Email: You will receive an official confirmation PDF ticket once verified.</p>
                    <p className="text-slate-600">3. Bring Ticket: Keep your Reference ID handy on August 1st.</p>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-3">
                    <button 
                      onClick={() => { setJustRegistered(false); setFinalRefId(''); }}
                      className="px-6 py-3 border border-slate-200 hover:border-slate-300 text-slate-700 font-bold rounded-full text-sm"
                    >
                      New Submission
                    </button>
                    <button 
                      onClick={() => navigateToTab('home')}
                      className="px-6 py-3 bg-[#0038a8] hover:bg-[#002e8c] text-white font-bold rounded-full text-sm shadow-md"
                    >
                      Back to Homepage
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  
                  <div className="text-center space-y-3">
                    <span className="text-xs font-bold text-[#0038a8] uppercase tracking-wider block">REUNION RSVP FORM</span>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">SLCC GAH 2026 Online Registration</h1>
                    <p className="text-slate-600 text-sm max-w-xl mx-auto">This registration is exclusively for the August 1, 2026 Grand Alumni Homecoming Reunion event. Fee is ₱500.00 pesos per participant.</p>
                  </div>

                  {/* Form Component Container */}
                  <form onSubmit={handleRegistrationSubmit} className="glass-card bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xl space-y-10">
                    
                    {/* PRIMARY REGISTRANT INFO BLOCK */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                        <div className="w-8 h-8 rounded bg-[#0038a8]/10 text-[#0038a8] flex items-center justify-center font-bold text-sm">P1</div>
                        <h3 className="text-lg font-bold text-slate-900 uppercase tracking-tight">Main Registrant Information (Required)</h3>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700 block">First Name <span className="text-rose-500">*</span></label>
                          <input 
                            required
                            type="text" 
                            value={regForm.firstName}
                            onChange={(e) => setRegForm({...regForm, firstName: e.target.value})}
                            placeholder="e.g. Cheryll" 
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#0038a8] focus:outline-none text-slate-800 text-sm transition-colors"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700 block">Last Name <span className="text-rose-500">*</span></label>
                          <input 
                            required
                            type="text" 
                            value={regForm.lastName}
                            onChange={(e) => setRegForm({...regForm, lastName: e.target.value})}
                            placeholder="e.g. Pino" 
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#0038a8] focus:outline-none text-slate-800 text-sm transition-colors"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700 block">Email Address <span className="text-rose-500">*</span></label>
                          <input 
                            required
                            type="email" 
                            value={regForm.email}
                            onChange={(e) => setRegForm({...regForm, email: e.target.value})}
                            placeholder="e.g. cheryll@example.com" 
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#0038a8] focus:outline-none text-slate-800 text-sm transition-colors"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700 block">Phone Number <span className="text-rose-500">*</span></label>
                          <input 
                            required
                            type="tel" 
                            value={regForm.phone}
                            onChange={(e) => setRegForm({...regForm, phone: e.target.value})}
                            placeholder="e.g. 0917 123 4567" 
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#0038a8] focus:outline-none text-slate-800 text-sm transition-colors"
                          />
                        </div>

                        <div className="sm:col-span-2 space-y-1">
                          <label className="text-xs font-bold text-slate-700 block">Address / City (Include Province if outside Cebu)</label>
                          <input 
                            type="text" 
                            value={regForm.address}
                            onChange={(e) => setRegForm({...regForm, address: e.target.value})}
                            placeholder="e.g. Danao, Cebu" 
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#0038a8] focus:outline-none text-slate-800 text-sm transition-colors"
                          />
                        </div>

                        <div className="sm:col-span-2 space-y-1">
                          <label className="text-xs font-bold text-slate-700 block">Batch Year <span className="text-rose-500">*</span></label>
                          <select 
                            value={regForm.batchYear}
                            onChange={(e) => setRegForm({...regForm, batchYear: e.target.value})}
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#0038a8] focus:outline-none text-slate-800 text-sm bg-white"
                          >
                            {batchYears.map(year => (
                              <option key={year} value={year}>Class of {year}</option>
                            ))}
                          </select>
                        </div>

                      </div>
                    </div>

                    {/* INTERACTIVE TOGGLE TO REGISTER COMPANION */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-slate-900 text-base">Register With Companion?</h4>
                        <p className="text-xs text-slate-500">Enable this to register one extra companion for additional ₱500.00 fee.</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={regForm.hasCompanion}
                          onChange={(e) => setRegForm({...regForm, hasCompanion: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0038a8]"></div>
                      </label>
                    </div>

                    {/* COMPANION BLOCK Conditional display if turned on */}
                    {regForm.hasCompanion && (
                      <div className="space-y-6 pt-4 border-t border-slate-100 animate-fadeIn">
                        
                        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                          <div className="w-8 h-8 rounded bg-[#00ea8c]/10 text-emerald-800 flex items-center justify-center font-bold text-sm">P2</div>
                          <h3 className="text-lg font-bold text-slate-900 uppercase tracking-tight">Companion Information</h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-700 block">First Name <span className="text-rose-500">*</span></label>
                            <input 
                              required={regForm.hasCompanion}
                              type="text" 
                              value={regForm.companionFirstName}
                              onChange={(e) => setRegForm({...regForm, companionFirstName: e.target.value})}
                              placeholder="Companion's First Name" 
                              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#0038a8] focus:outline-none text-slate-800 text-sm"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-700 block">Last Name <span className="text-rose-500">*</span></label>
                            <input 
                              required={regForm.hasCompanion}
                              type="text" 
                              value={regForm.companionLastName}
                              onChange={(e) => setRegForm({...regForm, companionLastName: e.target.value})}
                              placeholder="Companion's Last Name" 
                              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#0038a8] focus:outline-none text-slate-800 text-sm"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs font-bold text-[#0038a8] block">Email Address (Optional)</label>
                            <input 
                              type="email" 
                              value={regForm.companionEmail}
                              onChange={(e) => setRegForm({...regForm, companionEmail: e.target.value})}
                              placeholder="Companion's Email Address" 
                              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#0038a8] focus:outline-none text-slate-800 text-sm"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs font-bold text-[#0038a8] block">Phone Number (Optional)</label>
                            <input 
                              type="tel" 
                              value={regForm.companionPhone}
                              onChange={(e) => setRegForm({...regForm, companionPhone: e.target.value})}
                              placeholder="Companion's Contact Number" 
                              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#0038a8] focus:outline-none text-slate-800 text-sm"
                            />
                          </div>

                          <div className="sm:col-span-2 space-y-1">
                            <label className="text-xs font-bold text-[#0038a8] block">Address / City (Optional)</label>
                            <input 
                              type="text" 
                              value={regForm.companionAddress}
                              onChange={(e) => setRegForm({...regForm, companionAddress: e.target.value})}
                              placeholder="Companion's Location" 
                              className="w-full px-4 py-3 rounded-lg border border-slate-200"
                            />
                          </div>

                          <div className="sm:col-span-2 space-y-1">
                            <label className="text-xs font-bold text-slate-700 block">Batch Year <span className="text-rose-500">*</span></label>
                            <select 
                              value={regForm.companionBatchYear}
                              onChange={(e) => setRegForm({...regForm, companionBatchYear: e.target.value})}
                              className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-sm"
                            >
                              {batchYears.map(year => (
                                <option key={year} value={year}>Class of {year}</option>
                              ))}
                            </select>
                          </div>

                        </div>
                      </div>
                    )}


                    {/* PAYMENT DETAILS AND INSTRUCTIONS PANEL */}
                    <div className="pt-8 border-t border-slate-100 space-y-6">
                      
                      <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                        <span className="text-lg">💳</span>
                        <h3 className="text-lg font-bold text-slate-900 uppercase">Payment Details</h3>
                      </div>

                      <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl md:p-6 space-y-6">
                        
                        <p className="text-slate-700 text-sm leading-relaxed">
                          To confirm your registration for <strong>SLCC GAH 2026: 90’s Bash</strong>, please complete your payment of <strong>₱500.00</strong> per registrant (₱1,000.00 if registered with companion) using one of the quick options below:
                        </p>

                        <div className="grid md:grid-cols-2 gap-5 pt-2">
                          
                          {/* Option 1: GCash */}
                          <div className="bg-white p-4 border border-slate-100 rounded-xl flex flex-col justify-between">
                            <div className="space-y-2">
                              <span className="font-bold text-sm text-[#0038a8] block">Option 1: GCash (Bank Transfer) 📱</span>
                              <div className="h-px bg-slate-100"></div>
                              <p className="text-xs text-slate-500">1. Open GCash app & tap "Bank Transfer"</p>
                              <p className="text-xs text-slate-500">2. Select the bank option</p>
                              <p className="text-xs text-slate-500">3. Details below:</p>
                              <div className="bg-[#f0f9ff] p-2 rounded text-xs leading-5">
                                <p><strong>Account Name:</strong> Cheryll Quejano Pino</p>
                                <p><strong>Account Number:</strong> 0259 3363 56</p>
                              </div>
                            </div>
                          </div>

                          {/* Option 2: Bank Transfer */}
                          <div className="bg-white p-4 border border-slate-100 rounded-xl flex flex-col justify-between">
                            <div className="space-y-2">
                              <span className="font-bold text-sm text-[#0038a8] block">Option 2: Direct Bank Transfer 🏦</span>
                              <div className="h-px bg-slate-100"></div>
                              <p className="text-xs text-slate-500">1. Open your Mobile Bank or Visit a branch</p>
                              <p className="text-xs text-slate-500">2. Transfer the fee to the details below:</p>
                              <div className="bg-[#f0f9ff] p-2 rounded text-xs leading-5">
                                <p><strong>Account Name:</strong> Cheryll Quejano Pino</p>
                                <p><strong>Account Number:</strong> 0259 3363 56</p>
                              </div>
                            </div>
                          </div>

                        </div>

                        <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl text-xs text-amber-800 leading-relaxed">
                          ⚠️ <strong>Security Disclaimer:</strong> If the transaction is processed under a different name, please write the registrant's full name directly on the receipt screenshot or image before uploading. All payments undergo strict verification records.
                        </div>

                      </div>

                      {/* Payment inputs fields */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Reference ID input */}
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700 block">GCash / Bank Reference ID <span className="text-rose-500">*</span></label>
                          <input 
                            required
                            type="text" 
                            value={regForm.referenceId}
                            onChange={(e) => setRegForm({...regForm, referenceId: e.target.value})}
                            placeholder="Reference Number for verification" 
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#0038a8] focus:outline-none text-slate-800 text-sm"
                          />
                          <p className="text-[10px] text-slate-500">Enter the unique transaction Reference ID string from GCash screen.</p>
                        </div>

                        {/* File upload drag point */}
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700 block">Upload Payment Proof (JPG, PNG, PDF) <span className="text-rose-500">*</span></label>
                          <div className="relative border-2 border-dashed border-slate-200 rounded-lg p-4 text-center hover:border-[#0038a8] transition-colors relative">
                            <input 
                              type="file" 
                              onChange={handleFileUpload}
                              accept=".jpg,.jpeg,.png,.pdf"
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div className="space-y-1 text-slate-500">
                              <Upload className="w-5 h-5 mx-auto text-slate-400" />
                              <p className="text-xs font-bold text-slate-700">Click to upload receipt</p>
                              <p className="text-[10px]">Limits: PNG, JPG, PDF up to 8MB</p>
                            </div>
                          </div>
                          {proofFile && (
                            <p className="text-[10px] text-green-600 font-bold block mt-1">
                              📎 Connected: {proofFile.name}
                            </p>
                          )}
                        </div>

                      </div>

                    </div>

                    {/* ADITIONAL INQUIRY NOTES OR COMMENTARY */}
                    <div className="pt-8 border-t border-slate-100 space-y-2">
                      <label className="text-xs font-bold text-slate-700 block">Optional Remarks / Food Preference Coords</label>
                      <textarea 
                        value={regForm.remarks}
                        onChange={(e) => setRegForm({...regForm, remarks: e.target.value})}
                        rows={3}
                        placeholder="Type any remarks or specific note to the reunion organizers (e.g., food preferences, dietary constraints, seat grouping desires)"
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-[#0038a8]"
                      />
                    </div>

                    {/* SUBMIT TRIGGERS BUTTON */}
                    <div className="pt-6">
                      <button 
                        type="submit"
                        disabled={isSubmittingReg}
                        className="w-full text-center blue-glow-btn text-white py-4 rounded-full text-base font-bold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {isSubmittingReg ? (
                          <>
                            <RefreshCw className="w-5 h-5 animate-spin" />
                            Uploading Proof and Submitting Registration...
                          </>
                        ) : (
                          <>
                            Submit Homecoming Registration
                            <Check className="w-5 h-5" />
                          </>
                        )}
                      </button>
                    </div>

                  </form>

                </div>
              )}

            </div>
          </div>
        )}


        {/* ================= CONTACT TAB ================= */}
        {currentTab === 'contact' && (
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
        )}


        {/* ================= ADMIN DASHBOARD TAB ================= */}
        {currentTab === 'admin' && (
          <div className="py-12 bg-slate-100 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              
              {!isAdminAuthenticated ? (
                
                // Admin Passcode Gateway
                <div className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-xl border border-slate-200 space-y-6 my-12 animate-fadeIn">
                  <div className="w-12 h-12 rounded bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center mx-auto text-xl font-bold">
                    <Shield className="w-6 h-6" />
                  </div>
                  
                  <div className="text-center space-y-2">
                    <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">Admin Operations Vault</h2>
                    <p className="text-slate-500 text-xs">Access is restricted to authorized SLCC committee members verifying GAH payments.</p>
                  </div>

                  <form onSubmit={handleAdminAuth} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700 block">Verify Passcode</label>
                      <input 
                        required
                        type="password" 
                        value={adminPasscode}
                        onChange={(e) => setAdminPasscode(e.target.value)}
                        placeholder="Enter admin code to test" 
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-[#0038a8] rounded-xl text-center font-mono"
                      />
                      <p className="text-[10px] text-slate-400 text-center">Type <strong>admin</strong> to pass authentication safely on this preview.</p>
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-[#0038a8] hover:bg-[#002e8c] text-white py-3.5 rounded-xl font-bold text-sm transition-all"
                    >
                      Authenticate Access
                    </button>
                  </form>
                </div>

              ) : (
                
                // Authenticated Admin Dashboard Interface
                <div className="space-y-8 animate-fadeIn">
                  
                  {/* Top Header Row with dynamic parameters */}
                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <div>
                      <span className="text-[#0038a8] text-xs font-bold uppercase tracking-widest block">SLCC Alumni GAH 2026</span>
                      <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display flex items-center gap-2">
                        System Verification Console
                        <Shield className="w-6 h-6 text-green-600" />
                      </h1>
                    </div>

                    <div className="flex items-center gap-2">
                      <button 
                        onClick={fetchAdminData}
                        className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-lg text-xs font-bold inline-flex items-center gap-1.5 transition-all shadow-sm"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        Reload Records
                      </button>
                      <button 
                        onClick={() => { setIsAdminAuthenticated(false); setAdminPasscode(''); }}
                        className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg text-xs font-bold"
                      >
                        Exit Control
                      </button>
                    </div>
                  </div>

                  {/* System stats quick deck */}
                  {adminStats && (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      
                      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-1">
                        <span className="text-xs font-semibold text-slate-500 block uppercase tracking-wider">Submissions Counter</span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-black text-slate-900">{adminStats.totalSubmissions}</span>
                          <span className="text-xs text-slate-400 font-bold">batches</span>
                        </div>
                      </div>

                      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-1">
                        <span className="text-xs font-semibold text-slate-500 block uppercase tracking-wider">Total Headcount</span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-black text-[#0038a8]">{adminStats.totalAttendees}</span>
                          <span className="text-xs text-slate-400 font-bold">persons</span>
                        </div>
                      </div>

                      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-1">
                        <span className="text-xs font-semibold text-slate-500 block uppercase tracking-wider">Confirmed Payments</span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-black text-green-600">{adminStats.approvedAttendees}</span>
                          <span className="text-xs text-green-500 font-bold">verified</span>
                        </div>
                      </div>

                      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-1">
                        <span className="text-xs font-semibold text-slate-500 block uppercase tracking-wider">Review Pipeline</span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-black text-amber-600">{adminStats.pendingReviewAttendees}</span>
                          <span className="text-xs text-amber-500 font-bold">pending</span>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* Integration Status Flags */}
                  {adminStats && (
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-wrap gap-4 items-center justify-between text-xs">
                      <div className="flex flex-wrap items-center gap-4">
                        <span className="font-bold text-slate-500 uppercase tracking-widest">Active Links:</span>
                        <span className="inline-flex items-center gap-1 font-semibold text-slate-600">
                          <span className={`w-2.5 h-2.5 rounded-full ${adminStats.sheetsConfigured ? 'bg-green-500' : 'bg-slate-300'}`}></span>
                          Google Sheets {adminStats.sheetsConfigured ? 'Synced' : 'Offline Mode'}
                        </span>
                        <span className="inline-flex items-center gap-1 font-semibold text-slate-600">
                          <span className={`w-2.5 h-2.5 rounded-full ${adminStats.supabaseConfigured ? 'bg-green-500' : 'bg-slate-300'}`}></span>
                          Supabase Database {adminStats.supabaseConfigured ? 'Connected' : 'Local JSON Mode'}
                        </span>
                        <span className="inline-flex items-center gap-1 font-semibold text-slate-600">
                          <span className={`w-2.5 h-2.5 rounded-full ${adminStats.resendConfigured ? 'bg-green-500' : 'bg-slate-300'}`}></span>
                          Resend Dispatch API {adminStats.resendConfigured ? 'Live' : 'SMTP Fallback'}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-slate-400">Time: 2026-05-27 Asia/Manila Standard</span>
                    </div>
                  )}

                  {/* Operational Dashboard Sub tabs */}
                  <div className="border-b border-slate-200 flex items-center gap-2">
                    <button 
                      onClick={() => setAdminTab('dashboard')}
                      className={`px-4 py-2.5 text-xs font-bold uppercase border-b-2 tracking-wider ${adminTab === 'dashboard' ? 'border-[#0038a8] text-[#0038a8]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                    >
                      Metrics Summary
                    </button>
                    <button 
                      onClick={() => setAdminTab('submissions')}
                      className={`px-4 py-2.5 text-xs font-bold uppercase border-b-2 tracking-wider ${adminTab === 'submissions' ? 'border-[#0038a8] text-[#0038a8]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                    >
                      Pending & Confirmed Registrations ({adminRegistrations.length})
                    </button>
                    <button 
                      onClick={() => setAdminTab('emails')}
                      className={`px-4 py-2.5 text-xs font-bold uppercase border-b-2 tracking-wider ${adminTab === 'emails' ? 'border-[#0038a8] text-[#0038a8]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                    >
                      Email Queue Archives ({adminEmailLogs.length})
                    </button>
                  </div>

                  {/* 1. Dashboard Tab View */}
                  {adminTab === 'dashboard' && (
                    <div className="grid md:grid-cols-2 gap-6">
                      
                      {/* Integration Quick Guide */}
                      <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
                        <div className="flex items-center gap-2">
                          <Info className="w-5 h-5 text-[#0038a8]" />
                          <h3 className="font-bold text-[#0038a8] tracking-tight">Supplied Production Blueprint</h3>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          This system is configured as standard fully-integrated. By modifying the <code>.env</code> file in the workspace, organizers can securely link to their actual Supabase bucket coordinates and Resend API subscription keys, syncing records in real-time.
                        </p>
                        <div className="p-3 bg-slate-50 rounded-lg text-xs leading-5 text-slate-500 space-y-1">
                          <p>🎯 <strong>Google Spreadsheet target link:</strong></p>
                          <a href="https://docs.google.com/spreadsheets/d/1fGrtwY2SjWT43a6H0v4J4NzTC_BB6B7CHsvSoGDXzbI/edit" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline break-all-words font-semibold inline-flex items-center gap-1">
                            docs.google.com/spreadsheets/d/1fGrtwY2... <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>

                      {/* Manual verification guide */}
                      <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
                        <h3 className="font-bold text-slate-900 tracking-tight">Manual Reconciliation Flow</h3>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          For payments made via GCash or Direct Bank transfer, compare the recipient transaction hash provided in the <strong>GCash Reference ID</strong> column against actual commercial mobile deposits under Cheryll Quejano Pino.
                        </p>
                        <ul className="text-xs text-slate-500 space-y-1 list-disc pl-5">
                          <li>Review matches in Reference ID column</li>
                          <li>Inspect proof of payment image attachments</li>
                          <li>In suspicious cases, click Red flag reject button supplying reason details</li>
                        </ul>
                      </div>

                    </div>
                  )}

                  {/* 2. Submissions Table Grid View */}
                  {adminTab === 'submissions' && (
                    <div className="space-y-6">
                      
                      {/* Search Bar query */}
                      <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg w-full max-w-sm">
                          <Search className="w-4 h-4" />
                          <span className="text-xs font-semibold">Live record index search enabled - sorting by youngest</span>
                        </div>
                        <span className="text-slate-400 font-bold text-xs">Total records: {adminRegistrations.length}</span>
                      </div>

                      {/* Main Table grid */}
                      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase text-slate-500 tracking-wider">
                                <th className="p-4">Submission ID</th>
                                <th className="p-4">Primary Contact</th>
                                <th className="p-4">Companion</th>
                                <th className="p-4">Reference ID</th>
                                <th className="p-4">Proof Receipt</th>
                                <th className="p-4">Amount</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Admin Action Remarks</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-slate-700 text-xs">
                              {adminRegistrations.map((reg) => (
                                <tr key={reg.id} className="hover:bg-slate-50/50">
                                  
                                  <td className="p-4 font-mono font-bold text-slate-900">
                                    <span className="block">{reg.id}</span>
                                    <span className="text-[10px] text-slate-400 font-normal">No. #{String(reg.submissionNumber).padStart(5, '0')}</span>
                                  </td>

                                  <td className="p-4 space-y-0.5">
                                    <span className="font-bold block text-slate-900">{reg.registrant.firstName} {reg.registrant.lastName}</span>
                                    <span className="text-[10px] text-slate-500 block">{reg.registrant.email}</span>
                                    <span className="text-[10px] text-slate-500 block">Class of {reg.registrant.batchYear} • {reg.registrant.phone}</span>
                                  </td>

                                  <td className="p-4">
                                    {reg.hasCompanion && reg.companion ? (
                                      <div className="space-y-0.5">
                                        <span className="font-bold text-slate-900 block">{reg.companion.firstName} {reg.companion.lastName}</span>
                                        <span className="text-[10px] text-slate-400 block">Class of {reg.companion.batchYear}</span>
                                      </div>
                                    ) : (
                                      <span className="text-slate-400 italic">None</span>
                                    )}
                                  </td>

                                  <td className="p-4 font-mono font-semibold text-[#0038a8]">
                                    {reg.referenceId}
                                  </td>

                                  {/* View receipt attachment column */}
                                  <td className="p-4">
                                    <button 
                                      onClick={() => setSelectedRegForProof(reg)}
                                      className="px-2.5 py-1.5 bg-slate-100 hover:bg-[#0038a8] hover:text-white rounded text-slate-700 tracking-wide font-bold inline-flex items-center gap-1 transition-all"
                                    >
                                      <Eye className="w-3 h-3" />
                                      View Receipt
                                    </button>
                                  </td>

                                  <td className="p-4 font-bold text-slate-900 text-sm">
                                    ₱{(reg.hasCompanion ? 1000 : 500).toLocaleString()}
                                  </td>

                                  {/* Status indicator badge */}
                                  <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full font-bold text-[10px] uppercase tracking-wide inline-block ${
                                      reg.paymentStatus === 'Approved' ? 'bg-green-100 text-green-800' :
                                      reg.paymentStatus === 'Rejected' ? 'bg-rose-100 text-rose-800' :
                                      'bg-amber-100 text-amber-800'
                                    }`}>
                                      {reg.paymentStatus}
                                    </span>
                                  </td>

                                  {/* Interactive Notes textarea & Actions buttons */}
                                  <td className="p-4 min-w-[200px] space-y-2">
                                    <textarea 
                                      value={adminNotesText[reg.id] !== undefined ? adminNotesText[reg.id] : (reg.adminNotes || '')}
                                      onChange={(e) => handleAdminNotesChange(reg.id, e.target.value)}
                                      placeholder="Admin feedback / reject reason" 
                                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded text-[11px]"
                                      rows={2}
                                    />
                                    {reg.paymentStatus === 'Pending Review' ? (
                                      <div className="flex items-center gap-1.5">
                                        <button 
                                          onClick={() => handleApprovePayment(reg.id)}
                                          className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold p-1 py-1.5 rounded text-[10px]"
                                        >
                                          Approve
                                        </button>
                                        <button 
                                          onClick={() => handleRejectPayment(reg.id)}
                                          className="flex-1 bg-rose-500 hover:bg-rose-600 text-white font-bold p-1 py-1.5 rounded text-[10px]"
                                        >
                                          Reject
                                        </button>
                                      </div>
                                    ) : (
                                      <div className="text-[10px] text-slate-500 italic block">
                                        Reconciled Date: {reg.approvalDate ? new Date(reg.approvalDate).toLocaleDateString() : 'N/A'}
                                        <button 
                                          onClick={() => {
                                            // Reset to pending to re-verify if needed
                                            handleAdminNotesChange(reg.id, reg.adminNotes || '');
                                            // Quick inline bypass to retry
                                            fetch(`/api/registrations/${reg.id}/approve`, {
                                              method: 'POST',
                                              headers: { 'Content-Type': 'application/json' },
                                              body: JSON.stringify({ notes: 'Re-verifying records.' })
                                            }).then(() => fetchAdminData());
                                          }}
                                          className="text-[#0038a8] hover:underline block font-bold mt-1"
                                        >
                                          Force status adjustment
                                        </button>
                                      </div>
                                    )}
                                  </td>

                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {adminRegistrations.length === 0 && (
                          <div className="p-12 text-center text-slate-500 italic">
                            No online homecoming registrations have been submitted yet.
                          </div>
                        )}
                      </div>

                    </div>
                  )}

                  {/* 3. Outbox Email Audit Queue Section */}
                  {adminTab === 'emails' && (
                    <div className="space-y-6">
                      
                      <div className="bg-white p-4 rounded-xl border border-slate-200">
                        <p className="text-xs text-slate-500">Every transactional alert triggered automatically by registration entries and review status updates is logged here for quick local verification.</p>
                      </div>

                      <div className="space-y-4">
                        {adminEmailLogs.map((log) => (
                          <div key={log.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                            <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100">
                              <span className="font-mono text-slate-400 uppercase">Log: {log.id}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-slate-500 font-semibold">{new Date(log.timestamp).toLocaleString()}</span>
                                <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${log.status === 'Sent' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-700'}`}>
                                  {log.status}
                                </span>
                              </div>
                            </div>
                            
                            <p className="text-xs text-slate-700"><strong>To Recipient:</strong> {log.to}</p>
                            <p className="text-sm font-bold text-slate-900"><strong>Subject:</strong> {log.subject}</p>
                            
                            <div className="bg-slate-50 p-4 rounded-xl text-xs text-slate-600 font-mono whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto">
                              {log.body}
                            </div>
                          </div>
                        ))}

                        {adminEmailLogs.length === 0 && (
                          <div className="p-12 text-center text-slate-400 italic">
                            Email outbox audit queue is currently empty.
                          </div>
                        )}
                      </div>

                    </div>
                  )}

                  {/* Proof of Payment Lightbox Viewer Inside Admin Panel */}
                  {selectedRegForProof && (
                    <div className="fixed inset-0 bg-slate-950/80 z-50 flex items-center justify-center p-4">
                      <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-6">
                        
                        <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                          <div>
                            <h4 className="font-bold text-slate-900 font-display">Receipt Alignment Review</h4>
                            <p className="text-xs text-[#0038a8]">Reference: {selectedRegForProof.referenceId}</p>
                          </div>
                          <button 
                            onClick={() => setSelectedRegForProof(null)}
                            className="text-slate-500 hover:text-slate-800 focus:outline-none font-bold"
                          >
                            Close
                          </button>
                        </div>

                        {/* Visual Image Render for Base64 or local uploads path */}
                        <div className="aspect-[4/3] bg-slate-100 border border-slate-200 rounded-xl overflow-hidden shadow-sm relative flex items-center justify-center">
                          {selectedRegForProof.proofOfPaymentUrl ? (
                            <img 
                              src={selectedRegForProof.proofOfPaymentUrl} 
                              alt="Proof receipt image" 
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <div className="p-6 text-center text-slate-400 flex flex-col items-center gap-2 text-xs">
                              <ImageIcon className="w-8 h-8 text-slate-300" />
                              Receipt file payload stored locally in cloud directory.
                            </div>
                          )}
                        </div>

                        <div className="text-xs text-slate-600 space-y-1 bg-slate-50 p-3 rounded-lg leading-relaxed">
                          <p><strong>Primary Registrant:</strong> {selectedRegForProof.registrant.firstName} {selectedRegForProof.registrant.lastName}</p>
                          <p><strong>Companion Enabled:</strong> {selectedRegForProof.hasCompanion ? 'Yes' : 'No'}</p>
                          <p><strong>Total Due Amount:</strong> ₱{(selectedRegForProof.hasCompanion ? 1000 : 500).toLocaleString()}</p>
                          <p><strong>Filename:</strong> {selectedRegForProof.proofOfPaymentName}</p>
                        </div>

                        <button 
                          onClick={() => setSelectedRegForProof(null)}
                          className="w-full bg-slate-100 text-slate-700 py-3 rounded-xl font-bold text-xs"
                        >
                          Dismiss Review overlay
                        </button>

                      </div>
                    </div>
                  )}

                </div>
              )}

            </div>
          </div>
        )}

      </main>

      {/* COMPREHENSIVE SITE FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Left Branding */}
            <div className="space-y-4">
              <span className="font-black text-xl text-white font-display tracking-tight block">SLCC GAH 2026</span>
              <p className="text-xs text-slate-400 leading-relaxed">
                Official information hub and registration portal for Saint Louis College-Cebu's Grand Alumni Homecoming celebration and pre-homecoming fundraising activities.
              </p>
              <div className="text-[11px] text-slate-500 font-mono">
                Date: August 1, 2026
              </div>
            </div>

            {/* Quick links */}
            <div className="space-y-3">
              <span className="font-extrabold text-sm text-white uppercase block">Explore</span>
              <ul className="text-xs space-y-2">
                <li><button onClick={() => navigateToTab('home')} className="hover:text-white transition-colors">Home Landing</button></li>
                <li><button onClick={() => navigateToTab('activities')} className="hover:text-white transition-colors">Calendar of Activities</button></li>
                <li><button onClick={() => navigateToTab('gallery')} className="hover:text-white transition-colors">Visual Archives Gallery</button></li>
                <li><button onClick={() => navigateToTab('contact')} className="hover:text-white transition-colors">Contact Committee</button></li>
                <li><a href="https://form.jotform.com/260768214727059" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors font-bold text-[#00ea8c]">RSVP Registration Page</a></li>
              </ul>
            </div>

            {/* Committee outreach details */}
            <div className="space-y-3">
              <span className="font-extrabold text-sm text-white uppercase block">Contact Committee</span>
              <p className="text-xs text-slate-400 leading-relaxed">
                Sudlon, Maguikay, Mandaue City, 6014 Cebu, Philippines
              </p>
              <p className="text-xs text-slate-300">
                Email: charles8mendoza@gmail.com
              </p>
            </div>

          </div>

          <div className="h-px bg-slate-800"></div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center">
            <span className="text-xs text-slate-500">
              © 2026 Saint Louis College-Cebu Alumni Association. All Rights Reserved.
            </span>
            <span className="text-xs text-slate-500">
              Reconnect. Celebrate. Party like it's 1999! 🎹
            </span>
          </div>

        </div>
      </footer>

    </div>
  );
}
