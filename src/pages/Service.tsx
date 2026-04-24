import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { X, ArrowRight, CheckCircle2, Calculator, Plus, Minus, RotateCcw, ChevronLeft } from "lucide-react";
import Footer from "../components/Footer";
import QuickMenu from "../components/QuickMenu";

const itemsPC = [
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
      { 
        label: "Standard (기본 체계 정립)", 
        price: "10만 원", 
        desc: "기존 로고·폰트·컬러 시스템 최적화 (시각적 일관성 가이드)\n브랜드 슬로건 및 핵심 키워드 도출 (커뮤니케이션 기준점)" 
      },
      { 
        label: "Advanced (비즈니스 설계)", 
        price: "30만 원", 
        desc: "[Standard] 포함\n브랜드 핵심 가치 및 3대 중점 영역(Top 3) 선정\n전 채널 공통 적용을 위한 이미지 연출 및 톤앤매너 가이드 제공" 
      },
      { 
        label: "Master (통합 매니지먼트)", 
        price: "50만 원 ~", 
        desc: "[Advanced] 포함\n6대 접점 전 채널 진단 및 브랜드 통합 개입 전략 수립\n제작물 우선순위 로드맵 설계 및 1개월간 브랜드 일관성 모니터링\n1:1 전담 디렉팅" 
      }
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
      { 
        label: "Standard (베이직 웹)", 
        price: "150만 원", 
        desc: "범용 템플릿 기반 안정적 레이아웃 + 브랜드 전략 기반 텍스트 최적화\n기본 SEO/AEO 대응: AI와 검색 엔진이 읽을 수 있는 텍스트 구조 설계" 
      },
      { 
        label: "Advanced (비주얼 확장 웹)", 
        price: "250만 원", 
        desc: "[Standard] 포함\n스크롤 트리거 등 인터랙션 및 고도화된 메타 데이터 최적화\n비주얼 임팩트를 위한 다층 레이어 구성 (※ 범용 소스 활용)" 
      },
      { 
        label: "Master (프리미엄 커스텀)", 
        price: "500만 원 ~", 
        desc: "[Advanced] 포함\n브랜드 전용 영상/모션 소스 제작 및 독자적 UX 커스텀 코딩\n전문 데이터 분석 도구 연동 및 유니크한 UI 컴포넌트 설계" 
      },
      { 
        label: "Point Service (랜딩페이지)", 
        price: "30만 원", 
        desc: "특정 목적에 최적화된 고효율 페이지가 필요할 때 제안하는 서비스입니다.\n특정 메뉴 교체, 상세 설명 페이지, 이벤트 랜딩페이지 등 단발성 작업 기준\n핵심 내용: 브랜드 보이스가 담긴 카피라이팅 + 레이아웃 최적화 + 기본 SEO 적용" 
      }
    ],
    notes: [
      "전용 영상, 고난도 인터랙션, 모션 그래픽 등 특별 소스 활용 시 별도 추가 비용이 발생할 수 있습니다.",
      "기존 사이트의 환경(플랫폼, 코딩 구조 등)에 따라 작업 범위가 협의될 수 있습니다."
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
      { 
        label: "Standard (월 4회)", 
        price: "30만 원", 
        desc: "페르소나 설정: 클라이언트의 말투와 철학을 반영한 고유 보이스톤 수립\n직접 쓴 듯한 깊이 있는 문체 + 통합 SEO/AEO 최적화 기본 적용" 
      },
      { 
        label: "Advanced (월 8회)", 
        price: "56만 원", 
        desc: "[Standard] 포함\n브랜드 전용 이미지 컴포넌트 활용 가독성 증대\n유입 가속화를 위한 전략적 키워드 믹스 및 타겟팅 포스팅" 
      },
      { 
        label: "Master (전략 디렉팅)", 
        price: "100만 원 ~", 
        desc: "[Advanced] 포함\n지수 강화를 위한 발행 횟수/주기 전략적 설계\n통합 성과 리포트 제공 및 6대 접점 채널 간 콘텐츠 싱크 관리" 
      }
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
      { 
        label: "Master (All-in-One)", 
        price: "30만 원", 
        desc: "전략적 키워드 설계 및 경쟁사 분석 기반 점유 전략\n플레이스 규격 맞춤 고감도 홍보 배너/소식지/이미지 큐레이션\n네이버/구글 알고리즘 최적화 및 스마트 플레이스 기능(예약/톡톡 등) 점검" 
      }
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
      { 
        label: "Type A. [숏폼 & 릴스]", 
        price: "15만 원", 
        desc: "자료 기반 편집형\n1분 내외 세로형 영상 (9:16) / 후킹 자막 및 트렌디 BGM" 
      },
      { 
        label: "Type B. [숏폼 & 릴스]", 
        price: "25만 원", 
        desc: "AI 아바타 활용\n1분 내외 세로형 영상 (9:16)\n후킹 자막 및 트렌디 BGM" 
      },
      { 
        label: "Type C. [브랜드 다큐 & 인터뷰]", 
        price: "30만 원", 
        desc: "자료 기반 편집형\n10분 이내 가로형 영상 (16:9)\n보유 자료(B-roll), 인터뷰, 서비스 과정 정밀 편집" 
      },
      { 
        label: "Type D. [리얼 후기 & 사례]", 
        price: "30만 원", 
        desc: "자료 기반 편집형\n인터뷰 소스 활용 및 비포/애프터 시각화\n핵심 성과 강조 자막 적용" 
      }
    ],
    notes: [
      "유료 스톡, 전용 촬영 소스 등 특수 소스 추가 시 비용 별도 협의"
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
      { 
        label: "Item 1. [비즈니스 필수]", 
        price: "1만 원 ~", 
        desc: "명함(신규): 5만 원\n명함(수정): 1만 원\n봉투: 5만 원\n서식지: 5만 원" 
      },
      { 
        label: "Item 2. [공간 비주얼]", 
        price: "8만 원 ~", 
        desc: "포스터: 8만 원\nX배너/입간판: 10만 원\n현수막: 10만 원 ~\n공간 안내 사인: 8만 원" 
      },
      { 
        label: "Item 3. [브랜드 가이드 북]", 
        price: "7만 원 ~", 
        desc: "전단(단면): 8만 원\n전단(양면): 15만 원\n리플렛(2단/3단): 28만 원\n브로슈어(P당): 7만 원\n핵심 서비스 매뉴얼: 별도 협의" 
      },
      { 
        label: "Item 4. [패키징 & 제품 디렉팅]", 
        price: "1만 원 ~", 
        desc: "패키지 디자인: 30만 원 ~\n박스/포장물: 30만 원\n선물세트 구성: 50만 원 ~\n라벨/스티커(신규): 7만 원\n라벨/스티커(단순 교체): 1만 원\n제품 안내카드(단면): 8만 원\n제품 안내카드(양면): 15만 원" 
      }
    ]
  },
];

