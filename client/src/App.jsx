import { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

// Components
import RenaissanceIntro from "./components/RenaissanceIntro";
import Navbar from "./components/Navbar";
import PirateCursor from "./components/PirateCursor";
import ThreeBackground from "./pages/background";
import PageTransitionShimmer from "./components/PageTransitionShimmer";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Home page is eagerly loaded for instant interactive entry
import Home from "./pages/Home";

// Code-split secondary routes on demand (Slashes initial bundle size by 50%+)
const Events = lazy(() => import("./pages/Events"));
const Registration = lazy(() => import("./pages/Registration"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Teams = lazy(() => import("./pages/Teams"));
const Sponsors = lazy(() => import("./pages/Sponsors"));
const Gallery = lazy(() => import("./pages/Gallery"));
const LoginSuccess = lazy(() => import("./pages/LoginSuccess"));

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      {/* Fast NetraAI-style Route Transition Shimmer */}
      <PageTransitionShimmer />

      {/* Interactive Custom Pirate Hook Cursor */}
      <PirateCursor />

      {/* Persistent visual layer shared by every route. */}
      <ThreeBackground />

      {/* 1. NetraAI-style Cinematic Splash Screen */}
      {showIntro && (
        <RenaissanceIntro
          onComplete={handleIntroComplete}
          onSkip={handleIntroComplete}
        />
      )}

      {/* 2. Global Navigation */}
      <Navbar />

      {/* 3. Main Route Views with Suspense Fallback */}
      <div className="relative z-10 min-h-screen bg-transparent text-[#F4EBD9]">
        <Suspense fallback={<div className="min-h-screen bg-transparent" />}>
          <Routes>
            {/* Home / Main Summit Portal */}
            <Route path="/" element={<Home />} />
            <Route path="/udbhav" element={<Navigate to="/" replace />} />

            {/* Sponsors Section */}
            <Route path="/sponsors" element={<Sponsors />} />
            <Route path="/udbhav/sponsors" element={<Sponsors />} />

            {/* Registration */}
            <Route path="/register" element={<Registration />} />
            <Route path="/events/:eventId/register" element={<Registration />} />
            <Route path="/udbhav/events/:eventId/register" element={<Registration />} />

            {/* Events Docket */}
            <Route path="/events" element={<Events />} />
            <Route path="/udbhav/events" element={<Events />} />

            {/* Dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/udbhav/dashboard" element={<Dashboard />} />

            {/* Teams / Crew */}
            <Route path="/teams" element={<Teams />} />
            <Route path="/udbhav/teams" element={<Teams />} />

            {/* Gallery / Chronicles */}
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/udbhav/gallery" element={<Gallery />} />

            {/* Auth Callback */}
            <Route path="/login/success" element={<LoginSuccess />} />
            <Route path="/udbhav/login/success" element={<LoginSuccess />} />

            {/* Fallback to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}