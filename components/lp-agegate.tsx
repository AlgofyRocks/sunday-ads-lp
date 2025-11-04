"use client";
import React, { useState } from "react";
import LogoIcon from "./icons/logo";

interface AgeGateProps {
  onVerified?: () => void;
  className?: string;
}

const AgeGate: React.FC<AgeGateProps> = ({ onVerified, className = "" }) => {
  const [showUnderageMessage, setShowUnderageMessage] = useState(false);
  const [showAgegate, setShowAgegate] = useState(false);
  const [isVerified, setIsVerified] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("ageVerified") === "true";
    }
    return false;
  });

  React.useEffect(() => {
    if (isVerified) {
      setShowAgegate(false);
      if (onVerified) onVerified();
    } else {
      setShowAgegate(true);
    }
  }, [isVerified, onVerified]);

  const handleYes = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("ageVerified", "true");
    }
    setIsVerified(true);
    setShowAgegate(false);
    if (onVerified) onVerified();
  };
  const handleNo = () => {
    setShowUnderageMessage(true);
  };

  return (
    <div
      className={`fixed inset-0 bg-[#00000044] bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 ${className} p-2 transition-opacity duration-300 ${
        showAgegate ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`bg-[#FFF6D1] rounded-2xl shadow-2xl max-w-xl mx-auto text-center px-8 py-10 m-4 transition-transform duration-300 ${
          showAgegate ? "scale-100" : "scale-95"
        }`}
      >
        {/* Logo */}
        <div className="mb-8">
          <LogoIcon className="w-32 h-auto mx-auto" />
        </div>

        <h2 className="text-2xl font-medium text-[#1e3a5f] mb-6">
          Hold up, are you at least 21 years of age?
        </h2>
        {showUnderageMessage ? (
          <p className="text-md text-[#9a0a0a] mb-6">
            This one&apos;s for the 21+ crowd. We&apos;ll be here when the
            time&apos;s right.
          </p>
        ) : (
          ""
        )}

        <div className="flex gap-4 mb-6">
          <button
            onClick={handleYes}
            className="flex-1 bg-[#1e3a5f] text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-[#2a4a6b] transition-colors cursor-pointer"
          >
            YES
          </button>
          <button
            onClick={handleNo}
            className="flex-1 bg-transparent border-2 border-[#1e3a5f] text-[#1e3a5f] py-3 px-6 rounded-full text-lg font-semibold hover:bg-[#1e3a5f] cursor-pointer hover:text-white transition-colors"
          >
            NO
          </button>
        </div>

        <p className="text-sm text-gray-600">
          By entering this website you are agreeing to the{" "}
          <a
            href="/terms"
            className="text-[#1e3a5f] underline hover:no-underline"
          >
            Terms & Conditions
          </a>{" "}
          and{" "}
          <a
            href="/privacy"
            className="text-[#1e3a5f] underline hover:no-underline"
          >
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default AgeGate;
