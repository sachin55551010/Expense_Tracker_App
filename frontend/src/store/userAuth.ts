import { create } from "zustand";
import type { UserData } from "../types/userData";
import { axiosInstance } from "../api/axiosInstance";
type AuthUser = {
  authUser: object | null;
  isCheckAuth: boolean;
  isLoggingIn: boolean;
  isSiggningIn: boolean;
  checkAuth: () => void;
  signup: (data: UserData) => void;
  login: (data: UserData) => void;
  logout: () => void;
};

export const useAuth = create<AuthUser>((set) => ({
  authUser: null,
  isCheckAuth: true,
  isLoggingIn: false,
  isSiggningIn: false,
  checkAuth: async (): Promise<void> => {
    try {
      const res = await axiosInstance.get(`/user/profile`);
      set({ authUser: res.data });
    } catch (error) {
      console.log("check User Error ", error);
      set({ authUser: null });
    } finally {
      set({ isCheckAuth: false });
    }
  },

  login: async (data: UserData) => {
    try {
      set({ isLoggingIn: true });
      const res = await axiosInstance.post(`/user/login`, data);
      set({ authUser: res.data });
    } catch (error) {
      console.log("Login User Error ", error);
    } finally {
      set({ isLoggingIn: false });
    }
  },
  signup: async (data: UserData) => {
    try {
      set({ isSiggningIn: true });
      const res = await axiosInstance.post(`/user/signup`, data);
      set({ authUser: res.data });
    } catch (error) {
      console.log("Signup User Error ", error);
    } finally {
      set({ isSiggningIn: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post(`/user/logout`);
      set({ authUser: null });
    } catch (error) {
      console.log("Logout User Error ", error);
    }
  },
}));
