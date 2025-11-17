import { GeistSans } from "geist/font/sans";
import { baseUrl } from "lib/utils";
import { ReactNode } from "react";
import Script from "next/script";
import "./globals.css";

const { SITE_NAME } = process.env;
import localFont from "next/font/local";

const riftFont = localFont({
  src: [
    {
      path: "../fonts/RiftBold.otf",
      weight: "700",
      style: "bold",
    },
  ],
  variable: "--rift-font-family",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
  preload: true,
});

const acuminFont = localFont({
  src: [
    {
      path: "../fonts/AcuminVariableConcept.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-acumin",
});

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`,
  },
  robots: {
    follow: true,
    index: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <head>
        {/* GTM Script no head com strategy="beforeInteractive" */}
        <Script id="google-tag-manager" strategy="beforeInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NZQF2BJP');
          `}
        </Script>
      </head>
      <body
        className={`text-foreground bg-background ${acuminFont.variable} ${riftFont.variable}`}
      >
        {/* GTM - noscript logo após a tag <body> */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-NZQF2BJP"
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        <main className="font-body">{children}</main>
      </body>
    </html>
  );
}
