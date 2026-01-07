"use client";
import NewsletterImage from "@/../public/lp/newsletter_image.webp";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState } from "react";

interface NewsletterSubscriptionProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  placeholderText?: string;
  backgroundImage?: string;
  onSubscribe?: (email: string) => void;
  className?: string;
  requireGDPRConsent?: boolean;
  privacyPolicyUrl?: string;
  termsUrl?: string;
  klaviyoPublicKey?: string; // 6-character public API key for client-side
  klaviyoListId?: string; // List ID to subscribe users to
  useServerSide?: boolean; // Whether to use server-side API route (default: true)
}

// Rate limiting for client-side protection
class RateLimiter {
  private attempts = new Map<string, number[]>();

  checkRate(identifier: string, limit = 5, windowMs = 900000): boolean {
    // 15 minutes
    const now = Date.now();
    const userAttempts = this.attempts.get(identifier) || [];

    // Clean old attempts
    const recentAttempts = userAttempts.filter((time) => now - time < windowMs);

    if (recentAttempts.length >= limit) {
      return false; // Rate limited
    }

    recentAttempts.push(now);
    this.attempts.set(identifier, recentAttempts);
    return true; // Allowed
  }
}

const rateLimiter = new RateLimiter();

// Input sanitization
const sanitizeInput = (input: string): string => {
  if (typeof input !== "string") return "";
  return input
    .trim()
    .replace(/[<>"']/g, "")
    .substring(0, 255);
};

// Enhanced email validation
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return !!email && emailRegex.test(email) && email.length <= 100;
};

const LPNewsletter: React.FC<NewsletterSubscriptionProps> = ({
  title = "GET THE GOOD VIBES FIRST",
  subtitle = "Be the first to get the tea and enjoy exclusive subscriber perks.",
  buttonText = "SUBSCRIBE",
  placeholderText = "Your email",
  backgroundImage = NewsletterImage.src,
  onSubscribe,
  className = "",
  requireGDPRConsent = true,
  privacyPolicyUrl = "/privacy-policy",
  termsUrl = "/terms",
  klaviyoPublicKey, // Pass your 6-character public key
  klaviyoListId, // Pass your list ID
  useServerSide = true, // Default to server-side for security
}) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [emailConsent, setEmailConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});

  // Client-side validation
  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!validateEmail(email)) {
      errors.email = "Valid email address required (max 100 characters)";
    }

    if (firstName && (firstName.length < 2 || firstName.length > 50)) {
      errors.firstName = "First name must be 2-50 characters";
    }

    if (requireGDPRConsent && !emailConsent) {
      errors.consent = "Please consent to receive email communications";
    }

    return errors;
  };

  // Analytics tracking
  const trackEvent = (eventType: string, additionalData: any = {}) => {
    try {
      // Google Analytics 4
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", eventType, {
          event_category: "Newsletter",
          event_label: "LP Newsletter Form",
          custom_parameter_1: "landing_page",
          ...additionalData,
        });
      }

      // Klaviyo tracking (if available)
      if (typeof window !== "undefined" && (window as any).klaviyo) {
        (window as any).klaviyo.track(`Newsletter ${eventType}`, {
          form_name: "LP Newsletter Form",
          timestamp: new Date().toISOString(),
          ...additionalData,
        });
      }
    } catch (error) {
      console.warn("Analytics tracking failed:", error);
    }
  };

  // Client-side Klaviyo subscription (less secure, but works without API route)
  const subscribeToKlaviyoClient = async (userData: any): Promise<any> => {
    if (!klaviyoPublicKey) {
      throw new Error(
        "Klaviyo public API key is required for client-side integration"
      );
    }

    // Correct client subscription API payload structure based on working examples
    const subscriptionPayload: any = {
      data: {
        type: "subscription",
        attributes: {
          profile: {
            data: {
              type: "profile",
              attributes: {
                email: userData.email,
                first_name: userData.firstName || "",
                properties: {
                  signup_source: userData.source,
                  form_type: userData.formType,
                  signup_date: userData.timestamp,
                },
              },
            },
          },
          custom_source: userData.source || "Website Newsletter",
        },
      },
    };

    // Add list relationship if list ID is provided (at same level as attributes)
    if (klaviyoListId) {
      subscriptionPayload.data.relationships = {
        list: {
          data: {
            type: "list",
            id: klaviyoListId,
          },
        },
      };
    }

    const response = await fetch(
      `https://a.klaviyo.com/client/subscriptions/?company_id=${klaviyoPublicKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          revision: "2023-12-15",
        },
        body: JSON.stringify(subscriptionPayload),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.errors?.[0]?.detail ||
          `HTTP ${response.status}: ${response.statusText}`
      );
    }

    // Klaviyo client endpoints often return 202 with empty body for successful requests
    if (
      response.status === 202 ||
      response.headers.get("content-length") === "0"
    ) {
      return { success: true, status: response.status };
    }

    // Only try to parse JSON if there's content
    try {
      return await response.json();
    } catch (error) {
      // If JSON parsing fails but response was successful, return success
      return { success: true, status: response.status };
    }
  };

  // Server-side subscription with retry logic
  const subscribeWithRetry = async (
    userData: any,
    maxRetries = 3
  ): Promise<any> => {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const response = await fetch("/api/klaviyo/subscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(userData),
        });

        if (response.status === 429) {
          const retryAfter = response.headers.get("Retry-After");
          const delay = retryAfter
            ? parseInt(retryAfter) * 1000
            : Math.min(1000 * Math.pow(2, attempt), 10000);

          await new Promise((resolve) => setTimeout(resolve, delay));
          continue;
        }

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.error || `HTTP ${response.status}: ${response.statusText}`
          );
        }

        return await response.json();
      } catch (error) {
        if (attempt === maxRetries) throw error;

        const delay =
          Math.min(1000 * Math.pow(2, attempt), 10000) + Math.random() * 1000;
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      trackEvent("Form_Validation_Error", { errors: Object.keys(errors) });
      return;
    }

    setValidationErrors({});

    // Rate limiting check
    const userIdentifier = email.toLowerCase();
    if (!rateLimiter.checkRate(userIdentifier)) {
      setError(
        "Too many attempts. Please wait 15 minutes before trying again."
      );
      trackEvent("Rate_Limited", { email: userIdentifier });
      return;
    }

    setIsSubmitting(true);
    setError(null);

    trackEvent("Form_Submit_Started", {
      has_first_name: !!firstName,
      consent_given: emailConsent,
    });

    try {
      // Sanitize inputs
const sanitizedData = {
  email: sanitizeInput(email).toLowerCase(),
  firstName: firstName ? sanitizeInput(firstName) : "",
  emailConsent,
  source: "website_newsletter",
  formType: "landing_page",
  timestamp: typeof window !== "undefined" ? new Date().toISOString() : "", // ✅ Safe
  userAgent:
    typeof window !== "undefined" ? window.navigator.userAgent : "",
};

      if (onSubscribe) {
        // Use custom onSubscribe function if provided
        await onSubscribe(sanitizedData.email);
      } else if (useServerSide) {
        // Use server-side API route (recommended)
        await subscribeWithRetry(sanitizedData);
      } else {
        // Use client-side integration (requires public key)
        await subscribeToKlaviyoClient(sanitizedData);
      }

      setIsSubscribed(true);
      setEmail("");
      setFirstName("");
      setEmailConsent(false);

      trackEvent("Form_Submit_Success", {
        email_domain: sanitizedData.email.split("@")[1],
      });
    } catch (error) {
      console.error("Subscription error:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";

      setError(errorMessage);
      trackEvent("Form_Submit_Error", {
        error_message: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubscribed(false);
    setEmail("");
    setFirstName("");
    setEmailConsent(false);
    setError(null);
    setValidationErrors({});
    trackEvent("Form_Reset");
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
        <div className="max-w-4xl mx-auto text-start md:text-center">
          {!isSubscribed ? (
            <>
              {/* Title */}
              <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6">
                {title}
              </h2>

              {/* Subtitle */}
              <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
                {subtitle}
              </p>

              {/* Email Subscription Form */}
              <form
                onSubmit={handleSubmit}
                className="max-w-2xl mx-auto space-y-4"
              >
                {/* Email and First Name Inputs */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Email Input */}
                  <div className="flex-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={placeholderText}
                      required
                      maxLength={100}
                      className={`w-full px-6 py-4 text-lg rounded-full border-0 bg-white/95 backdrop-blur-sm placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#ffe25d] transition-all duration-300 ${
                        validationErrors.email ? "ring-2 ring-red-500" : ""
                      }`}
                      disabled={isSubmitting}
                    />
                    {validationErrors.email && (
                      <p className="text-red-200 text-sm mt-1 px-2">
                        {validationErrors.email}
                      </p>
                    )}
                  </div>

                  {/* First Name Input */}
                  <div className="flex-1">
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First name (optional)"
                      maxLength={50}
                      className={`w-full px-6 py-4 text-lg rounded-full border-0 bg-white/95 backdrop-blur-sm placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#ffe25d] transition-all duration-300 ${
                        validationErrors.firstName ? "ring-2 ring-red-500" : ""
                      }`}
                      disabled={isSubmitting}
                    />
                    {validationErrors.firstName && (
                      <p className="text-red-200 text-sm mt-1 px-2">
                        {validationErrors.firstName}
                      </p>
                    )}
                  </div>
                </div>

                {/* GDPR Consent Checkbox */}
                {requireGDPRConsent && (
                  <div className="text-left">
                    <label className="flex items-start space-x-3 text-white/90 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={emailConsent}
                        onChange={(e) => setEmailConsent(e.target.checked)}
                        className="mt-0.5 w-4 h-4 text-[#ffe25d] bg-white/20 border-white/30 rounded focus:ring-[#ffe25d] focus:ring-2"
                        disabled={isSubmitting}
                      />
                      <span>
                        I consent to receive email marketing communications from
                        Sunday™. By subscribing, you agree to our{" "}
                        <a
                          href={privacyPolicyUrl}
                          className="text-[#ffe25d] hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Privacy Policy
                        </a>{" "}
                        and{" "}
                        <a
                          href={termsUrl}
                          className="text-[#ffe25d] hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Terms of Service
                        </a>
                        .
                      </span>
                    </label>
                    {validationErrors.consent && (
                      <p className="text-red-200 text-sm mt-1">
                        {validationErrors.consent}
                      </p>
                    )}
                  </div>
                )}

                {/* Subscribe Button */}
                <div className="flex justify-center">
                  <Button
                    type="submit"
                    disabled={
                      isSubmitting ||
                      !email ||
                      (requireGDPRConsent && !emailConsent)
                    }
                    className="bg-[#ffe25d] text-black font-bold px-8 py-6 text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg whitespace-nowrap cursor-pointer"
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
                </div>
              </form>

              {/* Error Message */}
              {error && (
                <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg max-w-2xl mx-auto">
                  <p className="text-red-100 text-sm">{error}</p>
                </div>
              )}

              {/* Additional Info */}
              <p className="text-white/70 text-sm mt-6">
                Be the first to get the tea with 20% off
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
                You&apos;re In! Let the SunDay™ Begin.
              </h3>
              <p className="text-white/90 text-lg mb-8 max-w-lg mx-auto">
                Your 20% off code is chillin&apos; in your inbox.
              </p>

              <Link
                href="#product"
                className="bg-[#ffe25d] py-4 px-12 font-heading rounded-full text-xl w-fit md:px-12 "
              >
                SHOP SUNDAY
              </Link>
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
