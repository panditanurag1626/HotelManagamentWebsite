import React, { useEffect } from "react";
import "./Service.css";

export default function Service() {
useEffect(() => {
  document.body.classList.add("service-bg");
  return () => {
    document.body.classList.remove("service-bg");
  };
}, []);
  const services = [
    { title: "Luxury Rooms", desc: "Experience comfort with our fully furnished luxury rooms." },
    { title: "Free Wi-Fi", desc: "Stay connected with high-speed internet access." },
    { title: "Swimming Pool", desc: "Relax and refresh in our clean swimming pool." },
    { title: "24/7 Room Service", desc: "Order food anytime with our round-the-clock service." }
  ];

  return (
    <div className="service-container">
      <h2 className="service-title">Our Hotel Services</h2>

      <div className="service-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );

}
