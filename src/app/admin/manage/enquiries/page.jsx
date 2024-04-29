"use client"
import Table from '@/components/common/Table';
import Header from '@/components/common/TableHeader';
import { BASE_URL } from '@/constants/constants';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const page = () => {
    const columns = ['_id', "Name", "Email", "Phone", "Message", 'Created At'];
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0);
    const limit = 5;
    const [totalPages, setTotalPages] = useState(Math.ceil(count / limit));
    const [data, setData] = useState([])

    const [searchTerm, setSearchTerm] = useState('');

    const router = useRouter();
    const session = useSession();
    const { status } = session;

    if (status === "unauthenticated" || session?.data?.user?.role !== 'ADMIN') {
        router.push("/");
    }

    useEffect(() => {
        const loadData = async () => {

            try {
                const res = await fetch(
                    `${BASE_URL}/api/contacts?page=${currentPage}&keyword=${searchTerm || ""}`,
                    {
                        cache: "no-store",
                    }
                );

                return res.json();
            } catch (err) {
                toast.error("Something went wrong");

            }

        }
        loadData().then((data) => {
            setCount(data.count);
            setData(data.contacts.map((d) => [
                d._id, d.name, d.email, d.phone, d.message
                , new Date(d.createdAt).toDateString()]));
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
                    headerText={"Enquiries"}
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