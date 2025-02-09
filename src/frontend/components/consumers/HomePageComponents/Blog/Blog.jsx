"use client";
import React from "react";
import styles from "./Blog.module.scss";
import Link from "next/link";
import BlogItem from "../../BlogItem/BlogItem";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { blogArticles } from "@/frontend/pages/consumers/BlogPage/blogArticles";

const Blog = () => {
  const articles = [...blogArticles, ...blogArticles, ...blogArticles];

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>
        <Link href="/blog">Наш блог</Link>
      </h2>

      <Swiper
        pagination={{
          type: "bullets",
          clickable: true,
          dynamicBullets: true,
          dynamicMainBullets: 3,
        }}
        slidesPerView={1}
        spaceBetween={8}
        modules={[Pagination]}
        loop={true}
        className={styles.articlesSwiper}
        breakpoints={{
          1024: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
        }}
      >
        {articles.map((article, index) => (
          <SwiperSlide key={index}>
            <BlogItem
              title={article.title}
              text={article.text}
              image={article.image}
              imageAlt={article.imageAlt}
              linkTo={article.linkTo}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Blog;
