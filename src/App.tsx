import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Service from "./pages/Service";

export default function App() {
  return (
    <Router basename="/BRAND-ONE-upgrade"> 
      <div className="min-h-screen bg-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/service" element={<Service />} />
          <Route path="/portfolio" element={<div className="min-h-screen flex items-center justify-center pt-24 text-2xl font-bold">Portfolio Page (Coming Soon)</div>} />
        </Routes>
      </div>
    </Router>
  );
}