import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/navbar";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { AiChatbot } from "@/components/ui/chatbot";

const onest = Onest({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Tarun Sathyanarayanan | Portfolio",
  description: "Portfolio of Tarun Sathyanarayanan — Data Science Master's student at the University of Basel. Experienced in deep learning, automated data pipelines, and real-time tracking systems.",
  openGraph: {
    title: "Tarun Sathyanarayanan | Portfolio",
    description: "Portfolio of Tarun Sathyanarayanan — Data Science Master's student at the University of Basel. Experienced in deep learning, automated data pipelines, and real-time tracking systems.",
    url: "https://tarunsathya.dev",
    siteName: "Tarun Sathyanarayanan",
    images: [
      {
        url: "/profile.png",
        width: 1200,
        height: 630,
        alt: "Tarun Sathyanarayanan - Data Scientist & Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tarun Sathyanarayanan | Portfolio",
    description: "Portfolio of Tarun Sathyanarayanan — Data Science Master's student at the University of Basel.",
    images: ["/profile.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${onest.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main>{children}</main>
          <AiChatbot />
        </ThemeProvider>
      </body>
    </html>
  );
}

