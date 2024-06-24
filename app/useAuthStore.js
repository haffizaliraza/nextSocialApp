// useAuthStore.js
import { createStore } from "zustand/vanilla";
import { create } from "zustand";
import { Kalam, Zen_Loop } from "next/font/google";
import next from "next";
import { babelIncludeRegexes } from "next/dist/build/webpack-config";
import macro from "styled-jsx/macro";

// Vanilla store
const authStore = createStore((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));

// React store
const useAuthStore = create(authStore);

export default useAuthStore;
