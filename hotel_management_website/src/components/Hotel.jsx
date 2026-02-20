import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Hotel.css";

export default function Hotel() {

  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  // Background class
  useEffect(() => {
    document.body.classList.add("hotel-bg");
    return () => {
      document.body.classList.remove("hotel-bg");
    };
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
  const isAdmin = currentUser?.role === "admin";


  useEffect(() => {
    async function fetchHotels() {
      try {
        const response = await fetch("/db.json");
        const data = await response.json();

        // Agar structure { hotels: [...] } hai
        if (data.hotels) {
          setHotels(data.hotels);
        } else {
          setHotels(data);
        }

      } catch (error) {
        console.error("Error fetching hotels:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchHotels();
  }, []);

  return (
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
                  onError={(e) => (e.target.src = "")}
                />

                <div className="card-body">
                  <h5 className="card-title">{h.name}</h5>

                  <p>
                    <strong style={{ color: "red" }}>
                      Room Number:
                    </strong> {h.roomnumber}
                  </p>

                  <p>
                    <strong>Location:</strong> {h.location}
                  </p>

                  <p>
                    <strong>Room:</strong> {h.roomType}
                  </p>

                  <p>
                    <strong>Price:</strong> ₹{h.price} / night
                  </p>

                  <p
                    style={{
                      color: h.available ? "green" : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {h.available ? "Available" : "Booked"}
                  </p>

                  {isAdmin ? (
                    <Link to="/edit" className="edit-btn">
                      Edit
                    </Link>
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
  );
}