import DestinationCard from '@/components/common/DestinationCard';
import Header from '@/components/common/Header'
import Pagination from '@/components/pagination/Pagination';
import { BASE_URL } from '@/constants/constants';
import toast from 'react-hot-toast';

const getData = async (page, limit) => {
    try {
        const res = await fetch(
            `${BASE_URL}/api/places?limit=${limit}&page=${page || ""}`,
            {
                cache: "no-store",
            }
        );

        return res.json();

    } catch (error) {
        toast.error("Something went wrong");

    }
};

const Place = async ({ searchParams }) => {
    const page = parseInt(searchParams.page) || 1;
    const POST_PER_PAGE = 10;
    const { places, count } = await getData(page, POST_PER_PAGE);

    const hasPrev = POST_PER_PAGE * (page - 1) > 0;
    const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;


    return (
        <div className="wrapper">
            <div className='py-20'>
                <Header
                    title={"Popular Destinations"} description={"Explore trending destinations and iconic landmarks with our top-rated travel packages"} />

                <div className="flex items-center justify-center grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
                    {
                        places?.map((p, i) => <DestinationCard
                            details={p}
                            key={i}
                        />)
                    }

                </div>
                {
                    places?.length ?
                        <div className='m-20'>
                            <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
                        </div>
                        : <></>
                }
            </div>
        </div>
    )
}

export default Place