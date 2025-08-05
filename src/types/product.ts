export interface ProductImage {
  id: string;
  src: string;
  alt: string;
  isMain?: boolean;
}

export interface NutritionFacts {
  servingSize: string;
  calories: string;
  totalFat: string;
  saturatedFat: string;
  transFat: string;
  cholesterol: string;
  sodium: string;
  totalCarbs: string;
  dietaryFiber: string;
  totalSugars: string;
  addedSugars: string;
  protein: string;
  vitaminD: string;
  calcium: string;
  iron: string;
  potassium: string;
}

export interface ProductVariant {
  variantId: string;
  packSizeId: string;
  price: string; // Specific price for this variant
  compareAtPrice?: string; // Optional "was" price for showing discounts
}


export interface Product {
  id: string;
  title: string;
  name: string;
  slug: string;
  description: string;
  basePrice: string; // Price per unit for 8-pack one-time
  images: ProductImage[];
  ingredients: string;
  nutritionFacts: NutritionFacts;
  benefits: string[];
  variants: ProductVariant[]; // Variants for different pack sizes
}

export interface PackSizeOption {
  id: string;
  size: string;
  label: string;
}

export interface PurchaseOption {
  id: string;
  type: "onetime" | "subscription";
  label: string;
  discountPercent?: string;
  benefits?: string[];
}

export interface AccordionItem {
  id: string;
  title: string;
  content: string | React.ReactNode;
}

export interface ProductDetailPageProps {
  className?: string;
}

import VarietyImage1 from "@/../public/products/variety_1.webp";
import VarietyImage2 from "@/../public/products/variety_2.webp";
import VarietyImage3 from "@/../public/products/variety_3.webp";

import ProductPeach1 from "@/../public/products/peach_1.webp";
import ProductPeach2 from "@/../public/products/peach_2.webp";
import ProductPeach3 from "@/../public/products/peach_3.webp";

import ProductHibiscus1 from "@/../public/products/hibiscus_1.webp";
import ProductHibiscus2 from "@/../public/products/hibiscus_2.webp";
import ProductHibiscus3 from "@/../public/products/hibiscus_3.webp";

import ProductClassic1 from "@/../public/products/classic_1.webp";
import ProductClassic2 from "@/../public/products/classic_2.webp";
import ProductClassic3 from "@/../public/products/classic_3.webp";

import ProductHalfHalf1 from "@/../public/products/halfhalf_1.webp";
import ProductHalfHalf2 from "@/../public/products/halfhalf_2.webp";
import ProductHalfHalf3 from "@/../public/products/halfhalf_3.webp";



