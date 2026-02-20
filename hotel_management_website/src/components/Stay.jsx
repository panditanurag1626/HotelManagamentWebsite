import React from "react";
import { useEffect } from "react";
import "./Stay.css";

export default function Stay() {

   useEffect(()=>{
    document.body.classList.add("stay-bg")
    return () => {
      document.body.classList.remove("stay-bg")
    };
  },[]);
  
  return (
    <div className="stay">
      <h2 className="stay-title">Stay Component</h2>
      
      
      <p className="step">Step into a world of comfort from the moment you arrive. Our friendly front desk staff is available to assist you 24/7, ensuring a smooth check-in experience and taking care of all your needs for a stress-free stay.</p>
      <img
        className="stay-image"
        src="stay1.png"
        alt="Stay"
        height="500px"
        width="900px"
      />

      <p className="stay-description">
        Experience the ultimate comfort and luxury in our beautifully designed rooms. 
        Perfect for a relaxing getaway.
      </p>

      {/* <ul className="stay-amenities">
        <li>Free Wi-Fi</li>
        <li>Swimming Pool</li>
        <li>24/7 Room Service</li>
        <li>Complimentary Breakfast</li>
      </ul>
      <br /> */}

      <p className="step">Unwind in our elegantly designed rooms featuring private balconies with refreshing outdoor views. Enjoy your morning coffee or simply relax in the peaceful atmosphere — the perfect escape from everyday life.</p>

      <img src="stay2.png" alt="Stay 2"  height="500px" width="900px" />
      
      <p className="step">
        Our rooms are equipped with modern amenities to ensure a comfortable stay, 
        including air conditioning, flat-screen TVs, and mini-bars.
      </p>
    </div>
  );
}