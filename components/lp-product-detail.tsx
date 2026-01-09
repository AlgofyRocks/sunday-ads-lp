"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import BogoOffer from "./BogoOffer";
import {
  AccordionItem,
  getAvailablePackSizes,
  getCheckoutUrl,
  getVariantId,
  getVariantPrice,
  ProductDetailPageProps,
  products,
  purchaseOptions,
} from "@/types/product";
import { Check, Minus, Plus, ShieldCheck, Star, Truck } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { useCallback, useMemo, useRef, useState } from "react";

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  className = " ",
}) => {
  // State management
  const [selectedImage, setSelectedImage] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState("variety-pack");
  const [selectedPackSize, setSelectedPackSize] = useState("8-pack");
  const [selectedPurchaseType, setSelectedPurchaseType] = useState("onetime");
  const [quantity, setQuantity] = useState(1);
  const [openAccordions, setOpenAccordions] = useState<string[]>([]);
  const [showStickyCart, setShowStickyCart] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Touch handling state
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const isDragging = useRef<boolean>(false);

  // Get current product
  const currentProduct = useMemo(() => {
    return products.find((p) => p.id === selectedProductId) || products[0];
  }, [selectedProductId]);

  // Calculate current price based on variant pricing
  const currentPrice = useMemo(() => {
    const variantPrice = getVariantPrice(selectedProductId, selectedPackSize);

    if (!variantPrice) {
      return {
        current: "0.00",
        original: 0.0,
      };
    }

    const basePrice = parseFloat(variantPrice.price);
    const subtotal = basePrice * quantity;

    if (selectedPurchaseType === "subscription") {
      const discountPercent = parseFloat(
        purchaseOptions.find((p) => p.id === "subscription")?.discountPercent ||
          "0"
      );
      const discountedPrice = subtotal * (1 - discountPercent / 100);
      return {
        current: discountedPrice.toFixed(2),
        original: subtotal.toFixed(2),
        compareAtPrice: variantPrice.compareAtPrice
          ? (parseFloat(variantPrice.compareAtPrice) * quantity).toFixed(2)
          : null,
      };
    }

    return {
      current: subtotal.toFixed(2),
      original: basePrice,
      compareAtPrice: variantPrice.compareAtPrice
        ? (parseFloat(variantPrice.compareAtPrice) * quantity).toFixed(2)
        : null,
    };
  }, [selectedProductId, selectedPackSize, selectedPurchaseType, quantity]);

  // Get available pack sizes for current product
  const availablePackSizes = useMemo(() => {
    return getAvailablePackSizes(selectedProductId);
  }, [selectedProductId]);

  // Reset selections when product changes
  React.useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const sectionBottom =
        sectionRef.current.offsetTop + sectionRef.current.offsetHeight;
      const scrollPosition = window.scrollY + window.innerHeight;

      setShowStickyCart(scrollPosition > sectionBottom);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [selectedProductId]);

  // Reset spinner when user navigates back to the page
