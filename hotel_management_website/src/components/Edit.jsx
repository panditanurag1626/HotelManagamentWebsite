import React, { useEffect, useState } from "react";
import "./Edit.css";

export default function Edit() {

 
  const [hotels, setHotels] = useState([
    {
      id: 1,
      roomnumber: "101",
      name: "Hotel Taj",
      location: "Mumbai",
      photo: "https://via.placeholder.com/300x200",
      roomType: "Deluxe",
      price: 3000,
      available: true
    },
    {
      id: 2,
      roomnumber: "102",
      name: "Hotel Oberoi",
      location: "Delhi",
      photo: "https://via.placeholder.com/300x200",
      roomType: "Standard",
      price: 2000,
      available: false
    }
  ]);

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
  const [loading] = useState(false);

  // Input Change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // Edit Hotel
  const handleEdit = (hotel) => {
    setForm(hotel);
    setIsEditing(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // Submit Form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {

      // Update Hotel
      setHotels(prev =>
        prev.map(h =>
          h.id === form.id ? form : h
        )
      );

      alert("Hotel Updated ✅");

    } else {

      // Add Hotel
      setHotels(prev => [
        ...prev,
        { ...form, id: Date.now() }
      ]);

      alert("Hotel Added ✅");
    }

    resetForm();
  };

  // Reset Form
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

  // Delete Hotel
  const handleDelete = (id) => {

    if (!window.confirm("Are you sure want to delete?")) return;

    setHotels(prev => prev.filter(h => h.id !== id));
  };

  return (
    <div className="page-container">

      <h2>{isEditing ? "Edit Hotel" : "Add Hotel"}</h2>

      <div className="form-box">
        <form onSubmit={handleSubmit}>

          <input
            name="roomnumber"
            value={form.roomnumber}
            onChange={handleChange}
            placeholder="Room Number"
            required
          />

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Hotel Name"
            required
          />

          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            required
          />

          <input
            name="photo"
            value={form.photo}
            onChange={handleChange}
            placeholder="Photo URL"
            required
          />

          <input
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

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="hotel-list">

          {hotels.map((h) => (
            <div key={h.id} className="hotel-card">

              <img
                src={h.photo || "https://via.placeholder.com/300x200?text=No+Image"}
                alt={h.name}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
                }}
              />

              <h3>{h.name}</h3>

              <p><strong>Room:</strong> {h.roomnumber}</p>
              <p><strong>Location:</strong> {h.location}</p>
              <p><strong>Type:</strong> {h.roomType}</p>
              <p><strong>Price:</strong> ₹{h.price}</p>

              <p style={{ color: h.available ? "green" : "red" }}>
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
      )}

    </div>
  );
}