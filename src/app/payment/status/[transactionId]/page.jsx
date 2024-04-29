"use client"

import Loading from '@/app/loading';
import PageNotFound from '@/components/PageNotFound/PageNotFound';
import { BASE_URL } from '@/constants/constants';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const PaymentStatus = ({ params }) => {
    const { transactionId } = params;
    const [values, setValues] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getData = async (transactionId) => {
            try {
                setLoading(false);
                const res = await fetch(`${BASE_URL}/api/payment/status/${transactionId}`, {
                    cache: "no-store",
                });

                return res.json();
            } catch (error) {
                toast.error("Something went wrong");
                console.log(error)
            }
        };
        getData(transactionId).then((d) => {
            setValues(d)
        }).finally(() => {
            setLoading(false)
        })

    }, [transactionId])


    if (!values) {
        return <PageNotFound />
    }

    if (loading) return <Loading />

    const getStatusMessage = () => {
        switch (values?.data?.state) {
            case 'COMPLETED':
                return "Your payment was successful!";
            case 'FAILED':
                return "Oops! It seems your payment failed.";
            case 'PENDING':
                return "Your payment is currently pending. Please wait for confirmation.";
            default:
                return "Unknown Payment Status";
        }
    };

    const getStatusColor = () => {
        switch (values?.data?.state) {
            case 'COMPLETED':
                return "text-green-600";
            case 'FAILED':
                return "text-red-600";
            case 'PENDING':
                return "text-yellow-600";
            default:
                return "text-gray-600";
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-[70vh]">
            <h1 className="text-3xl font-semibold mb-4">Payment Status</h1>
            <div className='mb-4'>
                <div className={`flex items-center mb-2 ${getStatusColor()}`}>
                    {values?.data?.state === 'COMPLETED' && <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
                    {values?.data?.state === 'FAILED' && <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>}
                    {values?.data?.state === 'PENDING' && <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>}
                    <p className="text-lg">{getStatusMessage()}</p>
                </div>
                {values?.data?.merchantTransactionId && <div className="text-gray-700 mb-2 text-center">
                    <p>Transaction ID: {values?.data?.merchantTransactionId}</p>
                </div>}
            </div>
            <Link
                href={'/'}
                // onClick={() => router.push('/')}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">Return to Home</Link>
        </div>
    );
};

export default PaymentStatus;
