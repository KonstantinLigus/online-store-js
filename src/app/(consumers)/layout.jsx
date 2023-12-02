import "@/global-styles/globals.css";
import { Inter } from "next/font/google";
import SessionProvider from "@/frontend/pages/consumers/SessionProvider/SessionProvider";
import UserBar from "@/frontend/pages/consumers/UserBar/UserBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Store",
  description: "Online store",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <UserBar />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
