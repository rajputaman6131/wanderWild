import Link from 'next/link'
import React from 'react'

const SquareCard = ({ name, href, image }) => {
    return (
        <div className="col-md-6 col-lg-3">
            <Link className="stretched-link" href={href}>
                <div className="destination-item  overflow-hidden cursor-pointer">
                    <div className="transition-transform rounded-lg overflow-hidden">
                        <img src={image} alt={name} className="w-full h-[500px] sm:h-[350px] transform hover:scale-110 object-cover rounded-lg transition-all duration-500" />
                    </div>
                    <div className="text-center mt-3">
                        <h3 className="">{name}</h3>
                    </div>

                </div>
            </Link>
        </div>

    )
}

export default SquareCard