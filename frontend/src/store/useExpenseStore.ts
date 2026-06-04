import { create } from "zustand";
import type { ExpenseData } from "../types/expense";
import { axiosInstance } from "../api/axiosInstance";
import toast from "react-hot-toast";
import { useDashboardStore } from "./useDashboardStore";
import type { YearlyExpenseData } from "../types/yearlyExpense";

interface CustomError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

interface ExpenseResource {
  expense: ExpenseData[];
  totalExpense: number;
}

interface ExpenseStore {
  month: number;
  isExpenseAdding: boolean;
  isMonthlyExpenseLoading: boolean;
  isYearlyExpenseLoading: boolean;
  allExpenses: ExpenseResource | null;
  monthlyExpense: ExpenseData[] | null;
  monthlyExpenseTotal: number;
  monthlyExpensePerYear: YearlyExpenseData[];
  isExpenseLoading: boolean;
  isExpenseDeleting: boolean;
  isExpenseUpdating: boolean;

  setMonth: (month: number) => void;

  addExpense: (data: Omit<ExpenseData, "id">) => Promise<void>;

  getAllExpenses: () => void;

  getMonthlyExpense: (month: number) => void;

  getYearlyExpense: () => void;
  updateExpense: (
    id: number,
    data: Omit<ExpenseData, "id" | "userId">,
  ) => Promise<void>;

  deleteExpense: (id: number) => Promise<void>;

  resetExpenseState: () => void;
}

export const useExpenseStore = create<ExpenseStore>((set, get) => ({
  month: Number(
    localStorage.getItem("current_month_num") ?? new Date().getMonth(),
  ),

  isExpenseAdding: false,
  isMonthlyExpenseLoading: false,
  isYearlyExpenseLoading: false,
  allExpenses: {
    expense: [],
    totalExpense: 0,
  },
  monthlyExpense: [],
  monthlyExpenseTotal: 0,
  monthlyExpensePerYear: [],
  isExpenseLoading: false,
  isExpenseDeleting: false,
  isExpenseUpdating: false,

  setMonth: (month) => {
    localStorage.setItem("current_month_num", String(month));
    set({ month });
  },

  // ? Add Expense
  addExpense: async (data) => {
    try {
      set({ isExpenseAdding: true });

      const res = await axiosInstance.post("/expense/add", data);
      console.log("add expense data : ", res.data);

      const month = get().month;

      useDashboardStore.getState().getDashboardSummary(month);

      set((state) => ({
        allExpenses: {
          expense: [...(state.allExpenses?.expense || []), res.data.expense],
          totalExpense: res.data.totalExpense,
        },
      }));

      set((state) => ({
        monthlyExpense: [...(state.monthlyExpense || []), res.data.expense],
        monthlyExpenseTotal:
          state.monthlyExpenseTotal + res?.data?.expense?.amount,
      }));
    } catch (error) {
      const err = error as CustomError;

      console.log(
        "add expense error : ",
        err?.response?.data?.message || "Add Expense failed",
      );
    } finally {
      set({ isExpenseAdding: false });
    }
  },

  // ? Get All Expenses
  getAllExpenses: async () => {
    try {
      set({ isExpenseLoading: true });

      const res = await axiosInstance.get("/expense/all");

      set({ allExpenses: res.data });
    } catch (error) {
      const err = error as CustomError;

      console.log(
        "get all expenses error : ",
        err?.response?.data?.message || "Get All Expenses failed",
      );
    } finally {
      set({ isExpenseLoading: false });
    }
  },

  // ? Get Monthly Expense
  getMonthlyExpense: async (month: number) => {
    try {
      set({ isMonthlyExpenseLoading: true });

      const res = await axiosInstance.get("/expense/monthly-expense-chart", {
        params: { month },
      });
      console.log("zustand expense Month : ", month);

      set({
        monthlyExpense: res.data.monthlyExpense,
        monthlyExpenseTotal: res.data.monthlyExpenseTotal,
      });
    } catch (error) {
      const err = error as CustomError;

      console.log(
        "get monthly expense error : ",
        err?.response?.data?.message || "Get Monthly Expense failed",
      );
    } finally {
      set({ isMonthlyExpenseLoading: false });
    }
  },

  // ? get yearly expense
  getYearlyExpense: async () => {
    try {
      set({ isYearlyExpenseLoading: true });
      const res = await axiosInstance("/expense/yearly-expense-chart");

      set({ monthlyExpensePerYear: res.data });
    } catch (error) {
      const err = error as CustomError;
      console.log(
        "get yearly expense error : ",
        err?.response?.data?.message || "Get Yearly Expense failed",
      );
    } finally {
      set({ isYearlyExpenseLoading: false });
    }
  },

  // ? Delete Expense
  deleteExpense: async (id: number) => {
    try {
      set({ isExpenseDeleting: true });

      const res = await axiosInstance.delete(`/expense/delete/${id}`);

      const month = get().month;

      useDashboardStore.getState().getDashboardSummary(month);

      set((state) => ({
        allExpenses: state.allExpenses
          ? {
              ...state.allExpenses,
              expense: state.allExpenses.expense.filter(
                (expense) => expense.id !== id,
              ),
              totalExpense: res.data.totalExpense,
            }
          : null,
      }));

      set((state) => ({
        monthlyExpense: state.monthlyExpense
          ? state.monthlyExpense.filter((expense) => expense.id !== id)
          : null,

        monthlyExpenseTotal:
          state.monthlyExpenseTotal - res.data.deletedExpense.amount,
      }));
    } catch (error) {
      const err = error as CustomError;

      console.log("delete expense error : ", err);

      toast.error(err.response?.data?.message || "Delete Expense failed");
    } finally {
      set({ isExpenseDeleting: false });
    }
  },

  // ? Update Expense
  updateExpense: async (
    id: number,
    data: Omit<ExpenseData, "id" | "userId">,
  ) => {
    try {
      set({ isExpenseUpdating: true });

      const res = await axiosInstance.put(`/expense/update/${id}`, data);

      const month = get().month;

      useDashboardStore.getState().getDashboardSummary(month);

      set((state) => ({
        allExpenses: state.allExpenses
          ? {
              ...state.allExpenses,
              expense: state.allExpenses.expense.map((expense) =>
                expense.id === id ? res.data.updatedExpense : expense,
              ),
              totalExpense: res.data.totalExpense,
            }
          : null,
      }));

      set((state) => ({
        monthlyExpense: state.monthlyExpense
          ? state.monthlyExpense.map((expense) =>
              expense.id === id ? res.data.updatedExpense : expense,
            )
          : null,
      }));
    } catch (error) {
      console.log("update expense error : ", error);
    } finally {
      set({ isExpenseUpdating: false });
    }
  },

  resetExpenseState: () => {
    set({
      allExpenses: null,
      monthlyExpense: null,
      monthlyExpenseTotal: 0,
    });
  },
}));
