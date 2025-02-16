// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  lng: 'am', // Amharic
  fallbackLng: 'en',
  resources: {
    am: {
      translation: {
        // Add Amharic translations here
      }
    }
  }
});