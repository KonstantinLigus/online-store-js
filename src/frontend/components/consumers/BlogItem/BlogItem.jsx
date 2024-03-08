import React from "react";
import styles from "./BlogItem.module.scss";
import Link from "next/link";
import Image from "next/image";

const BlogItem = ({ title, text, image, imageAlt, linkTo }) => {
  return (
    <div className={styles.wrapper}>
      <article className={styles.article}>
        <h3 className={styles.title}>
          <Link href={linkTo}>{title}</Link>
        </h3>
        <div className={styles.content}>
          <div className={styles.imageWrapper}>
            <Link href={linkTo}>
              <Image
                className={styles.image}
                src={image}
                alt={imageAlt}
                priority
                fill
              />
            </Link>
          </div>
          <p className={styles.articleText}>{text}</p>
        </div>
      </article>

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
    </div>
  );
};

export default BlogItem;
