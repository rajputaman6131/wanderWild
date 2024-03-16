import Link from "next/link";
import React from "react";
import styles from "./menuCategories.module.css";
import { categories } from "@/constants/constants";

const MenuCategories = () => {
  return (
    <div className={styles.categoryList}>
      {categories.map((category, index) => (
        <Link key={index} href={`/blog?cat=${category}`} className={`${styles.categoryItem} ${styles[category.replace(' ', '_').toLowerCase()]}`}>
          {category}
        </Link>
      ))}
    </div>
  );
};

export default MenuCategories;
