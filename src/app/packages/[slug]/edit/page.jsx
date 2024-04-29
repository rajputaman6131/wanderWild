"use client"
import Loading from '@/app/loading'
import PageNotFound from '@/components/PageNotFound/PageNotFound'
import Accordion from '@/components/common/Accordion'
import Calendar from '@/components/common/Calendar'
import SlideOver from '@/components/common/SlideOver'
import DetailSection from '@/components/package/DetailSection'
import EditDetail from '@/components/package/EditDetail'
import Header from '@/components/package/Header'
import ImageSection from '@/components/package/ImageSection'
import { BASE_URL } from '@/constants/constants'
import { uploadImages } from '@/utils/image'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const UpdatePackage = ({ params }) => {
    const session = useSession();
    const { status } = session;
    const router = useRouter();
    const { slug } = params;
    const [values, setValues] = useState({});
    const [images, setImages] = useState({});
    const [open, setOpen] = useState(true);
    const [loading, setLoading] = useState(false);
    const [numberOfSeats, setNumberOfSeats] = useState({});

    if (status === "unauthenticated" || session?.data?.user?.role !== 'ADMIN') {
        router.push("/");
    }

    useEffect(() => {
        const getData = async (slug) => {
            try {
                setLoading(true)
                const res = await fetch(`${BASE_URL}/api/packages/${slug}`, {
                    cache: "no-store",
                });

                return res.json();

            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }

        };

        getData(slug).then((data) => {
            setValues(data);
            const avlObj = {};
            data?.availability?.forEach((d) => {
                avlObj[new Date(d.date).toUTCString()] = d.availableSeats
            })
            setNumberOfSeats(avlObj)
        })

    }, [slug])

    const handleSubmit = async () => {
        try {

            let imageUrls = Object.keys(images).length ? await uploadImages(images) : [];

            if (!imageUrls?.length && Object.keys(images).length) return toast.error("Error Occurred while uploading image...")


            const { image1, image2, image3 } = images;
            await fetch(`${BASE_URL}/api/packages/${slug}`, {
                method: "PUT",
                body: JSON.stringify({
                    ...values,
                    images: [
                        image1 ? imageUrls[0] : values?.images[0],
                        image2 && image1 ? imageUrls[1] : image2 ? imageUrls[0] : values?.images[1],
                        image2 && image1 && image3 ? imageUrls[2] : image3 && (image1 || image2) ? imageUrls[1] : image3 ? imageUrls[0] : values?.images[2]
                    ],
                    availability: Object.keys(numberOfSeats).map(((d) => ({
                        date: new Date(d),
                        availableSeats: numberOfSeats[d] || 0
                    })))
                }),
            });
            toast.success("Updated Successfully!");

            router.push(`/packages/${slug}`);
        } catch (error) {
            toast.error("Something went wrong");

            console.log(error)
        }
    };

    if (loading) return <Loading />

    if (!Object.keys(values).length) {
        return <PageNotFound />
    }

    return (
        <div className='wrapper'>
            <Header handlePublish={handleSubmit} setOpenSlideOver={setOpen} mode={"admin"} locationName={values?.locationName} duration={values?.duration} packageName={values?.packageName} />
            <SlideOver open={open} setOpen={setOpen} title={"Update Details"} body={<EditDetail
                values={values} setValues={setValues} setOpen={setOpen}
            />} />
            <ImageSection mode="admin" images={images} setImages={setImages} values={values} />
            <DetailSection setValues={setValues} values={values} mode={"admin"} description={values?.description || ''} excludedItems={values?.excludedItems || []} includedItems={values?.includedItems || []} packageType={values?.packageType} duration={values?.duration} numberOfTourists={values?.numberOfTourists} price={values?.price} />

            <Calendar numberOfSeats={numberOfSeats} setNumberOfSeats={setNumberOfSeats} />

            <Accordion setValues={setValues} values={values} mode={'admin'} name="itinerary" items={values?.itinerary || []} title={'Itinerary'} description={"Roadmap & Timelines Of The Journey"} />

            <Accordion mode="admin" name="faqs" items={values?.faqs || []} title={'FAQs'} description={"Any Questions? Look Here"} setValues={setValues} values={values} />

            {
                values?.locationEmbedSrc ? <iframe src={values?.locationEmbedSrc} width="100%" height="450" style={{
                    border: '0px',
                    borderRadius: "15px",
                    marginTop: "40px"
                }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> : <></>
            }

        </div>
    )
}

export default UpdatePackage