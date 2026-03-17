import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { userProfile } from "../app/lib/user";

// managing user profile across app
const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,

      login: async (token) => {
        set({token});
        await get().fetchProfile(token);
      },

      fetchProfile: async(token) => {
        const currentToken = token || get().token;
        if (!currentToken) return;
        try {
            const response = await userProfile(currentToken);
            if (response?.error) {
              get().logout();
            }
            set({user: response?.user});

        } catch (err) {
            console.error("Failed to fetch profile: ", err);
        }
      },
      logout: () => set({user: null, token: null})
      
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
    
  ),
);

export default useAuthStore