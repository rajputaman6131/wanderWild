"use client"
import Header from "@/components/gallery/Header"
import ImageSection from "@/components/gallery/ImageSection"
import { useEffect, useState } from "react";
import Loading from "../loading";
import toast from "react-hot-toast";
import Pagination from "@/components/pagination/Pagination";
import { BASE_URL } from "@/constants/constants";

const Gallery = ({ searchParams }) => {
    const [selected, setSelected] = useState('');
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const page = parseInt(searchParams.page) || 1;
    const [count, setCount] = useState(0);

    const POST_PER_PAGE = 12;

    const hasPrev = POST_PER_PAGE * (page - 1) > 0;
    const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

    useEffect(() => {
        const loadImages = async () => {
            try {
                setLoading(true);
                const res = await fetch(
                    `${BASE_URL}/api/images?page=${page}&category=${selected || ""}`,
                    {
                        cache: "no-store",
                    }
                );

                return res.json();
            } catch (error) {
                console.log(error);
                toast.error("Something went wrong!");
            } finally {
                setLoading(false);
            }
        }
        loadImages().then((data) => {
            setImages(data.images);
            setCount(data.count);
        })
    }, [selected, page]);


    if (loading) {
        return <Loading />
    }


    const handleSetSelected = (selected) => {
        setSelected(selected)
    }

    return (
        <div className="wrapper">
            <Header selected={selected} setSelected={handleSetSelected} />
            <ImageSection images={images.map((i) => i.image)} />
            <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />

        </div>
    )
}

export default Gallery      