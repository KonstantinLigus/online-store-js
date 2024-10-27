import "@/global-styles/globals.css";
import SessionProvider from "@/frontend/pages/consumers/SessionProvider/SessionProvider";
import NavBar from "@/frontend/components/consumers/NavBar/NavBar";
import Footer from "@/frontend/components/consumers/Footer/Footer";
import { cookies } from "next/headers";

export default async function ConsumersRootLayout({ children }) {
  const token = cookies().get("token")?.value;

  return (
    <>
      <SessionProvider>
        <NavBar token={token} />
        <main>{children}</main>
        <Footer />
      </SessionProvider>
      <div id="modal-root" />
    </>
  );
}
