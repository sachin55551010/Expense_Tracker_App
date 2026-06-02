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
import { useEffect } from "react";
export const YearlyIncomeBar = () => {
  const { monthlyIncomePerYear, getYearlyIncome } = useIncomeStore();

  useEffect(() => {
    getYearlyIncome();
  }, [getYearlyIncome]);

  return (
    <div className="w-full h-100">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={monthlyIncomePerYear}
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
            formatter={(value) => [`₹${value}`, "Income"]}
            labelFormatter={(label) => `Month ${label}`}
          />

          <Bar
            dataKey="income"
            fill="#A7F3D0"
            radius={[10, 10, 0, 0]}
            activeBar={{
              fill: "#A7F3D0",
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
