import { motion } from "motion/react";
import Footer from "../components/Footer";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white">
      <section className="pt-40 pb-24 border-b border-slate-100">
        <div className="max-w-[1000px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h1 className="text-[40px] md:text-[56px] font-black tracking-tighter text-slate-900">이용약관</h1>
            <p className="text-slate-500 font-medium">BRAND ONE 서비스 이용을 위한 약관입니다.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-[1000px] mx-auto px-6 prose prose-slate max-w-none">
          <div className="space-y-12 text-slate-700 leading-relaxed">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">제 1 조 (목적)</h2>
              <p>본 약관은 주식회사 정화앤대영(이하 "회사")이 운영하는 BRAND ONE 웹사이트(이하 "사이트")에서 제공하는 인터넷 관련 서비스(이하 "서비스")를 이용함에 있어 회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">제 2 조 (용어의 정의)</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>"이용자"란 사이트에 접속하여 본 약관에 따라 회사가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.</li>
                <li>"서비스"란 회사가 사이트를 통해 이용자에게 제공하는 브랜드 컨설팅, 디자인, 마케팅 전략 수립 등의 제반 서비스를 의미합니다.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">제 3 조 (약관의 명시와 개정)</h2>
              <p>회사는 본 약관의 내용을 이용자가 쉽게 알 수 있도록 사이트의 초기 서비스 화면에 게시합니다. 회사는 관련 법령을 위배하지 않는 범위에서 본 약관을 개정할 수 있습니다.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">제 4 조 (서비스의 제공 및 변경)</h2>
              <p>회사는 다음과 같은 업무를 수행합니다:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>브랜드 전략 및 컨설팅 서비스 제공</li>
                <li>웹사이트 제작 및 디자인 서비스 제공</li>
                <li>콘텐츠 제작 및 마케팅 대행 서비스 제공</li>
                <li>기타 회사가 정하는 업무</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">제 5 조 (서비스 이용의 제한)</h2>
              <p>회사는 다음 각 호에 해당하는 경우 서비스 이용을 제한하거나 중지할 수 있습니다:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>서비스 설비의 보수 등 공사로 인한 부득이한 경우</li>
                <li>전기통신사업법에 규정된 기간통신사업자가 전기통신 서비스를 중지했을 경우</li>
                <li>기타 불가항력적 사유가 있는 경우</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">제 6 조 (회사의 의무)</h2>
              <p>회사는 법령과 본 약관이 금지하거나 공서양속에 반하는 행위를 하지 않으며 본 약관이 정하는 바에 따라 지속적이고, 안정적으로 서비스를 제공하는 데 최선을 다하여야 합니다.</p>
            </div>

            <div className="pt-12 border-t border-slate-100">
              <p className="text-sm text-slate-400">시행일자: 2026년 4월 7일</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
