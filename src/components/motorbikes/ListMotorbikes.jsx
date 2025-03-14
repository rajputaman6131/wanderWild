export default function ListMotorBikes({ motorcycles }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {motorcycles.map((bike, index) => (
                <div
                    key={index}
                    className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 rounded-xl"
                >
                    {/* Card Header */}
                    <div className="p-4 flex justify-between items-center">
                        <h2 className="text-xl font-bold">{bike.year} {bike.make} {bike.model}</h2>
                        <div className="flex space-x-2">
                            <i className="fas fa-eye"></i>
                            <i className="fas fa-sync-alt"></i>
                            <i className="fas fa-plus"></i>
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="relative w-full h-[250px]">
                        <img
                            src={bike.image}
                            alt={bike.altText}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute top-0 right-0 bg-[#3c8d7d] text-white px-2 py-1 text-xs font-bold">
                            {bike.status}
                        </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 flex flex-col flex-grow">
                        <div className="grid grid-cols-2 gap-4 flex-grow">
                            <InfoItem icon="fa-motorcycle" title={bike.make} subtitle="Make" />
                            <InfoItem icon="fa-layer-group" title={bike.model} subtitle="Model" />
                            <InfoItem icon="fa-user" title={bike.minAge} subtitle="Minimum Age" />
                            <InfoItem icon="fa-calendar-alt" title={bike.year} subtitle="Registration Year" />
                            <InfoItem icon="fa-cogs" title={bike.engineType} subtitle="Engine Type" />
                            <InfoItem icon="fa-tachometer-alt" title={bike.maxSpeed} subtitle="Maximum Speed" />
                        </div>

                        {/* Price & Button Section */}
                        <div className="mt-4 border-t pt-4">
                            <p className="text-lg font-bold">₹{bike.price}</p>
                            <button className="mt-2 w-full bg-[#3c8d7d] text-white py-2 rounded">
                                VIEW MORE
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

function InfoItem({ icon, title, subtitle }) {
    return (
        <div className="flex items-center space-x-2">
            <i className={`fas ${icon} text-red-500`}></i>
            <div>
                <p className="font-bold">{title}</p>
                <p className="text-sm text-gray-600">{subtitle}</p>
            </div>
        </div>
    );
}
