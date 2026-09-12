import  { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RenaissanceIntro from "./components/RenaissanceIntro";
import PirateCursor from "./components/PirateCursor";
import Navbar from "./components/Navbar";
import ThreeBackground from "./pages/background";

// Pages
import Home from "./pages/Home";
import Events from "./pages/Events";
import Registration from "./pages/Registration";
import Dashboard from "./pages/Dashboard";
import Teams from "./pages/Teams";
import Sponsors from "./pages/Sponsors";
import Gallery from "./pages/Gallery";
import LoginSuccess from "./pages/LoginSuccess";

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  return (
    <BrowserRouter>
      {/* Persistent visual layer shared by every route. */}
      <ThreeBackground />

      {/* 1. NetraAI-style Cinematic Splash Screen */}
      {showIntro && (
        <RenaissanceIntro
          onComplete={handleIntroComplete}
          onSkip={handleIntroComplete}
        />
      )}

      {/* 2. Realistic Pirate Sword Cursor */}
      <PirateCursor />

      {/* 3. Global Navigation */}
      <Navbar />


      {/* 5. Main Route Views */}
      <div className="relative z-10 min-h-screen bg-[#050B14]/80 text-[#F4EBD9]">
        <Routes>
          {/* Main Summit Portal */}
          <Route path="/" element={<Home />} />
          <Route path="/udbhav" element={<Navigate to="/" replace />} />

          {/* Events Docket */}
          <Route path="/events" element={<Events />} />
          <Route path="/udbhav/events" element={<Events />} />

          {/* Registration */}
          <Route path="/register" element={<Registration />} />
          <Route path="/events/:eventId/register" element={<Registration />} />
          <Route path="/udbhav/events/:eventId/register" element={<Registration />} />

          {/* Captain's Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/udbhav/dashboard" element={<Dashboard />} />

          {/* The Crew / Teams */}
          <Route path="/teams" element={<Teams />} />
          <Route path="/udbhav/teams" element={<Teams />} />

          {/* Alliances / Sponsors */}
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/udbhav/sponsors" element={<Sponsors />} />

          {/* Chronicles / Gallery */}
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/udbhav/gallery" element={<Gallery />} />

          {/* Auth Callback */}
          <Route path="/login/success" element={<LoginSuccess />} />
          <Route path="/udbhav/login/success" element={<LoginSuccess />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
