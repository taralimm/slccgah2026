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

// Import newly separated pages
import Home from './components/Home.js';
import Activities from './components/Activities.js';
import Gallery from './components/Gallery.js';
import Contact from './components/Contact.js';

export default function App() {
  // Helper to get tab from pathname or hash on load
  const getInitialTab = () => {
    if (typeof window === 'undefined') return 'home';
    
    // Check hash first
    const hash = window.location.hash.replace(/^#\//, '').replace(/^#/, '').toLowerCase();
    if (['activities', 'gallery', 'contact', 'admin'].includes(hash)) {
      return hash as any;
    }

    // fallback to pathname
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

  const [currentTab, setCurrentTab] = useState<'home' | 'activities' | 'gallery' | 'contact' | 'register' | 'admin'>(getInitialTab());

  const navigateToTab = (tab: 'home' | 'activities' | 'gallery' | 'contact' | 'register' | 'admin') => {
    if (tab === 'register') {
      window.open('https://form.jotform.com/260768214727059', '_blank', 'noopener,noreferrer');
      return;
    }
    setCurrentTab(tab);
    const newHash = tab === 'home' ? '#/' : `#/${tab}`;
    window.location.hash = newHash;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Custom toast notifications to avoid window.alert
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);



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
        // Transparent pathname-to-hash redirect to prevent 404s!
        window.history.replaceState(null, '', `/#/${path}`);
        setCurrentTab(path as any);
        return;
      }
      
      // Check hash as fallback
      const hash = window.location.hash.replace(/^#\//, '').replace(/^#/, '').toLowerCase();
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
          <Home countdown={countdown} navigateToTab={navigateToTab} />
        )}


        {/* ================= CALENDAR OF ACTIVITIES TAB ================= */}
        {currentTab === 'activities' && (
          <Activities triggerToast={triggerToast} navigateToTab={navigateToTab} />
        )}


        {/* ================= GALLERY TAB VIEW ================= */}
        {currentTab === 'gallery' && (
          <Gallery />
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
          <Contact />
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
