import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Monitor, Smartphone, Zap, Search, Globe, ArrowUpRight, Play, CheckCircle2 } from "lucide-react";
import Footer from "../components/Footer";

const portfolioItems = [
  {
    id: 1,
    category: "Website",
    title: "리셋의원 (Reset Clinic)",
    subTitle: "건강한 아름다움을 위한 본질적 접근, 리셋의원 공식 홈페이지",
    tags: ["Medical SEO", "Clean Design", "Mobile Optimized"],
    desktopImg: "https://s0.wp.com/mshots/v1/https://resetclinic.kr?w=1200",
    mobileImg: "https://s0.wp.com/mshots/v1/https://resetclinic.kr?w=400",
    scores: { seo: 98, aeo: 95, perf: 97 },
    accent: "bg-slate-800",
    link: "https://resetclinic.kr"
  }
];

const PortfolioCard = ({ item }: { item: typeof portfolioItems[0], key?: any }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white rounded-[40px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-700"
    >
      <div className="flex flex-col lg:flex-row h-full">
        {/* Left: Visual Area (Clean Browser Preview) */}
        <div className="lg:w-[60%] bg-slate-50 p-8 md:p-12 relative overflow-hidden flex items-center justify-center min-h-[400px] md:min-h-[600px]">
          {/* Desktop Mockup */}
          <motion.div 
            animate={{ 
              y: isHovered ? -10 : 0,
              scale: isHovered ? 1.02 : 1
            }}
            className="relative w-full max-w-[600px] aspect-[16/10] bg-white rounded-2xl shadow-2xl border-[6px] border-slate-900 overflow-hidden z-10"
          >
            {/* Browser Header */}
            <div className="h-6 bg-slate-900 flex items-center px-3 gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </div>
            {/* Content Area */}
            <div className="relative w-full h-full overflow-hidden bg-white">
              <motion.img
                src={item.desktopImg}
                animate={{ y: isHovered ? "-40%" : "0%" }}
                transition={{ duration: 6, ease: "linear" }}
                className="w-full absolute top-0 left-0"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          {/* Background Decorative Glow */}
          <div className={`absolute inset-0 ${item.accent} opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700`} />
        </div>

        {/* Right: Info Area */}
        <div className="lg:w-[40%] p-8 md:p-12 flex flex-col justify-between border-l border-slate-50">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className={`px-4 py-1.5 rounded-full ${item.accent} text-white text-[10px] font-black uppercase tracking-widest`}>
                {item.category}
              </span>
              <div className="flex gap-1">
                {item.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-md">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-tight mb-4">
              {item.title}
            </h3>
            <p className="text-slate-500 font-medium leading-relaxed mb-10 break-keep">
              {item.subTitle}
            </p>

            {/* Optimization Insight */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <Search size={20} />
                  </div>
                  <span className="text-sm font-black text-slate-900">검색 엔진 최적화 (SEO)</span>
                </div>
                <span className="text-2xl font-black text-emerald-500">{item.scores.seo}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <Zap size={20} />
                  </div>
                  <span className="text-sm font-black text-slate-900">AI 답변 최적화 (AEO)</span>
                </div>
                <span className="text-2xl font-black text-blue-500">{item.scores.aeo}</span>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-50 flex items-center justify-between">
            <a 
              href={item.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-900 font-black text-sm hover:text-brand-primary transition-colors group/btn"
            >
              Live Site View
              <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </a>
            <div className="flex items-center gap-2 text-slate-300">
              <Monitor size={16} />
              <Globe size={16} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-40 pb-24 bg-slate-50">
        <div className="max-w-[1400px] mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-8"
          >
            <span className="text-sm font-bold tracking-widest text-brand-primary">PORTFOLIO</span>
            <div className="w-12 h-[1px] bg-brand-primary/30" />
            <span className="text-sm font-bold tracking-widest text-slate-400 uppercase">OUR WORKS</span>
          </motion.div>

          <div className="flex flex-col lg:flex-row justify-between items-end gap-10">
            <motion.h1 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-[48px] md:text-[64px] font-black leading-[1.2] tracking-tight text-brand-secondary"
            >
              성공적인 연결을 <br />
              <span className="text-brand-primary">증명하는 결과물</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-slate-500 font-medium text-lg md:text-xl max-w-md lg:text-right"
            >
              단순한 제작을 넘어, 브랜드의 성장을 견인하는 <br />
              실체적인 완결을 확인해보세요.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="space-y-16">
            {portfolioItems.map((item) => (
              <PortfolioCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 bg-slate-950 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[40px] md:text-[56px] font-black text-white tracking-tighter leading-[1.3] mb-12"
          >
            당신의 브랜드도 <br />
            <span className="text-brand-primary">성공적인 연결</span>이 필요하신가요?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <button className="px-10 py-5 bg-brand-primary text-white rounded-2xl font-black text-lg shadow-xl shadow-brand-primary/20 hover:scale-105 transition-transform">
              프로젝트 의뢰하기
            </button>
            <button className="px-10 py-5 bg-white/10 text-white border border-white/20 rounded-2xl font-black text-lg backdrop-blur-md hover:bg-white/20 transition-all">
              견적 계산해보기
            </button>
          </motion.div>
        </div>
        {/* Decorative Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-primary/10 blur-[160px] rounded-full" />
      </section>

      <Footer className="bg-black" />
    </div>
  );
}
