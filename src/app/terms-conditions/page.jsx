import Head from 'next/head'
import React from 'react'

const page = () => {
    return (
        <div className='wrapper'>
            <Head>
                <title>Terms & Conditions | Wander Wild Adventures</title>
                <meta name="description" content="terms & conditions of wander wild adventures" />
            </Head>
            <iframe src={'/terms-conditions.html'} width="100%" height="1000px" style={{
                border: '0px',
                marginTop: "40px"
            }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
    )
}

export default page