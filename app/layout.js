import { Inter } from "next/font/google";
import "./globals.css";
import { LangProvider } from "../lib/lang";
import { ThemeProvider } from "../lib/theme";
import { StoreProvider } from "../lib/store";
import ChatBot from "../components/ChatBot";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Trustify — AI Digital Safety Assistant",
  description: "Bantu masyarakat Indonesia mendeteksi scam, phishing, hoax, dan manipulasi digital sebelum menjadi korban. Cek dulu sebelum percaya.",
  keywords: ["scam detector", "phishing", "hoax", "trustify", "keamanan digital", "indonesia"],
  openGraph: {
    title: "Trustify — AI Digital Safety Assistant",
    description: "Indonesia's AI-powered Digital Trust & Safety Ecosystem",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <ThemeProvider>
          <LangProvider>
            <StoreProvider>
              {children}
              <ChatBot />
            </StoreProvider>
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
