import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { WaitlistProvider } from "@/components/waitlist-provider";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const description =
  "Luuv& is opening by invitation. Join the waitlist for early access to AI matchmaking, curated introductions and in-person events, built for people who've outgrown swiping.";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000",
  ),
  title: "Luuv& | Join the waitlist",
  description,
  openGraph: {
    title: "Luuv& | Meet people worth rearranging your calendar for",
    description,
    type: "website",
    siteName: "Luuv&",
    images: [{ url: "/hero-photo.jpg", width: 900, height: 1350 }],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={openSans.variable}>
      <body>
        <WaitlistProvider>{children}</WaitlistProvider>
      </body>
    </html>
  );
}
