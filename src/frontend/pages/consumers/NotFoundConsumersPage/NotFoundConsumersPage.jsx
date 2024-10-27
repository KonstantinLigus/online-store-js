import Image from "next/image";
import styles from "./NotFoundConsumersPage.module.scss";
import Link from "next/link";

const NotFoundConsumersPage = () => {
  return (
    <section className={styles.notFound_Section}>
      <div className={styles.notFound_Section__wrapper}>
        <h1 className={styles.notFound_Section__title}>
          Упс! Щось пішло не так
        </h1>
        <Link href="/" className={styles.notFound_Section__link}>
          На головну
        </Link>
      </div>
      <Image
        src="/not-found-bg.png"
        height={898}
        width={898}
        sizes="50vw"
        alt="not found bg"
        className={styles.notFound_Section__Image}
      />
    </section>
  );
};

export default NotFoundConsumersPage;
