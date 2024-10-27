import "../../global-styles/globals.css";
// import { Inter } from "next/font/google";
import Header from "@/frontend/components/admin/Header";
import Footer from "@/frontend/components/admin/Footer";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Store",
//   description: "Online store",
// };

export default function AdminRootLayout({ children }) {
  return (
    // <html lang="en">
    //   <body className={inter.className}>
    <>
      <header>
        <Header />
      </header>
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </>
    //   </body>
    // </html>
  );
}
