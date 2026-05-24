import { ExpenseInput } from "../components/ExpenseInput";
import { ExpenseList } from "../components/ExpenseList";

export const HomePage = () => {
  return (
    <main className="flex flex-col items-center justify-center pt-16">
      <ExpenseInput />
      <ExpenseList />
    </main>
  );
};
