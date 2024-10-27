import "@/global-styles/globals.css";
// import { Wix_Madefor_Display } from "next/font/google";
import SessionProvider from "@/frontend/pages/consumers/SessionProvider/SessionProvider";
import NavBar from "@/frontend/components/consumers/NavBar/NavBar";
import Footer from "@/frontend/components/consumers/Footer/Footer";
import { cookies } from "next/headers";

// const font = Wix_Madefor_Display({
//   weight: ["400", "500", "600", "700", "800"],
//   subsets: ["cyrillic", "latin"],
// });

// export const metadata = {
//   title: "Store",
//   description: "Online store",
// };

export default async function ConsumersRootLayout({ children }) {
  const token = cookies().get("token")?.value;

  return (
    // <html lang="en">
    //   <body className={font.className}>
    <>
      <SessionProvider>
        <NavBar token={token} />
        <main>{children}</main>
        <Footer />
      </SessionProvider>
      <div id="modal-root" />
    </>
    //   </body>
    // </html>
  );
}
