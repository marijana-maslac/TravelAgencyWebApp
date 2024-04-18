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
          <FlexItem title="Users" />
          <FlexItem title="About" />
        </div>
      </main>
    </div>
  );
};

const FlexItem: React.FC<FlexItemProps> = ({ title }) => {
  return (
    <div className={styles.flexItem}>
      <p>{title}</p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquet
        nulla quis massa ultricies, in cursus neque eleifend. Integer
        ullamcorper erat id orci scelerisque, nec interdum felis faucibus.
        Phasellus tincidunt, leo nec sodales tincidunt, lorem arcu elementum ex,
        eget egestas magna eros at urna.
      </p>
      <Link href={`/${title.toLowerCase()}`}>
        <p>Read more</p>
      </Link>
    </div>
  );
};

export default page;
