import "@/global-styles/globals.css";
import { Inter } from "next/font/google";
import Footer from "@/frontend/components/consumers/Footer/Footer";
import NavBar from "@/frontend/components/consumers/NavBar/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Store",
  description: "Online store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
