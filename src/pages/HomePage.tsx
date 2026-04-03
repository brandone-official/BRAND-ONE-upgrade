import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { MessageSquare, FileText, Link2Off, LayoutGrid, Milestone, ArrowLeftRight, Phone, MessageCircle } from "lucide-react";
import Navbar from "../components/Navbar";

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
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                className="w-1/2 h-full bg-rose-500"
              />
            </div>
          </div>
        );
      case "play":
        return (
          <div className={`${boxSize} bg-slate-900 rounded-3xl flex items-center justify-center relative overflow-hidden group`}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]" />
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl z-10"
            >
              <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-slate-900 border-b-[12px] border-b-transparent ml-2" />
            </motion.div>
            <span className="absolute bottom-6 font-black text-xl text-white uppercase italic tracking-widest z-10">
              {item.name}
            </span>
          </div>
        );
      case "stamp":
        return (
          <div className={`relative flex items-center justify-center ${containerSize}`}>
            <motion.div
              animate={{ rotate: -15 }}
              className="w-64 h-64 border-8 border-brand-primary rounded-2xl flex items-center justify-center p-4"
            >
              <div className="w-full h-full border-4 border-brand-primary/30 rounded-lg flex items-center justify-center">
                <span className="font-black text-4xl text-brand-primary uppercase italic tracking-tighter text-center leading-none">
                  {item.name}<br/>MARKETING
                </span>
              </div>
            </motion.div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      className="flex-shrink-0"
      style={{ transform: `scale(${scale})` }}
    >
      {renderContent()}
    </div>
  );
};

