import "@/global-styles/globals.css";
import Footer from "@/frontend/components/consumers/Footer/Footer";
import NavBar from "@/frontend/components/consumers/NavBar/NavBar";

export default function RootLayout({ children }) {
  return (
    <>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
