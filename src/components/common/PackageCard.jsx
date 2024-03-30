import Link from "next/link";
import {
    CalendarIcon,
    MapPinIcon,
} from '@heroicons/react/20/solid'

const PackageCard = ({ details }) => {
    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 transition-all duration-300">
            <img src={details?.images[0] || "/p1.jpeg"} alt="Tour Image" className="w-full h-64 object-cover" />
            <div className="p-5">
                <div className="">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        {details?.packageName}
                    </h2>
                    <div className="mt-1 mb-3 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">

                        <div className="mt-3 flex items-center text-sm text-gray-500">
                            <MapPinIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                            {details?.locationName}
                        </div>

                        <div className="mt-3 flex items-center text-sm text-gray-500">
                            <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                            Closing on {new Date(details?.lastDate).toDateString()}
                        </div>

                    </div>
                    <p className="text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight">₹{details?.price}</p>

                </div>
                <div className="pt-5">
                    <Link
                        href={`/packages/${details?.slug}`}
                        className=" block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PackageCard;
