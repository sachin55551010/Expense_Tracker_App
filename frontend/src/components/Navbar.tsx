import { Wallet, LogOut } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

export const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const name = authUser?.name;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-900/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-2">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-500 to-cyan-400 shadow-lg shadow-cyan-500/20">
            <Wallet className="h-5 w-5 text-white" />
          </div>

          <div>
            <h1 className="text-md font-bold tracking-wide text-white">
              Expense Tracker
            </h1>
            <p className="text-xs text-slate-400">Manage your finances</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 rounded-2xl py-2 ">
            {/* name */}
            <span className="text-slate-400 font-black">{name}</span>
            {/* Logout Button */}
            <button
              onClick={logout}
              className="flex items-center gap-2 rounded-2xl bg-linear-to-r from-red-500 to-pink-500 px-3 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-red-500/30 active:scale-95"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
