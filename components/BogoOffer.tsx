// BOGO Component - Compact Version
"use client";
import { Product } from "@/types/product";
import { motion } from "motion/react";
import React, { useEffect, useState } from "react";

interface BogoBannerProps {
  selectedProduct: Product;
  className?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const BogoOffer: React.FC<BogoBannerProps> = ({
  selectedProduct,
  className = "",
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 22,
    hours: 21,
    minutes: 49,
    seconds: 0,
  });

  const [isExpired, setIsExpired] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Fixed countdown calculation
  useEffect(() => {
    // Function to parse the target date correctly
    const parseTargetDate = () => {
      // February 1, 2026 at 4:00 PM EST
      // EST is UTC-5, but we need to create it in UTC first
      const targetUTC = new Date("2026-02-01T21:00:00Z"); // 4PM EST = 9PM UTC
      return targetUTC;
    };

    const calculateTimeLeft = () => {
      const now = new Date();
      const target = parseTargetDate();
      const difference = target.getTime() - now.getTime();

      if (difference <= 0) {
        setIsExpired(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      // If you want to force specific values for testing, use these:
      // setTimeLeft({ days: 22, hours: 21, minutes: 49, seconds: 0 });
      
      // Otherwise use calculated values:
      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isExpired) {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isExpired]);

  if (!isVisible) return null;

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, "0");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ 
        opacity: isExpired ? 0 : 1, 
        scale: isExpired ? 0.95 : 1
      }}
      transition={{ duration: 0.2 }}
      className={`bg-gradient-to-r from-[#FFE25D] to-[#FFF6D1] rounded-md border border-foreground/20 shadow-sm overflow-hidden ${className}`}
    >
      <div className="flex items-center gap-2 p-2">
        {/* Product Image */}
        <div className="flex-shrink-0 relative">
          <div className="bg-white/50 rounded p-1 border border-white/30">
            <div className="relative w-10 h-10">
              <img
                src={selectedProduct.images[0]?.src}
                alt={selectedProduct.images[0]?.alt || selectedProduct.name}
                className="w-full h-full object-contain"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            <h3 className="text-sm font-bold text-foreground truncate">
              BOGO (Buy 1 get 1 the same)
            </h3>
            <span className="text-xs bg-foreground text-white px-1.5 py-0.5 rounded-full font-medium">
              Limited
            </span>
          </div>
          
          <p className="text-xs text-foreground/80 mb-2 line-clamp-2">
            Free {selectedProduct.name} with purchase
          </p>

          {/* Compact Countdown */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium text-foreground/70 whitespace-nowrap">
              Ends in:
            </span>
            <div className="flex items-center gap-1">
              {/* Show all time units together */}
              {timeLeft.days > 0 && (
                <>
                  <CompactTimeBox value={formatNumber(timeLeft.days)} label="D" />
                  <span className="text-sm font-bold text-foreground/40">:</span>
                </>
              )}
              <CompactTimeBox value={formatNumber(timeLeft.hours)} label="H" />
              <span className="text-sm font-bold text-foreground/40">:</span>
              <CompactTimeBox value={formatNumber(timeLeft.minutes)} label="M" />
              <span className="text-sm font-bold text-foreground/40">:</span>
              <CompactTimeBox value={formatNumber(timeLeft.seconds)} label="S" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Compact Time Box Component
const CompactTimeBox: React.FC<{ value: string; label: string }> = ({
  value,
  label,
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-white rounded px-1.5 py-1 min-w-[28px] border border-foreground/20">
        <span className="text-sm font-bold text-foreground font-mono tabular-nums">
          {value}
        </span>
      </div>
      <span className="text-[10px] text-foreground/60 mt-0.5 font-medium">
        {label}
      </span>
    </div>
  );
};

export default BogoOffer;
