import type { Metadata } from "next";
import { FC, ReactNode } from 'react'
import { Manrope } from "next/font/google"
import '@/app/globals.css'
import { ThemeProvider } from '@/components'
import { Toaster } from '@/components/ui/toaster'

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mediscan",
  description: "Mediscan is a mobile/web application that aims to solve the problem of inefficient product searches and stock checks. The expected outcome is an AI-driven application that uses image recognition for quick, accurate product identification, offering relevant information via images.",
};

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={manrope.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout;

interface RootLayoutProps {
  children: ReactNode;
}