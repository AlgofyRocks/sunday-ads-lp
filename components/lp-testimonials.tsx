"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import React from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// TypeScript interfaces
interface Testimonial {
  id: number;
  rating: number;
  text: string;
  author: string;
  verified: boolean;
}

interface StarRatingProps {
  rating: number;
  maxRating?: number;
}

interface VerifiedBadgeProps {
  verified: boolean;
}

interface TestimonialsSectionProps {
  title?: string;
  testimonials?: Testimonial[];
  autoplayDelay?: number;
  className?: string;
}

// Star rating component with TypeScript
const StarRating: React.FC<StarRatingProps> = ({ rating, maxRating = 5 }) => {
  return (
    <div
      className="flex justify-center mb-2 gap-1"
      role="img"
      aria-label={`${rating} out of ${maxRating} stars`}
    >
      {Array.from({ length: maxRating }, (_, index) => (
        <Star
          key={index}
          className={`w-4 h-4 ${
            index < rating
              ? "text-[#ffe25d] fill-[#ffe25d]"
              : "text-white/30 fill-white/30"
          }`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
};

// Verified badge component with TypeScript
const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({ verified }) => {
  if (!verified) return null;

  return (
    <div className="flex items-center justify-center ">
      <Badge variant="secondary" className=" text-white  gap-2 bg-transparent">
        <svg
          width="20"
          height="19"
          viewBox="0 0 20 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.1376 9.55834C19.1376 14.6212 15.0333 18.7255 9.97045 18.7255C4.9076 18.7255 0.803345 14.6212 0.803345 9.55834C0.803345 4.49549 4.9076 0.391235 9.97045 0.391235C15.0333 0.391235 19.1376 4.49549 19.1376 9.55834ZM14.5888 6.08592C14.2531 5.7503 13.709 5.7503 13.3734 6.08592C13.3653 6.09403 13.3576 6.10261 13.3506 6.11163L9.37161 11.1818L6.97267 8.78283C6.63704 8.44721 6.09289 8.44721 5.75727 8.78283C5.42165 9.11846 5.42165 9.66261 5.75727 9.99823L8.7898 13.0308C9.12543 13.3664 9.66958 13.3664 10.0052 13.0308C10.0127 13.0233 10.0197 13.0154 10.0263 13.0072L14.601 7.28888C14.9243 6.95238 14.9203 6.41743 14.5888 6.08592Z"
            fill="white"
          />
        </svg>
        Verified Buyer
      </Badge>
    </div>
  );
};

// Main testimonials section component
const LPTestimonials: React.FC<TestimonialsSectionProps> = ({
  title = '"High" Praise',
  autoplayDelay = 5000,
  className = "",
  testimonials = [
    {
      id: 1,
      rating: 5,
      text: "FINALLY! A delicious functional drink that isn't a seltzer. I loved the tea options when I was still drinking b**ze and am ecstatic someone finally made them.",
      author: "John S.",
      verified: true,
    },
    {
      id: 2,
      rating: 5,
      text: "Very glad I tried the variety pack. To be honest, I've never ordered something with hibiscus before... now it's my favorite flavor!!",
      author: "Andrea S.",
      verified: true,
    },
    {
      id: 3,
      rating: 5,
      text: "I wasn't even looking for a health conscious option (I just love teas) but accidentally found one! Only 30 calories and 8g of sugar but tastes better than tea options I've tried in the b***ze realm with 2x those values! Thank you SunDay!",
      author: "Abby P.",
      verified: true,
    },
  ],
}) => {
  return (
    <section
      className={`bg-[#75af87] py-16 pb-8 px-6 ${className} border-none mb-0`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb:mb-12 mb-4">
          <h2 className="text-5xl md:text-5xl font-bold text-white uppercase font-heading">
            {title}
          </h2>
        </div>

        {/* Testimonials Swiper */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation={true}
          pagination={{
            clickable: true,
            bulletClass: "swiper-pagination-bullet !bg-white/50",
            bulletActiveClass: "swiper-pagination-bullet-active !bg-white",
          }}
          autoplay={{
            delay: autoplayDelay,
            disableOnInteraction: false,
          }}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="testimonials-swiper h-[380px]  md:h-auto"
          role="region"
          aria-label="Customer testimonials carousel"
        >
          {testimonials.map((testimonial: Testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <Card className="bg-transparent border-2 border-white h-[330px] shadow-none   duration-300">
                <CardContent className="p-8 h-full flex flex-col items-start justify-center">
                  {/* Star Rating */}
                  <StarRating rating={testimonial.rating} />

                  {/* Testimonial Text */}
                  <blockquote className="text-white text-start flex-grow mb-6 italic">
                    <p className="text-md leading-relaxed">
                      "{testimonial.text}"
                    </p>
                  </blockquote>

                  {/* Author */}
                  <div className="text-center flex flex-row items-center justify-start gap-2">
                    <cite className="text-white font-semibold text-md not-italic">
                      {testimonial.author}
                    </cite>

                    {/* Verified Badge */}
                    <VerifiedBadge verified={testimonial.verified} />
                  </div>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default LPTestimonials;
