import Image from "next/image";
import styles from "./card.module.css";
import Link from "next/link";

const Card = ({ key, item }) => {
  return (
    <div className={styles.container} key={key}>

      <img src={item.images[0]} alt="" className={styles.image} />


      <div className={styles.textContainer}>
        <div className={styles.detail}>
          <span className={styles.date}>
            {item.createdAt.substring(0, 10)} - {item.category}
          </span>
          <span className={styles.category}>{item.catSlug}</span>
        </div>
        <Link href={`/posts/${item.slug}`}>
          <h1>{item.title}</h1>
        </Link>
        {/* <p className={styles.description}>{item.description.substring(0, 60)}</p> */}
        <div className={styles.description} dangerouslySetInnerHTML={{ __html: item?.description.substring(0, 200) }} />
        <Link href={`/posts/${item.slug}`} className={styles.link}>
          Read More
        </Link>
      </div>
    </div>
  );
};

export default Card;
