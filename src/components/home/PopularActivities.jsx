import Link from "next/link"
import Header from "../common/Header"
import { BASE_URL } from "@/constants/constants";
import SquareCard from "../common/SquareCard";

const getData = async () => {
    const res = await fetch(
        `${BASE_URL}/api/categories?limit=8`,
        {
            cache: "no-store",
        }
    );

    return res.json();
};


const PopularActivities = async () => {
    const { categories } = await getData();


    return (
        <div className="py-10 mb-20">
            <div className="wrapper">
                <Header title={"Popular Activities"} description={"Explore thrilling adventures with our top-rated activities"} />
                <div style={{
                    marginTop: '-20px'
                }} className="flex items-center justify-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                    {
                        categories?.map((c, i) => <SquareCard
                            href={"#"}
                            image={c.image}
                            name={c.categoryName}
                            key={i}
                        />)
                    }
                </div>
            </div>
            <div className="pt-10 flex justify-center">
                <Link
                    href="/activities"
                    className=" block  rounded-2xl bg-indigo-600 px-6 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    View All {"  "} <span aria-hidden="true">&rarr;</span>
                </Link>
            </div>
        </div>
    )
}

export default PopularActivities