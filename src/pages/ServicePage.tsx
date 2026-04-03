import { motion } from "motion/react";
import Navbar from "../components/Navbar";

export default function ServicePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-[1400px] mx-auto px-6 py-40">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[48px] md:text-[60px] font-black leading-[1.35] text-slate-900"
        >
          Service
        </motion.h1>
        <p className="mt-8 text-xl text-slate-600">
          서비스 페이지 준비 중입니다.
        </p>
      </div>
    </div>
  );
}
