import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import { TRPCReactProvider } from "@/trpc/client";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aura — Express. Connect. Evolve.",
  description:
    "Aura is a next-generation social media platform. Share your story, connect with your people, and evolve your digital presence.",
  keywords: ["social media", "photos", "stories", "connect", "aura"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${jetbrainsMono.variable} dark`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh flex flex-col antialiased">
        <ThemeProvider>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
