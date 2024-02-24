import Loader from "@/frontend/components/consumers/Loader";
import styles from "./LoadPage.module.scss";

const LoadPage = () => (
  <div className={styles.LoadPage__container}>
    <Loader />
  </div>
);

export default LoadPage;
