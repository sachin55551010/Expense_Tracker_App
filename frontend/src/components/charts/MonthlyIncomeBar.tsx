import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useIncomeStore } from "../../store/useIncomeStore";

const MonthlyIncomeBar = () => {
  const { monthlyIncome, month } = useIncomeStore();

  const currentDate = new Date();
  const year = currentDate.getFullYear();

  // fallback to current month if localStorage is empty
  const selectedMonth = isNaN(month) ? currentDate.getMonth() : month;

  // Get total days in selected month
  const daysInMonth = new Date(year, selectedMonth + 1, 0).getDate();

  const chartData = Array.from({ length: daysInMonth }, (_, index) => ({
    day: index + 1,
    amount: 0,
  }));

  monthlyIncome?.forEach((income) => {
    const incomeDate = new Date(income.date);

    // Filter by selected month
    if (
      incomeDate.getMonth() === selectedMonth &&
      incomeDate.getFullYear() === year
    ) {
      const dayIndex = incomeDate.getDate() - 1;
      chartData[dayIndex].amount += Number(income.amount);
    }
  });

  return (
    <div className="h-100 w-auto">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 10,
            right: 10,
            left: -20,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="1 1" strokeOpacity={0.2} />

          <XAxis
            tick={{ fontSize: 12 }}
            dataKey="day"
            label={{
              value: "Day",
              position: "insideBottom",
              offset: -4,
            }}
          />

          <YAxis tick={{ fontSize: 11 }} />

          <Tooltip
            formatter={(value) => [`₹${value}`, "Income"]}
            labelFormatter={(label) => `Day ${label}`}
          />

          <Bar
            dataKey="amount"
            fill="#A7F3D0"
            radius={[8, 8, 0, 0]}
            stroke="none"
            activeBar={{
              fill: "#A7F3D0",
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyIncomeBar;
