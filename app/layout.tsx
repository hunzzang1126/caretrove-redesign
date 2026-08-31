import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Bricolage_Grotesque, Instrument_Serif } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  weight: ["600", "700", "800"],
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument",
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "CareTrove | Find and book health & wellness clinics in Michigan",
  description:
    "Search clinics by treatment and location, read verified reviews, and request an appointment. Michigan-first.",
  openGraph: {
    title: "CareTrove",
    description: "Find and book trusted health & wellness providers in Michigan.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} ${bricolage.variable} ${instrument.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
