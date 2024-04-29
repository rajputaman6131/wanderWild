"use client"
import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import Modal from '../common/Modal'
import { useState } from 'react'
import Link from 'next/link'

export default function DetailSection({ includedItems = [], excludedItems = [], price = "00", packageType = "Per Person", description, mode, values, setValues, slug }) {
    const [item, setItem] = useState("");
    const [open, setOpen] = useState("");

    const handleAddItem = () => {
        const type = open === "Included Item" ? 'includedItems' : 'excludedItems'
        const prevValues = open === "Included Item" ? includedItems : excludedItems
        setValues({ ...values, [type]: [...prevValues, item] })
        setItem("")
        setOpen(false)
    }


    const removeItem = (itemType, index) => {
        const type = itemType === "Included Item" ? 'includedItems' : 'excludedItems'
        const prevValues = itemType === "Included Item" ? includedItems : excludedItems

        setValues({ ...values, [type]: prevValues.filter((_, i) => i !== index) })
    }

    return (
        <div className="mx-auto mt-10 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-10 lg:mx-0 lg:flex lg:max-w-none mb-10">
            <div className="p-8 sm:p-10 lg:flex-auto">
                <h3 className="text-2xl font-bold tracking-tight text-gray-900">Detail</h3>
                <p className="mt-6 text-base leading-7 text-gray-600">
                    {description}
                </p>
                {
                    includedItems.length || mode === "admin" ? <div>
                        <div className="mt-10 flex items-center gap-x-4">
                            <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">What’s included</h4>
                            <div className="h-px flex-auto bg-gray-100" />
                        </div>
                        <ul
                            role="list"
                            className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
                        >
                            {includedItems.map((feature, i) => (
                                <li key={feature} className="flex justify-between items-center">
                                    <span className='flex gap-x-3'>
                                        <CheckIcon className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                                        {feature}
                                    </span>
                                    {
                                        mode === "admin" ? <span onClick={() => removeItem('Included Item', i)} className='cursor-pointer bg-gray-100 rounded'>
                                            <XMarkIcon className="h-6 w-5 text-gray-600" aria-hidden="true" />
                                        </span> : <></>
                                    }
                                </li>
                            ))}
                            {
                                mode === "admin" ? <li onClick={() => setOpen("Included Item")} className="flex gap-x-3 cursor-pointer">
                                    <PlusCircleIcon className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                                    Add New
                                </li> : <></>
                            }
                        </ul>
                    </div> : <></>
                }
                {
                    excludedItems.length || mode === "admin" ? <div>
                        <div className="mt-10 flex items-center gap-x-4">
                            <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">What’s excluded</h4>
                            <div className="h-px flex-auto bg-gray-100" />
                        </div>
                        <ul
                            role="list"
                            className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
                        >
                            {excludedItems.map((feature, i) => (
                                <li key={feature} className="flex justify-between items-center">
                                    <span className='flex gap-x-3'>
                                        <XMarkIcon className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                                        {feature}
                                    </span>
                                    {
                                        mode === "admin" ? <span onClick={() => removeItem('Excluded Item', i)} className='cursor-pointer bg-gray-100 rounded'>
                                            <XMarkIcon className="h-6 w-5 text-gray-600" aria-hidden="true" />
                                        </span> : <></>
                                    }
                                </li>
                            ))}
                            {
                                mode === "admin" ? <li onClick={() => setOpen("Excluded Item")} className="flex gap-x-3 cursor-pointer">
                                    <PlusCircleIcon className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                                    Add New
                                </li> : <></>
                            }
                        </ul>
                    </div> : <></>
                }
            </div>
            <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                    <div className="mx-auto max-w-xs px-8">
                        <p className="text-base font-semibold text-gray-600">Per Person</p>
                        <p className="mt-6 flex items-baseline justify-center gap-x-2">
                            <span className="text-5xl font-bold tracking-tight text-gray-900">₹{price}</span>

                        </p>
                        <Link
                            href={mode === 'admin' ? '#' : `/packages/${slug}/cart`}
                            className="mt-10 block w-full rounded-md bg-[#3c8d7d] px-3 py-2 text-center text-sm font-semibold text-white shadow-sm"
                        >
                            Book Now
                        </Link>
                        <p className="mt-6 text-xs leading-5 text-gray-600">
                            Customer support available 24/7
                        </p>
                    </div>
                </div>
            </div>
            <Modal open={open} setOpen={setOpen} body={
                <div className='mb-5'>
                    <label htmlFor="item" className="block text-sm font-medium leading-6 text-gray-900">
                        Add New {open}
                    </label>
                    <div className="mt-2">
                        <input
                            onChange={(e) => setItem(e.target.value)}
                            type="text"
                            id="item"
                            className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
            } handleSubmit={handleAddItem} submitButtonLabel={"Save"} />
        </div>
    )
}
