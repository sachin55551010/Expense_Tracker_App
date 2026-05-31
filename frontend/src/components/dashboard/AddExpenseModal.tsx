import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

import type { ExpenseData } from "../../types/expense";
import { useExpenseStore } from "../../store/useExpenseStore";

interface AddExpenseData {
  category: string;
  amount: string;
  description?: string;
  date: string;
}

interface AddExpenseModalProps {
  isOpen: boolean;
  mode: "add" | "edit";
  selectedExpense?: ExpenseData | null;
  onClose: () => void;
}

export const AddExpenseModal = ({
  isOpen,
  onClose,
  mode,
  selectedExpense,
}: AddExpenseModalProps) => {
  const expenseCategories = [
    "Food",
    "Travel",
    "Bills",
    "Shopping",
    "Entertainment",
    "Health",
    "Education",
    "Groceries",
    "Subscriptions",
    "Others",
  ];

  const {
    addExpense,
    isExpenseAdding,
    updateExpense,
    isExpenseUpdating,
    deleteExpense,
    isExpenseDeleting,
  } = useExpenseStore();

  const [expenseData, setExpenseData] = useState<AddExpenseData>({
    category: "",
    amount: "",
    description: "",
    date: "",
  });

  // ? Fill fields when edit mode opens
  useEffect(() => {
    if (mode === "edit" && selectedExpense) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setExpenseData({
        category: selectedExpense.category,
        amount: selectedExpense.amount.toString(),
        description: selectedExpense.description || "",
        date: selectedExpense.date || "",
      });
    }

    // ? Reset form in add mode
    if (mode === "add") {
      setExpenseData({
        category: "",
        amount: "",
        description: "",
        date: "",
      });
    }
  }, [mode, selectedExpense]);

  // ? Handle form submission
  const handleExpenseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...expenseData,
      amount: parseFloat(expenseData.amount),
    };

    if (mode === "edit") {
      if (selectedExpense && selectedExpense.id != null) {
        await updateExpense(selectedExpense.id, payload);
      }
    } else {
      await addExpense(payload);
    }

    onClose();
  };

  // ? Delete handler
  const handleDelete = async () => {
    if (!selectedExpense || selectedExpense.id == null) return;

    await deleteExpense(selectedExpense.id);

    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-95 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-md rounded-4xl bg-white p-6 shadow-2xl"
          >
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">
                  {mode === "edit" ? "Edit Expense" : "Add Expense"}
                </h2>

                <p className="text-sm text-slate-500">
                  Keep track of your spending
                </p>
              </div>

              <button
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
              >
                <IoClose size={22} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleExpenseSubmit} className="space-y-5">
              {/* Category */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Expense Category
                </label>

                <select
                  value={expenseData.category}
                  onChange={(e) =>
                    setExpenseData({
                      ...expenseData,
                      category: e.target.value,
                    })
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-rose-400 focus:bg-white"
                >
                  <option value="">Select category</option>

                  {expenseCategories.map((category) => (
                    <option key={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Amount */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Amount
                </label>

                <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 focus-within:border-rose-400 focus-within:bg-white">
                  <FaIndianRupeeSign className="text-slate-500" />

                  <input
                    value={expenseData.amount}
                    onChange={(e) =>
                      setExpenseData({
                        ...expenseData,
                        amount: e.target.value,
                      })
                    }
                    type="text"
                    placeholder="Enter amount"
                    className="w-full bg-transparent px-3 py-3 outline-none"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Description
                </label>

                <textarea
                  value={expenseData.description}
                  onChange={(e) =>
                    setExpenseData({
                      ...expenseData,
                      description: e.target.value,
                    })
                  }
                  rows={3}
                  placeholder="Write something..."
                  className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-rose-400 focus:bg-white"
                />
              </div>

              {/* Date & Time */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Date & Time
                </label>

                <input
                  value={
                    expenseData.date
                      ? new Date(expenseData.date).toISOString().slice(0, 16)
                      : ""
                  }
                  onChange={(e) =>
                    setExpenseData({
                      ...expenseData,
                      date: e.target.value,
                    })
                  }
                  type="datetime-local"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-rose-400 focus:bg-white"
                />
              </div>

              {/* Action Buttons */}
              {mode === "edit" ? (
                <div className="flex gap-3">
                  {/* Delete Button */}
                  <motion.button
                    onClick={handleDelete}
                    whileHover={{ scale: isExpenseDeleting ? 1 : 1.02 }}
                    whileTap={{ scale: isExpenseDeleting ? 1 : 0.97 }}
                    type="button"
                    disabled={isExpenseUpdating || isExpenseDeleting}
                    className={`w-full rounded-2xl py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 ${
                      isExpenseDeleting || isExpenseUpdating
                        ? "cursor-not-allowed bg-gray-400"
                        : "bg-linear-to-r from-red-500 to-red-600"
                    }`}
                  >
                    {isExpenseDeleting ? "Deleting..." : "Delete"}
                  </motion.button>

                  {/* Update Button */}
                  <motion.button
                    whileHover={{ scale: isExpenseUpdating ? 1 : 1.02 }}
                    whileTap={{ scale: isExpenseUpdating ? 1 : 0.97 }}
                    type="submit"
                    disabled={isExpenseUpdating || isExpenseDeleting}
                    className={`w-full rounded-2xl py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 ${
                      isExpenseUpdating || isExpenseDeleting
                        ? "cursor-not-allowed bg-gray-400"
                        : "bg-linear-to-r from-rose-500 to-red-600"
                    }`}
                  >
                    {isExpenseUpdating ? "Updating..." : "Update Expense"}
                  </motion.button>
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: isExpenseAdding ? 1 : 1.02 }}
                  whileTap={{ scale: isExpenseAdding ? 1 : 0.97 }}
                  type="submit"
                  disabled={isExpenseAdding}
                  className={`w-full rounded-2xl py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 ${
                    isExpenseAdding
                      ? "cursor-not-allowed bg-gray-400"
                      : "bg-linear-to-r from-rose-500 to-red-600"
                  }`}
                >
                  {isExpenseAdding ? "Adding..." : "Add Expense"}
                </motion.button>
              )}
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
