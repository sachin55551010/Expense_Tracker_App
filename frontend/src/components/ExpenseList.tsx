import { useEffect } from "react";
import { useExpense } from "../store/useExpense";
import { FaEdit, FaTrash } from "react-icons/fa";
type List = {
  id: number;
  category: string;
  description?: string;
  amount: number;
  date: string;
};
export const ExpenseList = () => {
  const { getAllExpense, allExpense } = useExpense();

  useEffect(() => {
    getAllExpense();
  }, [getAllExpense]);
  return (
    <section className="mt-6 w-[90%] lg:w-[60%]">
      <ul className="space-y-3">
        {(allExpense as List[])?.map((list) => {
          return (
            <li
              key={list.id}
              className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white px-5 py-4 shadow-sm transition-all duration-200 hover:shadow-md"
            >
              {/* Left Side */}
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-semibold capitalize text-zinc-800">
                  {list.category}
                </h3>

                <p className="text-sm capitalize text-zinc-500">
                  {list.description || "No description"}
                </p>

                <span className="text-xs text-zinc-400">
                  {new Date(list.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>

              {/* Right Side */}
              <div className="flex items-center gap-4">
                <span className="text-lg font-semibold text-zinc-900">
                  ₹{list.amount}
                </span>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <button className="rounded-lg bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100">
                    <FaEdit size={14} />
                  </button>

                  <button className="rounded-lg bg-red-50 p-2 text-red-600 transition hover:bg-red-100">
                    <FaTrash size={14} />
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
