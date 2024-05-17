"use client"
import Table from '@/components/common/Table';
import Header from '@/components/common/TableHeader';
import { BASE_URL } from '@/constants/constants';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';


const page = () => {
    const columns = ['Ticket Id', 'User', 'Ticket Status', "Payment Status", "Booking Date", 'Seats Booked', 'Amount', "Booked At", 'Transaction Id'];
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0);
    const limit = 10;
    const [totalPages, setTotalPages] = useState(Math.ceil(count / limit));
    const [data, setData] = useState([])

    const router = useRouter();
    const session = useSession();
    const { status } = session;

    if (status === "unauthenticated" || session?.data?.user?.role !== 'ADMIN') {
        router.push("/");
    }

    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const loadData = async () => {
            try {

                const res = await fetch(
                    `${BASE_URL}/api/bookings?page=${currentPage}&keyword=${searchTerm || ""}`,
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
            setData(data?.bookings?.map((d) => [

                d._id, d.email, <span className='capitalize'>{d.status}</span>, <span className='capitalize'>{d.paymentStatus}</span>, new Date(d.packageDate).toDateString(), d.seatsBooked, d.amount, new Date(d.createdAt).toDateString(), d.transactionId]));
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
                    headerText={"Bookings"}
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