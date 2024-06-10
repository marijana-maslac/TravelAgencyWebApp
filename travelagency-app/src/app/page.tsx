"use client";
import React, { useState } from "react";
import styles from "@/app/page.module.css";
import Link from "next/link";
import DataTable from "./travel/DataTable";
import { TravelListing } from "@prisma/client";
import "@/styles/about.css";
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
          <FlexItem title="Travel" />
          <div className={styles.flexRow}>
            <FlexItem title="About" />
            <FlexItem title="Gallery" />
          </div>
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
          <ImageSlider />
        </>
      );
      break;
    case "About":
      content = (
        <>
          <h2>{title}</h2>
          <div>
            <p className="about-text">
              At <span className="about-highlight">Travel Agency</span>, we're
              passionate about travel and dedicated to providing our customers
              with the best possible experiences. Whether you're seeking a
              relaxing beach getaway, an exciting adventure tour, or a cultural
              immersion in a far-off land, we've got you covered.
            </p>

            <p className="about-text">
              We believe that travel has the power to enrich lives, create
              memories, and foster connections with people and places around the
              globe. That's why we're committed to making your travel dreams a
              reality and ensuring that every journey with{" "}
              <span className="about-highlight">Travel Agency</span> is an
              unforgettable experience.
            </p>
            <p className="about-text">
              So why wait? Start planning your next adventure today and let us
              take you on the trip of a lifetime!
            </p>
          </div>
          <br></br>
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

const ImageSlider = () => {
  const images = [
    "/images/paris.jpg",
    "/images/london.jpg",
    "/images/rome.jpeg",
    "/images/newyork.jpg",
    "/images/trogir.jpg",
    "/images/venice.jpg",
    "/images/amsterdam.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className={styles.slider}>
      <button className={styles.prev} onClick={prevSlide}>
        &#10094;
      </button>
      <div className={styles.sliderImage}>
        <img
          src={images[currentIndex]}
          alt={`Gallery Image ${currentIndex + 1}`}
        />
      </div>
      <button className={styles.next} onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
};

export default Page;
