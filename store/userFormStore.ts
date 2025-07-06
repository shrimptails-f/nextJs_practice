// store/userFormStore.ts
import { create } from 'zustand';

type UserFormState = {
  name: string;
  email: string;
  errors: {
    name?: string;
    email?: string;
  };
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setErrors: (
    errors:
      | Partial<{ name?: string; email?: string }>
      | ((prev: { name?: string; email?: string }) => { name?: string; email?: string })
  ) => void;
};

export const useUserFormStore = create<UserFormState>((set) => ({
  name: '',
  email: '',
  errors: {},
  setName: (name) => set({ name }),
  setEmail: (email) => set({ email }),
  setErrors: (errorsOrUpdater) =>
    set((state) => {
      const updated =
        typeof errorsOrUpdater === 'function' ? errorsOrUpdater(state.errors) : errorsOrUpdater;
      return { errors: { ...state.errors, ...updated } };
    }),
}));
