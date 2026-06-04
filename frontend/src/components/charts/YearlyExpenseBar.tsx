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
import { useEffect } from "react";

export const YearlyExpenseBar = () => {
  const { monthlyExpensePerYear, getYearlyExpense } = useExpenseStore();

  useEffect(() => {
    getYearlyExpense();
  }, [getYearlyExpense]);

  return (
    <div className="w-full h-100">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={monthlyExpensePerYear}
          margin={{
            top: 10,
            right: 10,
            left: -20,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />

          <XAxis
            tick={{ fontSize: 10 }}
            dataKey="month"
            label={{
              value: "Months",
              position: "insideBottom",
              offset: -5,
            }}
          />

          <YAxis tick={{ fontSize: 10 }} />

          <Tooltip
            formatter={(value) => [`₹${value}`, "Expense"]}
            labelFormatter={(label) => `Month ${label}`}
          />

          <Bar
            dataKey="expense"
            fill="#F87171"
            radius={[10, 10, 0, 0]}
            activeBar={{
              fill: "#F87171",
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default YearlyExpenseBar;
