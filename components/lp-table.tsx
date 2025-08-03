import TableItem from "@/../public/lp/table_item.png";
import TableOutdated from "@/../public/lp/table_outdated.png";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";
import Image from "next/image";
import LogoIcon from "./icons/logo";

const LPTable = () => {
  const features = [
    "Light, social buzz",
    "No regrets or post-b00ze crash",
    "Tastes great and feels better",
    "Less than 40 calories & low in sugar (8g)",
    "All-natural ingredients",
  ];

  return (
    <div className="w-full  max-w-4xl mx-auto p-4  py-16">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-5xl md:text-6xl font-bold text-foreground font-heading mb-8">
          WHAT MAKES US DIFFERENT
        </h1>
      </div>

      {/* Table Container */}
      <div className=" rounded-lg  overflow-hidden">
        {/* Product Header Row */}
        <div className="flex gap-0 w-full">
          {/* Empty cell for alignment */}
          <div className="p-4 w-1/3 md:w-full"></div>

          {/* Sunday Check */}
          <div
            className={cn(
              "bg-[#ffa047] p-4 flex items-center justify-center w-1/3 md:w-1/4 lg:w-1/3 rounded-t-xl"
            )}
          >
            <div className="rounded-full flex  flex-col items-center justify-center ">
              <LogoIcon className="w-10 h-12 md:w-24 md:h-16" />
              <Image
                src={TableItem}
                alt="Sunday Check"
                className="w-16 h-16 text-[#ffa047] object-cover md:w-24 md:h-24"
              />
            </div>
          </div>

          {/* Outdated X */}
          <div className=" flex items-center justify-center  w-1/3 lg:w-1/3 md:p-4">
            <div className="rounded-full flex  flex-col items-center justify-center ">
              <div className="w-10 h-12 flex items-center justify-center">
                <span className=" text-sm font-bold md:text-sm">
                  {" "}
                  OUTDATED{" "}
                </span>
              </div>
              <Image
                src={TableOutdated}
                alt="Sunday Check"
                className="w-12 h-16 text-[#ffa047] object-contain md:w-16 md:h-24"
              />
            </div>
          </div>
        </div>

        {/* Feature Rows */}
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex w-full gap-0 border-t border-foreground"
          >
            {/* Feature Name */}
            <div className="p-4 flex items-center  font-medium text-left w-1/3 md:w-full">
              {feature}
            </div>

            {/* Sunday Check */}
            <div
              className={cn(
                "bg-[#ffa047] p-4 flex items-center justify-center w-1/3 md:w-1/4 lg:w-1/3",
                index == features.length - 1 ? "rounded-b-md" : ""
              )}
            >
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <Check className="w-5 h-5 text-[#ffa047]" />
              </div>
            </div>

            {/* Outdated X */}
            <div className="p-4 flex items-center justify-center  w-1/3 lg:w-1/3">
              <div className="w-8 h-8 bg-red-700 rounded-full flex items-center justify-center">
                <X className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LPTable;
