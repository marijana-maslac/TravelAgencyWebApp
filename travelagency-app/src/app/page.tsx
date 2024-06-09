import React from "react";
import styles from "@/app/page.module.css";
import Link from "next/link";
import DataTable from "./travel/DataTable";
import { TravelListing } from "@prisma/client";

interface FlexItemProps {
  title: string;
}
interface Props {
  trips: TravelListing[];
}
const Page = () => {
  return (
    <div>
      <main className={styles.main}>
        <section className={styles.heroSection}>
          <div className={styles.heroOverlay}>
            <h1>Explore the World with Us</h1>
            <p>Your adventure begins here</p>
            <Link className={styles.ctaButton} href={`/travel`}>
              Start Your Journey
            </Link>
          </div>
        </section>
        <div className={styles.flexContainer}>
          <FlexItem title="About" />
          <FlexItem title="Travel" />
          <FlexItem title="Gallery" />
          <FlexItem title="Contact Us" />
        </div>
      </main>
    </div>
  );
};

const FlexItem: React.FC<FlexItemProps> = ({ title }) => {
  let content;
  switch (title) {
    case "Travel":
      content = (
        <>
          <h2>{title}</h2>
          <div>
            <DataTable trips={[]} />
          </div>
          <div className={styles.linkContainer}>
            <Link href={`/${title.toLowerCase()}`}>
              <p>Read more</p>
            </Link>
          </div>
        </>
      );
      break;
    case "Gallery":
      content = (
        <>
          <h2>{title}</h2>
          <div className={styles.imageGallery}>
            <img src="/images/paris.jpg" alt="Gallery Image 1" />
            <img src="/images/london.jpg" alt="Gallery Image 2" />
            <img src="/images/rome.jpeg" alt="Gallery Image 3" />
            <img src="/images/newyork.jpg" alt="Gallery Image 4" />
            <img src="/images/trogir.jpg" alt="Gallery Image 5" />
            <img src="/images/venice.jpg" alt="Gallery Image 6" />
            <img src="/images/amsterdam.jpg" alt="Gallery Image 7" />
          </div>
        </>
      );
      break;
    case "About":
      content = (
        <>
          <h2>{title}</h2>
          <div>
            <p className="about-text">
              Our team of expert travel advisors is here to help you plan your
              dream vacation from start to finish. With our extensive knowledge
              and personalized service, we'll create a tailor-made itinerary
              that suits your interests, budget, and travel style.
              <br />
              <br />
              So why wait? Start planning your next adventure today and let us
              take you on the trip of a lifetime!
            </p>
          </div>
          <div className={styles.linkContainer}>
            <Link href={`/${title.toLowerCase()}`}>
              <p>Read more</p>
            </Link>
          </div>
        </>
      );
      break;
    case "Contact Us":
      content = (
        <>
          <h2>{title}</h2>
          <div>
            <p>Email: info@travelagency.com</p>
            <p>Phone: 123-456-7890</p>
            <p>Address: 123 Main Street, Adventure City, AC 12345</p>
          </div>
        </>
      );
      break;
    default:
      content = <p>No content available for {title}</p>;
  }

  return <div className={styles.flexItem}>{content}</div>;
};

export default Page;
