import { motion } from "framer-motion";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FiCalendar } from "react-icons/fi";
import { useIncomeStore } from "../../store/useIncomeStore";
import { useEffect, useState } from "react";

import type { IncomeData } from "../../types/income";
import { MonthSelectionModal } from "../MonthSelectionModal";
import { ChevronDown } from "lucide-react";

interface IncomeTableProps {
  onEditIncome: (income: IncomeData) => void;
}

export const IncomeTable = ({ onEditIncome }: IncomeTableProps) => {
  const {
    getMonthlyIncome,
    isIncomeLoading,
    monthlyIncome,
    month,
    setMonth,
    monthlyIncomeTotal,
  } = useIncomeStore();

  const currentMonthName = new Date().toLocaleString("en-US", {
    month: "short",
  });

  const [openMonthModal, setOpenMonthModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<string>(() => {
    const savedMonth = localStorage.getItem("current_month");
    return savedMonth ? savedMonth : currentMonthName;
  });

  const incomeCategories: Record<string, string> = {
    Salary: "💼",
    "Freelance Income": "💻",
    Rent: "🏠",
    Business: "🏢",
    Others: "💰",
  };

  const getMonth = (m: number, selectedMonth: string) => {
    setMonth(m);
    setSelectedMonth(selectedMonth);
  };
  useEffect(() => {
    getMonthlyIncome(month);
  }, [getMonthlyIncome, month]);
  useEffect(() => {
    localStorage.setItem("current_month", selectedMonth);
    localStorage.setItem("current_month_num", month.toString());
  }, [selectedMonth, month]);

  return (
    <div className="max-h-120 rounded-2xl border border-zinc-200 p-2 shadow-sm w-full">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-zinc-800">Income History</h2>

          <p className="text-xs text-zinc-500">All income transactions</p>
        </div>

        {/* month and total amount section */}
        <div className="flex items-center gap-2 relative">
          <div>
            {/* choose month button  */}
            <button
              onClick={() => setOpenMonthModal(true)}
              className="group flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 shadow-sm transition-all duration-200 hover:border-zinc-300 hover:shadow-md active:scale-[0.98]"
            >
              <span>{selectedMonth}</span>

              <ChevronDown
                size={16}
                className="transition-transform duration-200 group-hover:translate-y-0.5"
              />
            </button>
          </div>
          {/* Total Amount */}
          <div className="rounded-xl bg-emerald-50 px-3 py-2">
            <p className="text-[10px] text-zinc-500">Total</p>
            {isIncomeLoading ? (
              <div className="mt-1 h-5 w-15 animate-pulse rounded bg-emerald-200"></div>
            ) : (
              <div className="flex items-center text-sm font-bold text-emerald-600">
                <FaIndianRupeeSign className="mr-1 text-[10px]" />
                {monthlyIncomeTotal}
              </div>
            )}
          </div>
          {openMonthModal && (
            <MonthSelectionModal
              getMonth={getMonth}
              onClose={() => setOpenMonthModal(false)}
            />
          )}
        </div>
      </div>

      {/* Loading Skeleton */}
      {isIncomeLoading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="animate-pulse rounded-xl bg-zinc-50 p-4"
            >
              <div className="flex items-center justify-between">
                {/* Left Side */}
                <div className="space-y-2">
                  <div className="h-3 w-24 rounded bg-zinc-200"></div>

                  <div className="h-2 w-40 rounded bg-zinc-200"></div>
                </div>

                {/* Amount */}
                <div className="h-6 w-20 rounded-lg bg-emerald-200"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table */
        <div className="overflow-x-auto overflow-y-scroll max-h-100">
          <table className=" w-full border-separate border-spacing-y-2">
            <thead>
              <tr>
                <th className="px-2 text-left text-[11px] font-semibold text-zinc-500">
                  Source
                </th>

                <th className="px-2 text-left text-[11px] font-semibold text-zinc-500">
                  Details
                </th>

                <th className="px-2 text-left text-[11px] font-semibold text-zinc-500">
                  Date
                </th>

                <th className="px-2 text-right text-[11px] font-semibold text-zinc-500">
                  Amount
                </th>
              </tr>
            </thead>

            <tbody>
              {monthlyIncome?.map((income, index) => (
                <motion.tr
                  key={income.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-zinc-50"
                  onClick={() => onEditIncome(income)}
                >
                  {/* Source */}
                  <td className="rounded-l-xl px-2 py-3">
                    <div className="flex items-center gap-2">
                      <div className="rounded-lg p-2 text-emerald-600">
                        {incomeCategories[income.source]}
                      </div>

                      <p className="text-xs font-medium text-zinc-700">
                        {income.source}
                      </p>
                    </div>
                  </td>

                  {/* Description */}
                  <td className="px-2 py-3 text-[11px] text-zinc-500">
                    {income.description}
                  </td>

                  {/* Date */}
                  <td className="px-2 py-3">
                    <div className="flex items-center gap-1 text-[11px] text-zinc-500">
                      <FiCalendar size={11} />
                      {new Date(income.date).toLocaleDateString()}
                    </div>
                  </td>

                  {/* Amount */}
                  <td className="rounded-r-xl px-2 py-3 text-right">
                    <div className="inline-flex items-center rounded-lg bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-600">
                      <FaIndianRupeeSign className="mr-1 text-[10px]" />
                      {income.amount.toLocaleString()}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
