import "../../global-styles/globals.css";
import {Montserrat} from "next/font/google";
import Footer from "@/frontend/components/consumers/Footer/Footer";
import NavBar from "@/frontend/components/consumers/NavBar/NavBar";

const montserrat = Montserrat({subsets: ["latin"]});

export const metadata = {
    title: "Store",
    description: "Online store",
};

export default function RootLayout({
                                       children,
                                   }) {
    return (
        <html lang="en">
        <body className={montserrat.className}>
        <div className='wrapper'>
            <NavBar/>
            <main>{children}</main>
            <Footer/>
        </div>
        </body>
        </html>
    );
}
