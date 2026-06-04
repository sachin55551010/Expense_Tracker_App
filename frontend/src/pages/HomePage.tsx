import { useState } from "react";
import { AddIncomeAndExpense } from "../components/AddIncomeAndExpense";
import { AddIncomeModal } from "../components/dashboard/AddIncomeModal";
import { ExpenseInfoCard } from "../components/dashboard/ExpenseInfoCard";
import { Navbar } from "../components/Navbar";
import { AddExpenseModal } from "../components/dashboard/AddExpenseModal";
import { IncomeTable } from "../components/dashboard/IncomeTable";
import { FiBarChart2 } from "react-icons/fi";
import type { IncomeData } from "../types/income";
import type { ExpenseData } from "../types/expense";
import { ExpenseTable } from "../components/dashboard/ExpenseTable";
import MonthlyIncomeBar from "../components/charts/MonthlyIncomeBar";
import { motion } from "motion/react";
import { YearlyIncomeBar } from "../components/charts/YearlyIncomeBar";
import MonthlyExpenseBar from "../components/charts/MonthlyExpenseBar";
import YearlyExpenseBar from "../components/charts/YearlyExpenseBar";
import { LucideRefreshCcw } from "lucide-react";
import { useIncomeStore } from "../store/useIncomeStore";
import { useExpenseStore } from "../store/useExpenseStore";

