import styles from "./ProductPage.module.scss";
import Image from "next/image";
import product from "../../../../../public/assets/product.png";
import heart from "../../../../../public/assets/icon/heart-icon.svg";
import information from "../../../../../public/assets/icon/information-line-icon.svg";
import ProductList from "@/frontend/components/consumers/ProductList/ProductList";

const characteristic = [
  {
    id: 0,
    title: "Умови зберігання:",
    description: "температура від +2 до +5; вологість 85-90%",
  },
  {
    id: 1,
    title: "Термін зберігання:",
    description: "3-5 днів",
  },
  {
    id: 2,
    title: "Країна походження:",
    description: "Іспанія, Греція",
  },
];

const ProductPage = props => {
  console.log(props);

  return (
    <div className={styles.productCard}>
      <h2 className={styles.productName}>f{props.id}</h2>
    </div>
  );
};

export default ProductPage;
