import PageNotFound from '@/components/PageNotFound/PageNotFound'
import Accordion from '@/components/common/Accordion'
import DetailSection from '@/components/package/DetailSection'
import Header from '@/components/package/Header'
import ImageSection from '@/components/package/ImageSection'
import { BASE_URL } from '@/constants/constants'
import React from 'react'
import toast from 'react-hot-toast'

const getData = async (slug) => {
    try {
        const res = await fetch(`${BASE_URL}/api/packages/${slug}`, {
            cache: "no-store",
        });

        return res.json();
    } catch (error) {
        toast.error("Something went wrong");
        console.log(error)
    }
};


const PackageDetail = async ({ params }) => {
    const { slug } = params;

    const values = await getData(slug);

    if (!values) {
        return <PageNotFound />
    }

    return (
        <div className='wrapper'>
            <Header mode={"client"} locationName={values?.locationName} lastDateOfRegistration={values?.lastDate} packageName={values?.packageName} />
            <ImageSection mode="client" values={values} />
            <DetailSection mode={"client"} description={values?.description || ''} excludedItems={values?.excludedItems || []} includedItems={values?.includedItems || []} packageType={values?.packageType} duration={values?.duration} numberOfTourists={values?.numberOfTourists} price={values?.price} />


            {
                values?.itinerary?.length ? <Accordion mode={'client'} name="itinerary" items={values?.itinerary || []} title={'Itinerary'} description={"Roadmap & Timelines Of The Journey"} />
                    : <></>
            }

            {
                values?.locationEmbedSrc ? <iframe src={values?.locationEmbedSrc} width="100%" height="450" style={{
                    border: '0px',
                    borderRadius: "15px",
                    marginTop: "40px"
                }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> : <></>
            }


            {
                values?.faqs?.length ?
                    <Accordion mode="client" name="faqs" items={values?.faqs || []} title={'FAQs'} description={"Any Questions? Look Here"} /> : <></>
            }

        </div>
    )
}

export default PackageDetail