// Product data
export const products: Product[] = [
  {
    id: "variety-pack",
    name: "The Variety Pack",
    title: "The Variety Pack",
    slug: "variety-pack",
    description:
      "All your SunDay™ iced tea favorites with a zero-regret buzz. ",
    basePrice: "56.00",
    variants: [
      {
        packSizeId: "8-pack",
        variantId: "41611737956437",
        price: "56.00",
      },
      {
        packSizeId: "12-pack",
        variantId: "41611737989205",
        price: "84.00",
      },
      {
        packSizeId: "16-pack",
        variantId: "41611738021973",
        price: "112.00",
      }
    ],
    images: [
      {
        id: "main",
        src: VarietyImage1.src,
        alt: "SunDay Variety Pack - 4 Flavors",
        isMain: true,
      },
      {
        id: "lifestyle1",
        src: VarietyImage2.src,
        alt: "SunDay variety pack with fruits",
      },
      {
        id: "lifestyle2",
        src: VarietyImage3.src,
        alt: "People enjoying SunDay variety drinks",
      },
    ],
    ingredients:
      "Assorted flavors: Classic Iced Tea, Peach Iced Tea, Half & Half, and Hibiscus - each with natural ingredients and plant-based functional compounds.",
    nutritionFacts: {
      servingSize: "1 can (12 fl oz / 355 mL)",
      calories: "30-40",
      totalFat: "0g",
      saturatedFat: "0g",
      transFat: "0g",
      cholesterol: "0mg",
      sodium: "0mg",
      totalCarbs: "8-10g",
      dietaryFiber: "0g",
      totalSugars: "7-8g",
      addedSugars: "7-8g",
      protein: "0g",
      vitaminD: "0mcg",
      calcium: "0mg",
      iron: "0mg",
      potassium: "0-30mg",
    },
    benefits: [
      "No Artificial Ingredients",
      "Refreshing & Low-Cal",
      "All Natural Flavor",
    ],
  },
  {
    id: "classic",
    name: "Classic Iced Tea",
    title: "Classic Iced Tea With Lemon",
    slug: "classic-iced-tea",
    description:
      "Classic black tea & lemon with a subtle lift.",
    basePrice: "56.00",
    images: [
      {
        id: "main",
        src: ProductClassic1.src,
        alt: "SunDay Classic Iced Tea Can",
        isMain: true,
      },
      {
        id: "lifestyle1",
        src: ProductClassic2.src,
        alt: "Classic iced tea with lemon slice",
      },
      {
        id: "lifestyle2",
        src: ProductClassic3.src,
        alt: "Classic iced tea lifestyle shot",
      },
    ],
    variants: [
      {
        packSizeId: "8-pack",
        variantId: "41611734286421",
        price: "56.00",
      },
      {
        packSizeId: "12-pack",
        variantId: "41611734319189",
        price: "84.00",
      },
      {
        packSizeId: "16-pack",
        variantId: "41611734351957",
        price: "112.00",
      }
    ],
    ingredients:
      "Kosher & Vegan Friendly Black Tea (Filtered Water, Black Tea Extract), Granulated Cane Sugar, Lemon Juice, Concentrate, Natural Flavors, Plant-based functional ingredients",
    nutritionFacts: {
      servingSize: "1 can (12 fl oz / 355 mL)",
      calories: "40",
      totalFat: "0g",
      saturatedFat: "0g",
      transFat: "0g",
      cholesterol: "0mg",
      sodium: "0mg",
      totalCarbs: "10g",
      dietaryFiber: "0g",
      totalSugars: "8g",
      addedSugars: "8g",
      protein: "0g",
      vitaminD: "0mcg",
      calcium: "0mg",
      iron: "0mg",
      potassium: "30mg",
    },
    benefits: [
      "No Artificial Ingredients",
      "Refreshing & Low-Cal",
      "All Natural Flavor",
    ],
  },
  {
    id: "half-half",
    name: "Half & Half",
    title: "Half & Half Iced Tea with Lemonade",
    slug: "half-and-half",
    description:
      "Tea meets lemonade for a low dose golden-hour vibe.",
    basePrice: "56.00",
    images: [
      {
        id: "main",
        src: ProductHalfHalf1.src,
        alt: "SunDay Half & Half Iced Tea Lemonade Can",
        isMain: true,
      },
      {
        id: "lifestyle1",
        src: ProductHalfHalf2.src,
        alt: "Half & Half with lemon garnish",
      },
      {
        id: "lifestyle2",
        src: ProductHalfHalf3.src,
        alt: "Half & Half lifestyle shot",
      },
    ],
    variants: [
      {
        packSizeId: "8-pack",
        variantId: "41611734450261",
        price: "56.00",
      },
      {
        packSizeId: "12-pack",
        variantId: "41611734483029",
        price: "84.00",
      },
      {
        packSizeId: "16-pack",
        variantId: "41611734515797",
        price: "112.00",
      }
    ],
    ingredients:
      "Kosher & Vegan Friendly Black Tea (Filtered Water, Black Tea Extract), Granulated Cane Sugar, Lemon Juice, Concentrate, Natural Flavors, Plant-based functional ingredients",
    nutritionFacts: {
      servingSize: "1 can (12 fl oz / 355 mL)",
      calories: "40",
      totalFat: "0g",
      saturatedFat: "0g",
      transFat: "0g",
      cholesterol: "0mg",
      sodium: "0mg",
      totalCarbs: "10g",
      dietaryFiber: "0g",
      totalSugars: "8g",
      addedSugars: "8g",
      protein: "0g",
      vitaminD: "0mcg",
      calcium: "0mg",
      iron: "0mg",
      potassium: "30mg",
    },
    benefits: [
      "No Artificial Ingredients",
      "Refreshing & Low-Cal",
      "All Natural Flavor",
    ],
  },
  {
    id: "peach",
    name: "Peach",
    slug: "peach-iced-tea",
    title: "Peach Iced Tea",
    description:
      "Juicy peach iced tea for a smooth, mellow lift.",
    basePrice: "56.00",
    images: [
      {
        id: "main",
        src: ProductPeach1.src,
        alt: "SunDay Peach Iced Tea Can",
        isMain: true,
      },
      {
        id: "lifestyle1",
        src: ProductPeach2.src,
        alt: "Peach iced tea with fresh peach slices",
      },
      {
        id: "lifestyle2",
        src: ProductPeach3.src,
        alt: "Peach iced tea lifestyle shot",
      },
    ],
    variants: [
      {
        packSizeId: "8-pack",
        variantId: "41611734581333",
        price: "56.00",
      },
      {
        packSizeId: "12-pack",
        variantId: "41611734614101",
        price: "84.00",
      },
      {
        packSizeId: "16-pack",
        variantId: "41611734646869",
        price: "112.00",
      }
    ],
    ingredients:
      "Kosher & Vegan Friendly Black Tea (Filtered Water, Black Tea Extract), Granulated Cane Sugar, Natural Flavors, Lemon Juice Concentrate, Plant-based functional ingredients",
    nutritionFacts: {
      servingSize: "1 can (12 fl oz / 355 mL)",
      calories: "40",
      totalFat: "0g",
      saturatedFat: "0g",
      transFat: "0g",
      cholesterol: "0mg",
      sodium: "0mg",
      totalCarbs: "10g",
      dietaryFiber: "0g",
      totalSugars: "8g",
      addedSugars: "8g",
      protein: "0g",
      vitaminD: "0mcg",
      calcium: "0mg",
      iron: "0mg",
      potassium: "20mg",
    },
    benefits: [
      "No Artificial Ingredients",
      "Refreshing & Low-Cal",
      "All Natural Flavor",
    ],
  },
  {
    id: "hibiscus",
    name: "Hibiscus",
    title: "Hibiscus Iced Tea",
    slug: "hibiscus-iced-tea",
    description:
      "Floral & tart, it's your new favorite ritual.",
    basePrice: "56.00",
    images: [
      {
        id: "main",
        src: ProductHibiscus1.src,
        alt: "SunDay Hibiscus Iced Tea Can",
        isMain: true,
      },
      {
        id: "lifestyle1",
        src: ProductHibiscus2.src,
        alt: "Hibiscus tea with flower garnish",
      },
      {
        id: "lifestyle2",
        src: ProductHibiscus3.src,
        alt: "Hibiscus tea lifestyle shot",
      },
    ],
    variants: [
      {
        packSizeId: "8-pack",
        variantId: "41611734712405",
        price: "56.00",
      },
      {
        packSizeId: "12-pack",
        variantId: "41611734745173",
        price: "84.00",
      },
      {
        packSizeId: "16-pack",
        variantId: "41611734777941",
        price: "112.00",
      }
    ],
    ingredients:
      "Hibiscus Tea (Filtered Water, Hibiscus Extract), Cane Sugar, Natural Flavors, Plant-based functional ingredients",
    nutritionFacts: {
      servingSize: "1 can (12 fl oz / 355 mL)",
      calories: "30",
      totalFat: "0g",
      saturatedFat: "0g",
      transFat: "0g",
      cholesterol: "0mg",
      sodium: "0mg",
      totalCarbs: "8g",
      dietaryFiber: "0g",
      totalSugars: "7g",
      addedSugars: "7g",
      protein: "0g",
      vitaminD: "0mcg",
      calcium: "0mg",
      iron: "0mg",
      potassium: "0mg",
    },
    benefits: [
      "No Artificial Ingredients",
      "Refreshing & Low-Cal",
      "All Natural Flavor",
    ],
  },
];

