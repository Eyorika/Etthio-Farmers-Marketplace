import { create } from 'zustand';

interface LanguageState {
  language: 'en' | 'am' | 'om' | 'ti';
  setLanguage: (lang: 'en' | 'am' | 'om' | 'ti') => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  language: 'en',
  setLanguage: (lang) => set({ language: lang }),
}));