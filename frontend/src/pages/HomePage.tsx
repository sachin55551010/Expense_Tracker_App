import { useState } from "react";
import { AddIncomeAndExpense } from "../components/AddIncomeAndExpense";
import { AddIncomeModal } from "../components/dashboard/AddIncomeModal";
import { ExpenseInfoCard } from "../components/dashboard/ExpenseInfoCard";
import { Navbar } from "../components/Navbar";
import { AddExpenseModal } from "../components/dashboard/AddExpenseModal";
import { IncomeTable } from "../components/dashboard/IncomeTable";

import type { IncomeData } from "../types/income";

export const HomePage = () => {
  const [isAddIncomeOpen, setIsAddIncomeOpen] = useState(false);

  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);

  const [modalMode, setModalMode] = useState<"add" | "edit">("add");

  const [selectedIncome, setSelectedIncome] = useState<IncomeData | null>(null);

  // OPEN ADD MODAL
  const handleAddIncome = () => {
    setModalMode("add");

    setSelectedIncome(null);

    setIsAddIncomeOpen(true);
  };

  // OPEN EDIT MODAL
  const handleEditIncome = (income: IncomeData) => {
    setModalMode("edit");

    setSelectedIncome(income);

    setIsAddIncomeOpen(true);
  };

  return (
    <main>
      <Navbar />

      <ExpenseInfoCard />

      <AddIncomeAndExpense
        onAddIncome={handleAddIncome}
        onAddExpense={() => setIsAddExpenseOpen(true)}
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
      />

      {/* Income Table */}
      <div className="mt-6 p-2">
        <IncomeTable onEditIncome={handleEditIncome} />
      </div>
    </main>
  );
};
