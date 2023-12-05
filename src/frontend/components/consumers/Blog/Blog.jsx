import React from "react";
import styles from "./Blog.module.scss";

const Blog = () => {
  const paragraph =
    "Adipiscing vitae proin sagittis nisl rhoncus mattis. \
    Ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at. \
    Ac tortor dignissim convallis aenean et tortor. Lectus magna fringilla \
    urna porttitor rhoncus dolor purus. Semper quis lectus nulla at.Lorem \
    ipsum dolor sit amet consectetur adipiscing.";
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Наш блог</h2>
      <div className={styles.wrapper}>
        <article className={styles.article}>
          <h3 className={styles.articleTitle}>Lorem ipsum dolor sit amet.</h3>
          <p className={styles.articleText}>{paragraph}</p>
          <p className={styles.articleLink}>
            Читати далі <span>&gt;</span>
          </p>
        </article>

        <article className={styles.article}>
          <h3 className={styles.articleTitle}>Consectetur adipiscing elit.</h3>
          <p className={styles.articleText}>{paragraph}</p>
          <p className={styles.articleLink}>
            Читати далі <span>&gt;</span>
          </p>
        </article>

        <article className={styles.article}>
          <h3 className={styles.articleTitle}>
            Adipiscing commodo elit at imperdiet dui.
          </h3>
          <p className={styles.articleText}>{paragraph}</p>
          <p className={styles.articleLink}>
            Читати далі <span>&gt;</span>
          </p>
        </article>
      </div>
    </section>
  );
};

export default Blog;
