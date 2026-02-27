import React, { useEffect, useState } from "react";
import "./Edit.css";

const API_URL = "https://hotel-backend.onrender.com/hotels";

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
  const [loading, setLoading] = useState(false);

  const fetchHotels = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch hotels");
      const data = await res.json();
      setHotels(data);
    } catch (error) {
      console.log("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  useEffect(() => {
    document.body.classList.add("edit-bg");
    return () => document.body.classList.remove("edit-bg");
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleEdit = (hotel) => {
    setForm({
      ...hotel,
      available: hotel.available ?? true
    });

    setIsEditing(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (isEditing) {

        await fetch(`${API_URL}/${form.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form)
        });

        alert("Hotel Updated ✅");

      } else {

        const { id, ...newHotel } = form;

        await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newHotel)
        });

        alert("Hotel Added ✅");
      }

      resetForm();
      fetchHotels();

    } catch (error) {
      console.log("Submit Error:", error);
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

    if (!window.confirm("Are you sure want to delete?")) return;

    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });

      fetchHotels();

    } catch (error) {
      console.log("Delete Error:", error);
    }
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
                src={h.photo}
                alt={h.name}
                onError={(e) =>
                  (e.target.src =
                    "https://via.placeholder.com/300x200?text=No+Image")
                }
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