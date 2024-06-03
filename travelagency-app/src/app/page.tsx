import React from "react";
import styles from "@/app/page.module.css";
import Link from "next/link";

interface FlexItemProps {
  title: string;
}

const page = () => {
  return (
    <div>
      <main className={styles.main}>
        <h1>Dobro došli na početnu stranicu.</h1>
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
          <div className={styles.imageGallery}>
            <img src="/path/to/travel-image1.jpg" alt="Travel Image 1" />
            <img src="/path/to/travel-image2.jpg" alt="Travel Image 2" />
            <img src="/path/to/travel-image3.jpg" alt="Travel Image 3" />
            {/* Add more images specific to Travel */}
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquet
            nulla quis massa ultricies, in cursus neque eleifend. Integer
            ullamcorper erat id orci scelerisque, nec interdum felis faucibus.
            Phasellus tincidunt, leo nec sodales tincidunt, lorem arcu elementum
            ex, eget egestas magna eros at urna.
          </p>
          <div className={styles.linkContainer}>
            <Link href={`/${title.toLowerCase()}`}>
              <p>Read more</p>
            </Link>
            {/* Add more links specific to Travel */}
          </div>
        </>
      );
      break;
    case "Gallery":
      content = (
        <>
          <div>
            <h2>I will put some images from travel adventures here.</h2>
          </div>
          {/* Content specific to Gallery */}
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
          {/* Content specific to About */}
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
    // Add more cases for additional FlexItems if needed
    default:
      content = <p>No content available for {title}</p>;
  }

  return <div className={styles.flexItem}>{content}</div>;
};

export default page;
