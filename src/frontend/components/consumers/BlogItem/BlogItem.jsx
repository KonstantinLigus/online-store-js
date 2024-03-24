import React from "react";
import styles from "./BlogItem.module.scss";
import Link from "next/link";
import Image from "next/image";

const BlogItem = ({ title, text, image, imageAlt, linkTo }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.imageWrapper}>
        <Image
          className={styles.image}
          src={image}
          alt={imageAlt}
          priority
          fill
        />
      </div>

      <div className={styles.articleWrapper}>
        <article className={styles.article}>
          <h3 className={styles.title}>
            <Link href={linkTo}>{title}</Link>
          </h3>

          <div className={styles.content}>
            <p className={styles.articleText}>{text}</p>
          </div>

          <Link href={linkTo} className={styles.articleLink}>
            <span>Читати далі </span>
            <Image
              src="/assets/icon/icon-angle-right.svg"
              width={14}
              height={14}
              alt="angle icon"
              priority
            />
          </Link>
        </article>
      </div>
    </div>
  );
};

export default BlogItem;
