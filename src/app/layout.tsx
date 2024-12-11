import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/ui/common/Navbar";
import ScrollToTop from "./components/ui/common/ScrollToTop";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from './context/AuthContext';

const inter = Inter({ subsets: ["latin"],
  weight: ['400','500','700'],
});

export const metadata: Metadata = {
  title: "NEXTGEN",
  description: "India Post's financial services can be revolutionized by leveraging an AI-driven system that segments populations based on demographics, geographic regions, and economic cycles. This solution identifies the financial needs of specific groups, such as farmers, senior citizens, and women, by analyzing real-time data on gender, age, occupation, farming cycles, and economic conditions. It dynamically generates reports and predictions on the demand for financial products during specific timeframes, such as festival seasons or farming cycles, enabling more precise targeting.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLoggedIn = typeof window !== 'undefined' ? localStorage.getItem('isLoggedIn') === 'true' : false;

  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#F3F9FF] w-screen min-h-screen mx-auto overflow-x-hidden`}>
        <AuthProvider>
          <Navbar isLoggedIn={isLoggedIn}/>
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              style: {
                zIndex: 9999,
              },
            }}
          />
          <main className="pt-16"> 
            {children}
          </main>
          <ScrollToTop />
        </AuthProvider>
      </body>
    </html>
  );
}