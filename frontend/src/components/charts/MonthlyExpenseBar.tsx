import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useExpenseStore } from "../../store/useExpenseStore";

export const MonthlyExpenseBar = () => {
  const { monthlyExpense, month } = useExpenseStore();
  console.log("monthly expense bar month : ", month);

  const currentDate = new Date();
  const year = currentDate.getFullYear();

  // fallback to current month if no month selected
  const selectedMonth = isNaN(month) ? currentDate.getMonth() : month;

  // Get total days in selected month
  const daysInMonth = new Date(year, selectedMonth + 1, 0).getDate();

  const chartData = Array.from({ length: daysInMonth }, (_, index) => ({
    day: index + 1,
    amount: 0,
  }));

  monthlyExpense?.forEach((expense) => {
    const expenseDate = new Date(expense.date);

    // Filter by selected month
    if (
      expenseDate.getMonth() === selectedMonth &&
      expenseDate.getFullYear() === year
    ) {
      const dayIndex = expenseDate.getDate() - 1;
      chartData[dayIndex].amount += Number(expense.amount);
    }
  });

  return (
    <div className="h-100 w-auto" style={{ outline: "none" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 10, left: -20, bottom: 10 }}
        >
          <CartesianGrid
            strokeDasharray="1 1"
            strokeOpacity={0.15}
            strokeWidth={0}
          />

          <XAxis
            dataKey="day"
            tick={{ fontSize: 12, fill: "#9CA3AF" }}
            axisLine={{ stroke: "#374151" }}
            tickLine={false}
            label={{
              value: "Day",
              position: "insideBottom",
              offset: -4,
              fill: "#6B7280",
              fontSize: 12,
            }}
          />

          <YAxis
            tick={{ fontSize: 11, fill: "#9CA3AF" }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            formatter={(value) => [`₹${value}`, "Expense"]}
            labelFormatter={(label) => `Day ${label}`}
            contentStyle={{
              backgroundColor: "#1F2937",
              border: "none",
              borderRadius: "8px",
              color: "#F9FAFB",
              fontSize: 13,
            }}
            cursor={{ fill: "rgba(248,113,113,0.08)" }}
          />

          <Bar
            dataKey="amount"
            fill="#F87171"
            radius={[8, 8, 0, 0]}
            stroke="none"
            activeBar={false}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyExpenseBar;
