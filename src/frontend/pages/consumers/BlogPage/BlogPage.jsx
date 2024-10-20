"use client";
import React, { useEffect, useState } from "react";
import styles from "./BlogPage.module.scss";
import PathToPage from "@/frontend/components/consumers/PathToPage/PathToPage";
import BlogItem from "@/frontend/components/consumers/BlogItem/BlogItem";

const BlogPage = () => {
  const articles = [
    {
      title: "Дивовижні властивості меду",
      text: `He дивно, що бджоли знають про мед багато. Вони не лише виробники \
      меду, a i його споживачі, причому справжні гурмани. Запропонуйте хворій \
      бджолі різні сорти меду, i вона o6epe саме той, який найкраще бореться з \
      інфекцією. Людям, навпаки, належить ще багато дізнатися про поживні \
      властивості меду. Лише кілька десятиліть тому мед не відносили до надзвичайно \
      корисних продуктів за межами базового харчування, каже ентомолог Мей Беренбаум \
      з Університету Іллінойсу в Урбана-Шампейн.`,
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
      lorem. Morbi efficitur tempus mi in fringilla.",
      imageAlt: "honey",
      image: "/assets/blog-page/variety-of-dairy-products.jpg",
      linkTo: "/blog/honey",
    },
    {
      title: "Maecenas eu laoreet justo",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. \
      Duis hendrerit eros eu purus pulvinar facilisis. Vestibulum varius \
      ex a nisl euismod, ac elementum elit tempus. Aliquam dignissim libero \
      id facilisis auctor. Proin molestie condimentum mi quis pretium. \
      Phasellus sit amet ligula turpis. Praesent dui odio, mollis a metus et, \
      tempus tincidunt lectus. Nam pharetra, odio quis sodales porta, diam orci \
      aliquet neque, ut placerat dui mauris ut tellus. Nulla porttitor dui at \
      arcu vestibulum aliquam. Nulla eget ipsum vel orci interdum porta at sed \
      lorem. Morbi efficitur tempus mi in fringilla.",
      imageAlt: "honey",
      image: "/assets/blog-page/green-fruits.jpg",
      linkTo: "/blog/honey",
    },
    {
      title: "Mauris blandit at urna sit amet",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. \
      Duis hendrerit eros eu purus pulvinar facilisis. Vestibulum varius \
      ex a nisl euismod, ac elementum elit tempus. Aliquam dignissim libero \
      id facilisis auctor. Proin molestie condimentum mi quis pretium. \
      Phasellus sit amet ligula turpis. Praesent dui odio, mollis a metus et, \
      tempus tincidunt lectus. Nam pharetra, odio quis sodales porta, diam orci \
      aliquet neque, ut placerat dui mauris ut tellus. Nulla porttitor dui at \
      arcu vestibulum aliquam. Nulla eget ipsum vel orci interdum porta at sed \
      lorem. Morbi efficitur tempus mi in fringilla.",
      imageAlt: "honey",
      image: "/assets/blog-page/set-of-nuts.jpg",
      linkTo: "/blog/honey",
    },
    {
      title: " Praesent et cursus neque",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. \
      Duis hendrerit eros eu purus pulvinar facilisis. Vestibulum varius \
      ex a nisl euismod, ac elementum elit tempus. Aliquam dignissim libero \
      id facilisis auctor. Proin molestie condimentum mi quis pretium. \
      Phasellus sit amet ligula turpis. Praesent dui odio, mollis a metus et, \
      tempus tincidunt lectus. Nam pharetra, odio quis sodales porta, diam orci \
      aliquet neque, ut placerat dui mauris ut tellus. Nulla porttitor dui at \
      arcu vestibulum aliquam. Nulla eget ipsum vel orci interdum porta at sed \
      lorem. Morbi efficitur tempus mi in fringilla.",
      imageAlt: "honey",
      image: "/assets/blog-page/delicious-pieces-of-cheese.jpg",
      linkTo: "/blog/honey",
    },
    {
      title: "Curabitur rutrum consectetur urna",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. \
      Duis hendrerit eros eu purus pulvinar facilisis. Vestibulum varius \
      ex a nisl euismod, ac elementum elit tempus. Aliquam dignissim libero \
      id facilisis auctor. Proin molestie condimentum mi quis pretium. \
      Phasellus sit amet ligula turpis. Praesent dui odio, mollis a metus et, \
      tempus tincidunt lectus. Nam pharetra, odio quis sodales porta, diam orci \
      aliquet neque, ut placerat dui mauris ut tellus. Nulla porttitor dui at \
      arcu vestibulum aliquam. Nulla eget ipsum vel orci interdum porta at sed \
      lorem. Morbi efficitur tempus mi in fringilla.",
      imageAlt: "honey",
      image: "/assets/blog-page/vegetables-on-wooden-table.jpg",
      linkTo: "/blog/honey",
    },
  ];

  return (
    <>
      <PathToPage pageTitle={"Наш блог"} />
      <div className={styles.blog}>
        <p className={styles.title}>Наш блог</p>

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
      </div>
    </>
  );
};

export default BlogPage;
