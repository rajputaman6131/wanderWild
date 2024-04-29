"use client"
import {
    ClockIcon,
    MapPinIcon,
} from '@heroicons/react/20/solid'
import EditButton from '../common/EditButton'
import PublishButton from '../common/PublishButton'

export default function Header({ setOpenSlideOver, mode, packageName, locationName, duration, handlePublish, loading }) {

    return (
        <div className="lg:flex lg:items-center lg:justify-between mt-10 ">
            <div className="min-w-0 flex-1">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                    {packageName}
                </h2>
                <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">

                    {
                        locationName ? <div className="mt-2 flex items-center text-sm text-gray-500">
                            <MapPinIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                            {locationName}
                        </div> : <></>
                    }

                    {
                        duration ? <div className="mt-2 flex items-center text-sm text-gray-500">
                            <ClockIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                            {duration}
                        </div> : <></>
                    }
                </div>
            </div>

            {
                mode === 'admin' && <div className="mt-5 flex lg:ml-4 lg:mt-0">
                    <span className="">
                        <EditButton
                            onClick={() => setOpenSlideOver(true)}
                        />
                    </span>

                    <span className="ml-3">
                        <PublishButton
                            disabled={loading}
                            onClick={handlePublish}
                        />
                    </span>

                </div>
            }
        </div>
    )
}
