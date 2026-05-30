import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { useIncomeStore } from "../../store/useIncomeStore";
import type { IncomeData } from "../../types/income";
interface AddIncomeData {
  source: string;
  amount: string;
  description?: string;
  date: string;
}

interface AddIncomeModalProps {
  isOpen: boolean;
  mode: "add" | "edit";
  selectedIncome?: IncomeData | null;
  onClose: () => void;
}

export const AddIncomeModal = ({
  isOpen,
  onClose,
  mode,
  selectedIncome,
}: AddIncomeModalProps) => {
  const incomeSources = [
    "Salary",
    "Freelance Income",
    "Rent",
    "Business",
    "Others",
  ];

  const {
    addIncome,
    isIncomeAdding,
    updateIncome,
    isIncomeUpdating,
    deleteIncome,
    isIncomeDeleting,
  } = useIncomeStore();

  const [incomeData, setIncomeData] = useState<AddIncomeData>({
    source: "",
    amount: "",
    description: "",
    date: "",
  });

  // ? Fill fields when edit mode opens
  useEffect(() => {
    if (mode === "edit" && selectedIncome) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIncomeData({
        source: selectedIncome.source,
        amount: selectedIncome.amount.toString(),
        description: selectedIncome.description || "",
        date: selectedIncome.date || "",
      });
    }

    // ? Reset form in add mode
    if (mode === "add") {
      setIncomeData({
        source: "",
        amount: "",
        description: "",
        date: "",
      });
    }
  }, [mode, selectedIncome]);

  // ? Handle form submission
  const handleIncomeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...incomeData,
      amount: parseFloat(incomeData.amount),
    };

    if (mode === "edit") {
      if (selectedIncome) {
        await updateIncome(selectedIncome.id, payload);
      }

      // await updateIncome(selectedIncome?.id, payload);
    } else {
      await addIncome(payload);
    }
    onClose();
  };

  // ? Delete handler
  const handleDelete = async () => {
    console.log("Delete Income");
    console.log(selectedIncome);
    if (!selectedIncome) return;
    await deleteIncome(selectedIncome?.id);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
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
                  {mode === "edit" ? "Edit Income" : "Add Income"}
                </h2>

                <p className="text-sm text-slate-500">
                  Track your earnings beautifully
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
            <form onSubmit={handleIncomeSubmit} className="space-y-5">
              {/* Source */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Income Source
                </label>

                <select
                  value={incomeData.source}
                  onChange={(e) =>
                    setIncomeData({
                      ...incomeData,
                      source: e.target.value,
                    })
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-emerald-400 focus:bg-white"
                >
                  <option value="">Select source</option>

                  {incomeSources.map((source) => (
                    <option key={source}>{source}</option>
                  ))}
                </select>
              </div>

              {/* Amount */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Amount
                </label>

                <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 focus-within:border-emerald-400 focus-within:bg-white">
                  <FaIndianRupeeSign className="text-slate-500" />

                  <input
                    value={incomeData.amount}
                    onChange={(e) =>
                      setIncomeData({
                        ...incomeData,
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
                  value={incomeData.description}
                  onChange={(e) =>
                    setIncomeData({
                      ...incomeData,
                      description: e.target.value,
                    })
                  }
                  rows={3}
                  placeholder="Write something..."
                  className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-400 focus:bg-white"
                />
              </div>

              {/* Date & Time */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Date & Time
                </label>

                <input
                  value={
                    incomeData.date
                      ? new Date(incomeData.date).toISOString().slice(0, 16)
                      : ""
                  }
                  onChange={(e) =>
                    setIncomeData({
                      ...incomeData,
                      date: e.target.value,
                    })
                  }
                  type="datetime-local"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-400 focus:bg-white"
                />
              </div>

              {/* Action Buttons */}
              {mode === "edit" ? (
                <div className="flex gap-3">
                  {/* Delete Button */}
                  <motion.button
                    onClick={handleDelete}
                    whileHover={{ scale: isIncomeDeleting ? 1 : 1.02 }}
                    whileTap={{ scale: isIncomeDeleting ? 1 : 0.97 }}
                    type="button"
                    disabled={isIncomeUpdating || isIncomeDeleting}
                    className={`w-full rounded-2xl py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 ${
                      isIncomeDeleting || isIncomeUpdating
                        ? "cursor-not-allowed bg-gray-400"
                        : "bg-linear-to-r from-red-500 to-red-600"
                    }`}
                  >
                    {isIncomeDeleting ? "Deleting..." : "Delete"}
                  </motion.button>

                  {/* Update Button */}
                  <motion.button
                    whileHover={{ scale: isIncomeUpdating ? 1 : 1.02 }}
                    whileTap={{ scale: isIncomeUpdating ? 1 : 0.97 }}
                    type="submit"
                    disabled={isIncomeUpdating || isIncomeDeleting}
                    className={`w-full rounded-2xl py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 ${
                      isIncomeUpdating || isIncomeDeleting
                        ? "cursor-not-allowed bg-gray-400"
                        : "bg-linear-to-r from-emerald-500 to-green-600"
                    }`}
                  >
                    {isIncomeUpdating ? "Updating..." : "Update Income"}
                  </motion.button>
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: isIncomeAdding ? 1 : 1.02 }}
                  whileTap={{ scale: isIncomeAdding ? 1 : 0.97 }}
                  type="submit"
                  disabled={isIncomeAdding}
                  className={`w-full rounded-2xl py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 ${
                    isIncomeAdding
                      ? "cursor-not-allowed bg-gray-400"
                      : "bg-linear-to-r from-emerald-500 to-green-600"
                  }`}
                >
                  {isIncomeAdding ? "Adding..." : "Add Income"}
                </motion.button>
              )}
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
