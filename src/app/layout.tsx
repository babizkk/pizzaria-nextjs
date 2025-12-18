import type { Metadata } from "next";
import { Fira_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const firaSans = Fira_Sans({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Friday Pizza - Delicious Pizzas Delivered",
  description: "Order the best pizzas in town. Fresh ingredients, quick delivery, and amazing taste!",
  keywords: ["pizza", "delivery", "food", "restaurant"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={firaSans.className}>
        <div className="main-container">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
