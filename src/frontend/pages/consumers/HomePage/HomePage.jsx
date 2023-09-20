import Banner from "@/frontend/components/consumers/Banner/Banner";
import About from "@/frontend/components/consumers/About/About";
import ProductList from "@/frontend/components/consumers/ProductList/ProductList";

export default async function HomePage() {
    return (
        <>
            <Banner/>
            <About />
            <ProductList/>
        </>
    );
}
