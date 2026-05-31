import { useEffect } from "react";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FaAnglesUp } from "react-icons/fa6";
import { FaAnglesDown } from "react-icons/fa6";
import { BsFillPiggyBankFill } from "react-icons/bs";
import { useDashboardStore } from "../../store/useDashboardStore";

const ValueSkeleton = ({
  width = "w-28",
  height = "h-8",
}: {
  width?: string;
  height?: string;
}) => (
  <div className={`${width} ${height} animate-pulse rounded-lg bg-slate-200`} />
);

export const ExpenseInfoCard = () => {
  const { getDashboardSummary, isDashboardLoading, dashboardData } =
    useDashboardStore();

  useEffect(() => {
    getDashboardSummary();
  }, [getDashboardSummary]);

  const cardDetails = [
    {
      title: "Total Balance",
      amount: dashboardData?.totalMonthSaving ?? 0,
      icon: <FaIndianRupeeSign />,
      description: "Available balance",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Monthly Income",
      amount: dashboardData?.totalMonthIncome ?? 0,
      icon: <FaAnglesUp />,
      description: "Income this month",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Monthly Expense",
      amount: dashboardData?.totalMonthExpense ?? 0,
      icon: <FaAnglesDown />,
      description: "Spent this month",
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
    },
    {
      title: "Total Savings",
      amount: dashboardData?.totalMonthSaving ?? 0,
      icon: <BsFillPiggyBankFill />,
      description: "Your total savings",
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
      savingPercent: dashboardData?.totalMonthSavingPercent,
    },
  ];

  return (
    <section className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800">
          Dashboard Overview
        </h2>

        <p className="mt-2 text-slate-500">
          Track your income, expenses and savings for this month.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cardDetails.map((card, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            {/* Hover background */}
            <div className="absolute inset-0 bg-linear-to-br from-slate-50 to-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="relative flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-500">
                  {card.title}
                </p>

                <div className="h-10 flex items-center">
                  {isDashboardLoading ? (
                    <ValueSkeleton />
                  ) : (
                    <h3 className="text-3xl font-bold text-slate-800">
                      ₹
                      {Number(card.amount).toLocaleString("en-IN", {
                        maximumFractionDigits: 2,
                      })}
                    </h3>
                  )}
                </div>

                <p className="text-sm text-slate-400">{card.description}</p>
              </div>

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl shadow-sm ${card.iconBg} ${card.iconColor}`}
              >
                {card.icon}
              </div>
            </div>

            {/* Savings Percentage */}
            {card.savingPercent !== undefined && (
              <div className="relative mt-5 border-t border-slate-100 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">Savings Rate</span>

                  {isDashboardLoading ? (
                    <ValueSkeleton width="w-16" height="h-8" />
                  ) : (
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                      {Number(card.savingPercent).toFixed(2)}%
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
