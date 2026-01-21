import React, { useState, useRef, useEffect } from 'react';
import { VoiceName, AppPhase, UserState, Partner, Language, GenderType, MoodId } from './types';
import { generateMeltyAudio } from './services/geminiService';
import { decodeGeminiAudio, playASMRBuffer, AudioController } from './utils/audioUtils';
import BackgroundAnimation from './components/BackgroundAnimation';
import { MOOD_DISPLAY_NAMES } from './data/scriptData';

// --- Localized Text Assets ---
const UI_TEXT = {
  ja: {
    welcome: {
      title: "溶ける？",
      subtitle: "Melty Whisper",
      cta: "とろける",
    },
    customize: {
      title: "MELTY WHISPER",
      headline: "今夜、隣にいるのは？",
      namePlaceholder: "なんて呼べばいい？",
      nameResponse: (name: string) => `${name}…ふふ、素敵な名前。`,
      confirm: "このパートナーにする",
    },
    mood: {
      title: "今夜はどんな気分？？",
      subtitle: "あなたの心に近いものを選んで",
      connect: "イヤホン越しにつながる",
    },
    connect: {
      status: "安らぎの時間へ...",
      detail: "あなたのための声を準備しています",
      messages: [
        "今日もお疲れ様でした...",
        "深く深呼吸をして...",
        "肩の力を抜いて...",
        "今日はよく頑張りましたね...",
        "ゆっくり、目を閉じて...",
        "何も考えず、ただ身を委ねて..."
      ]
    },
    sleep: {
      goodnight: "おやすみ",
      subtitle: "Sweet dreams, my dear",
      visualizer: "SLEEP VISUALIZER",
      end: "もうちょっとだけ…"
    }
  },
  en: {
    welcome: {
      title: "Melt?",
      subtitle: "Deep Sea Dreams",
      cta: "Enter",
    },
    customize: {
      title: "MELTY WHISPER",
      headline: "Who shall whisper to you?",
      namePlaceholder: "What should I call you?",
      nameResponse: (name: string) => `${name}... that's a beautiful name.`,
      confirm: "Select Partner",
    },
    mood: {
      title: "How are you feeling?",
      subtitle: "Select what floats in your heart",
      connect: "Connect via Earphones",
    },
    connect: {
      status: "Preparing Rest...",
      detail: "Creating your sanctuary...",
      messages: [
        "Take a deep breath...",
        "You did well today...",
        "Let go of the tension...",
        "Close your eyes...",
        "Just drift away..."
      ]
    },
    sleep: {
      goodnight: "Goodnight",
      subtitle: "Sweet dreams, my dear",
      visualizer: "SLEEP VISUALIZER",
      end: "Just a little longer..."
    }
  }
};

