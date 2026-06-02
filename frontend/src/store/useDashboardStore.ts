import { create } from "zustand";
import { axiosInstance } from "../api/axiosInstance";
import type { DashboardData } from "../types/dashboard";

interface DashBoardAuth {
  isDashboardLoading: boolean;
  dashboardData: DashboardData | null;
  getDashboardSummary: (month: number) => void;
}
export const useDashboardStore = create<DashBoardAuth>((set) => ({
  dashboardData: null,
  isDashboardLoading: false,
  getDashboardSummary: async (month: number) => {
    try {
      set({ isDashboardLoading: true });
      const res = await axiosInstance.get("/dashboard/summary", {
        params: { month },
      });

      set({ dashboardData: res.data });
    } catch (error) {
      console.log("dashboard summary error : ", error);
    } finally {
      set({ isDashboardLoading: false });
    }
  },
}));
