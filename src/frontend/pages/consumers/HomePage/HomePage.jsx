import Hero from "@/frontend/components/consumers/HomePageComponents/Hero/Hero";
import About from "@/frontend/components/consumers/HomePageComponents/About/About";
import ProductList from "@/frontend/components/consumers/ProductList/ProductList";
import CallToAction from "@/frontend/components/consumers/HomePageComponents/CallToAction/CallToAction";
import styles from "@/frontend/pages/consumers/HomePage/HomePage.module.scss";

export default async function HomePage() {
  return (
    <>
      <Hero />
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
      <CallToAction />
      <div className={styles.divider}></div>
    </>
  );
}
