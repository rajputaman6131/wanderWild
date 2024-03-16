import React from "react";
import styles from "./categoryList.module.css";
import Link from "next/link";
import Image from "next/image";
import { BASE_URL } from "@/constants/constants";

const getData = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/categories`);

    return res
  } catch (error) {
    console.log(error)
  }
};

const CategoryList = async () => {
  const data = await getData();
  return (
    data.length ? <div className={styles.container}>
      <h1 className={styles.title}>Popular Categories</h1>
      <div className={styles.categories}>
        {data?.map((item) => (
          <Link
            href="/blog?cat=style"
            className={`${styles.category} ${styles[item.slug]}`}
            key={item._id}
          >
            {item.img && (
              <Image
                src={item.img}
                alt=""
                width={32}
                height={32}
                className={styles.image}
              />
            )}
            {item.title}
          </Link>
        ))}
      </div>
    </div> : <></>
  );
};

export default CategoryList;
