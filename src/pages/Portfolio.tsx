import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  Monitor, Smartphone, Zap, Search, Globe, ArrowUpRight, Play, CheckCircle2, 
  Star, Layout, FileText, MapPin, Video, PenTool, Loader2, ArrowRight,
  ArrowDown, User, AlertCircle, X, ChevronLeft, ChevronRight, MessageCircle
} from "lucide-react";
import Footer from "../components/Footer";
import QuickMenu from "../components/QuickMenu";

const items = [
  { 
    id: "strategy",
    name: "Strategy", 
    type: "star", 
    color: "text-amber-400", 
    accentBg: "bg-amber-400",
    title: "전략",
    icon: Star,
    subTitle: "성장의 방향을 정하는 정밀한 설계",
    quote: "열심히 달리고 있지만 제자리걸음처럼 느껴진다면,\n지도를 다시 그려야 할 때입니다.",
    painPoint: "많은 비용과 시간을 쏟아부어도 눈에 띄는 성과가 없어 고민하고 계신가요?\n방향이 어긋난 실행은 에너지를 소진시킬 뿐입니다.",
    guideText: "BRAND ONE은 실행의 효율을 극대화하기 위해 브랜드의 뿌리를 단단히 내리는 전략적 설계도를 제안합니다.\n정교한 설계는 마케팅의 모든 과정을 단순한 '지출'이 아닌 '미래를 위한 자산'으로 바꿔줍니다."
  },
  { 
    id: "place",
    name: "Place", 
    type: "orbit", 
    color: "text-blue-600", 
    accentBg: "bg-blue-600",
    title: "플레이스",
    icon: MapPin,
    subTitle: "비즈니스의 모든 매력이 모이는 요충지",
    quote: "고객의 고민이 확신으로 바뀌는 결정적 순간,\n그 흐름을 놓치지 않아야 합니다.",
    painPoint: "온라인의 여러 접점을 거쳐 우리를 검색한 고객이, 정작 마지막 단계인 플레이스에서\n매력을 느끼지 못해 발길을 돌리고 있지는 않나요?",
    guideText: "플레이스는 비즈니스의 모든 매력을 응축해 보여주는 전략적 요충지입니다.\n정보와 비주얼, 로직을 정교하게 정렬하여 고객의 방문 결정이 자연스럽게 이어지도록 최적의 동선을 설계합니다."
  },
  { 
    id: "website",
    name: "Website", 
    type: "browser", 
    color: "text-emerald-500", 
    accentBg: "bg-emerald-500",
    title: "홈페이지",
    icon: Layout,
    subTitle: "기술과 미학이 공존하는 디지털 본진",
    quote: "아무리 멋진 공간이라도, 고객이 우리를 발견할 수 없다면\n그 가치는 온전히 전해지기 어렵습니다.",
    painPoint: "화려한 비주얼에만 집중한 나머지, 정작 검색 엔진이나 AI 답변에서\n우리 브랜드가 소외되고 있지는 않나요?",
    guideText: "BRAND ONE은 시각적인 아름다움은 물론, 고객과의 연결고리인 기술적 최적화(SEO/AEO)를 기본으로 설계합니다.\n누구나 쉽게 찾아오고, 오래 머물고 싶은 '발견되는 본진'을 만들어 드립니다."
  },
  { 
    id: "blog",
    name: "Blog", 
    type: "text", 
    color: "text-rose-500", 
    accentBg: "bg-rose-500",
    title: "블로그",
    icon: FileText,
    subTitle: "마음을 움직이는 진정성 있는 기록",
    quote: "수많은 정보 속에서 고객은 단순한 노출보다\n'나를 이해해주는 목소리'를 기다립니다.",
    painPoint: "매일 올라오는 기계적인 글들이 브랜드의 이미지를 오히려 평범하게 만들고 있지는 않나요?\n숫자에만 집중한 조회수는 진정한 팬을 만들지 못합니다.",
    guideText: "BRAND ONE은 클라이언트 고유의 페르소나를 투영하여, 읽히고 공감받는 브랜드 자산을 쌓아갑니다.\n시간이 흐를수록 더 깊은 신뢰를 만들어내는 진정성 있는 콘텐츠의 힘으로 고객의 마음속에 자리 잡으세요."
  },
  { 
    id: "video",
    name: "Video", 
    type: "play", 
    color: "text-slate-900", 
    accentBg: "bg-slate-900",
    title: "영상",
    icon: Video,
    subTitle: "찰나의 순간에 전해지는 브랜드의 실체",
    quote: "글과 사진만으로는 전하기 힘든 브랜드의 온기,\n이제 생생한 경험으로 전달하세요.",
    painPoint: "브랜드의 가치와 철학을 텍스트로만 설명하기엔 한계가 느껴질 때가 있습니다.\n정적인 정보만으로는 고객의 감성을 자극하기에 부족할 수 있습니다.",
    guideText: "기획부터 사운드 디자인까지 BRAND ONE의 감각이 담긴 영상은 백 마디 말보다 강력한 확신을 고객에게 심어줍니다.\n브랜드의 실체를 가장 입체적으로 전달하여, 고객의 기억에 오래도록 남는 임팩트를 선사하세요."
  },
  { 
    id: "offline",
    name: "Offline", 
    type: "stamp", 
    color: "text-brand-primary", 
    accentBg: "bg-brand-primary",
    title: "오프라인",
    icon: PenTool,
    subTitle: "손끝으로 완성되는 일관된 경험",
    quote: "온라인에서 시작된 긍정적인 기대가 오프라인의 실물로 증명될 때\n브랜드는 완성됩니다.",
    painPoint: "디지털에서의 세련된 이미지가 오프라인의 작은 제작물 하나로 인해 퇴색되고 있지는 않나요?\n작은 불일치가 브랜드의 전체적인 신뢰도를 떨어뜨릴 수 있습니다.",
    guideText: "BRAND ONE은 고객이 접하는 모든 물리적 매체에 일관된 브랜드 보이스를 입힙니다.\n온라인의 약속이 오프라인의 실물로 이어지는 매끄러운 경험을 통해, 고객의 신뢰를 마지막 순간까지 견고하게 지켜 드립니다."
  },
];

