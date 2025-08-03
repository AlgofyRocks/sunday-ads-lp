"use client";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface CommunityImage {
  id: number;
  src: string;
  alt: string;
}

interface CommunityGallerySectionProps {
  title?: string;
  socialHandle?: string;
  images?: CommunityImage[];
  className?: string;
}

import IgImage1 from "@/../public/lp/ig_1.webp";
import IgImage2 from "@/../public/lp/ig_2.webp";
import IgImage3 from "@/../public/lp/ig_3.webp";
import IgImage4 from "@/../public/lp/ig_4.webp";
import Link from "next/link";

const LPFeed: React.FC<CommunityGallerySectionProps> = ({
  title = "OUR CANNA-CURIOUS COMMUNITY",
  socialHandle = "@drinksunday",
  className = "",
  images = [
    {
      id: 1,
      src: IgImage1.src,
      alt: "Friends toasting with SunDay drinks",
    },
    {
      id: 2,
      src: IgImage2.src,
      alt: "Woman enjoying SunDay outdoors",
    },
    {
      id: 3,
      src: IgImage3.src,
      alt: "SunDay can on counter",
    },
    {
      id: 4,
      src: IgImage4.src,
      alt: "Person holding multiple SunDay cans",
    },
  ],
}) => {
  return (
    <section className={` py-16 px-6 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading uppercase ">
            {title}
          </h2>
          <div className="flex items-center">
            <a
              href={`https://instagram.com/${socialHandle.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className=" font-semibold text-lg transition-colors duration-200 flex items-center group"
            >
              {socialHandle}
              <svg
                className="w-5 h-5 ml-2 transition-transform duration-200 group-hover:scale-110"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((image) => (
            <div key={image.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-80 lg:h-96 object-cover"
                  loading="lazy"
                />

                {/* Overlay on hover */}
                <Link
                  href="https://www.instagram.com/drinksunday/"
                  target="_blank"
                  className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                >
                  <div className="text-white text-center">
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
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Swiper */}
        <div className="md:hidden">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1.2}
            navigation={false}
            pagination={{
              clickable: true,
              bulletClass: "swiper-pagination-bullet !bg-teal-300",
              bulletActiveClass: "swiper-pagination-bullet-active !bg-teal-600",
            }}
            breakpoints={{
              480: {
                slidesPerView: 1.5,
              },
              640: {
                slidesPerView: 2,
              },
            }}
            className="community-mobile-swiper"
          >
            {images.map((image) => (
              <SwiperSlide key={image.id}>
                <div className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-lg shadow-lg">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-80 object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Custom Swiper Styles */}
      <style jsx global>{`
        .community-mobile-swiper .swiper-pagination {
          bottom: -40px;
        }

        .community-mobile-swiper .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          margin: 0 4px;
        }
      `}</style>
    </section>
  );
};

export default LPFeed;
