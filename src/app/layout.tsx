import type { Metadata } from "next";
import { Space_Grotesk, Syne, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yash Soni — Data Analyst & AI Specialist",
  description:
    "I transform data into actionable insights, intelligent dashboards, and automated solutions. Data Analyst specializing in Python, SQL, Power BI, and Machine Learning.",
  keywords: [
    "Yash Soni", "Data Analyst", "AI Enthusiast", "Python", "SQL",
    "Power BI", "Machine Learning", "Data Visualization", "Business Intelligence",
  ],
  authors: [{ name: "Yash Soni" }],
  creator: "Yash Soni",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Yash Soni — Data Analyst & AI Specialist",
    description: "I transform data into actionable insights, intelligent dashboards, and automated solutions.",
    siteName: "Yash Soni Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yash Soni — Data Analyst & AI Specialist",
    description: "Data Analyst and AI specialist specializing in analytics, BI, Python, SQL, and automation.",
    creator: "@Yash_Soni24",
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`dark ${spaceGrotesk.variable} ${syne.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className="bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-x-hidden noise-overlay">
        {children}
      </body>
    </html>
  );
}
