import { useState } from "react";
import type { ExpenseData } from "../types/expenseData";
import { useExpense } from "../store/useExpense";
type LocalExpense = {
  category: string;
  description?: string;
  amount: string;
};
export const ExpenseInput = () => {
  const [expenseData, setExpenseData] = useState<LocalExpense>({
    category: "",
    description: "",
    amount: "",
  });

  const { addExpense } = useExpense();

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload: ExpenseData = {
      ...expenseData,
      amount: Number(expenseData.amount),
    };
    addExpense(payload);
  };
  return (
    <section className="mt-6 w-[90%] rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm lg:w-[60%]">
      <h1 className="mb-5 text-center text-lg font-semibold text-zinc-800">
        Expense Input
      </h1>

      <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
        <input
          value={expenseData.category}
          onChange={(e) =>
            setExpenseData({
              ...expenseData,
              category: e.target.value,
            })
          }
          type="text"
          placeholder="Category"
          className="h-11 rounded-xl border border-zinc-200 bg-transparent px-3 text-sm outline-none transition focus:border-zinc-400"
        />

        <input
          value={expenseData.description}
          onChange={(e) =>
            setExpenseData({
              ...expenseData,
              description: e.target.value,
            })
          }
          type="text"
          placeholder="Description"
          className="h-11 rounded-xl border border-zinc-200 bg-transparent px-3 text-sm outline-none transition focus:border-zinc-400"
        />

        <input
          value={expenseData.amount}
          onChange={(e) =>
            setExpenseData({
              ...expenseData,
              amount: e.target.value,
            })
          }
          type="number"
          placeholder="Amount"
          className="h-11 rounded-xl border border-zinc-200 bg-transparent px-3 text-sm outline-none transition focus:border-zinc-400"
        />

        <button className="mt-2 h-11 rounded-xl border border-zinc-300 bg-zinc-900 text-sm font-medium text-white transition hover:opacity-90">
          Add Expense
        </button>
      </form>
    </section>
  );
};
