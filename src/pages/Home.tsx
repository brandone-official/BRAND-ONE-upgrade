import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { MessageSquare, FileText, Link2Off, LayoutGrid, Milestone, ArrowLeftRight, Phone, MessageCircle } from "lucide-react";
import Footer from "../components/Footer";
import QuickMenu from "../components/QuickMenu";

const items = [
  { name: "Strategy", type: "star", color: "text-amber-400" },
  { name: "Place", type: "orbit", color: "text-blue-600" },
  { name: "Website", type: "browser", color: "text-emerald-500" },
  { name: "Blog", type: "text", color: "text-rose-500" },
  { name: "Video", type: "play", color: "text-slate-900" },
  { name: "Offline", type: "stamp", color: "text-brand-primary" },
];

const ServiceCard = ({ item, size = "normal" }: { item: typeof items[0], size?: "normal" | "mini" }) => {
  const scale = size === "mini" ? 0.45 : 1;
  const containerSize = "w-80 h-80";
  const boxSize = "w-80 h-52";

  const renderContent = () => {
    switch (item.type) {
      case "star":
        return (
          <div className={`relative flex items-center justify-center ${containerSize}`}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1.5 h-full bg-amber-400/20"
                  style={{ transform: `rotate(${i * 30}deg)` }}
                />
              ))}
            </motion.div>
            <span className="relative z-10 font-black text-3xl tracking-tighter text-slate-900 uppercase italic">
              {item.name}
            </span>
          </div>
        );
      case "orbit":
        return (
          <div className={`relative flex items-center justify-center ${containerSize}`}>
            <div className="w-56 h-56 rounded-full border-4 border-blue-600/10 flex items-center justify-center">
              <div className="w-40 h-40 rounded-full bg-blue-600 flex items-center justify-center text-white font-black text-2xl italic uppercase shadow-2xl">
                {item.name}
              </div>
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="absolute w-64 h-64"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 bg-amber-300 rounded-full shadow-xl border-4 border-white" />
            </motion.div>
          </div>
        );
      case "browser":
        return (
          <div className={`${boxSize} bg-white border-4 border-slate-100 rounded-3xl overflow-hidden shadow-xl flex flex-col`}>
            <div className="h-10 bg-slate-50 border-b-2 border-slate-100 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
            </div>
            <div className="flex-1 flex items-center justify-center p-6 bg-white">
              <span className="font-black text-3xl text-emerald-500 uppercase italic tracking-tighter">
                {item.name}
              </span>
              <motion.div
                animate={{ 
                  opacity: [1, 0, 1],
                  scaleY: [1, 1.2, 1]
                }}
                transition={{ duration: 0.6, repeat: Infinity }}
                className="w-2 h-10 bg-emerald-500 ml-2"
              />
            </div>
          </div>
        );
      case "text":
        return (
          <div className={`${boxSize} flex flex-col justify-center gap-4 px-4`}>
            <div className="w-full h-3 bg-rose-50 rounded-full overflow-hidden">
              <motion.div
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-2/3 h-full bg-rose-500"
              />
            </div>
            <span className="font-black text-5xl text-rose-500 uppercase italic tracking-tighter text-center">
              {item.name}
            </span>
            <div className="w-full h-3 bg-rose-50 rounded-full overflow-hidden">
              <motion.div
                animate={{ x: ["100%", "-100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-2/3 h-full bg-rose-500"
              />
            </div>
          </div>
        );
      case "play":
        return (
          <div className={`relative flex items-center justify-center ${containerSize}`}>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute w-72 h-72"
            >
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-6 h-6 bg-slate-900 rounded-full shadow-sm"
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: `rotate(${i * 36}deg) translate(120px) translate(-50%, -50%)`,
                  }}
                />
              ))}
            </motion.div>
            <div className="w-28 h-28 bg-slate-900 rounded-[32px] flex items-center justify-center shadow-2xl z-10">
              <div className="w-0 h-0 border-t-[14px] border-t-transparent border-l-[24px] border-l-white border-b-[14px] border-b-transparent ml-2" />
            </div>
            <span className="absolute bottom-4 font-black text-sm text-slate-900 uppercase tracking-[0.2em] z-10">
              {item.name}
            </span>
          </div>
        );
      case "stamp":
        return (
          <motion.div
            animate={{ 
              scale: [1, 1.03, 1],
              rotate: [-5, -4, -5]
            }}
            transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2.5 }}
            className={`${boxSize} border-[6px] border-brand-primary flex items-center justify-center bg-white shadow-[12px_12px_0px_0px_rgba(79,70,229,0.1)]`}
          >
            <span className="font-black text-4xl text-brand-primary uppercase italic tracking-tighter">
              {item.name}
            </span>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ transform: `scale(${scale})`, transformOrigin: 'center' }}>
      {renderContent()}
    </div>
  );
};

