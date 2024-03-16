"use client"
import Loading from "@/app/loading"
import PublishButton from "@/components/common/PublishButton"
import SelectDropdown from "@/components/common/SelectDropdown"
import { categories } from "@/constants/constants"
import { uploadImages } from "@/utils/image"
import { PhotoIcon } from "@heroicons/react/20/solid"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"


const page = () => {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState('Adventures');
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);

    const handlePublish = async () => {
        if (!files.length) {
            return toast.error("Images are required");
        }
        setLoading(true);

        try {
            const uploadedUrls = await uploadImages(files);
            const res = await fetch("/api/images", {
                method: "POST",
                body: JSON.stringify({
                    images: uploadedUrls.map((image) => ({
                        category: selectedCategory,
                        image
                    }))
                }),
            });

            await res.json();
            toast.success("Images uploaded successfully");
            setFiles([]);
            router.push(`/gallery`);

        } catch (error) {
            console.log(error)
            toast.error("Something went wrong!")
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <Loading />
    }

    return (
        <div className="wrapper">
            <div className="m-20">

                <div className="col-span-full mb-10">
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        <div className="text-center">
                            <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                <label
                                    htmlFor="file-upload"
                                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                >
                                    <span>Upload photos</span>
                                    <input id="file-upload" accept="images/*" name="file-upload" type="file" className="sr-only"
                                        onChange={(e) => {
                                            setFiles(e.target.files)
                                        }}
                                        multiple
                                    />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs leading-5 text-gray-600">
                                {files.length ? `${files.length} image's are selected` : 'No image selected'}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row items-center">
                    <span className="w-[200px]">
                        <SelectDropdown
                            selected={selectedCategory}
                            setSelected={setSelectedCategory}
                            options={categories}
                        />
                    </span>
                    <span className="mx-5">
                        <PublishButton
                            onClick={handlePublish}
                        />
                    </span>
                </div>

            </div>

        </div>
    )
}

export default page