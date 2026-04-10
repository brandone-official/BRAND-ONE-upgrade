import { motion } from "motion/react";
import { Link } from "react-router-dom";

interface FooterProps {
  className?: string;
}

export default function Footer({ className = "" }: FooterProps) {
  const isDark = className.includes("bg-black") || className.includes("bg-slate-950") || className.includes("bg-[#020617]");

  return (
    <footer className={`py-20 border-t ${isDark ? "border-white/10 text-slate-400" : "border-slate-100 text-slate-500"} ${className}`}>
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between gap-16 lg:gap-20">
          {/* Left: Brand & Info */}
          <div className="flex-1 space-y-10">
            <div className="flex flex-col">
              <span className={`font-black text-3xl md:text-4xl tracking-tighter uppercase leading-none ${isDark ? "text-white" : "text-slate-900"}`}>
                BRA<span className="text-brand-primary">ND</span>
              </span>
              <span className={`font-black text-3xl md:text-4xl tracking-tighter uppercase leading-none ${isDark ? "text-white" : "text-slate-900"}`}>
                <span className="text-brand-primary">O</span>NE<span className="text-brand-primary">.</span>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-sm font-medium">
              <div className="flex gap-4">
                <span className="w-24 shrink-0 opacity-60">사업자명</span>
                <span className={isDark ? "text-slate-300" : "text-slate-700"}>주식회사 정화앤대영</span>
              </div>
              <div className="flex gap-4">
                <span className="w-24 shrink-0 opacity-60">대표자</span>
                <span className={isDark ? "text-slate-300" : "text-slate-700"}>황대영 / 박승현</span>
              </div>
              <div className="flex gap-4 md:col-span-2">
                <span className="w-24 shrink-0 opacity-60">주소</span>
                <span className={isDark ? "text-slate-300" : "text-slate-700"}>경기도 고양시 덕양구 용두로 101-13</span>
              </div>
              <div className="flex gap-4">
                <span className="w-24 shrink-0 opacity-60">대표전화</span>
                <span className={isDark ? "text-slate-300" : "text-slate-700"}>070-8849-6806</span>
              </div>
              <div className="flex gap-4">
                <span className="w-24 shrink-0 opacity-60">사업자등록번호</span>
                <span className={isDark ? "text-slate-300" : "text-slate-700"}>830-86-00633</span>
              </div>
            </div>
          </div>

          {/* Right: Links & Copyright */}
          <div className="lg:text-right flex flex-col justify-between gap-10">
            <div className="flex lg:justify-end gap-8 text-sm font-bold">
              <Link to="/terms" className={`hover:text-brand-primary transition-colors ${isDark ? "text-slate-300" : "text-slate-700"}`}>이용약관</Link>
              <Link to="/privacy" className={`hover:text-brand-primary transition-colors ${isDark ? "text-slate-300" : "text-slate-700"}`}>개인정보처리방침</Link>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-bold tracking-tight">
                © 2026 BRAND ONE. All rights reserved.
              </p>
              <p className="text-[10px] opacity-40 font-medium uppercase tracking-widest">
                Connecting the dots for your brand growth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
