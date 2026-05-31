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
  const { monthlyIncome } = useIncomeStore();

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Get total days in current month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Create data for all days with amount = 0
  const chartData = Array.from({ length: daysInMonth }, (_, index) => ({
    day: index + 1,
    amount: 0,
  }));

  // Merge incomes from the same day
  monthlyIncome?.forEach((income) => {
    const incomeDate = new Date(income.date);

    // Ignore data from other months
    if (incomeDate.getMonth() === month && incomeDate.getFullYear() === year) {
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
            top: 20,
            right: 20,
            left: 10,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            tick={{ fontSize: 12 }}
            dataKey="day"
            label={{
              value: "Day",
              position: "insideBottom",
              offset: -5,
            }}
          />

          <YAxis tick={{ fontSize: 14 }} />

          <Tooltip
            formatter={(value) => [`₹${value}`, "Income"]}
            labelFormatter={(label) => `Day ${label}`}
          />

          <Bar
            dataKey="amount"
            fill="#8884d8"
            radius={[8, 8, 0, 0]}
            activeBar={{
              fill: "#6d28d9",
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyIncomeBar;
