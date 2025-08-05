"use client";
import React from "react";

interface SubscriptionBenefit {
  id: string;
  icon: React.ReactNode;
  title: string;
}

interface SubscriptionCTASectionProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  mobileBackgroundImage?: string;
  desktopBackgroundImage?: string;
  benefits?: SubscriptionBenefit[];
  onButtonClick?: () => void;
  className?: string;
}

import SubscriptionSliderImageDesktop from "@/../public/lp/subscription_desktop.webp";
import SubscriptionSliderImageMobile from "@/../public/lp/subscription_mobile.webp";
import Link from "next/link";

const LPSubscription: React.FC<SubscriptionCTASectionProps> = ({
  eyebrow = "GET SUNDAY™ ON REPEAT",
  title = "NEVER RUN OUT OF GOOD VIBES",
  description = "SunDay™ drops fresh drinks at your door every 30 days — no store runs, no panic, no empty fridge. Just chill, we got you.",
  buttonText = "SHOP NOW",
  buttonHref = "#",
  mobileBackgroundImage = SubscriptionSliderImageMobile.src,
  desktopBackgroundImage = SubscriptionSliderImageDesktop.src,
  benefits = [
    {
      id: "delivery",
      icon: (
        <svg
          width="31"
          height="30"
          viewBox="0 0 31 30"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.88694 7.53032V26.7209C1.88694 27.0462 1.99575 27.3136 2.21338 27.5228C2.43101 27.7321 2.70965 27.8367 3.0493 27.8367H27.1436C27.482 27.8367 27.76 27.7321 27.9777 27.5228C28.1953 27.3136 28.3041 27.0462 28.3041 26.7209V7.53032H20.7563V17.4549C20.7563 18.0113 20.518 18.4347 20.0412 18.725C19.5644 19.0153 19.0719 19.0322 18.5637 18.7758L15.0955 17.1247L11.6254 18.7758C11.1185 19.031 10.6266 19.014 10.1499 18.725C9.67308 18.4347 9.4347 18.0113 9.4347 17.4549V7.53032H1.88694ZM3.0493 29.6511C2.20395 29.6511 1.48439 29.3656 0.890636 28.7947C0.296879 28.2238 0 27.5325 0 26.7209V6.94609C0 6.5929 0.058495 6.26026 0.175485 5.94819C0.292476 5.63612 0.46859 5.34885 0.703829 5.08637L3.64368 1.69351C3.91666 1.3391 4.2582 1.07178 4.66829 0.891557C5.07839 0.71133 5.51804 0.621216 5.98726 0.621216H24.1321C24.6 0.621216 25.0454 0.71133 25.468 0.891557C25.8907 1.07178 26.2385 1.3385 26.5115 1.69169L29.4872 5.15713C29.7225 5.41961 29.8986 5.71293 30.0156 6.0371C30.1325 6.36005 30.191 6.69874 30.191 7.05314V26.7209C30.191 27.5313 29.8942 28.2226 29.3004 28.7947C28.7067 29.3656 27.9877 29.6511 27.1436 29.6511H3.0493ZM2.60398 5.71595H27.5493L25.0397 2.8166C24.9177 2.70048 24.778 2.60795 24.6208 2.539C24.4636 2.47005 24.3 2.43558 24.1302 2.43558H6.02311C5.85455 2.43558 5.69101 2.47066 5.53251 2.54081C5.37401 2.61097 5.23563 2.70411 5.11738 2.82023L2.60398 5.71595ZM11.3198 7.53032V16.8797L15.0936 15.0654L18.8675 16.8797V7.53213L11.3198 7.53032Z"
            fill="white"
          />
        </svg>
      ),
      title: "DELIVERY EVERY 30 DAYS",
    },
    {
      id: "bulk",
      icon: (
        <svg
          width="40"
          height="34"
          viewBox="0 0 40 34"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M39.887 5.398L38.5378 2.69951C38.4028 2.42966 38.2005 2.29474 37.9306 2.29474V0.945496C37.9306 0.540723 37.6608 0.270874 37.256 0.270874H25.1128C24.708 0.270874 24.4382 0.540723 24.4382 0.945496V2.29474C24.1683 2.29474 23.9659 2.42966 23.831 2.69951L22.4818 5.398C22.4143 5.46546 22.4143 5.53292 22.4143 5.66785H18.3666C18.3666 5.53292 18.3666 5.46546 18.2991 5.398L16.9499 2.69951C16.8149 2.42966 16.6126 2.29474 16.3427 2.29474V0.945496C16.3427 0.540723 16.0729 0.270874 15.6681 0.270874H3.5249C3.12013 0.270874 2.85028 0.540723 2.85028 0.945496V2.29474C2.58043 2.29474 2.37805 2.42966 2.24312 2.69951L0.893878 5.398C0.826416 5.46546 0.826416 5.53292 0.826416 5.66785V25.9065C0.826416 26.3113 1.09626 26.5811 1.50104 26.5811H1.83835L2.9852 28.3351C3.12013 28.4701 3.32252 28.605 3.5249 28.605H11.6204V31.3035C11.6204 31.7082 11.8902 31.9781 12.295 31.9781H12.6323L13.7792 33.7321C13.9141 33.9345 14.1165 34.002 14.3188 34.002H26.462C26.6644 34.002 26.8668 33.867 27.0017 33.7321L28.1486 31.9781H28.4859C28.8907 31.9781 29.1605 31.7082 29.1605 31.3035V28.605H37.256C37.4584 28.605 37.6608 28.4701 37.7957 28.3351L38.9425 26.5811H39.2798C39.6846 26.5811 39.9545 26.3113 39.9545 25.9065V5.66785C39.9545 5.53292 39.9545 5.46546 39.887 5.398ZM25.7874 1.62012H36.5814V2.29474H25.7874V1.62012ZM24.8429 3.64398H37.5258L38.6052 5.80277V12.4141H35.0297C33.6805 10.5251 31.1844 9.8505 29.0931 10.8624C29.0931 10.795 29.0931 10.795 29.0931 10.7275L27.7438 8.02902C27.6089 7.82664 27.4065 7.69171 27.1367 7.69171V6.34247C27.1367 5.9377 26.8668 5.66785 26.462 5.66785H23.831L24.8429 3.64398ZM38.6052 25.2319H29.1605V19.3627C31.2518 20.3746 33.7479 19.7 35.0297 17.811H38.6052V25.2319ZM2.17566 17.811H5.75115C7.03293 19.7 9.52903 20.3746 11.6204 19.3627V25.2319H2.17566V17.811ZM2.17566 13.7633H5.07653C4.80668 14.6403 4.80668 15.5848 5.07653 16.4618H2.17566V13.7633ZM14.049 9.04095H26.7319L27.8113 11.1997V17.811H24.2358C22.7516 15.6522 19.7833 15.1125 17.692 16.5967C17.2197 16.934 16.8149 17.3388 16.4776 17.811H12.9696V11.1997L14.049 9.04095ZM31.1844 11.7394C32.3987 11.7394 33.4781 12.4141 34.0853 13.426C34.6924 14.4379 34.6924 15.7872 34.0853 16.7991C33.1408 18.4182 31.1169 18.9579 29.4978 18.0134C29.3629 17.946 29.228 17.8785 29.0931 17.7436V12.4141C29.7677 12.0093 30.4423 11.7394 31.1844 11.7394ZM15.8705 21.8588H12.9696V19.1603H15.8705C15.6006 20.0373 15.6006 20.9818 15.8705 21.8588ZM17.0173 20.5095C17.0173 18.6206 18.5015 17.1364 20.3904 17.1364C22.2794 17.1364 23.7635 18.6206 23.7635 20.5095C23.7635 22.3985 22.2794 23.8826 20.3904 23.8826C18.5015 23.8826 17.0173 22.3985 17.0173 20.5095ZM24.9104 19.1603H27.8113V21.8588H24.9104C25.1803 20.9818 25.1803 20.0373 24.9104 19.1603ZM11.6204 17.811C11.0132 18.2833 10.2711 18.4857 9.5965 18.4857C8.38218 18.4857 7.30278 17.811 6.69562 16.7991C6.08846 15.7872 6.08846 14.4379 6.69562 13.426C7.30278 12.4141 8.38218 11.7394 9.5965 11.7394C10.2711 11.7394 11.0132 11.9418 11.5529 12.3466H11.6204V17.811ZM12.9696 23.208H16.5451C18.0293 25.3668 20.9976 25.9065 23.0889 24.4223C23.5612 24.085 23.9659 23.6802 24.3032 23.208H27.8113V30.6288H12.9696V23.208ZM38.6052 16.4618H35.7044C35.9742 15.5848 35.9742 14.6403 35.7044 13.7633H38.6052V16.4618ZM25.7874 7.01709V7.69171H14.9935V7.01709H25.7874ZM4.19952 1.62012H14.9935V2.29474H4.19952V1.62012ZM3.25505 3.64398H15.9379L16.9499 5.66785H14.3188C13.9141 5.66785 13.6442 5.9377 13.6442 6.34247V7.69171C13.3744 7.69171 13.172 7.82664 13.0371 8.09648L11.6878 10.795V10.9299C9.5965 9.91796 7.1004 10.5926 5.75115 12.4815H2.17566V5.87023L3.25505 3.64398ZM3.86221 27.2557L3.38998 26.5811H11.6204V27.2557H3.86221ZM26.1247 32.6527H14.6562L14.1839 31.9781H26.5295L26.1247 32.6527ZM36.9187 27.2557H29.1605V26.5811H37.3234L36.9187 27.2557Z"
            fill="white"
          />
        </svg>
      ),
      title: "BUY BULK & SAVE",
    },
    {
      id: "shipping",
      icon: (
        <svg
          width="44"
          height="30"
          className="w-full h-full"
          viewBox="0 0 44 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.590698 0.621216V3.26029H26.1007V23.0534H17.8354C17.2366 20.7851 15.1609 19.0948 12.6744 19.0948C10.1878 19.0948 8.11212 20.7851 7.5133 23.0534H5.96122V16.4557H3.27596V25.6924H7.5133C8.11212 27.9607 10.1878 29.6511 12.6744 29.6511C15.1609 29.6511 17.2366 27.9607 17.8354 25.6924H28.9954C29.5942 27.9607 31.6699 29.6511 34.1565 29.6511C36.643 29.6511 38.7187 27.9607 39.3175 25.6924H43.5549V14.9303L43.4703 14.7231L40.785 6.80589L40.4937 5.89937H28.7859V0.621216H0.590698ZM1.93333 5.89937V8.53845H14.017V5.89937H1.93333ZM28.7859 8.53845H38.5616L40.8696 15.3011V23.0534H39.3175C38.7187 20.7851 36.643 19.0948 34.1565 19.0948C31.6699 19.0948 29.5942 20.7851 28.9954 23.0534H28.7859V8.53845ZM3.27596 11.1775V13.8166H11.3317V11.1775H3.27596ZM12.6744 21.7338C14.1741 21.7338 15.3596 22.899 15.3596 24.3729C15.3596 25.8468 14.1741 27.012 12.6744 27.012C11.1747 27.012 9.98911 25.8468 9.98911 24.3729C9.98911 22.899 11.1747 21.7338 12.6744 21.7338ZM34.1565 21.7338C35.6562 21.7338 36.8417 22.899 36.8417 24.3729C36.8417 25.8468 35.6562 27.012 34.1565 27.012C32.6567 27.012 31.4712 25.8468 31.4712 24.3729C31.4712 22.899 32.6567 21.7338 34.1565 21.7338Z"
            fill="white"
          />
        </svg>
      ),
      title: "FREE SHIPPING OVER $100",
    },
  ],
  onButtonClick,
  className = "",
}) => {
  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else if (buttonHref !== "#") {
      window.open(buttonHref, "_blank");
    }
  };

  return (
    <section
      className={`relative overflow-hidden rounded-3xl mx-4 md:mx-8 my-8 ${className} min-h-[700px] md:min-h-auto`}
    >
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat max-w-7xl mx-auto rounded-4xl hidden md:block"
        style={{
          backgroundImage: `url(${desktopBackgroundImage})`,
        }}
      ></div>

      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat max-w-7xl mx-auto rounded-4xl md:hidden block"
        style={{
          backgroundImage: `url(${mobileBackgroundImage})`,
        }}
      ></div>

      {/* Content Container */}
      <div className="relative z-10 px-8 py-6 md:px-16 md:pb-8 md:pt-16  max-w-7xl mx-auto rounded-4xl flex flex-col justify-end md:justify-center min-h-[700px] md:min-h-auto">
        <div className="w-full flex flex-col items-end text-center justify-end md:justify-start">
          <div className="flex flex-col items-center  max-w-lg md:justify-center">
            {/* Eyebrow Text */}
            <p className="text-white/90 text-lg md:text-base font-semibold uppercase tracking-wider mb-2 font-heading">
              {eyebrow}
            </p>

            {/* Main Title */}
            <h2 className="text-white text-5xl sm:text-6xl md:text-6xl  font-bold  mb-2 md:mb-6 max-w-3xl font-heading">
              Never Run Out <br /> Of Good Vibes
            </h2>

            {/* Description */}
            <p className="text-white/90 text-md md:text-md leading-relaxed mb-2 md:mb-8 max-w-sm font-medium">
              {description}
            </p>

            {/* CTA Button */}
            <Link
              href="#product"
              onClick={handleButtonClick}
              className=" bg-[#ffe25d]  font-heading  text-foreground font-light my-2 px-12 py-6 md:py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg md:mb-8"
            >
              {buttonText}
            </Link>
          </div>

          {/* Benefits Section */}
          <div className="grid grid-cols-1 md:flex md:justify-center  gap-1 md:gap-12 w-full justify-center">
            {benefits.map((benefit) => (
              <div
                key={benefit.id}
                className="flex items-center  justify-center h-6 font-heading md:gap-2"
              >
                {/* Icon Container */}
                <div className="flex-shrink-0 ">
                  <div className="w-12 h-12   rounded-lg flex items-center justify-center">
                    <div className="text-white w-6 h-6 md:h-8 md:w-8">
                      {benefit.icon}
                    </div>
                  </div>
                </div>

                {/* Benefit Text */}
                <div>
                  <h3 className="text-white font-bold text-sm md:text-lg uppercase tracking-wide leading-tight">
                    {benefit.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-8 right-8 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-full blur-xl" />
      <div className="absolute bottom-8 left-8 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-xl" />
    </section>
  );
};

export default LPSubscription;
