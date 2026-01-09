// BOGO Component
"use client";
import { Product } from "@/types/product";
import { motion } from "motion/react";
import React, { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";

interface BogoBannerProps {
  selectedProduct: Product;
  className?: string;
  onAddToCart?: (product: Product) => void;
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
  onAddToCart,
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [isExpired, setIsExpired] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

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

  const handleAddToCart = async () => {
    if (!onAddToCart) return;
    
    setIsAddingToCart(true);
    try {
      await onAddToCart(selectedProduct);
      // Optional: Show success feedback
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setIsAddingToCart(false);
    }
  };

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
      className={`bg-gradient-to-r from-[#FFE25D] to-[#FFF6D1] rounded-2xl md:rounded-[30px] p-4 md:p-6 lg:p-8 shadow-lg border-2 border-foreground overflow-hidden ${className}`}
    >
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 md:gap-6">
        {/* Left side - Product Image */}
        <div className="flex-shrink-0 order-2 lg:order-1">
          <div className="relative">
            {/* "Buy 1 Get 1" Badge */}
            <div className="absolute -top-2 -left-2 md:-top-3 md:-left-3 bg-foreground text-white rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center text-[10px] md:text-xs font-bold text-center leading-tight z-10">
              BUY 1<br />GET 1
            </div>
            
            {/* Product Image */}
            <motion.div
              key={selectedProduct.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-white/50 to-white/30 rounded-xl md:rounded-2xl p-2 md:p-4 backdrop-blur-sm"
            >
              <img
                src={selectedProduct.images[0]?.src}
                alt={selectedProduct.images[0]?.alt}
                className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 object-contain"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>

        {/* Middle - Offer Details & Countdown */}
        <div className="flex-1 order-1 lg:order-2 text-center lg:text-left min-w-0">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground font-heading uppercase mb-1 md:mb-2 truncate">
            BOGO OFFER
          </h3>
          <p className="text-sm md:text-base text-foreground/80 mb-3 md:mb-4 line-clamp-2">
            Limited time offer! Get a free {selectedProduct.name} with your purchase.
          </p>

          {/* Countdown Timer */}
          <div className="flex flex-col sm:flex-row items-center gap-2 mb-3 md:mb-4">
            <span className="text-sm font-semibold text-foreground/70 whitespace-nowrap">
              Expiring in
            </span>
            <div className="flex items-center justify-center gap-1 sm:gap-2 overflow-x-auto pb-1">
              <TimeBox value={formatNumber(timeLeft.days)} label="Days" />
              <span className="text-xl md:text-2xl font-bold text-foreground">:</span>
              <TimeBox value={formatNumber(timeLeft.hours)} label="Hours" />
              <span className="text-xl md:text-2xl font-bold text-foreground">:</span>
              <TimeBox value={formatNumber(timeLeft.minutes)} label="Mins" />
              <span className="text-xl md:text-2xl font-bold text-foreground">:</span>
              <TimeBox value={formatNumber(timeLeft.seconds)} label="Secs" />
            </div>
          </div>

          <p className="text-xs text-foreground/60 line-clamp-2">
            * Offer valid for one-time purchases only. Not applicable to subscriptions.
          </p>
        </div>

        {/* Right side - Add to Cart Button */}
        <div className="flex-shrink-0 order-3 w-full lg:w-auto">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className="w-full lg:w-auto bg-foreground text-white rounded-xl md:rounded-2xl px-6 md:px-8 py-3 md:py-4 font-bold text-base md:text-lg flex items-center justify-center gap-2 md:gap-3 hover:bg-foreground/90 active:bg-foreground/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg"
          >
            <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
            <span className="whitespace-nowrap">
              {isAddingToCart ? "Adding..." : "Add to Cart"}
            </span>
            {selectedProduct.price && (
              <span className="ml-1 md:ml-2 text-white/90">
                • ${selectedProduct.price.toFixed(2)}
              </span>
            )}
          </motion.button>
          
          {/* BOGO Price Info */}
          <div className="mt-2 text-center lg:text-right">
            <div className="text-sm font-semibold text-foreground">
              <span className="line-through opacity-60 mr-2">
                ${(selectedProduct.price * 2).toFixed(2)}
              </span>
              <span className="text-red-600 font-bold">
                ${selectedProduct.price.toFixed(2)}
              </span>
            </div>
            <p className="text-xs text-foreground/70 mt-1">
              Pay for 1, get 2 items
            </p>
          </div>
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
    <div className="flex flex-col items-center min-w-[45px] md:min-w-[50px]">
      <div className="bg-white rounded-lg px-2 md:px-3 py-1 md:py-2 w-full border-2 border-foreground shadow-sm">
        <span className="text-lg md:text-xl lg:text-2xl font-bold text-foreground font-mono">
          {value}
        </span>
      </div>
      <span className="text-xs text-foreground/70 mt-1 font-medium whitespace-nowrap">
        {label}
      </span>
    </div>
  );
};

export default BogoOffer;
