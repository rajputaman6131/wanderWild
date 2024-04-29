import Link from "next/link"
import DestinationCard from "../common/DestinationCard"
import Header from "../common/Header"
import { BASE_URL } from "@/constants/constants";

const getData = async () => {
    const res = await fetch(
        `${BASE_URL}/api/places`,
        {
            cache: "no-store",
        }
    );

    return res.json();
};


const PopularDestinations = async () => {
    const { places } = await getData();


    return (
        <div className="py-20 bg-[#f8fbff] mb-20">
            <div className="wrapper">
                <Header title={"Popular Destinations"} description={"Explore trending destinations and iconic landmarks with our top-rated travel packages"} />
                <div className="flex items-center justify-center grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
                    {
                        places?.map((p, i) => <DestinationCard
                            details={p}
                            key={i}
                        />)
                    }
                </div>
            </div>
            <div className="pt-10 flex justify-center">
                <Link
                    href="/places"
                    className=" block  rounded-2xl bg-[#3c8d7d] px-6 py-2 text-center text-sm font-semibold text-white shadow-sm"
                >
                    View All {"  "} <span aria-hidden="true">&rarr;</span>
                </Link>
            </div>
        </div>
    )
}

export default PopularDestinations