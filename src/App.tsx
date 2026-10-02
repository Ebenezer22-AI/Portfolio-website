/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  Gamepad2,
  Swords,
  Shield,
  Zap,
  Crosshair,
  Trophy,
  Flame,
  Volume2,
  VolumeX,
  Tv,
  Terminal,
  ExternalLink,
  Code2,
  Sparkles,
  Heart,
  Target,
  Compass,
  ImageIcon,
  Video,
  Layers,
  ChevronUp,
  Copy,
  Check,
  User,
  SlidersHorizontal,
  RotateCcw,
  FileCode,
  Radio,
  Wifi,
  Cpu,
  Menu,
  X,
  ArrowRight,
  Home,
  MessageSquare
} from 'lucide-react';

interface ProjectCardData {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  liveUrl: string;
  codeUrl: string;
  difficulty: string;
  exp: number;
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showEditGuide, setShowEditGuide] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [scanlinesEnabled, setScanlinesEnabled] = useState(true);

  // Sound Synthesizer via Web Audio API (Native, self-contained)
  const playGamerSound = useCallback((type: 'blip' | 'select' | 'powerup' | 'click') => {
    if (!soundEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === 'click') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.05);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'select') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(587.33, now);
        osc.frequency.setValueAtTime(880, now + 0.06);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'powerup') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(330, now);
        osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.08);
        osc.frequency.exponentialRampToValueAtTime(1318.51, now + 0.18);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.22);
        osc.start(now);
        osc.stop(now + 0.22);
      } else {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.04);
        osc.start(now);
        osc.stop(now + 0.04);
      }
    } catch {
      // AudioContext policy handled
    }
  }, [soundEnabled]);

  // Placeholders as strictly requested
  const defaultValues = {
    name: '[Your Name]',
    shortIntro: '[Your Short Introduction]',
    aboutMe: '[Write about yourself here]',
    interests: '[Your Interests]',
    goals: '[Your Goals]',
    funFact1: '[Write a fun fact about yourself]',
    funFact2: '[Write a fun fact about yourself]',
    funFact3: '[Write a fun fact about yourself]',
    hobbies: '[Your Hobbies]',
    favoriteThing1: '[Something you enjoy]',
    favoriteThing2: '[Something you enjoy]',
    favoriteThing3: '[Something you enjoy]',
    email: '[Your Email]',
    github: '[Your GitHub URL]',
  };

  const [customData, setCustomData] = useState(defaultValues);
  const [isCustomizing, setIsCustomizing] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home', code: '01', icon: Home },
    { name: 'Projects', href: '#projects', code: '02', icon: Layers },
    { name: 'Skills', href: '#skills', code: '03', icon: Zap },
    { name: 'Fun Facts', href: '#fun-facts', code: '04', icon: Sparkles },
    { name: 'Contact', href: '#contact', code: '05', icon: MessageSquare },
  ];

  // 10 Empty Project Cards as requested with placeholder titles
  const projects: ProjectCardData[] = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    title: `[Project Title ${i + 1}]`,
    description: '[Short description of your project]',
    technologies: ['[Tech 1]', '[Tech 2]', '[Tech 3]'],
    liveUrl: '#',
    codeUrl: '#',
    difficulty: i % 3 === 0 ? 'NIGHTMARE' : i % 2 === 0 ? 'HARD' : 'VETERAN',
    exp: (i + 1) * 250,
  }));

  // 3 Skills as requested
  const skills = [
    { name: '[Skill 1]', rank: 'RANK S', mastery: '98%', element: 'PLASMA', icon: Zap },
    { name: '[Skill 2]', rank: 'RANK S+', mastery: '100%', element: 'QUANTUM', icon: Swords },
    { name: '[Skill 3]', rank: 'RANK S', mastery: '95%', element: 'CYBER', icon: Shield },
  ];

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'projects', 'skills', 'fun-facts', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(customData.email);
    setCopiedEmail(true);
    playGamerSound('powerup');
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const scrollToTop = () => {
    playGamerSound('select');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen bg-[#07090e] text-slate-100 flex flex-col relative selection:bg-emerald-500 selection:text-black font-chakra pb-20 lg:pb-0 overflow-x-hidden ${scanlinesEnabled ? 'gamer-scanlines' : ''}`}>
      
      {/* Background Cyber Matrix Grid & Neon Bloom Orbs */}
      <div className="fixed inset-0 pointer-events-none gamer-grid z-0 opacity-40"></div>
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-10 left-10 w-72 sm:w-96 h-72 sm:h-96 bg-emerald-500/10 rounded-full blur-[100px] sm:blur-[120px]"></div>
        <div className="absolute top-1/2 right-10 w-72 sm:w-96 h-72 sm:h-96 bg-cyan-500/10 rounded-full blur-[110px] sm:blur-[140px]"></div>
        <div className="absolute bottom-10 left-1/3 w-72 sm:w-96 h-72 sm:h-96 bg-fuchsia-600/10 rounded-full blur-[100px] sm:blur-[130px]"></div>
      </div>

      {/* Responsive Top Telemetry Bar */}
      <div className="bg-black/90 border-b border-emerald-500/30 text-[10px] sm:text-[11px] font-mono text-emerald-400/80 px-3 sm:px-4 py-1.5 flex items-center justify-between z-50 backdrop-blur-md overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="font-bold text-emerald-400">STATUS: ONLINE</span>
          </div>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="hidden sm:inline text-slate-400 items-center gap-1">
            <Cpu className="w-3 h-3 text-cyan-400 inline mr-1" />SYS: 100%
          </span>
          <span className="hidden md:inline text-slate-600">|</span>
          <span className="hidden md:inline text-slate-400 items-center gap-1">
            <Wifi className="w-3 h-3 text-emerald-400 inline mr-1" />PING: 14MS
          </span>
          <span className="hidden lg:inline text-slate-600">|</span>
          <span className="hidden lg:inline text-amber-400 items-center gap-1">
            <Trophy className="w-3 h-3 text-amber-400 inline mr-1" />LVL 99
          </span>
        </div>

        {/* Gaming Controls: SFX synth and CRT Scanline toggle */}
        <div className="flex items-center gap-2 shrink-0 ml-2">
          <button
            onClick={() => {
              const next = !soundEnabled;
              setSoundEnabled(next);
              if (next) playGamerSound('powerup');
            }}
            className={`flex items-center gap-1 px-2 py-0.5 rounded border transition-colors min-h-[26px] ${
              soundEnabled
                ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
            title="Toggle 8-bit Audio Synthesizer"
          >
            {soundEnabled ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
            <span className="text-[9px] sm:text-[10px] uppercase font-bold font-mono">
              SFX: {soundEnabled ? 'ON' : 'OFF'}
            </span>
          </button>

          <button
            onClick={() => {
              playGamerSound('click');
              setScanlinesEnabled(!scanlinesEnabled);
            }}
            className={`flex items-center gap-1 px-2 py-0.5 rounded border transition-colors min-h-[26px] ${
              scanlinesEnabled
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
            title="Toggle CRT Scanline Overlay"
          >
            <Tv className="w-3 h-3" />
            <span className="text-[9px] sm:text-[10px] uppercase font-bold font-mono">
              CRT: {scanlinesEnabled ? 'ON' : 'OFF'}
            </span>
          </button>
        </div>
      </div>

      {/* 1. Header/Nav with [Your Name] and adaptive navigation */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-black/85 border-b border-emerald-500/30 transition-all duration-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
          
          {/* Logo / [Your Name] in Gaming Cyber HUD Style */}
          <a
            href="#home"
            onClick={() => playGamerSound('select')}
            className="flex items-center gap-2.5 sm:gap-3 group shrink-0"
          >
            <div className="relative">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-500 p-0.5 shadow-lg shadow-emerald-500/30 group-hover:shadow-emerald-500/60 transition-shadow cut-corner">
                <div className="w-full h-full bg-slate-950 flex items-center justify-center cut-corner">
                  <Gamepad2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
            </div>

            <div className="max-w-[140px] xs:max-w-[190px] sm:max-w-none truncate">
              <div className="text-[9px] sm:text-[10px] font-mono tracking-widest text-emerald-400 uppercase flex items-center gap-1">
                <span>PLAYER_01</span>
                <span className="text-slate-600">//</span>
                <span className="text-cyan-400">READY</span>
              </div>
              <div className="text-base sm:text-xl font-orbitron font-extrabold tracking-wider text-white group-hover:text-emerald-400 transition-colors neon-glow-text truncate">
                {customData.name}
              </div>
            </div>
          </a>

          {/* Desktop Navigation (Visible on lg screens: 1024px and above) */}
          <nav className="hidden lg:flex items-center gap-1.5" aria-label="Desktop navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => playGamerSound('select')}
                  className={`relative px-3.5 xl:px-4 py-2 text-xs xl:text-sm font-orbitron font-bold tracking-wider uppercase transition-all duration-150 cut-corner ${
                    isActive
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/80 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                      : 'text-slate-400 hover:text-emerald-300 hover:bg-slate-900/80 border border-transparent'
                  }`}
                >
                  <span className="text-[10px] text-emerald-500/70 mr-1 font-mono">[{link.code}]</span>
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Quick HUD Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => {
                playGamerSound('click');
                setShowEditGuide(!showEditGuide);
              }}
              className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 text-xs font-mono font-bold uppercase rounded border border-emerald-500/40 bg-slate-950 hover:bg-emerald-950/40 text-emerald-400 transition-all min-h-[36px]"
              title="View HTML instructions & replacement tags"
            >
              <FileCode className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">HTML Guide</span>
            </button>

            <button
              onClick={() => {
                playGamerSound('click');
                setIsCustomizing(!isCustomizing);
              }}
              className="inline-flex items-center gap-1 px-2.5 sm:px-3.5 py-1.5 text-xs font-orbitron font-bold uppercase bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black shadow-md shadow-emerald-500/20 transition-all cut-corner min-h-[36px]"
              title="Test replacement preview"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Customize</span>
              <span className="sm:hidden">Edit</span>
            </button>

            {/* Mobile / Tablet Menu Button (Visible below lg: 1024px) */}
            <button
              onClick={() => {
                playGamerSound('click');
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="lg:hidden p-2 rounded border border-emerald-500/40 bg-slate-900 text-emerald-400 hover:bg-slate-800 focus:outline-none min-h-[38px] min-w-[38px] flex items-center justify-center"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Tablet & Mobile Slide-Down / Dropdown Navigation (Adapts smoothly) */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-emerald-500/40 bg-black/95 px-4 pt-3 pb-6 space-y-2 backdrop-blur-2xl animate-in slide-in-from-top-2 duration-200">
            <div className="text-[10px] font-mono text-emerald-500 uppercase px-1 pb-1 flex items-center justify-between border-b border-slate-800">
              <span>NAV_HUD // TABLET & MOBILE</span>
              <span>SELECT DESTINATION</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => {
                      playGamerSound('select');
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center justify-between px-4 py-3 rounded-lg border font-orbitron text-xs sm:text-sm uppercase transition-all min-h-[46px] ${
                      isActive
                        ? 'border-emerald-400 bg-emerald-500/20 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                        : 'border-slate-800 hover:border-emerald-500/50 bg-slate-950 text-slate-300 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-emerald-400" />
                      <span>{link.name}</span>
                    </div>
                    <span className="text-xs font-mono text-emerald-500">[{link.code}]</span>
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Floating Bottom Quick-Navigation Dock for Mobile & Tablet (Thumb-friendly UX) */}
      <nav 
        aria-label="Mobile Bottom Navigation"
        className="lg:hidden fixed bottom-3 inset-x-3 sm:inset-x-6 z-40 bg-slate-950/90 border border-emerald-500/40 rounded-2xl p-1.5 backdrop-blur-xl shadow-2xl shadow-black cut-corner flex items-center justify-around"
      >
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = activeSection === link.href.substring(1);
          return (
            <a
              key={link.name}
              href={link.href}
              onClick={() => playGamerSound('select')}
              className={`flex-1 py-1.5 px-1 rounded-xl flex flex-col items-center justify-center transition-all min-h-[44px] ${
                isActive
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/60'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400 scale-110' : 'text-slate-400'}`} />
              <span className="text-[10px] font-orbitron font-bold uppercase mt-1 leading-tight tracking-wider truncate max-w-[65px]">
                {link.name}
              </span>
            </a>
          );
        })}
      </nav>

      {/* HTML Comments & Replacement Guide (Collapsible Drawer) */}
      {showEditGuide && (
        <aside aria-label="Gamer HUD HTML Comments Guide" className="relative z-30 bg-black/95 border-b border-emerald-500/40 p-4 text-xs font-mono text-slate-300 backdrop-blur-md">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div className="space-y-1">
              <p className="font-bold text-emerald-400 flex items-center gap-2 font-orbitron">
                <Terminal className="w-4 h-4 text-emerald-400" />
                HTML COMMENTS REPLACEMENT LOCATIONS
              </p>
              <p className="text-slate-400 text-[11px] sm:text-xs">
                In your source code, swap the placeholders at:
                <code className="mx-1 px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/80">
                  &lt;!-- REPLACE PROFILE IMAGE HERE --&gt;
                </code>
                ,
                <code className="mx-1 px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/80">
                  &lt;!-- REPLACE PERSONAL IMAGE HERE --&gt;
                </code>
                , and
                <code className="mx-1 px-1.5 py-0.5 rounded bg-fuchsia-950/80 text-fuchsia-300 border border-fuchsia-800/80">
                  &lt;!-- REPLACE PERSONAL VIDEO HERE --&gt;
                </code>
                .
              </p>
            </div>
            <button
              onClick={() => setShowEditGuide(false)}
              className="text-slate-400 hover:text-emerald-400 px-3 py-1.5 bg-slate-900 rounded border border-slate-700 self-end md:self-auto min-h-[36px]"
            >
              [CLOSE]
            </button>
          </div>
        </aside>
      )}

      {/* Live Customizer Preview Drawer */}
      {isCustomizing && (
        <aside aria-label="Live Customizer" className="relative z-30 bg-black/95 border-b border-cyan-500/40 p-4 backdrop-blur-md">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs sm:text-sm font-bold text-white font-orbitron uppercase tracking-wider">
                  Live Placeholder Previewer
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    playGamerSound('click');
                    setCustomData(defaultValues);
                  }}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 font-mono min-h-[32px]"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span className="hidden sm:inline">Reset Defaults</span>
                  <span className="sm:hidden">Reset</span>
                </button>
                <button
                  onClick={() => setIsCustomizing(false)}
                  className="text-slate-400 hover:text-white text-xs px-2.5 py-1 rounded bg-slate-900 border border-slate-800 font-mono min-h-[32px]"
                >
                  [X]
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
              <div>
                <label className="block text-emerald-400 mb-1">Your Name</label>
                <input
                  type="text"
                  value={customData.name}
                  onChange={(e) => setCustomData({ ...customData, name: e.target.value })}
                  className="w-full bg-slate-950 border border-emerald-500/50 rounded px-2.5 py-2 text-white focus:border-cyan-400 focus:outline-none min-h-[38px]"
                />
              </div>
              <div>
                <label className="block text-emerald-400 mb-1">Your Short Introduction</label>
                <input
                  type="text"
                  value={customData.shortIntro}
                  onChange={(e) => setCustomData({ ...customData, shortIntro: e.target.value })}
                  className="w-full bg-slate-950 border border-emerald-500/50 rounded px-2.5 py-2 text-white focus:border-cyan-400 focus:outline-none min-h-[38px]"
                />
              </div>
              <div>
                <label className="block text-emerald-400 mb-1">Your Email</label>
                <input
                  type="text"
                  value={customData.email}
                  onChange={(e) => setCustomData({ ...customData, email: e.target.value })}
                  className="w-full bg-slate-950 border border-emerald-500/50 rounded px-2.5 py-2 text-white focus:border-cyan-400 focus:outline-none min-h-[38px]"
                />
              </div>
              <div>
                <label className="block text-emerald-400 mb-1">Your GitHub URL</label>
                <input
                  type="text"
                  value={customData.github}
                  onChange={(e) => setCustomData({ ...customData, github: e.target.value })}
                  className="w-full bg-slate-950 border border-emerald-500/50 rounded px-2.5 py-2 text-white focus:border-cyan-400 focus:outline-none min-h-[38px]"
                />
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* Main Content Area */}
      <main className="flex-1 relative z-10">

        {/* 2. Attractive Homepage: Hero & About Me */}
        <section id="home" className="pt-8 sm:pt-12 pb-16 sm:pb-20 md:py-24 border-b border-emerald-500/20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
              
              {/* Left Column: Player Info & CTA */}
              <div className="lg:col-span-7 space-y-5 sm:space-y-6">
                
                {/* Gamer Rank Badge */}
                <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 text-[11px] sm:text-xs font-mono tracking-wider uppercase">
                  <Crosshair className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
                  <span>CHARACTER CLASS: DEVELOPER // RANK S</span>
                </div>

                {/* Hero Title */}
                <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-orbitron font-extrabold tracking-tight text-white leading-[1.1] break-words">
                  PLAYER 01 <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-300 neon-glow-text">
                    {customData.name}
                  </span>
                </h1>

                {/* Short Introduction */}
                <div className="relative pl-3.5 sm:pl-4 border-l-2 border-emerald-500/70 py-1">
                  <p className="text-base sm:text-lg md:text-xl text-slate-300 font-light leading-relaxed">
                    {customData.shortIntro}
                  </p>
                </div>

                {/* Gamer Stats HUD Bar (Responsive 1-col on mobile, 3-col on tablet/desktop) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-1 max-w-lg font-mono text-xs">
                  <div className="bg-slate-900/90 border border-emerald-500/30 p-2.5 rounded cut-corner">
                    <span className="text-slate-500 block text-[10px]">HP // ENERGY</span>
                    <div className="flex items-center gap-1.5 mt-1">
                      <div className="h-2 flex-1 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-400 w-full animate-pulse"></div>
                      </div>
                      <span className="text-emerald-400 font-bold">100%</span>
                    </div>
                  </div>

                  <div className="bg-slate-900/90 border border-cyan-500/30 p-2.5 rounded cut-corner">
                    <span className="text-slate-500 block text-[10px]">MANA // FOCUS</span>
                    <div className="flex items-center gap-1.5 mt-1">
                      <div className="h-2 flex-1 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-400 w-[95%]"></div>
                      </div>
                      <span className="text-cyan-400 font-bold">95%</span>
                    </div>
                  </div>

                  <div className="bg-slate-900/90 border border-fuchsia-500/30 p-2.5 rounded cut-corner">
                    <span className="text-slate-500 block text-[10px]">QUESTS // READY</span>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-fuchsia-400 font-bold">10 / 10</span>
                      <Trophy className="w-3.5 h-3.5 text-fuchsia-400" />
                    </div>
                  </div>
                </div>

                {/* View My Projects Button & Contact */}
                <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                  <a
                    href="#projects"
                    onClick={() => playGamerSound('powerup')}
                    className="group relative inline-flex items-center justify-center gap-3 px-6 sm:px-7 py-3.5 sm:py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black font-orbitron font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/60 cut-corner-lg transition-all active:scale-95 min-h-[48px]"
                  >
                    <span>VIEW MY PROJECTS</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>

                  <a
                    href="#contact"
                    onClick={() => playGamerSound('select')}
                    className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-emerald-300 font-orbitron font-bold text-xs uppercase tracking-wider border border-slate-700 hover:border-emerald-500/60 cut-corner transition-all min-h-[48px]"
                  >
                    <Radio className="w-4 h-4 text-emerald-400" />
                    <span>OPEN COMMS</span>
                  </a>
                </div>

              </div>

              {/* Right Column: Player Profile Avatar in Cyberpunk HUD Frame */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <div className="w-full max-w-xs sm:max-w-sm md:max-w-md">
                  
                  {/* HTML Comment showing where to replace with actual image */}
                  {/* <!-- REPLACE PROFILE IMAGE HERE:
                       Replace the gamer avatar HUD placeholder below with your real photo:
                       <img 
                         src="/path-to-your-avatar.jpg" 
                         alt="[Your Name]" 
                         className="w-full h-full object-cover rounded-xl border border-emerald-500/50" 
                       />
                  --> */}
                  <div className="relative group">
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 opacity-30 group-hover:opacity-60 blur-xl transition duration-500"></div>

                    <div className="relative bg-slate-950/95 border-2 border-emerald-500/60 p-5 sm:p-6 rounded-2xl cut-corner-lg neon-border-emerald">
                      
                      {/* Top HUD Telemetry */}
                      <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-emerald-400 border-b border-emerald-500/20 pb-2.5 mb-4">
                        <span className="flex items-center gap-1 font-bold">
                          <Crosshair className="w-3.5 h-3.5" />
                          AVATAR_HUD_V2.6
                        </span>
                        <span className="text-cyan-400 font-bold">[SYNCED]</span>
                      </div>

                      {/* Main Placeholder Screen */}
                      <div className="aspect-square w-full bg-slate-900/90 border border-dashed border-emerald-500/40 rounded-xl p-4 sm:p-6 flex flex-col items-center justify-center text-center relative overflow-hidden group-hover:border-emerald-400 transition-colors">
                        
                        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-10">
                          <div className="w-36 sm:w-44 h-36 sm:h-44 rounded-full border-2 border-emerald-400"></div>
                        </div>

                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-3 sm:mb-4 shadow-inner">
                          <User className="w-8 h-8 sm:w-10 sm:h-10" />
                        </div>

                        <div className="space-y-1.5 relative z-10">
                          <p className="font-mono text-xs font-bold text-emerald-300 bg-emerald-950/90 px-3 py-1.5 rounded border border-emerald-700 shadow-md inline-block">
                            [INSERT PROFILE IMAGE HERE]
                          </p>
                          <p className="text-[10px] sm:text-[11px] text-slate-400 font-mono max-w-xs mx-auto">
                            Profile image placeholder. Refer to HTML comments in code to swap with an image tag.
                          </p>
                        </div>

                        <div className="mt-4 flex items-center gap-1.5 text-[9px] sm:text-[10px] text-emerald-400/80 font-mono bg-black/60 px-2.5 py-1 rounded border border-emerald-900">
                          <FileCode className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span className="truncate">&lt;!-- REPLACE PROFILE IMAGE HERE --&gt;</span>
                        </div>
                      </div>

                      {/* Bottom HUD stats */}
                      <div className="mt-3.5 pt-2.5 border-t border-emerald-500/20 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-slate-400">
                        <span>XP: 999,999</span>
                        <span className="text-emerald-400 font-bold">READY TO PLAY</span>
                      </div>

                    </div>
                  </div>

                </div>
              </div>

            </div>

            {/* About Me Section (without inventing any information) */}
            <div className="mt-16 sm:mt-20 pt-12 sm:pt-16 border-t border-emerald-500/20">
              <div className="max-w-4xl mb-8 sm:mb-10">
                <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-2">
                  <Terminal className="w-4 h-4" />
                  ARCHIVE // CHARACTER LORE
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-orbitron font-bold tracking-tight text-white mb-4 flex items-center gap-3">
                  About Me
                </h2>
                
                <div className="p-5 sm:p-7 rounded-2xl bg-slate-950/90 border border-emerald-500/30 text-slate-200 text-sm sm:text-base leading-relaxed cut-corner relative">
                  <div className="absolute top-2 right-3 text-[9px] sm:text-[10px] font-mono text-emerald-500/60">
                    BIO_RECORD #001
                  </div>
                  <p className="font-mono text-emerald-300/90 leading-relaxed">
                    {customData.aboutMe}
                  </p>
                </div>
              </div>

              {/* My Interests & My Goals (Responsive 1-col on mobile, 2-col on tablet/desktop) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                
                {/* My Interests */}
                <div className="p-5 sm:p-7 rounded-2xl bg-slate-950/90 border border-cyan-500/30 hover:border-cyan-400/70 transition-colors cut-corner neon-border-cyan">
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                        <Compass className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[9px] sm:text-[10px] font-mono text-cyan-400 uppercase tracking-widest block">PASSIVES & FOCUS</span>
                        <h3 className="text-lg sm:text-xl font-orbitron font-bold text-white">My Interests</h3>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-cyan-400">[DATA]</span>
                  </div>
                  
                  <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/80 border border-cyan-500/20 text-slate-200 font-mono text-xs sm:text-sm">
                    {customData.interests}
                  </div>
                </div>

                {/* My Goals */}
                <div className="p-5 sm:p-7 rounded-2xl bg-slate-950/90 border border-fuchsia-500/30 hover:border-fuchsia-400/70 transition-colors cut-corner neon-border-magenta">
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-fuchsia-500/10 border border-fuchsia-500/30 flex items-center justify-center text-fuchsia-400">
                        <Target className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[9px] sm:text-[10px] font-mono text-fuchsia-400 uppercase tracking-widest block">MAIN CAMPAIGN</span>
                        <h3 className="text-lg sm:text-xl font-orbitron font-bold text-white">My Goals</h3>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-fuchsia-400">[OBJECTIVES]</span>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-xl bg-slate-900/80 border border-fuchsia-500/20 text-slate-200 font-mono text-xs sm:text-sm">
                    {customData.goals}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* 3. Projects Section - 10 empty cards (Responsive: 1-col on mobile, 2-col on tablet, 3-col on desktop) */}
        <section id="projects" className="py-16 sm:py-20 border-b border-emerald-500/20 bg-black/60 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4">
              <div>
                <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-2">
                  <Layers className="w-4 h-4" />
                  QUEST LOG // MISSION ARCHIVE
                </div>
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-orbitron font-extrabold tracking-tight text-white">
                  Projects
                </h2>
                <p className="text-slate-400 mt-2 max-w-xl font-chakra text-sm sm:text-base">
                  Active campaigns and completed dungeons. Below are 10 empty mission cards ready for your builds.
                </p>
              </div>

              <div className="text-xs font-mono text-emerald-400 bg-slate-950 px-3.5 py-2 rounded border border-emerald-500/40 flex items-center gap-2 self-start md:self-auto">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>MISSIONS AVAILABLE: 10</span>
              </div>
            </div>

            {/* 10 Empty Project Cards - Grid adapts to mobile (1 col), tablet (2 col), desktop (3 col) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {projects.map((project) => (
                <article
                  key={project.id}
                  className="group rounded-2xl bg-slate-950/90 border border-slate-800 hover:border-emerald-500/60 flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1.5 cut-corner"
                >
                  {/* Top card telemetry bar */}
                  <div className="bg-slate-900/90 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-emerald-400 font-bold">QUEST #{String(project.id).padStart(2, '0')}</span>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                      project.difficulty === 'NIGHTMARE' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                      project.difficulty === 'HARD' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                      'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                    }`}>
                      {project.difficulty}
                    </span>
                  </div>

                  {/* Project image placeholder */}
                  {/* <!-- REPLACE PROJECT IMAGE:
                       Replace the container below with your actual project screenshot:
                       <img src="/path-to-screenshot.jpg" alt="Project preview" className="w-full h-44 object-cover" />
                  --> */}
                  <div className="relative h-40 sm:h-44 w-full bg-black/80 border-b border-dashed border-slate-800 p-4 flex flex-col items-center justify-center text-center group-hover:bg-slate-900/40 transition-colors">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2 group-hover:scale-110 transition-transform">
                      <ImageIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <span className="font-mono text-xs font-bold text-emerald-300 bg-emerald-950/90 px-2.5 py-1 rounded border border-emerald-800/80">
                      [INSERT PROJECT IMAGE HERE]
                    </span>
                    <span className="text-[10px] text-slate-500 mt-1 font-mono">
                      Card #{project.id} Placeholder
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Project Title */}
                      <h3 className="text-base sm:text-lg font-orbitron font-bold text-white group-hover:text-emerald-300 transition-colors mb-2">
                        {project.title}
                      </h3>

                      {/* Short Description */}
                      <p className="text-xs sm:text-sm text-slate-400 mb-4 line-clamp-3 font-chakra">
                        {project.description}
                      </p>

                      {/* Technologies used */}
                      <div className="mb-5 sm:mb-6">
                        <span className="text-[10px] sm:text-[11px] font-mono font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                          TECH ARSENAL
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {project.technologies.map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 rounded text-xs font-mono font-medium bg-slate-900 text-cyan-300 border border-slate-800"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action buttons: View Live App & View Code (Touch-friendly minimum 44px) */}
                    <div className="grid grid-cols-2 gap-2 pt-3.5 border-t border-slate-800/80 font-orbitron">
                      <a
                        href={project.liveUrl}
                        onClick={() => playGamerSound('click')}
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded bg-emerald-600 hover:bg-emerald-500 text-black text-xs font-bold transition-all shadow-md shadow-emerald-600/20 min-h-[44px]"
                        title="View Live App"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live App</span>
                      </a>
                      <a
                        href={project.codeUrl}
                        onClick={() => playGamerSound('click')}
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-bold border border-slate-700 transition-all min-h-[44px]"
                        title="View Code"
                      >
                        <Code2 className="w-3.5 h-3.5 text-slate-400" />
                        <span>Code</span>
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>

          </div>
        </section>

        {/* 4. Skills Section - 3 skills (Responsive: 1-col on mobile, 3-col on tablet/desktop) */}
        <section id="skills" className="py-16 sm:py-20 border-b border-emerald-500/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="max-w-2xl mb-10 sm:mb-12">
              <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-2">
                <Flame className="w-4 h-4" />
                SKILL TREE // PRIMARY ABILITIES
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-orbitron font-extrabold tracking-tight text-white">
                Skills
              </h2>
              <p className="text-slate-400 mt-2 font-chakra text-sm sm:text-base">
                Mastery specialization slots. 3 core skills configured for your loadout.
              </p>
            </div>

            {/* 3 Skills Grid (Adapts to tablet & desktop) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
              {skills.map((skill, index) => {
                const IconComponent = skill.icon;
                return (
                  <div
                    key={index}
                    className="group relative p-6 sm:p-8 rounded-2xl bg-slate-950/90 border border-slate-800 hover:border-emerald-500/60 hover:bg-slate-900/60 transition-all duration-300 flex flex-col justify-between cut-corner-lg neon-border-emerald hover:-translate-y-1"
                  >
                    <div>
                      {/* Top Skill Badges */}
                      <div className="flex items-center justify-between mb-5 sm:mb-6">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:border-emerald-400 transition-all shadow-lg shadow-emerald-500/10">
                          <IconComponent className="w-6 h-6 sm:w-7 sm:h-7" />
                        </div>
                        <div className="text-right">
                          <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-600 font-mono text-xs font-bold block mb-1">
                            {skill.rank}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500 uppercase">
                            SLOT 0{index + 1}
                          </span>
                        </div>
                      </div>

                      {/* Skill Name */}
                      <h3 className="font-orbitron text-xl sm:text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors mb-2">
                        {skill.name}
                      </h3>

                      <p className="text-xs font-mono text-slate-400 mb-6">
                        ATTRIBUTE: <span className="text-cyan-400 font-bold">{skill.element}</span> // SPEC
                      </p>
                    </div>

                    {/* Mastery Level Bar */}
                    <div className="pt-4 border-t border-slate-800">
                      <div className="flex items-center justify-between text-xs font-mono mb-2">
                        <span className="text-slate-400">MASTERY LEVEL</span>
                        <span className="text-emerald-400 font-bold">{skill.mastery}</span>
                      </div>
                      <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full"
                          style={{ width: skill.mastery }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* 5. Fun Facts & Creative Page About Me */}
        <section id="fun-facts" className="py-16 sm:py-20 border-b border-emerald-500/20 bg-black/60 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
            
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4" />
                SECRET DISCOVERIES // LORE
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-orbitron font-extrabold tracking-tight text-white">
                Fun Facts & Personal Lore
              </h2>
              <p className="text-slate-400 mt-2 max-w-xl font-chakra text-sm sm:text-base">
                Character trivia, unlocked achievements, and media archives.
              </p>
            </div>

            {/* Three Fun Facts (Achievements Unlocked - Responsive grid) */}
            <div>
              <h3 className="text-lg sm:text-xl font-orbitron font-bold text-white mb-5 sm:mb-6 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                Three Fun Facts
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {[
                  { id: 1, text: customData.funFact1, label: 'ACHIEVEMENT #01' },
                  { id: 2, text: customData.funFact2, label: 'ACHIEVEMENT #02' },
                  { id: 3, text: customData.funFact3, label: 'ACHIEVEMENT #03' },
                ].map((fact) => (
                  <div
                    key={fact.id}
                    className="p-5 sm:p-7 rounded-2xl bg-slate-950/90 border border-slate-800 hover:border-amber-500/50 transition-colors flex flex-col justify-between cut-corner"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-mono font-bold text-xs">
                          #{fact.id}
                        </span>
                        <span className="text-[10px] font-mono text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800">
                          UNLOCKED
                        </span>
                      </div>
                      <p className="text-slate-200 font-mono text-xs sm:text-sm leading-relaxed">
                        {fact.text}
                      </p>
                    </div>
                    <span className="text-[11px] font-mono text-slate-500 mt-5 sm:mt-6 block">
                      {fact.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* My Hobbies & My Favorite Things (Responsive 1-col on mobile, 2-col on desktop) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              
              {/* My Hobbies */}
              <div className="p-6 sm:p-8 rounded-2xl bg-slate-950/90 border border-cyan-500/30 cut-corner">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg sm:text-xl font-orbitron font-bold text-white flex items-center gap-2">
                    <Compass className="w-5 h-5 text-cyan-400" />
                    My Hobbies
                  </h3>
                  <span className="text-[10px] font-mono text-cyan-400">[SIDE QUESTS]</span>
                </div>
                <p className="text-xs text-slate-400 mb-4 font-chakra">
                  Activities and downtime adventures outside the main questline:
                </p>
                <div className="p-4 sm:p-5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200 font-mono text-xs sm:text-sm leading-relaxed">
                  {customData.hobbies}
                </div>
              </div>

              {/* My Favorite Things */}
              <div className="p-6 sm:p-8 rounded-2xl bg-slate-950/90 border border-fuchsia-500/30 cut-corner">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg sm:text-xl font-orbitron font-bold text-white flex items-center gap-2">
                    <Heart className="w-5 h-5 text-rose-400" />
                    My Favorite Things
                  </h3>
                  <span className="text-[10px] font-mono text-rose-400">[LEGENDARY LOOT]</span>
                </div>
                <p className="text-xs text-slate-400 mb-4 font-chakra">
                  Three items and experiences with the highest affinity:
                </p>
                <div className="space-y-2.5 sm:space-y-3 font-mono text-xs sm:text-sm">
                  {[
                    { val: customData.favoriteThing1, label: 'Loot 01' },
                    { val: customData.favoriteThing2, label: 'Loot 02' },
                    { val: customData.favoriteThing3, label: 'Loot 03' },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="p-3 sm:p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-3 text-slate-200"
                    >
                      <span className="w-6 h-6 rounded bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono font-bold flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      <span className="font-medium truncate">{item.val}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Media Section: Image Placeholder & Video Placeholder with HTML comments */}
            <div>
              <div className="mb-5 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-orbitron font-bold text-white flex items-center gap-2">
                  <Tv className="w-5 h-5 text-emerald-400" />
                  Media Section
                </h3>
                <p className="text-slate-400 text-xs mt-1 font-mono">
                  Personal photo and video placeholders. Replace via HTML comments in code.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                
                {/* 1. Personal Image Placeholder */}
                {/* <!-- REPLACE PERSONAL IMAGE HERE:
                     Replace the container below with your personal image:
                     <img 
                       src="/your-personal-photo.jpg" 
                       alt="Personal showcase" 
                       className="w-full h-64 sm:h-72 object-cover rounded-xl border border-emerald-500/50 shadow-lg" 
                     />
                --> */}
                <div className="p-6 sm:p-8 rounded-2xl bg-slate-950/90 border-2 border-dashed border-emerald-500/40 hover:border-emerald-400 transition-colors flex flex-col items-center justify-center text-center min-h-[280px] sm:min-h-[320px] cut-corner">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3 sm:mb-4">
                    <ImageIcon className="w-7 h-7 sm:w-8 sm:h-8" />
                  </div>
                  <div className="space-y-1.5 max-w-sm">
                    <p className="font-mono text-sm sm:text-base font-bold text-emerald-300 bg-emerald-950/90 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded border border-emerald-700 inline-block shadow-md">
                      [INSERT IMAGE HERE]
                    </p>
                    <p className="text-xs text-slate-400 font-mono">
                      Personal Image Placeholder
                    </p>
                  </div>
                  <div className="mt-5 flex items-center gap-1.5 text-[10px] sm:text-xs font-mono text-emerald-400/80 bg-black/60 px-2.5 sm:px-3 py-1.5 rounded border border-emerald-900 max-w-full overflow-hidden">
                    <FileCode className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">&lt;!-- REPLACE PERSONAL IMAGE HERE --&gt;</span>
                  </div>
                </div>

                {/* 2. Personal Video Placeholder */}
                {/* <!-- REPLACE PERSONAL VIDEO HERE:
                     Replace the container below with your personal video or embed:
                     <video controls className="w-full h-64 sm:h-72 object-cover rounded-xl border border-cyan-500/50 shadow-lg">
                       <source src="/your-video.mp4" type="video/mp4" />
                       Your browser does not support the video tag.
                     </video>
                     Or for a YouTube/Twitch embed:
                     <iframe 
                       src="https://www.youtube.com/embed/YOUR_VIDEO_ID" 
                       className="w-full h-64 sm:h-72 rounded-xl" 
                       allowFullScreen 
                     />
                --> */}
                <div className="p-6 sm:p-8 rounded-2xl bg-slate-950/90 border-2 border-dashed border-cyan-500/40 hover:border-cyan-400 transition-colors flex flex-col items-center justify-center text-center min-h-[280px] sm:min-h-[320px] cut-corner">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3 sm:mb-4">
                    <Video className="w-7 h-7 sm:w-8 sm:h-8" />
                  </div>
                  <div className="space-y-1.5 max-w-sm">
                    <p className="font-mono text-sm sm:text-base font-bold text-cyan-300 bg-cyan-950/90 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded border border-cyan-700 inline-block shadow-md">
                      [INSERT VIDEO HERE]
                    </p>
                    <p className="text-xs text-slate-400 font-mono">
                      Personal Video / Reel Placeholder
                    </p>
                  </div>
                  <div className="mt-5 flex items-center gap-1.5 text-[10px] sm:text-xs font-mono text-cyan-400/80 bg-black/60 px-2.5 sm:px-3 py-1.5 rounded border border-cyan-900 max-w-full overflow-hidden">
                    <FileCode className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="truncate">&lt;!-- REPLACE PERSONAL VIDEO HERE --&gt;</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* 6. Contact Page / Section (Transmission Terminal) */}
        <section id="contact" className="py-16 sm:py-20 border-b border-emerald-500/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="max-w-3xl mx-auto text-center space-y-3 sm:space-y-4 mb-10 sm:mb-12">
              <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-mono uppercase tracking-wider">
                <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                SECURE COMMS TERMINAL
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-orbitron font-extrabold tracking-tight text-white">
                Contact Information
              </h2>
              <p className="text-slate-400 max-w-xl mx-auto font-chakra text-sm sm:text-base">
                Transmit your message through subspace frequency or inspect git repositories.
              </p>
            </div>

            {/* Contact details cards */}
            <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              
              {/* Email Card */}
              <div className="p-6 sm:p-8 rounded-2xl bg-slate-950/90 border border-emerald-500/40 hover:border-emerald-400 transition-all flex flex-col justify-between cut-corner neon-border-emerald">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                      <Radio className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/90 px-2 py-0.5 rounded border border-emerald-800">
                      FREQUENCY
                    </span>
                  </div>
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                    Email
                  </span>
                  <p className="text-base sm:text-lg font-bold text-white font-mono break-all mb-4">
                    {customData.email}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-4 border-t border-slate-800">
                  <a
                    href={`mailto:${customData.email}`}
                    onClick={() => playGamerSound('powerup')}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded bg-emerald-600 hover:bg-emerald-500 text-black text-xs font-orbitron font-bold transition-all shadow-md shadow-emerald-600/20 min-h-[44px]"
                  >
                    <span>LAUNCH COMMS</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-mono font-bold border border-slate-700 transition-colors min-h-[44px]"
                    title="Copy Email Address"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400">COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>COPY</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* GitHub Card */}
              <div className="p-6 sm:p-8 rounded-2xl bg-slate-950/90 border border-cyan-500/40 hover:border-cyan-400 transition-all flex flex-col justify-between cut-corner neon-border-cyan">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
                      <Code2 className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/90 px-2 py-0.5 rounded border border-cyan-800">
                      REPOSITORY
                    </span>
                  </div>
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                    GitHub
                  </span>
                  <p className="text-base sm:text-lg font-bold text-white font-mono break-all mb-4">
                    {customData.github}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800">
                  <a
                    href={customData.github.startsWith('http') ? customData.github : `https://${customData.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playGamerSound('select')}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded bg-slate-900 hover:bg-slate-800 text-cyan-300 hover:text-white text-xs font-orbitron font-bold border border-cyan-500/40 transition-colors min-h-[44px]"
                  >
                    <span>OPEN REPO NEXUS</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>

            {/* Quick message transmission terminal (Mobile friendly form) */}
            <div className="max-w-3xl mx-auto mt-10 sm:mt-12 p-5 sm:p-8 rounded-2xl bg-slate-950/80 border border-slate-800 cut-corner">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm sm:text-base font-orbitron font-bold text-white">TRANSMIT PACKET</h3>
                <span className="text-[9px] sm:text-[10px] font-mono text-emerald-400">ENCRYPTION: AES-256</span>
              </div>
              <p className="text-xs text-slate-400 mb-5 sm:mb-6 font-chakra">
                Send a direct transmission for co-op campaigns, contract quests, or guild invites.
              </p>
              
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  playGamerSound('powerup');
                  alert('Transmission dispatched successfully! Replace with your desired form API.');
                }}
                className="space-y-4 text-xs font-mono"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1.5 font-bold">CALLSIGN // NAME</label>
                    <input
                      type="text"
                      placeholder="Player Name"
                      required
                      className="w-full bg-black border border-slate-800 rounded px-3.5 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 min-h-[42px]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1.5 font-bold">SUB-COMMS // EMAIL</label>
                    <input
                      type="email"
                      placeholder="player@nexus.gg"
                      required
                      className="w-full bg-black border border-slate-800 rounded px-3.5 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 min-h-[42px]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1.5 font-bold">MESSAGE PACKET</label>
                  <textarea
                    rows={4}
                    placeholder="Enter quest parameters..."
                    required
                    className="w-full bg-black border border-slate-800 rounded px-3.5 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black font-orbitron font-bold text-xs uppercase tracking-wider transition-all cut-corner cursor-pointer shadow-lg shadow-emerald-500/20 active:scale-95 min-h-[44px]"
                >
                  DISPATCH TRANSMISSION
                </button>
              </form>
            </div>

          </div>
        </section>

      </main>

      {/* 7. Footer - contact links (email, GitHub) */}
      <footer className="bg-black border-t border-emerald-500/30 py-10 sm:py-12 relative z-10 text-xs font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left: Name and Copyright */}
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-8 h-8 rounded bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold shrink-0">
              <Gamepad2 className="w-4 h-4" />
            </div>
            <div>
              <p className="font-orbitron font-bold text-white tracking-wider">{customData.name}</p>
              <p className="text-slate-500 text-[10px] sm:text-[11px]">
                &copy; {new Date().getFullYear()} {customData.name}. GAME OVER? NEVER. PRESS START TO CONTINUE.
              </p>
            </div>
          </div>

          {/* Center: Navigation shortcut (Desktop / Tablet view) */}
          <div className="hidden sm:flex items-center gap-4 sm:gap-6 text-slate-400 font-orbitron uppercase text-[11px]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => playGamerSound('select')}
                className="hover:text-emerald-400 transition-colors py-1"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right: Contact Links & Back to top */}
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${customData.email}`}
              onClick={() => playGamerSound('click')}
              className="p-2.5 rounded bg-slate-950 hover:bg-emerald-950 text-slate-400 hover:text-emerald-400 border border-slate-800 hover:border-emerald-500 transition-all min-h-[40px] min-w-[40px] flex items-center justify-center"
              title="Email"
              aria-label="Send email"
            >
              <Radio className="w-4 h-4" />
            </a>

            <a
              href={customData.github.startsWith('http') ? customData.github : `https://${customData.github}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playGamerSound('click')}
              className="p-2.5 rounded bg-slate-950 hover:bg-cyan-950 text-slate-400 hover:text-cyan-400 border border-slate-800 hover:border-cyan-500 transition-all min-h-[40px] min-w-[40px] flex items-center justify-center"
              title="GitHub"
              aria-label="Open GitHub"
            >
              <Code2 className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 transition-all ml-1 min-h-[40px] min-w-[40px] flex items-center justify-center cursor-pointer"
              title="Respawn to Top"
              aria-label="Back to top"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>

        </div>
      </footer>

    </div>
  );
}
