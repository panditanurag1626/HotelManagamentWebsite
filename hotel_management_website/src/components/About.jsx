import React from "react";
import { useEffect } from "react";
import "./About.css";

export default function About()
{

  useEffect(()=> {
    document.body.classList.add("about-bg");
    return () => {
      document.body.classList.remove("about-bg");
    }
  })

  return (
    <section className="about-section">
      <div className="conta">
        <h1 className="main-title">About Hotel Bliss</h1>

        <p className="intro-text">
          Welcome to <strong>Hotel Bliss</strong>, your ultimate destination for
          comfort, luxury, and exceptional hospitality. Established in 2026, we
          are dedicated to providing memorable stays with world-class service,
          elegant spaces, and warm experiences.
        </p>

        <h2 className="center-title">Welcome to Our Grand Hotel</h2>

        <div className="abo">
          <video src="home4.mp4" controls autoPlay loop muted style={{ width: "100%" }} />
        </div>

        <p className="set">
          Set within grand architecture and timeless design, our spaces are
          crafted to offer more than just a stay. Every corner reflects elegance,
          heritage, and thoughtful comfort — creating an atmosphere where guests
          can relax, connect, and feel truly welcomed.
        </p>

        {/* Cards */}
        <div className="about-cards">
          <div className="card">
            <h3>Our Mission</h3>
            <p>
              To deliver world-class hospitality where every guest feels valued,
              relaxed, and completely at home.
            </p>
          </div>

          <div className="card">
            <h3>Our Vision</h3>
            <p>
              To become the most loved and trusted hotel, known for quality,
              comfort, and exceptional service.
            </p>
          </div>

          <div className="card">
            <h3>Our Values</h3>
            <p>
              Integrity, Excellence, Comfort, and Sustainability guide
              everything we do.
            </p>
          </div>
        </div>
      </div>

      <h2 className="prov">Where Luxury Meets History & Comfort</h2>

      <div className="abo">
        <img src="about2.png" alt="Luxury Experience" />
      </div>

      <p className="final-text">
        Set within timeless architecture and elegant surroundings, our hotel
        blends heritage charm with modern comfort. From peaceful courtyards to
        refined interiors, every detail is designed to create a calm, welcoming,
        and unforgettable experience.
      </p>
    </section>
  );
}
