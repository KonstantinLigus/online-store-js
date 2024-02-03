"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./SearchDialog.module.scss";

export default function FoundProduct({ item, closeSearch }) {
  return (
    <div onClick={closeSearch} className={styles.productContainer}>
      <Link href={`${item._id}`}>
        <Image
          className={styles.cardImage}
          src={item.mainImage}
          alt={item.title}
          width={200}
          height={200}
          priority
        />
        <p className={styles.productTitle}>{item.title}</p>
      </Link>
    </div>
  );
}
