import React from 'react'

const page = () => {
    return (
        <div className='wrapper'>
            <iframe src={'/privacy-policy.html'} width="100%" height="1000px" style={{
                border: '0px',
                marginTop: "40px"
            }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
    )
}

export default page