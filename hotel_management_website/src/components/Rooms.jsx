import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Hotel.css";

const hotelData = {
  hotels: [
    {
      id: "1",
      roomnumber: "101",
      name: "City Palace Hotel",
      location: "Delhi",
      photo:
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
      roomType: "Deluxe",
      price: 2500,
      available: true,
    },
    {
      id: "2",
      roomnumber: "102",
      name: "Ocean Pearl Resort",
      location: "Goa",
      photo:
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
      roomType: "Sea View",
      price: 5200,
      available: true,
    },
    {
      id: "3",
      roomnumber: "103",
      name: "Royal Heritage Inn",
      location: "Jaipur",
      photo:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      roomType: "Suite",
      price: 3800,
      available: true,
    },
    {
      id: "4",
      roomnumber: "104",
      name: "Mountain View Hotel",
      location: "Manali",
      photo:
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80",
      roomType: "Premium",
      price: 3200,
      available: true,
    },
    {
      id: "5",
      roomnumber: "105",
      name: "Lake Side Resort",
      location: "Udaipur",
      photo:
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
      roomType: "Deluxe",
      price: 4100,
      available: true,
    },
    {
      id: "6",
      roomnumber: "106",
      name: "Business Class Hotel",
      location: "Mumbai",
      photo:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
      roomType: "Executive",
      price: 5000,
      available: true,
    },
    {
      id: "7",
      roomnumber: "107",
      name: "Legacy Grand Hotel",
      location: "Chennai",
      photo:
        "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80",
      roomType: "Standard",
      price: 2800,
      available: true,
    },
    {
      id: "8",
      roomnumber: "108",
      name: "Skyline Business Hotel",
      location: "Bangalore",
      photo:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
      roomType: "Executive",
      price: 4600,
      available: true,
    },
    {
      id: "9",
      roomnumber: "109",
      name: "Hillside Nature Resort",
      location: "Mussoorie",
      photo:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      roomType: "Mountain View",
      price: 3900,
      available: true,
    },
    {
      id: "10",
      roomnumber: "110",
      name: "Desert Rose Resort",
      location: "Jaisalmer",
      photo:
        "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80",
      roomType: "Luxury Tent",
      price: 4500,
      available: true,
    },
    {
      id: "11",
      roomnumber: "111",
      name: "Green Valley Retreat",
      location: "Wayanad",
      photo:
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
      roomType: "Cottage",
      price: 3600,
      available: true,
    },
    {
      id: "12",
      roomnumber: "112",
      name: "Snow Peak Lodge",
      location: "Gulmarg",
      photo:
        "https://images.unsplash.com/photo-1472224371017-08207f84aaae?auto=format&fit=crop&w=800&q=80",
      roomType: "Luxury",
      price: 6200,
      available: true,
    },
  ],
};


export default function Hotel() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API delay (optional)
    setTimeout(() => {
      setHotels(hotelData.hotels);
      setLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    document.body.classList.add("hotel-bg");
    return () => document.body.classList.remove("hotel-bg");
  }, []);

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") || "null"
  );

  const isAdmin = currentUser?.role === "admin";

  return (
    <div className="cont" style={{ padding: "20px" }}>
      {loading ? (
        <p style={{ textAlign: "center" }}>Loading Hotels...</p>
      ) : hotels.length === 0 ? (
        <p style={{ textAlign: "center", color: "red" }}>
          No Hotels Available
        </p>
      ) : (
        <div className="row">
          {hotels.map((h) => (
            <div key={h.id} className="col-md-4 mt-3">
              <div className="card h-100 shadow">

                {/* Image */}
                <img
                  src={h.photo}
                  alt={h.name}
                  className="card-img-top"
                  height="180"
                  style={{ objectFit: "cover" }}
                  onError={(e) =>
                    (e.target.src =
                      "https://via.placeholder.com/400x200?text=No+Image")
                  }
                />

                <div className="card-body">
                  <h5 className="card-title">{h.name}</h5>

                  <p>
                    <strong style={{ color: "red" }}>
                      Room Number:
                    </strong>{" "}
                    {h.roomnumber}
                  </p>

                  <p>
                    <strong>Location:</strong> {h.location}
                  </p>

                  <p>
                    <strong>Room Type:</strong> {h.roomType}
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
                    <Link to="/edit" className="btn btn-warning w-100">
                      Edit Room
                    </Link>
                  ) : (
                    <NavLink
                      to={currentUser ? "/booking" : "/login"}
                      state={{ hotel: h }}
                      className="btn btn-primary w-100"
                    >
                      ✨ Book This Room
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