import Accordion from "../common/Accordion";

const faqs = [
    {
        title: "What destinations do you offer?",
        description: "We offer a wide range of destinations across the globe, from exotic beach getaways to thrilling mountain expeditions. Explore our destinations page to discover all the options."
    },
    {
        title: "How do I book a trip?",
        description: "Booking a trip with us is simple! You can either book directly through our website or contact our friendly customer service team for assistance. We'll guide you through the process and ensure you have everything you need for an unforgettable journey."
    },
    {
        title: "What is included in the tour packages?",
        description: "Our tour packages are designed to provide you with a hassle-free travel experience. Depending on the destination and package you choose, amenities may include accommodation, transportation, guided tours, meals, and more. Refer to the specific package details for a comprehensive list of inclusions."
    },
    {
        title: "Are flights included in the tour price?",
        description: "In most cases, flights are not included in the tour price. However, we can assist you in arranging flights as part of your package if desired. Our goal is to accommodate your needs and preferences to ensure a seamless travel experience."
    },
    {
        title: "What if I need to cancel or reschedule my trip?",
        description: "We understand that plans can change unexpectedly. If you need to cancel or reschedule your trip, please contact us as soon as possible. Our team will work with you to accommodate your request and provide guidance on any applicable fees or policies."
    }
];


const FAQ = () => {
    return (
        <div className="wrapper" id="faq">
            <Accordion items={faqs} title={'FAQs'} description={"Any Questions? Look Here"} />
        </div>
    )
}

export default FAQ