import { FaIndianRupeeSign } from "react-icons/fa6";
import { FaAnglesUp } from "react-icons/fa6";
import { FaAnglesDown } from "react-icons/fa6";
import { BsFillPiggyBankFill } from "react-icons/bs";

export const ExpenseInfoCard = () => {
  const cardDetails = [
    {
      title: "Total Balance",
      amount: "1000",
      icon: <FaIndianRupeeSign />,
      description: "Available balance",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Monthly Income",
      amount: "50000",
      icon: <FaAnglesUp />,
      description: "Income this month",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Monthly Expense",
      amount: "1000",
      icon: <FaAnglesDown />,
      description: "Spent this month",
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
    },
    {
      title: "Total Savings",
      amount: "1000",
      icon: <BsFillPiggyBankFill />,
      description: "Your total savings",
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h4 className="text-3xl font-bold text-slate-800">
          Dashboard Overview
        </h4>
        <p className="text-slate-500 mt-1">
          Track your income, expenses and savings
        </p>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {cardDetails.map((card, index) => (
          <li
            key={index}
            className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* subtle background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white opacity-0 group-hover:opacity-100 transition duration-300" />

            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {card.title}
                </p>

                <h2 className="mt-3 text-3xl font-bold text-slate-800">
                  ₹{card.amount}
                </h2>

                <p className="mt-2 text-sm text-slate-400">
                  {card.description}
                </p>
              </div>

              {/* icon */}
              <div
                className={`h-14 w-14 rounded-2xl flex items-center justify-center text-2xl shadow-md ${card.iconBg} ${card.iconColor}`}
              >
                {card.icon}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
