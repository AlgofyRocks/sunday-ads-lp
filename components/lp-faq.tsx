"use client";
import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";
import React, { useState } from "react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  faqs?: FAQItem[];
  className?: string;
}

const FAQSection: React.FC<FAQSectionProps> = ({
  title = "FREQUENTLY ASKED QUESTIONS",
  subtitle = "Curious? Here's the lowdown on all things SunDay™.",
  className = "",
  faqs = [
    {
      id: "feel-something",
      question: 'How long does it take to "feel" something?',
      answer:
        "Effects usually begin within 15-30 minutes and can last around 1–2 hours. Everyone's body is different, so take it slow and feel it out.",
    },
    {
      id: "whats-in-can",
      question: "What's in a can of SunDay™?",
      answer:
        "Only the good stuff: vegan-friendly, Kosher-certified black tea, real fruit juice from concentrate, cane sugar, and naturally derived functional ingredients from hemp. Gluten free with no artificial flavors, and no weird extras, just smooth, simple ingredients you actually pronounce.",
    },
    {
      id: "special-license",
      question: "Do I need a special license to sell SunDay™?",
      answer:
        "That depends on where you're located. We follow all federal guidelines, but state laws vary — so it's up to you to check your local regulations. For wholesale inquiries, reach out to us at info@drinkasunday.com.",
    },
    {
      id: "what-is-sunday",
      question: "What is SunDay™? And why is it called SunDay™?",
      answer:
        "SunDay is a 12oz iced tea infused with naturally derived, feel-good ingredients, crafted to give you a light, social buzz without the crash. It's your easygoing drink for unwinding, vibing, or just adding a little lift to your day. We call it SunDay because it feels like one: relaxed, warm, and exactly what you needed. It's not about the calendar, it's about the energy.",
    },
    {
      id: "products-flavors",
      question: "What are the different products and flavors?",
      answer:
        "SunDay comes in a variety of 12oz iced tea blends, each made with real fruit juice and natural ingredients. Flavors include Black Tea with a hint of Lemon, Black Tea & Lemonade (Half&Half), Sweet Peach Tea, and Hibiscus Cranberry. Keep an eye out for limited seasonal drops too, we like to mix it up.",
    },
    {
      id: "how-many",
      question: "How many SunDays™ should I have?",
      answer:
        "That's up to you. Most people start with one and feel a nice, mellow shift within 15–30 minutes. If you're new to this kind of buzz, start slow and see how you feel. One is usually a light lift, two gets you nice and mellow, three? There might be a group chat headline.",
    },
  ],
}) => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isOpen = (id: string) => openItems.includes(id);

  return (
    <section id="faqs" className={`bg-cream-50 py-8 px-6 ${className}`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-5xl md:text-5xl font-bold  mb-6 uppercase font-heading">
            {title}
          </h2>
          <p className="text-lg md:text-xl  max-w-2xl mx-auto font-medium">
            {subtitle}
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className={cn(
                " rounded-[50px] border border-gray-300 overflow-hidden transition-all duration-300 "
              )}
            >
              {/* Question Header */}
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full px-8 py-6 text-left flex items-center justify-between group transition-colors duration-200 cursor-pointer"
                aria-expanded={isOpen(faq.id)}
                aria-controls={`faq-answer-${faq.id}`}
              >
                <h3 className="text-lg md:text-xl font-semibold  pr-4  transition-colors duration-200">
                  {faq.question}
                </h3>

                {/* Toggle Icon */}
                <div className="flex-shrink-0 w-8 h-8 rounded-full  flex items-center justify-center transition-all duration-300 ">
                  {isOpen(faq.id) ? (
                    <Minus className="w-8 h-8  transition-transform duration-300" />
                  ) : (
                    <Plus className="w-8 h-8  transition-transform duration-300" />
                  )}
                </div>
              </button>

              {/* Answer Content */}
              <div
                id={`faq-answer-${faq.id}`}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen(faq.id) ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-8 pb-6">
                  <div className="pt-2 border-t border-gray-300">
                    <p className="text-gray-700 leading-relaxed mt-4">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
