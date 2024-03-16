import Link from "next/link";
import Header from "../common/Header";
import PackageCard from "../common/PackageCard";
import { BASE_URL } from "@/constants/constants";

const getData = async () => {
    const res = await fetch(
        `${BASE_URL}/api/packages`,
        {
            cache: "no-store",
        }
    );

    return res.json();
};


const PopularTours = async () => {
    const { packages } = await getData();


    return (
        <div className="wrapper min-h-screen pb-20 ">
            <Header title={"Popular Packages"} description={"Explore our curated selection of top travel packages for unforgettable adventures worldwide"} />
            <div className="flex items-center justify-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

                {
                    packages?.map((p, i) => <PackageCard
                        details={p}
                        key={i}
                    />)
                }


            </div>

            <div className="pt-10 flex justify-center">
                <Link
                    href="/packages"
                    className=" block  rounded-2xl bg-indigo-600 px-6 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    View All {"  "} <span aria-hidden="true">&rarr;</span>
                </Link>
            </div>
        </div>
    );
};

export default PopularTours;
