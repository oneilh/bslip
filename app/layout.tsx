import type { Metadata } from "next";
import { Sora, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { AuthModal } from "@/components/auth/AuthModal";
import { SlipBuilderProvider } from "@/components/builder/SlipBuilderContext";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "bslip — Slip Builder",
  description: "Configure your settings and generate slips quickly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <SlipBuilderProvider>
            <Header />

            {/* Main Application Area */}
            <main className="flex-1 w-full max-w-[1360px] mx-auto px-5 md:px-8 py-6 md:py-8 flex flex-col">
              {children}
            </main>

            {/* Global Backdrop Dialogue Modal */}
            <AuthModal />
          </SlipBuilderProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
