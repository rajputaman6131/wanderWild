"use client";

import styles from "./writePage.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.bubble.css";
import Loading from "../../loading";
import { uploadImages } from "@/utils/image";
import ImageSection from "@/components/package/ImageSection";
import { categories, formats, modules } from "@/constants/constants";
import toast from "react-hot-toast";

const WritePage = () => {
  const session = useSession();
  const { status } = session;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    title: '',
    description: '',
    category: '',
  });
  const [images, setImages] = useState({});

  if (status === "loading") {
    return <Loading />
  }

  if (status === "unauthenticated" || session?.data?.user?.role !== 'ADMIN') {
    router.push("/");
  }

  const handleSubmit = async () => {
    try {
      if (!values.title || !values.description || Object.keys(images).length < 3 || !values.category) {
        return toast.error("Title, description, category and images are required")
      }
      setLoading(true);

      const imageUrls = await uploadImages(images);

      if (imageUrls.length < 3) return toast.error("Error Occurred while uploading image...")


      const res = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          ...values,
          images: imageUrls,
        }),
      });

      toast.success("Post created successfully");


      await res.json();
      router.push(`/blogs`);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="wrapper">
      <div className={styles.container}>
        <input
          type="text"
          placeholder="Title"
          className={styles.input}
          value={values?.title}
          onChange={(e) => setValues({ ...values, title: e.target.value })}
        />
        <select className={` cursor-pointer ${styles.select}`} value={values?.category || ''} onChange={(e) => setValues({ ...values, category: e.target.value })}>
          <option value={''}>Select Category</option>
          {
            categories.map((cat, i) => <option key={i} value={cat}>{cat}</option>)
          }
        </select>

        <ImageSection mode="admin" values={values} setValues={setValues} images={images} setImages={setImages} />

        <div className={styles.editor}>
          <ReactQuill
            modules={modules}
            formats={formats}
            className={styles.textArea}
            theme="bubble"
            value={values?.description || ''}
            onChange={(text) => setValues({ ...values, description: text })}
            placeholder="Tell your story..."
          />
        </div>
        <button disabled={loading} className={styles.publish} onClick={handleSubmit}>
          {
            loading ? 'Publishing...' : 'Publish'
          }
        </button>
      </div>
    </div>
  );
};

export default WritePage;
