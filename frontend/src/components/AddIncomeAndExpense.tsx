import { motion } from "framer-motion";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

export const AddIncomeAndExpense = ({
  onAddIncome,
  onAddExpense,
}: {
  onAddIncome: () => void;
  onAddExpense: () => void;
}) => {
  return (
    <div className="flex gap-3">
      {/* Income Button */}
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 rounded-2xl bg-white px-5 py-3 shadow-md border border-slate-200"
        onClick={onAddIncome}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
          <FaArrowTrendUp size={18} />
        </div>

        <div className="text-left">
          <p className="text-xs text-slate-500">Add</p>
          <h2 className="text-sm font-semibold text-slate-800">Income</h2>
        </div>
      </motion.button>

      {/* Expense Button */}
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 rounded-2xl bg-white px-5 py-3 shadow-md border border-slate-200"
        onClick={onAddExpense}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
          <FaArrowTrendDown size={18} />
        </div>

        <div className="text-left">
          <p className="text-xs text-slate-500">Add</p>
          <h2 className="text-sm font-semibold text-slate-800">Expense</h2>
        </div>
      </motion.button>
    </div>
  );
};
