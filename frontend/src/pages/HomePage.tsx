import { useState } from "react";
import { AddIncomeAndExpense } from "../components/AddIncomeAndExpense";
import { AddIncomeModal } from "../components/dashboard/AddIncomeModal";
import { ExpenseInfoCard } from "../components/dashboard/ExpenseInfoCard";
import { Navbar } from "../components/Navbar";
import { AddExpenseModal } from "../components/dashboard/AddExpenseModal";
import { IncomeTable } from "../components/dashboard/IncomeTable";

import type { IncomeData } from "../types/income";
import type { ExpenseData } from "../types/expense";
import { ExpenseTable } from "../components/dashboard/ExpenseTable";

export const HomePage = () => {
  const [isAddIncomeOpen, setIsAddIncomeOpen] = useState(false);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedIncome, setSelectedIncome] = useState<IncomeData | null>(null);

  const [selectedExpense, setSelectedExpense] = useState<ExpenseData | null>(
    null,
  );

  // OPEN ADD MODAL
  const handleAddIncome = () => {
    setModalMode("add");
    setSelectedIncome(null);
    setIsAddIncomeOpen(true);
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
        <IncomeTable onEditIncome={handleEditIncome} />
        <ExpenseTable onEditExpense={handleEditExpense} />
      </div>
    </main>
  );
};
