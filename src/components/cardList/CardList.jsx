import React from "react";
import styles from "./cardList.module.css";
import Pagination from "../pagination/Pagination";
import Card from "../card/Card";
import { BASE_URL } from "@/constants/constants";
import toast from "react-hot-toast";

const getData = async (page, cat) => {

  try {
    const res = await fetch(
      `${BASE_URL}/api/posts?page=${page}&cat=${cat || ""}`,
      {
        cache: "no-store",
      }

    );

    return res.json();
  } catch (error) {
    toast.error("Something went wrong");

  }
};

const CardList = async ({ page, cat }) => {
  const { posts, count } = await getData(page, cat);

  const POST_PER_PAGE = 6;

  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recent Posts</h1>
      <div className={styles.posts}>
        {posts?.map((item) => (
          <Card item={item} key={item._id} />
        ))}
      </div>
      <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
    </div>
  );
};

export default CardList;
