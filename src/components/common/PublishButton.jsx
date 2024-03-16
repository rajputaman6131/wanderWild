import { CheckIcon } from "@heroicons/react/20/solid"

const PublishButton = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            type="button"
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
            <CheckIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            Publish
        </button>
    )
}

export default PublishButton