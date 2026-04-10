import { motion } from "motion/react";
import Footer from "../components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <section className="pt-40 pb-24 border-b border-slate-100">
        <div className="max-w-[1000px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h1 className="text-[40px] md:text-[56px] font-black tracking-tighter text-slate-900">개인정보처리방침</h1>
            <p className="text-slate-500 font-medium">이용자의 소중한 개인정보를 보호하기 위한 방침입니다.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-[1000px] mx-auto px-6 prose prose-slate max-w-none">
          <div className="space-y-12 text-slate-700 leading-relaxed">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">1. 개인정보의 수집 및 이용 목적</h2>
              <p>주식회사 정화앤대영(이하 "회사")은 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.</p>
              <ul className="list-disc pl-5 mt-4 space-y-2">
                <li>서비스 제공 및 상담: 프로젝트 문의 응대, 견적 제공, 서비스 계약 이행</li>
                <li>고객 관리: 서비스 이용에 따른 본인확인, 고지사항 전달</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">2. 수집하는 개인정보의 항목</h2>
              <p>회사는 서비스 제공을 위해 다음과 같은 개인정보를 수집할 수 있습니다.</p>
              <ul className="list-disc pl-5 mt-4 space-y-2">
                <li>필수항목: 성명(또는 담당자명), 연락처(전화번호/이메일), 회사명</li>
                <li>선택항목: 프로젝트 예산, 일정, 참고 URL 등 문의 내용</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">3. 개인정보의 보유 및 이용기간</h2>
              <p>이용자의 개인정보는 원칙적으로 개인정보의 수집 및 이용목적이 달성되면 지체 없이 파기합니다. 단, 관련 법령의 규정에 의하여 보존할 필요가 있는 경우 회사는 아래와 같이 관계법령에서 정한 일정한 기간 동안 회원정보를 보관합니다.</p>
              <ul className="list-disc pl-5 mt-4 space-y-2">
                <li>상담 및 문의 내역: 상담 완료 후 1년</li>
                <li>계약 또는 청약철회 등에 관한 기록: 5년</li>
                <li>소비자의 불만 또는 분쟁처리에 관한 기록: 3년</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">4. 개인정보의 파기절차 및 방법</h2>
              <p>회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다. 전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 파기하며, 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">5. 정보주체의 권리·의무 및 그 행사방법</h2>
              <p>이용자는 언제든지 등록되어 있는 자신의 개인정보를 조회하거나 수정할 수 있으며 회사의 개인정보 처리에 동의하지 않는 경우 동의를 거부하거나 서비스 제한을 요청하실 수 있습니다.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">6. 개인정보 보호책임자</h2>
              <p>회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.</p>
              <div className="bg-slate-50 p-6 rounded-2xl mt-4 space-y-2">
                <p><strong>성명:</strong> 황대영 / 박승현</p>
                <p><strong>직책:</strong> 대표이사</p>
                <p><strong>연락처:</strong> 070-8849-6806</p>
              </div>
            </div>

            <div className="pt-12 border-t border-slate-100">
              <p className="text-sm text-slate-400">공고일자: 2026년 4월 7일 / 시행일자: 2026년 4월 7일</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
