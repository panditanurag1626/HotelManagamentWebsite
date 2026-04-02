import React, { useEffect } from "react";
import "./Home.css";
import { NavLink } from "react-router-dom";

export default function Home() {
  useEffect(() => {
    document.body.classList.add("home-bg");
    return () => {
      document.body.classList.remove("home-bg");
    };
  }, []);

  return (
    <div style={{ paddingBottom: "80px" }}>

      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to City Hotel</h1>
        <p className="digital">
          Book Luxury Rooms At Affordable Prices
        </p>
      </section>

      {/* Features */}
      <div className="lux">
        <NavLink to="/rooms"><div className="hom">🏨 Luxury Rooms</div></NavLink>
        <NavLink to="/stay"><div className="hom">🛏️ Comfortable Stay</div></NavLink>
        <NavLink to="/dining"><div className="hom">🍽️ Free Breakfast</div></NavLink>
        <NavLink to="/service"><div className="hom">⏰ 24x7 Service</div></NavLink>
      </div>


      {/* Video Section 1 */}
      <section className="video-section">
        <h2>Luxury Room Tour</h2>
        <p>Take a look inside our premium luxury rooms with modern design.</p>
        <div className="video-container">
          <video src="home1.mp4" controls autoPlay loop muted style={{ width: "100%" }} />
        </div>
      </section>

      {/* Video Section 2 */}
      <section className="video-section">
        <h2>Premium Rooms</h2>
        <p>Enjoy spacious rooms with modern amenities and elegant interiors.</p>
        <div className="video-container">
          <video src="home2.mp4" controls autoPlay loop muted style={{ width: "100%" }} />
        </div>
      </section>

      {/* Video Section 3 */}
      <section className="video-section">
        <h2>Luxury Experiences</h2>
        <p>Experience top-class services designed for your comfort and convenience.</p>
        <div className="video-container">
          <video src="home3.mp4" controls autoPlay loop muted style={{ width: "100%" }} />
        </div>
      </section>

      {/* About Section */}
      <section className="about-wrapper">
        <div className="secti">
          <h2>Rooftop Restaurant</h2>
          <img src="Home2.png" alt="Rooftop Restaurant" />
          <p>
            A beautiful outdoor rooftop dining area with modern lighting,
            elegant seating, and a scenic mountain view at sunset.
          </p>
        </div>
      </section>
    </div>
  );
}