import { create } from "zustand";

import type { LoginData } from "../types/login";
import type { SignupData } from "../types/signup";
import { axiosInstance } from "../api/axiosInstance";
import toast from "react-hot-toast";
import axios from "axios";

import { useIncomeStore } from "./useIncomeStore";
import { useExpenseStore } from "./useExpenseStore";

interface CustomError {
  response?: {
    data?: {
      message?: string;
    };
  };
}
interface User {
  id: number;
  name: string;
  email: string;
}
interface AuthData {
  authUser: User | null;
  ischeckingAuth: boolean;
  isLoggingIn: boolean;
  isSiggningIn: boolean;

  checkAuth: () => void;
  login: (data: LoginData) => void;
  signup: (data: SignupData) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthData>((set) => ({
  authUser: null,
  ischeckingAuth: true,
  isLoggingIn: false,
  isSiggningIn: false,

  //? check auth function
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/user/profile");
      set({ authUser: res.data.user });
    } catch (error) {
      const err = error as CustomError;
      console.log("check auth error : ", err?.response?.data?.message);
      set({ authUser: null });
    } finally {
      set({ ischeckingAuth: false });
    }
  },

  //  ? login function
  login: async (data: LoginData) => {
    try {
      set({ isLoggingIn: true });
      const res = await axiosInstance.post("/user/login", data);
      set({ authUser: res.data.user });
      toast.success(res.data.message);
    } catch (error) {
      const err = error as CustomError;
      console.log("Login error : ", err.response?.data);
      toast.error(err?.response?.data?.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  //   ? signup function
  signup: async (data: SignupData) => {
    try {
      set({ isSiggningIn: true });
      const res = await axiosInstance.post("/user/signup", data);
      set({ authUser: res.data.user });
      toast.success(res.data.message || "Signup successful");
    } catch (error) {
      const err = error as CustomError;
      console.log(
        "Sign up error : ",
        err?.response?.data?.message || "Signup failed",
      );
      toast.error(err?.response?.data?.message || "Signup failed");
    } finally {
      set({ isSiggningIn: false });
    }
  },
  // ? logout function
  logout: async () => {
    try {
      const res = await axiosInstance.post("/user/logout");
      set({ authUser: null });
      useIncomeStore.getState().resetIncomeState();
      useExpenseStore.getState().resetExpenseState();
      toast.success(res.data.message || "Logout successful");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log("Logout error : ", error.response?.data || error.message);
        toast.error(error.response?.data?.message || "Logout failed");
      }
    }
  },
}));