export default function HomePage() {
  const [activeItem, setActiveItem] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  const logoOpacity = useTransform(scrollY, [0, 300], [1, 0.15]);
  const navOpacity = useTransform(scrollY, [0, 300], [1, 0.8]);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-brand-primary/30">
      <Navbar />

      {/* Section 1: Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-50">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-400/5 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 bg-brand-primary/10 text-brand-primary rounded-full text-sm font-bold mb-8 tracking-wider uppercase">
              Brand Experience Agency
            </span>
            <h1 className="text-[64px] md:text-[100px] font-black leading-[1.1] tracking-tighter text-slate-900 mb-8 italic">
              WE MAKE <br />
              <span className="text-brand-primary">BRAND NEW</span> ONE
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
              우리는 브랜드의 본질을 발견하고, <br />
              세상에 없던 단 하나의 경험을 설계합니다.
            </p>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-slate-400"
        >
          <div className="w-6 h-10 border-2 border-slate-200 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-brand-primary rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Section 2: Question */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[48px] md:text-[60px] font-black leading-[1.35] text-slate-900 mb-20 tracking-tight"
          >
            <span className="text-brand-primary">무엇이 부족하다고</span> <br />
            생각하시나요?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: MessageSquare, title: "Communication", desc: "고객과의 끊임없는 소통을 통해 최적의 결과물을 도출합니다." },
              { icon: FileText, title: "Strategy", desc: "데이터 기반의 정교한 전략으로 브랜드의 성장을 돕습니다." },
              { icon: Link2Off, title: "Experience", desc: "단순한 디자인을 넘어 사용자 경험의 가치를 창조합니다." }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 rounded-[40px] bg-slate-50 hover:bg-brand-primary group transition-all duration-500"
              >
                <feature.icon className="w-12 h-12 text-brand-primary group-hover:text-white mb-8 transition-colors" />
                <h3 className="text-2xl font-black text-slate-900 group-hover:text-white mb-4 italic uppercase tracking-tighter">{feature.title}</h3>
                <p className="text-slate-500 group-hover:text-white/80 leading-relaxed font-medium">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Project Steps */}
      <section className="py-32 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[48px] md:text-[60px] font-black leading-[1.35] tracking-tight italic"
            >
              PROJECT <br />
              <span className="text-brand-primary">PROCESS</span>
            </motion.h2>
            <p className="text-slate-400 text-xl max-w-md font-medium leading-relaxed">
              체계적인 단계를 거쳐 <br />
              완성도 높은 브랜딩을 실현합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {[
              { icon: LayoutGrid, step: "01", title: "Analysis", desc: "시장과 타겟을 분석합니다." },
              { icon: Milestone, step: "02", title: "Concept", desc: "핵심 가치를 정의합니다." },
              { icon: ArrowLeftRight, step: "03", title: "Design", desc: "비주얼 아이덴티티를 구축합니다." },
              { icon: MessageSquare, step: "04", title: "Launch", desc: "최종 결과물을 선보입니다." }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <span className="text-8xl font-black text-white/5 absolute -top-12 -left-4 italic">{item.step}</span>
                <item.icon className="w-10 h-10 text-brand-primary mb-8 relative z-10" />
                <h3 className="text-2xl font-black mb-4 italic uppercase tracking-tighter relative z-10">{item.title}</h3>
                <p className="text-slate-400 font-medium relative z-10">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Service Slider */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[48px] md:text-[60px] font-black leading-[1.35] text-slate-900 tracking-tight"
          >
            OUR <span className="text-brand-primary">SERVICES</span>
          </motion.h2>
        </div>

        <div className="relative">
          <div className="flex overflow-hidden gap-8 px-6">
            <motion.div 
              animate={{ x: [0, -1920] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="flex gap-8"
            >
              {[...items, ...items].map((item, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="w-[400px] h-[500px] rounded-[40px] bg-slate-50 border border-slate-100 flex items-center justify-center p-12 transition-all duration-500 group-hover:bg-white group-hover:shadow-2xl group-hover:shadow-brand-primary/10 group-hover:-translate-y-4">
                    <ServiceCard item={item} />
                  </div>
                  <div className="mt-8 text-center">
                    <span className="text-2xl font-black text-slate-900 italic uppercase tracking-tighter">{item.name}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 5: Portfolio */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[48px] md:text-[60px] font-black leading-[1.35] text-slate-900 tracking-tight italic"
            >
              SELECTED <br />
              <span className="text-brand-primary">WORKS</span>
            </motion.h2>
            <div className="flex gap-4">
              {["All", "Branding", "Digital", "Video"].map((cat) => (
                <button key={cat} className="px-6 py-2 rounded-full border border-slate-200 text-sm font-bold hover:bg-brand-primary hover:border-brand-primary hover:text-white transition-all">
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="aspect-[4/3] rounded-[40px] overflow-hidden bg-slate-200 mb-8 relative">
                  <img 
                    src={`https://picsum.photos/seed/work${i}/1200/900`} 
                    alt={`Work ${i}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-brand-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <span className="text-white font-black text-2xl italic uppercase tracking-widest">View Project</span>
                  </div>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2 italic uppercase tracking-tighter">Project Name {i}</h3>
                <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Branding / Digital Experience</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Contact CTA */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="bg-brand-primary rounded-[60px] p-12 md:p-24 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-white/10 skew-x-12 translate-x-1/2" />
            
            <div className="relative z-10 max-w-2xl">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-[48px] md:text-[72px] font-black leading-[1.1] text-white mb-12 italic tracking-tighter"
              >
                READY TO <br />
                BE <span className="text-slate-900">THE ONE?</span>
              </motion.h2>
              <p className="text-white/80 text-xl md:text-2xl font-medium mb-12 leading-relaxed">
                당신의 브랜드가 가진 잠재력을 깨우고, <br />
                시장을 압도하는 존재감을 만드세요.
              </p>
              <button className="px-12 py-5 bg-slate-900 text-white rounded-full font-black text-xl hover:bg-white hover:text-brand-primary transition-all duration-300 shadow-2xl">
                START A PROJECT
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Final Branding */}
      <section className="py-32 bg-slate-50 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-12"
              >
                <div className="space-y-4">
                  <span className="text-brand-primary font-black text-xl tracking-widest uppercase italic">The Philosophy</span>
                  <h2 className="text-[48px] md:text-[60px] font-black leading-[1.35] text-slate-900 tracking-tight italic">
                    ONLY ONE <br />
                    <span className="text-brand-primary">IDENTITY</span>
                  </h2>
                </div>
                
                <div className="space-y-8">
                  <p className="text-xl text-slate-600 font-medium leading-relaxed">
                    우리는 단순한 대행사가 아닙니다. <br />
                    브랜드의 성장을 함께 고민하는 <br />
                    <span className="text-slate-900 font-black">진정한 파트너</span>입니다.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <div className="text-4xl font-black text-brand-primary mb-2 italic">150+</div>
                      <div className="text-slate-500 font-bold text-sm uppercase tracking-widest">Projects Done</div>
                    </div>
                    <div>
                      <div className="text-4xl font-black text-brand-primary mb-2 italic">98%</div>
                      <div className="text-slate-500 font-bold text-sm uppercase tracking-widest">Client Satisfaction</div>
                    </div>
                  </div>
                </div>

                <div className="pt-8">
                  <button className="group flex items-center gap-4 text-slate-900 font-black text-xl italic uppercase tracking-tighter">
                    Learn More About Us
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition-all shadow-lg">
                      <ArrowLeftRight className="w-5 h-5" />
                    </div>
                  </button>
                </div>
              </motion.div>
            </div>

            <div className="relative flex justify-center">
              {/* Phone Mockup */}
              <motion.div 
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative w-[320px] h-[640px] bg-slate-900 rounded-[50px] border-[8px] border-slate-800 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col"
              >
                {/* Phone Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-slate-800 rounded-b-3xl z-30" />
                
                {/* Phone Content */}
                <div className="flex-1 relative p-6 flex flex-col justify-between overflow-hidden">
                  {/* Background Accents */}
                  <div className="absolute top-[-20%] right-[-20%] w-full h-full bg-brand-primary/20 blur-[80px] rounded-full" />
                  
                  {/* Centered Logo with Kakao Icon */}
                  <div className="relative py-12 flex justify-center z-10">
                    <div className="relative">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-brand-primary rounded-2xl flex items-center justify-center shadow-2xl mb-4">
                          <span className="text-white font-black text-3xl italic">B</span>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-black tracking-tighter text-white leading-none italic">BRAND</div>
                          <div className="text-2xl font-black tracking-tighter text-brand-primary leading-none italic">ONE</div>
                        </div>
                      </div>
                      
                      {/* Floating Kakao Badge */}
                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -top-4 -right-8 w-12 h-12 bg-[#FEE500] rounded-2xl flex items-center justify-center shadow-xl border-4 border-slate-900"
                      >
                        <MessageCircle className="w-6 h-6 text-[#3C1E1E]" />
                      </motion.div>
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

      {/* Floating Quick Menu */}
      <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-3">
        <motion.a
          href="tel:010-0000-0000"
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
          href="#"
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
    </div>
  );
}