const ServiceCard = ({ item, size = "normal", onClick, active = false }: { item: typeof items[0], size?: "normal" | "mini" | "icon", onClick?: () => void, active?: boolean }) => {
  const baseScale = size === "mini" ? 0.45 : size === "icon" ? 0.25 : 1;
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
      initial={{ filter: active ? "grayscale(0%)" : "grayscale(100%)", opacity: active ? 1 : 0.8, scale: baseScale }}
      animate={{ filter: active ? "grayscale(0%)" : "grayscale(100%)", opacity: active ? 1 : 0.8, scale: baseScale }}
      whileHover={{ filter: "grayscale(0%)", opacity: 1, scale: baseScale * 1.1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="cursor-pointer origin-center"
      onClick={onClick}
    >
      {renderContent()}
    </motion.div>
  );
};

export default function Portfolio() {
  const [selectedTouchpoint, setSelectedTouchpoint] = useState<typeof items[0] | null>(null);
  const [selectedOfflineItem, setSelectedOfflineItem] = useState<typeof offlineCases[0] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const referenceRef = useRef<HTMLDivElement>(null);

  const placeCases = [
    {
      id: "place-audit-01",
      title: "들마루정육점일산점",
      url: "https://naver.me/GyYnF1L3",
      image: "assets/image/place_1.png?v=2",
      hotspots: [],
      scores: [
        { label: "비즈니스 영역 집중도", score: 0, status: "low" },
        { label: "서비스 스토리텔링", score: 0, status: "low" },
        { label: "비주얼 큐레이션", score: 0, status: "low" },
        { label: "고객 신뢰 지수", score: 72, status: "mid" }
      ],
      solutions: [
        { id: 1, title: "비주얼 큐레이션 (썸네일)", desc: "단순 로드뷰 사진으로 인해 브랜드 첫인상이 저하된 상태입니다.\n고감도 사진으로 교체하여 온라인 유입 동기를 강화해야 합니다." },
        { id: 2, title: "메뉴 정보성 (메뉴판)", desc: "현재 취급 상품에 대한 정보가 부족하여 구매 결정이 어렵습니다.\n원육의 특징과 메뉴 구성을 직관적으로 재정비해야 합니다." },
        { id: 3, title: "브랜드 신뢰도 (소개문구)", desc: "스토리텔링 부재로 고객의 신뢰를 얻기 힘든 구조입니다.\n매장만의 전문성과 진정성을 담은 소개글 작성이 시급합니다." },
        { id: 4, title: "로컬 리뷰 자산 (리뷰)", desc: "동네 주민 중심의 긍정적인 평가가 많으나 온라인 활용도가 낮습니다.\n양질의 리뷰를 상단에 배치해 신뢰 지수를 높여야 합니다." },
        { id: 5, title: "온라인 디지털 전환 (총평)", desc: "오프라인의 친숙한 매력이 온라인에 전혀 반영되지 않고 있습니다.\n매장의 온기가 느껴지는 비주얼과 문구로 톤앤매너 개선이 필요합니다." }
      ]
    },
    {
      id: "place-audit-02",
      title: "경희아소한의원",
      url: "https://naver.me/xiq9XiNo",
      image: "assets/image/place_2.png?v=2",
      hotspots: [],
      scores: [
        { label: "비즈니스 영역 집중도", score: 30, status: "low" },
        { label: "서비스 스토리텔링", score: 10, status: "low" },
        { label: "비주얼 큐레이션", score: 50, status: "mid" },
        { label: "고객 신뢰 지수", score: 60, status: "mid" }
      ],
      solutions: [
        { id: 1, title: "비주얼 큐레이션 (썸네일)", desc: "통일감은 있으나 공급자 중심의 단순 나열식 구성으로 매력이 낮습니다.\n고객의 시선을 끄는 소비자 중심의 비주얼 큐레이션으로 전환이 필요합니다." },
        { id: 2, title: "클리닉 정보성 (진료과목)", desc: "단순 나열된 진료 과목은 환자에게 명확한 해결책을 제시하지 못합니다.\n환자가 얻을 수 있는 실질적인 치료 효능 중심으로 정보를 재구성해야 합니다." },
        { id: 3, title: "브랜드 신뢰도 (소개문구)", desc: "과거 자료가 방치되어 현재 주력 진료와의 괴리가 큽니다.\n전문성을 강조하기 위해 현재 집중하고 있는 핵심 클리닉 위주의 최신화가 시급합니다." },
        { id: 4, title: "로컬 리뷰 자산 (리뷰)", desc: "최근 수개월간 신규 리뷰가 부재하여 신뢰도가 정체된 상태입니다.\n원내 프로세스를 점검하여 지속적으로 생생한 후기가 쌓이는 환경을 구축해야 합니다." },
        { id: 5, title: "브랜드 전략 재설정 (총평)", desc: "현재 비즈니스 영역에 맞춘 스토리텔링을 기반으로 비주얼을 재정비해야 합니다.\n브랜드의 내실을 다진 후, 꾸준한 리뷰 확보를 통한 선순환 구조를 만들어야 합니다." }
      ]
    },
    {
      id: "place-audit-03",
      title: "전주W한의원",
      url: "https://naver.me/xOx1uuQA",
      image: "assets/image/place_3.png?v=2",
      hotspots: [],
      scores: [
        { label: "비즈니스 영역 집중도", score: 90, status: "high" },
        { label: "서비스 스토리텔링", score: 80, status: "high" },
        { label: "비주얼 큐레이션", score: 95, status: "high" },
        { label: "고객 신뢰 지수", score: 60, status: "mid" }
      ],
      solutions: [
        { id: 1, title: "비주얼 큐레이션 (썸네일)", desc: "통일감 있는 디자인과 시각적 몰입도가 높은 연출로 최적화되어 있습니다.\n고객의 시선을 빠르게 사로잡는 효과적인 비주얼 전략이 돋보입니다." },
        { id: 2, title: "클리닉 정보성 (진료과목)", desc: "3대 핵심 클리닉에 집중하여 진료 전문성을 명확히 전달하고 있습니다.\n현재 주력하고 있는 진료 영역을 환자에게 직관적으로 각인시킵니다." },
        { id: 3, title: "브랜드 신뢰도 (소개문구)", desc: "주력 진료의 특장점을 정확히 기술하고 있습니다.\n자연스러운 행동 유도(CTA)로 연결됩니다." },
        { id: 4, title: "로컬 리뷰 자산 (리뷰)", desc: "우수한 기초 설계에 비해 최근 신규 리뷰가 부족합니다.\n이럴 경우 신뢰도가 정체될 우려가 있습니다." },
        { id: 5, title: "브랜드 가치 증명 (총평)", desc: "탄탄한 브랜딩 기반 위에 실제 임상 사례와 후기 등 증명 가능한 콘텐츠를 꾸준히 축적한다면, 지역 내 독보적인 점유율 확보가 가능할 것으로 보입니다." }
      ]
    }
  ];

  const websiteCases = [
    {
      id: "web-01",
      title: "BRAND ONE",
      desc: "BRAND ONE의 초기 홈페이지",
      tags: ["STANDARD형", "SEO/AEO 최적화", "반응형 UI"],
      price: "150만원",
      score: 98,
      url: "https://brandone-official.github.io/BRAND-ONE/",
      image: "assets/image/website_1.png?v=2"
    },
    {
      id: "web-02",
      title: "전주더블유(W)한의원",
      desc: "전주더블유(W)한의원의 통합 홈페이지",
      tags: ["STANDARD형 + 데이터 업데이트", "SEO/AEO 최적화", "반응형 UI"],
      price: "200만원",
      score: 96,
      url: "https://resetclinic.kr",
      image: "assets/image/website_2.png?v=2"
    }
  ];

  const blogCases = [
    {
      id: "blog-01",
      platform: "Naver Blog",
      title: "전주더블유(W)한의원",
      desc: "진정성과 실용적인 스토리텔링으로 마음을 움직이는 콘텐츠",
      tags: ["페르소나 설정", "SEO/AEO 최적화", "고관여 타겟팅"],
      url: "https://blog.naver.com/w-hani/224236745252",
      image: "assets/image/blog_1.png?v=2"
    },
    {
      id: "blog-02",
      platform: "Tistory",
      title: "경희아소한의원",
      desc: "실제 치료 사례와 전문 지식을 쉽게 풀어내는 전략",
      tags: ["페르소나 설정", "SEO/AEO 최적화", "저관여 작업"],
      url: "http://asohani.tistory.com/1",
      image: "assets/image/blog_2.png?v=2"
    },
    {
      id: "blog-03",
      platform: "Naver Cafe",
      title: "청뇌보위 연구회",
      desc: "커뮤니티 특성에 맞춘 소통형 콘텐츠와 신뢰 구축",
      tags: ["커뮤니티 마케팅", "소통", "잠재적 고객 확보"],
      url: "https://cafe.naver.com/forhani/294",
      image: "assets/image/blog_3.png?v=2"
    }
  ];

  const videoCases = [
    {
      id: "video-01",
      type: "long",
      title: "10년 째 낫지 않는 만성 통증, 원인이 음식에 있을 수 있습니다.",
      desc: "브랜드의 핵심 가치와 철학을 담은 고감도 브랜드 필름",
      url: "https://youtu.be/fDdywvP6zqU",
      thumbnail: "assets/image/video_1.png?v=2",
      insight: "영상은 이제 정보 가치를 결정하는 가장 강력한 도구입니다.\n메시지가 흐려지지 않도록 본질을 뚫는 전략 기획이 선행되어야 합니다.\n화려함보다 탄탄한 기획으로 브랜드의 가치를 증명하십시오."
    },
    {
      id: "video-02",
      type: "long",
      title: "[리셋바디] 김OO님 인터뷰",
      desc: "실제 고객의 생생한 목소리를 담은 인터뷰 콘텐츠",
      url: "https://youtu.be/pBJWjlAWr2I?si=bTGEQ3h6TpY4qskr",
      thumbnail: "assets/image/video_4.png?v=2",
      insight: "정보는 영상으로 흐르고 대중은 진정성에 반응합니다.\n우리만의 목소리를 내려면 복잡함을 덜고 본질에 집중해야 합니다.\n일관성 있는 이야기의 힘이 브랜드의 차별점을 만듭니다."
    },
    {
      id: "video-03",
      type: "short",
      title: "약 끊을 수 없나요?",
      desc: "인스타그램 릴스 최적화 포맷의 고효율 광고 콘텐츠",
      url: "https://youtube.com/shorts/U7XgEtrHnsM?feature=share",
      thumbnail: "assets/image/video_2.png?v=2",
      insight: "정보는 영상으로 흐르고 대중은 진정성에 반응합니다.\n우리만의 목소리를 내려면 복잡함을 덜고 본질에 집중해야 합니다.\n일관성 있는 이야기의 힘이 브랜드의 차별점을 만듭니다."
    },
    {
      id: "video-04",
      type: "short",
      title: "삼치 토마토 콩피",
      desc: "제품의 특장점을 감각적인 영상미로 풀어낸 스토리텔링 콘텐츠",
      url: "https://www.instagram.com/reel/DSbuqZZALOv/?igsh=MW1sdjI3MWgya2hvcw==",
      thumbnail: "assets/image/video_3.png?v=2",
      insight: "정보는 영상으로 흐르고 대중은 진정성에 반응합니다.\n우리만의 목소리를 내려면 복잡함을 덜고 본질에 집중해야 합니다.\n일관성 있는 이야기의 힘이 브랜드의 차별점을 만듭니다."
    }
  ];

  const offlineCases = [
    {
      id: "off-01",
      category: "Namecard",
      title: "Namecard",
      ratio: "aspect-[9/5]",
      count: 6,
      desc: "첫인상을 완성하는 감도 높은 고품격 명함 디자인",
      images: [
        "assets/image/name_1.png?v=3",
        "assets/image/name_2.png?v=3",
        "assets/image/name_3.png?v=3",
        "assets/image/name_4.png?v=3",
        "assets/image/name_5.png?v=3",
        "assets/image/name_6.png?v=3"
      ],
      insight: "단순한 정보를 넘어 브랜드의 격을 전달합니다.\n정교한 타이포그래피와 여백의 조화로 비즈니스 신뢰를 구축합니다."
    },
    {
      id: "off-02",
      category: "Poster",
      title: "Poster",
      ratio: "aspect-[1/1.414]",
      count: 3,
      desc: "브랜드의 무드를 완성하는 몰입형 디자인",
      images: [
        "assets/image/poster_1.png?v=2",
        "assets/image/poster_2.png?v=2",
        "assets/image/poster_3.png?v=2"
      ],
      insight: "강력한 문구와 비주얼의 결합으로 찰나의 시선을 장악합니다.\n멀리서도 브랜드가 돋보이도록 압도적인 레이아웃을 설계합니다."
    },
    {
      id: "off-03",
      category: "X-Banner",
      title: "X-Banner",
      ratio: "aspect-[600/1800]",
      count: 2,
      desc: "핵심 정보를 직관적으로 전달하는 최적화 배너 디자인",
      images: [
        "assets/image/xbanner_1.png?v=2",
        "assets/image/xbanner_2.png?v=2"
      ],
      insight: "정보의 우선순위 설정이 핵심입니다.\n가장 중요한 메시지를 상단에 배치하여 고객의 행동을 자연스럽게 유도합니다."
    },
    {
      id: "off-04",
      category: "Leaflet",
      title: "Leaflet",
      ratio: "aspect-[1.414/1]",
      count: 4,
      desc: "브랜드의 이야기를 정교하게 담아낸 리플렛",
      images: [
        "assets/image/leaflet_1.png?v=3",
        "assets/image/leaflet_2.png?v=3",
        "assets/image/leaflet_3.png?v=3",
        "assets/image/leaflet_4.png?v=3"
      ],
      insight: "페이지를 넘길 때마다 경험이 확장되는 매체입니다.\n논리적인 흐름을 설계하여 브랜드의 이야기를 끝까지 완독하게 만듭니다."
    }
  ];

  const handleSelectTouchpoint = (item: typeof items[0]) => {
    setSelectedTouchpoint(item);
    setIsLoading(true);
    
    // Scroll to reference area
    setTimeout(() => {
      referenceRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);

    // Simulate async loading
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  const handleOpenOfflineModal = (item: typeof offlineCases[0]) => {
    setSelectedOfflineItem(item);
    setCurrentImageIndex(0);
    setIsFlipped(false);
  };

  const nextImage = () => {
    if (!selectedOfflineItem) return;
    const isSet = ["Business Card", "Leaflet"].includes(selectedOfflineItem.category);
    if (isSet) {
      const pairsCount = Math.ceil(selectedOfflineItem.images.length / 2);
      setCurrentImageIndex((prev) => (prev + 1) % pairsCount);
      setIsFlipped(false);
    } else {
      setCurrentImageIndex((prev) => (prev + 1) % selectedOfflineItem.images.length);
    }
  };

  const prevImage = () => {
    if (!selectedOfflineItem) return;
    const isSet = ["Business Card", "Leaflet"].includes(selectedOfflineItem.category);
    if (isSet) {
      const pairsCount = Math.ceil(selectedOfflineItem.images.length / 2);
      setCurrentImageIndex((prev) => (prev - 1 + pairsCount) % pairsCount);
      setIsFlipped(false);
    } else {
      setCurrentImageIndex((prev) => (prev - 1 + selectedOfflineItem.images.length) % selectedOfflineItem.images.length);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Map Area (Hexagon) */}
      <section className="pt-40 pb-24 bg-slate-50 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-12"
          >
            <span className="text-sm font-bold tracking-widest text-brand-primary">01</span>
            <div className="w-12 h-[1px] bg-brand-primary/30" />
            <span className="text-sm font-bold tracking-widest text-slate-400 uppercase">WE CAN DO IT</span>
          </motion.div>

          <div className="text-center mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[48px] md:text-[64px] font-black leading-[1.2] tracking-tight text-brand-secondary mb-6"
            >
              브랜드의 <span className="text-brand-primary">핵심 접점</span>을 <br />
              한눈에 확인해보세요.
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center gap-3"
            >
              <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto break-keep">
                각 접점을 클릭하면 해당 영역의 <span className="text-brand-primary font-bold underline underline-offset-4 decoration-2">상세 가이드</span>와 <br className="hidden md:block" />
                <span className="text-brand-primary font-bold underline underline-offset-4 decoration-2">레퍼런스</span>를 확인하실 수 있습니다.
              </p>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="flex justify-center text-brand-primary"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 13l5 5 5-5" />
                </svg>
              </motion.div>
            </motion.div>
          </div>

          {/* Hexagon Visual */}
          <div className="relative w-full max-w-[1000px] h-[650px] mx-auto scale-[0.8] md:scale-100">
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
              { x: 500, y: 100, item: items[0] }, // Top: Strategy
              { x: 760, y: 250, item: items[1] }, // Top Right: Place
              { x: 760, y: 450, item: items[2] }, // Bottom Right: Website
              { x: 500, y: 600, item: items[3] }, // Bottom: Blog
              { x: 240, y: 450, item: items[4] }, // Bottom Left: Video
              { x: 240, y: 250, item: items[5] }, // Top Left: Offline
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
                    onClick={() => handleSelectTouchpoint(pt.item)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Touchpoint Reference Area */}
      <section ref={referenceRef} className="py-32 bg-white min-h-[800px] scroll-mt-20">
        <div className="max-w-[1400px] mx-auto px-6">
          <AnimatePresence mode="wait">
            {!selectedTouchpoint ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-40 border-2 border-dashed border-slate-100 rounded-[40px]"
              >
                <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 mb-6">
                  <ArrowUpRight size={40} />
                </div>
                <h3 className="text-2xl font-black text-slate-400">접점을 선택하여 상세 내용을 확인하세요.</h3>
              </motion.div>
            ) : (
              <motion.div 
                key={selectedTouchpoint.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-20"
              >
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className="w-24 h-24 flex items-center justify-center">
                      <ServiceCard 
                        item={selectedTouchpoint} 
                        size="icon" 
                        active={true}
                      />
                    </div>
                    <h2 className="text-[40px] md:text-[56px] font-black text-slate-900 tracking-tighter leading-tight">
                      {selectedTouchpoint.title} <span className="text-slate-300">Reference</span>
                    </h2>
                  </div>
                </div>

                {isLoading ? (
                  <div className="space-y-12">
                    <div className="h-[500px] bg-slate-50 animate-pulse rounded-[40px]" />
                    <div className="h-[400px] bg-slate-50 animate-pulse rounded-[40px]" />
                  </div>
                ) : (
                  <div className="space-y-24">
                    {/* 2-1. Guide Area (Top) */}
                    <div className="bg-white rounded-[40px] p-8 md:p-16 border border-slate-100 shadow-sm relative overflow-hidden">
                      <div className="max-w-4xl relative z-10">
                        {/* Tag */}
                        <div className={`inline-block px-6 py-2 rounded-full ${selectedTouchpoint.accentBg} text-white text-sm font-black uppercase tracking-widest mb-8`}>
                          {selectedTouchpoint.name}
                        </div>

                        {/* Title & Subtitle */}
                        <div className="flex items-start gap-6 mb-12">
                          <div className={`w-1.5 h-20 ${selectedTouchpoint.accentBg} rounded-full`} />
                          <div>
                            <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">
                              {selectedTouchpoint.title}
                            </h3>
                            <p className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                              {selectedTouchpoint.subTitle}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-12">
                          {/* Quote */}
                          <div className="relative">
                            <p className="text-2xl md:text-3xl font-black text-indigo-600 italic leading-snug break-keep whitespace-pre-line">
                              "{selectedTouchpoint.quote}"
                            </p>
                          </div>

                          {/* Pain Point */}
                          <div>
                            <h4 className="text-sm font-black text-rose-500 uppercase tracking-widest mb-4">PAIN POINT</h4>
                            <p className="text-lg md:text-xl font-bold text-slate-600 leading-relaxed break-keep whitespace-pre-line">
                              {selectedTouchpoint.painPoint}
                            </p>
                          </div>

                          {/* Guide / Solution */}
                          <div>
                            <h4 className="text-sm font-black text-emerald-500 uppercase tracking-widest mb-4">GUIDE / SOLUTION</h4>
                            <p className="text-lg md:text-xl font-bold text-slate-600 leading-relaxed break-keep whitespace-pre-line">
                              {selectedTouchpoint.guideText}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Decorative Background Icon */}
                      <div className="absolute -right-20 -bottom-20 opacity-[0.05] pointer-events-none scale-[1.5]">
                        <ServiceCard item={selectedTouchpoint} size="normal" active={false} />
                      </div>
                    </div>

                    {/* 2-2. Reference Showcase Area (Bottom) */}
                    <div className="space-y-12">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl ${selectedTouchpoint.accentBg} text-white flex items-center justify-center shadow-lg`}>
                          <Monitor size={24} />
                        </div>
                        <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Showcase</h3>
                      </div>

                      {selectedTouchpoint.id === 'offline' ? (
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                          {/* Column 1: Poster (Tall) */}
                          <div className="md:col-span-4 flex flex-col gap-8">
                            <motion.div 
                              whileHover={{ y: -10 }}
                              onClick={() => handleOpenOfflineModal(offlineCases[1])}
                              className="group relative bg-white rounded-[40px] overflow-hidden shadow-2xl border border-slate-100 cursor-pointer"
                            >
                              <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                                <span className={`px-4 py-1.5 rounded-full bg-slate-50 text-[10px] font-black ${selectedTouchpoint.color} uppercase tracking-widest`}>
                                  {offlineCases[1].category}
                                </span>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total {offlineCases[1].images.length} Items</span>
                              </div>
                              <div className="p-6 grid grid-cols-2 gap-4">
                                {offlineCases[1].images.map((img, iIdx) => (
                                  <div key={iIdx} className={`${offlineCases[1].ratio} relative overflow-hidden rounded-2xl shadow-sm border border-slate-50 ${iIdx === 0 ? 'col-span-2' : ''}`}>
                                    <img 
                                      src={img} 
                                      alt={`${offlineCases[1].title} ${iIdx + 1}`}
                                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                      referrerPolicy="no-referrer"
                                    />
                                  </div>
                                ))}
                              </div>
                              <div className="p-8 pt-0">
                                <h4 className="text-xl font-black text-slate-900 mb-2">{offlineCases[1].title}</h4>
                                <p className="text-sm font-bold text-slate-500 leading-relaxed">{offlineCases[1].desc}</p>
                              </div>
                            </motion.div>
                          </div>

                          {/* Column 2: X-Banner (Very Tall) */}
                          <div className="md:col-span-4">
                            <motion.div 
                              whileHover={{ y: -10 }}
                              onClick={() => handleOpenOfflineModal(offlineCases[2])}
                              className="group relative bg-white rounded-[40px] overflow-hidden shadow-2xl border border-slate-100 cursor-pointer"
                            >
                              <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                                <span className={`px-4 py-1.5 rounded-full bg-slate-50 text-[10px] font-black ${selectedTouchpoint.color} uppercase tracking-widest`}>
                                  {offlineCases[2].category}
                                </span>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total {offlineCases[2].images.length} Items</span>
                              </div>
                              <div className="p-6 grid grid-cols-2 gap-4">
                                {offlineCases[2].images.map((img, iIdx) => (
                                  <div key={iIdx} className={`${offlineCases[2].ratio} relative overflow-hidden rounded-2xl shadow-sm border border-slate-50`}>
                                    <img 
                                      src={img} 
                                      alt={`${offlineCases[2].title} ${iIdx + 1}`}
                                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                      referrerPolicy="no-referrer"
                                    />
                                  </div>
                                ))}
                              </div>
                              <div className="p-8 pt-0">
                                <h4 className="text-xl font-black text-slate-900 mb-2">{offlineCases[2].title}</h4>
                                <p className="text-sm font-bold text-slate-500 leading-relaxed">{offlineCases[2].desc}</p>
                              </div>
                            </motion.div>
                          </div>

                          {/* Column 3: Business Card & Leaflet */}
                          <div className="md:col-span-4 flex flex-col gap-8">
                            {/* Business Card */}
                            <motion.div 
                              whileHover={{ y: -10 }}
                              onClick={() => handleOpenOfflineModal(offlineCases[0])}
                              className="group relative bg-white rounded-[40px] overflow-hidden shadow-2xl border border-slate-100 cursor-pointer"
                            >
                              <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                                <span className={`px-4 py-1.5 rounded-full bg-slate-50 text-[10px] font-black ${selectedTouchpoint.color} uppercase tracking-widest`}>
                                  {offlineCases[0].category}
                                </span>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total {Math.ceil(offlineCases[0].images.length / 2)} Sets</span>
                              </div>
                              <div className="p-6 grid grid-cols-2 gap-4 min-h-[150px] items-center justify-center">
                                {offlineCases[0].images.length > 0 ? (
                                  offlineCases[0].images.map((img, iIdx) => (
                                    <div key={iIdx} className={`${offlineCases[0].ratio} relative overflow-hidden rounded-2xl shadow-sm border border-slate-50`}>
                                      <img 
                                        src={img} 
                                        alt={`${offlineCases[0].title} ${iIdx + 1}`}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                        referrerPolicy="no-referrer"
                                      />
                                    </div>
                                  ))
                                ) : (
                                  <div className="col-span-2 flex flex-col items-center justify-center py-12 text-slate-300">
                                    <Search size={40} className="mb-4 opacity-20" />
                                    <span className="text-xs font-bold tracking-widest uppercase">Images Coming Soon</span>
                                  </div>
                                )}
                              </div>
                              <div className="p-8 pt-0">
                                <h4 className="text-xl font-black text-slate-900 mb-2">{offlineCases[0].title}</h4>
                                <p className="text-sm font-bold text-slate-500 leading-relaxed">{offlineCases[0].desc}</p>
                              </div>
                            </motion.div>

                            {/* Leaflet */}
                            <motion.div 
                              whileHover={{ y: -10 }}
                              onClick={() => handleOpenOfflineModal(offlineCases[3])}
                              className="group relative bg-white rounded-[40px] overflow-hidden shadow-2xl border border-slate-100 cursor-pointer"
                            >
                              <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                                <span className={`px-4 py-1.5 rounded-full bg-slate-50 text-[10px] font-black ${selectedTouchpoint.color} uppercase tracking-widest`}>
                                  {offlineCases[3].category}
                                </span>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total {Math.ceil(offlineCases[3].images.length / 2)} Sets</span>
                              </div>
                              <div className="p-8 pb-12 min-h-[200px] flex items-center justify-center">
                                {offlineCases[3].images.length > 0 ? (
                                  <div className="relative h-48 md:h-56 w-full">
                                    {offlineCases[3].images.slice(0, 3).map((img, idx) => (
                                      <motion.div
                                        key={idx}
                                        style={{ 
                                          zIndex: 3 - idx,
                                          top: idx * 12,
                                          left: idx * 12,
                                          width: 'calc(100% - 24px)'
                                        }}
                                        className={`absolute h-full rounded-2xl overflow-hidden shadow-lg border border-slate-100 bg-white transition-transform duration-500 group-hover:translate-y-[-8px]`}
                                      >
                                        <img 
                                          src={img} 
                                          alt={`${offlineCases[3].title} ${idx + 1}`}
                                          className="w-full h-full object-cover"
                                          referrerPolicy="no-referrer"
                                        />
                                      </motion.div>
                                    ))}
                                  </div>
                                ) : (
                                  <div className="flex flex-col items-center justify-center text-slate-300">
                                    <Search size={40} className="mb-4 opacity-20" />
                                    <span className="text-xs font-bold tracking-widest uppercase">Images Coming Soon</span>
                                  </div>
                                )}
                              </div>
                              <div className="p-8 pt-0">
                                <h4 className="text-xl font-black text-slate-900 mb-2">{offlineCases[3].title}</h4>
                                <p className="text-sm font-bold text-slate-500 leading-relaxed">{offlineCases[3].desc}</p>
                              </div>
                            </motion.div>
                          </div>
                        </div>
                      ) : selectedTouchpoint.id === 'video' ? (
                        <div className="space-y-12">
                          {/* Row 1: Long 1 + Short 1 */}
                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                            <div className="lg:col-span-8 flex flex-col gap-8">
                              <motion.div 
                                whileHover={{ scale: 0.98 }}
                                className="group relative bg-slate-900 rounded-[40px] overflow-hidden shadow-2xl"
                              >
                                <div className="aspect-[16/9] relative overflow-hidden">
                                  <img 
                                    src={videoCases[0].thumbnail} 
                                    alt={videoCases[0].title}
                                    className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
                                    referrerPolicy="no-referrer"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                      <Play fill="white" className="text-white ml-1" size={32} />
                                    </div>
                                  </div>
                                  <div className="absolute bottom-8 left-8 right-8">
                                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black text-white uppercase tracking-widest mb-3 inline-block">Long-form</span>
                                    <h4 className="text-2xl lg:text-3xl font-black text-white mb-2 tracking-tight">{videoCases[0].title}</h4>
                                  </div>
                                </div>
                                <a href={videoCases[0].url} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10" />
                              </motion.div>
                              
                              {/* Insight Card 1 */}
                              <motion.div 
                                whileHover={{ scale: 1.02, y: -5 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                className="p-8 lg:p-10 bg-[#0a0a0a] rounded-[40px] border border-slate-800 flex flex-col justify-center relative overflow-hidden shadow-2xl group/insight"
                              >
                                <div className="relative z-10">
                                  <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover/insight:bg-white/20 transition-colors">
                                      <Zap size={16} className="text-white" />
                                    </div>
                                    <span className="text-xs font-black text-white/40 uppercase tracking-[0.2em]">Director's Insight</span>
                                  </div>
                                  <p className="text-lg lg:text-xl font-bold text-white leading-[1.8] whitespace-pre-line tracking-tight">
                                    {videoCases[0].insight}
                                  </p>
                                </div>
                                
                                {/* Bottom Accent Line */}
                                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover/insight:via-white/40 transition-all duration-500" />
                              </motion.div>
                            </div>

                            <div className="lg:col-span-4">
                              <motion.div 
                                whileHover={{ scale: 0.98 }}
                                className="group relative bg-slate-900 rounded-[40px] overflow-hidden shadow-2xl"
                              >
                                <div className="aspect-[9/16] relative overflow-hidden">
                                  <img 
                                    src={videoCases[2].thumbnail} 
                                    alt={videoCases[2].title}
                                    className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
                                    referrerPolicy="no-referrer"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                      <Play fill="white" className="text-white ml-1" size={24} />
                                    </div>
                                  </div>
                                  <div className="absolute bottom-8 left-8 right-8">
                                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black text-white uppercase tracking-widest mb-3 inline-block">Short-form</span>
                                    <h4 className="text-xl font-black text-white mb-2 tracking-tight">{videoCases[2].title}</h4>
                                  </div>
                                </div>
                                <a href={videoCases[2].url} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10" />
                              </motion.div>
                            </div>
                          </div>

                          {/* Row 2: Short 2 + Long 2 */}
                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                            <div className="lg:col-span-4 order-2 lg:order-1">
                              <motion.div 
                                whileHover={{ scale: 0.98 }}
                                className="group relative bg-slate-900 rounded-[40px] overflow-hidden shadow-2xl"
                              >
                                <div className="aspect-[9/16] relative overflow-hidden">
                                  <img 
                                    src={videoCases[3].thumbnail} 
                                    alt={videoCases[3].title}
                                    className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
                                    referrerPolicy="no-referrer"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                      <Play fill="white" className="text-white ml-1" size={24} />
                                    </div>
                                  </div>
                                  <div className="absolute bottom-8 left-8 right-8">
                                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black text-white uppercase tracking-widest mb-3 inline-block">Short-form</span>
                                    <h4 className="text-xl font-black text-white mb-2 tracking-tight">{videoCases[3].title}</h4>
                                  </div>
                                </div>
                                <a href={videoCases[3].url} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10" />
                              </motion.div>
                            </div>

                            <div className="lg:col-span-8 flex flex-col gap-8 order-1 lg:order-2">
                              <motion.div 
                                whileHover={{ scale: 0.98 }}
                                className="group relative bg-slate-900 rounded-[40px] overflow-hidden shadow-2xl"
                              >
                                <div className="aspect-[16/9] relative overflow-hidden">
                                  <img 
                                    src={videoCases[1].thumbnail} 
                                    alt={videoCases[1].title}
                                    className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
                                    referrerPolicy="no-referrer"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                      <Play fill="white" className="text-white ml-1" size={32} />
                                    </div>
                                  </div>
                                  <div className="absolute bottom-8 left-8 right-8">
                                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black text-white uppercase tracking-widest mb-3 inline-block">Long-form</span>
                                    <h4 className="text-2xl lg:text-3xl font-black text-white mb-2 tracking-tight">{videoCases[1].title}</h4>
                                  </div>
                                </div>
                                <a href={videoCases[1].url} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10" />
                              </motion.div>

                              {/* Insight Card 2 */}
                              <motion.div 
                                whileHover={{ scale: 1.02, y: -5 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                className="p-8 lg:p-10 bg-[#0a0a0a] rounded-[40px] border border-slate-800 flex flex-col justify-center relative overflow-hidden shadow-2xl group/insight"
                              >
                                <div className="relative z-10">
                                  <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover/insight:bg-white/20 transition-colors">
                                      <Zap size={16} className="text-white" />
                                    </div>
                                    <span className="text-xs font-black text-white/40 uppercase tracking-[0.2em]">Director's Insight</span>
                                  </div>
                                  <p className="text-lg lg:text-xl font-bold text-white leading-[1.8] whitespace-pre-line tracking-tight">
                                    {videoCases[1].insight}
                                  </p>
                                </div>
                                
                                {/* Bottom Accent Line */}
                                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover/insight:via-white/40 transition-all duration-500" />
                              </motion.div>
                            </div>
                          </div>
                        </div>
                      ) : selectedTouchpoint.id === 'blog' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                          {blogCases.map((caseItem) => (
                            <motion.div 
                              key={caseItem.id}
                              whileHover={{ y: -10 }}
                              className="group bg-white rounded-[40px] overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/20 flex flex-col"
                            >
                              <div className="relative aspect-[16/10] overflow-hidden">
                                <img 
                                  src={caseItem.image} 
                                  alt={caseItem.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                  referrerPolicy="no-referrer"
                                />
                                <div className="absolute top-4 left-4">
                                  <span className={`px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-black ${selectedTouchpoint.color} uppercase tracking-widest shadow-sm`}>
                                    {caseItem.platform}
                                  </span>
                                </div>
                              </div>
                              <div className="p-8 flex-1 flex flex-col">
                                <h4 className="text-xl font-black text-slate-900 mb-3 leading-tight group-hover:text-rose-500 transition-colors">
                                  {caseItem.title}
                                </h4>
                                <p className="text-sm font-bold text-slate-500 leading-relaxed mb-6 flex-1">
                                  {caseItem.desc}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-8">
                                  {caseItem.tags.map((tag, tIdx) => (
                                    <span key={tIdx} className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                      #{tag}
                                    </span>
                                  ))}
                                </div>
                                <a 
                                  href={caseItem.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-full py-4 bg-slate-50 rounded-2xl flex items-center justify-center gap-2 text-slate-900 font-black text-xs group-hover:bg-rose-500 group-hover:text-white transition-all"
                                >
                                  콘텐츠 보러가기 <ArrowUpRight size={14} />
                                </a>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      ) : selectedTouchpoint.id === 'website' ? (
                        <div className="space-y-32">
                          {websiteCases.map((caseItem, idx) => (
                            <div 
                              key={caseItem.id} 
                              className={`grid grid-cols-1 lg:grid-cols-10 gap-12 lg:gap-20 items-center ${
                                idx % 2 === 1 ? 'lg:direction-rtl' : ''
                              }`}
                            >
                              {/* Left: Large Image */}
                              <div className="lg:col-span-7 relative group">
                                <div className="rounded-[40px] overflow-hidden border border-slate-100 shadow-2xl bg-slate-50">
                                  <img 
                                    src={caseItem.image} 
                                    alt={caseItem.title}
                                    className="w-full aspect-[16/9] object-cover"
                                    referrerPolicy="no-referrer"
                                  />
                                </div>
                                {/* AEO Score Badge */}
                                <div className="absolute -top-6 -right-6 w-20 h-20 lg:w-24 lg:h-24 bg-white rounded-full shadow-2xl border border-slate-50 flex flex-col items-center justify-center z-10">
                                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mb-1">AEO Score</span>
                                  <span className="text-2xl lg:text-3xl font-black text-emerald-500">{caseItem.score}</span>
                                </div>
                              </div>

                              {/* Right: Minimal Info */}
                              <div className="lg:col-span-3 space-y-8">
                                <div>
                                  <h4 className="text-3xl font-black text-slate-900 mb-3 tracking-tighter">
                                    {caseItem.title}
                                  </h4>
                                  <p className="text-lg font-bold text-slate-500 leading-relaxed break-keep flex items-start gap-2">
                                    <span className={`w-1.5 h-1.5 rounded-full ${selectedTouchpoint.accentBg} mt-2.5 flex-shrink-0`} />
                                    {caseItem.desc}
                                  </p>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                  {caseItem.tags.map((tag, tIdx) => (
                                    <span 
                                      key={tIdx} 
                                      className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-black rounded-full uppercase tracking-widest"
                                    >
                                      #{tag.replace(' ', '_')}
                                    </span>
                                  ))}
                                </div>

                                <div className="p-5 rounded-3xl bg-slate-50 border border-slate-100">
                                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">FINAL PRICE</span>
                                  <span className={`text-2xl font-black ${selectedTouchpoint.color}`}>
                                    {caseItem.price}
                                  </span>
                                </div>

                                <div className="pt-4">
                                  <a 
                                    href={caseItem.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 text-slate-900 font-black text-sm border-b-2 border-slate-900 pb-2 hover:text-brand-primary hover:border-brand-primary transition-all group"
                                  >
                                    사이트 방문하기
                                    <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                  </a>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : selectedTouchpoint.id === 'place' ? (
                        <div className="space-y-24">
                          {placeCases.map((caseItem) => (
                            <div key={caseItem.id} className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-stretch">
                              {/* Left: Place Capture & Hotspots */}
                              <div className="lg:col-span-7 flex flex-col">
                                <div className="relative group rounded-[40px] overflow-hidden border-8 border-slate-100 shadow-2xl bg-slate-50 flex-grow">
                                  <img 
                                    src={caseItem.image} 
                                    alt={caseItem.title}
                                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                                    referrerPolicy="no-referrer"
                                  />
                                  {/* Hotspots */}
                                  {caseItem.hotspots.map((spot) => (
                                    <motion.div
                                      key={spot.id}
                                      initial={{ scale: 0 }}
                                      whileInView={{ scale: 1 }}
                                      viewport={{ once: true }}
                                      transition={{ delay: 0.5 + spot.id * 0.2, type: "spring" }}
                                      className="absolute"
                                      style={{ left: spot.x, top: spot.y }}
                                    >
                                      <div className="relative group/spot">
                                        <div className="w-8 h-8 lg:w-10 lg:h-10 bg-rose-500 rounded-full flex items-center justify-center text-white font-black shadow-lg shadow-rose-500/40 cursor-pointer animate-pulse">
                                          {spot.id}
                                        </div>
                                        {/* Tooltip */}
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-48 p-4 bg-white rounded-2xl shadow-2xl opacity-0 group-hover/spot:opacity-100 transition-opacity pointer-events-none z-20 border border-slate-100">
                                          <p className="text-xs font-black text-rose-500 mb-1">{spot.label}</p>
                                          <p className="text-[10px] text-slate-500 font-bold leading-tight">{spot.desc}</p>
                                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white" />
                                        </div>
                                      </div>
                                    </motion.div>
                                  ))}
                                  {/* Link Overlay */}
                                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                                    <a 
                                      href={caseItem.url} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="px-6 py-3 bg-blue-600 rounded-full flex items-center gap-2 text-white font-black text-sm shadow-xl hover:bg-blue-700 transition-all hover:scale-105 active:scale-95"
                                    >
                                      실제 플레이스 확인하기 <ArrowUpRight size={16} />
                                    </a>
                                  </div>
                                </div>
                              </div>

                              {/* Right: Analysis & Solution */}
                              <div className="lg:col-span-5 space-y-10">
                                {/* 1. Scorecard */}
                                <div className="p-8 bg-slate-50 rounded-[40px] border border-slate-100">
                                  <h5 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Diagnostic Scorecard</h5>
                                  <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                                    {caseItem.scores.map((s, idx) => (
                                      <div key={idx} className="space-y-2">
                                        <div className="flex justify-between items-end">
                                          <span className="text-[11px] font-black text-slate-500 leading-tight break-keep">{s.label}</span>
                                          <span className={`text-xs font-black ${s.status === 'high' ? 'text-emerald-500' : s.status === 'mid' ? 'text-amber-500' : 'text-rose-500'}`}>
                                            {s.score}
                                          </span>
                                        </div>
                                        <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                          <motion.div 
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${s.score}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1, delay: idx * 0.1 }}
                                            className={`h-full rounded-full ${s.status === 'high' ? 'bg-emerald-500' : s.status === 'mid' ? 'bg-amber-500' : 'bg-rose-500'}`}
                                          />
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* 2. Solution List */}
                                <div className="space-y-6">
                                  <h5 className="text-xs font-black text-indigo-600 uppercase tracking-widest">
                                    {['place-audit-01', 'place-audit-02', 'place-audit-03'].includes(caseItem.id) ? 'DETAILED ANALYSIS' : 'Core Solution'}
                                  </h5>
                                  <div className="space-y-4">
                                    {caseItem.solutions.map((sol) => (
                                      <div key={sol.id} className="flex gap-4 p-5 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                        <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex-shrink-0 flex items-center justify-center text-xs font-black">
                                          {sol.id}
                                        </div>
                                        <div>
                                          <p className="font-black text-slate-900 text-sm mb-1">{sol.title}</p>
                                          <p className="text-xs text-slate-500 font-bold leading-relaxed whitespace-pre-line">{sol.desc}</p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : selectedTouchpoint.id === 'strategy' ? (
                        <div className="space-y-16">
                          {[
                            {
                              id: "case01",
                              type: "밑 빠진 독에 물 붓기",
                              target: "광고비는 계속 나가는데, 정작 예약이나 구매 버튼까지는 안 오는 분들",
                              problem: "플레이스, 블로그 등 외부 채널을 통해 고객 유입은 발생하지만, 최종 목적지인 홈페이지나 결제 페이지에서 고객이 이탈하며 실제 매출로 연결되지 않습니다.",
                              diagnosis: "고객이 결심을 굳혀야 할 결정적 순간에 '진정성 있는 증거'가 부족하거나, 유도하는 메시지가 파편화되어 신뢰를 주지 못하기 때문입니다.",
                              strategyTitle: "고전환 신뢰 동선 설계",
                              result: "이탈률 40% 감소 & 전환율 2.5배 상승",
                              strategies: [
                                { title: "핵심 비즈니스 영역 압축", desc: "여러 강점을 나열하기보다 고객이 즉시 반응할 Top 3 중점 영역을 선정하여 메시지 무게감을 확보합니다." },
                                { title: "신뢰 장치(Trust Device) 배치", desc: "리얼 후기 시각화(Type D 영상)와 서비스 전문 매뉴얼(브로슈어)을 접점에 배치하여 고객의 의구심을 확신으로 바꿉니다." },
                                { title: "기술적 최적화", desc: "AI와 검색 엔진이 브랜드를 신뢰할 수 있도록 SEO/AEO 기반의 텍스트 구조를 재설계하여 발견의 확률과 신뢰도를 동시에 높입니다." }
                              ]
                            },
                            {
                              id: "case02",
                              type: "누구에게 팔지 모르는",
                              target: "우리 상품이 참 좋은데, 남들과 똑같은 가격 경쟁만 하고 계신 분들",
                              problem: "차별점 없이 기능과 가격만 강조하다 보니 저가 경쟁에 노출되어 있습니다. 우리 브랜드만의 '진짜 가치'를 알아주는 우량 고객 확보가 어렵습니다.",
                              diagnosis: "타겟이 불분명한 보편적인 언어를 사용하고 있어, 고관여 고객(찐팬)이 매력을 느낄만한 '브랜드만의 보이스'가 결여되어 있기 때문입니다.",
                              strategyTitle: "프리미엄 페르소나 수립",
                              result: "객단가 35% 상승 & 고관여 고객 유입 60% 증대",
                              strategies: [
                                { title: "언어의 통일", desc: "가격 중심의 표현을 배제하고, 브랜드의 철학이 담긴 핵심 카피와 슬로건을 도출하여 모든 운영물에 이식합니다." },
                                { title: "고유 페르소나 투영", desc: "기계적인 정보 전달이 아닌, 클라이언트 고유의 말투와 가치관을 반영한 블로그 페르소나를 설정하여 감성적 타겟팅을 시작합니다." },
                                { title: "시각적 등급 상향", desc: "로고, 폰트, 컬러 시스템을 재정비하여 고관여 타겟이 안심하고 선택할 수 있는 톤앤매너로 브랜드의 체급을 높입니다." }
                              ]
                            },
                            {
                              id: "case03",
                              type: "제각각 따로 노는",
                              target: "홈페이지, 플레이스, 블로그 분위기가 다 달라서 손님들이 헷갈려 하는 분들",
                              problem: "온라인 접점(플레이스, 블로그)과 오프라인 접점(명함, 배너)의 인상이 서로 달라 고객 경험이 단절되고 브랜드 잔상이 남지 않습니다.",
                              diagnosis: "제작 시점마다 다른 업체를 이용하거나 기준 없이 작업물을 늘려오면서, 전체를 관통하는 '브랜드 가이드라인'이 상실되었기 때문입니다.",
                              strategyTitle: "ONE 시스템 통합 동기화",
                              result: "브랜드 인지도 80% 개선 & 마케팅 운영 효율 2배 강화",
                              strategies: [
                                { title: "6대 접점 전수 점검", desc: "흩어진 온라인 배너, 포스터, 상세페이지 등을 전수 조사하여 부적합한 표현과 이미지를 즉시 재정리합니다." },
                                { title: "이미지 연출 가이드 제공", desc: "전 채널에 공통 적용할 이미지 스타일과 레이아웃 기준을 수립하여, 어떤 접점에서 만나도 '하나의 브랜드'임을 인지하게 합니다." },
                                { title: "우선순위 로드맵 설계", desc: "무분별한 제작을 멈추고, 브랜드 기준에 맞춰 가장 시급한 접점부터 순차적으로 교체해 나가는 통합 매니지먼트를 실행합니다." }
                              ]
                            }
                          ].map((caseItem, caseIdx) => (
                            <div key={caseItem.id} className="bg-white rounded-[40px] p-8 md:p-16 border border-slate-100 shadow-sm overflow-hidden">
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
                                {/* Left: Diagram */}
                                <div className="relative h-full w-full bg-slate-50 rounded-[40px] flex items-center justify-center overflow-hidden border border-slate-100 shadow-inner min-h-[500px] lg:min-h-0">
                                  {/* Blueprint Grid Background */}
                                  <div className="absolute inset-0 opacity-[0.04] pointer-events-none" 
                                    style={{ 
                                      backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
                                      backgroundSize: '30px 30px'
                                    }} 
                                  />
                                  <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
                                    style={{ 
                                      backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
                                      backgroundSize: '150px 150px'
                                    }} 
                                  />

                                  {caseItem.id === 'case01' && (
                                    <div className="relative w-full h-full flex flex-col items-center justify-center p-8 md:p-12 lg:p-14">
                                      <div className="w-full max-w-lg space-y-8 lg:space-y-10">
                                        <div className="flex items-center justify-between">
                                          <span className="text-[11px] lg:text-[12px] font-black text-slate-400 uppercase tracking-widest">전환 퍼널 분석 (Conversion Funnel)</span>
                                          <div className="flex items-center gap-2">
                                            <div className="w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full bg-rose-500 animate-pulse" />
                                            <span className="text-[11px] lg:text-[12px] font-black text-rose-500 uppercase">심각한 이탈 구간</span>
                                          </div>
                                        </div>

                                        {/* Funnel Visualization - Improved Layout */}
                                        <div className="space-y-4 lg:space-y-6">
                                          {[
                                            { label: "고객 유입", value: "100%", width: "100%", color: "bg-slate-200" },
                                            { label: "브랜드 관심", value: "35%", width: "35%", color: "bg-slate-300" },
                                            { label: "구매 결심", value: "8%", width: "15%", color: "bg-rose-500", alert: true },
                                            { label: "최종 전환", value: "1.2%", width: "5%", color: "bg-slate-400" }
                                          ].map((row, i) => (
                                            <div key={i} className="group relative">
                                              <div className="flex items-center justify-between mb-1.5 lg:mb-2 px-1">
                                                <span className="text-[11px] lg:text-[12px] font-black text-slate-500">{row.label}</span>
                                                <span className="text-[11px] lg:text-[12px] font-black text-slate-900">{row.value}</span>
                                              </div>
                                              <div className="h-4 lg:h-6 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                                                <motion.div 
                                                  initial={{ width: 0 }}
                                                  whileInView={{ width: row.width }}
                                                  transition={{ duration: 1.2, delay: i * 0.1, ease: "easeOut" }}
                                                  className={`h-full ${row.color} rounded-full relative`}
                                                >
                                                  {row.alert && (
                                                    <motion.div 
                                                      animate={{ x: [0, 5, 0] }}
                                                      transition={{ duration: 1.5, repeat: Infinity }}
                                                      className="absolute -right-28 lg:-right-32 top-1/2 -translate-y-1/2 flex items-center gap-2"
                                                    >
                                                      <ArrowRight className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-rose-500" />
                                                      <span className="text-[10px] lg:text-[11px] font-black text-rose-500 whitespace-nowrap">신뢰 부족으로 인한 이탈</span>
                                                    </motion.div>
                                                  )}
                                                </motion.div>
                                              </div>
                                            </div>
                                          ))}
                                        </div>

                                        {/* Strategy Insight - Localized */}
                                        <div className="p-6 lg:p-8 bg-white border-2 border-slate-100 rounded-[32px] lg:rounded-[40px] shadow-xl shadow-slate-200/20">
                                          <div className="flex items-center gap-3 lg:gap-4 mb-3 lg:mb-4">
                                            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-xl lg:rounded-2xl bg-amber-400 flex items-center justify-center text-white shadow-lg shadow-amber-400/30">
                                              <Zap className="w-[18px] h-[18px] lg:w-[22px] lg:h-[22px]" fill="currentColor" />
                                            </div>
                                            <span className="text-sm lg:text-base font-black text-slate-900 tracking-tight">전략적 솔루션 (Solution)</span>
                                          </div>
                                          <p className="text-[13px] lg:text-[14px] text-slate-600 font-bold leading-relaxed break-keep">
                                            고객이 망설이는 <span className="text-rose-500 underline underline-offset-4 decoration-2">구매 결심 단계</span>에서 강력한 신뢰 장치를 배치합니다. 
                                            이탈을 막고 최종 전환율을 <span className="text-indigo-600 font-black">2.5배 이상 끌어올리는</span> 최적의 동선을 설계합니다.
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {caseItem.id === 'case02' && (
                                    <div className="relative w-full h-full flex flex-col items-center justify-center p-8 md:p-12 lg:p-14">
                                      <div className="w-full h-full max-w-lg flex flex-col">
                                        <div className="flex items-center justify-between mb-10 lg:mb-14">
                                          <span className="text-[11px] lg:text-[12px] font-black text-slate-400 uppercase tracking-widest">시장 포지셔닝 맵 (Positioning Map)</span>
                                          <span className="text-[11px] lg:text-[12px] font-black text-amber-500 uppercase">프리미엄 타겟팅</span>
                                        </div>

                                        {/* Quadrant Chart */}
                                        <div className="flex-1 relative border-l-2 border-b-2 border-slate-300 mb-10 lg:mb-14">
                                          {/* Axis Labels */}
                                          <div className="absolute -left-2 -top-6 lg:-top-8 text-[9px] lg:text-[10px] font-black text-slate-400 uppercase">높은 가치 (High Value)</div>
                                          <div className="absolute -right-2 -bottom-6 lg:-bottom-8 text-[9px] lg:text-[10px] font-black text-slate-400 uppercase">높은 가격 (High Price)</div>
                                          
                                          {/* Competitor Cluster */}
                                          <div className="absolute left-1/4 bottom-1/4 w-32 h-32 lg:w-40 lg:h-40 bg-slate-200/30 rounded-full blur-3xl" />
                                          {[...Array(15)].map((_, i) => (
                                            <div 
                                              key={i} 
                                              className="absolute w-2 h-2 lg:w-2.5 lg:h-2.5 bg-slate-300 rounded-full opacity-60"
                                              style={{ 
                                                left: `${10 + Math.random() * 40}%`, 
                                                bottom: `${10 + Math.random() * 40}%` 
                                              }}
                                            />
                                          ))}
                                          <span className="absolute left-[20%] bottom-[10%] lg:bottom-[15%] text-[9px] lg:text-[10px] font-black text-slate-400 uppercase">저가 경쟁 시장</span>

                                          {/* Target Zone & Brand Move */}
                                          <div className="absolute right-1/4 top-1/4 w-24 h-24 lg:w-32 lg:h-32 border-2 border-dashed border-amber-400 rounded-full animate-[pulse_3s_infinite]" />
                                          
                                          {/* Brand Movement Arrow */}
                                          <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                                            <motion.path 
                                              d="M 25% 75% Q 50% 50% 80% 20%" 
                                              fill="none" stroke="#fbbf24" strokeWidth="2.5" strokeDasharray="8 6"
                                              initial={{ pathLength: 0 }}
                                              whileInView={{ pathLength: 1 }}
                                              transition={{ duration: 1.5, delay: 0.5 }}
                                            />
                                            <motion.circle 
                                              cx="80%" cy="20%" r="7" fill="#fbbf24"
                                              initial={{ scale: 0 }}
                                              whileInView={{ scale: 1 }}
                                              transition={{ delay: 2 }}
                                            />
                                          </svg>

                                          <motion.div 
                                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                            transition={{ 
                                              delay: 0.8, 
                                              type: "spring",
                                              stiffness: 200,
                                              damping: 15
                                            }}
                                            className="absolute right-[5%] top-[5%] bg-white border-2 border-amber-400 p-4 lg:p-6 shadow-2xl z-10 rounded-2xl lg:rounded-3xl"
                                          >
                                            {/* Pulsing Highlight Border */}
                                            <motion.div 
                                              animate={{ opacity: [0, 1, 0], scale: [1, 1.05, 1] }}
                                              transition={{ duration: 2, repeat: Infinity }}
                                              className="absolute -inset-1 border-2 border-amber-400 rounded-[18px] lg:rounded-[26px] pointer-events-none"
                                            />
                                            
                                            <div className="flex items-center gap-2 lg:gap-3 mb-1.5 lg:mb-2 relative z-10">
                                              <User className="w-3.5 h-3.5 lg:w-[18px] lg:h-[18px] text-amber-500" />
                                              <span className="text-[11px] lg:text-[13px] font-black text-slate-900 uppercase">프리미엄 페르소나</span>
                                            </div>
                                            <p className="text-[10px] lg:text-[11px] font-bold text-slate-500 leading-tight relative z-10">고관여 우량 고객 <br /> 집중 타겟팅 완료</p>
                                          </motion.div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 lg:gap-6">
                                          <div className="p-4 lg:p-5 bg-slate-100 rounded-2xl lg:rounded-3xl">
                                            <p className="text-[9px] lg:text-[10px] font-black text-slate-400 uppercase mb-1">현재 상태</p>
                                            <p className="text-xs lg:text-sm font-black text-slate-600">저가 경쟁 레드오션</p>
                                          </div>
                                          <div className="p-4 lg:p-5 bg-amber-50 border border-amber-100 rounded-2xl lg:rounded-3xl">
                                            <p className="text-[9px] lg:text-[10px] font-black text-amber-400 uppercase mb-1">전략 실행 후</p>
                                            <p className="text-xs lg:text-sm font-black text-amber-600">독보적 가치 포지셔닝</p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {caseItem.id === 'case03' && (
                                    <div className="relative w-full h-full flex flex-col items-center justify-center p-8 md:p-12 lg:p-14">
                                      <div className="w-full h-full max-w-lg flex flex-col">
                                        <div className="flex items-center justify-between mb-6 lg:mb-8">
                                          <span className="text-[11px] lg:text-[12px] font-black text-slate-400 uppercase tracking-widest">접점 일관성 분석 (Consistency Radar)</span>
                                          <span className="text-[11px] lg:text-[12px] font-black text-indigo-500 uppercase">ONE 통합 시스템</span>
                                        </div>

                                        {/* Radar Chart Visualization */}
                                        <div className="flex-1 relative flex items-center justify-center min-h-0">
                                          <svg viewBox="0 0 200 200" className="w-full h-full max-w-[280px] lg:max-w-[350px] overflow-visible">
                                            {/* Background Hexagons */}
                                            {[1, 0.75, 0.5, 0.25].map((scale, i) => (
                                              <polygon 
                                                key={i}
                                                points="100,20 170,60 170,140 100,180 30,140 30,60" 
                                                fill="none" stroke="#e2e8f0" strokeWidth="1"
                                                transform={`scale(${scale}) translate(${(100/scale)-100}, ${(100/scale)-100})`}
                                              />
                                            ))}
                                            
                                            {/* Axes */}
                                            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                                              <line 
                                                key={i}
                                                x1="100" y1="100" 
                                                x2={100 + Math.cos((angle-90) * Math.PI / 180) * 80}
                                                y2={100 + Math.sin((angle-90) * Math.PI / 180) * 80}
                                                stroke="#e2e8f0" strokeWidth="1"
                                              />
                                            ))}

                                            {/* Current State (Jagged) */}
                                            <motion.polygon 
                                              initial={{ opacity: 0, scale: 0.5 }}
                                              whileInView={{ opacity: 1, scale: 1 }}
                                              points="100,60 140,80 160,130 100,140 50,120 40,70" 
                                              fill="rgba(244, 63, 94, 0.1)" stroke="#f43f5e" strokeWidth="2.2" strokeDasharray="4 2"
                                            />

                                            {/* Target State (Perfect Circle/Hexagon) */}
                                            <motion.polygon 
                                              initial={{ pathLength: 0, opacity: 0 }}
                                              whileInView={{ pathLength: 1, opacity: 1 }}
                                              transition={{ duration: 1.5, delay: 0.5 }}
                                              points="100,25 165,62 165,138 100,175 35,138 35,62" 
                                              fill="rgba(79, 70, 229, 0.1)" stroke="#4f46e5" strokeWidth="3.5"
                                            />
                                          </svg>

                                          {/* Labels */}
                                          <div className="absolute top-[8%] text-[10px] lg:text-[11px] font-black text-slate-400 uppercase">홈페이지</div>
                                          <div className="absolute top-[28%] right-[5%] text-[10px] lg:text-[11px] font-black text-slate-400 uppercase">블로그</div>
                                          <div className="absolute bottom-[28%] right-[5%] text-[10px] lg:text-[11px] font-black text-slate-400 uppercase">플레이스</div>
                                          <div className="absolute bottom-[8%] text-[10px] lg:text-[11px] font-black text-slate-400 uppercase">SNS</div>
                                          <div className="absolute bottom-[28%] left-[5%] text-[10px] lg:text-[11px] font-black text-slate-400 uppercase">오프라인</div>
                                          <div className="absolute top-[28%] left-[5%] text-[10px] lg:text-[11px] font-black text-slate-400 uppercase">고객응대</div>
                                        </div>

                                        <div className="mt-6 lg:mt-8 flex items-center justify-center gap-8 lg:gap-12">
                                          <div className="flex items-center gap-3 lg:gap-4">
                                            <div className="w-4 h-4 lg:w-5 lg:h-5 border border-dashed border-rose-500 bg-rose-500/10" />
                                            <span className="text-[12px] lg:text-[14px] font-black text-slate-600 uppercase">현재 불일치 상태</span>
                                          </div>
                                          <div className="flex items-center gap-3 lg:gap-4">
                                            <div className="w-4 h-4 lg:w-5 lg:h-5 border-2 border-indigo-500 bg-indigo-500/10" />
                                            <span className="text-[12px] lg:text-[14px] font-black text-indigo-600 uppercase">ONE 통합 목표</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  {/* Case 03 is already handled above in the dashboard style */}
                                </div>

                                {/* Right: Content */}
                                <div className="space-y-8">
                                  <div>
                                    <div className="inline-block px-4 py-1 rounded-full bg-amber-400/10 text-amber-500 text-xs font-black mb-4 uppercase tracking-widest">
                                      CASE 0{caseIdx + 1}
                                    </div>
                                    <h4 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tighter">
                                      "{caseItem.type}" <span className="text-slate-400">형</span>
                                    </h4>
                                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100 mb-6">
                                      <p className="text-sm font-bold text-amber-700">
                                        <span className="opacity-50 mr-2">대상:</span> {caseItem.target}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="space-y-6">
                                    <div>
                                      <h5 className="text-xs font-black text-rose-500 uppercase tracking-widest mb-2">Problem</h5>
                                      <p className="text-slate-600 font-bold leading-relaxed break-keep">{caseItem.problem}</p>
                                    </div>
                                    <div>
                                      <h5 className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-2">Diagnosis</h5>
                                      <p className="text-slate-600 font-bold leading-relaxed break-keep">{caseItem.diagnosis}</p>
                                    </div>
                                    <div className="pt-6 border-t border-slate-100">
                                      <h5 className="text-lg font-black text-slate-900 mb-4">
                                        Strategy: <span className="text-amber-400">[{caseItem.strategyTitle}]</span>
                                      </h5>
                                      <div className="space-y-4 mb-8">
                                        {caseItem.strategies.map((s, sIdx) => (
                                          <div key={sIdx} className="flex gap-4">
                                            <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex-shrink-0 flex items-center justify-center text-[10px] font-black">
                                              {sIdx + 1}
                                            </div>
                                            <div>
                                              <p className="font-black text-slate-900 text-sm mb-1">{s.title}</p>
                                              <p className="text-xs text-slate-500 font-medium leading-normal">{s.desc}</p>
                                            </div>
                                          </div>
                                        ))}
                                      </div>

                                      {/* Expected Outcome */}
                                      <div className="p-6 rounded-3xl bg-indigo-50 border border-indigo-100 flex items-center justify-between group">
                                        <div>
                                          <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Expected Outcome</p>
                                          <p className="text-lg font-black text-indigo-600">{caseItem.result}</p>
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-indigo-500 shadow-sm group-hover:scale-110 transition-transform">
                                          <Zap size={20} fill="currentColor" />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : selectedTouchpoint.id === 'video' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                          {videoCases.map((caseItem) => (
                            <motion.div 
                              key={caseItem.id}
                              whileHover={{ y: -10 }}
                              className="group bg-white rounded-[40px] overflow-hidden border border-slate-100 shadow-xl"
                            >
                              <div className="relative aspect-video overflow-hidden">
                                <img 
                                  src={caseItem.thumbnail} 
                                  alt={caseItem.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                  referrerPolicy="no-referrer"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                                    <Play fill="currentColor" size={24} />
                                  </div>
                                </div>
                                <div className="absolute top-6 left-6">
                                  <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-black rounded-full uppercase tracking-widest shadow-sm">
                                    {caseItem.type === 'long' ? 'Long-form' : 'Short-form'}
                                  </span>
                                </div>
                              </div>
                              <div className="p-8 lg:p-10">
                                <h4 className="text-2xl font-black text-slate-900 mb-2 tracking-tighter">{caseItem.title}</h4>
                                <p className="text-slate-500 font-bold mb-6 leading-relaxed">{caseItem.desc}</p>
                                
                                <motion.div 
                                  whileHover={{ scale: 1.02 }}
                                  className="p-8 rounded-[32px] bg-[#0a0a0a] border border-slate-800 mb-8 relative overflow-hidden shadow-2xl group/insight"
                                >
                                  <div className="relative z-10">
                                    <div className="flex items-center gap-2 mb-4">
                                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover/insight:bg-white/20 transition-colors">
                                        <Zap size={12} className="text-white" />
                                      </div>
                                      <span className="text-[11px] font-black text-white/40 uppercase tracking-[0.2em]">Director's Insight</span>
                                    </div>
                                    
                                    <p className="text-[15px] text-white font-bold leading-[1.8] whitespace-pre-line tracking-tight">
                                      {caseItem.insight}
                                    </p>
                                  </div>
                                  
                                  {/* Bottom Accent Line */}
                                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover/insight:via-white/40 transition-all duration-500" />
                                </motion.div>

                                <a 
                                  href={caseItem.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-brand-primary transition-colors group/btn"
                                >
                                  영상 보러가기
                                  <ArrowUpRight size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                </a>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      ) : selectedTouchpoint.id === 'offline' ? (
                        <div className="space-y-24">
                          {offlineCases.map((caseItem) => (
                            <div key={caseItem.id} className="bg-white rounded-[40px] p-8 md:p-16 border border-slate-100 shadow-sm overflow-hidden">
                              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                                {/* Left: Image Gallery */}
                                <div className="lg:col-span-7 space-y-6">
                                  <div className={`grid grid-cols-1 ${caseItem.category === 'X-Banner' ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-6`}>
                                    {caseItem.images.map((img, idx) => (
                                      <motion.div 
                                        key={idx}
                                        whileHover={{ scale: 1.02 }}
                                        onClick={() => handleOpenOfflineModal(caseItem)}
                                        className={`relative rounded-3xl overflow-hidden border-4 border-slate-50 shadow-lg cursor-pointer ${caseItem.ratio} ${idx === 0 && caseItem.images.length === 3 && caseItem.category !== 'X-Banner' ? 'md:col-span-2' : ''}`}
                                      >
                                        <img 
                                          src={img} 
                                          alt={`${caseItem.title} ${idx + 1}`}
                                          className="w-full h-full object-cover"
                                          referrerPolicy="no-referrer"
                                        />
                                        <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center group">
                                          <Search className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={32} />
                                        </div>
                                      </motion.div>
                                    ))}
                                  </div>
                                </div>

                                {/* Right: Info */}
                                <div className="lg:col-span-5 space-y-8">
                                  <div>
                                    <div className="flex items-center gap-3 mb-4">
                                      <span className="px-4 py-1 bg-brand-primary/10 text-brand-primary text-[10px] font-black rounded-full uppercase tracking-widest inline-block">
                                        {caseItem.category}
                                      </span>
                                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        Total {["Business Card", "Leaflet"].includes(caseItem.category) ? Math.ceil(caseItem.images.length / 2) : caseItem.images.length} {["Business Card", "Leaflet"].includes(caseItem.category) ? "Sets" : "Items"}
                                      </span>
                                    </div>
                                    <h4 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tighter">
                                      {caseItem.title}
                                    </h4>
                                    <p className="text-lg font-bold text-slate-500 leading-relaxed break-keep">
                                      {caseItem.desc}
                                    </p>
                                  </div>

                                  <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100">
                                    <div className="flex items-center gap-3 mb-4">
                                      <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-brand-primary shadow-sm">
                                        <Zap size={20} fill="currentColor" />
                                      </div>
                                      <span className="text-xs font-black text-slate-900 uppercase tracking-widest">Expert Insight</span>
                                    </div>
                                    <p className="text-sm text-slate-600 font-bold leading-relaxed italic whitespace-pre-line">
                                      {caseItem.insight}
                                    </p>
                                  </div>

                                  <div className="pt-4">
                                    <div className="flex items-center gap-4 text-slate-400">
                                      <div className="flex -space-x-2">
                                        {[1, 2, 3].map((i) => (
                                          <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100" />
                                        ))}
                                      </div>
                                      <span className="text-xs font-bold uppercase tracking-widest">BRAND ONE DESIGN SYSTEM 적용</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                          {[1, 2, 3].map((i) => (
                            <motion.div 
                              key={i}
                              whileHover={{ y: -10 }}
                              className="group bg-slate-50 rounded-[32px] overflow-hidden border border-slate-100 aspect-[4/5] relative"
                            >
                              <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-slate-200 mb-6 group-hover:scale-110 transition-transform duration-500">
                                  <Play size={32} />
                                </div>
                                <span className="text-slate-300 font-black uppercase tracking-widest text-xs mb-2">Reference {i}</span>
                                <p className="text-slate-400 font-bold">실제 프로젝트 레퍼런스가 <br /> 곧 업데이트될 예정입니다.</p>
                              </div>
                              
                              {/* Hover Overlay */}
                              <div className="absolute inset-0 bg-brand-primary/0 group-hover:bg-brand-primary/5 transition-colors duration-500" />
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* 3. Other Touchpoints Selection Area */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-md">
              <h3 className="text-2xl font-black text-slate-900 mb-4">다른 접점 확인하기</h3>
              <p className="text-slate-500 font-medium">
                현재 선택된 접점 외에 브랜드 성장을 위한 <br />
                다른 핵심 접점들도 살펴보세요.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
              {items.map((item) => {
                const isSelected = selectedTouchpoint?.id === item.id;
                
                return (
                  <motion.div
                    key={item.id}
                    className="relative"
                  >
                    <div className={`flex flex-col items-center gap-1 p-2 rounded-[32px] transition-all duration-500 ${
                      isSelected 
                        ? 'bg-white shadow-xl shadow-slate-200/50 border-2 border-brand-primary' 
                        : 'bg-white border border-slate-100 hover:border-slate-200 hover:shadow-lg'
                    }`}>
                      <div className="w-24 h-24 flex items-center justify-center">
                        <ServiceCard 
                          item={item} 
                          size="icon" 
                          active={isSelected}
                          onClick={() => handleSelectTouchpoint(item)}
                        />
                      </div>
                      <span className={`text-[10px] font-black uppercase tracking-widest ${
                        isSelected ? 'text-slate-900' : 'text-slate-400'
                      }`}>
                        {item.title}
                      </span>
                    </div>
                    
                    {isSelected && (
                      <motion.div 
                        layoutId="active-indicator"
                        className="absolute -top-1 -right-1 w-5 h-5 bg-brand-primary rounded-full flex items-center justify-center text-white shadow-lg z-20"
                      >
                        <CheckCircle2 size={12} />
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 4. CTA Section (Existing) */}
      <section className="py-40 bg-slate-950 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-12"
          >
            <span className="text-sm font-bold tracking-widest text-brand-primary">02</span>
            <div className="w-12 h-[1px] bg-brand-primary/30" />
            <span className="text-sm font-bold tracking-widest text-slate-400 uppercase">SHALL WE</span>
          </motion.div>
          
          <div className="text-center">
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
            <a 
              href="https://open.kakao.com/me/brandone"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-5 bg-[#FEE500] text-[#3C1E1E] rounded-2xl font-black text-lg shadow-xl shadow-[#FEE500]/20 hover:scale-105 transition-transform flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              간편 상담해보기
            </a>
            <Link 
              to="/service#estimate"
              className="px-10 py-5 bg-[#D9F99D] text-slate-900 rounded-2xl font-black text-lg shadow-xl shadow-[#D9F99D]/20 hover:scale-105 transition-transform flex items-center justify-center"
            >
              견적 계산해보기
            </Link>
          </motion.div>
        </div>
      </div>
      {/* Decorative Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-primary/10 blur-[160px] rounded-full" />
      </section>

      <QuickMenu />
      <Footer className="bg-black" />

      {/* Offline Detail Modal */}
      <AnimatePresence>
        {selectedOfflineItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12"
          >
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOfflineItem(null)}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-[48px] overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedOfflineItem(null)}
                className="absolute top-8 right-8 w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-900 hover:bg-brand-primary hover:text-white transition-all z-50"
              >
                <X size={24} />
              </button>

              {/* Left: Image Slider / Flip Card */}
              <div className={`w-full ${selectedOfflineItem.category === 'X-Banner' ? 'md:w-2/5' : 'md:w-3/5'} h-[400px] md:h-auto bg-slate-50 relative group/slider overflow-hidden`}>
                {["Business Card", "Leaflet"].includes(selectedOfflineItem.category) ? (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 md:p-12">
                    <div className="relative w-full h-full max-w-[500px] [perspective:1500px]">
                      <motion.div
                        animate={{ rotateY: isFlipped ? 180 : 0 }}
                        transition={{ duration: 0.7, type: "spring", stiffness: 200, damping: 25 }}
                        className="relative w-full h-full [transform-style:preserve-3d] cursor-pointer"
                        onClick={() => setIsFlipped(!isFlipped)}
                      >
                        {/* Front */}
                        <div className="absolute inset-0 [backface-visibility:hidden]">
                          <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-white">
                            <img 
                              src={selectedOfflineItem.images[currentImageIndex * 2]} 
                              alt={`${selectedOfflineItem.title} front`}
                              className="w-full h-full object-contain"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute bottom-4 right-4 px-3 py-1 bg-slate-900/10 backdrop-blur-sm rounded-full text-[10px] font-black text-slate-900 uppercase tracking-widest">Front</div>
                          </div>
                        </div>
                        {/* Back */}
                        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                          <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-white">
                            <img 
                              src={selectedOfflineItem.images[currentImageIndex * 2 + 1]} 
                              alt={`${selectedOfflineItem.title} back`}
                              className="w-full h-full object-contain"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute bottom-4 right-4 px-3 py-1 bg-slate-900/10 backdrop-blur-sm rounded-full text-[10px] font-black text-slate-900 uppercase tracking-widest">Back</div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                    
                    <button 
                      onClick={() => setIsFlipped(!isFlipped)}
                      className="mt-8 px-6 py-2 bg-white border border-slate-200 rounded-full text-xs font-black text-slate-900 shadow-sm hover:bg-slate-50 transition-colors flex items-center gap-2"
                    >
                      <Zap size={14} className={isFlipped ? "text-brand-primary" : "text-slate-400"} />
                      {isFlipped ? "앞면 보기" : "뒷면 보기"}
                    </button>
                  </div>
                ) : (
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={currentImageIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="w-full h-full flex items-center justify-center p-8 md:p-12"
                    >
                      <div className={`w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-white ${selectedOfflineItem.category === 'X-Banner' ? 'max-w-[300px]' : ''}`}>
                        <img 
                          src={selectedOfflineItem.images[currentImageIndex]} 
                          alt={`${selectedOfflineItem.title} detail ${currentImageIndex + 1}`}
                          className="w-full h-full object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                )}

                {/* Navigation Buttons */}
                {(["Namecard", "Leaflet"].includes(selectedOfflineItem.category) ? Math.ceil(selectedOfflineItem.images.length / 2) : selectedOfflineItem.images.length) > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-slate-900 shadow-lg hover:bg-brand-primary hover:text-white transition-all opacity-0 group-hover/slider:opacity-100"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-slate-900 shadow-lg hover:bg-brand-primary hover:text-white transition-all opacity-0 group-hover/slider:opacity-100"
                    >
                      <ChevronRight size={24} />
                    </button>

                    {/* Pagination Dots */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                      {Array.from({ length: ["Namecard", "Leaflet"].includes(selectedOfflineItem.category) ? Math.ceil(selectedOfflineItem.images.length / 2) : selectedOfflineItem.images.length }).map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setCurrentImageIndex(idx);
                            setIsFlipped(false);
                          }}
                          className={`w-2 h-2 rounded-full transition-all ${
                            idx === currentImageIndex ? 'w-8 bg-brand-primary' : 'bg-slate-300 hover:bg-slate-400'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Right: Info */}
              <div className={`w-full ${selectedOfflineItem.category === 'X-Banner' ? 'md:w-3/5' : 'md:w-2/5'} p-8 md:p-16 flex flex-col justify-between overflow-y-auto`}>
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-4 py-1.5 rounded-full bg-slate-100 text-[10px] font-black text-brand-primary uppercase tracking-widest">
                      {selectedOfflineItem.category}
                    </span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Total {["Namecard", "Leaflet"].includes(selectedOfflineItem.category) ? Math.ceil(selectedOfflineItem.images.length / 2) : selectedOfflineItem.images.length} {["Namecard", "Leaflet"].includes(selectedOfflineItem.category) ? "Sets" : "Items"}
                    </span>
                  </div>

                  <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tighter leading-tight">
                    {selectedOfflineItem.title}
                  </h3>

                  <p className="text-xl font-bold text-slate-500 leading-relaxed mb-12 break-keep">
                    {selectedOfflineItem.desc}
                  </p>

                  <div className="space-y-8">
                    <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100">
                      <div className="flex items-center gap-3 mb-4">
                        <Zap size={20} className="text-brand-primary" fill="currentColor" />
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Insight</span>
                      </div>
                      <p className="text-lg font-bold text-slate-600 leading-relaxed break-keep italic whitespace-pre-line">
                        {selectedOfflineItem.insight}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-12">
                  <button 
                    onClick={() => setSelectedOfflineItem(null)}
                    className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-lg hover:bg-brand-primary transition-colors"
                  >
                    목록으로 돌아가기
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
