import Banner from "@/frontend/components/consumers/HomePageComponents/Banner/Banner";
import About from "@/frontend/components/consumers/HomePageComponents/About/About";
import ProductList from "@/frontend/components/consumers/ProductList/ProductList";
import Blog from "@/frontend/components/consumers/HomePageComponents/Blog/Blog";
import styles from "@/frontend/pages/consumers/HomePage/HomePage.module.scss";
import { PaymentExample } from "@/frontend/components/consumers/PaymentExample/PaymentExample";

export default async function HomePage() {
  return (
    <>
      <Banner />
      <div className={styles.divider}></div>
      <About />
      <div className={styles.divider}></div>
      <ProductList
        className={styles.productList}
        title="Популярні товари"
        products="label=популярні"
      />
      <div className={styles.divider}></div>
      <ProductList
        className={styles.productList}
        title="Акційні товари"
        products="label=акційні"
      />
      <div className={styles.divider}></div>
      <Blog />
      <div className={styles.divider}></div>
    </>
  );
}
