"use client"
import Loading from '@/app/loading'
import Accordion from '@/components/common/Accordion'
import SlideOver from '@/components/common/SlideOver'
import DetailSection from '@/components/package/DetailSection'
import EditDetail from '@/components/package/EditDetail'
import Header from '@/components/package/Header'
import ImageSection from '@/components/package/ImageSection'
import { uploadImages } from '@/utils/image'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'


const NewPackage = () => {
    const { status } = useSession();
    const router = useRouter();
    const [open, setOpen] = useState(true);
    const [values, setValues] = useState({});
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState({});


    if (status === "loading" || loading) {
        return <Loading />
    }

    if (status === "unauthenticated") {
        router.push("/");
    }

    const handlePublish = async () => {
        try {
            setLoading(true)

            if (!Object.keys(images).length === 3) {
                return toast.error("Least 3 images are required");
            }

            const imageUrls = await uploadImages(images);

            if (imageUrls.length < 3) return toast.error("Error occurred while uploading images")

            const res = await fetch("/api/packages", {
                method: "POST",
                body: JSON.stringify({
                    ...values,
                    images: imageUrls
                }),
            });

            const data = await res.json();
            toast.success("Package created successfully");

            if (data?.slug) {
                router.push(`/packages/${data.slug}`);
            }
        } catch (error) {
            toast.error("Something went wrong");

            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='wrapper'>
            <Header mode={"admin"} setOpenSlideOver={setOpen} locationName={values?.locationName} lastDateOfRegistration={values?.lastDate} packageName={values?.packageName} handlePublish={handlePublish} />
            <SlideOver open={open} setOpen={setOpen} title={"Add Details"} body={<EditDetail
                values={values} setValues={setValues} setOpen={setOpen}
            />} />

            <ImageSection mode="admin" values={values} setValues={setValues} images={images} setImages={setImages} />

            <DetailSection mode={"admin"} description={values?.description || ''} excludedItems={values?.excludedItems || []} includedItems={values?.includedItems || []} packageType={values?.packageType} duration={values?.duration} numberOfTourists={values?.numberOfTourists} price={values?.price} values={values} setValues={setValues} />

            <Accordion mode="admin" name="itinerary" items={values?.itinerary || []} title={'Itinerary'} description={"Roadmap & Timelines Of The Journey"} setValues={setValues} values={values} />

            {
                values?.locationEmbedSrc ? <iframe src={values?.locationEmbedSrc} width="100%" height="450" style={{
                    border: '0px',
                    borderRadius: "15px",
                    marginTop: "40px"
                }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> : <></>
            }

            <Accordion mode="admin" name="faqs" items={values?.faqs || []} title={'FAQs'} description={"Any Questions? Look Here"} setValues={setValues} values={values} />

        </div>
    )
}

export default NewPackage