"use client";

import Image from "next/image";
import styles from "../../posts/write/writePage.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.bubble.css";
import Loading from "../../loading";
import { uploadImages } from "@/utils/image";
import toast from "react-hot-toast";

const page = () => {

    const session = useSession();
    const { status } = session;
    const router = useRouter()
    const [values, setValues] = useState({});
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState("");
    const [open, setOpen] = useState(false);


    if (status === "loading") {
        return <Loading />
    }


    if (status === "unauthenticated") {
        router.push("/");
    }

    const handleSubmit = async () => {
        try {
            if (!values?.description || !values?.categoryName || !file) {
                return toast.error("Category and description are required!!");
            }
            setLoading(true);

            const imageUrls = await uploadImages({ file });

            if (!imageUrls.length) return toast.error("Error Occurred while uploading image...")


            const res = await fetch("/api/categories", {
                method: "POST",
                body: JSON.stringify({
                    ...values,
                    image: imageUrls[0]
                }),
            });

            await res.json();
            toast.success("Category created successfully");

            router.push(`/activities`);

        } catch (error) {
            toast.error("Something went wrong");
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="wrapper">
            <div className={styles.container}>
                <input
                    type="text"
                    placeholder="Category Name"
                    className={styles.input}
                    value={values?.categoryName || ''}
                    onChange={(e) => setValues({
                        ...values, categoryName: e.target.value
                    })}
                />
                {
                    file && <img src={URL.createObjectURL(file)} alt="banner"
                        className="sm:h-[500px] h-[300px] object-contain object-center mx-10 mb-10"
                    />
                }

                <div className={styles.editor}>
                    <button className={styles.button} onClick={() => setOpen(!open)}>
                        <Image src="/plus.png" alt="" width={16} height={16} />
                    </button>
                    {open && (
                        <div className={styles.add}>
                            <input
                                type="file"
                                accept="image/*"
                                id="image"
                                onChange={(e) => {
                                    setFile(e.target.files[0]);
                                    setOpen(false);
                                }}
                                style={{ display: "none" }}
                            />
                            <button className={styles.addButton}>
                                <label htmlFor="image">
                                    <Image src="/image.png" alt="" width={16} height={16} />
                                </label>
                            </button>
                            {/* <button className={styles.addButton}>
                <Image src="/video.png" alt="" width={16} height={16} />
              </button> */}
                        </div>
                    )}
                    <ReactQuill
                        className={styles.textArea}
                        theme="bubble"
                        value={values?.description || ''}
                        onChange={(text) => setValues({
                            ...values, description: text
                        })}
                        placeholder="Tell something about category..."
                    />
                </div>
                <button disabled={loading} className={styles.publish} onClick={handleSubmit}>
                    {
                        loading ? 'Saving...' : 'Save'
                    }
                </button>
            </div>
        </div>
    )
}

export default page