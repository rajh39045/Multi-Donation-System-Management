import { create } from 'zustand';

export const useDonationStore = create((set) => ({
  formData: {
    itemType: '',
    description: '',
    quantity: 1,
    pickupAddress: '',
    pickupDate: '',
  },
  step: 1,
  setField: (key, value) =>
    set((state) => ({
      formData: { ...state.formData, [key]: value },
    })),
  nextStep: () => set((state) => ({ step: state.step + 1 })),
  prevStep: () => set((state) => ({ step: state.step - 1 })),
  reset: () =>
    set({
      formData: {
        itemType: '',
        description: '',
        quantity: 1,
        pickupAddress: '',
        pickupDate: '',
      },
      step: 1,
    }),
}));
