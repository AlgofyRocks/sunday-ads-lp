import React from "react";
import LogoIcon from "./icons/logo";

interface FooterSection {
  title: string;
  link: string;
}

interface FooterProps {
  logoText?: string;
  sections?: FooterSection[];
  disclaimerText?: string;
  copyrightText?: string;
  termsLink?: string;
  privacyLink?: string;
  className?: string;
}

const LPFooter: React.FC<FooterProps> = ({
  logoText = "SUNDAY",
  sections = [
    {
      title: "HOW SUNDAY™ FEELS",
      link: "#how-it-feels",
    },
    {
      title: "WHAT'S IN THE CAN",
      link: "#whats-in-the-can",
    },
    {
      title: "FAQS",
      link: "#faqs",
    },
  ],
  disclaimerText = "MUST BE 21+ TO PURCHASE. THE PRODUCTS DISPLAYED AND AVAILABLE FOR SALE ON THIS SITE (1) ARE HEMP-DERIVED CANNABINOID PRODUCTS THAT COMPLY WITH THE FEDERAL LEGAL LIMIT CONTAINING LESS THAN ZERO AND THREE-TENTHS (0.3%) DELTA-9 TETRAHYDROCANNABINOL (THC), (2) DO NOT CLAIM TO DIAGNOSE, TREAT, MITIGATE, CURE, OR PREVENT ANY DISEASE, AND (3) HAVE NOT BEEN EVALUATED OR APPROVED BY THE UNITED STATES FOOD AND DRUG ADMINISTRATION (FDA) FOR SAFETY, EFFICACY, EFFECTIVENESS, OR QUALITY.",
  copyrightText = "© 2025, SunDay. All rights reserved. See our",
  termsLink = "/terms",
  privacyLink = "/privacy",
  className = "",
}) => {
  // Sun/star logo icon
  const SunLogo = () => (
    <div className="flex items-center justify-center mb-8">
      <div className="relative">
        {/* Main star/sun icon */}
        <svg
          className="w-12 h-12 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l2.09 6.26L20 10l-5.91 2.09L12 18l-2.09-5.91L4 10l5.91-2.09L12 2z" />
          <path d="M12 8l1.09 3.26L16 12l-2.91 1.09L12 16l-1.09-2.91L8 12l2.91-1.09L12 8z" />
        </svg>

        {/* Brand name */}
        <div className="mt-3">
          <h2 className="text-white text-2xl font-bold tracking-wider">
            {logoText}
          </h2>
          {/* Underline */}
          <div className="w-12 h-0.5 bg-white mt-1 mx-auto"></div>
        </div>
      </div>
    </div>
  );

  return (
    <footer className={`bg-[#153d50] text-white py-16 px-6 ${className}`}>
      <div className="max-w-6xl mx-auto">
        {/* Logo Section */}
        <LogoIcon className="w-28 h-28 fill-white text-white mx-auto" />

        {/* Navigation Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
          {sections.map((section, index) => (
            <div key={index} className="text-center">
              <a
                href={section.link}
                className="text-white font-bold text-sm uppercase tracking-wider mb-4  pb-2"
              >
                {section.title}
              </a>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className=" pt-8 mb-6">
          <p className="text-white/70 text-xs leading-relaxed text-center max-w-5xl mx-auto">
            {disclaimerText}
          </p>
        </div>

        {/* Copyright and Legal Links */}
        <div className="text-center">
          <p className="text-white/70 text-xs">
            {copyrightText}{" "}
            <a
              href={termsLink}
              className="text-white/80 hover:text-white underline transition-colors duration-200"
            >
              Terms & Conditions
            </a>{" "}
            and{" "}
            <a
              href={privacyLink}
              className="text-white/80 hover:text-white underline transition-colors duration-200"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>

      {/* Background Pattern (Optional) */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 border border-white/20 rounded-full"></div>
        <div className="absolute top-20 right-20 w-16 h-16 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-12 h-12 border border-white/20 rounded-full"></div>
      </div>
    </footer>
  );
};

export default LPFooter;
