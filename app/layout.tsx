import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import { navigationItems } from "@/app/config/navigation";
import { SiteFooter } from "@/ui/navigation/SiteFooter";
import { SiteHeader } from "@/ui/navigation/SiteHeader";

import "./styles/globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
};

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["300", "400", "600"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${roboto.variable} bg-background text-foreground`}>
        <ThemeProvider>
          <SiteHeader items={navigationItems} />
          {children}
          <SiteFooter items={navigationItems} />
        </ThemeProvider>
      </body>
    </html>
  );
}