// --- Partner Data Definition (Bilingual) ---
const PARTNERS: Partner[] = [
  {
    id: 'luna',
    name: { ja: 'ルナ', en: 'Luna' },
    voice: VoiceName.Kore,
    gender: 'Female',
    role: { ja: '甘やかし', en: 'Pampering' },
    description: { ja: '「今日も頑張ったね、えらいえらい」', en: '"You did so well today."' },
    color: 'from-pink-500 to-rose-400',
    promptInstruction: '',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmim2kVWlvKmGx-D-D_f9YyOrYHrVfKO_li4c_3zW9QXCCizLQDnjhhx4jzKNuyU2O_E62V2yZ0apXQOHR9fmj2h2yjNYU6QhRYUqh3m1oGBBJeI2E2aduSedCXYbCQEihvDnURcpg6HPBhCoIzI6aOR5tXBAR_bFWfZ1dGjHkqZpnjldTTb89NmKqDIgJw9PEDLXkfn-pZBqKM_Lvu9DcTJuGrTRvtHAF-5f2p7PTIxhZlUjLj4ShU74ry_L2eVYdJk8jQbCpefes',
    glowColorClass: 'glow-pink'
  },
  {
    id: 'theo',
    name: { ja: 'テオ', en: 'Theo' },
    voice: VoiceName.Zephyr,
    gender: 'Male',
    role: { ja: '全肯定', en: 'Affirming' },
    description: { ja: '「それが君のいいところだよ」', en: '"That is what makes you special."' },
    color: 'from-blue-400 to-indigo-400',
    promptInstruction: '',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpGMnVSLolYlVL-ac2QvpctrbzRTUvPJ5S3PQA3Wu3WfbT4XOPRAPbqJClvBc8Z4DxJiKOBOB52-GaZOw8YDDnMDMitPn1rtGZx_md9BXLlor0zExu1vthoBLpw-p50P-sfdNXbwcknPxswb3OgVDpUmBfR1HsrcEzaIVgrIFLsLyxvixh8CKr-Kv7wbSI6F4yNlmIw4GY8Zu4ikjvhNwxMlcNF31jJH4qlZ3GlaUmqceB2b0xaL8GfH4gZMV8wVN6sVad6jnPNbxt',
    glowColorClass: 'glow-blue'
  },
  {
    id: 'mio',
    name: { ja: 'ミオ', en: 'Mio' },
    voice: VoiceName.Puck,
    gender: 'Neutral',
    role: { ja: 'ミステリアス', en: 'Mysterious' },
    description: { ja: '「ふわふわ、一緒に溶けよう」', en: '"Let\'s melt together..."' },
    color: 'from-violet-400 to-purple-400',
    promptInstruction: '',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3lo-Pe_-ATnlzQtYhFG05bpO41kKtblUQ6a1CRpXZbeASXg_MYpCrVw81UsX4hDRSbI9VDxS-sF9FbdCJdxKn410lMFnRBLQP2QfOu2XfTHDN-pkVftuJ8bxi5UDNR5Ekj9n8uElrl1mJKCiHUTY4TWK8hKytpcF_mcMnfdc1GibP0InWgcXV-2JldnQffXxEGaPUOEl1yIcifjduut83FdtVzSRipVt3haxHcQV7kwAq85pMXEXKKZs0rInw4IEdJTBhXDPYFhPo',
    glowColorClass: 'glow-orange'
  },
  {
    id: 'raven',
    name: { ja: 'レイ', en: 'Raven' },
    voice: VoiceName.Fenrir,
    gender: 'Male',
    role: { ja: 'ツンデレ', en: 'Protective' },
    description: { ja: '「……別に心配してないし」', en: '"I\'m not worried, but..."' },
    color: 'from-slate-500 to-slate-700',
    promptInstruction: '',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpGMnVSLolYlVL-ac2QvpctrbzRTUvPJ5S3PQA3Wu3WfbT4XOPRAPbqJClvBc8Z4DxJiKOBOB52-GaZOw8YDDnMDMitPn1rtGZx_md9BXLlor0zExu1vthoBLpw-p50P-sfdNXbwcknPxswb3OgVDpUmBfR1HsrcEzaIVgrIFLsLyxvixh8CKr-Kv7wbSI6F4yNlmIw4GY8Zu4ikjvhNwxMlcNF31jJH4qlZ3GlaUmqceB2b0xaL8GfH4gZMV8wVN6sVad6jnPNbxt',
    glowColorClass: 'glow-blue'
  },
  {
    id: 'sebastian',
    name: { ja: '黒須', en: 'Sebastian' },
    voice: VoiceName.Charon,
    gender: 'Male',
    role: { ja: '執事', en: 'Butler' },
    description: { ja: '「あなたの幸せが私のすべて」', en: '"Your happiness is my command."' },
    color: 'from-amber-600 to-yellow-700',
    promptInstruction: '',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3lo-Pe_-ATnlzQtYhFG05bpO41kKtblUQ6a1CRpXZbeASXg_MYpCrVw81UsX4hDRSbI9VDxS-sF9FbdCJdxKn410lMFnRBLQP2QfOu2XfTHDN-pkVftuJ8bxi5UDNR5Ekj9n8uElrl1mJKCiHUTY4TWK8hKytpcF_mcMnfdc1GibP0InWgcXV-2JldnQffXxEGaPUOEl1yIcifjduut83FdtVzSRipVt3haxHcQV7kwAq85pMXEXKKZs0rInw4IEdJTBhXDPYFhPo',
    glowColorClass: 'glow-orange'
  },
  {
    id: 'hana',
    name: { ja: 'ハナ', en: 'Hana' },
    voice: VoiceName.Kore,
    gender: 'Female',
    role: { ja: '親友', en: 'Best Friend' },
    description: { ja: '「ねえねえ、聞いてよ！」', en: '"Hey, tell me everything!"' },
    color: 'from-orange-400 to-amber-400',
    promptInstruction: '',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmim2kVWlvKmGx-D-D_f9YyOrYHrVfKO_li4c_3zW9QXCCizLQDnjhhx4jzKNuyU2O_E62V2yZ0apXQOHR9fmj2h2yjNYU6QhRYUqh3m1oGBBJeI2E2aduSedCXYbCQEihvDnURcpg6HPBhCoIzI6aOR5tXBAR_bFWfZ1dGjHkqZpnjldTTb89NmKqDIgJw9PEDLXkfn-pZBqKM_Lvu9DcTJuGrTRvtHAF-5f2p7PTIxhZlUjLj4ShU74ry_L2eVYdJk8jQbCpefes',
    glowColorClass: 'glow-pink'
  }
];

