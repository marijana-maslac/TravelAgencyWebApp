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
          <FlexItem title="Travel" />
          <FlexItem title="Gallery" />
          <FlexItem title="About" />
          <FlexItem title="Users" />
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
          <div>
            <h4>I will put some about info and contact info here.</h4>
          </div>
          {/* Content specific to About */}
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
