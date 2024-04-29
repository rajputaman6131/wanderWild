"use client";

import styles from "../../write/writePage.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.bubble.css";
import { uploadImages } from "@/utils/image";
import { BASE_URL, categories, formats, modules } from "@/constants/constants";
import ImageSection from "@/components/package/ImageSection";
import toast from "react-hot-toast";

const UpdatePage = ({ params }) => {
    const session = useSession();
    const { status } = session;
    const router = useRouter();
    const { slug } = params;
    const [values, setValues] = useState({
        title: '',
        description: '',
        category: '',
    });
    const [images, setImages] = useState({});

    const [loading, setLoading] = useState({
        fetch: false,
        update: false,
    });

    if (status === "unauthenticated" || session?.data?.user?.role !== 'ADMIN') {
        router.push("/");
    }

    useEffect(() => {
        const getData = async (slug) => {
            try {
                setLoading({
                    ...loading,
                    fetch: true
                });
                const res = await fetch(`${BASE_URL}/api/posts/${slug}`, {
                    cache: "no-store",
                });

                return res.json();

            } catch (error) {
            } finally {
                setLoading({
                    ...loading,
                    fetch: false
                });
            }
        };
        getData(slug).then((postData) => {
            setValues(postData);
        })

    }, [slug]);




    if (!Object.keys(values).length) {
        return <div>404</div>
    }

    const handleSubmit = async () => {
        try {
            if (!values.title || !values.description || !values.category) {
                return toast.error("Title, description and category are required")
            }

            setLoading({
                ...loading,
                update: true
            });

            let imageUrls = Object.keys(images).length ? await uploadImages(images) : [];

            if (!imageUrls?.length && Object.keys(images).length) return toast.error("Error Occurred while uploading image...")


            const { image1, image2, image3 } = images;
            await fetch(`${BASE_URL}/api/posts/${slug}`, {
                method: "PUT",
                body: JSON.stringify({
                    ...values,
                    images: [
                        image1 ? imageUrls[0] : values?.images[0],
                        image2 && image1 ? imageUrls[1] : image2 ? imageUrls[0] : values?.images[1],
                        image2 && image1 && image3 ? imageUrls[2] : image3 && (image1 || image2) ? imageUrls[1] : image3 ? imageUrls[0] : values?.images[2]
                    ],
                }),
            });

            toast.success("Post updated successfully");

            router.push(`/posts/${slug}`);
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error);
        } finally {
            setLoading({
                ...loading,
                update: false
            });
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
                <select className={` rounded-md ring-1 ring-inset ring-gray-300 ${styles.select}`} value={values?.category || ''} onChange={(e) => setValues({ ...values, category: e.target.value })}>
                    <option value={''}>Select</option>
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
                <button disabled={loading.update} className={styles.publish} onClick={handleSubmit}>
                    {
                        loading.update ? 'Updating...' : 'Update'
                    }
                </button>
            </div>
        </div>
    );
};

export default UpdatePage;
