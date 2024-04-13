"use client";

import { useState } from "react";
import Header from "./Header";
import Modal from "./Modal";
import { PlusCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

const Accordion = ({ items, title, description, mode, setValues, values, name }) => {
  const halfLength = Math.ceil(items.length / 2);
  const leftItems = items.slice(0, halfLength);
  const rightItems = items.slice(halfLength);

  const [item, setItem] = useState({})
  const [open, setOpen] = useState(false);
  const handleAddItem = () => {
    setValues({
      ...values,
      [name]: [
        ...items, item
      ]
    })
    setOpen(false)
    setItem({})
  }

  const removeItem = (index) => {
    setValues({ ...values, [name]: items.filter((_, i) => i !== index) })
  }

  return (
    <section className=" pb-12 pt-10 lg:pb-[90px] lg:pt-[120px]">
      <div className="container mx-auto">
        <Header title={title} description={description} bottomComponent={
          mode === "admin" ? <span onClick={() => setOpen(true)} className="flex gap-x-2 cursor-pointer mt-5 justify-center">
            <PlusCircleIcon className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
            <span className="mr-5">Add New {title}</span>
          </span> : <></>
        }
        />

        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 lg:w-1/2">
            {leftItems.map((item, index) => (
              <AccordionItem
                key={index}
                header={item.title}
                text={item.description}
                endComponent={
                  mode === 'admin' ? <span onClick={() => removeItem(index)} className='cursor-pointer bg-gray-100 rounded ml-5'>
                    <XMarkIcon className="h-6 w-5 text-gray-600" aria-hidden="true" />
                  </span> : <></>
                }
              />
            ))}
          </div>
          <div className="w-full px-4 lg:w-1/2">
            {rightItems.map((item, index) => (
              <AccordionItem
                key={index + halfLength}
                header={item.title}
                text={item.description}
                endComponent={
                  mode === 'admin' ? <span onClick={() => removeItem(index + halfLength)} className='cursor-pointer bg-gray-100 rounded ml-5'>
                    <XMarkIcon className="h-6 w-5 text-gray-600" aria-hidden="true" />
                  </span> : <></>
                }
              />
            ))}
            <Modal open={open} setOpen={setOpen} body={
              <div className='mb-5'>
                <label htmlFor="itemTitle" className="block text-sm font-medium leading-6 text-gray-900">
                  Title
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) => setItem({
                      ...item,
                      title: e.target.value
                    })}
                    type="text"
                    id="itemTitle"
                    className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <label htmlFor="itemDescription" className="block text-sm font-medium leading-6 text-gray-900 mt-5">
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    onChange={(e) => setItem({
                      ...item,
                      description: e.target.value
                    })}
                    type="text"
                    rows={5}
                    id="itemDescription"
                    className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            } handleSubmit={handleAddItem} submitButtonLabel={"Save"} />
          </div>
        </div>
      </div>
    </section>
  );
};

const AccordionItem = ({ header, text, endComponent }) => {
  const [active, setActive] = useState(false);

  const handleToggle = () => {
    setActive(!active);
  };

  return (
    <div className="mb-8 w-full rounded-lg bg-white p-4 shadow-lg  sm:p-8 lg:px-6 xl:px-8">
      <button
        className={`faq-btn flex w-full text-left`}
        onClick={() => handleToggle()}
      >
        <div className="mr-5 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg bg-primary/5 text-primary dark:bg-white/5">
          <svg
            className={`fill-primary stroke-primary duration-200 ease-in-out ${active ? "rotate-180" : ""
              }`}
            width="17"
            height="10"
            viewBox="0 0 17 10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.28687 8.43257L7.28679 8.43265L7.29496 8.43985C7.62576 8.73124 8.02464 8.86001 8.41472 8.86001C8.83092 8.86001 9.22376 8.69083 9.53447 8.41713L9.53454 8.41721L9.54184 8.41052L15.7631 2.70784L15.7691 2.70231L15.7749 2.69659C16.0981 2.38028 16.1985 1.80579 15.7981 1.41393C15.4803 1.1028 14.9167 1.00854 14.5249 1.38489L8.41472 7.00806L2.29995 1.38063L2.29151 1.37286L2.28271 1.36548C1.93092 1.07036 1.38469 1.06804 1.03129 1.41393L1.01755 1.42738L1.00488 1.44184C0.69687 1.79355 0.695778 2.34549 1.0545 2.69659L1.05999 2.70196L1.06565 2.70717L7.28687 8.43257Z"
              fill=""
              stroke=""
            />
          </svg>
        </div>

        <div className="w-full flex justify-between items-center">
          <h4 className="mt-1 text-lg font-semibold ">{header}</h4>
          {endComponent}
        </div>
      </button>

      <div
        className={`pl-[62px] duration-200 ease-in-out ${active ? "block" : "hidden"
          }`}
      >
        <p className="py-3 text-base leading-relaxed text-body-color dark:text-dark-6">
          {text}
        </p>
      </div>
    </div>
  );
};

export default Accordion;
