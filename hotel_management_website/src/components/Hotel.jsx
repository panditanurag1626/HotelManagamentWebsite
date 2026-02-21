import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Hotel.css";

export default function Hotel() {

  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
  const isAdmin = currentUser?.role === "admin";

  // Background
  useEffect(() => {
    document.body.classList.add("hotel-bg");
    return () => {
      document.body.classList.remove("hotel-bg");
    };
  }, []);

  // 🔥 Production Safe Fetch
  useEffect(() => {
    async function loadHotels() {
      try {
        const res = await fetch("/db.json"); // public folder se
        if (!res.ok) {
          throw new Error("Failed to fetch db.json");
        }
        const data = await res.json();
        setHotels(data.hotels || []);
      } catch (err) {
        console.error("Error:", err);
        setHotels([]);
      } finally {
        setLoading(false);
      }
    }

    loadHotels();
  }, []);

  return (
    <div className="cont" style={{ padding: "20px" }}>
      {loading ? (
        <p style={{ textAlign: "center" }}>Loading Hotels...</p>
      ) : hotels.length === 0 ? (
        <p style={{ textAlign: "center", color: "red" }}>
          No Hotels Available...
        </p>
      ) : (
        <div className="row">
          {hotels.map((h) => (
            <div key={h.id} className="col-md-4 mt-3">
              <div className="card h-100 shadow">
                <img
                  src={h.photo}
                  alt={h.name}
                  className="card-img-top"
                  height="180"
                  style={{ objectFit: "cover" }}
                  onError={(e) => (e.target.src = "")}
                />

                <div className="card-body">
                  <h5 className="card-title">{h.name}</h5>

                  <p>
                    <strong style={{ color: "red" }}>
                      Room Number:
                    </strong> {h.roomnumber}
                  </p>

                  <p><strong>Location:</strong> {h.location}</p>
                  <p><strong>Room:</strong> {h.roomType}</p>
                  <p><strong>Price:</strong> ₹{h.price} / night</p>

                  <p
                    style={{
                      color: h.available ? "green" : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {h.available ? "Available" : "Booked"}
                  </p>

                  {isAdmin ? (
                    <Link to="/edit" className="btn btn-warning w-100">
                      Edit
                    </Link>
                  ) : (
                    <NavLink
                      to={currentUser ? "/booking" : "/login"}
                      state={{ hotel: h }}
                      className="btn btn-primary w-100"
                    >
                      🏨 Reserve Now
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