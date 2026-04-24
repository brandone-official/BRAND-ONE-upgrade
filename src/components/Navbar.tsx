import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { scrollY } = useScroll();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  const logoOpacity = useTransform(scrollY, [0, 150], [1, 0.15]);
  const navOpacity = useTransform(scrollY, [0, 150], [1, 0.8]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Service", path: "/service" },
  ];

  return (
    <nav className="fixed top-0 w-full z-100 bg-transparent">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-6 h-20 lg:h-24 flex items-center justify-between">
        {/* Logo - Left Aligned */}
        <motion.div 
          style={{ opacity: logoOpacity }}
          className="flex-1 flex items-center z-100"
        >
          <Link to="/" className="font-black text-xl lg:text-2xl tracking-tighter text-brand-secondary uppercase">
            BRA<span className="text-brand-primary">ND O</span>NE<span className="text-brand-primary">.</span>
          </Link>
        </motion.div>

        {/* Desktop Capsule Menu - Centered */}
        <motion.div 
          style={{ opacity: navOpacity }}
          className="hidden lg:flex items-center bg-white/10 backdrop-blur-md px-6 py-2.5 rounded-full text-[14px] text-slate-700 border border-slate-200/20 shadow-sm"
        >
          {navLinks.map((link, idx) => {
            const isActive = location.pathname === link.path;
            return (
              <div key={link.path} className="flex items-center">
                <Link 
                  to={link.path} 
                  className={`px-4 transition-all duration-300 ${
                    isActive 
                      ? 'text-brand-primary font-black scale-105' 
                      : 'text-slate-400 font-bold hover:text-slate-900'
                  }`}
                >
                  {link.name}
                </Link>
                {idx < navLinks.length - 1 && (
                  <div className="w-[1px] h-3 bg-slate-200" />
                )}
              </div>
            );
          })}
        </motion.div>

        {/* Mobile Hamburger Button */}
        <div className="lg:hidden z-100 flex-1 flex justify-end">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 bg-white/10 backdrop-blur-md rounded-full border border-slate-200/20 text-slate-800"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Desktop Right Spacer */}
        <div className="flex-1 hidden lg:flex justify-end" />
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[90] lg:hidden flex flex-col pt-32 px-8"
          >
            <div className="flex flex-col gap-8">
              {navLinks.map((link, idx) => {
                const isActive = location.pathname === link.path;
                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * idx }}
                  >
                    <Link 
                      to={link.path}
                      className="flex items-center justify-between group/mitem"
                    >
                      <span className={`text-[44px] font-black tracking-tighter transition-all duration-300 ${
                        isActive ? 'text-brand-primary' : 'text-slate-300 group-hover/mitem:text-slate-900'
                      }`}>
                        {link.name}
                      </span>
                      <ArrowRight className={`w-8 h-8 transition-all duration-300 ${
                        isActive ? 'text-brand-primary opacity-100' : 'text-slate-100 opacity-0 group-hover/mitem:opacity-100 group-hover/mitem:text-slate-900'
                      }`} />
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-auto pb-12">
              <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-4">Contact</p>
              <div className="flex flex-col gap-2">
                <a href="tel:070-8849-6806" className="text-xl font-black text-slate-900 tracking-tight">070.8849.6806</a>
                <a href="mailto:hello@brandone.co.kr" className="text-lg font-bold text-slate-400">hello@brandone.co.kr</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
