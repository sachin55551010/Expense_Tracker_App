import { X } from "lucide-react";

interface getMonthProp {
  getMonth: (m: number, selectedMonth: string) => void;
  onClose: () => void;
}

export const MonthSelectionModal = ({ getMonth, onClose }: getMonthProp) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const handleMonthBtn = (index: number, selectedMonth: string) => {
    getMonth(index, selectedMonth);
    onClose();
  };
  return (
    <div className="absolute top-0 left-[-40%] z-50 w-56 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-3">
        <h6 className="text-sm font-semibold text-zinc-800">Select Month</h6>

        <button
          onClick={onClose}
          className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-800"
        >
          <X size={16} />
        </button>
      </div>

      {/* Month List */}
      <ul className="max-h-72 overflow-y-auto p-2">
        {months.map((month, index) => (
          <li
            key={month}
            onClick={() => handleMonthBtn(index, month)}
            className="
          cursor-pointer rounded-xl px-3 py-2 text-sm font-medium
          text-zinc-700 transition-all duration-200
          hover:bg-blue-50 hover:text-blue-600
        "
          >
            {month}
          </li>
        ))}
      </ul>
    </div>
  );
};
