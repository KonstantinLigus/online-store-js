import React from "react";
import styles from "./Blog.module.scss";
import Link from "next/link";
import BlogItem from "../../BlogItem/BlogItem";

const Blog = () => {
  const articles = [
    {
      title: "Дивовижні властивості меду",
      text: `Не дивно, що бджоли знають про мед багато. Вони не лише виробники \
      меду, а і його споживачі, причому справжні гурмани. Запропонуйте хворій \
      бджолі різні сорти меду, і вона обере саме той, який найкраще бореться з \
      інфекцією. Людям, навпаки, належить ще багато дізнатися про поживні \
      властивості меду. Лише кілька десятиліть тому мед не відносили до надзвичайно \
      корисних продуктів за межами базового харчування, каже ентомолог Мей Беренбаум \
      з Університету Іллінойсу в Урбана-Шампейн. "Навіть пасічники та дослідники \
      бджіл вважали його нічим іншим як цукровою водою".`,
      imageAlt: "honey",
      image: "/assets/blog-page/delicious-honey.jpg",
      linkTo: "/blog/honey",
    },
    {
      title: "Lorem ipsum dolor sit amet",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. \
      Duis hendrerit eros eu purus pulvinar facilisis. Vestibulum varius \
      ex a nisl euismod, ac elementum elit tempus. Aliquam dignissim libero \
      id facilisis auctor. Proin molestie condimentum mi quis pretium. \
      Phasellus sit amet ligula turpis. Praesent dui odio, mollis a metus et, \
      tempus tincidunt lectus. Nam pharetra, odio quis sodales porta, diam orci \
      aliquet neque, ut placerat dui mauris ut tellus. Nulla porttitor dui at \
      arcu vestibulum aliquam. Nulla eget ipsum vel orci interdum porta at sed \
      lorem. Morbi efficitur tempus mi in fringilla. Proin tristique ante id erat \
      rhoncus, eget hendrerit turpis ultrices.",
      imageAlt: "honey",
      image: "/assets/blog-page/variety-of-dairy-products.jpg",
      linkTo: "/blog/honey",
    },
  ];

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>
        <Link href="/blog">Наш блог</Link>
      </h2>

      <div className={styles.articles}>
        {articles.map((article, index) => (
          <BlogItem
            key={index}
            title={article.title}
            text={article.text}
            image={article.image}
            imageAlt={article.imageAlt}
            linkTo={article.linkTo}
          />
        ))}
      </div>
    </section>
  );
};

export default Blog;
