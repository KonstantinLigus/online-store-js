import "@/global-styles/globals.css";
import { Inter } from "next/font/google";
import AuthProviders from "@/frontend/pages/consumers/AuthProviders/AuthProviders";
import UserBar from "@/frontend/pages/consumers/UserBar/UserBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Store",
  description: "Online store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProviders>
          <UserBar />
          {children}
        </AuthProviders>
      </body>
    </html>
  );
}
