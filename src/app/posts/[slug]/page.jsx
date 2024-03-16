import Menu from "@/components/Menu/Menu";
import styles from "./singlePage.module.css";
import Image from "next/image";
import Comments from "@/components/comments/Comments";
import ImageSection from "@/components/package/ImageSection";
import { BASE_URL } from "@/constants/constants";

const getData = async (slug) => {
  try {
    const res = await fetch(`${BASE_URL}/api/posts/${slug}`, {
      cache: "no-store",
    });

    return res.json();
  } catch (error) {
    toast.error("Something went wrong");
  }
};

const SinglePage = async ({ params }) => {
  const { slug } = params;

  const data = await getData(slug);


  if (!data) {
    return <div>404</div>
  }

  return (
    <div className="wrapper">
      <div className={styles.container}>
        <div className={styles.infoContainer}>
          <div className={styles.textContainer}>
            <div className={styles.titleContainer}>
              <h1 className={styles.title}>{data?.title}</h1>
            </div>
            <div className={styles.user}>
              {data?.user?.image && (
                <div className={styles.userImageContainer}>
                  <Image src={data.user.image} alt="" fill className={styles.avatar} />
                </div>
              )}
              <div className={styles.userTextContainer}>
                <span className={styles.username}>{data?.user?.name}</span>
                <span className={styles.date}>
                  {new Date(data.createdAt).toDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
        <ImageSection
          mode={'client'}
          values={data}
        />
        <div className={styles.content}>
          <div className={styles.post}>
            <div
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: data?.description }}
            />
            <div className={styles.comment}>
              <Comments postSlug={slug} />
            </div>
          </div>
          <Menu />
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
