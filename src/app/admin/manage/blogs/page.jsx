"use client"
import Table from '@/components/common/Table';
import Header from '@/components/common/TableHeader';
import { BASE_URL } from '@/constants/constants';
import { EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const actionClasses = " relative text-secondary-dark bg-light-dark hover:text-primary flex items-center h-[20px] w-[20px] text-base font-medium leading-normal text-center align-middle cursor-pointer rounded-2xl transition-colors duration-200 ease-in-out shadow-none border-0 justify-center"

const page = () => {
    const columns = ["Action", '_id', "Views", 'Title', 'Slug', 'Created at'];
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0);
    const limit = 3;
    const [totalPages, setTotalPages] = useState(Math.ceil(count / limit));
    const [data, setData] = useState([])

    const [searchTerm, setSearchTerm] = useState('');
    const session = useSession();
    const { status } = session;
    const router = useRouter();


    if (status === "unauthenticated" || session?.data?.user?.role !== 'ADMIN') {
        router.push("/");
    }

    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await fetch(
                    `${BASE_URL}/api/posts?page=${currentPage}&keyword=${searchTerm || ""}`,
                    {
                        cache: "no-store",
                    }
                );

                return res.json();
            } catch (error) {
                toast.error("Something went wrong");
            }

        }
        loadData().then((data) => {
            setCount(data.count);
            setData(data.posts.map((d) => [
                <span className='flex space-x-5'>
                    <Link href={`/posts/${d.slug}`} className={`${actionClasses}`}>
                        <EyeIcon />
                    </Link>
                    <Link href={`/posts/${d.slug}/edit`} className={actionClasses}>
                        <PencilSquareIcon />
                    </Link>
                    <button className={`${actionClasses}`}>
                        <TrashIcon />
                    </button>
                </span>
                ,
                d._id, d.views, d.title, d.slug, new Date(d.createdAt).toDateString()]));
            setTotalPages(Math.ceil(data.count / limit))
        })

    }, [currentPage, searchTerm])


    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    return (
        <div className='wrapper'>
            <div className='mt-10'>
                <Header
                    headerText={"Blogs"}
                    handleChangeText={(e) => setSearchTerm(e.target.value)}
                />
                <Table
                    columns={columns}
                    data={data}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    )
}

export default page