import { motion } from "motion/react";
import { Wallet, LoaderCircle } from "lucide-react";
export const LoadingAnimation = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute w-72 h-72 bg-emerald-500/20 blur-3xl rounded-full top-10 left-10 animate-pulse" />
      <div className="absolute w-72 h-72 bg-cyan-500/20 blur-3xl rounded-full bottom-10 right-10 animate-pulse" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl px-10 py-12 flex flex-col items-center gap-6"
      >
        {/* Logo */}
        <motion.div
          animate={{
            rotate: [0, -10, 10, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="w-20 h-20 rounded-2xl bg-emerald-500/15 border border-emerald-400/20 flex items-center justify-center shadow-lg"
        >
          <Wallet className="text-emerald-400" size={38} />
        </motion.div>

        {/* App Name */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Expense Tracker
          </h1>
          <p className="text-slate-400 mt-2 text-sm">
            Preparing your dashboard...
          </p>
        </div>

        {/* Loading Animation */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <LoaderCircle className="text-emerald-400" size={32} />
        </motion.div>

        {/* Animated Dots */}
        <div className="flex gap-2">
          {[0, 1, 2].map((dot) => (
            <motion.span
              key={dot}
              animate={{
                y: [0, -8, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: dot * 0.15,
              }}
              className="w-3 h-3 rounded-full bg-emerald-400"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};
