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
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isExpired, setIsExpired] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const targetDate = new Date("2026-02-01T16:00:00-05:00");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

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
      initial={{ opacity: 0, y: -10 }}
      animate={{ 
        opacity: isExpired ? 0 : 1, 
        y: isExpired ? -10 : 0,
        scale: isExpired ? 0.98 : 1
      }}
      transition={{ duration: 0.3 }}
      className={`bg-gradient-to-r from-[#FFE25D] to-[#FFF6D1] rounded-lg md:rounded-xl border border-foreground/20 shadow-md overflow-hidden ${className}`}
    >
      <div className="flex items-center gap-3 p-3 md:p-4">
        {/* Left side - Badge & Image */}
        <div className="flex-shrink-0 relative">
          {/* Compact BOGO Badge */}
          <div className="absolute -top-1.5 -left-1.5 bg-foreground text-white rounded-full w-8 h-8 flex items-center justify-center text-[8px] font-bold text-center leading-tight z-10 shadow-sm">
            B1G1
          </div>
          
          {/* Compact Product Image */}
          <div className="bg-white/50 rounded-lg p-1.5 border border-white/30">
            <div className="relative w-12 h-12 md:w-14 md:h-14">
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

        {/* Middle - Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-bold text-foreground truncate">
              BOGO Deal Active
            </h3>
            <span className="text-xs bg-foreground text-white px-1.5 py-0.5 rounded-full font-medium">
              Limited
            </span>
          </div>
          
          <p className="text-xs text-foreground/80 mb-2 line-clamp-2">
            Get a free {selectedProduct.name} with your purchase
          </p>

          {/* Compact Countdown */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium text-foreground/70 whitespace-nowrap">
              Ends in:
            </span>
            <div className="flex items-center gap-1">
              <CompactTimeBox value={formatNumber(timeLeft.hours)} label="H" />
              <span className="text-sm font-bold text-foreground/40">:</span>
              <CompactTimeBox value={formatNumber(timeLeft.minutes)} label="M" />
              <span className="text-sm font-bold text-foreground/40">:</span>
              <CompactTimeBox value={formatNumber(timeLeft.seconds)} label="S" />
            </div>
          </div>
        </div>

        {/* Right side - Days if > 0 */}
        {timeLeft.days > 0 && (
          <div className="flex-shrink-0">
            <div className="bg-white rounded-lg px-2 py-1 border border-foreground/20">
              <div className="text-center">
                <div className="text-lg font-bold text-foreground tabular-nums">
                  {timeLeft.days}
                </div>
                <div className="text-[10px] text-foreground/70 uppercase tracking-tight">
                  Days
                </div>
              </div>
            </div>
          </div>
        )}
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
