import React, { use,useEffect } from "react";
import "./Home.css";
import { NavLink } from "react-router-dom";

export default function Home() 
{
  useEffect(() => {
    document.body.classList.add("home-bg");
    return () => {
      document.body.classList.remove("home-bg");
    };
  }, []);
  return (
    <div style={{ paddingBottom: "80px" }}>
      {/* Hero Section */}
      <section style={{ textAlign: "center", padding: "50px", color: "black" }}>
        <h1>Welcome to City Hotel</h1>
        <p className="digital" style={{color:"black", fontSize:"30px"}}>Book Luxury Rooms At Affordable Prices</p>
      </section>

      {/* Features */}
      <div className="lux">
        <NavLink to="/rooms" className="feature-link">
          <div className="hom">🏨 Luxury Rooms</div>
        </NavLink>
        
        <NavLink to="/stay" className="feature-link">
          <div className="hom">🛏️ Comfortable Stay</div>
        </NavLink>

        <NavLink to="/dining" className="feature-link">
          <div className="hom">🍽️ Free Breakfast</div>
        </NavLink>

        <NavLink to="/service" className="feature-link">
          <div className="hom">⏰ 24x7 Service</div>
        </NavLink>
      </div>

      {/* About / Highlights Section */}
      {/* <section>
        <h1 className="blog">This Is Blog Page </h1>
        <div className="about-section">
          <h2>Luxury Rooftop Pool Experience</h2>
          <img src="Home.png" alt="Rooftop Pool" />
          <p>
            Enjoy a breathtaking rooftop swimming pool with panoramic city and mountain views.
            Relax under the night sky, experience peaceful surroundings, and indulge in world-class
            comfort designed for a truly luxurious stay.
          </p>
        </div>

        <div className="about-section">
          <h2>Rooftop Restaurant</h2>
          <img src="Home2.png" alt="Rooftop Restaurant" />
          <p>
            A beautiful outdoor rooftop dining area with modern lighting, elegant seating, and a scenic mountain view at sunset.
          </p>
        </div>

        <div className="about-section">
          <h2>Rooftop Swimming Pool</h2>
          <img src="Home3.png" alt="Rooftop Swimming Pool" />
          <p>
            A modern rooftop pool with clear blue water, lounge chairs, and a scenic view of the city and surrounding hills under a bright blue sky.
          </p>
        </div>
      </section> */}
    </div>
  );
}