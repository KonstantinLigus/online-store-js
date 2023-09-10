import Banner from "@/frontend/components/consumers/Banner/Banner";
import ProductList from "@/frontend/components/consumers/ProductList/ProductList";

export default async function HomePage() {
    return (
        <>
            <Banner/>
            <ProductList/>
        </>
    );
}
