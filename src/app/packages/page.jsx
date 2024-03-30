import Header from '@/components/common/Header'
import PackageCard from '@/components/common/PackageCard'
import Pagination from '@/components/pagination/Pagination';
import { BASE_URL } from '@/constants/constants';
import toast from 'react-hot-toast';

const getData = async (page) => {
    try {

        const res = await fetch(
            `${BASE_URL}/api/packages?page=${page}|| ""}`,
            {
                cache: "no-store",
            }
        );

        return res.json();
    } catch (error) {
        toast.error("Something went wrong");

    }
};

const Packages = async ({ searchParams }) => {
    const page = parseInt(searchParams.page) || 1;

    const { packages, count } = await getData(page);

    const POST_PER_PAGE = 6;

    const hasPrev = POST_PER_PAGE * (page - 1) > 0;
    const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;


    return (
        <div className="wrapper">
            <div className='py-10'>
                <Header title={"Our Popular Packages"} description={"Explore our curated selection of top travel packages for unforgettable adventures worldwide"} />
                <div className="flex items-center justify-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

                    {
                        packages?.map((p, i) => <PackageCard
                            details={p}
                            key={i}
                        />)
                    }

                </div>
                {
                    packages?.length ?
                        <div className='m-20'>
                            <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
                        </div>
                        : <></>
                }
            </div>
        </div>
    )
}

export default Packages