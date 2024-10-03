import type { Metadata } from "next";
import { Inter } from "next/font/google"
import "./globals.css";
import { ThemeProvider } from "@/components/themeProvider";
import Link  from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Attendify",
  description: "Mark your Attendence",
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}
      >
        <ThemeProvider
           attribute="class"
           defaultTheme="system"
           enableSystem
           disableTransitionOnChange
        >
          <nav className="flex justify-around items-center py-4 px-8">
            <Link href="/"><p className="font-bold text-3xl">Attendify</p></Link>
            <div className="flex justify-around items-center gap-4">
              <Link href="/login"><Button className="text-lg" variant="link">Login</Button></Link>
              <Link href="/sign-up"><Button className="text-lg">Sign Up</Button></Link>
            </div>
          </nav>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
} 
