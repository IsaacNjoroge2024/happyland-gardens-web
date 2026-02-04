import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { LayoutClient } from "@/components/layout";
import { BookingModalProvider, ToastProvider } from "@/context";
import Footer from "@/components/footer";
import { CookieConsent } from "@/components/cookie-consent";
import { OfflineBanner } from "@/components/ui/OfflineBanner";
import { siteMetadata } from "@/data/metadata";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: siteMetadata.siteName,
  description: siteMetadata.siteDescription,
  keywords: siteMetadata.keywords,
  alternates: {
    canonical: siteMetadata.siteUrl,
  },
  openGraph: {
    title: siteMetadata.siteName,
    description: siteMetadata.siteDescription,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.siteName,
    images: [
      {
        url: siteMetadata.ogImage,
        width: 1200,
        height: 634,
        alt: "Happyland Gardens Event Venue",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.siteName,
    description: siteMetadata.siteDescription,
    images: [siteMetadata.ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`} suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  var consent = localStorage.getItem('analytics_consent');
                  gtag('consent', 'default', {
                    analytics_storage: consent === 'true' ? 'granted' : 'denied',
                  });
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `,
              }}
            />
          </>
        )}
        <ToastProvider>
          <BookingModalProvider>
            <LayoutClient>
              <main id="main-content" tabIndex={-1}>
                {children}
              </main>
              <Footer />
            </LayoutClient>
          </BookingModalProvider>
        </ToastProvider>
        <CookieConsent />
        <OfflineBanner />
      </body>
    </html>
  );
}
