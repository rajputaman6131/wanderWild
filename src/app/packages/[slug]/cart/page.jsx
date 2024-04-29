"use client"
import Loading from '@/app/loading';
import PageNotFound from '@/components/PageNotFound/PageNotFound';
import { BASE_URL } from '@/constants/constants';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function ShoppingCart({ params }) {
    const session = useSession();
    const { status } = session;
    const router = useRouter();
    const { slug } = params;
    const [values, setValues] = useState({});
    const [loading, setLoading] = useState({ data: false, payment: false });
    const [counter, setCounter] = useState(1);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
    const [numberOfSeats, setNumberOfSeats] = useState({});
    if (status === "unauthenticated") {
        router.push("/");
    }

    useEffect(() => {
        const getData = async (slug) => {
            try {
                setLoading({ data: true, payment: false })
                const res = await fetch(`${BASE_URL}/api/packages/${slug}`, {
                    cache: "no-store",
                });

                return res.json();

            } catch (error) {
                console.log(error)
            } finally {
                setLoading({ data: false, payment: false })
            }

        };

        getData(slug).then((data) => {
            setValues(data);
            const avlObj = {};
            data?.availability?.forEach((d) => {
                avlObj[new Date(d.date).toLocaleDateString()] = d.availableSeats
            })
            setNumberOfSeats(avlObj)
        })

    }, [slug]);

    if (loading.data) return <Loading />

    if (!Object.keys(values || {}).length) {
        return <PageNotFound />
    }

    const handlePay = async () => {
        try {
            if (status === 'unauthenticated') {
                return router.push('/login')
            }
            setLoading({ data: false, payment: true })
            const res = await fetch("/api/payment", {
                method: "POST",
                body: JSON.stringify({
                    amount: parseFloat((counter * values?.price).toFixed(2)),
                    packageType: 'travel',
                    packageId: values?._id,
                    seatsBooked: counter,
                    packageDate: selectedDate,
                }),
            });

            if (res.ok) {
                const data = await res.json();

                router.push(data);
            } else {
                console.error("Failed to make payment:", res.status);
            }
        } catch (error) {
            console.error("An error occurred while processing payment:", error);
            // Handle error and display appropriate message to the user
        } finally {
            setLoading({ data: false, payment: false })
        }
    };

    return (
        <section className="h-screen  py-12 sm:py-16 lg:py-20">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-center">
                    <h1 className="text-2xl font-semibold text-gray-900">Your Cart</h1>
                </div>

                <div className="mx-auto mt-8 max-w-md md:mt-12">
                    <div className="rounded-3xl bg-white shadow-lg">
                        <div className="px-4 py-6 sm:px-8 sm:py-10">
                            <div className="flow-root">
                                <ul className="-my-8">
                                    <CartItem counter={counter} selectedDate={selectedDate} setCounter={setCounter} setSelectedDate={setSelectedDate} values={values} numberOfSeats={numberOfSeats} />
                                </ul>
                            </div>

                            {
                                !!numberOfSeats?.[new Date(selectedDate).toLocaleDateString()] && <div>
                                    {/* Subtotal and GST */}
                                    <div className="mt-6 space-y-3 border-t border-b py-8">
                                        <div className="flex items-center justify-between">
                                            <p className="text-gray-400">Subtotal</p>
                                            <p className="text-lg font-semibold text-gray-900">₹{(counter * values?.price).toFixed(2)}</p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <p className="text-gray-400">Other Charges</p>
                                            <p className="text-lg font-semibold text-gray-900">₹0.00</p>
                                        </div>
                                    </div>

                                    {/* Total */}
                                    <div className="mt-6 flex items-center justify-between">
                                        <p className="text-sm font-medium text-gray-900">Total</p>
                                        <p className="text-2xl font-semibold text-gray-900">
                                            <span className="text-xs font-normal text-gray-400">₹</span> {(counter * values?.price).toFixed(2)}
                                        </p>
                                    </div>

                                    {/* Place Order Button */}
                                    <div className="mt-6 text-center">
                                        <button
                                            disabled={loading.payment}
                                            onClick={handlePay}
                                            type="button"
                                            className="group inline-flex w-full items-center justify-center rounded-md bg-[#3c8d7d] px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow"
                                        >
                                            {
                                                loading.payment ? 'Loading...' : <>
                                                    Complete Payment
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                    </svg></>
                                            }
                                        </button>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}


function CartItem({ values, counter, setCounter, selectedDate, setSelectedDate, numberOfSeats }) {

    const incrementCounter = () => {
        if (numberOfSeats?.[new Date(selectedDate).toLocaleDateString()] > counter) {
            setCounter(counter + 1);
        } else {
            return
        }
    };

    const decrementCounter = () => {
        if (counter > 1) {
            setCounter(counter - 1);
        }
    };

    return (
        <li className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
            <div className="shrink-0 relative">
                <img
                    className="h-24 w-24 max-w-full rounded-lg object-cover"
                    src={values?.images?.[0]}
                    alt={values?.packageName}
                />
            </div>

            <div className="relative flex flex-1 flex-col justify-between">
                <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                    <div className="pr-8 sm:pr-5">
                        <p className="text-base font-semibold text-gray-900">{values?.packageName}</p>
                        {/* <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">36EU - 4US</p> */}
                        <input
                            type="date"
                            className="mt-1 block w-[110px] text-gray-400 text-sm"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                        />
                    </div>

                    <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                        <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto ">
                            {numberOfSeats?.[new Date(selectedDate).toLocaleDateString()] ? <div className="flex items-center">
                                <button
                                    type="button"
                                    onClick={decrementCounter}
                                    className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out shadow hover:text-gray-900"
                                >
                                    <svg
                                        className="h-5 w-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                                    </svg>
                                </button>
                                <span className="mx-2 text-base font-semibold text-gray-900">{counter}</span>
                                <button
                                    type="button"
                                    onClick={incrementCounter}
                                    className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out shadow hover:text-gray-900"
                                >
                                    <svg
                                        className="h-5 w-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                    </svg>
                                </button>
                            </div> :
                                'No Seats Avl.'
                            }
                        </div>
                        <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">₹{values?.price}</p>
                    </div>
                </div>
            </div>
        </li>
    );
}



export default ShoppingCart;
