"use client";
import React, { useEffect, useState } from "react";
import styles from "./BlogPage.module.scss";
import PathToPage from "@/frontend/components/consumers/PathToPage/PathToPage";
import BlogItem from "@/frontend/components/consumers/BlogItem/BlogItem";
import { blogArticles } from "./blogArticles";

const BlogPage = () => {
  const articles = [...blogArticles];

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
