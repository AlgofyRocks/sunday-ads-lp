// BOGO Component - Ultra Compact Version with Fixed Timezone
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

  // Target date: February 1, 2026 at 4:00 PM EST
  // EST is UTC-5, so 4:00 PM EST = 9:00 PM UTC
  const targetDate = new Date("2026-02-01T21:00:00Z");

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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ 
        opacity: isExpired ? 0 : 1, 
        scale: isExpired ? 0.95 : 1
      }}
      transition={{ duration: 0.2 }}
      className={`w-fit rounded-md border border-foreground/20 shadow-sm overflow-hidden ${className}`}
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
          {/* Text and Countdown in one row */}
          <div  className="flex flex-wrap items-center justify-between gap-3">
            {/* Text */}
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <div className="bg-foreground text-white text-[10px] px-1.5 py-0.5 rounded font-bold whitespace-nowrap">
                  BOGO (Buy 1 get 1 the same)
                </div>
              </div>
            </div>

            {/* All time units in one row */}
            <div className="flex items-center gap-2.5 flex-shrink-0">
        <p className="text-xs text-foreground/80 truncate">
        Expiring in
        </p>
              <div className="flex items-center gap-1">
                {/* Days if exists */}
                {timeLeft.days > 0 && (
                  <>
                    <div className="flex flex-col items-center">
                      <div className="bg-white rounded px-1 py-0.5 min-w-[24px] border border-foreground/20">
                        <span className="text-sm font-bold text-foreground font-mono tabular-nums">
                          {timeLeft.days}
                        </span>
                      </div>
                      <span className="text-[9px] text-foreground/60 font-medium">
                        D
                      </span>
                    </div>
                    <span className="text-xs font-bold text-foreground/40 pb-1">:</span>
                  </>
                )}
                
                {/* Hours */}
                <div className="flex flex-col items-center">
                  <div className="bg-white rounded px-1 py-0.5 min-w-[24px] border border-foreground/20">
                    <span className="text-sm font-bold text-foreground font-mono tabular-nums">
                      {formatNumber(timeLeft.hours)}
                    </span>
                  </div>
                  <span className="text-[9px] text-foreground/60 font-medium">
                    H
                  </span>
                </div>
                <span className="text-xs font-bold text-foreground/40 pb-1">:</span>
                
                {/* Minutes */}
                <div className="flex flex-col items-center">
                  <div className="bg-white rounded px-1 py-0.5 min-w-[24px] border border-foreground/20">
                    <span className="text-sm font-bold text-foreground font-mono tabular-nums">
                      {formatNumber(timeLeft.minutes)}
                    </span>
                  </div>
                  <span className="text-[9px] text-foreground/60 font-medium">
                    M
                  </span>
                </div>
                <span className="text-xs font-bold text-foreground/40 pb-1">:</span>
                
                {/* Seconds */}
                <div className="flex flex-col items-center">
                  <div className="bg-white rounded px-1 py-0.5 min-w-[24px] border border-foreground/20">
                    <span className="text-sm font-bold text-foreground font-mono tabular-nums">
                      {formatNumber(timeLeft.seconds)}
                    </span>
                  </div>
                  <span className="text-[9px] text-foreground/60 font-medium">
                    S
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BogoOffer;
