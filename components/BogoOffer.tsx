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

  // Don't show banner if expired
  if (isExpired) {
    return null;
  }

  // Format numbers to always show 2 digits
  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, "0");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-gradient-to-r from-[#FFE25D] to-[#FFF6D1] rounded-[30px] p-6 md:p-8 shadow-lg border-2 border-foreground ${className}`}
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left side - Product Image */}
        <div className="flex-shrink-0">
          <div className="relative">
            {/* "Buy 1 Get 1" Badge */}
            <div className="absolute -top-3 -left-3 bg-foreground text-white rounded-full w-16 h-16 flex items-center justify-center text-xs font-bold text-center leading-tight z-10">
              BUY 1<br />GET 1
            </div>
            
            {/* Product Image */}
            <motion.div
              key={selectedProduct.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-white/50 to-white/30 rounded-2xl p-4 backdrop-blur-sm"
            >
              <img
                src={selectedProduct.images[0]?.src}
                alt={selectedProduct.images[0]?.alt}
                className="w-32 h-32 md:w-40 md:h-40 object-contain"
              />
            </motion.div>
          </div>
        </div>

        {/* Right side - Offer Details & Countdown */}
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground font-heading uppercase mb-2">
            BOGO (Buy 1 get 1 the same)
          </h3>
          <p className="text-sm md:text-base text-foreground/80 mb-4">
            Limited time offer! Get a free {selectedProduct.name} with your purchase.
          </p>

          {/* Countdown Timer */}
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <span className="text-sm font-semibold text-foreground/70">
              Expiring in
            </span>
            <div className="flex gap-2">
              <TimeBox value={formatNumber(timeLeft.days)} label="Days" />
              <span className="text-2xl font-bold text-foreground">:</span>
              <TimeBox value={formatNumber(timeLeft.hours)} label="Hours" />
              <span className="text-2xl font-bold text-foreground">:</span>
              <TimeBox value={formatNumber(timeLeft.minutes)} label="Mins" />
              <span className="text-2xl font-bold text-foreground">:</span>
              <TimeBox value={formatNumber(timeLeft.seconds)} label="Secs" />
            </div>
          </div>

          <p className="text-xs text-foreground/60">
            * Offer valid for one-time purchases only. Not applicable to subscriptions.
          </p>
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
    <div className="flex flex-col items-center">
      <div className="bg-white rounded-lg px-3 py-2 min-w-[50px] border-2 border-foreground shadow-sm">
        <span className="text-xl md:text-2xl font-bold text-foreground font-mono">
          {value}
        </span>
      </div>
      <span className="text-xs text-foreground/70 mt-1 font-medium">
        {label}
      </span>
    </div>
  );
};

export default BogoOffer;
