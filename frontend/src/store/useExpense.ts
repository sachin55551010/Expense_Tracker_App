import { create } from "zustand";
import type { ExpenseData } from "../types/expenseData";
import { axiosInstance } from "../api/axiosInstance";

interface Expense {
  isExpenseAdded: boolean;
  isExpenseLoading: boolean;
  isExpenseEdited: boolean;
  isExpenseDeleted: boolean;
  allExpense: object[] | null;
  addExpense: (data: ExpenseData) => void;
  getAllExpense: () => void;
}

export const useExpense = create<Expense>((set, get) => ({
  isExpenseAdded: false,
  isExpenseLoading: false,
  isExpenseEdited: false,
  isExpenseDeleted: false,
  allExpense: null,
  addExpense: async (data: ExpenseData) => {
    try {
      set({ isExpenseAdded: true });
      const res = await axiosInstance.post("/expense/add-expense", data);
      console.log(res.data);
      get().getAllExpense();
    } catch (error) {
      console.log("Add expense data error : ", error);
    } finally {
      set({ isExpenseAdded: false });
    }
  },
  getAllExpense: async () => {
    try {
      const res = await axiosInstance.get("/expense/my-expense");

      set({ allExpense: res.data });
    } catch (error) {
      console.log("get all expense data error : ", error);
    }
  },
}));
