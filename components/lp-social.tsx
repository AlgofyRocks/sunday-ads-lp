"use client";
import React from "react";
import { Autoplay, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import Social_One from "@/../public/lp/TestimonialCard-1.webp";
import Social_Two from "@/../public/lp/TestimonialCard-2.webp";
import Social_Three from "@/../public/lp/TestimonialCard-3.webp";
import Social_Four from "@/../public/lp/TestimonialCard-4.webp";
import Social_Five from "@/../public/lp/TestimonialCard-5.webp";
import Social_Six from "@/../public/lp/TestimonialCard-6.webp";
import Social_Seven from "@/../public/lp/TestimonialCard-7.webp";
import Social_Eight from "@/../public/lp/TestimonialCard-8.webp";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";

interface SocialImage {
  id: number;
  src: string;
  alt: string;
  username?: string;
}

interface SocialGallerySectionProps {
  title?: string;
  images?: SocialImage[];
  speed?: number;
  className?: string;
}

const LPSocial: React.FC<SocialGallerySectionProps> = ({
  title = "LOVED BY SOCIAL SIPPERS",
  speed = 8000,
  className = "",
  images = [
    {
      id: 1,
      src: Social_One.src,
      alt: "Friends enjoying drinks outdoors",
      username: "@beachvibes",
    },
    {
      id: 2,
      src: Social_Two.src,
      alt: "Woman by pool with SunDay drink",
      username: "@poolsidelife",
    },
    {
      id: 3,
      src: Social_Three.src,
      alt: "Man on boat with drink",
      username: "@boatlife",
    },
    {
      id: 4,
      src: Social_Four.src,
      alt: "Group at beach bar",
      username: "@beachbar",
    },
    {
      id: 5,
      src: Social_Five.src,
      alt: "Person enjoying drink outdoors",
      username: "@outdoorlife",
    },
    {
      id: 6,
      src: Social_Six.src,
      alt: "Friends celebrating",
      username: "@goodtimes",
    },
    {
      id: 7,
      src: Social_Seven.src,
      alt: "Summer vibes with SunDay",
      username: "@summervibes",
    },
    {
      id: 8,
      src: Social_Eight.src,
      alt: "Relaxing with drink",
      username: "@chillmode",
    },

    // {
    //   id: 9,
    //   src: Social_Nine.src,
    //   alt: "Relaxing with drink",
    //   username: "@chillmode",
    // },
  ],
}) => {
  return (
    <section className={`bg-cream-100 py-16 ${className}`}>
      <div className="max-w-full">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold  uppercase font-heading">
            {title}
          </h2>
        </div>

        {/* Social Images Marquee */}
        <div className="overflow-hidden">
          <Swiper
            modules={[Autoplay, FreeMode]}
            spaceBetween={20}
            slidesPerView="auto"
            freeMode={{
              enabled: true,
              momentum: false,
            }}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
            }}
            speed={speed}
            loop={true}
            centeredSlides={false}
            allowTouchMove={true}
            className="social-gallery-swiper"
            breakpoints={{
              320: {
                spaceBetween: 15,
              },
              640: {
                spaceBetween: 20,
              },
              1024: {
                spaceBetween: 24,
              },
            }}
          >
            {/* Render images multiple times for smooth infinite scroll */}
            {[...images, ...images, ...images].map((image, index) => (
              <SwiperSlide key={`${image.id}-${index}`} className="!w-auto">
                <div className="relative group cursor-pointer">
                  <div className="overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 ">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-64 h-80 md:w-72 md:h-96 object-cover"
                      loading="lazy"
                    />

                    {/* Overlay on hover
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-center justify-center">
                      <div className="text-white text-center">
                        {image.username && (
                          <p className="text-lg font-semibold mb-2">
                            {image.username}
                          </p>
                        )}
                        <div className="flex items-center justify-center space-x-1">
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                          </svg>
                          <span className="text-sm">View on Instagram</span>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Custom styles for smooth infinite scroll */}
      <style jsx global>{`
        .social-gallery-swiper {
          overflow: visible !important;
        }

        .social-gallery-swiper .swiper-wrapper {
          transition-timing-function: linear !important;
        }

        .social-gallery-swiper .swiper-slide {
          flex-shrink: 0;
        }

        /* Pause animation on hover */
        .social-gallery-swiper:hover .swiper-wrapper {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default LPSocial;
