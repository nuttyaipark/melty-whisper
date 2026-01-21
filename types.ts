export enum VoiceName {
  Kore = 'Kore',
  Puck = 'Puck',
  Charon = 'Charon',
  Fenrir = 'Fenrir',
  Zephyr = 'Zephyr',
}

export type GenderType = 'Female' | 'Male' | 'Neutral';
export type Language = 'ja' | 'en';

export interface Partner {
  id: string;
  name: {
    ja: string;
    en: string;
  };
  voice: VoiceName;
  gender: GenderType;
  role: {
    ja: string;
    en: string;
  };
  description: {
    ja: string;
    en: string;
  };
  color: string;
  // promptInstruction is no longer needed for inference, but kept for metadata compatibility if needed
  promptInstruction: string;
  imageUrl: string;
  glowColorClass: string;
}

// Keys matching the provided JSON data
export type MoodId = 
  | '01_victory'
  | '02_exhausted'
  | '03_void'
  | '04_anxiety'
  | '05_praise'
  | '06_anger'
  | '07_lonely'
  | '08_floating'
  | '09_regret'
  | '10_silence';

export interface UserState {
  name: string;
  preferredGender: GenderType | 'All';
  selectedPartnerId: string | null;
  selectedMoodId: MoodId | null; // Replaces 'story'
}

export type AppPhase = 'welcome' | 'customize' | 'mood' | 'connect' | 'sleep';