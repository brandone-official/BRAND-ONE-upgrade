import { motion } from "motion/react";
import { Phone, MessageCircle } from "lucide-react";

const QuickMenu = () => {
  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-3">
      <motion.a
        href="tel:070-8849-6806"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.05, x: -5 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2.5 bg-white/30 text-slate-900 px-4 py-2.5 rounded-2xl font-black text-sm shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-white/40 backdrop-blur-xl group"
      >
        <div className="w-7 h-7 bg-brand-primary/10 rounded-xl flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition-colors">
          <Phone className="w-3.5 h-3.5" />
        </div>
        <span className="hidden md:block">전화</span>
      </motion.a>

      <motion.a
        href="https://open.kakao.com/me/brandone"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        whileHover={{ scale: 1.05, x: -5 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2.5 bg-[#FEE500]/40 text-[#3C1E1E] px-4 py-2.5 rounded-2xl font-black text-sm shadow-[0_10px_30px_rgba(254,229,0,0.15)] border border-[#FEE500]/30 backdrop-blur-xl group"
      >
        <div className="w-7 h-7 bg-[#3C1E1E]/10 rounded-xl flex items-center justify-center group-hover:bg-[#3C1E1E] group-hover:text-[#FEE500] transition-colors">
          <MessageCircle className="w-3.5 h-3.5" />
        </div>
        <span className="hidden md:block">카톡</span>
      </motion.a>
    </div>
  );
};

export default QuickMenu;
