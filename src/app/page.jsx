import Hero from "@/components/home/Hero";
import styles from "./homepage.module.css";
import AboutUs from "@/components/home/AboutUs";
import FAQ from "@/components/home/FAQ";
import PopularDestinations from "@/components/home/PopularDestinations";
import PopularTours from "@/components/home/PopularTours";
import PopularActivities from "@/components/home/PopularActivities";
import BikeBookings from "@/components/home/BikeBookings";


export default function Home({ searchParams }) {

  return (
    <div className={styles.container}>
      <div style={{
        minHeight: '60vh'
      }}>
        <Hero />
        <PopularActivities />
        <PopularDestinations />
        <PopularTours />
        <BikeBookings />
        <AboutUs />
        <FAQ />
      </div>
    </div>
  );
}