// Positioning data for floating bubbles
const BUBBLE_POSITIONS = [
  { top: '10%', left: '10%', delay: '0s' },
  { top: '15%', right: '15%', delay: '1s' },
  { top: '30%', left: '25%', delay: '2s' },
  { top: '35%', right: '30%', delay: '0.5s' },
  { top: '50%', left: '15%', delay: '1.5s' },
  { top: '55%', right: '20%', delay: '2.5s' },
  { top: '70%', left: '35%', delay: '0.2s' },
  { top: '75%', right: '10%', delay: '1.8s' },
  { top: '85%', left: '10%', delay: '1.2s' },
  { top: '25%', left: '50%', transform: 'translateX(-50%)', delay: '3s' },
];

const App: React.FC = () => {
  // State
  const [phase, setPhase] = useState<AppPhase>('welcome');
  const [lang, setLang] = useState<Language>('ja');
  const [userState, setUserState] = useState<UserState>({
    name: '',
    preferredGender: 'All',
    selectedPartnerId: null,
    selectedMoodId: null,
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);

  // UI States for interactions
  const [showNameResponse, setShowNameResponse] = useState(false);

  // Audio Refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioControllerRef = useRef<AudioController | null>(null);
  const loadingIntervalRef = useRef<number | null>(null);

  // Initialize AudioContext
  const getAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({
        sampleRate: 24000
      });
    }
    return audioContextRef.current;
  };

  // --- Handlers ---

  const handleNextPhase = (next: AppPhase) => {
    setPhase(next);
  };

  const handlePartnerSelect = (id: string) => {
    setUserState(prev => ({ ...prev, selectedPartnerId: id }));
  };

  const handleGenderFilter = (gender: GenderType | 'All') => {
    setUserState(prev => ({ ...prev, preferredGender: gender }));
  };

  const handleMoodSelect = (moodId: MoodId) => {
    setUserState(prev => ({ ...prev, selectedMoodId: moodId }));
  };

  const handleNameBlur = () => {
    if (userState.name.trim().length > 0) {
      setShowNameResponse(true);
    } else {
      setShowNameResponse(false);
    }
  };

  const startLoadingMessages = () => {
    const messages = UI_TEXT[lang].connect.messages;
    setLoadingMessage(messages[0]);
    let index = 0;

    if (loadingIntervalRef.current) clearInterval(loadingIntervalRef.current);

    loadingIntervalRef.current = window.setInterval(() => {
      index = (index + 1) % messages.length;
      setLoadingMessage(messages[index]);
    }, 4000); // Rotate every 4 seconds
  };

  const stopLoadingMessages = () => {
    if (loadingIntervalRef.current) {
      clearInterval(loadingIntervalRef.current);
      loadingIntervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => stopLoadingMessages();
  }, [lang]); // Restart if lang changes, though unlikely during connect

  const handleConnect = async () => {
    if (!userState.selectedPartnerId || !userState.selectedMoodId) return;

    setPhase('connect');
    setIsGenerating(true);
    startLoadingMessages();

    // Timeout logic to prevent hanging forever
    const timeoutId = setTimeout(() => {
      if (isGenerating) {
        stopLoadingMessages();
        setIsGenerating(false);
        setPhase('mood');
        alert(lang === 'ja'
          ? '申し訳ありません。混み合っているか、接続に時間がかかりすぎました。もう一度お試しください。'
          : 'Connection timed out. Please try again.');
      }
    }, 45000); // 45s timeout

    try {
      const partner = PARTNERS.find(p => p.id === userState.selectedPartnerId)!;
      const name = userState.name.trim() || (lang === 'ja' ? "あなた" : "You");

      const base64Audio = await generateMeltyAudio(name, userState.selectedMoodId, partner, lang);

      clearTimeout(timeoutId);

      if (base64Audio) {
        const ctx = getAudioContext();

        // Use optimized optimized native decoder instead of slow JS loop
        const buffer = await decodeGeminiAudio(base64Audio, ctx);

        setAudioBuffer(buffer);

        // Success
        stopLoadingMessages();
        setIsGenerating(false);
        setPhase('sleep');
        playBuffer(buffer);
      } else {
        throw new Error("No audio data");
      }
    } catch (e) {
      clearTimeout(timeoutId);
      console.error(e);
      stopLoadingMessages();
      setPhase('mood');
      setIsGenerating(false);
      // Only alert if we haven't already timed out (isGenerating check handles race somewhat, but explicit is better)
      if (isGenerating) {
        alert(lang === 'ja' ? '生成中にエラーが発生しました。' : 'An error occurred during generation.');
      }
    }
  };

  const playBuffer = async (buffer: AudioBuffer) => {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') await ctx.resume();

    stopAudio();

    const controller = playASMRBuffer(ctx, buffer, () => {
      setIsPlaying(false);
      audioControllerRef.current = null;
    });

    audioControllerRef.current = controller;
    setIsPlaying(true);
  };

  const stopAudio = () => {
    if (audioControllerRef.current) {
      audioControllerRef.current.stop();
      audioControllerRef.current = null;
    }
    setIsPlaying(false);
  };

  const handleRestart = () => {
    stopAudio();
    setUserState(prev => ({ ...prev, selectedMoodId: null })); // Clear mood but keep preferences
    setPhase('mood');
  };

  // --- Render Phases ---

  // PHASE 1: WELCOME
  const renderWelcome = () => (
    <div className="relative min-h-screen w-full overflow-hidden font-display">
      <div className="fixed inset-0 z-0">
        <BackgroundAnimation />
      </div>

      {/* Language Toggle */}
      <div className="fixed top-6 right-6 z-50 flex gap-2">
        <button
          onClick={() => { setLang('ja'); }}
          className={`px-4 py-2 rounded-full text-xs font-bold tracking-widest transition-all backdrop-blur-md border ${lang === 'ja' ? 'bg-primary text-background-dark border-primary shadow-[0_0_10px_rgba(13,204,242,0.5)]' : 'bg-black/40 text-white/80 border-white/20 hover:bg-black/60'}`}
        >
          JP
        </button>
        <button
          onClick={() => { setLang('en'); }}
          className={`px-4 py-2 rounded-full text-xs font-bold tracking-widest transition-all backdrop-blur-md border ${lang === 'en' ? 'bg-primary text-background-dark border-primary shadow-[0_0_10px_rgba(13,204,242,0.5)]' : 'bg-black/40 text-white/80 border-white/20 hover:bg-black/60'}`}
        >
          EN
        </button>
      </div>

      <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-between px-6 py-12">
        <div className="w-full pt-12"></div>

        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="relative">
            <h1 className="drippy-text text-white text-[64px] md:text-[72px] font-extrabold leading-none tracking-tight text-center px-4">
              {UI_TEXT[lang].welcome.title}
            </h1>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-1 bg-primary blur-xl opacity-30"></div>
          </div>
          <p className="text-primary/70 text-sm tracking-[0.4em] font-medium uppercase pt-8">{UI_TEXT[lang].welcome.subtitle}</p>
        </div>

        <div className="flex flex-col items-center justify-center w-full space-y-12 pb-12">
          <div className="relative flex justify-center items-center group">
            <div className="orb-glow"></div>
            <button
              onClick={() => { handleNextPhase('customize'); }}
              className="iridescent-orb flex h-32 w-32 items-center justify-center rounded-full backdrop-blur-2xl transition-all duration-700 hover:scale-110 active:scale-95 cursor-pointer"
            >
              <span className="text-white text-lg font-bold tracking-widest drop-shadow-lg text-center leading-relaxed">
                {UI_TEXT[lang].welcome.cta}
              </span>
            </button>
          </div>

          <div className="flex w-full flex-row items-center justify-center gap-4 pt-4">
            <div className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(13,204,242,0.8)]"></div>
            <div className="h-1.5 w-1.5 rounded-full bg-white/20"></div>
            <div className="h-1.5 w-1.5 rounded-full bg-white/20"></div>
            <div className="h-1.5 w-1.5 rounded-full bg-white/20"></div>
            <div className="h-1.5 w-1.5 rounded-full bg-white/20"></div>
          </div>
        </div>
      </div>
    </div>
  );

  // PHASE 2: CUSTOMIZE
  const renderCustomize = () => {
    const filteredPartners = userState.preferredGender === 'All'
      ? PARTNERS
      : PARTNERS.filter(p => p.gender === userState.preferredGender || p.gender === 'Neutral');

    return (
      <div className="font-display bg-background-light dark:bg-background-dark text-white selection:bg-primary/30 h-screen w-full relative bg-indigo-melty overflow-hidden">

        {/* Scrollable Content Area */}
        <div className="absolute inset-0 overflow-y-auto overflow-x-hidden pb-40 z-10 scrollbar-hide">

          {/* Top Bar */}
          <div className="flex items-center p-6 pb-2 justify-between">
            <button onClick={() => { setPhase('welcome'); }} className="text-white flex size-12 shrink-0 items-center justify-center rounded-full bg-white/5 backdrop-blur-md cursor-pointer hover:bg-white/10 transition">
              <span className="material-symbols-outlined">arrow_back_ios_new</span>
            </button>
            <h2 className="text-white text-sm font-light tracking-[0.2em] flex-1 text-center pr-12">{UI_TEXT[lang].customize.title}</h2>
          </div>

          {/* Input & Headline */}
          <div className="mt-4 flex flex-col items-center">

            {/* Name Input with Interactive Response */}
            <div className="w-full max-w-xs mt-8 mb-8 relative">
              <input
                type="text"
                placeholder={UI_TEXT[lang].customize.namePlaceholder}
                value={userState.name}
                onChange={(e) => {
                  setUserState(prev => ({ ...prev, name: e.target.value }));
                  if (e.target.value === '') setShowNameResponse(false);
                }}
                onBlur={handleNameBlur}
                className="w-full bg-white/5 border border-white/20 rounded-full px-6 py-3 text-center text-lg text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:bg-white/10 transition-all shadow-inner"
              />
              {/* Soft interaction text */}
              <div className={`absolute -bottom-8 left-0 w-full text-center transition-all duration-700 ${showNameResponse ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
                <p className="text-primary/80 text-sm font-light tracking-wider">
                  {UI_TEXT[lang].customize.nameResponse(userState.name)}
                </p>
              </div>
            </div>

            <h3 className="text-white tracking-wide text-xl md:text-2xl font-extralight leading-tight px-8 text-center pb-4">
              {UI_TEXT[lang].customize.headline}
            </h3>

            {/* Visual Gender Selection Icons */}
            <div className="flex gap-6 mb-8">
              <button
                onClick={() => handleGenderFilter('Female')}
                className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-300 ${userState.preferredGender === 'Female' ? 'bg-pink-500/20 text-pink-300 scale-110 shadow-[0_0_15px_rgba(244,114,182,0.3)]' : 'bg-white/5 text-white/30 hover:bg-white/10'}`}
              >
                <span className="material-symbols-outlined text-3xl">female</span>
              </button>
              <button
                onClick={() => handleGenderFilter('All')}
                className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-300 ${userState.preferredGender === 'All' ? 'bg-primary/20 text-primary scale-110 shadow-[0_0_15px_rgba(13,204,242,0.3)]' : 'bg-white/5 text-white/30 hover:bg-white/10'}`}
              >
                <span className="material-symbols-outlined text-3xl">wc</span>
              </button>
              <button
                onClick={() => handleGenderFilter('Male')}
                className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-300 ${userState.preferredGender === 'Male' ? 'bg-blue-500/20 text-blue-300 scale-110 shadow-[0_0_15px_rgba(96,165,250,0.3)]' : 'bg-white/5 text-white/30 hover:bg-white/10'}`}
              >
                <span className="material-symbols-outlined text-3xl">male</span>
              </button>
            </div>
          </div>

          {/* Carousel */}
          <div className="flex flex-col justify-center py-4 w-full">
            <div className="flex overflow-x-auto snap-x snap-mandatory [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden items-center px-4 pb-4">
              <div className="flex items-center px-4 gap-6">
                {filteredPartners.map(partner => (
                  <div
                    key={partner.id}
                    onClick={() => { handlePartnerSelect(partner.id); }}
                    className={`snap-center flex h-[400px] w-64 md:w-72 flex-col gap-6 rounded-xl liquid-glass iridescent-border p-6 transition-all duration-500 cursor-pointer ${userState.selectedPartnerId === partner.id ? 'scale-[1.05] border-primary/60 ring-1 ring-primary/30' : 'hover:scale-[1.02] opacity-70 hover:opacity-100'
                      }`}
                  >
                    <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden flex items-center justify-center">
                      <div className={`absolute w-48 h-48 rounded-full bg-gradient-to-br opacity-60 blur-3xl ${partner.glowColorClass} ${partner.color}`}></div>
                      <div
                        className="relative z-10 w-full h-full bg-cover bg-center mix-blend-overlay opacity-60 rounded-xl"
                        style={{ backgroundImage: `url("${partner.imageUrl}")` }}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="material-symbols-outlined text-6xl text-white/30">water_drop</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-white text-2xl font-light leading-normal tracking-wider">{lang === 'ja' ? partner.name.ja : partner.name.en}</p>
                      <p className="text-primary text-sm font-light leading-normal mt-1 italic">{lang === 'ja' ? partner.role.ja : partner.role.en}</p>
                    </div>
                    <p className="text-white/60 text-xs font-light text-center leading-relaxed">{lang === 'ja' ? partner.description.ja : partner.description.en}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Footer Action - Fixed at Bottom with Gradient Fade */}
        <div className="absolute bottom-0 left-0 w-full px-8 pb-10 pt-16 z-20 bg-gradient-to-t from-[#0a0b1e] via-[#0a0b1e]/95 to-transparent pointer-events-none flex justify-center">
          <div className="pointer-events-auto w-full max-w-md">
            <button
              disabled={!userState.selectedPartnerId}
              onClick={() => { handleNextPhase('mood'); }}
              className={`w-full py-5 rounded-full font-semibold text-base tracking-[0.2em] shadow-[0_0_25px_rgba(13,204,242,0.4)] transition-all active:scale-95 flex items-center justify-center gap-2 ${userState.selectedPartnerId ? 'bg-primary text-background-dark' : 'bg-white/10 text-white/20 cursor-not-allowed shadow-none'
                }`}
            >
              {UI_TEXT[lang].customize.confirm}
              <span className="material-symbols-outlined text-xl">auto_awesome</span>
            </button>
          </div>
        </div>

        {/* Ambient Background */}
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none z-0"></div>
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-pink-500/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      </div>
    );
  };

  // PHASE 3: MOOD SELECTION (Replaces Input)
  const renderMoodSelection = () => {
    // Extract mood keys from the DB constant
    const moodKeys = Object.keys(MOOD_DISPLAY_NAMES) as MoodId[];

    return (
      <div className="font-display bg-background-light dark:bg-background-dark antialiased h-screen w-full flex flex-col overflow-hidden relative">
        {/* Top Bar */}
        <div className="flex items-center p-4 pb-2 justify-between z-20">
          <div onClick={() => { setPhase('customize'); }} className="text-primary flex size-12 shrink-0 items-center justify-center cursor-pointer hover:bg-white/5 rounded-full transition">
            <span className="material-symbols-outlined text-3xl">chevron_left</span>
          </div>
          <h2 className="text-slate-800 dark:text-white text-sm font-bold wide-track flex-1 text-center pr-12">MELTY WHISPER</h2>
        </div>

        <main className="flex-1 w-full h-full relative z-10 overflow-hidden">
          {/* Title Layer */}
          <div className="absolute top-10 left-0 w-full text-center z-20 pointer-events-none">
            <h3 className="text-white text-3xl font-extralight tracking-widest leading-tight drop-shadow-[0_0_10px_rgba(13,204,242,0.5)]">
              {UI_TEXT[lang].mood.title}
            </h3>
            <p className="text-white/50 text-xs mt-2 tracking-[0.2em] uppercase">{UI_TEXT[lang].mood.subtitle}</p>
          </div>

          {/* Floating Bubbles Container */}
          <div className="absolute inset-0 w-full h-full">
            {moodKeys.map((moodId, index) => {
              const pos = BUBBLE_POSITIONS[index % BUBBLE_POSITIONS.length];
              const isSelected = userState.selectedMoodId === moodId;

              return (
                <div
                  key={moodId}
                  onClick={() => handleMoodSelect(moodId)}
                  className={`absolute cursor-pointer transition-all duration-500 animate-float ${isSelected ? 'z-30 scale-125' : 'z-10 hover:z-20 hover:scale-110 opacity-70 hover:opacity-100'
                    }`}
                  style={{
                    top: pos.top,
                    left: pos.left,
                    right: pos.right,
                    transform: pos.transform,
                    animationDelay: pos.delay
                  }}
                >
                  <div className={`
                          flex items-center justify-center w-24 h-24 md:w-28 md:h-28 rounded-full backdrop-blur-md border 
                          transition-all duration-500
                          ${isSelected
                      ? 'bg-primary/20 border-primary shadow-[0_0_30px_rgba(13,204,242,0.6)] text-white'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 text-white/80'
                    }
                       `}>
                    <span className={`text-xs md:text-sm font-medium tracking-wider text-center px-1 leading-relaxed ${isSelected ? 'font-bold' : ''}`}>
                      {lang === 'ja' ? MOOD_DISPLAY_NAMES[moodId].ja : MOOD_DISPLAY_NAMES[moodId].en}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Connect Button (Fixed Bottom) */}
          <div className="absolute bottom-10 left-0 w-full flex justify-center z-30 px-6">
            <div className="relative group">
              {userState.selectedMoodId && (
                <div className="absolute -inset-6 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
              )}
              <button
                onClick={() => { handleConnect(); }}
                disabled={!userState.selectedMoodId}
                className={`relative flex flex-col items-center justify-center w-36 h-36 rounded-full portal-glow text-background-dark transition-transform active:scale-95 duration-300 ${userState.selectedMoodId ? 'bg-primary' : 'bg-slate-700 cursor-not-allowed grayscale opacity-50'
                  }`}
              >
                <div className="flex flex-col items-center">
                  <span className="material-symbols-outlined text-4xl mb-2">headphones</span>
                  <span className="text-[10px] font-bold wide-track tracking-[0.1em] text-center px-2 leading-tight">
                    {UI_TEXT[lang].mood.connect}
                  </span>
                </div>
              </button>
            </div>
          </div>
        </main>

        {/* Background Ambience */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] opacity-30 overflow-hidden">
          <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-primary/10 blur-[100px]"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-[80%] h-[80%] rounded-full bg-primary/5 blur-[120px]"></div>
        </div>
      </div>
    );
  };

  // PHASE 4: CONNECT
  const renderConnect = () => (
    <div className="font-display bg-background-light dark:bg-background-dark text-white selection:bg-primary/30 h-screen w-full flex flex-col overflow-hidden liquid-bg">
      {/* Ambient Layers */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] pulse-layer opacity-60 animate-pulse"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-[120px]"></div>
      </div>

      <header className="relative z-10 flex items-center p-6 justify-between">
        <div className="text-white/70 flex size-10 shrink-0 items-center justify-center rounded-full glass-panel">
          <span className="material-symbols-outlined">chevron_left</span>
        </div>
        <h2 className="text-white/90 text-sm font-semibold uppercase tracking-[0.2em] flex-1 text-center pr-10">Melty Whisper</h2>
      </header>

      <main className="relative z-10 flex flex-col flex-1 items-center justify-center px-6">
        <div className="relative flex items-center justify-center mb-12">
          <div className="absolute w-64 h-64 rounded-full border border-primary/20 scale-110 animate-[spin_10s_linear_infinite]"></div>
          <div className="absolute w-64 h-64 rounded-full bg-primary/10 blur-3xl animate-pulse"></div>
          <div className="relative z-20 flex items-center justify-center w-48 h-48 rounded-full glass-panel shadow-[inset_0_0_20px_rgba(13,204,242,0.2)]">
            <span className="material-symbols-outlined text-primary text-[80px] drop-shadow-[0_0_15px_rgba(13,204,242,0.8)] animate-pulse">
              favorite
            </span>
          </div>
        </div>

        <div className="text-center mb-8 h-24">
          <h1 className="text-white glow-text tracking-[0.1em] text-[28px] md:text-[32px] font-bold leading-tight mb-2 transition-all duration-500">
            {loadingMessage || UI_TEXT[lang].connect.status}
          </h1>
        </div>

        <div className="w-full max-w-xs glass-panel p-6 rounded-2xl mb-12">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-end">
              <span className="text-white/80 text-xs font-medium uppercase tracking-widest">Connection Status</span>
              <span className="text-primary text-lg font-bold">...</span>
            </div>
            <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden relative border border-white/5">
              <div className="h-full bg-primary shadow-[0_0_15px_#0dccf2] rounded-full transition-all duration-1000 animate-[loading_3s_ease-in-out_infinite]" style={{ width: '65%' }}>
                <div className="absolute top-0 left-0 w-full h-[1px] bg-white/30"></div>
              </div>
            </div>
            <style>{`
              @keyframes loading {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
              }
            `}</style>
            <p className="text-white/40 text-[10px] text-center uppercase tracking-tighter">
              {UI_TEXT[lang].connect.detail}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-panel">
            <span className="size-2 rounded-full bg-primary shadow-[0_0_8px_#0dccf2]"></span>
            <span className="text-white/60 text-xs font-medium">Device: Whisper-Ring V2</span>
          </div>
        </div>
      </main>

      <footer className="relative z-10 p-8 flex flex-col items-center">
        <button
          onClick={() => {
            stopLoadingMessages();
            setPhase('mood');
            setIsGenerating(false);
          }}
          className="group relative flex items-center justify-center w-16 h-16 rounded-full glass-panel hover:bg-white/10 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-white/50 group-hover:text-white transition-colors">close</span>
        </button>
        <div className="h-6"></div>
      </footer>
    </div>
  );

  // PHASE 5: SLEEP
  const renderSleep = () => {
    const currentPartner = PARTNERS.find(p => p.id === userState.selectedPartnerId);

    return (
      <div className="relative h-screen w-full flex flex-col overflow-hidden bg-transparent font-display">
        <div className="fixed inset-0 z-0">
          <BackgroundAnimation />
        </div>

        {/* Content Wrapper */}
        <div className="relative z-10 flex h-full w-full flex-col">
          {/* Overlay */}
          <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(13, 204, 242, 0.1) 0%, transparent 70%)' }}></div>

          {/* Top Status */}
          <div className="flex items-center p-6 pb-2 justify-between z-10 opacity-30">
            <div className="text-white flex size-12 shrink-0 items-center">
              <span className="material-symbols-outlined text-2xl">nights_stay</span>
            </div>
            <div className="flex w-12 items-center justify-end">
              <span className="material-symbols-outlined text-xl text-white">battery_low</span>
            </div>
          </div>

          {/* Central Text */}
          <div className="flex-1 flex flex-col items-center justify-center z-10">
            <h1 className="text-white/60 tracking-[0.2em] text-[48px] font-extralight leading-tight px-4 text-center pb-3 pt-6 glow-soft blur-[0.5px]">
              {UI_TEXT[lang].sleep.goodnight}
            </h1>
            <p className="text-primary/40 text-sm tracking-[0.4em] uppercase mt-4">
              {UI_TEXT[lang].sleep.subtitle}
            </p>
          </div>

          {/* Media Player */}
          <div className="px-6 py-4 z-10 w-full max-w-md mx-auto">
            <div className="flex flex-col gap-3 rounded-xl bg-white/5 backdrop-blur-md border border-white/5 px-4 py-3">
              <div className="flex items-center gap-4 overflow-hidden">
                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-14 shrink-0 opacity-60"
                  style={{ backgroundImage: `url("${currentPartner?.imageUrl}")` }}
                ></div>
                <div className="flex-1">
                  <p className="text-white/80 text-base font-medium leading-tight truncate">
                    {currentPartner ? (lang === 'ja' ? currentPartner.name.ja : currentPartner.name.en) : 'Melty Whisper'}
                  </p>
                  <p className="text-white/40 text-xs font-normal leading-normal truncate">{isPlaying ? 'Playing...' : 'Paused'}</p>
                </div>
                <button
                  onClick={() => {
                    if (isPlaying) stopAudio();
                    else if (audioBuffer) playBuffer(audioBuffer);
                  }}
                  className="flex shrink-0 items-center justify-center rounded-full size-10 bg-primary/20 text-primary border border-primary/30 cursor-pointer hover:bg-primary/30 transition"
                >
                  <span className={`material-symbols-outlined ${isPlaying ? '' : 'fill-1'}`}>{isPlaying ? 'pause' : 'play_arrow'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Visualizer */}
          <div className="flex flex-col gap-3 p-6 pb-8 z-10 w-full max-w-md mx-auto">
            <div className="flex gap-6 justify-between items-end">
              <p className="text-white/30 text-xs font-light tracking-widest leading-normal">{UI_TEXT[lang].sleep.visualizer}</p>
              <p className="text-primary/50 text-xs font-normal leading-normal">Wispy mist effect</p>
            </div>
            <div className="relative h-12 flex items-center justify-center overflow-hidden">
              <div className="absolute bottom-0 w-full h-[1px] bg-white/10"></div>
              {/* Simple CSS Visualizer bars */}
              <div className="flex items-end gap-1 h-full w-full justify-center opacity-40">
                {[20, 40, 30, 60, 45, 70, 25, 15, 50, 35, 65, 20].map((h, i) => (
                  <div
                    key={i}
                    className={`w-1 bg-primary/60 rounded-full transition-all duration-300 ${isPlaying ? 'animate-pulse' : ''}`}
                    style={{
                      height: isPlaying ? `${Math.max(10, Math.random() * 90)}%` : `${h}%`,
                      transitionDuration: '0.2s'
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          {/* End Session */}
          <div className="flex px-4 pb-12 justify-center z-10">
            <button
              onClick={() => { handleRestart(); }}
              className="flex min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-6 bg-white/5 hover:bg-white/10 text-white/20 hover:text-white/40 border border-white/5 transition-all text-xs font-medium leading-normal tracking-[0.2em] backdrop-blur-sm"
            >
              <span className="truncate">{UI_TEXT[lang].sleep.end}</span>
            </button>
          </div>

          <div className="absolute top-1/4 left-10 size-1 bg-primary/30 rounded-full blur-[2px]"></div>
          <div className="absolute top-2/3 right-12 size-2 bg-primary/20 rounded-full blur-[4px]"></div>
          <div className="absolute bottom-1/3 left-20 size-1 bg-white/20 rounded-full blur-[1px]"></div>
        </div>
      </div>
    );
  };

  return (
    <>
      {phase === 'welcome' && renderWelcome()}
      {phase === 'customize' && renderCustomize()}
      {phase === 'mood' && renderMoodSelection()}
      {phase === 'connect' && renderConnect()}
      {phase === 'sleep' && renderSleep()}
    </>
  );
};

export default App;