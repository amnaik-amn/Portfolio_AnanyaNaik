import "@/styles/globals.css";
import { Inter } from "next/font/google";
import clsx from "clsx";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: "Ananya Naik | Portfolio",
  description: "Architecture, art, and personal experiments by Ananya Naik."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={clsx("min-h-screen antialiased", inter.variable)}>
        <ThemeProvider>
          <ReactQueryProvider>
            <SiteShell>{children}</SiteShell>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

