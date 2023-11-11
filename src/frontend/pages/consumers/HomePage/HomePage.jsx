import Banner from "@/frontend/components/consumers/Banner/Banner";
import About from "@/frontend/components/consumers/About/About";
import ProductList from "@/frontend/components/consumers/ProductList/ProductList";
import Blog from "@/frontend/components/consumers/Blog/Blog";
import styles from "@/frontend/pages/consumers/HomePage/HomePage.module.scss";
import { Payment } from "@/frontend/components/consumers/Payment/Payment";
import { createDataAndSignatureObj } from "@/backend/libs/liqPay";

export default async function HomePage() {
  const dataAndSignatureObj = createDataAndSignatureObj({
    amount: 10,
    currency: "UAH",
    description: "hello",
    order_id: "order_id_4",
  });
  return (
    <>
      <Banner />
      <div className={styles.dividerSmall}></div>
      <About />
      <div className={styles.divider}></div>
      <ProductList className={styles.productList} title="Популярні товари" />
      <div className={styles.divider}></div>
      <ProductList className={styles.productList} title="Акційні товари" />
      <div className={styles.divider}></div>
      <Blog />
      <div className={styles.dividerSmall}></div>
      <Payment dataAndSignatureObj={dataAndSignatureObj} />
    </>
  );
}
