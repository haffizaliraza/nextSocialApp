// Zustand stores
import { create } from "zustand";

/**
 * TODO: Similar to Redux, use the Zustand state management package to create multiple stores to store globally-shared states
 * Zustand documentation: https://daocs.pmnd.rs/zustand/getting-started/introductiona
 */

// export const useUserStore = create((set) => ({
//     onlineUserCount: 0,
//     setOnlineUserCount: (count) => set({ onlineUserCount: count }),
//     decrement: () => set((state) => ({ count: state.count - 1 })),
// }));