export default function Home() {
  const workflowRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: workflowRef,
    offset: ["start 60%", "end 75%"]
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-52 pb-32 overflow-hidden bg-white">
        <div className="max-w-[1400px] mx-auto px-6">
          {/* Section Index */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-12"
          >
            <span className="text-sm font-bold tracking-widest text-brand-primary">01</span>
            <div className="w-12 h-[1px] bg-brand-primary/30" />
            <span className="text-sm font-bold tracking-widest text-slate-400 uppercase">WHO ARE YOU</span>
          </motion.div>

          <div className="flex flex-col lg:flex-row justify-between items-end gap-10">
            
            {/* Left: Main Headline */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-3xl"
            >
              <h1 className="text-[48px] md:text-[60px] font-black leading-[1.35] tracking-tight text-brand-secondary">
                일관성 중심의 <br />
                <span className="text-brand-primary">브랜드 콘텐츠 에이전시</span>
              </h1>
            </motion.div>

            {/* Right: Sub Headline */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="lg:text-right flex flex-col items-end"
            >
              <p className="text-xl md:text-2xl font-medium text-slate-800 leading-snug">
                브랜드의 핵심 접점을
              </p>
              <div className="flex items-center gap-4 mt-1.5">
                <span className="text-xl md:text-2xl font-bold text-slate-800">기획부터</span>
                <div className="w-16 h-[2px] bg-slate-900 mt-1.5" />
                <span className="text-xl md:text-2xl font-bold text-slate-800">제작까지 함께 합니다</span>
              </div>
            </motion.div>
          </div>

          {/* Infinite Slider Section */}
          <div className="mt-10 relative overflow-hidden py-16">
            <div className="flex whitespace-nowrap">
              <motion.div 
                className="flex gap-32 items-center"
                animate={{ x: [0, -3500] }}
                transition={{ 
                  duration: 60, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              >
                {[...items, ...items, ...items, ...items, ...items].map((item, idx) => (
                  <div key={idx} className="flex-shrink-0">
                    <ServiceCard item={item} />
                  </div>
                ))}
              </motion.div>
            </div>
            
            {/* Gradient Overlays for smooth edges */}
            <div className="absolute inset-y-0 left-0 w-64 bg-gradient-to-r from-white via-white/90 to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-64 bg-gradient-to-l from-white via-white/90 to-transparent z-10" />
          </div>

          {/* Scroll Down Hint */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="flex flex-col items-center mt-20"
          >
            <div className="w-[1px] h-20 bg-gradient-to-b from-brand-primary to-transparent" />
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-4 text-brand-primary"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-40 bg-slate-50/80 relative">
        {/* Section Index */}
        <div className="max-w-[1400px] mx-auto px-6 mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <span className="text-sm font-bold tracking-widest text-brand-primary">02</span>
            <div className="w-12 h-[1px] bg-brand-primary/30" />
            <span className="text-sm font-bold tracking-widest text-slate-400 uppercase">ALL IN ONE</span>
          </motion.div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[48px] md:text-[60px] font-black leading-[1.35] tracking-tight text-brand-secondary mb-24"
          >
            <span className="text-brand-primary">무엇이 부족하다고</span> <br />
            생각하시나요?
          </motion.h2>

          {/* Hexagon Visual */}
          <div className="relative w-full max-w-[1000px] h-[650px] mx-auto mb-20">
            {/* Hexagon Lines (SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 650">
              <path
                d="M500,100 L760,250 L760,450 L500,600 L240,450 L240,250 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-slate-200"
              />
            </svg>

            {/* Center Text - Perfectly Centered at (500, 350) */}
            <div className="absolute left-1/2 top-[350px] -translate-x-1/2 -translate-y-1/2 z-20">
              <span className="text-[120px] font-black tracking-tighter text-brand-primary leading-none">ONE</span>
            </div>

            {/* Hexagon Vertices (Mini Service Cards) */}
            {[
              { x: 500, y: 100, item: items[0] }, // Top
              { x: 760, y: 250, item: items[1] }, // Top Right
              { x: 760, y: 450, item: items[2] }, // Bottom Right
              { x: 500, y: 600, item: items[3] }, // Bottom
              { x: 240, y: 450, item: items[4] }, // Bottom Left
              { x: 240, y: 250, item: items[5] }, // Top Left
            ].map((pt, idx) => (
              <div
                key={idx}
                className="absolute"
                style={{ 
                  left: `${pt.x}px`, 
                  top: `${pt.y}px`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className="relative">
                  <ServiceCard item={pt.item} size="mini" />
                </div>
              </div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
              BRAND ONE은 브랜드의 <br />
              <span className="text-brand-primary">6대 핵심 접점을 하나로 완성합니다.</span>
            </h2>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-40 bg-white relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6">
          {/* Section Index */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-24"
          >
            <span className="text-sm font-bold tracking-widest text-brand-primary">03</span>
            <div className="w-12 h-[1px] bg-brand-primary/30" />
            <span className="text-sm font-bold tracking-widest text-slate-400 uppercase">WHAT'S THE PROBLEM</span>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-20 lg:gap-12">
            {/* Left: Headline (Fixed at top-left) */}
            <div className="lg:w-[30%]">
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-[44px] md:text-[64px] font-black leading-[1.35] tracking-tighter text-slate-900 sticky top-32"
              >
                <span className="block whitespace-nowrap">열심히 만들고 있는데,</span>
                <span className="block whitespace-nowrap">왜 <span className="text-brand-primary">제자리걸음</span>인 것 같을까요?</span>
              </motion.h2>
            </div>

            {/* Right: Problem List (Starts below the headline line) */}
            <div className="lg:w-[70%] lg:pt-64">
              {[
                { 
                  title: "결과물 불일치", 
                  desc: "채널마다 다른 톤앤매너로\n브랜드 정체성이 흐려집니다.",
                  symbol: <Link2Off size={24} strokeWidth={1.5} />
                },
                { 
                  title: "표현 파편화", 
                  desc: "메시지가 흩어져 고객에게\n핵심 가치가 전달되지 않습니다.",
                  symbol: <LayoutGrid size={24} strokeWidth={1.5} />
                },
                { 
                  title: "전체 흐름 설계 불가", 
                  desc: "단편적인 제작에 그쳐\n고객 여정이 단절됩니다.",
                  symbol: <Milestone size={24} strokeWidth={1.5} />
                },
                { 
                  title: "생각과 실제의 괴리", 
                  desc: "기획 의도가 제작 과정에서 변질되어\n결과가 만족스럽지 않습니다.",
                  symbol: <ArrowLeftRight size={24} strokeWidth={1.5} />
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group border-t border-slate-100 pt-8 pb-4 flex items-end justify-between hover:bg-indigo-50/80 transition-all duration-300 px-6 -mx-6 rounded-2xl"
                >
                  <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-12 flex-1">
                    <h3 className="text-2xl md:text-[40px] font-black text-slate-900 md:w-[320px] flex-shrink-0 tracking-tight leading-none whitespace-nowrap">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 font-medium text-base md:text-lg leading-[1.1] whitespace-pre-line break-keep mb-1 flex-1">
                      {item.desc}
                    </p>
                  </div>
                  <div className="hidden md:block text-slate-900 opacity-40 group-hover:opacity-100 transition-opacity ml-12 mb-2">
                    {item.symbol}
                  </div>
                </motion.div>
              ))}
              <div className="border-t border-slate-100" />
            </div>
          </div>

          {/* Closing Statement */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-40 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
              문제는 <span className="text-brand-primary">'제작'</span>이 아닙니다.<br />
              중심 잡힌 <span className="text-brand-primary">'기준'</span>이 없기 때문입니다.
            </h2>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-40 bg-slate-950 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6">
          {/* Section Index */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-12"
          >
            <span className="text-sm font-bold tracking-widest text-brand-primary">04</span>
            <div className="w-12 h-[1px] bg-brand-primary/30" />
            <span className="text-sm font-bold tracking-widest text-slate-500 uppercase">HOW WE THINK</span>
          </motion.div>

          <div className="mb-24">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-brand-primary font-bold text-xl mb-4"
            >
              흩어진 조각을 하나로,
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[40px] md:text-[56px] font-black text-white tracking-tighter leading-[1.35]"
            >
              BRAND ONE만의 <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">‘연결의 철학’</span>
            </motion.h2>
          </div>

          {/* Philosophy Cards - Accordion Style */}
          <div className="flex flex-col md:flex-row gap-4 min-h-[600px] w-full">
            {[
              {
                id: "01",
                title: "경계 없는 통합",
                subtitle: "Seamless Integration",
                keyPoint: "온-오프라인의 접점을 따로 보지 않습니다.",
                desc: "디지털의 유연함과 오프라인의 견고함을 하나의 브랜드 경험으로 연결하여, 어느 지점에서든 일관된 브랜드의 목소리를 전달합니다.",
                bgColor: "bg-white",
                textColor: "text-slate-900",
                accentColor: "text-brand-primary",
                animation: (
                  <div className="relative w-40 h-40 flex items-center justify-center">
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ 
                          rotateX: [0, 360],
                          rotateY: [0, 360],
                          rotateZ: [0, 360],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{ 
                          duration: 4 + i * 0.5, 
                          repeat: Infinity, 
                          ease: "linear" 
                        }}
                        className="absolute inset-0 border-2 border-brand-primary/30 rounded-full"
                        style={{ transform: `rotateX(${i * 30}deg) rotateY(${i * 20}deg)` }}
                      />
                    ))}
                    <motion.div 
                      animate={{ 
                        scale: [1, 1.8, 1],
                        opacity: [0.3, 0.7, 0.3]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute w-24 h-24 bg-brand-primary/30 rounded-full blur-[30px]" 
                    />
                  </div>
                )
              },
              {
                id: "02",
                title: "실체적인 완결",
                subtitle: "Tangible Execution",
                keyPoint: "기획에서 끝나지 않고 고객의 손에 닿는 결과물까지 연결합니다.",
                desc: "설계도 안에만 머무는 브랜드가 아닌, 실제 제작물의 디테일까지 직접 개입하여 기획의 의도가 왜곡 없이 실현되도록 책임집니다.",
                bgColor: "bg-[#D9F99D]", // Lime-200
                textColor: "text-slate-900",
                accentColor: "text-slate-900",
                animation: (
                  <div className="relative w-40 h-40 flex items-center justify-center overflow-hidden">
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ 
                          x: [Math.random() * 150 - 75, Math.random() * 150 - 75],
                          y: [Math.random() * 150 - 75, Math.random() * 150 - 75],
                          scale: [0.5, 1.2, 0.5],
                          opacity: [0.1, 0.4, 0.1]
                        }}
                        transition={{ 
                          duration: 3 + Math.random() * 3, 
                          repeat: Infinity, 
                          ease: "easeInOut" 
                        }}
                        className="absolute w-8 h-8 border-2 border-slate-900/40 rounded-lg"
                        style={{ rotate: `${i * 45}deg` }}
                      />
                    ))}
                    <motion.div
                      animate={{ 
                        rotate: 360,
                        scale: [0.8, 1.1, 0.8]
                      }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      className="w-24 h-24 border-[3px] border-slate-900/60 rounded-2xl flex items-center justify-center"
                    >
                      <div className="w-14 h-14 border-2 border-slate-900/40 rounded-2xl rotate-45" />
                    </motion.div>
                  </div>
                )
              },
              {
                id: "03",
                title: "지속 가능한 자산",
                subtitle: "Sustainable Assets",
                keyPoint: "단순한 결과물을 넘어, 오래도록 쌓일 수 있는 브랜드 자산을 우선합니다.",
                desc: "일회성 디자인이 아닌, 시간이 흐를수록 브랜드의 가치가 견고하게 축적되는 지속 가능한 시스템을 구축합니다.",
                bgColor: "bg-brand-primary",
                textColor: "text-white",
                accentColor: "text-white",
                animation: (
                  <div className="relative w-40 h-40 flex items-center justify-center">
                    {[...Array(24)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ 
                          rotate: [0, 360],
                          scale: [0.5, 1, 0.5],
                          borderRadius: ["20%", "50%", "20%"]
                        }}
                        transition={{ 
                          duration: 6, 
                          delay: i * 0.05, 
                          repeat: Infinity, 
                          ease: "easeInOut" 
                        }}
                        className="absolute w-full h-full border border-white/10"
                        style={{ rotate: `${i * 15}deg` }}
                      />
                    ))}
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-6 h-6 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,1)] flex items-center justify-center"
                    >
                      <div className="w-1.5 h-1.5 bg-brand-primary rounded-full" />
                    </motion.div>
                  </div>
                )
              }
            ].map((card, idx) => {
              const [isHovered, setIsHovered] = useState(false);
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  animate={{ 
                    flex: isHovered ? 2.5 : 1,
                  }}
                  className={`relative ${card.bgColor} rounded-[32px] p-8 md:p-10 flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-white/5`}
                >
                  {/* Top: Title Content */}
                  <div className="relative z-10 w-full">
                    <span className={`text-sm font-black ${card.accentColor} opacity-40 mb-4 block`}>{card.id}</span>
                    <h3 className={`text-xl md:text-2xl lg:text-3xl font-black ${card.textColor} leading-tight mb-1 whitespace-nowrap`}>
                      {card.title}
                    </h3>
                    <p className={`text-xs md:text-sm font-bold ${card.textColor} opacity-60 uppercase tracking-wider mb-4`}>
                      {card.subtitle}
                    </p>
                    
                    {/* Description (Revealed on Hover) */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0, marginTop: 0 }}
                          animate={{ height: "auto", opacity: 1, marginTop: 24 }}
                          exit={{ height: 0, opacity: 0, marginTop: 0 }}
                          transition={{ duration: 0.4, ease: "circOut" }}
                          className="overflow-hidden border-t border-current/10 pt-6"
                        >
                          <p className={`text-base md:text-lg lg:text-xl font-black ${card.textColor} leading-snug mb-4`}>
                            {card.keyPoint}
                          </p>
                          <p className={`text-sm md:text-base font-medium ${card.textColor} opacity-70 leading-relaxed`}>
                            {card.desc}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Bottom: Animation */}
                  <div className="relative h-48 md:h-64 flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
                    {card.animation}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What We Can Section */}
      <section className="py-60 bg-slate-50 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6">
          {/* Section Index */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-12"
          >
            <span className="text-sm font-bold tracking-widest text-brand-primary">05</span>
            <div className="w-12 h-[1px] bg-brand-primary/30" />
            <span className="text-sm font-bold tracking-widest text-slate-400 uppercase">What We Can</span>
          </motion.div>

          <div className="mb-24">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[40px] md:text-[56px] font-black text-slate-900 tracking-tighter leading-[1.35]"
            >
              브랜드의 모든 접점을 <br />
              <span className="text-brand-primary">하나의 기준으로 만듭니다.</span>
            </motion.h2>
          </div>

          {/* Connected Cards Container */}
          <div className="relative">
            {/* Background Connecting Line (Desktop) */}
            <div className="absolute top-28 left-[15%] right-[15%] h-px bg-slate-200 hidden md:block z-0">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="h-full bg-brand-primary/30"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 bg-white rounded-[48px] shadow-xl shadow-slate-200/50 overflow-hidden relative z-10">
              {[
                {
                  category: "Digital & Online",
                  items: ["공식 홈페이지 (반응형)", "브랜드 블로그 (디자인/운영)", "SNS 채널 톤앤매너", "구글/네이버 플레이스 최적화"],
                  icon: <LayoutGrid className="w-6 h-6" />,
                  color: "bg-blue-500",
                  accent: "border-blue-500"
                },
                {
                  category: "Physical & Offline",
                  items: ["로고 / BI개발", "명함 및 서식류", "카탈로그 / 브로슈어", "패키지 디자인", "오프라인 공간 운영물"],
                  icon: <Milestone className="w-6 h-6" />,
                  color: "bg-brand-primary",
                  accent: "border-brand-primary"
                },
                {
                  category: "Content & Strategy",
                  items: ["브랜드 스토리텔링", "숏폼 / 홍보 영상 기획", "광고 카피라이팅", "브랜드 가이드북 제작"],
                  icon: <FileText className="w-6 h-6" />,
                  color: "bg-slate-900",
                  accent: "border-slate-900"
                }
              ].map((group, gIdx) => (
                <motion.div
                  key={gIdx}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: gIdx * 0.2 }}
                  className={`p-10 md:p-14 flex flex-col group relative ${gIdx !== 2 ? "md:border-r border-slate-100" : ""}`}
                >
                  {/* Connector Dot on the line */}
                  <div className="absolute top-28 left-0 -translate-x-1/2 w-3 h-3 bg-white border-2 border-slate-200 rounded-full hidden md:block z-20 group-hover:border-brand-primary transition-colors" />
                  
                  <div className={`w-16 h-16 ${group.color} rounded-2xl flex items-center justify-center text-white mb-10 group-hover:scale-110 transition-transform duration-500 relative z-20 shadow-lg shadow-current/20`}>
                    {group.icon}
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-10 tracking-tight">{group.category}</h3>
                  
                  <ul className="space-y-5 flex-1">
                    {group.items.map((item, iIdx) => (
                      <motion.li 
                        key={iIdx}
                        whileHover={{ x: 8 }}
                        className="flex items-center gap-4 text-slate-500 font-medium group/item cursor-default"
                      >
                        <div className={`w-1.5 h-1.5 rounded-full ${group.color} opacity-0 group-hover/item:opacity-100 transition-opacity`} />
                        <span className="group-hover/item:text-slate-900 transition-colors text-base md:text-lg">{item}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Hover Accent Bar */}
                  <motion.div 
                    className={`absolute bottom-0 left-0 right-0 h-1.5 ${group.color} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section ref={workflowRef} className="py-60 bg-white relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6">
          {/* Section Index */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-12"
          >
            <span className="text-sm font-bold tracking-widest text-brand-primary">06</span>
            <div className="w-12 h-[1px] bg-brand-primary/30" />
            <span className="text-sm font-bold tracking-widest text-slate-400 uppercase">HOW TO MAKE</span>
          </motion.div>

          <div className="text-center mb-40">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[40px] md:text-[56px] font-black text-slate-900 tracking-tighter leading-[1.35]"
            >
              정교한 연결이 만드는 <br />
              <span className="text-brand-primary">압도적인 브랜드 경험</span>
            </motion.h2>
          </div>

          {/* Workflow Steps Container */}
          <div className="relative">
            {/* Central Connecting Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-100 -translate-x-1/2 hidden md:block">
              <motion.div 
                style={{ height: lineHeight }}
                className="w-full bg-brand-primary origin-top"
              />
            </div>

            {/* Steps */}
            <div className="space-y-32 md:space-y-60">
              {[
                {
                  step: "01",
                  title: "현재 상태 점검",
                  eng: "Audit",
                  desc: "브랜드가 어떻게 보이고 있는지, 무엇이 제각각 흩어져 있는지 점검합니다.",
                  align: "left"
                },
                {
                  step: "02",
                  title: "방향과 기준 정리",
                  eng: "Strategy",
                  desc: "어떤 인상으로 남아야 하는지, 무엇을 보여줄지 기준을 세웁니다.",
                  align: "right"
                },
                {
                  step: "03",
                  title: "우선순위 연결",
                  eng: "Execution",
                  desc: "홈페이지, 플레이스 등 가장 시급한 접점부터 제작에 들어갑니다.",
                  align: "left"
                },
                {
                  step: "04",
                  title: "일관성 관리",
                  eng: "Maintenance",
                  desc: "결과물이 따로 놀지 않도록 전체 흐름을 다시 점검합니다.",
                  align: "right"
                }
              ].map((item, idx) => (
                <div key={idx} className={`relative flex items-center ${item.align === "left" ? "md:justify-start" : "md:justify-end"}`}>
                  {/* Step Content */}
                  <motion.div 
                    initial={{ opacity: 0, x: item.align === "left" ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8, ease: "circOut" }}
                    className={`w-full md:w-[45%] ${item.align === "left" ? "md:text-right" : "md:text-left"}`}
                  >
                    <div className={`flex items-center gap-4 mb-4 ${item.align === "left" ? "md:flex-row-reverse" : "flex-row"}`}>
                      <span className="text-5xl md:text-7xl font-black text-brand-primary/10 tracking-tighter">{item.step}</span>
                      <div className="flex flex-col">
                        <span className="text-brand-primary font-black text-sm uppercase tracking-widest">{item.eng}</span>
                        <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">{item.title}</h3>
                      </div>
                    </div>
                    <p className="text-lg md:text-xl font-medium text-slate-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>

                  {/* Connector Dot on Center Line */}
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-4 border-brand-primary rounded-full z-10 hidden md:block"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-60 bg-black relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6">
          {/* Section Index */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-20"
          >
            <span className="text-sm font-bold tracking-widest text-brand-primary">07</span>
            <div className="w-12 h-[1px] bg-brand-primary/30" />
            <span className="text-sm font-bold tracking-widest text-slate-400 uppercase">Contact Us</span>
          </motion.div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-20">
            {/* Left: Content */}
            <div className="flex-1">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-[40px] md:text-[56px] font-black text-white tracking-tighter leading-[1.35] mb-12"
              >
                <span className="text-brand-primary">전화</span> 또는 <span className="text-brand-primary">카톡</span>으로 <br />
                견적 상담이 가능합니다.
              </motion.h2>

              <div className="flex flex-wrap gap-4 mb-10">
                <motion.a 
                  href="tel:070-8849-6806"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-3 bg-white text-slate-900 px-8 py-5 rounded-2xl font-black text-lg shadow-xl hover:bg-slate-50 transition-all"
                >
                  <Phone className="w-6 h-6 text-brand-primary" />
                  전화 문의
                </motion.a>
                <motion.a 
                  href="https://open.kakao.com/me/brandone"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-3 bg-[#FEE500] text-[#3C1E1E] px-8 py-5 rounded-2xl font-black text-lg shadow-xl hover:bg-[#FADA0A] transition-all"
                >
                  <MessageCircle className="w-6 h-6" />
                  카톡 문의
                </motion.a>
              </div>

              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-slate-400 font-medium leading-relaxed max-w-md"
              >
                촉박한 일정으로 의뢰하는 경우, <br />
                맞춤 상담이 필요한 경우 전화로 문의주세요!
              </motion.p>
            </div>

            {/* Right: Phone Mockup */}
            <div className="flex-1 relative flex justify-center lg:justify-end w-full">
              {/* Phone Frame */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                className="w-[320px] h-[640px] bg-black rounded-[60px] border-[2px] border-white/40 shadow-2xl relative overflow-hidden flex flex-col"
              >
                {/* Phone Screen Content */}
                <div className="flex-1 p-8 flex flex-col justify-center relative">
                  
                  {/* Client Chat (Above Logo) */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="self-start bg-white text-slate-900 px-5 py-2.5 rounded-full rounded-tl-none font-bold shadow-lg relative mb-12 z-20"
                  >
                    안녕하세요!
                    <div className="absolute top-0 -left-1.5 w-0 h-0 border-t-[8px] border-t-white border-l-[8px] border-l-transparent" />
                  </motion.div>

                  {/* Centered Logo with Kakao Icon */}
                  <div className="relative py-12 flex justify-center z-10">
                    <div className="relative">
                      <div className="flex flex-col items-center">
                        <span className="font-black text-5xl md:text-6xl tracking-tighter text-white uppercase leading-[0.9]">
                          BRA<span className="text-brand-primary">ND</span>
                        </span>
                        <span className="font-black text-5xl md:text-6xl tracking-tighter text-white uppercase leading-[0.9]">
                          <span className="text-brand-primary">O</span>NE<span className="text-brand-primary">.</span>
                        </span>
                      </div>
                      {/* Kakao Icon Badge */}
                      <div className="absolute -top-4 -right-8 w-8 h-8 bg-[#FEE500] rounded-full flex items-center justify-center shadow-lg border-2 border-black">
                        <MessageCircle className="w-4.5 h-4.5 text-[#3C1E1E] fill-[#3C1E1E]" />
                      </div>
                    </div>
                  </div>

                  {/* Our Chats (Below Logo) */}
                  <div className="flex flex-col gap-3 mt-12 z-20">
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1 }}
                      className="self-end bg-[#D9F132] text-slate-900 px-5 py-2.5 rounded-full rounded-tr-none font-bold shadow-lg relative"
                    >
                      커뮤니케이션 전담PM이
                      <div className="absolute top-0 -right-1.5 w-0 h-0 border-t-[8px] border-t-[#D9F132] border-r-[8px] border-r-transparent" />
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1.3 }}
                      className="self-end bg-[#D9F132] text-slate-900 px-5 py-2.5 rounded-full rounded-tr-none font-bold shadow-lg relative"
                    >
                      상담해드립니다!
                      <div className="absolute top-0 -right-1.5 w-0 h-0 border-t-[8px] border-t-[#D9F132] border-r-[8px] border-r-transparent" />
                    </motion.div>
                  </div>
                </div>

                {/* Phone Bottom Bar Indicator */}
                <div className="h-1.5 w-32 bg-white/20 rounded-full mx-auto mb-6" />
              </motion.div>

              {/* Decorative Glow */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-primary/20 blur-[120px] rounded-full" />
            </div>
          </div>
        </div>
      </section>

      <QuickMenu />
      <Footer className="bg-black" />
    </div>
  );
}
