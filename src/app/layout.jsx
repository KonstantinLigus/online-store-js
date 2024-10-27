import { Wix_Madefor_Display } from "next/font/google";

const font = Wix_Madefor_Display({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["cyrillic", "latin"],
});

export const metadata = {
  title: "Store",
  description: "Online store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
