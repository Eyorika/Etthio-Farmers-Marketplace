import { create } from 'zustand';

// Add proper types for Ethiopian administrative units
type Location = {
  region: string;
  zone: string;
  woreda: string;
};

interface ProfileState {
  step: number;
  farmName: string;
  location: Location;
  products: string[];
  errors: Record<string, string>;
  setFarmName: (name: string) => void;
  setLocation: (location: Location) => void;
  setProducts: (products: string[]) => void;
  setErrors: (errors: Record<string, string>) => void;
  validateStep: (step: number) => boolean;
  nextStep: () => void;
  prevStep: () => void;
}

export const useProfileStore = create<ProfileState>((set, get) => ({
  step: 1,
  farmName: '',
  location: { region: '', zone: '', woreda: '' },
  products: [],
  errors: {},

  setFarmName: (name) => set({ farmName: name }),
  setLocation: (location) => set({ location }),
  setProducts: (products) => set({ products }),
  setErrors: (errors) => set({ errors }),

  validateStep: (step) => {
    const { farmName, location, products } = get();
    const errors: Record<string, string> = {};

    if (step === 1) {
      if (!farmName.trim()) errors.farmName = 'የግብርና ስም ያስፈልጋል';
      if (!location.region) errors.region = 'ክልል ይምረጡ';
    }

    if (step === 2 && products.length === 0) {
      errors.products = 'ቢያንስ አንድ የምርት አይነት ይምረጡ';
    }

    set({ errors });
    return Object.keys(errors).length === 0;
  },

  nextStep: () => {
    const { step, validateStep } = get();
    if (validateStep(step)) {
      set((state) => ({ step: Math.min(state.step + 1, 3) }));
    }
  },

  prevStep: () => {
    set((state) => ({ step: Math.max(state.step - 1, 1) }));
  }
}));