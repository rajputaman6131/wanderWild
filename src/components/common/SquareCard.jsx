import Link from 'next/link'
import React from 'react'

const SquareCard = ({ name, href, image }) => {
    return (
        <div class="col-md-6 col-lg-3">
            <Link class="stretched-link" href={href}>
                <div class="destination-item  overflow-hidden cursor-pointer">
                    <div class="transition-transform rounded-lg overflow-hidden">
                        <img src={image} alt={name} class="w-full h-[500px] sm:h-[350px] transform hover:scale-110 object-cover rounded-lg transition-all duration-500" />
                    </div>
                    <div class="text-center mt-3">
                        <h3 class="">{name}</h3>
                    </div>

                </div>
            </Link>
        </div>

    )
}

export default SquareCard