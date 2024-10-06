import "@/global-styles/globals.css";
import { Wix_Madefor_Display } from "next/font/google";
import SessionProvider from "@/frontend/pages/consumers/SessionProvider/SessionProvider";

const font = Wix_Madefor_Display({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["cyrillic", "latin"],
});

export const metadata = {
  title: "Store",
  description: "Online store",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <SessionProvider>{children}</SessionProvider>
        <div id="modal-root" />
      </body>
    </html>
  );
}
