import React, { useEffect, useState } from "react";
import "./Edit.css";

export default function Edit() {

 
  const [hotels, setHotels] = useState([
    {
      "id": "1",
      "roomnumber": "101",
      "name": "City Palace Hotel",
      "location": "Delhi",
      "photo": "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
      "roomType": "Deluxe",
      "price": 2500,
      "available": true
    },
    {
      "id": "2",
      "roomnumber": "102",
      "name": "Ocean Pearl Resort",
      "location": "Goa",
      "photo": "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
      "roomType": "Sea View",
      "price": 5200,
      "available": true
    },
    {
      "id": "3",
      "roomnumber": "103",
      "name": "Royal Heritage Inn",
      "location": "Jaipur",
      "photo": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      "roomType": "Suite",
      "price": 3800,
      "available": true
    },
    {
      "id": "4",
      "roomnumber": "104",
      "name": "Mountain View Hotel",
      "location": "Manali",
      "photo": "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80",
      "roomType": "Premium",
      "price": 3200,
      "available": true
    },
    {
      "id": "5",
      "roomnumber": "105",
      "name": "Lake Side Resort",
      "location": "Udaipur",
      "photo": "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
      "roomType": "Deluxe",
      "price": 4100,
      "available": true
    },
    {
      "id": "6",
      "roomnumber": "106",
      "name": "Business Class Hotel",
      "location": "Mumbai",
      "photo": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
      "roomType": "Executive",
      "price": 5000,
      "available": true
    },
    {
      "id": "7",
      "roomnumber": "107",
      "name": "Legacy Grand Hotel",
      "location": "Chennai",
      "photo": "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80",
      "roomType": "Standard",
      "price": 2800,
      "available": true
    },
    {
      "id": "8",
      "roomnumber": "108",
      "name": "Skyline Business Hotel",
      "location": "Bangalore",
      "photo": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
      "roomType": "Executive",
      "price": 4600,
      "available": true
    },
    {
      "id": "9",
      "roomnumber": "109",
      "name": "Hillside Nature Resort",
      "location": "Mussoorie",
      "photo": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      "roomType": "Mountain View",
      "price": 3900,
      "available": true
    },
    {
      "id": "10",
      "roomnumber": "110",
      "name": "Desert Rose Resort",
      "location": "Jaisalmer",
      "photo": "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80",
      "roomType": "Luxury Tent",
      "price": 4500,
      "available": true
    },
    {
      "id": "11",
      "roomnumber": "111",
      "name": "Green Valley Retreat",
      "location": "Wayanad",
      "photo": "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
      "roomType": "Cottage",
      "price": 3600,
      "available": true
    },
    {
      "id": "12",
      "roomnumber": "112",
      "name": "Snow Peak Lodge",
      "location": "Gulmarg",
      "photo": "https://images.unsplash.com/photo-1472224371017-08207f84aaae?auto=format&fit=crop&w=800&q=80",
      "roomType": "Luxury",
      "price": 6200,
      "available": true
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

  useEffect(()=>{
    document.body.classList.add("edit-bg")
    return (() => {
      document.body.classList.remove("edit-bg")
    })
  },[])
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