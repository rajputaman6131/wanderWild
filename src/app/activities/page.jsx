import DestinationCard from '@/components/common/DestinationCard';
import Header from '@/components/common/Header'
import SquareCard from '@/components/common/SquareCard';
import Pagination from '@/components/pagination/Pagination';
import { BASE_URL } from '@/constants/constants';
import toast from 'react-hot-toast';

const getData = async (page, limit) => {
    try {
        const res = await fetch(
            `${BASE_URL}/api/categories?limit=${limit}&page=${page || ""}`,
            {
                cache: "no-store",
            }
        );

        return res.json();

    } catch (error) {
        toast.error("Something went wrong");

    }
};

const Category = async ({ searchParams }) => {
    const page = parseInt(searchParams.page) || 1;
    const POST_PER_PAGE = 12;
    const { categories, count } = await getData(page, POST_PER_PAGE);

    const hasPrev = POST_PER_PAGE * (page - 1) > 0;
    const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;


    return (
        <div className="wrapper">
            <div className='py-10'>
                <Header
                    title={"Top Experiences"} description={"Explore thrilling adventures with our top-rated activities"} />

                <div className="flex items-center justify-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                    {
                        categories?.map((c, i) => <SquareCard
                            href={"#"}
                            image={c.image}
                            name={c.categoryName}
                            key={i}
                        />)
                    }
                </div>
                {
                    categories?.length ?
                        <div className='m-20'>
                            <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
                        </div>
                        : <></>
                }
            </div>
        </div>
    )
}

export default Category