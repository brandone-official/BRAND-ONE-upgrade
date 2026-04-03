import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowRight, CheckCircle2, Calculator, Plus, Minus, RotateCcw } from "lucide-react";

const items = [
  { 
    name: "Strategy", 
    type: "star", 
    color: "text-amber-400", 
    accentBg: "bg-amber-400",
    title: "전략",
    subTitle: "성장의 방향을 정하는 정밀한 설계",
    quote: "열심히 달리고 있지만 제자리걸음처럼 느껴진다면,\n지도를 다시 그려야 할 때입니다.",
    painPoint: "많은 비용과 시간을 쏟아부어도 눈에 띄는 성과가 없어 고민하고 계신가요?\n방향이 어긋난 실행은 에너지를 소진시킬 뿐입니다.",
    guideText: "BRAND ONE은 실행의 효율을 극대화하기 위해 브랜드의 뿌리를 단단히 내리는 전략적 설계도를 제안합니다.\n정교한 설계는 마케팅의 모든 과정을 단순한 '지출'이 아닌 '미래를 위한 자산'으로 바꿔줍니다.",
    prices: [
      { label: "Standard (기본 체계 정립)", price: "10만 원", desc: "기존 로고·폰트·컬러 시스템 최적화 및 브랜드 슬로건 도출" },
      { label: "Advanced (비즈니스 설계)", price: "30만 원", desc: "Standard 포함 + 핵심 가치 및 3대 중점 영역 선정, 톤앤매너 가이드" },
      { label: "Master (통합 매니지먼트)", price: "50만 원 ~", desc: "Advanced 포함 + 6대 접점 전 채널 진단 및 1:1 전담 디렉팅" }
    ]
  },
  { 
    name: "Website", 
    type: "browser", 
    color: "text-emerald-500", 
    accentBg: "bg-emerald-500",
    title: "홈페이지",
    subTitle: "기술과 미학이 공존하는 디지털 본진",
    quote: "아무리 멋진 공간이라도, 고객이 우리를 발견할 수 없다면\n그 가치는 온전히 전해지기 어렵습니다.",
    painPoint: "화려한 비주얼에만 집중한 나머지, 정작 검색 엔진이나 AI 답변에서\n우리 브랜드가 소외되고 있지는 않나요?",
    guideText: "BRAND ONE은 시각적인 아름다움은 물론, 고객과의 연결고리인 기술적 최적화(SEO/AEO)를 기본으로 설계합니다.\n누구나 쉽게 찾아오고, 오래 머물고 싶은 '발견되는 본진'을 만들어 드립니다.",
    prices: [
      { label: "Standard (베이직 웹)", price: "150만 원", desc: "범용 템플릿 기반 안정적 레이아웃 + 기본 SEO/AEO 대응 설계" },
      { label: "Advanced (비주얼 확장 웹)", price: "250만 원", desc: "Standard 포함 + 스크롤 트리거 인터랙션 및 메타 데이터 최적화" },
      { label: "Master (프리미엄 커스텀)", price: "500만 원 ~", desc: "Advanced 포함 + 전용 영상/모션 소스 제작 및 독자적 UX 커스텀" },
      { label: "Point Service (랜딩페이지)", price: "30만 원", desc: "특정 목적에 최적화된 고효율 페이지 디자인 및 구축 (페이지당)" }
    ]
  },
  { 
    name: "Blog", 
    type: "text", 
    color: "text-rose-500", 
    accentBg: "bg-rose-500",
    title: "블로그",
    subTitle: "마음을 움직이는 진정성 있는 기록",
    quote: "수많은 정보 속에서 고객은 단순한 노출보다\n'나를 이해해주는 목소리'를 기다립니다.",
    painPoint: "매일 올라오는 기계적인 글들이 브랜드의 이미지를 오히려 평범하게 만들고 있지는 않나요?\n숫자에만 집중한 조회수는 진정한 팬을 만들지 못합니다.",
    guideText: "BRAND ONE은 클라이언트 고유의 페르소나를 투영하여, 읽히고 공감받는 브랜드 자산을 쌓아갑니다.\n시간이 흐를수록 더 깊은 신뢰를 만들어내는 진정성 있는 콘텐츠의 힘으로 고객의 마음속에 자리 잡으세요.",
    prices: [
      { label: "Standard (월 4회)", price: "30만 원", desc: "페르소나 설정 기반 고유 보이스톤 수립 및 통합 SEO/AEO 적용" },
      { label: "Advanced (월 8회)", price: "56만 원", desc: "Standard 포함 + 전용 이미지 컴포넌트 활용 및 전략적 키워드 믹스" },
      { label: "Master (전략 디렉팅)", price: "100만 원 ~", desc: "Advanced 포함 + 지수 강화 전략 설계 및 6대 접점 콘텐츠 싱크 관리" }
    ]
  },
  { 
    name: "Place", 
    type: "orbit", 
    color: "text-blue-600", 
    accentBg: "bg-blue-600",
    title: "플레이스",
    subTitle: "비즈니스의 모든 매력이 모이는 요충지",
    quote: "고객의 고민이 확신으로 바뀌는 결정적 순간,\n그 흐름을 놓치지 않아야 합니다.",
    painPoint: "온라인의 여러 접점을 거쳐 우리를 검색한 고객이, 정작 마지막 단계인 플레이스에서\n매력을 느끼지 못해 발길을 돌리고 있지는 않나요?",
    guideText: "플레이스는 비즈니스의 모든 매력을 응축해 보여주는 전략적 요충지입니다.\n정보와 비주얼, 로직을 정교하게 정렬하여 고객의 방문 결정이 자연스럽게 이어지도록 최적의 동선을 설계합니다.",
    prices: [
      { label: "Master (All-in-One)", price: "30만 원", desc: "키워드 설계, 경쟁사 분석, 홍보 배너 제작, 알고리즘 최적화 (1회성)" }
    ]
  },
  { 
    name: "Video", 
    type: "play", 
    color: "text-slate-900", 
    accentBg: "bg-slate-900",
    title: "영상",
    subTitle: "찰나의 순간에 전해지는 브랜드의 실체",
    quote: "글과 사진만으로는 전하기 힘든 브랜드의 온기,\n이제 생생한 경험으로 전달하세요.",
    painPoint: "브랜드의 가치와 철학을 텍스트로만 설명하기엔 한계가 느껴질 때가 있습니다.\n정적인 정보만으로는 고객의 감성을 자극하기에 부족할 수 있습니다.",
    guideText: "기획부터 사운드 디자인까지 BRAND ONE의 감각이 담긴 영상은 백 마디 말보다 강력한 확신을 고객에게 심어줍니다.\n브랜드의 실체를 가장 입체적으로 전달하여, 고객의 기억에 오래도록 남는 임팩트를 선사하세요.",
    prices: [
      { label: "Type A (숏폼 & 릴스)", price: "15만 / 25만", desc: "1분 내외 세로형 영상 / 후킹 자막 및 트렌디 BGM (자료편집/AI아바타)" },
      { label: "Type B (브랜드 다큐)", price: "30만 원", desc: "10분 이내 가로형 영상 / 보유 자료 및 인터뷰 정밀 편집" },
      { label: "Type C (리얼 후기 & 사례)", price: "30만 원", desc: "인터뷰 소스 활용 및 비포/애프터 시각화, 성과 강조 자막" }
    ]
  },
  { 
    name: "Offline", 
    type: "stamp", 
    color: "text-brand-primary", 
    accentBg: "bg-brand-primary",
    title: "오프라인",
    subTitle: "손끝으로 완성되는 일관된 경험",
    quote: "온라인에서 시작된 긍정적인 기대가 오프라인의 실물로 증명될 때\n브랜드는 완성됩니다.",
    painPoint: "디지털에서의 세련된 이미지가 오프라인의 작은 제작물 하나로 인해 퇴색되고 있지는 않나요?\n작은 불일치가 브랜드의 전체적인 신뢰도를 떨어뜨릴 수 있습니다.",
    guideText: "BRAND ONE은 고객이 접하는 모든 물리적 매체에 일관된 브랜드 보이스를 입힙니다.\n온라인의 약속이 오프라인의 실물로 이어지는 매끄러운 경험을 통해, 고객의 신뢰를 마지막 순간까지 견고하게 지켜 드립니다.",
    prices: [
      { label: "Item 1 (비즈니스 필수)", price: "1만 ~ 5만", desc: "명함(신규/수정), 봉투, 서식지 등 필수 사무 제작물" },
      { label: "Item 2 (공간 비주얼)", price: "8만 ~ 10만", desc: "포스터, X배너, 입간판, 현수막, 공간 안내 사인" },
      { label: "Item 3 (브랜드 가이드북)", price: "7만 ~ 28만", desc: "전단, 3단 리플렛, 브로슈어(P당), 서비스 매뉴얼" },
      { label: "Item 4 (패키징 디렉팅)", price: "7만 ~ 100만", desc: "패키지 디자인, 박스, 라벨, 제품 안내카드 등" }
    ]
  },
];

