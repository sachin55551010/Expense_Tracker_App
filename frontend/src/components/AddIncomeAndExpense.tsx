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

      {/* income expense toogle button  */}
      <div className="flex gap-3 mt-5">
        <div className="bg-gray-100 rounded-md p-2 flex justify-around relative">
          <button
            onClick={incomeToggleBtn}
            className="z-90 px-4 cursor-pointer"
          >
            Income
          </button>
          <button
            onClick={expenseToggleBtn}
            className="z-90 px-4 cursor-pointer"
          >
            Expense
          </button>
          <motion.div
            className={`absolute ${toggleTable === "income" ? "bg-emerald-200" : "bg-red-200"} h-8 rounded-md top-1 left-1`}
            initial={{ x: 0, width: 100 }}
            animate={
              toggleTable === "expense"
                ? { x: 82, width: [0, 100] }
                : { x: 0, width: [0, 100] }
            }
            transition={{ duration: 0.5 }}
          ></motion.div>
        </div>
      </div>
    </div>
  );
};
