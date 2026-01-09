// BOGO Component
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

  // Countdown target: February 1, 2026 at 4:00 PM EST
  const targetDate = new Date("2026-02-01T16:00:00-05:00"); // EST is UTC-5

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

    // Calculate immediately
    calculateTimeLeft();

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  // Smooth exit animation when expired
  useEffect(() => {
    if (isExpired) {
      const timer = setTimeout(() => setIsVisible(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isExpired]);

  // Don't render if expired and animation completed
  if (!isVisible) {
    return null;
  }

  // Format numbers to always show 2 digits
  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, "0");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ 
        opacity: isExpired ? 0 : 1, 
        y: isExpired ? -20 : 0,
        scale: isExpired ? 0.95 : 1
      }}
      transition={{ 
        duration: 0.5,
        opacity: { duration: isExpired ? 0.3 : 0.5 }
      }}
      className={`bg-gradient-to-r from-[#FFE25D] to-[#FFF6D1] rounded-xl md:rounded-2xl lg:rounded-[30px] p-4 md:p-6 lg:p-8 shadow-lg border-2 border-foreground overflow-hidden ${className}`}
    >
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 md:gap-6 lg:gap-8">
        {/* Left side - Product Image */}
        <div className="flex-shrink-0 w-full lg:w-auto">
          <div className="relative mx-auto lg:mx-0" style={{ maxWidth: 'fit-content' }}>
            {/* "Buy 1 Get 1" Badge */}
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="absolute -top-2 -left-2 md:-top-3 md:-left-3 bg-foreground text-white rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center text-[10px] md:text-xs font-bold text-center leading-tight z-10 shadow-lg"
            >
              BUY 1<br />GET 1
            </motion.div>
            
            {/* Product Image */}
            <motion.div
              key={selectedProduct.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-white/50 to-white/30 rounded-lg md:rounded-xl lg:rounded-2xl p-3 md:p-4 backdrop-blur-sm border border-white/20"
            >
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40">
                <img
                  src={selectedProduct.images[0]?.src}
                  alt={selectedProduct.images[0]?.alt || selectedProduct.name}
                  className="w-full h-full object-contain"
                  loading="lazy"
                  onError={(e) => {
                    // Fallback if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement!.innerHTML = `
                      <div class="w-full h-full flex items-center justify-center bg-white/20 rounded-lg">
                        <span class="text-foreground/50 text-sm font-medium">${selectedProduct.name}</span>
                      </div>
                    `;
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right side - Offer Details & Countdown */}
        <div className="flex-1 min-w-0 text-center lg:text-left">
          <motion.h3 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground font-heading uppercase mb-1 md:mb-2 break-words"
          >
            BOGO DEAL
          </motion.h3>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-sm md:text-base text-foreground/80 mb-3 md:mb-4 lg:mb-5 leading-relaxed"
          >
            Limited time offer! Get a free {selectedProduct.name} with your purchase.
          </motion.p>

          {/* Countdown Timer */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-2 mb-3 md:mb-4"
          >
            <div className="text-sm font-semibold text-foreground/70 mb-2">
              Offer expires in:
            </div>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1 sm:gap-2">
              <TimeBox value={formatNumber(timeLeft.days)} label="Days" />
              <Separator />
              <TimeBox value={formatNumber(timeLeft.hours)} label="Hours" />
              <Separator />
              <TimeBox value={formatNumber(timeLeft.minutes)} label="Minutes" />
              <Separator />
              <TimeBox value={formatNumber(timeLeft.seconds)} label="Seconds" />
            </div>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="text-xs md:text-sm text-foreground/60 italic max-w-prose mx-auto lg:mx-0"
          >
            * Offer valid for one-time purchases only. Not applicable to subscriptions or combined with other offers.
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

// Time Box Component
const TimeBox: React.FC<{ value: string; label: string }> = ({
  value,
  label,
}) => {
  return (
    <div className="flex flex-col items-center min-w-[50px] sm:min-w-[55px] md:min-w-[60px]">
      <div className="bg-white rounded-lg px-3 py-2 w-full border-2 border-foreground shadow-sm">
        <span className="text-lg sm:text-xl md:text-2xl font-bold text-foreground font-mono tabular-nums">
          {value}
        </span>
      </div>
      <span className="text-xs text-foreground/70 mt-1 font-medium uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
};

// Separator Component
const Separator: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <span className="text-xl md:text-2xl font-bold text-foreground/40">:</span>
    </div>
  );
};

export default BogoOffer;
