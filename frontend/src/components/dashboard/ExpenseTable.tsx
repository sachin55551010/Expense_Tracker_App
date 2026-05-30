import { FaIndianRupeeSign } from "react-icons/fa6";
import { FiCalendar } from "react-icons/fi";
import { motion } from "motion/react";
import { useExpenseStore } from "../../store/useExpenseStore";
import { useEffect } from "react";
import type { ExpenseData } from "../../types/expense";
interface ExpenseTableProps {
  onEditExpense: (income: ExpenseData) => void;
}
export const ExpenseTable = ({ onEditExpense }: ExpenseTableProps) => {
  const { isExpenseLoading, getAllExpenses, allExpenses } = useExpenseStore();

  useEffect(() => {
    getAllExpenses();
  }, [getAllExpenses]);
  const expenseList = allExpenses?.expense;
  const totalAmount = allExpenses?.totalExpense;

  // emojis for expense category
  const categoryEmojis: Record<string, string> = {
    Food: "🍔",
    Travel: "✈️",
    Bills: "📄",
    Shopping: "🛍️",
    Entertainment: "🎬",
    Health: "🏥",
    Education: "📚",
    Groceries: "🛒",
    Subscriptions: "🔄",
    Others: "📦",
  };

  return (
    <div className="rounded-2xl border border-zinc-200 p-2 shadow-sm w-full">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-zinc-800">Expense History</h2>

          <p className="text-xs text-zinc-500">All expense transactions</p>
        </div>

        {/* Total Amount */}
        <div className="rounded-xl bg-red-50 px-3 py-2">
          <p className="text-[10px] text-zinc-500">Total</p>

          {isExpenseLoading ? (
            <div className="mt-1 h-5 w-20 animate-pulse rounded bg-red-200"></div>
          ) : (
            <div className="flex items-center text-sm font-bold text-red-600">
              <FaIndianRupeeSign className="mr-1 text-[10px]" />
              {totalAmount}
            </div>
          )}
        </div>
      </div>

      {/* Loading Skeleton */}
      {isExpenseLoading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="animate-pulse rounded-xl bg-zinc-50 p-4"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="h-3 w-24 rounded bg-zinc-200"></div>
                  <div className="h-2 w-40 rounded bg-zinc-200"></div>
                </div>

                <div className="h-6 w-20 rounded-lg bg-red-200"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-y-2">
            <thead>
              <tr>
                <th className="px-2 text-left text-[11px] font-semibold text-zinc-500">
                  Category
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
              {expenseList?.map((expense, index) => (
                <motion.tr
                  key={expense.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="cursor-pointer bg-zinc-50"
                  onClick={() => onEditExpense(expense)}
                >
                  {/* Category */}
                  <td className="rounded-l-xl px-2 py-3">
                    <div className="flex items-center gap-2">
                      <div className="rounded-lg p-2 text-red-600">
                        {categoryEmojis[expense?.category]}
                      </div>

                      <p className="text-xs font-medium text-zinc-700">
                        {expense.category}
                      </p>
                    </div>
                  </td>

                  {/* Description */}
                  <td className="px-2 py-3 text-[11px] text-zinc-500">
                    {expense.description}
                  </td>

                  {/* Date */}
                  <td className="px-2 py-3">
                    <div className="flex items-center gap-1 text-[11px] text-zinc-500">
                      <FiCalendar size={11} />
                      {new Date(expense.date).toLocaleDateString()}
                    </div>
                  </td>

                  {/* Amount */}
                  <td className="rounded-r-xl px-2 py-3 text-right">
                    <div className="inline-flex items-center rounded-lg bg-red-100 px-2 py-1 text-xs font-semibold text-red-600">
                      <FaIndianRupeeSign className="mr-1 text-[10px]" />
                      {expense.amount.toLocaleString()}
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
