"use client";

import Link from "next/link";
import styles from "./comments.module.css";
import Image from "next/image";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { BASE_URL } from "@/constants/constants";

const fetcher = async (url) => {
  try {
    const res = await fetch(url);

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error)
  }
};

const Comments = ({ postSlug }) => {
  const { status } = useSession();

  const { data, mutate, isLoading } = useSWR(
    `${BASE_URL}/api/comments?postSlug=${postSlug}`,
    fetcher
  );

  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ description, postSlug }),
    });
    mutate();
    setDescription('')
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Comments</h1>
      {status === "authenticated" ? (
        <div className={styles.write}>
          <textarea
            placeholder="write a comment..."
            className={styles.input}
            value={description || ''}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className={styles.button} onClick={handleSubmit}>
            Send
          </button>
        </div>
      ) : (
        <Link href="/login">Login to write a comment</Link>
      )}
      <div className={styles.comments}>
        {isLoading
          ? "loading..."
          : data?.map((item) => (
            <div className={styles.comment} key={item._id}>
              <div className={styles.user}>
                {item?.user?.image && (
                  <Image
                    src={item.user.image}
                    alt=""
                    width={50}
                    height={50}
                    className={styles.image}
                  />
                )}
                <div className={styles.userInfo}>
                  <span className={styles.username}>{item?.user?.name}</span>
                  <span className={styles.date}>{new Date(item?.createdAt).toDateString()}</span>
                </div>
              </div>
              <p className={styles.description}>{item?.description}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Comments;
