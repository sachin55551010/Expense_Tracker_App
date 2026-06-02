import { create } from "zustand";
import type { IncomeData } from "../types/income";
import { axiosInstance } from "../api/axiosInstance";
import toast from "react-hot-toast";
import { useDashboardStore } from "./useDashboardStore";
import type { YearlyIncomeData } from "../types/yearIyIncome";

interface CustomError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

interface IncomeResource {
  income: IncomeData[];
  totalIncome: number;
}

interface AuthStore {
  isIncomeAdding: boolean;
  month: number;
  allIncomes: IncomeResource | null;
  monthlyIncome: IncomeData[] | null;
  monthlyIncomePerYear: YearlyIncomeData[];
  monthlyIncomeTotal: number;
  isIncomeLoading: boolean;
  isIncomeDeleting: boolean;
  isIncomeUpdating: boolean;
  setMonth: (month: number) => void;
  addIncome: (
    data: Omit<IncomeData, "id">,
  ) => Promise<void>; /*Omit is a built-in TypeScript utility type.
It means:
“Take a type and remove some fields from it.”*/
  getAllIncomes: () => void;
  updateIncome: (
    id: number,
    data: Omit<IncomeData, "id" | "userId">,
  ) => Promise<void>;
  deleteIncome: (id: number) => Promise<void>;
  resetIncomeState: () => void;

  getMonthlyIncome: (month: number) => void;
  getYearlyIncome: () => void;
}

export const useIncomeStore = create<AuthStore>((set, get) => ({
  month:
    Number(localStorage.getItem("current_month_num")) || new Date().getMonth(),
  isIncomeAdding: false,
  monthlyIncome: [],
  monthlyIncomeTotal: 0,
  monthlyIncomePerYear: [],

  allIncomes: {
    income: [],
    totalIncome: 0,
  },
  isIncomeLoading: false,
  isIncomeDeleting: false,
  isIncomeUpdating: false,

  setMonth: (month) => {
    localStorage.setItem("current_month_num", String(month));
    set({ month });
  },

  // ? function to add new income
  addIncome: async (data) => {
    try {
      set({ isIncomeAdding: true });
      const res = await axiosInstance.post("/income/add", data);

      useDashboardStore.getState().getDashboardSummary(month);
      set((state) => ({
        allIncomes: {
          income: [...(state.allIncomes?.income || []), res.data.income],
          totalIncome: res.data.totalIncome,
        },
      }));

      set((state) => ({
        monthlyIncome: [...(state.monthlyIncome || []), res.data.income],
        monthlyIncomeTotal: state.monthlyIncomeTotal + res.data.income.amount,
      }));
    } catch (error) {
      const err = error as CustomError;
      console.log(
        "add income error : ",
        err?.response?.data?.message || "Add Income failed",
      );
    } finally {
      set({ isIncomeAdding: false });
    }
  },

  // ? function to get all income
  getAllIncomes: async () => {
    try {
      set({ isIncomeLoading: true });
      const res = await axiosInstance.get("/income/all");
      set({ allIncomes: res.data });
    } catch (error) {
      const err = error as CustomError;
      console.log(
        "get all incomes error : ",
        err?.response?.data?.message || "Get All Incomes failed",
      );
    } finally {
      set({ isIncomeLoading: false });
    }
  },

  // ? get monthly income
  getMonthlyIncome: async (month: number) => {
    try {
      const res = await axiosInstance.get("/income/monthly-income-chart", {
        params: { month },
      });

      set({ monthlyIncome: res.data.monthlyIncome });
      set({ monthlyIncomeTotal: res.data.monthlyTotal });
    } catch (error) {
      const err = error as CustomError;
      console.log(
        "add income error : ",
        err?.response?.data?.message || "Add Income failed",
      );
    }
  },

  getYearlyIncome: async () => {
    try {
      const res = await axiosInstance("/income/yearly-income-chart");

      set({ monthlyIncomePerYear: res.data });
    } catch (error) {
      const err = error as CustomError;
      console.log(
        "add income error : ",
        err?.response?.data?.message || "Add Income failed",
      );
    }
  },

  // ? delete item from list
  deleteIncome: async (id: number) => {
    try {
      set({ isIncomeDeleting: true });
      const res = await axiosInstance.delete(`/income/delete/${id}`);
      const month = get().month;
      useDashboardStore.getState().getDashboardSummary(month);
      set((state) => ({
        allIncomes: state.allIncomes
          ? {
              ...state.allIncomes,
              income: state.allIncomes.income.filter(
                (income) => income.id !== id,
              ),
              totalIncome: res.data.totalIncome,
            }
          : null,
      }));
    } catch (error) {
      const err = error as CustomError;
      console.log("delete income error : ", err);
      toast.error(err.response?.data?.message || "Delete income failed");
    } finally {
      set({ isIncomeDeleting: false });
    }
  },

  // ? update income function
  updateIncome: async (id: number, data: Omit<IncomeData, "id" | "userId">) => {
    try {
      set({ isIncomeUpdating: true });
      const res = await axiosInstance.put(`/income/update/${id}`, data);
      const month = get().month;
      useDashboardStore.getState().getDashboardSummary(month);
      console.log(res);
      set((state) => ({
        allIncomes: state.allIncomes
          ? {
              ...state.allIncomes,
              income: state.allIncomes.income.map((income) =>
                income.id === id ? res.data.updatedIncome : income,
              ),
              totalIncome: res.data.totalIncome,
            }
          : null,
      }));
    } catch (error) {
      console.log("update income error : ", error);
    } finally {
      set({ isIncomeUpdating: false });
    }
  },
  resetIncomeState: () => {
    set({
      allIncomes: null,
    });
  },
}));
