import { create } from "zustand";
import type { ExpenseData } from "../types/expense";
import { axiosInstance } from "../api/axiosInstance";
import toast from "react-hot-toast";
import { useDashboardStore } from "./useDashboardStore";
import { useIncomeStore } from "./useIncomeStore";
const month = useIncomeStore.getState().month;
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
  isExpenseAdding: boolean;
  allExpenses: ExpenseResource | null;
  isExpenseLoading: boolean;
  isExpenseDeleting: boolean;
  isExpenseUpdating: boolean;

  addExpense: (data: Omit<ExpenseData, "id">) => Promise<void>;

  getAllExpenses: () => void;

  updateExpense: (
    id: number,
    data: Omit<ExpenseData, "id" | "userId">,
  ) => Promise<void>;

  deleteExpense: (id: number) => Promise<void>;

  resetExpenseState: () => void;
}

export const useExpenseStore = create<ExpenseStore>((set) => ({
  isExpenseAdding: false,

  allExpenses: {
    expense: [],
    totalExpense: 0,
  },

  isExpenseLoading: false,
  isExpenseDeleting: false,
  isExpenseUpdating: false,

  // ? Add Expense
  addExpense: async (data) => {
    try {
      set({ isExpenseAdding: true });

      const res = await axiosInstance.post("/expense/add", data);

      useDashboardStore.getState().getDashboardSummary(month);
      set((state) => ({
        allExpenses: {
          expense: [...(state.allExpenses?.expense || []), res.data.expense],
          totalExpense: res.data.totalExpense,
        },
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

  // ? Delete Expense
  deleteExpense: async (id: number) => {
    try {
      set({ isExpenseDeleting: true });

      const res = await axiosInstance.delete(`/expense/delete/${id}`);
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
    } catch (error) {
      console.log("update expense error : ", error);
    } finally {
      set({ isExpenseUpdating: false });
    }
  },

  resetExpenseState: () => {
    set({
      allExpenses: null,
    });
  },
}));
