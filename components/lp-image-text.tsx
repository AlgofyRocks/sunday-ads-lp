"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface FeaturePoint {
  id: string;
  icon: React.ReactNode;
  title: string;
  position: "top" | "middle" | "bottom";
}

interface ImageTextSectionProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  imageUrl?: string;
  imageAlt?: string;
  imagePosition?: "left" | "right";
  backgroundColor?: string;
  onButtonClick?: () => void;
  className?: string;
}

const LPImageTextSection: React.FC<ImageTextSectionProps> = ({
  title = "WHAT'S IN THE CAN",
  description = "Just real black tea, fruit juice from concentrate, cane sugar, and a little something for the canna-curious with a touch of teaHC to take the edge off. No weird stuff, no next-day regret — just your new favorite sip.",
  buttonText = "SHOP NOW",
  buttonHref = "#",
  imageUrl = "/api/placeholder/600/400",
  imageAlt = "SunDay Hibiscus Iced Tea Can",
  imagePosition = "right",
  backgroundColor = "",
  onButtonClick,
  className = "",
}) => {
  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else if (buttonHref !== "#") {
      window.open(buttonHref, "_blank");
    }
  };
  const imageContent = (
    <div className="relative flex items-center justify-center  rounded-xl mb-4 md:mb-0">
      {/* Product Image */}
      <div className="relative z-10">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="max-w-full h-auto object-contain  rounded-4xl"
          style={{ maxHeight: "500px" }}
        />
      </div>
    </div>
  );

  const textContent = (
    <div className="flex flex-col justify-center space-y-8 lg:px-8">
      <div className="flex flex-col justify-center">
        <h2 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight text-center font-heading">
          {title}
        </h2>

        {/* Image Content */}
        <div
          className={cn(
            imagePosition === "left" ? "lg:col-start-1" : "lg:col-start-2",
            "block md:hidden"
          )}
        >
          {imageContent}
        </div>
        <p className="text-md  leading-relaxed mb-8 max-w-lg text-center mx-auto lg:font-medium">
          {description}
        </p>
        <Link
          href="#product"
          className="mx-auto bg-foreground  text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105  max-w-xl cursor-pointer"
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );

  return (
    <section className={`${backgroundColor} py-8 ${className}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
            imagePosition === "left" ? "lg:grid-flow-col-dense" : ""
          }`}
        >
          {/* Text Content */}
          <div
            className={
              imagePosition === "left" ? "lg:col-start-2" : "lg:col-start-1"
            }
          >
            {textContent}
          </div>

          {/* Image Content */}
          <div
            className={cn(
              imagePosition === "left" ? "lg:col-start-1" : "lg:col-start-2",
              "hidden md:block"
            )}
          >
            {imageContent}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LPImageTextSection;
