// store/bookingStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CompleteBookingData, FirstStepData, SecondStepData } from '@/types/booking';

interface BookingStore extends CompleteBookingData {
  currentStep: 1 | 2 | 3;
  
  // Actions
  setCurrentStep: (step: 1 | 2 | 3) => void;
  updateFirstStep: (data: FirstStepData) => void;
  updateSecondStep: (data: SecondStepData) => void;
  resetForm: () => void;
  clearStepData: (step: 'firstStep' | 'secondStep') => void;
}

const initialState = {
  firstStep: null,
  secondStep: null,
  currentStep: 1 as const,
};

export const useBookingStore = create<BookingStore>()(
  persist(
    (set) => ({
      ...initialState,

      setCurrentStep: (step) => set({ currentStep: step }),

      updateFirstStep: (data) => set({ 
        firstStep: data,
        currentStep: 2 // Auto-advance to step 2
      }),

      updateSecondStep: (data) => set({ 
        secondStep: data,
        currentStep: 3 // Auto-advance to step 3
      }),

      resetForm: () => set(initialState),

      clearStepData: (step) => set({ [step]: null }),
    }),
    {
      name: 'shifting-booking-storage', // localStorage key
      partialize: (state) => ({
        firstStep: state.firstStep,
        secondStep: state.secondStep,
      }), // Don't persist currentStep
    }
  )
);