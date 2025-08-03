"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

import NewsletterImage from "@/../public/lp/newsletter_image.webp";

interface NewsletterSubscriptionProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  placeholderText?: string;
  backgroundImage?: string;
  onSubscribe?: (email: string) => void;
  className?: string;
}

const LPNewsletter: React.FC<NewsletterSubscriptionProps> = ({
  title = "GET THE GOOD VIBES FIRST",
  subtitle = "Be the first to get the tea and enjoy exclusive subscriber perks.",
  buttonText = "SUBSCRIBE",
  placeholderText = "Your email",
  backgroundImage = NewsletterImage.src,
  onSubscribe,
  className = "",
}) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (onSubscribe) {
        await onSubscribe(email);
      } else {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      setIsSubscribed(true);
      setEmail("");
    } catch (error) {
      console.error("Subscription error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubscribed(false);
    setEmail("");
  };

  return (
    <section className={`relative overflow-hidden ${className}`}>
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 px-6 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-start md:text-center ">
          {!isSubscribed ? (
            <>
              {/* Title */}
              <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold font-heading  mb-6  ">
                {title}
              </h2>

              {/* Subtitle */}
              <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
                {subtitle}
              </p>

              {/* Email Subscription Form */}
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto"
              >
                {/* Email Input */}
                <div className="flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={placeholderText}
                    required
                    className="w-full px-6 py-4 text-lg rounded-full border-0 bg-white/95 backdrop-blur-sm placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#ffe25d] transition-all duration-300"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Subscribe Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting || !email}
                  className="bg-[#ffe25d]  text-black font-bold px-8 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105  shadow-lg whitespace-nowrap h-full w-fit"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                      <span>SUBSCRIBING...</span>
                    </div>
                  ) : (
                    buttonText
                  )}
                </Button>
              </form>

              {/* Additional Info */}
              <p className="text-white/70 text-sm mt-6">
                Join thousands of subscribers for exclusive updates, early
                access, and special offers.
              </p>
            </>
          ) : (
            /* Success State */
            <div className="text-center">
              {/* Success Icon */}
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <h3 className="text-white text-3xl md:text-4xl font-bold mb-4">
                Welcome to the Vibe!
              </h3>

              <p className="text-white/90 text-lg mb-8 max-w-lg mx-auto">
                You're all set! Keep an eye on your inbox for exclusive updates
                and early access to new flavors.
              </p>

              <Button
                onClick={resetForm}
                className="bg-white/20 hover:bg-white/30 text-white border border-white/30 px-6 py-3 rounded-full transition-all duration-300"
              >
                Subscribe Another Email
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-16 left-16 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-full blur-xl" />
      <div className="absolute bottom-16 right-16 w-24 h-24 bg-gradient-to-br from-green-400/20 to-transparent rounded-full blur-xl" />
    </section>
  );
};

export default LPNewsletter;
