import Link from "next/link";

const AboutUs = () => {
    return (
        <>
            <section id="about" className="wrapper overflow-hidden pt-20 lg:pt-[30px]  bg-white dark:bg-dark">
                <div className="container mx-auto">
                    <div className="flex flex-wrap items-center justify-between -mx-4">
                        <div className="w-full px-4 lg:w-6/12">
                            <div className="flex items-center -mx-3 sm:-mx-4">
                                <div className="w-full px-3 sm:px-4 xl:w-1/2">
                                    <div className="py-3 sm:py-4">
                                        <img
                                            src="https://i.ibb.co/gFb3ns6/image-1.jpg"
                                            alt=""
                                            className="w-full rounded-2xl"
                                        />
                                    </div>
                                    <div className="py-3 sm:py-4">
                                        <img
                                            src="https://i.ibb.co/rfHFq15/image-2.jpg"
                                            alt=""
                                            className="w-full rounded-2xl"
                                        />
                                    </div>
                                </div>
                                <div className="w-full px-3 sm:px-4 xl:w-1/2">
                                    <div className="relative  my-4">
                                        <img
                                            src="https://i.ibb.co/9y7nYCD/image-3.jpg"
                                            alt=""
                                            className="w-full rounded-2xl"
                                        />

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full px-4 lg:w-1/2 xl:w-5/12">
                            <div className="mt-10 lg:mt-0">
                                <span className="block mb-4 text-lg font-semibold text-primary">
                                    Why Choose Us
                                </span>
                                <h2 className="mb-5 text-3xl font-bold text-dark  sm:text-[40px]/[48px]">
                                    Embark on Your Next Adventure with Wander Wild Adventures
                                </h2>
                                <p className="mb-5 text-base text-body-color dark:text-dark-6">
                                    At Wander Wild Adventures, our passion for travel drives us to explore the world's hidden gems and share them with fellow adventurers. Since our inception in 2020, we've been committed to inspiring others to embark on unforgettable journeys, fostering a community of like-minded explorers who seek to uncover the beauty and diversity of our planet.
                                </p>
                                <p className="mb-8 text-base text-body-color dark:text-dark-6">
                                    Led by a team of experienced travelers and storytellers, we curate insightful guides, provide valuable resources, and share inspiring stories to help travelers plan their adventures with confidence and excitement. With a focus on sustainable travel practices and a deep appreciation for cultural diversity, we aim to connect people from all walks of life through the transformative power of exploration.
                                </p>

                                <Link
                                    href="/packages"
                                    className="inline-flex items-center justify-center py-3 text-base font-medium text-center text-white border border-transparent rounded-md px-7 bg-primary hover:bg-opacity-90"
                                >
                                    Explore Packages
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AboutUs;
