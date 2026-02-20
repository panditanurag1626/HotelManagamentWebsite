import React, { useEffect, useState } from "react";
import "./Edit.css";

export default function Edit() {

  const [hotels, setHotels] = useState([]);
  const [form, setForm] = useState({
    id: "",
    roomnumber: "",
    name: "",
    location: "",
    photo: "",
    roomType: "",
    price: "",
    available: true
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchHotels();
  }, []);

  useEffect(() => {
    document.body.classList.add("edit-bg");
    return () => document.body.classList.remove("edit-bg");
  }, []);

  const fetchHotels = async () => {
    try {
      const res = await fetch("http://localhost:5000/hotels");
      const data = await res.json();
      setHotels(data);
    } catch (error) {
      console.log("Error fetching hotels:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleEdit = (hotel) => {
    setForm({
      id: hotel.id,
      roomnumber: hotel.roomnumber,
      name: hotel.name,
      location: hotel.location,
      photo: hotel.photo,
      roomType: hotel.roomType,
      price: hotel.price,
      available: hotel.available ?? true
    });

    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        await fetch(`http://localhost:5000/hotels/${form.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form)
        });
        alert("Hotel Updated ✅");
      } else {

        // Remove id when adding new
        const { id, ...hotelData } = form;

        await fetch("http://localhost:5000/hotels", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(hotelData)
        });
        alert("Hotel Added ✅");
      }

      resetForm();
      fetchHotels();

    } catch (error) {
      console.log("Error saving hotel:", error);
    }
  };

  const resetForm = () => {
    setForm({
      id: "",
      roomnumber: "",
      name: "",
      location: "",
      photo: "",
      roomType: "",
      price: "",
      available: true
    });
    setIsEditing(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await fetch(`http://localhost:5000/hotels/${id}`, {
        method: "DELETE"
      });
      fetchHotels();
    }
  };

  return (
    <div className="page-container">

      <h2>{isEditing ? "Edit Hotel" : "Add Hotel"}</h2>

      <div className="form-box">
        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="roomnumber"
            value={form.roomnumber}
            onChange={handleChange}
            placeholder="Room Number"
            required
          />

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Hotel Name"
            required
          />

          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            required
          />

          <input
            type="text"
            name="photo"
            value={form.photo}
            onChange={handleChange}
            placeholder="Photo URL"
            required
          />

          <input
            type="text"
            name="roomType"
            value={form.roomType}
            onChange={handleChange}
            placeholder="Room Type"
            required
          />

          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            required
          />

          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                name="available"
                checked={form.available}
                onChange={handleChange}
                style={{ transform: "scale(1.4)", marginRight: "8px" }}
              />
              Available
            </label>
          </div>

          <button type="submit">
            {isEditing ? "Update Hotel" : "Add Hotel"}
          </button>

          {isEditing && (
            <button
              type="button"
              onClick={resetForm}
              className="cancel-btn"
            >
              Cancel
            </button>
          )}

        </form>
      </div>

      <hr />

      <h2>Hotel List</h2>

      <div className="hotel-list">
        {hotels.map((h) => (
          <div key={h.id} className="hotel-card">

            <img src={h.photo} alt={h.name} />

            <h3>{h.name}</h3>
            <p><strong>Room:</strong> {h.roomnumber}</p>
            <p><strong>Location:</strong> {h.location}</p>
            <p><strong>Type:</strong> {h.roomType}</p>
            <p><strong>Price:</strong> ₹{h.price}</p>
            <p>
              <strong>Status:</strong>{" "}
              {h.available ? "Available" : "Booked"}
            </p>

            <div className="card-buttons">
              <button
                className="edit-btn"
                onClick={() => handleEdit(h)}
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => handleDelete(h.id)}
              >
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}