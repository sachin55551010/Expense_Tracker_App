import { useState } from "react";
import type { UserData } from "../types/userData";
import { useAuth } from "../store/userAuth";
export const SignupPage = () => {
  const { signup } = useAuth();
  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    password: "",
  });
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signup(userData);
  };
  return (
    <main className="flex items-center justify-center">
      <form
        onSubmit={handleFormSubmit}
        className="w-[90%] max-w-md bg-white border border-gray-200 rounded-2xl p-8 shadow-sm mt-8"
      >
        <h1 className="text-3xl font-semibold text-center mb-6">
          Create Account
        </h1>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
              type="text"
              placeholder="Enter your name"
              className="h-11 w-full rounded-lg border border-gray-300 px-3 outline-none focus:border-black transition"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              type="email"
              placeholder="Enter your email"
              className="h-11 w-full rounded-lg border border-gray-300 px-3 outline-none focus:border-black transition"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
              type="password"
              placeholder="Enter your password"
              className="h-11 w-full rounded-lg border border-gray-300 px-3 outline-none focus:border-black transition"
            />
          </div>

          <button className="mt-2 h-11 rounded-lg border border-black font-medium hover:bg-black hover:text-white transition">
            Signup
          </button>
        </div>
      </form>
    </main>
  );
};
