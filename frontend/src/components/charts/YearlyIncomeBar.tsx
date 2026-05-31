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
export const YearlyIncomeBar = () => {
  const { monthlyIncomePerYear } = useIncomeStore();
  console.log(monthlyIncomePerYear);

  return (
    <div className="w-full h-100">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={monthlyIncomePerYear}
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
            dataKey="month"
            label={{
              value: "Months",
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
            dataKey="income"
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
