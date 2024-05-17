"use client"
import { useState, useEffect } from 'react';
import { BASE_URL } from '@/constants/constants';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const BookingHistoryPage = ({ searchParams }) => {
    const router = useRouter();
    const session = useSession();
    const { status } = session;

    if (status === "unauthenticated") {
        router.push("/");
    }
    const [bookingHistory, setBookingHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalBookings, setTotalBookings] = useState(0);
    const page = parseInt(searchParams.page) || 1;
    const pageSize = 10;

    useEffect(() => {
        const fetchBookingHistory = async () => {
            try {
                const res = await fetch(
                    `${BASE_URL}/api/bookings?user=${session?.data?.user?.email}&page=${page}&limit=${pageSize}`,
                    {
                        cache: "no-store",
                    }
                );

                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await res.json();
                setBookingHistory(data.bookings);
                setTotalBookings(data.count);
            } catch (error) {
                setError('Error fetching booking history. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchBookingHistory();
    }, [page]);

    const totalPages = Math.ceil(totalBookings / pageSize);

    const handlePagination = (newPage) => {
        router.push(`/bookings?page=${newPage}`);
    };

    return (
        <div className='wrapper'>
            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold mb-4">Booking History</h1>
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {!loading && !error && (
                    <div className="bg-white shadow-md rounded my-6 overflow-x-auto">
                        {bookingHistory?.length > 0 ? (
                            <>
                                <table className="w-full table-auto">
                                    <thead>
                                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                            <th className="py-3 px-6 text-left">Booking ID</th>
                                            <th className="py-3 px-6 text-left">Booking Date</th>
                                            <th className="py-3 px-6 text-left">Package Date</th>
                                            <th className="py-3 px-6 text-left">Package Name</th>
                                            <th className="py-3 px-6 text-left">Seats Booked</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-600 text-sm font-light">
                                        {bookingHistory.map(booking => (
                                            <tr className="border-b border-gray-200 hover:bg-gray-100" key={booking._id}>
                                                <td className="py-3 px-6 text-left whitespace-nowrap">{booking._id}</td>
                                                <td className="py-3 px-6 text-left whitespace-nowrap">{new Date(booking.createdAt).toDateString()}</td>
                                                <td className="py-3 px-6 text-left whitespace-nowrap">{new Date(booking.packageDate).toDateString()}</td>
                                                <td className="py-3 px-6 text-left">{booking.packageId.packageName}</td>
                                                <td className="py-3 px-6 text-left text-center">{booking.seatsBooked}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="flex justify-between m-2">
                                    <button
                                        onClick={() => handlePagination(page - 1)}
                                        disabled={page === 1}
                                        className="mr-2 px-4 py-2 bg-gray-200 text-gray-600 rounded-md disabled:opacity-50"
                                    >
                                        Previous
                                    </button>
                                    <button
                                        onClick={() => handlePagination(page + 1)}
                                        disabled={page === totalPages}
                                        className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md disabled:opacity-50"
                                    >
                                        Next
                                    </button>
                                </div></>
                        ) : (<div className="text-center py-10">
                            <img src="/no-booking.png" alt="No bookings" className="mx-auto mb-4 w-64 h-64" />
                            <p className="text-lg text-gray-700 mb-4">You have no bookings yet.</p>
                            <p className="text-md text-gray-600 mb-4">Start exploring our amazing packages and book your next adventure today!</p>
                            <button
                                onClick={() => router.push('/packages')}
                                className="px-4 py-2 bg-[#3c8d7d] text-white rounded-md hover:bg-opacity-90"
                            >
                                Book Now
                            </button>
                        </div>
                        )}

                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingHistoryPage;
