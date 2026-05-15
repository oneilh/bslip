import type { Metadata } from "next";
import { Sora, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import SlipPanel from "@/components/layout/SlipPanel";
import ViewSlipMobile from "@/components/layout/ViewSlipMobile";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { AuthModal } from "@/components/auth/AuthModal";

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
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AuthProvider>
          <Header />
          
          {/* Main Application Area */}
          <div className="flex-1 flex max-w-[1440px] mx-auto w-full md:h-[calc(100vh-64px)]">

            {/* Main Workspace Column (Discover/Selection Container) */}
            <main className="flex-1 flex flex-col w-full md:h-full md:overflow-y-auto px-4 md:px-6 py-6 lg:w-[70%] md:w-[65%]">
              {children}
            </main>
            {/* Slip Panel Column (Your Slip) - Moved to Left */}
            <aside className="hidden md:flex w-[35%] lg:w-[30%] shrink-0 h-full p-6 pr-0">
              <SlipPanel />
            </aside>
          </div>

          {/* Mobile Floating Action Bar */}
          <ViewSlipMobile />

          {/* Global Backdrop Dialogue Modal */}
          <AuthModal />
        </AuthProvider>
      </body>
    </html>
  );
}
