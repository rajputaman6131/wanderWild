import Link from "next/link"
import DestinationCard from "../common/DestinationCard"
import Header from "../common/Header"
import { BASE_URL } from "@/constants/constants";
import ListMotorBikes from "../motorbikes/ListMotorbikes";

// const getData = async () => {
//     const res = await fetch(
//         `${BASE_URL}/api/places`,
//         {
//             cache: "no-store",
//         }
//     );

//     return res.json();
// };


const BikeBookings = async () => {
    // const { places } = await getData();

    const motorcycles = [
        {
            make: "Honda",
            model: "Africa Twin",
            year: 2023,
            image: "https://imgd.aeplcdn.com/664x374/n/bw/models/colors/honda-select-model-pearl-glare-white-1698307101032.png?q=80",
            altText: "Honda Africa Twin parked on a mountain trail",
            status: "FOR RENT",
            minAge: 21,
            engineType: "Parallel Twin",
            maxSpeed: "125mph",
            price: "1,499",
        },
        {
            make: "KTM",
            model: "1290 Super Adventure R",
            year: 2023,
            image: "https://cdni.autocarindia.com/Utils/ImageResizer.ashx?n=https://cdni.autocarindia.com/ExtraImages/20210301011248_KTM_1290_Super_Adventure_R.jpg&w=700&c=1",
            altText: "KTM 1290 Super Adventure R riding through desert dunes",
            status: "FOR RENT",
            minAge: 21,
            engineType: "V-Twin",
            maxSpeed: "140mph",
            price: "1,499",
        },
        {
            make: "BMW",
            model: "R 1250 GS Adventure",
            year: 2024,
            image: "https://robbreport.com/wp-content/uploads/2020/09/4-11.jpg",
            altText: "BMW R 1250 GS Adventure on a rugged dirt road",
            status: "FOR RENT",
            minAge: 21,
            engineType: "Boxer Twin",
            maxSpeed: "130mph",
            price: "2,345",
        },
        {
            make: "Ducati",
            model: "Multistrada V4 Rally",
            year: 2024,
            image: "https://media.assettype.com/evoindia/2022-09/ed15922a-3725-411f-9d43-3faa6b63fa23/MY23_DUCATI_MULTISTRADAV4_RALLY__132__UC437612_High.jpg",
            altText: "Ducati Multistrada V4 Rally riding through a forest trail",
            status: "FOR RENT",
            minAge: 21,
            engineType: "V4 Granturismo",
            maxSpeed: "155mph",
            price: "2,195",
        },
        {
            make: "Yamaha",
            model: "Ténéré 700",
            year: 2023,
            image: "https://imgd.aeplcdn.com/664x374/bw/models/yamaha-tenere-700.jpg?20190103151915&q=80",
            altText: "Yamaha Ténéré 700 navigating rocky mountain terrain",
            status: "FOR RENT",
            minAge: 21,
            engineType: "Parallel Twin",
            maxSpeed: "120mph",
            price: "1,499",
        },
        {
            make: "Suzuki",
            model: "V-Strom 1050 DE",
            year: 2024,
            image: "https://www.globalsuzuki.com/motorcycle/smgs/products/specialsite/2023v-strom1050_de/img/introduction_02.jpg",
            altText: "Suzuki V-Strom 1050 DE on an off-road adventure",
            status: "FOR RENT",
            minAge: 21,
            engineType: "V-Twin",
            maxSpeed: "125mph",
            price: "1,399",
        }
    ];


    return (
        <div className="py-20 bg-[#f8fbff] mb-20">
            <div className="wrapper">
                <Header title={"Embark on the Ultimate Adventure Ride"} description={"Discover the perfect ride for your next thrilling journey!"} />
                <div className="">
                    <ListMotorBikes
                        motorcycles={motorcycles}
                    />
                </div>
            </div>
            <div className="pt-10 flex justify-center">
                <Link
                    href="/#"
                    className=" block  rounded-2xl bg-[#3c8d7d] px-6 py-2 text-center text-sm font-semibold text-white shadow-sm"
                >
                    View All {"  "} <span aria-hidden="true">&rarr;</span>
                </Link>
            </div>
        </div>
    )
}

export default BikeBookings