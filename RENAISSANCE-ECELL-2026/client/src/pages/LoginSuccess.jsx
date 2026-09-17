import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaAnchor } from "react-icons/fa";

export default function LoginSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 1200);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-transparent text-[#F4EBD9] flex flex-col items-center justify-center p-4">
      <div className="relative flex items-center justify-center mb-6">
        <div className="w-20 h-20 rounded-full border-2 border-dashed border-[#D4AF37] animate-spin" />
        <FaAnchor size={28} className="text-[#D4AF37] absolute" />
      </div>
      <h2 className="font-cinzel text-2xl font-bold text-[#F4EBD9] mb-2 tracking-wide">
        SYNCHRONIZING CAPTAIN'S LOG
      </h2>
      <p className="text-xs font-mono text-[#0EA5E9] tracking-widest uppercase">
        Initializing clearance credentials...
      </p>
    </div>
  );
}
