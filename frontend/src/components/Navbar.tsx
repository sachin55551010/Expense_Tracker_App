import { Link } from "react-router-dom";
import { useAuth } from "../store/userAuth";

export const Navbar = () => {
  const { logout } = useAuth();
  const authUser = useAuth((state) => state.authUser);
  const name = (authUser as { user?: { name?: string } })?.user?.name;
  console.log(name);

  return (
    <nav className="flex items-center justify-between border-b border-zinc-200 bg-white px-6 py-4 fixed w-full">
      <div className="text-lg font-semibold tracking-tight text-zinc-900">
        ExpenseTracker
      </div>

      {authUser ? (
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-zinc-600">{name}</span>

          <button
            onClick={logout}
            className="rounded-xl border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="rounded-xl border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
          >
            Signup
          </Link>
        </div>
      )}
    </nav>
  );
};