const itemsMobile = JSON.parse(JSON.stringify(itemsPC));

const ServiceCardPC = ({ item, size = "normal", onClick }: { item: any, size?: "normal" | "mini", onClick?: () => void }) => {
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
      initial={{ filter: "grayscale(100%)", opacity: 0.8, scale: size === "mini" ? 0.45 : 1 }}
      whileHover={{ filter: "grayscale(0%)", opacity: 1, scale: (size === "mini" ? 0.45 : 1) * 1.1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="cursor-pointer origin-center"
      onClick={onClick}
    >
      {renderContent()}
    </motion.div>
  );
};

const ServiceCardMobile = ({ item, size = "normal", onClick, active = false }: { item: any, size?: "normal" | "mini" | "icon", onClick?: () => void, active?: boolean }) => {
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

  const scale = (size === "mini" ? 0.35 : size === "icon" ? 0.22 : 1) * 0.7;

  return (
    <div 
      className="cursor-pointer origin-center transform"
      style={{ scale }}
      onClick={onClick}
    >
      {renderContent()}
    </div>
  );
};

export default function Service() {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [viewMode, setViewMode] = useState<"guide" | "price">("guide");
  const [expandedPriceIdx, setExpandedPriceIdx] = useState<number | null>(null);
  const calculatorRef = useRef<HTMLDivElement>(null);
  const modalContainerRef = useRef<HTMLDivElement>(null);

  const isEstimateInView = useInView(calculatorRef, { margin: "-100px 0px -100px 0px" });

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, { price: number; quantity: number }>>({});
  const [activeSubTab, setActiveSubTab] = useState<string | null>(null);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: any) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const isAtBottom = scrollHeight - scrollTop <= clientHeight + 10;
    setShowScrollHint(!isAtBottom);
  };

  const categories = [
    {
      id: "Strategy",
      title: "전략 (Strategy)",
      description: "비즈니스의 방향성을 설정하고 브랜드의 핵심 가치를 정의합니다.",
      options: [
        { id: "strategy-std", label: "Standard (베이직)", price: 500000 },
        { id: "strategy-adv", label: "Advanced (비주얼)", price: 1000000 },
        { id: "strategy-mst", label: "Master (프리미엄)", price: 2000000 },
      ]
    },
    {
      id: "Website",
      title: "홈페이지 (Website)",
      description: "브랜드의 디지털 거점을 구축하고 사용자 경험을 설계합니다.",
      options: [
        { id: "website-std", label: "Standard (베이직 웹)", price: 1500000 },
        { id: "website-adv", label: "Advanced (비주얼 확장 웹)", price: 2500000 },
        { id: "website-mst", label: "Master (프리미엄 커스텀)", price: 5000000 },
        { id: "website-lp", label: "Point Service (페이지당)", price: 300000, hasQuantity: true },
      ]
    },
    {
      id: "Blog",
      title: "블로그 (Blog)",
      description: "지속적인 콘텐츠 발행을 통해 브랜드의 신뢰도와 전문성을 쌓습니다.",
      options: [
        { id: "blog-std", label: "Standard (월 4회)", price: 300000 },
        { id: "blog-adv", label: "Advanced (월 8회)", price: 560000 },
        { id: "blog-mst", label: "Master (전략 디렉팅)", price: 1000000 },
      ]
    },
    {
      id: "Place",
      title: "플레이스 (Place)",
      description: "오프라인 방문의 결정적 요충지인 네이버/구글 플레이스를 최적화합니다.",
      options: [
        { id: "place-mst", label: "Master (All-in-One)", price: 300000 },
      ]
    },
    {
      id: "Video",
      title: "영상 (Video)",
      description: "찰나의 순간에 브랜드의 실체를 생생하게 전달하는 영상 콘텐츠를 제작합니다.",
      multiSelect: true,
      options: [
        { id: "video-a", label: "Type A. [숏폼 & 릴스]", price: 150000, hasQuantity: true },
        { id: "video-b", label: "Type B. [숏폼 & 릴스]", price: 250000, hasQuantity: true },
        { id: "video-c", label: "Type C. [브랜드 다큐 & 인터뷰]", price: 300000, hasQuantity: true },
        { id: "video-d", label: "Type D. [리얼 후기 & 사례]", price: 300000, hasQuantity: true },
      ]
    },
    {
      id: "Offline",
      title: "오프라인 (Offline)",
      description: "손끝으로 전해지는 물리적 매체를 통해 브랜드 경험을 완성합니다.",
      multiSelect: true,
      subGroups: [
        {
          id: "essential",
          title: "비즈니스 필수",
          options: [
            { id: "off-card-new", label: "명함(신규)", price: 50000, hasQuantity: true },
            { id: "off-card-edit", label: "명함(수정)", price: 10000, hasQuantity: true },
            { id: "off-env", label: "봉투", price: 50000, hasQuantity: true },
            { id: "off-form", label: "서식지", price: 50000, hasQuantity: true },
          ]
        },
        {
          id: "visual",
          title: "공간 비주얼",
          options: [
            { id: "off-poster", label: "포스터", price: 80000, hasQuantity: true },
            { id: "off-banner-stand", label: "X배너/입간판", price: 100000, hasQuantity: true },
            { id: "off-banner-long", label: "현수막", price: 100000, isStartingPrice: true, hasQuantity: true },
            { id: "off-sign", label: "공간 안내 사인", price: 80000, hasQuantity: true },
          ]
        },
        {
          id: "guide",
          title: "브랜드 가이드 북",
          options: [
            { id: "off-flyer-s", label: "전단(단면)", price: 80000, hasQuantity: true },
            { id: "off-flyer-d", label: "전단(양면)", price: 150000, hasQuantity: true },
            { id: "off-leaflet", label: "리플렛(2단/3단)", price: 280000, hasQuantity: true },
            { id: "off-brochure", label: "브로슈어(P당)", price: 70000, hasQuantity: true },
            { id: "off-manual", label: "핵심 서비스 매뉴얼", price: 0, isConsultation: true },
          ]
        },
        {
          id: "package",
          title: "패키징 & 제품 디렉팅",
          options: [
            { id: "off-pkg-design", label: "패키지 디자인", price: 300000, isStartingPrice: true },
            { id: "off-box", label: "박스/포장물", price: 300000, hasQuantity: true },
            { id: "off-gift-set", label: "선물세트 구성", price: 500000, isStartingPrice: true },
            { id: "off-sticker-new", label: "라벨/스티커(신규)", price: 70000, hasQuantity: true },
            { id: "off-sticker-edit", label: "라벨/스티커(단순 교체)", price: 10000, hasQuantity: true },
            { id: "off-card-s", label: "제품 안내카드(단면)", price: 80000, hasQuantity: true },
            { id: "off-card-d", label: "제품 안내카드(양면)", price: 150000, hasQuantity: true },
          ]
        }
      ]
    }
  ];

  useEffect(() => {
    const category = categories[currentStep];
    if (category.subGroups) {
      setActiveSubTab(category.subGroups[0].id);
    } else {
      setActiveSubTab(null);
    }
  }, [currentStep]);

  useEffect(() => {
    // Check if content is scrollable after a short delay for rendering
    const timer = setTimeout(() => {
      if (scrollContainerRef.current) {
        const { scrollHeight, clientHeight } = scrollContainerRef.current;
        setShowScrollHint(scrollHeight > clientHeight + 10);
        scrollContainerRef.current.scrollTop = 0;
      }
    }, 150);
    return () => clearTimeout(timer);
  }, [currentStep, activeSubTab]);

  useEffect(() => {
    if (window.innerWidth < 1024 && modalContainerRef.current) {
      modalContainerRef.current.scrollTop = 0;
    }
  }, [viewMode]);

  const scrollToCalculator = () => {
    calculatorRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleOptionToggle = (categoryId: string, optionId: string, price: number) => {
    setSelectedOptions(prev => {
      const next = { ...prev };
      if (next[optionId]) {
        delete next[optionId];
      } else {
        const category = categories.find(c => c.id === categoryId);
        if (category && !category.multiSelect) {
          const nextFiltered = { ...next };
          Object.keys(nextFiltered).forEach(key => {
            // Check if existing selected option belongs to the same category
            const allOptions: any[] = (category.subGroups 
              ? (category.subGroups as any[]).flatMap(sg => sg.options)
              : category.options || []) as any[];
            const belongsToCategory = allOptions.some(opt => opt.id === key);
            if (belongsToCategory) delete nextFiltered[key];
          });
          nextFiltered[optionId] = { price, quantity: 1 };
          return nextFiltered;
        }
        next[optionId] = { price, quantity: 1 };
      }
      return next;
    });
  };

  const handleQuantityChange = (optionId: string, delta: number) => {
    setSelectedOptions(prev => {
      if (!prev[optionId]) return prev;
      const next = { ...prev };
      const newQty = Math.max(1, next[optionId].quantity + delta);
      next[optionId] = { ...next[optionId], quantity: newQty };
      return next;
    });
  };

  const totalPrice: number = (Object.values(selectedOptions) as { price: number; quantity: number }[]).reduce(
    (sum: number, item: { price: number; quantity: number }) => sum + (item.price * item.quantity), 
    0
  );

  const handleClose = () => {
    setSelectedItem(null);
    setViewMode("guide");
    setExpandedPriceIdx(null);
  };

  return (
    <div className="min-h-screen bg-white pt-24 lg:pt-40">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-6">
        {/* Section Index */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4 mb-8 lg:mb-12"
        >
          <span className="text-sm font-bold tracking-widest text-brand-primary">01</span>
          <div className="w-12 h-[1px] bg-brand-primary/30" />
          <span className="text-sm font-bold tracking-widest text-slate-400 uppercase">WHAT DO YOU WANT</span>
        </motion.div>

        <div className="text-center mb-8 lg:mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[32px] md:text-[48px] lg:text-[60px] font-black leading-[1.3] lg:leading-[1.35] tracking-tight text-brand-secondary mb-6"
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
            <p className="text-slate-500 font-bold text-lg tracking-tight text-center">
              궁금한 접점을 <span className="text-brand-primary underline underline-offset-4 decoration-2">클릭</span>하여<br className="md:hidden" /> 상세 가이드와 가격을<br className="md:hidden" /> 확인해보세요.
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

        {/* Hexagon Visual (PC ONLY) */}
        <div className="hidden lg:block relative w-full max-w-[1000px] h-[650px] mx-auto">
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
            { x: 500, y: 100, item: itemsPC[0] }, // Top: Strategy
            { x: 760, y: 250, item: itemsPC[3] }, // Top Right: Place
            { x: 760, y: 450, item: itemsPC[1] }, // Bottom Right: Website
            { x: 500, y: 600, item: itemsPC[2] }, // Bottom: Blog
            { x: 240, y: 450, item: itemsPC[4] }, // Bottom Left: Video
            { x: 240, y: 250, item: itemsPC[5] }, // Top Left: Offline
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
                <ServiceCardPC 
                  item={pt.item} 
                  size="mini" 
                  onClick={() => setSelectedItem(pt.item)}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Layout (MOBILE ONLY) */}
        <div className="lg:hidden flex flex-col gap-8 mb-20 px-4">
          <div className="grid grid-cols-1 gap-6">
            {itemsMobile.map((item, idx) => {
              const isActive = selectedItem?.name === item.name;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`p-6 rounded-[32px] border ${isActive ? 'bg-indigo-50 border-indigo-200' : 'bg-white border-slate-100'} flex items-center gap-6 shadow-sm`}
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="w-20 h-20 flex-shrink-0 flex items-center justify-center">
                    <ServiceCardMobile item={item} size="mini" active={isActive} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 mb-1">{item.title}</h3>
                    <p className="text-xs font-bold text-slate-500 leading-tight">{item.subTitle}</p>
                  </div>
                  <div className="ml-auto">
                    <ArrowRight size={20} className={isActive ? 'text-indigo-600' : 'text-slate-300'} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Philosophical Pause Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="py-32 lg:py-80 text-center px-6"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-[32px] md:text-[52px] font-black text-slate-900 leading-[1.3] tracking-tighter mb-16 break-keep">
              지속 가능한 성장은 <br />
              파편화된 정보가 아닌, <br />
              <span className="text-brand-primary">정교한 연결로부터 시작됩니다.</span>
            </h2>
            
            <div className="w-20 h-[1px] bg-slate-200 mx-auto mb-16" />
            
            <div className="flex flex-col items-center gap-12">
              <p className="text-slate-500 font-bold text-lg tracking-tight break-keep">
                확인하신 가이드와 가격을 바탕으로, <br />
                당신만의 <span className="text-brand-primary underline underline-offset-4 decoration-2">브랜드 빌드업</span>을 <br />
                지금 시작해 보세요.
              </p>

              {/* Natural Flow Indicator */}
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="mt-16 flex flex-col items-center gap-6"
              >
                <span className="text-sm font-black tracking-[0.3em] uppercase text-slate-400">
                  Scroll to <span className="text-brand-primary">Build</span>
                </span>
                <div className="w-[2px] h-16 bg-gradient-to-b from-brand-primary/40 to-transparent rounded-full" />
              </motion.div>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Build Your Brand Section */}
      <section id="estimate" ref={calculatorRef} className="py-20 lg:py-32 bg-[#020617] text-white overflow-hidden w-full relative">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-8 lg:mb-12"
          >
            <span className="text-sm font-bold tracking-widest text-[#D9F99D]">02</span>
            <div className="w-12 h-[1px] bg-[#D9F99D]/30" />
            <span className="text-sm font-bold tracking-widest text-slate-500 uppercase">BUILD YOUR BRAND</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Step-by-Step Selection Area */}
            <div className="space-y-6 lg:space-y-10">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-[#D9F99D] font-black text-sm lg:text-lg">STEP {currentStep + 1} / {categories.length}</span>
                  <div className="flex-1 h-[2px] bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentStep + 1) / categories.length) * 100}%` }}
                      className="h-full bg-[#D9F99D] shadow-[0_0_15px_rgba(217,249,157,0.5)]"
                    />
                  </div>
                </div>
                <h2 className="text-2xl lg:text-[44px] font-black tracking-tighter leading-tight">
                  {categories[currentStep].title} <br className="hidden lg:block" />
                  <span className="text-[#D9F99D] text-xl lg:text-[36px]">옵션을 선택해 주세요.</span>
                </h2>
                <p className="text-slate-500 font-bold text-sm md:text-base break-keep">
                  {categories[currentStep].description}
                </p>
                {categories[currentStep].multiSelect && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D9F99D] animate-pulse" />
                    <span className="text-[10px] font-black text-[#D9F99D] uppercase tracking-widest">중복 선택 가능</span>
                  </div>
                )}
              </div>

              <div className="space-y-6 lg:min-h-[400px] flex flex-col">
                {categories[currentStep].subGroups && (
                  <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar -mx-4 px-4 lg:mx-0 lg:px-0">
                    {categories[currentStep].subGroups.map((sg) => (
                      <button
                        key={sg.id}
                        onClick={() => setActiveSubTab(sg.id)}
                        className={`px-5 py-2.5 rounded-full text-[11px] lg:text-xs font-black whitespace-nowrap transition-all border-2 ${
                          activeSubTab === sg.id
                            ? "bg-[#D9F99D] border-[#D9F99D] text-black"
                            : "border-white/10 text-slate-500 hover:border-white/30 hover:text-white"
                        }`}
                      >
                        {sg.title}
                      </button>
                    ))}
                  </div>
                )}

                <div className="relative flex-1">
                  <div 
                    ref={scrollContainerRef}
                    onScroll={handleScroll}
                    className="overflow-y-auto pr-2 custom-scrollbar max-h-[400px] lg:max-h-[320px] lg:absolute lg:inset-0"
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`${currentStep}-${activeSubTab}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="grid grid-cols-1 gap-3 pb-20 lg:pb-16"
                      >
                        {(categories[currentStep].subGroups 
                          ? categories[currentStep].subGroups.find(sg => sg.id === activeSubTab)?.options 
                          : categories[currentStep].options
                        )?.map((opt) => (
                          <div
                            key={opt.id}
                            className={`group p-4 lg:p-5 rounded-2xl border-2 text-left transition-all relative overflow-hidden ${
                              selectedOptions[opt.id]
                                ? "bg-[#D9F99D] border-[#D9F99D] text-black shadow-[0_10px_30px_rgba(217,249,157,0.2)]"
                                : "border-white/10 text-slate-400 hover:border-[#D9F99D]/40 hover:text-white hover:bg-white/5"
                            }`}
                          >
                            <div className="relative z-10 flex items-center justify-between">
                              <button 
                                onClick={() => handleOptionToggle(categories[currentStep].id, opt.id, opt.price)}
                                className="flex-1 text-left py-1"
                              >
                                <div className="space-y-0.5">
                                  <span className="block text-sm lg:text-base font-black tracking-tight">{opt.label}</span>
                                  <span className={`text-[10px] lg:text-xs font-bold ${selectedOptions[opt.id] ? "text-black/60" : "text-slate-500"}`}>
                                    {(opt as any).isConsultation ? (
                                      "별도 협의"
                                    ) : (
                                      <>
                                        {(opt.price / 10000).toLocaleString()}만 원
                                        {(opt as any).isStartingPrice && "~"}
                                      </>
                                    )}
                                  </span>
                                </div>
                              </button>

                              <div className="flex items-center gap-3">
                                {selectedOptions[opt.id] && opt.hasQuantity && (
                                  <div className="flex items-center gap-2 bg-black/10 rounded-full p-1 px-2">
                                    <button 
                                      onClick={() => handleQuantityChange(opt.id, -1)}
                                      className="w-5 h-5 flex items-center justify-center hover:bg-black/20 rounded-full transition-colors"
                                    >
                                      <Minus className="w-3 h-3" />
                                    </button>
                                    <span className="text-xs font-black min-w-[12px] text-center">
                                      {selectedOptions[opt.id].quantity}
                                    </span>
                                    <button 
                                      onClick={() => handleQuantityChange(opt.id, 1)}
                                      className="w-5 h-5 flex items-center justify-center hover:bg-black/20 rounded-full transition-colors"
                                    >
                                      <Plus className="w-3 h-3" />
                                    </button>
                                  </div>
                                )}

                                <button 
                                  onClick={() => handleOptionToggle(categories[currentStep].id, opt.id, opt.price)}
                                >
                                  {selectedOptions[opt.id] ? (
                                    <div className="w-7 h-7 bg-black rounded-full flex items-center justify-center text-[#D9F99D] shadow-lg">
                                      <CheckCircle2 className="w-4 h-4" />
                                    </div>
                                  ) : (
                                    <div className="w-7 h-7 border-2 border-white/10 rounded-full flex items-center justify-center group-hover:border-[#D9F99D]/50 group-hover:bg-[#D9F99D]/10 transition-all">
                                      <Plus className="w-4 h-4 group-hover:text-[#D9F99D] transition-colors" />
                                    </div>
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  {/* Bottom Fade Mask */}
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#020617] via-[#020617]/80 to-transparent pointer-events-none z-20" />
                  
                  {/* Scroll Hint Indicator */}
                  <AnimatePresence>
                    {showScrollHint && categories[currentStep].id !== "Place" && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 pointer-events-none"
                      >
                        <span className="text-[10px] font-black text-[#D9F99D] uppercase tracking-widest opacity-60">More Options</span>
                        <motion.div
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ArrowRight className="w-3 h-3 text-[#D9F99D] -rotate-90 opacity-60" />
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-6 lg:pt-6">
                <button
                  disabled={currentStep === 0}
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className={`px-6 lg:px-8 py-3.5 lg:py-4 rounded-full font-black text-sm lg:text-base transition-all border-2 ${
                    currentStep === 0 
                      ? "border-white/5 text-white/5 cursor-not-allowed" 
                      : "border-white/20 text-white/60 hover:border-[#D9F99D] hover:text-[#D9F99D]"
                  }`}
                >
                  이전
                </button>
                <button
                  onClick={() => {
                    if (currentStep < categories.length - 1) {
                      setCurrentStep(prev => prev + 1);
                    } else {
                      document.getElementById('brand-summary')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={`flex-1 py-3.5 lg:py-4 rounded-full font-black text-sm lg:text-base transition-all ${
                    currentStep === categories.length - 1
                      ? "bg-[#D9F99D] text-black shadow-[0_10px_30px_rgba(217,249,157,0.3)]"
                      : "bg-white text-black hover:bg-[#D9F99D] hover:text-black hover:shadow-[0_10px_30px_rgba(217,249,157,0.3)]"
                  }`}
                >
                  {currentStep === categories.length - 1 ? "견적 확인하기" : "다음 단계로"}
                </button>
              </div>
            </div>

            {/* Right: Summary Area */}
            <div id="brand-summary" className="sticky top-10 lg:top-32 pt-10 lg:pt-0">
              <div className="bg-white/5 rounded-[40px] p-8 md:p-10 border border-white/10 shadow-2xl backdrop-blur-xl relative overflow-hidden">
                {/* Decorative Background Glow */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#6366F1]/10 blur-[100px] pointer-events-none" />
                
                <div className="flex items-center justify-between mb-10 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#6366F1]/10 rounded-xl flex items-center justify-center text-[#6366F1]">
                      <Calculator className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-black tracking-tight">Brand Build-up Architect</h3>
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedOptions({});
                      setCurrentStep(0);
                    }}
                    className="text-slate-500 hover:text-white transition-colors flex items-center gap-2 font-bold text-xs"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    초기화
                  </button>
                </div>

                <div className="space-y-4 mb-10 min-h-[180px] relative z-10">
                  <AnimatePresence mode="popLayout">
                    {Object.keys(selectedOptions).length > 0 ? (
                      Object.entries(selectedOptions).map(([id, item]: [string, any]) => {
                        // Find label and special flags from id across all categories
                        let label = id;
                        let isStartingPrice = false;
                        let isConsultation = false;

                        categories.forEach((cat: any) => {
                          const allOpts: any[] = (cat.subGroups 
                            ? (cat.subGroups as any[]).flatMap(sg => sg.options)
                            : cat.options || []) as any[];
                          const opt = allOpts.find(o => o.id === id);
                          if (opt) {
                            label = `${cat.title.split(' ')[0]} - ${opt.label.split(' ')[0]}`;
                            isStartingPrice = opt.isStartingPrice || false;
                            isConsultation = opt.isConsultation || false;
                          }
                        });
                        
                        return (
                          <motion.div
                            key={id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="flex items-center justify-between group"
                          >
                            <div className="flex flex-col">
                              <span className="text-slate-400 font-bold text-sm">{label}</span>
                              {item.quantity > 1 && (
                                <span className="text-[10px] text-slate-600 font-bold">수량: {item.quantity}개</span>
                              )}
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="font-black text-white text-sm">
                                {isConsultation ? (
                                  "별도 협의"
                                ) : (
                                  <>
                                    {((item.price * item.quantity) / 10000).toLocaleString()}만 원
                                    {isStartingPrice && "~"}
                                  </>
                                )}
                              </span>
                              <button 
                                onClick={() => {
                                  const next = { ...selectedOptions };
                                  delete next[id];
                                  setSelectedOptions(next);
                                }}
                                className="text-slate-700 hover:text-rose-500 transition-colors"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </motion.div>
                        );
                      })
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-slate-700 gap-3 py-8">
                        <Plus className="w-6 h-6 opacity-20" />
                        <p className="font-bold text-sm">선택된 항목이 없습니다.</p>
                      </div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="pt-8 border-t border-white/10 relative z-10">
                  <div className="flex items-end justify-between mb-8">
                    <span className="text-slate-400 font-bold text-sm lg:text-base">총 예상 견적</span>
                    <div className="text-right">
                      <motion.span 
                        key={totalPrice}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl lg:text-[44px] font-black text-[#D9F99D] leading-none block drop-shadow-[0_0_15px_rgba(217,249,157,0.3)]"
                      >
                        {(totalPrice / 10000).toLocaleString()}만 원
                        {Object.keys(selectedOptions).some(id => {
                          let isStarting = false;
                          categories.forEach((cat: any) => {
                            const allOpts: any[] = (cat.subGroups 
                              ? (cat.subGroups as any[]).flatMap(sg => sg.options)
                              : cat.options || []) as any[];
                            const opt = allOpts.find(o => o.id === id);
                            if (opt && opt.isStartingPrice) isStarting = true;
                          });
                          return isStarting;
                        }) && "~"}
                      </motion.span>
                      <span className="text-slate-500 text-[10px] lg:text-xs font-bold mt-1.5 block">VAT 별도</span>
                    </div>
                  </div>

                  <a 
                    href="https://open.kakao.com/me/brandone"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-5 bg-[#6366F1] text-white rounded-2xl font-black text-lg hover:shadow-[0_15px_40px_rgba(99,102,241,0.4)] transition-all flex items-center justify-center gap-2 active:scale-[0.98] text-center"
                  >
                    <span className="lg:hidden text-base leading-tight">
                      상담 신청하고<br />확정 견적 받기
                    </span>
                    <span className="hidden lg:inline">
                      상담 신청하고 확정 견적 받기
                    </span>
                    <ArrowRight className="w-5 h-5 shrink-0" />
                  </a>
                  <p className="text-center text-slate-600 text-xs font-medium mt-5">
                    * 위 견적은 선택하신 항목에 따른 예상 비용이며, <br />
                    상담을 통해 상세 범위 확정 시 변동될 수 있습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Floating Total Bar */}
        <AnimatePresence>
          {isEstimateInView && Object.keys(selectedOptions).length > 0 && (
            <motion.div 
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              className="lg:hidden fixed bottom-0 left-0 right-0 z-[60] bg-[#0f172a]/95 backdrop-blur-xl border-t border-white/10 p-4 pb-8 flex items-center justify-between"
            >
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Current Est.</span>
                <span className="text-xl font-black text-[#D9F99D]">
                  {(totalPrice / 10000).toLocaleString()}만 원
                </span>
              </div>
              <button 
                onClick={() => document.getElementById('brand-summary')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-5 py-2.5 bg-white text-black rounded-full font-black text-xs flex items-center gap-2 shadow-lg active:scale-[0.95] transition-all"
              >
                상세 견적 확인
                <ArrowRight size={14} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <QuickMenu isShifted={isEstimateInView && Object.keys(selectedOptions).length > 0} />
      <Footer className="bg-[#020617]" />

      {/* Interactive Overlay */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-end lg:items-center justify-center bg-slate-950/60 backdrop-blur-md"
          >
            {/* Background Backdrop for clicking outside (Desktop) */}
            <div className="absolute inset-0 hidden lg:block" onClick={handleClose} />
            
            <motion.div
              initial={window.innerWidth < 1024 ? { y: "100%" } : { scale: 0.9, opacity: 0, y: 20 }}
              animate={window.innerWidth < 1024 ? { y: 0 } : { scale: 1, opacity: 1, y: 0 }}
              exit={window.innerWidth < 1024 ? { y: "100%" } : { scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-white w-full lg:max-w-2xl h-[94vh] lg:h-auto lg:max-h-[90vh] rounded-t-[40px] lg:rounded-[40px] overflow-hidden shadow-2xl relative flex flex-col"
            >
              {/* Header (Responsive) */}
              <div className="shrink-0 relative">
                {/* Mobile Handle Bar */}
                <div className="lg:hidden w-12 h-1.5 bg-slate-200 rounded-full mx-auto my-4" />
                
                {/* Close Button */}
                <button 
                  onClick={handleClose}
                  className="absolute top-4 lg:top-8 right-6 lg:right-8 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all z-20"
                >
                  {window.innerWidth < 1024 ? <ChevronLeft size={20} className="mr-0.5" /> : <X size={24} />}
                </button>

                <div className="p-6 md:p-12 pb-4">
                  <div className={`inline-flex items-center px-4 py-1.5 rounded-full ${selectedItem.accentBg} text-white text-[10px] font-black uppercase tracking-[0.2em] mb-6`}>
                    {selectedItem.name}
                  </div>
                  
                  <div className="flex gap-4 lg:gap-6 items-center lg:items-start">
                    <div className="w-20 h-20 lg:w-24 lg:h-24 shrink-0 flex items-center justify-center bg-slate-50 rounded-3xl lg:bg-transparent">
                      <ServiceCardMobile item={selectedItem} size="icon" active={true} />
                    </div>
                    <div className="space-y-1 text-left">
                      <h3 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                        {selectedItem.title}
                      </h3>
                      <p className="text-lg lg:text-xl font-bold text-slate-400 tracking-tight leading-tight break-keep">
                        {selectedItem.subTitle}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mode Tabs (Mobile Optimized) */}
                <div className="px-6 lg:px-12 flex border-b border-slate-100">
                  <button 
                    onClick={() => setViewMode("guide")}
                    className={`flex-1 py-4 text-sm font-black transition-all border-b-4 ${
                      viewMode === "guide" 
                        ? `border-brand-primary text-brand-primary` 
                        : "border-transparent text-slate-300"
                    }`}
                  >
                    핵심 가이드
                  </button>
                  <button 
                    onClick={() => setViewMode("price")}
                    className={`flex-1 py-4 text-sm font-black transition-all border-b-4 ${
                      viewMode === "price" 
                        ? `border-brand-primary text-brand-primary` 
                        : "border-transparent text-slate-300"
                    }`}
                  >
                    가격 리스트
                  </button>
                </div>
              </div>

              {/* Scrollable Content Area */}
              <div 
                ref={modalContainerRef}
                className="flex-1 overflow-y-auto p-6 lg:p-12 pt-8 custom-scrollbar bg-white"
              >
                <AnimatePresence mode="wait">
                  {viewMode === "guide" ? (
                    <motion.div
                      key="guide-optimized"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="space-y-10 lg:space-y-12 pb-20"
                    >
                      {/* Quote Section */}
                      <div className="relative text-left">
                        <div className={`absolute -left-6 top-0 bottom-0 w-1 ${selectedItem.accentBg} opacity-20 rounded-full lg:hidden`} />
                        <p className="text-xl lg:text-3xl font-black text-brand-primary italic leading-snug break-keep whitespace-pre-line pl-4 lg:pl-0">
                          "{selectedItem.quote}"
                        </p>
                      </div>

                      {/* Content Cards (Optimized for Mobile) */}
                      <div className="space-y-8 text-left">
                        <div>
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-6 h-6 rounded-lg bg-rose-100 flex items-center justify-center text-rose-500">
                              <X size={14} strokeWidth={3} />
                            </div>
                            <span className="text-xs font-black uppercase tracking-widest text-rose-500 pt-0.5">Pain Point</span>
                          </div>
                          <div className="p-6 bg-rose-50/30 rounded-[32px] border border-rose-100/50">
                            <p className="text-sm lg:text-base font-bold text-slate-600 leading-relaxed break-keep whitespace-pre-line">
                              {selectedItem.painPoint}
                            </p>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-500">
                              <CheckCircle2 size={14} strokeWidth={3} />
                            </div>
                            <span className="text-xs font-black uppercase tracking-widest text-emerald-500 pt-0.5">Guide / Solution</span>
                          </div>
                          <div className="p-6 bg-emerald-50/30 rounded-[32px] border border-emerald-100/50">
                            <p className="text-sm lg:text-base font-bold text-slate-600 leading-relaxed break-keep whitespace-pre-line">
                              {selectedItem.guideText}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Strategic Note for Mobile */}
                      <div className="p-6 bg-slate-50 rounded-[32px] border border-slate-100 relative overflow-hidden group text-left">
                        <div className="relative z-10">
                          <p className="text-[10px] font-black text-brand-primary uppercase tracking-[0.2em] mb-2 opacity-60 italic">Strategic Insight</p>
                          <p className="text-sm font-black text-slate-900 leading-relaxed break-keep">
                            단순한 작업이 아닌 브랜드의 본질을 강화하는 <br className="lg:hidden" />
                            <span className="text-brand-primary underline underline-offset-4">성장 로드맵</span>을 제안합니다.
                          </p>
                        </div>
                        <div className={`absolute -right-8 -bottom-8 w-24 h-24 ${selectedItem.accentBg} opacity-5 rounded-full`} />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="price-optimized"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-4 lg:space-y-6 pb-24 text-left"
                    >
                      {/* Price Header Note */}
                      <div className="bg-brand-primary/5 p-4 rounded-2xl mb-6">
                        <p className="text-[10px] font-bold text-brand-primary leading-tight text-center break-keep">
                          ※ 모든 서비스는 1:1 디렉팅을 통해 브랜드에 최적화되어 제공됩니다.
                        </p>
                      </div>

                      {selectedItem.prices.map((p, idx) => {
                        const isExpanded = expandedPriceIdx === idx;
                        return (
                          <div 
                            key={idx} 
                            className={`flex flex-col p-6 lg:p-8 border-2 transition-all duration-300 rounded-[32px] cursor-pointer ${
                              isExpanded 
                                ? `border-brand-primary bg-slate-50/50 shadow-lg` 
                                : "border-slate-50 hover:border-brand-primary/20 bg-white"
                            }`}
                            onClick={() => setExpandedPriceIdx(isExpanded ? null : idx)}
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <h4 className={`text-base lg:text-lg font-black leading-tight ${isExpanded ? 'text-brand-primary' : 'text-slate-900'}`}>{p.label}</h4>
                                {!isExpanded && (
                                  <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">Click for details</p>
                                )}
                              </div>
                              <div className="flex items-center gap-3">
                                <span className={`text-lg lg:text-2xl font-black ${selectedItem.color}`}>{p.price}</span>
                                <motion.div
                                  animate={{ rotate: isExpanded ? 180 : 0 }}
                                  className={isExpanded ? 'text-brand-primary' : 'text-slate-300'}
                                >
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M6 9l6 6 6-6" />
                                  </svg>
                                </motion.div>
                              </div>
                            </div>
                            
                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                  animate={{ height: "auto", opacity: 1, marginTop: 24 }}
                                  exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                  className="overflow-hidden"
                                >
                                  <div className="space-y-3 pt-6 border-t border-slate-200/60">
                                    {p.desc.split('\n').map((line, i) => (
                                      <div key={i} className="flex gap-2.5 text-xs lg:text-sm font-bold text-slate-500 leading-relaxed">
                                        <div className={`w-1.5 h-1.5 rounded-full ${selectedItem.accentBg} mt-1.5 shrink-0 opacity-60`} />
                                        <span className="break-keep">{line}</span>
                                      </div>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                      
                      {/* Supplemental Notes */}
                      <div className="p-6 bg-slate-50 rounded-[32px] mt-8 border border-slate-100">
                        <div className="space-y-2">
                          {(selectedItem as any).notes?.map((note: string, i: number) => (
                            <p key={i} className="text-xs text-slate-500 font-bold leading-relaxed flex gap-2">
                              <span className="shrink-0 opacity-40">※</span>
                              <span className="break-keep">{note}</span>
                            </p>
                          ))}
                          <div className="pt-4 border-t border-slate-200 mt-2">
                            <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
                              * 견적은 프로젝트 규모와 난이도에 따라 변동될 수 있습니다. <br />
                              * 상세 견적은 상담을 통해 확정됩니다.
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Sticky Footer (Optimized for Mobile) */}
              <div className="p-6 lg:p-12 pt-6 shrink-0 border-t border-slate-100 bg-white/80 backdrop-blur-md flex gap-3 items-center">
                <button 
                  onClick={() => {
                    handleClose();
                    scrollToCalculator();
                  }}
                  className="flex-1 py-4 lg:py-5 bg-[#D9F99D] text-slate-900 rounded-[20px] font-black text-sm lg:text-lg hover:shadow-lg hover:shadow-[#D9F99D]/30 transition-all text-center"
                >
                  가상 견적
                </button>
                <a 
                  href="https://open.kakao.com/me/brandone"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-[1.5] py-4 lg:py-5 bg-brand-primary text-white rounded-[20px] font-black text-sm lg:text-lg shadow-lg shadow-brand-primary/20 hover:shadow-xl transition-all flex items-center justify-center gap-2 text-center"
                >
                  상담 신청
                  <ArrowRight size={18} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
