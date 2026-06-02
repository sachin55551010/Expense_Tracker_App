import { motion } from "motion/react";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

export const AddIncomeAndExpense = ({
  onAddIncome,
  onAddExpense,
  incomeToggleBtn,
  expenseToggleBtn,
  toggleTable,
}: {
  onAddIncome: () => void;
  onAddExpense: () => void;
  incomeToggleBtn: () => void;
  expenseToggleBtn: () => void;
  toggleTable: "income" | "expense";
}) => {
  return (
    <div className="flex flex-col gap-2 ml-6">
      <div className="flex gap-2.5">
        <button
          onClick={onAddIncome}
          className="group flex items-center gap-2 rounded-full bg-emerald-100 px-5 py-2 text-sm font-medium text-emerald-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_1px_3px_rgba(16,185,129,0.15)] transition-all hover:-translate-y-px hover:bg-emerald-200 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_3px_10px_rgba(16,185,129,0.25)] active:scale-95 dark:bg-emerald-500/15 dark:text-emerald-300 dark:hover:bg-emerald-500/25"
        >
          <span className="flex h-5.5 w-5.5 items-center justify-center rounded-full bg-emerald-500 text-white">
            <FaArrowTrendUp size={10} />
          </span>
          Income
        </button>

        <button
          onClick={onAddExpense}
          className="group flex items-center gap-2 rounded-full bg-red-100 px-5 py-2 text-sm font-medium text-red-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_1px_3px_rgba(239,68,68,0.15)] transition-all hover:-translate-y-px hover:bg-red-200 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_3px_10px_rgba(239,68,68,0.25)] active:scale-95 dark:bg-red-500/15 dark:text-red-300 dark:hover:bg-red-500/25"
        >
          <span className="flex h-5.5 w-5.5 items-center justify-center rounded-full bg-red-500 text-white">
            <FaArrowTrendDown size={10} />
          </span>
          Expense
        </button>
      </div>

      {/* income expense toogle button  */}
      <div
        className={`flex mt-5 w-fit p-2 border border-gray-200 rounded-2xl relative bg-gray-50`}
      >
        <button
          onClick={incomeToggleBtn}
          className={`py-1 cursor-pointer w-25 z-90 ${toggleTable === "income" ? "text-emerald-600 font-bold" : "text-gray-400 font-semibold"}`}
        >
          Income
        </button>
        <button
          onClick={expenseToggleBtn}
          className={`py-1 cursor-pointer w-25 z-90 ${toggleTable === "expense" ? "text-red-600 font-bold" : "text-gray-400 font-semibold"}`}
        >
          Expense
        </button>

        <motion.div
          className={`inset-1 w-27 rounded-xl absolute ${toggleTable === "income" ? "bg-emerald-200" : "bg-red-200"}`}
          animate={toggleTable === "income" ? { x: 0 } : { x: 100 }}
          transition={{
            duration: 0.4,
          }}
        ></motion.div>
      </div>
    </div>
  );
};
