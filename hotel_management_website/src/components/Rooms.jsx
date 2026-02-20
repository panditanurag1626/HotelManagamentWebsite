import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Rooms.css";

export default function Hotel() {
 
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
  const isAdmin = currentUser?.role === "admin";

  useEffect(() => {
    async function fetchHotels() {
      try {
        const response = await fetch("http://localhost:5000/hotels");
        const data = await response.json();
        setHotels(data.hotels ? data.hotels : data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchHotels();
  }, []);

  useEffect (() => {
    document.body.classList.add("room-bg")
    return () => {
      document.body.classList.remove("room-bg")
    }
  })
  return (
    <>
    <div className="cont" style={{ padding: "20px" }}>
        {loading ? (
          <p style={{ textAlign: "center" }}>Loading Hotels...</p>
        ) : hotels.length === 0 ? (
          <p style={{ textAlign: "center" }}>No Hotels Available...</p>
        ) : (
          <div className="row">
            {hotels.map((h) => (
              <div key={h.id} className="col-md-4 mt-3">
                <div className="card h-100">
                  <img
                    src={h.photo}
                    alt={h.name}
                    className="card-img-top"
                    height="160"
                    onError={(e) =>
                      (e.target.src =
                        "https://via.placeholder.com/300x200")
                    }
                  />

                  <div className="card-body">
                    <h5 className="card-title">{h.name}</h5>
                    <p className="card-text">
                      <strong style={{color:"red"}}>Room Number:</strong> {h.roomnumber}
                    </p>
                    <p className="card-text">
                      <strong>Location:</strong> {h.location}
                    </p>
                    <p className="card-text">
                      <strong>Room:</strong> {h.roomType}
                    </p>
                    <p className="card-text">
                      <strong>Price:</strong> ₹{h.price} / night
                    </p>
                    <p
                      className="card-text"
                      style={{
                        color: h.available ? "green" : "red",
                        fontWeight: "bold",
                      }}
                    >
                      {h.available ? "Available" : "Booked"}
                    </p>

                    {/*  FIXED PART */}
                    {isAdmin ? (
                      <>
                        <Link to="" className="edit-btn">Edit</Link>
                        <Link to="" className="delete-btn">Delete</Link>
                      </>
                    ) : (
                      <NavLink
                        to={currentUser ? "/booking" : "/login"}
                        state={{ hotel: h }}
                        className="btn btn-primary w-100"
                      >
                        Book Room
                      </NavLink>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}