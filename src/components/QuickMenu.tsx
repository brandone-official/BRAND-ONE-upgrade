import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Phone, MessageCircle, X, Plus } from "lucide-react";

const QuickMenu = ({ isShifted = false }: { isShifted?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`fixed right-6 lg:right-8 z-[100] flex flex-col gap-3 transition-all duration-300 ${isShifted ? 'bottom-32 lg:bottom-8' : 'bottom-8'}`}>
      {/* Desktop Setup: Always Visible */}
      <div className="hidden lg:flex flex-col gap-3">
        <motion.a
          href="tel:070-8849-6806"
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2.5 bg-white/30 text-slate-900 px-4 py-2.5 rounded-2xl font-black text-sm shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-white/40 backdrop-blur-xl group"
        >
          <div className="w-7 h-7 bg-brand-primary/10 rounded-xl flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition-colors">
            <Phone className="w-3.5 h-3.5" />
          </div>
          <span>전화</span>
        </motion.a>

        <motion.a
          href="https://open.kakao.com/me/brandone"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2.5 bg-[#FEE500]/40 text-[#3C1E1E] px-4 py-2.5 rounded-2xl font-black text-sm shadow-[0_10px_30px_rgba(254,229,0,0.15)] border border-[#FEE500]/30 backdrop-blur-xl group"
        >
          <div className="w-7 h-7 bg-[#3C1E1E]/10 rounded-xl flex items-center justify-center group-hover:bg-[#3C1E1E] group-hover:text-[#FEE500] transition-colors">
            <MessageCircle className="w-3.5 h-3.5" />
          </div>
          <span>카톡</span>
        </motion.a>
      </div>

      {/* Mobile Setup: Toggleable */}
      <div className="lg:hidden flex flex-col gap-3 items-end">
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.a
                key="mobile-phone"
                href="tel:070-8849-6806"
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.8 }}
                className="flex items-center gap-2.5 bg-white text-slate-900 px-4 py-3 rounded-2xl font-black text-xs shadow-xl border border-slate-100"
              >
                <Phone size={14} className="text-brand-primary" />
                전화 문의
              </motion.a>

              <motion.a
                key="mobile-kakao"
                href="https://open.kakao.com/me/brandone"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.8 }}
                transition={{ delay: 0.05 }}
                className="flex items-center gap-2.5 bg-[#FEE500] text-[#3C1E1E] px-4 py-3 rounded-2xl font-black text-xs shadow-xl"
              >
                <MessageCircle size={14} className="fill-current" />
                카톡 문의
              </motion.a>
            </>
          )}
        </AnimatePresence>
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full shadow-[0_15px_40px_rgba(0,0,0,0.2)] flex items-center justify-center transition-all active:scale-90 border-4 border-white ${isOpen ? 'bg-rose-500 text-white' : 'bg-slate-900 text-white'}`}
        >
          {isOpen ? <X size={24} /> : <Plus size={28} />}
        </button>
      </div>
    </div>
  );
};

export default QuickMenu;