export const HomePage = () => {
  const {
    isMonthlyIncomeLoading,
    getMonthlyIncome,
    month,
    getYearlyIncome,
    isYearlyIncomeLoading,
  } = useIncomeStore();

  const {
    getMonthlyExpense,
    isMonthlyExpenseLoading,
    getYearlyExpense,
    isYearlyExpenseLoading,
  } = useExpenseStore();
  const [isAddIncomeOpen, setIsAddIncomeOpen] = useState(false);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedIncome, setSelectedIncome] = useState<IncomeData | null>(null);

  const [toggleTable, setToggleTable] = useState<"income" | "expense">(
    "income",
  );

  const [selectedExpense, setSelectedExpense] = useState<ExpenseData | null>(
    null,
  );

  const [toggleGraph, setToggleGraph] = useState<"month" | "year">("month");
  const [toggleExpenseGraph, setToggleExpenseGraph] = useState<
    "month" | "year"
  >("month");
  const currentMonthName = new Date().toLocaleString("en-US", {
    month: "short",
  });

  //? function to handle month selection from income and expense table
  const [openMonthModal, setOpenMonthModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<string>(() => {
    const savedMonth = localStorage.getItem("current_month");
    return savedMonth ? savedMonth : currentMonthName;
  });

  // OPEN ADD MODAL
  const handleAddIncome = () => {
    setModalMode("add");
    setSelectedIncome(null);
    setIsAddIncomeOpen(true);
  };

  const refreshIncomeBarBtn = () => {
    getMonthlyIncome(month);
    if (toggleGraph === "year") {
      getYearlyIncome();
    }
  };

  const refreshExpenseBarBtn = () => {
    getMonthlyExpense(month);
    if (toggleExpenseGraph === "year") {
      console.log("year expense graph load");
      getYearlyExpense();
    }
  };

  // OPEN ADD EXPENSE
  const handleAddExpense = () => {
    setModalMode("add");
    setSelectedExpense(null);
    setIsAddExpenseOpen(true);
  };

  // OPEN EDIT MODAL
  const handleEditIncome = (income: IncomeData) => {
    setModalMode("edit");
    setSelectedIncome(income);
    setIsAddIncomeOpen(true);
  };

  const handleEditExpense = (expense: ExpenseData) => {
    setModalMode("edit");
    setSelectedExpense(expense);
    setIsAddExpenseOpen(true);
  };

  return (
    <main>
      <Navbar />
      <ExpenseInfoCard />
      <AddIncomeAndExpense
        onAddIncome={handleAddIncome}
        onAddExpense={handleAddExpense}
        incomeToggleBtn={() => setToggleTable("income")}
        expenseToggleBtn={() => setToggleTable("expense")}
        toggleTable={toggleTable}
      />

      {/* Income Modal */}
      <AddIncomeModal
        isOpen={isAddIncomeOpen}
        onClose={() => setIsAddIncomeOpen(false)}
        mode={modalMode}
        selectedIncome={selectedIncome}
      />

      {/* Expense Modal */}
      <AddExpenseModal
        isOpen={isAddExpenseOpen}
        onClose={() => setIsAddExpenseOpen(false)}
        mode={modalMode}
        selectedExpense={selectedExpense}
      />

      {/* Income Table */}
      <div className="mt-6 p-2 flex flex-col gap-4 md:flex-row w-full">
        <div
          className={`${toggleTable === "income" ? "block" : "hidden"} flex flex-col w-full gap-4 md:flex-row`}
        >
          <IncomeTable
            onEditIncome={handleEditIncome}
            setOpenMonthModal={setOpenMonthModal}
            openMonthModal={openMonthModal}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
          />
          <div className="w-full p-2 rounded-2xl shadow-[0px_0px_3px_rgba(0,0,0,.5)]">
            {/* graph header */}
            <div className="flex justify-between items-center">
              {/* month year heading */}
              <div className="flex items-center gap-2">
                <FiBarChart2 size={24} className="text-green-400" />
                <h4 className="font-bold">
                  {toggleGraph === "month" ? "Monthly Income" : "Yearly Income"}
                </h4>
              </div>

              <div className="flex items-center gap-4">
                <motion.button
                  onClick={refreshIncomeBarBtn}
                  className="cursor-pointer"
                  animate={
                    isMonthlyIncomeLoading || isYearlyIncomeLoading
                      ? { rotate: 360 }
                      : { rotate: 0 }
                  }
                  transition={
                    isMonthlyIncomeLoading || isYearlyIncomeLoading
                      ? {
                          duration: 1,
                          ease: "linear",
                          repeat: Infinity,
                        }
                      : {
                          duration: 0,
                        }
                  }
                >
                  <LucideRefreshCcw size={20} />
                </motion.button>
                {/* month year button  */}
                <div className="flex bg-gray-200 p-1 rounded-lg w-fit">
                  {(["month", "year"] as const).map((item) => (
                    <button
                      key={item}
                      onClick={() => setToggleGraph(item)}
                      className="relative px-5 py-2 rounded-md capitalize font-medium"
                    >
                      {toggleGraph === item && (
                        <motion.div
                          layoutId="graph-toggle"
                          className="absolute inset-0 bg-white rounded-md shadow"
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 25,
                          }}
                        />
                      )}

                      <span
                        className={`relative z-10 ${
                          toggleGraph === item ? "text-black" : "text-gray-500"
                        }`}
                      >
                        {item}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className={`${toggleGraph === "month" ? "block" : "hidden"}`}>
              <MonthlyIncomeBar />
            </div>

            <div className={`${toggleGraph === "year" ? "block" : "hidden"} `}>
              <YearlyIncomeBar />
            </div>
          </div>
        </div>

        <div
          className={`${toggleTable === "expense" ? "block" : "hidden"} flex flex-col w-full gap-4 md:flex-row`}
        >
          <ExpenseTable
            onEditExpense={handleEditExpense}
            setOpenMonthModal={setOpenMonthModal}
            openMonthModal={openMonthModal}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
          />

          <div className="w-full p-2 rounded-2xl shadow-[0px_0px_3px_rgba(0,0,0,.5)]">
            {/* graph header */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <FiBarChart2 size={24} className="text-red-400" />
                <h4 className="font-bold">
                  {toggleExpenseGraph === "month"
                    ? "Monthly Expense"
                    : "Yearly Expense"}
                </h4>
              </div>

              <div className="flex items-center gap-4">
                <motion.button
                  onClick={refreshExpenseBarBtn}
                  className="cursor-pointer"
                  animate={
                    isMonthlyExpenseLoading || isYearlyExpenseLoading
                      ? { rotate: 360 }
                      : { rotate: 0 }
                  }
                  transition={
                    isMonthlyExpenseLoading || isYearlyExpenseLoading
                      ? {
                          duration: 1,
                          ease: "linear",
                          repeat: Infinity,
                        }
                      : {
                          duration: 0,
                        }
                  }
                >
                  <LucideRefreshCcw size={20} />
                </motion.button>
                {/* month year button */}
                <div className="flex bg-gray-200 p-1 rounded-lg w-fit">
                  {(["month", "year"] as const).map((item) => (
                    <button
                      key={item}
                      onClick={() => setToggleExpenseGraph(item)}
                      className="relative px-5 py-2 rounded-md capitalize font-medium"
                    >
                      {toggleExpenseGraph === item && (
                        <motion.div
                          layoutId="expense-graph-toggle"
                          className="absolute inset-0 bg-white rounded-md shadow"
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 25,
                          }}
                        />
                      )}

                      <span
                        className={`relative z-10 ${
                          toggleExpenseGraph === item
                            ? "text-black"
                            : "text-gray-500"
                        }`}
                      >
                        {item}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* month expense bar */}
            <div
              className={`${toggleExpenseGraph === "month" ? "block" : "hidden"}`}
            >
              <MonthlyExpenseBar />
            </div>

            {/* yearly expense bar */}
            <div
              className={`${toggleExpenseGraph === "year" ? "block" : "hidden"}`}
            >
              <YearlyExpenseBar />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
