import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Service from "./pages/Service";
// 1. 파일 이름이 소문자라면 ./pages/Home 처럼 소문자로 맞춰줍니다.
import Portfolio from "./pages/Home"; // 👈 만약 Portfolio.tsx가 없다면 임시로 Home을 연결하거나 파일을 만드셔야 해요!
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    // 2. 깃허브 페이지 하위 경로 인식을 위해 basename을 반드시 다시 넣어줘야 합니다!
    <Router basename="/BRAND-ONE-upgrade"> 
      <ScrollToTop />
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/service" element={<Service />} />
            <Route path="/portfolio" element={<Portfolio />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}