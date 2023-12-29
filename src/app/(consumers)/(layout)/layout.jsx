import "@/global-styles/globals.css";
import Footer from "@/frontend/components/consumers/Footer/Footer";
import NavBar from "@/frontend/components/consumers/NavBar/NavBar";
import { cookies } from "next/headers";

export default function ConsumerLayout({ children }) {
  const token = cookies().get("token")?.value;
  return (
    <>
      <NavBar token={token} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
