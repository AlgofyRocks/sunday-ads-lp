import AnnouncementBar from "components/announcement-bar";
import LPHero from "components/lp-hero";
import LPImageTextSection from "components/lp-image-text";
import LPInfo from "components/lp-info";
import LPMarquee from "components/lp-marquee";
import LPNav from "components/lp-nav";
import LPTestimonials from "components/lp-testimonials";

import ImageWithText1 from "@/../public/lp/image_with_text_1.webp";
import ImageWithText2 from "@/../public/lp/image_with_text_2.webp";
import FadeInSection from "components/fade-in-section";
import AgeGate from "components/lp-agegate";
import FAQSection from "components/lp-faq";
import LPFeed from "components/lp-feed";
import LPFooter from "components/lp-footer";
import LPNewsletter from "components/lp-newsletter";
import ProductDetailPage from "components/lp-product-detail";
import LPSocial from "components/lp-social";
import LPSubscription from "components/lp-subscription";
import LPTable from "components/lp-table";

export const metadata = {
  description:
    "High-performance ecommerce store built with Next.js, Vercel, and Shopify.",
  openGraph: {
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <AgeGate />
      <AnnouncementBar />
      <LPNav />
      <LPHero />
      <FadeInSection>
        <ProductDetailPage />
      </FadeInSection>
      <FadeInSection>
        <LPInfo />
      </FadeInSection>

      <FadeInSection>
        <LPTable />
      </FadeInSection>
      <LPTestimonials />

      <LPMarquee />

      <FadeInSection id="how-it-feels">
        <LPImageTextSection imageUrl={ImageWithText1.src} />
      </FadeInSection>

      <FadeInSection id="whats-in-the-can">
        <LPImageTextSection
          title="WHAT DOES A SUNDAY™ FEEL LIKE"
          description="Like an exhale on a sunny day — light, lifted, and just the right amount of float. I'ts the social ease of a drink with friends, minus the next-day regrets."
          imagePosition="left"
          imageUrl={ImageWithText2.src}
        />
      </FadeInSection>

      <FadeInSection>
        <LPSocial />
      </FadeInSection>
      <FadeInSection>
        <LPSubscription />
      </FadeInSection>
      <FAQSection />
      <LPNewsletter
        klaviyoListId={"XdF2sD"}
        klaviyoPublicKey="VFXVmg"
        useServerSide={false}
      />
      <LPFeed />
      <LPFooter />
    </>
  );
}
