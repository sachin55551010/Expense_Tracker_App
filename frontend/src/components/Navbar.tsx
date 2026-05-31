import { Wallet, LogOut, Menu, X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";

export const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const name = authUser?.name;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-3">
          <span className="font-black text-slate-400">{name}</span>

          <button
            onClick={logout}
            className="flex items-center gap-2 rounded-2xl bg-linear-to-r from-red-500 to-pink-500 px-3 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-red-500/30 active:scale-95"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden rounded-lg p-2 text-white"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-slate-900/95 px-4 py-4">
          <div className="mb-3 text-slate-300 font-semibold">{name}</div>

          <button
            onClick={logout}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-red-500 to-pink-500 px-3 py-2 text-sm font-semibold text-white"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};
