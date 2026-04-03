import { motion, useScroll, useTransform } from "motion/react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { scrollY } = useScroll();
  const logoOpacity = useTransform(scrollY, [0, 150], [1, 0.15]);
  const navOpacity = useTransform(scrollY, [0, 150], [1, 0.8]);

  return (
    <nav className="fixed top-0 w-full z-50 bg-transparent">
      <div className="max-w-[1400px] mx-auto px-6 h-24 flex items-center justify-between">
        {/* Logo - Left Aligned */}
        <motion.div 
          style={{ opacity: logoOpacity }}
          className="flex-1 flex items-center"
        >
          <Link to="/" className="font-black text-2xl tracking-tighter text-brand-secondary uppercase">
            BRA<span className="text-brand-primary">ND O</span>NE<span className="text-brand-primary">.</span>
          </Link>
        </motion.div>

        {/* Capsule Menu - Centered */}
        <motion.div 
          style={{ opacity: navOpacity }}
          className="hidden lg:flex items-center bg-white/10 backdrop-blur-md px-6 py-2.5 rounded-full text-[14px] font-bold text-slate-700 border border-slate-200/20 shadow-sm"
        >
          <Link to="/" className="px-4 hover:text-brand-primary transition-colors">Home</Link>
          <div className="w-0 h-3 border-l border-slate-500" />
          <Link to="/portfolio" className="px-4 hover:text-brand-primary transition-colors">Portfolio</Link>
          <div className="w-0 h-3 border-l border-slate-500" />
          <Link to="/service" className="px-4 hover:text-brand-primary transition-colors">Service</Link>
        </motion.div>

        {/* Right Spacer for Symmetry */}
        <div className="flex-1 hidden lg:flex justify-end" />
      </div>
    </nav>
  );
}