export const packSizeOptions: PackSizeOption[] = [
  { id: "8-pack", size: "8", label: "8 Pack" },
  { id: "12-pack", size: "12", label: "12 pack" },
  { id: "16-pack", size: "16", label: "16 Pack" },
];

export const purchaseOptions: PurchaseOption[] = [
  {
    id: "onetime",
    type: "onetime",
    label: "One time purchase",
  },
  {
    id: "subscription",
    type: "subscription",
    label: "Subscribe &",
    discountPercent: "20",
    benefits: [
      "Delivery every 30 days",
      "Get SunDay™ on repeat",
      "Never run out of your favorites",
    ],
  },
];

// Configuration constants
const SHOPIFY_BASE_URL = "https://drinkasunday.com";
const SUBSCRIPTION_SELLING_PLAN_ID = "7016284245";

// Utility function to get variant by product and pack size
export const getVariant = (productId: string, packSize: string): ProductVariant | null => {
  const product = products.find(p => p.id === productId);
  return product?.variants.find(v => v.packSizeId === packSize) || null;
};

// Utility function to get variant ID
export const getVariantId = (productId: string, packSize: string): string | null => {
  const variant = getVariant(productId, packSize);
  return variant?.variantId || null;
};

// Utility function to get variant price
export const getVariantPrice = (productId: string, packSize: string): { price: string; compareAtPrice?: string } | null => {
  const variant = getVariant(productId, packSize);
  if (!variant) return null;

  return {
    price: variant.price,
    compareAtPrice: variant.compareAtPrice,
  };
};

