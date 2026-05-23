import type { Metadata } from "next";
import { Sora, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import SlipPanel from "@/components/layout/SlipPanel";
import ViewSlipMobile from "@/components/layout/ViewSlipMobile";
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
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AuthProvider>
          <SlipBuilderProvider>
            <Header />
            
            {/* Main Application Area — CSS Grid Layout */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-[1fr_320px] max-w-360 mx-auto w-full md:h-[calc(100vh-64px)]">
              {/* Main Workspace Column */}
              <main className="w-full md:h-full md:overflow-y-auto px-4 md:px-6 py-6">
                {children}
              </main>
              {/* Slip Panel Sidebar */}
              <aside className="hidden md:flex flex-col md:h-full md:overflow-y-auto p-6 pl-0">
                <SlipPanel />
              </aside>
            </div>

            {/* Mobile Floating Action Bar */}
            <ViewSlipMobile />

            {/* Global Backdrop Dialogue Modal */}
            <AuthModal />
          </SlipBuilderProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
