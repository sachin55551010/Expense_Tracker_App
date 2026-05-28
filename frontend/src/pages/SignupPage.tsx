import { useState } from "react";
import { motion } from "motion/react";
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiLoader,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import type { SignupData } from "../types/signup";

export const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [signupData, setSignupData] = useState<SignupData>({
    name: "",
    email: "",
    password: "",
  });

  // ?useAuthData
  const { signup, isSiggningIn } = useAuthStore();

  //? handle from input

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signup(signupData);
  };
  return (
    <main className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <form
          onSubmit={handleFormSubmit}
          className="backdrop-blur-xl bg-white/10 border border-white/10 shadow-2xl rounded-3xl p-8 flex flex-col gap-6"
        >
          {/* Heading */}
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-white"
            >
              Create Account
            </motion.h1>

            <p className="text-slate-300 mt-2">
              Signup to continue your journey
            </p>
          </div>

          {/* Name */}
          <div className="flex flex-col gap-2">
            <label className="text-slate-200 text-sm">Full Name</label>

            <div className="flex items-center gap-3 bg-white/10 border border-white/10 rounded-xl px-4 py-3 focus-within:border-indigo-400 transition">
              <FiUser className="text-slate-300 text-lg" />

              <input
                value={signupData.name}
                onChange={(e) =>
                  setSignupData({ ...signupData, name: e.target.value })
                }
                type="text"
                placeholder="Enter your name"
                className="bg-transparent outline-none w-full text-white placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-slate-200 text-sm">Email</label>

            <div className="flex items-center gap-3 bg-white/10 border border-white/10 rounded-xl px-4 py-3 focus-within:border-indigo-400 transition">
              <FiMail className="text-slate-300 text-lg" />

              <input
                value={signupData.email}
                onChange={(e) =>
                  setSignupData({ ...signupData, email: e.target.value })
                }
                type="email"
                placeholder="Enter your email"
                className="bg-transparent outline-none w-full text-white placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label className="text-slate-200 text-sm">Password</label>

            <div className="flex items-center gap-3 bg-white/10 border border-white/10 rounded-xl px-4 py-3 focus-within:border-indigo-400 transition">
              <FiLock className="text-slate-300 text-lg" />

              <input
                value={signupData.password}
                onChange={(e) =>
                  setSignupData({ ...signupData, password: e.target.value })
                }
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="bg-transparent outline-none w-full text-white placeholder:text-slate-400"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-300 hover:text-white transition"
              >
                {showPassword ? (
                  <FiEyeOff className="text-xl" />
                ) : (
                  <FiEye className="text-xl" />
                )}
              </button>
            </div>
          </div>

          {/* Signup Button */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: isSiggningIn ? 1 : 1.02 }}
            disabled={isSiggningIn}
            className={`mt-2 h-12 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all duration-300 ${
              isSiggningIn
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-500"
            }`}
          >
            {isSiggningIn ? (
              <>
                <FiLoader className="animate-spin text-xl" />
                Signing Up...
              </>
            ) : (
              "Signup"
            )}
          </motion.button>

          {/* Footer */}
          <p className="text-center text-slate-300 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-400 cursor-pointer hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </motion.div>
    </main>
  );
};