const ServiceCard = ({ item, size = "normal", onClick }: { item: typeof items[0], size?: "normal" | "mini", onClick?: () => void }) => {
  const baseScale = size === "mini" ? 0.45 : 1;
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
                  className={`absolute w-1.5 h-full ${item.accentBg}/20`}
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
            <div className={`w-56 h-56 rounded-full border-4 ${item.accentBg}/10 flex items-center justify-center`}>
              <div className={`w-40 h-40 rounded-full ${item.accentBg} flex items-center justify-center text-white font-black text-2xl italic uppercase shadow-2xl`}>
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
              <span className={`font-black text-3xl ${item.color} uppercase italic tracking-tighter`}>
                {item.name}
              </span>
              <motion.div
                animate={{ 
                  opacity: [1, 0, 1],
                  scaleY: [1, 1.2, 1]
                }}
                transition={{ duration: 0.6, repeat: Infinity }}
                className={`w-2 h-10 ${item.accentBg} ml-2`}
              />
            </div>
          </div>
        );
      case "text":
        return (
          <div className={`${boxSize} flex flex-col justify-center gap-4 px-4`}>
            <div className={`w-full h-3 ${item.accentBg}/10 rounded-full overflow-hidden`}>
              <motion.div
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className={`w-2/3 h-full ${item.accentBg}`}
              />
            </div>
            <span className={`font-black text-5xl ${item.color} uppercase italic tracking-tighter text-center`}>
              {item.name}
            </span>
            <div className={`w-full h-3 ${item.accentBg}/10 rounded-full overflow-hidden`}>
              <motion.div
                animate={{ x: ["100%", "-100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className={`w-2/3 h-full ${item.accentBg}`}
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
    <motion.div 
      initial={{ filter: "grayscale(100%)", opacity: 0.8, scale: baseScale }}
      whileHover={{ filter: "grayscale(0%)", opacity: 1, scale: baseScale * 1.1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="cursor-pointer origin-center"
      onClick={onClick}
    >
      {renderContent()}
    </motion.div>
  );
};

export default function Service() {
  const [selectedItem, setSelectedItem] = useState<typeof items[0] | null>(null);
  const [viewMode, setViewMode] = useState<"guide" | "price">("guide");
  const calculatorRef = useRef<HTMLDivElement>(null);

  const [selectedOptions, setSelectedOptions] = useState<Record<string, number>>({});

  const scrollToCalculator = () => {
    calculatorRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleOptionToggle = (categoryId: string, optionId: string, price: number) => {
    setSelectedOptions(prev => {
      const next = { ...prev };
      if (next[optionId]) {
        delete next[optionId];
      } else {
        // If it's a single-choice category (like Strategy, Website, Blog, Place), remove other options from same category
        if (["Strategy", "Website", "Blog", "Place"].includes(categoryId)) {
          const nextFiltered = { ...next };
          Object.keys(nextFiltered).forEach(key => {
            if (key.startsWith(categoryId.toLowerCase())) delete nextFiltered[key];
          });
          nextFiltered[optionId] = price;
          return nextFiltered;
        }
        next[optionId] = price;
      }
      return next;
    });
  };

  const totalPrice: number = (Object.values(selectedOptions) as number[]).reduce((sum: number, price: number) => sum + price, 0);

  const handleClose = () => {
    setSelectedItem(null);
    setViewMode("guide");
  };

  return (
    <div className="min-h-screen bg-white pt-40 pb-32">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Section Index */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4 mb-12"
        >
          <span className="text-sm font-bold tracking-widest text-brand-primary">01</span>
          <div className="w-12 h-[1px] bg-brand-primary/30" />
          <span className="text-sm font-bold tracking-widest text-slate-400 uppercase">WHAT DO YOU WANT</span>
        </motion.div>

        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[48px] md:text-[60px] font-black leading-[1.35] tracking-tight text-brand-secondary mb-6"
          >
            <span className="text-brand-primary">어느 접점이 부족하다고</span> <br />
            생각하시나요?
          </motion.h2>
          
          {/* CTA Text */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center gap-3"
          >
            <p className="text-slate-500 font-bold text-lg tracking-tight">
              궁금한 접점을 <span className="text-brand-primary underline underline-offset-4 decoration-2">클릭</span>하여 상세 가이드와 가격을 확인해보세요.
            </p>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-brand-primary"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 13l5 5 5-5" />
              </svg>
            </motion.div>
          </motion.div>
        </div>

        {/* Hexagon Visual */}
        <div className="relative w-full max-w-[1000px] h-[650px] mx-auto">
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

          {/* Center Text */}
          <div className="absolute left-1/2 top-[350px] -translate-x-1/2 -translate-y-1/2 z-20">
            <span className="text-[120px] font-black tracking-tighter text-brand-primary leading-none">ONE</span>
          </div>

          {/* Hexagon Vertices */}
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
                <ServiceCard 
                  item={pt.item} 
                  size="mini" 
                  onClick={() => setSelectedItem(pt.item)}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Philosophical Pause Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="py-80 text-center px-6"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-[40px] md:text-[52px] font-black text-slate-900 leading-[1.3] tracking-tighter mb-16 break-keep">
              지속 가능한 성장은 <br />
              파편화된 정보가 아닌, <br />
              <span className="text-brand-primary">정교한 연결로부터 시작됩니다.</span>
            </h2>
            
            <div className="w-20 h-[1px] bg-slate-200 mx-auto mb-16" />
            
            <div className="flex flex-col items-center gap-12">
              <p className="text-slate-500 font-bold text-lg tracking-tight break-keep">
                확인하신 가이드와 가격을 바탕으로, <br />
                당신만의 <span className="text-brand-primary underline underline-offset-4 decoration-2">브랜드 빌드업</span>을 지금 시작해 보세요.
              </p>

              <motion.button
                onClick={scrollToCalculator}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-3 px-10 py-5 bg-slate-900 text-white rounded-full font-black text-lg hover:bg-brand-primary transition-all shadow-xl shadow-slate-200"
              >
                견적 계산기 바로가기
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </div>
        </motion.section>

        {/* Estimate Calculator Section */}
        <section ref={calculatorRef} className="py-40 bg-slate-950 text-white overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-12"
            >
              <span className="text-sm font-bold tracking-widest text-brand-primary">02</span>
              <div className="w-12 h-[1px] bg-brand-primary/30" />
              <span className="text-sm font-bold tracking-widest text-slate-500 uppercase">ESTIMATE CALCULATOR</span>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
              {/* Left: Selection Area */}
              <div className="space-y-12">
                <h2 className="text-[40px] md:text-[56px] font-black tracking-tighter leading-tight">
                  필요한 접점을 <br />
                  <span className="text-brand-primary">자유롭게 구성해 보세요.</span>
                </h2>

                <div className="space-y-10">
                  {[
                    {
                      id: "Strategy",
                      title: "전략 (Strategy)",
                      options: [
                        { id: "strategy-std", label: "Standard (기본 체계 정립)", price: 100000 },
                        { id: "strategy-adv", label: "Advanced (비즈니스 설계)", price: 300000 },
                        { id: "strategy-mst", label: "Master (통합 매니지먼트)", price: 500000 },
                      ]
                    },
                    {
                      id: "Website",
                      title: "홈페이지 (Website)",
                      options: [
                        { id: "website-std", label: "Standard (베이직 웹)", price: 1500000 },
                        { id: "website-adv", label: "Advanced (비주얼 확장 웹)", price: 2500000 },
                        { id: "website-mst", label: "Master (프리미엄 커스텀)", price: 5000000 },
                        { id: "website-lp", label: "Point Service (랜딩페이지)", price: 300000 },
                      ]
                    },
                    {
                      id: "Blog",
                      title: "블로그 (Blog)",
                      options: [
                        { id: "blog-std", label: "Standard (월 4회)", price: 300000 },
                        { id: "blog-adv", label: "Advanced (월 8회)", price: 560000 },
                        { id: "blog-mst", label: "Master (전략 디렉팅)", price: 1000000 },
                      ]
                    },
                    {
                      id: "Place",
                      title: "플레이스 (Place)",
                      options: [
                        { id: "place-mst", label: "Master (All-in-One)", price: 300000 },
                      ]
                    },
                    {
                      id: "Video",
                      title: "영상 (Video)",
                      options: [
                        { id: "video-a", label: "Type A (숏폼 & 릴스)", price: 150000 },
                        { id: "video-b", label: "Type B (브랜드 다큐)", price: 300000 },
                        { id: "video-c", label: "Type C (리얼 후기 & 사례)", price: 300000 },
                      ]
                    },
                    {
                      id: "Offline",
                      title: "오프라인 (Offline)",
                      options: [
                        { id: "offline-1", label: "Item 1 (비즈니스 필수)", price: 30000 },
                        { id: "offline-2", label: "Item 2 (공간 비주얼)", price: 90000 },
                        { id: "offline-3", label: "Item 3 (브랜드 가이드북)", price: 150000 },
                        { id: "offline-4", label: "Item 4 (패키징 디렉팅)", price: 500000 },
                      ]
                    }
                  ].map((cat) => (
                    <div key={cat.id} className="space-y-4">
                      <h3 className="text-lg font-bold text-slate-400 uppercase tracking-widest">{cat.title}</h3>
                      <div className="flex flex-wrap gap-3">
                        {cat.options.map((opt) => (
                          <button
                            key={opt.id}
                            onClick={() => handleOptionToggle(cat.id, opt.id, opt.price)}
                            className={`px-6 py-3 rounded-2xl border-2 transition-all font-bold text-sm ${
                              selectedOptions[opt.id]
                                ? "bg-brand-primary border-brand-primary text-white shadow-lg shadow-brand-primary/20"
                                : "border-slate-800 text-slate-500 hover:border-slate-600 hover:text-slate-300"
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Summary Area */}
              <div className="sticky top-32">
                <div className="bg-slate-900 rounded-[48px] p-10 md:p-14 border border-slate-800 shadow-2xl">
                  <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary">
                        <Calculator className="w-6 h-6" />
                      </div>
                      <h3 className="text-2xl font-black tracking-tight">예상 견적 요약</h3>
                    </div>
                    <button 
                      onClick={() => setSelectedOptions({})}
                      className="text-slate-500 hover:text-white transition-colors flex items-center gap-2 font-bold text-sm"
                    >
                      <RotateCcw className="w-4 h-4" />
                      초기화
                    </button>
                  </div>

                  <div className="space-y-6 mb-12 min-h-[200px]">
                    <AnimatePresence mode="popLayout">
                      {Object.keys(selectedOptions).length > 0 ? (
                        Object.entries(selectedOptions).map(([id, price]: [string, number]) => {
                          // Find label from id
                          const allOptions = [
                            { id: "strategy-std", label: "전략 - Standard" },
                            { id: "strategy-adv", label: "전략 - Advanced" },
                            { id: "strategy-mst", label: "전략 - Master" },
                            { id: "website-std", label: "홈페이지 - Standard" },
                            { id: "website-adv", label: "홈페이지 - Advanced" },
                            { id: "website-mst", label: "홈페이지 - Master" },
                            { id: "website-lp", label: "홈페이지 - 랜딩페이지" },
                            { id: "blog-std", label: "블로그 - Standard" },
                            { id: "blog-adv", label: "블로그 - Advanced" },
                            { id: "blog-mst", label: "블로그 - Master" },
                            { id: "place-mst", label: "플레이스 - Master" },
                            { id: "video-a", label: "영상 - Type A" },
                            { id: "video-b", label: "영상 - Type B" },
                            { id: "video-c", label: "영상 - Type C" },
                            { id: "offline-1", label: "오프라인 - Item 1" },
                            { id: "offline-2", label: "오프라인 - Item 2" },
                            { id: "offline-3", label: "오프라인 - Item 3" },
                            { id: "offline-4", label: "오프라인 - Item 4" },
                          ];
                          const label = allOptions.find(o => o.id === id)?.label || id;
                          
                          return (
                            <motion.div
                              key={id}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              className="flex items-center justify-between group"
                            >
                              <span className="text-slate-400 font-bold">{label}</span>
                              <div className="flex items-center gap-4">
                                <span className="font-black text-white">{(price / 10000).toLocaleString()}만 원</span>
                                <button 
                                  onClick={() => {
                                    const next = { ...selectedOptions };
                                    delete next[id];
                                    setSelectedOptions(next);
                                  }}
                                  className="text-slate-700 hover:text-rose-500 transition-colors"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                              </div>
                            </motion.div>
                          );
                        })
                      ) : (
                        <div className="h-full flex flex-col items-center justify-center text-slate-600 gap-4 py-10">
                          <Plus className="w-8 h-8 opacity-20" />
                          <p className="font-bold">선택된 항목이 없습니다.</p>
                        </div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="pt-10 border-t border-slate-800">
                    <div className="flex items-end justify-between mb-10">
                      <span className="text-slate-400 font-bold text-lg">총 예상 견적</span>
                      <div className="text-right">
                        <motion.span 
                          key={totalPrice}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-[48px] md:text-[56px] font-black text-brand-primary leading-none block"
                        >
                          {(totalPrice / 10000).toLocaleString()}만 원
                        </motion.span>
                        <span className="text-slate-500 text-sm font-bold mt-2 block">VAT 별도</span>
                      </div>
                    </div>

                    <button className="w-full py-6 bg-brand-primary text-white rounded-3xl font-black text-xl hover:shadow-2xl hover:shadow-brand-primary/30 transition-all flex items-center justify-center gap-3">
                      상담 신청하고 확정 견적 받기
                      <ArrowRight className="w-6 h-6" />
                    </button>
                    <p className="text-center text-slate-600 text-sm font-medium mt-6">
                      * 위 견적은 선택하신 항목에 따른 예상 비용이며, <br />
                      상담을 통해 상세 범위 확정 시 변동될 수 있습니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Interactive Overlay */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-2xl rounded-[40px] overflow-hidden shadow-2xl relative"
            >
              {/* Close Button */}
              <button 
                onClick={handleClose}
                className="absolute top-8 right-8 w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all z-10"
              >
                <X size={24} />
              </button>

              <div className="p-10 md:p-14">
                {/* Header */}
                <div className="mb-10">
                  <div className={`inline-flex items-center px-4 py-1.5 rounded-full ${selectedItem.accentBg} text-white text-xs font-black uppercase tracking-widest mb-4`}>
                    {selectedItem.name}
                  </div>
                  {viewMode === "guide" ? (
                    <div className="flex gap-6">
                      {/* Vertical Accent Bar */}
                      <div className={`w-1.5 rounded-full ${selectedItem.accentBg} shrink-0`} />
                      
                      <div className="space-y-2">
                        <div className="relative inline-block">
                          <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight relative z-10">
                            {selectedItem.title}
                          </h3>
                          {/* Highlighter Underline */}
                          <div className={`absolute bottom-0.5 left-0 w-full h-3.5 ${selectedItem.accentBg} opacity-40 z-0`} />
                        </div>
                        <p className="text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-tight break-keep">
                          {selectedItem.subTitle}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                      Service Price List
                    </h3>
                  )}
                </div>

                {/* Content Area */}
                <div className="min-h-[400px]">
                  {viewMode === "guide" ? (
                    <motion.div
                      key="guide"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <div className="mb-10">
                        <p className="text-xl md:text-2xl font-black text-brand-primary italic leading-tight mb-6 break-keep whitespace-pre-line">
                          "{selectedItem.quote}"
                        </p>
                        <div className="space-y-6">
                          <div>
                            <span className="text-xs font-black uppercase tracking-widest text-rose-500 mb-2 block">Pain Point</span>
                            <p className="text-slate-600 font-bold leading-relaxed break-keep whitespace-pre-line">{selectedItem.painPoint}</p>
                          </div>
                          <div>
                            <span className="text-xs font-black uppercase tracking-widest text-emerald-500 mb-2 block">Guide / Solution</span>
                            <p className="text-slate-600 font-bold leading-relaxed break-keep whitespace-pre-line">{selectedItem.guideText}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="price"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      {selectedItem.prices.map((p, idx) => (
                        <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between p-6 border-2 border-slate-50 rounded-3xl hover:border-brand-primary/20 transition-colors gap-4">
                          <div className="flex-1">
                            <h4 className="text-lg font-black text-slate-900 mb-1">{p.label}</h4>
                            <p className="text-sm font-bold text-slate-500">{p.desc}</p>
                          </div>
                          <div className="text-right">
                            <span className={`text-2xl font-black ${selectedItem.color}`}>{p.price}</span>
                          </div>
                        </div>
                      ))}
                      <div className="p-6 bg-slate-50 rounded-3xl mt-6">
                        <p className="text-sm text-slate-500 font-medium leading-relaxed">
                          * 위 가격은 프로젝트의 규모와 난이도에 따라 변동될 수 있습니다. <br />
                          * 상세 견적은 상담을 통해 확정됩니다.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Footer Action */}
                <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center">
                  {viewMode === "guide" ? (
                    <>
                      <div className="flex items-center gap-2 text-slate-400 font-bold text-sm">
                        <span className="w-2 h-2 rounded-full bg-brand-primary" />
                        Guide View
                      </div>
                      <button 
                        onClick={() => setViewMode("price")}
                        className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-full font-black hover:bg-brand-primary transition-all group"
                      >
                        가격 리스트 확인하기
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        onClick={() => setViewMode("guide")}
                        className="text-slate-400 font-black hover:text-slate-900 transition-colors"
                      >
                        ← 가이드 다시보기
                      </button>
                      <button 
                        onClick={handleClose}
                        className="px-8 py-4 bg-brand-primary text-white rounded-full font-black hover:shadow-lg hover:shadow-brand-primary/30 transition-all"
                      >
                        상담 신청하기
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
