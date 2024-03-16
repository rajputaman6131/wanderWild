const EditDetail = ({ values, setValues, setOpen }) => {

    const handleChange = (e) => {
        const { name, value } = e.target;

        setValues({ ...values, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setOpen(false)
    }

    return (
        <form method="post" onSubmit={handleSubmit}>

            <div className="sm:col-span-3">
                <label htmlFor="packageName" className="block text-sm font-medium leading-6 text-gray-900">
                    Package Name
                </label>
                <div className="mt-2">
                    <input
                        required
                        value={values?.packageName}
                        onChange={handleChange}
                        type="text"
                        name="packageName"
                        id="packageName"
                        className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Title of the package"
                    />
                </div>
            </div>

            <div className="sm:col-span-3 mt-6">
                <label htmlFor="lastDate" className="block text-sm font-medium leading-6 text-gray-900">
                    Last Date Of Registration
                </label>
                <div className="mt-2">
                    <input
                        value={values?.lastDate}
                        onChange={handleChange}
                        type="date"
                        name="lastDate"
                        id="lastDate"
                        className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div className="sm:col-span-3 mt-6">
                <label htmlFor="locationName" className="block text-sm font-medium leading-6 text-gray-900 mt-2">
                    Location Name
                </label>
                <div className="mt-2">
                    <select
                        required
                        value={values?.locationName || ''}
                        onChange={handleChange}
                        id="locationName"
                        name="locationName"
                        autoComplete="country-name"
                        className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-md"
                    >
                        <option value={""}>Select</option>
                        <option>India</option>
                        <option>France</option>
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                    </select>
                </div>
            </div>

            <div className="sm:col-span-3 mt-6">
                <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                    Price of package
                </label>
                <div className="mt-2">
                    <input
                        required
                        value={values?.price}
                        onChange={handleChange}
                        type="number"
                        min={0}
                        name="price"
                        id="price"
                        className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div className="sm:col-span-3 mt-6">
                <label htmlFor="packageType" className="block text-sm font-medium leading-6 text-gray-900">
                    Price For
                </label>
                <div className="mt-2">
                    <input
                        required
                        value={values?.packageType}
                        onChange={handleChange}
                        type="text"
                        name="packageType"
                        id="packageType"
                        placeholder="Ex: Per Person"
                        className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div className="sm:col-span-3 mt-6">
                <label htmlFor="numberOfTourists" className="block text-sm font-medium leading-6 text-gray-900">
                    Number of Tourists
                </label>
                <div className="mt-2">
                    <input
                        required
                        value={values?.numberOfTourists}
                        onChange={handleChange}
                        type="text"
                        name="numberOfTourists"
                        id="numberOfTourists"
                        className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div className="sm:col-span-3 mt-6">
                <label htmlFor="duration" className="block text-sm font-medium leading-6 text-gray-900">
                    Duration
                </label>
                <div className="mt-2">
                    <input
                        required
                        value={values?.duration}
                        onChange={handleChange}
                        type="text"
                        name="duration"
                        id="duration"
                        placeholder="Ex: 5 Days"
                        className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div className="sm:col-span-3 mt-6">
                <label htmlFor="locationEmbedSrc" className="block text-sm font-medium leading-6 text-gray-900">
                    Google Map Embed Src of Location
                </label>
                <div className="mt-2">
                    <input
                        value={values?.locationEmbedSrc}
                        onChange={handleChange}
                        type="text"
                        name="locationEmbedSrc"
                        id="locationEmbedSrc"
                        className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div className=" mt-8">
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="col-span-full">
                        <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                            Package Details
                        </label>
                        <div className="mt-2">
                            <textarea
                                required
                                value={values?.description || ''}
                                onChange={handleChange}
                                id="details"
                                name="description"
                                rows={3}
                                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                defaultValue={''}
                                placeholder="Describe details of package"
                            />
                        </div>
                        <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about package.</p>
                    </div>

                </div>
            </div>

            <button
                type="submit"
                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 mt-6"
            // onClick={handleSubmit}
            >
                Save
            </button>
        </form>
    )
}

export default EditDetail