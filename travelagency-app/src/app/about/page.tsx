import React from "react";
import "@/styles/about.css";

const About = () => {
  return (
    <div>
      <div className="about-container">
        <h1 className="about-heading">About Us</h1>
        <div className="about-column">
          <p className="about-text">
            Welcome to <span className="about-highlight">Travel Agency</span> -
            your go-to trip advisor for unforgettable journeys around the world!
          </p>
          <p className="about-text">
            At <span className="about-highlight">Travel Agency</span>, we're
            passionate about travel and dedicated to providing our customers
            with the best possible experiences. Whether you're seeking a
            relaxing beach getaway, an exciting adventure tour, or a cultural
            immersion in a far-off land, we've got you covered.
          </p>
          <p className="about-text">
            Our team of expert travel advisors is here to help you plan your
            dream vacation from start to finish. With our extensive knowledge
            and personalized service, we'll create a tailor-made itinerary that
            suits your interests, budget, and travel style.
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
      </div>
      <section className="image-section">
        <h2>Our Best Locations</h2>
        <div className="image-cards">
          <div className="image-card">
            <img src="/images/rome.jpeg" alt="Partner 1" />
          </div>
          <div className="image-card">
            <img src="/images/paris.jpg" alt="Partner 2" />
          </div>
          <div className="image-card">
            <img src="/images/london.jpg" alt="Partner 3" />
          </div>
        </div>
      </section>
      <footer className="contact-info">
        <h2>Contact Us</h2>
        <p>Email: info@travelagency.com</p>
        <p>Phone: 123-456-7890</p>
        <p>Address: 123 Main Street, Adventure City, AC 12345</p>
      </footer>
    </div>
  );
};

export default About;