React.useEffect(() => {
  const handleVisibilityChange = () => {
    if (document.visibilityState === 'visible') {
      setIsSpinning(false);
    }
  };

  // Reset on mount
  setIsSpinning(false);

  // Reset when page becomes visible again (user hits back button)
  document.addEventListener('visibilitychange', handleVisibilityChange);
  
  return () => {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  };
}, []);

  // Handle image navigation
  const goToNextImage = useCallback(() => {
    if (!currentProduct) return;
    setSelectedImage((prev) =>
      prev === currentProduct.images.length - 1 ? 0 : prev + 1
    );
  }, [currentProduct]);

  const goToPrevImage = useCallback(() => {
    if (!currentProduct) return;
    setSelectedImage((prev) =>
      prev === 0 ? currentProduct.images.length - 1 : prev - 1
    );
  }, [currentProduct]);

  // Touch event handlers for swipe functionality
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.targetTouches[0]) {
      touchStartX.current = e.targetTouches[0].clientX;
    }
    isDragging.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartX.current) return;

    const touch = e.targetTouches[0];
    if (!touch) return;

    const currentTouch = touch.clientX;
    const diff = touchStartX.current - currentTouch;

    // If user has moved more than 10px, consider it a drag
    if (Math.abs(diff) > 10) {
      isDragging.current = true;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging.current) return;

    const touch = e.changedTouches[0];
    if (!touch) return;

    touchEndX.current = touch.clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNextImage();
    } else if (isRightSwipe) {
      goToPrevImage();
    }

    // Reset touch positions
    touchStartX.current = 0;
    touchEndX.current = 0;
    isDragging.current = false;
  };

  // Create dynamic accordion content
  const accordionItems: AccordionItem[] = [
    {
      id: "how-to-use",
      title: "How To Use",
      content: `Crack open, locate your nearest hammock, sip slowly, and enjoy the feeling of a SunDay™ any day of the week. Most people start with one and feel a nice, mellow shift within 10–15 minutes. If you're new to this kind of buzz, start slow and see how you feel, because everybody is different. One can is usually a light lift and feels like a glass of wine. Two gets you feelin' real mellow. Three? you might name your couch and demand that it needs more respect.`,
    },
    {
      id: "ingredients",
      title: "Ingredients",
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">{currentProduct?.name}</h4>
            <p className="text-sm text-gray-600">
              {currentProduct?.ingredients}
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "nutrition",
      title: "Nutrition Facts",
      content: (
        <div className="border border-gray-300 p-4 text-xs max-w-md">
          <h4 className="font-bold mb-2">{currentProduct?.name}</h4>
          <p className="mb-2">
            Amount per serving {currentProduct?.nutritionFacts.servingSize}
          </p>
          <div className="border-b border-gray-400 pb-1 mb-2">
            <span className="font-bold text-lg">
              {currentProduct?.nutritionFacts.calories} Calories
            </span>
            <span className="float-right font-bold">% Daily Value*</span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span>Total Fat {currentProduct?.nutritionFacts.totalFat}</span>
              <span>0%</span>
            </div>
            <div className="flex justify-between pl-4">
              <span>
                Saturated Fat {currentProduct?.nutritionFacts.saturatedFat}
              </span>
              <span>0%</span>
            </div>
            <div className="pl-4">
              Trans Fat {currentProduct?.nutritionFacts.transFat}
            </div>
            <div className="flex justify-between">
              <span>
                Cholesterol {currentProduct?.nutritionFacts.cholesterol}
              </span>
              <span>0%</span>
            </div>
            <div className="flex justify-between">
              <span>Sodium {currentProduct?.nutritionFacts.sodium}</span>
              <span>0%</span>
            </div>
            <div className="flex justify-between">
              <span>
                Total Carbohydrate {currentProduct?.nutritionFacts.totalCarbs}
              </span>
              <span>
                {currentProduct?.nutritionFacts.totalCarbs === "10g"
                  ? "4%"
                  : "3%"}
              </span>
            </div>
            <div className="flex justify-between pl-4">
              <span>
                Dietary Fiber {currentProduct?.nutritionFacts.dietaryFiber}
              </span>
              <span>0%</span>
            </div>
            <div className="pl-4">
              Total Sugars {currentProduct?.nutritionFacts.totalSugars}
            </div>
            <div className="flex justify-between pl-8">
              <span>
                Includes {currentProduct?.nutritionFacts.addedSugars} Added
                Sugars
              </span>
              <span>
                {currentProduct?.nutritionFacts.addedSugars === "8g"
                  ? "16%"
                  : "14%"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Protein {currentProduct?.nutritionFacts.protein}</span>
            </div>
            <div className="border-t border-gray-400 pt-2 mt-2 space-y-1">
              <div className="flex justify-between">
                <span>Vitamin D {currentProduct?.nutritionFacts.vitaminD}</span>
                <span>0%</span>
              </div>
              <div className="flex justify-between">
                <span>Calcium {currentProduct?.nutritionFacts.calcium}</span>
                <span>0%</span>
              </div>
              <div className="flex justify-between">
                <span>Iron {currentProduct?.nutritionFacts.iron}</span>
                <span>0%</span>
              </div>
              <div className="flex justify-between">
                <span>
                  Potassium {currentProduct?.nutritionFacts.potassium}
                </span>
                <span>0%</span>
              </div>
            </div>
          </div>
          <p className="text-xs mt-2">
            *The % Daily Value tells you how much a nutrient in a serving of
            food contributes to a daily diet. 2,000 calories a day is used for
            general nutrition.
          </p>
        </div>
      ),
    },
  ];

  // Handlers
  const toggleAccordion = (id: string) => {
    setOpenAccordions((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  setIsSpinning(true);

  // Get the variant ID for the selected combination
  const variantId = getVariantId(selectedProductId, selectedPackSize);

  if (!variantId) {
    console.error(
      "No variant ID found for:",
      selectedProductId,
      selectedPackSize
    );
    setIsSpinning(false); // ADD THIS LINE - Reset spinner on error
    return;
  }

  // Create checkout URL with variant ID and purchase type
  const checkoutUrl = getCheckoutUrl(
    selectedProductId,
    selectedPackSize,
    quantity,
    selectedPurchaseType as "onetime" | "subscription"
  );

  // Redirect to checkout
  window.location.href = checkoutUrl;

  console.log("Redirecting to checkout:", {
    productId: selectedProductId,
    packSize: selectedPackSize,
    purchaseType: selectedPurchaseType,
    quantity,
    variantId,
    checkoutUrl,
  });
};

  return (
    <section
      ref={sectionRef}
      className={`bg-cream-50 py-16 px-6 ${className}`}
      id="product"
    >
      <div className="max-w-7xl mx-auto">
     <BogoOffer selectedProduct={currentProduct} className="mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Product Image with Swipe Support */}
            <div
              className="aspect-square  rounded-[30px] overflow-hidden  relative select-none"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{ touchAction: "pan-y pinch-zoom" }} // Allows vertical scrolling but handles horizontal swipes
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={`${currentProduct?.id}-${selectedImage}`}
                  src={currentProduct?.images[selectedImage]?.src}
                  alt={currentProduct?.images[selectedImage]?.alt}
                  className="w-full h-full object-contain pointer-events-none"
                  draggable={false}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                  }}
                />
              </AnimatePresence>

              {/* Swipe indicators for mobile */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 md:hidden">
                {currentProduct?.images.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      selectedImage === index ? "bg-white" : "bg-white/50"
                    }`}
                    animate={{
                      scale: selectedImage === index ? 1.2 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-4">
              {currentProduct?.images.map((image, index) => (
                <motion.button
                  key={image.id}
                  onClick={() => setSelectedImage(index)}
                  className={`w-full h-auto aspect-square rounded-lg overflow-hidden border transition-colors ${
                    selectedImage === index
                      ? "border-foreground border-2 bg-[#FFF6D1] md:hidden"
                      : "border-gray-200"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <h2 className="text-5xl md:text-6xl font-bold text-foreground font-heading mb-4 uppercase">
                {currentProduct?.title}
              </h2>
              <Badge className="bg-[#ffe25d] text-black mb-4 rounded-full px-4 py-1">
                FREE SHIPPING ON ALL ORDERS OVER $100
              </Badge>
              <p className="text-lg text-gray-700 mb-6">
                {currentProduct?.description}
              </p>
              {/* Benefits */}
              <div className="space-y-2">
                {currentProduct?.benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center space-x-2">
                    ✅{/* <Check className="w-5 h-5 text-green-600" /> */}{" "}
                    <span className="text-gray-700 ml-1">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Selection Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Flavor Selection */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Flavor
                </h3>
                <div className="flex flex-wrap gap-2">
                  {products.map((product) => (
                    <label key={product.id} className="cursor-pointer">
                      <input
                        type="radio"
                        name="flavor"
                        value={product.id}
                        checked={selectedProductId === product.id}
                        onChange={(e) => setSelectedProductId(e.target.value)}
                        className="sr-only "
                      />
                      <span
                        className={`inline-block px-4 py-4 rounded-full border transition-colors text-sm font-medium  ${
                          selectedProductId === product.id
                            ? "border-foreground  text-foreground border-2 bg-[#FFF6D1]"
                            : "border-gray-300 text-gray-700  hover:border-gray-400"
                        }`}
                      >
                        {product.id === "variety-pack"
                          ? "Variety Pack"
                          : product.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Pack Size Selection */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Pack Size
                </h3>
                <div className="flex flex-wrap gap-2">
                  {availablePackSizes.map((pack) => (
                    <label key={pack.id} className="cursor-pointer">
                      <input
                        type="radio"
                        name="packSize"
                        value={pack.id}
                        checked={selectedPackSize === pack.id}
                        onChange={(e) => setSelectedPackSize(e.target.value)}
                        className="sr-only"
                      />
                      <span
                        className={`inline-block px-4 py-2 text-sm font-medium  rounded-full border transition-colors ${
                          selectedPackSize === pack.id
                            ? "border-foreground  text-foreground border-2 bg-[#FFF6D1]"
                            : "border-gray-300 text-gray-700 hover:border-gray-400"
                        }`}
                      >
                        {pack.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Purchase Type Selection */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Frequency
                </h3>
                <div className="space-y-3">
                  {purchaseOptions.map((option) => (
                    <label
                      key={option.id}
                      className={`block p-4 rounded-xl border cursor-pointer transition-colors ${
                        selectedPurchaseType === option.id
                          ? "border-foreground border-2 bg-[#fff6d1]"
                          : "border-gray-300 hover:border-gray-400 "
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="purchaseType"
                            value={option.id}
                            checked={selectedPurchaseType === option.id}
                            onChange={(e) =>
                              setSelectedPurchaseType(e.target.value)
                            }
                            className="appearance-none w-4 h-4 rounded-full border border-gray-300 bg-white checked:bg-foreground checked:border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground focus:bg-foreground"
                          />
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-nowrap">
                              {option.label}
                            </span>
                            {option.discountPercent && (
                              <Badge className="bg-[#ffe25d] text-foreground text-xs px-2 py-1 rounded-full font-bold">
                                Save {option.discountPercent}%
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-bold">
                            {option.discountPercent ? (
                              <>
                                {" "}
                                <span className="line-through opacity-80 font-light">
                                  $
                                  {Math.floor(
                                    typeof currentPrice.original === "string"
                                      ? parseFloat(currentPrice.original)
                                      : currentPrice.original
                                  )}
                                </span>{" "}
                                $
                                {Math.floor(
                                  (typeof currentPrice.original === "string"
                                    ? parseFloat(currentPrice.original)
                                    : currentPrice.original) *
                                    (1 -
                                      parseFloat(option.discountPercent) /
                                        100) *
                                    100
                                ) / 100}
                              </>
                            ) : (
                              `$${Math.floor(typeof currentPrice.original === "string" ? parseFloat(currentPrice.original) : currentPrice.original)}`
                            )}
                          </span>
                        </div>
                      </div>
                      {option.benefits && (
                        <div className="mt-3 pl-7 space-y-1 font-medium">
                          {option.benefits.map((benefit, index) => (
                            <div key={index} className="text-sm opacity-80">
                              • {benefit}
                            </div>
                          ))}
                        </div>
                      )}
                    </label>
                  ))}
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-300 rounded-full py-2">
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(-1)}
                      className="p-2 hover:bg-gray-100 transition-colors"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 min-w-[3rem] text-center">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(1)}
                      className="p-2 hover:bg-gray-100 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <Button
                    type="submit"
                    className="flex-1 bg-foreground font-heading text-white px-8 py-8 text-xl font-semibold  transition-colors rounded-full cursor-pointer"
                  >
                    {isSpinning ? (
                      <div className="w-6 h-6 border-4 border-white border-t-transparent border-b-transparent rounded-full animate-spin mx-auto"></div>
                    ) : (
                      `SHOP NOW $${currentPrice.current}`
                    )}
                  </Button>
                </div>
                {/* Trust Badges */}
                <div className="flex items-center justify-center space-x-6 text-sm  font-heading">
                  <div className="flex items-center space-x-2">
                    <Truck className="w-4 h-4" />
                    <span>FREE SHIPPING OVER $100</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4" />
                    <span>SECURE PAYMENTS</span>
                  </div>
                </div>
              </div>
            </form>

            {/* Sticky Add to Cart for Mobile */}
            <AnimatePresence>
              {showStickyCart && (
                <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 100, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="fixed bottom-[-35px] left-0 right-0 bg-background border-t border-gray-200 p-4 z-50 md:hidden"
                >
                  <Button
                    onClick={handleSubmit}
                    className="w-full bg-foreground font-heading text-white px-8 py-6 text-lg font-semibold transition-colors rounded-full cursor-pointer"
                  >
                    {isSpinning ? (
                      <div className="w-6 h-6 border-4 border-white border-t-transparent border-b-transparent rounded-full animate-spin mx-auto"></div>
                    ) : (
                      `SHOP NOW $${currentPrice.current}`
                    )}
                  </Button>
                  {/* Trust Badges */}
                  <div className="flex items-center justify-center space-x-6 text-sm font-heading pt-2">
                    <div className="flex items-center space-x-2">
                      <Truck className="w-4 h-4" />
                      <span>FREE SHIPPING ON OVER $100</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ShieldCheck className="w-4 h-4" />
                      <span>SECURE PAYMENTS</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Customer Review */}
            <Card className="p-6 bg-white border border-gray-200 flex flex-col gap-1 shadow-none border-none">
              <div className="flex space-x-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <blockquote className="text-gray-700 mb-3">
                "Very glad I tried the variety pack. To be honest, I've never
                ordered something with hibiscus before... now it's my favorite
                flavor!!"
              </blockquote>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-sm">Andrew H.</span>
                <Check className="w-4 h-4 bg-[#4888a5] text-white rounded-full" />
                <span className="text-sm text-gray-500">Verified Buyer</span>
              </div>
            </Card>

            <div className="space-y-2">
              {accordionItems.map((item) => (
                <div
                  key={item.id}
                  className="border-b border-gray-200  overflow-hidden "
                >
                  <button
                    onClick={() => toggleAccordion(item.id)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between  transition-colors cursor-pointer"
                  >
                    <span className="font-semibold text-foreground">
                      {item.title}
                    </span>
                    <motion.div
                      animate={{
                        rotate: openAccordions.includes(item.id) ? 45 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <Plus className="w-5 h-5 text-foreground" />
                    </motion.div>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: openAccordions.includes(item.id) ? "auto" : 0,
                      opacity: openAccordions.includes(item.id) ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="px-6 pb-4">
                      <div className=" ">
                        {typeof item.content === "string" ? (
                          <p>{item.content}</p>
                        ) : (
                          item.content
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailPage;
