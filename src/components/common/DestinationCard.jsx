

const DestinationCard = ({ details }) => {
    return (
        <div className=" transition-transform transform hover:scale-105 transition-all duration-300 cursor-pointer">
            <img src={details?.image || "/p1.jpeg"} alt="Destination Image" className="w-full h-64 object-cover rounded-xl" />
            <h2 className="text-center mt-5">
                {details?.placeName}
            </h2>
        </div>
    )
}

export default DestinationCard;
