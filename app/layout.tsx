import { GeistSans } from "geist/font/sans";
import { baseUrl } from "lib/utils";
import { ReactNode } from "react";
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
  // Don't await the fetch, pass the Promise to the context provider
  // const cart = getCart();

  return (
    <html lang="en" className={GeistSans.variable}>
      <body
        className={`text-foreground bg-background ${acuminFont.variable} ${riftFont.variable}`}
      >
        <main className="font-body">{children}</main>
      </body>
    </html>
  );
}
