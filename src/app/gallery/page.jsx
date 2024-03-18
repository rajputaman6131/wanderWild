import Header from "@/components/gallery/Header"
import ImageSection from "@/components/gallery/ImageSection"
import toast from "react-hot-toast";
import Pagination from "@/components/pagination/Pagination";
import { BASE_URL } from "@/constants/constants";

const loadImages = async (page, category) => {
    try {
        const res = await fetch(
            `${BASE_URL}/api/images?page=${page || ""}&category=${category || ''}`,
            {
                cache: "no-store",
            }
        );

        return res.json();
    } catch (error) {
        console.log(error);
        toast.error("Something went wrong!");
    }
}

const Gallery = async ({ searchParams }) => {

    const page = parseInt(searchParams.page) || 1;
    const category = (searchParams.category) || "";

    const { images, count } = await loadImages(page, category);

    const POST_PER_PAGE = 12;

    const hasPrev = POST_PER_PAGE * (page - 1) > 0;
    const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

    return (
        <div className="wrapper">
            <Header selected={category} />
            <ImageSection images={images.map((i) => i.image)} />
            <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />

        </div>
    )
}

export default Gallery      