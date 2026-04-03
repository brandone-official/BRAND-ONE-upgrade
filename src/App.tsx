import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home.tsx";
import Service from "./pages/Service.tsx";
import Portfolio from "./pages/Portfolio.tsx";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <Router basename="/BRAND-ONE-upgrade/">
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
