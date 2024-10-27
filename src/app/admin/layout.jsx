import "../../global-styles/globals.css";
import Header from "@/frontend/components/admin/Header";
import Footer from "@/frontend/components/admin/Footer";

export default function AdminRootLayout({ children }) {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