// Utility function to generate Shopify checkout URL
export const getCheckoutUrl = (
  productId: string,
  packSize: string,
  quantity: number = 1,
  purchaseType: "onetime" | "subscription" = "onetime"
): string => {
  const variantId = getVariantId(productId, packSize);

  if (!variantId) {
    console.warn(`No variant ID found for ${productId} - ${packSize}`);
    return '/checkout'; // fallback URL
  }

  // Build the cart/add URL parameters
  const cartParams = new URLSearchParams();
  cartParams.append('items[0][id]', variantId);
  cartParams.append('items[0][quantity]', quantity.toString());

  // Add selling plan for subscriptions
  if (purchaseType === "subscription") {
    cartParams.append('items[0][selling_plan]', SUBSCRIPTION_SELLING_PLAN_ID);
  }

  // Add the final redirect to checkout (this gets double-encoded)
  cartParams.append('return_to', '/checkout?');

  // Build the cart/add URL
  const cartAddUrl = `/cart/add?${cartParams.toString()}`;

  // URL encode the cart/add URL for the return_to parameter
  const encodedCartAddUrl = encodeURIComponent(cartAddUrl);

  // Build the final cart/clear URL
  const finalUrl = `${SHOPIFY_BASE_URL}/cart/clear?return_to=${encodedCartAddUrl}`;

  return finalUrl;
};

// Helper function for testing/debugging - shows the decoded cart/add URL
export const getDecodedCartAddUrl = (
  productId: string,
  packSize: string,
  quantity: number = 1,
  purchaseType: "onetime" | "subscription" = "onetime"
): string => {
  const variantId = getVariantId(productId, packSize);
  if (!variantId) return '';

  const cartParams = new URLSearchParams();
  cartParams.append('items[0][id]', variantId);
  cartParams.append('items[0][quantity]', quantity.toString());

  if (purchaseType === "subscription") {
    cartParams.append('items[0][selling_plan]', SUBSCRIPTION_SELLING_PLAN_ID);
  }

  cartParams.append('return_to', '/checkout?');

  return `/cart/add?${cartParams.toString()}`;
};

// Helper to get all available pack sizes for a product
export const getAvailablePackSizes = (productId: string): PackSizeOption[] => {
  const product = products.find(p => p.id === productId);
  if (!product) return [];

  const availablePackIds = product.variants.map(v => v.packSizeId);
  return packSizeOptions.filter(pack => availablePackIds.includes(pack.id));
};