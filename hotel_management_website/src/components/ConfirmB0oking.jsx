import { useLocation, useNavigate } from "react-router-dom";
import "./ConfirmBooking.css";
import { useEffect } from "react";

export default function ConfirmBooking() {

  const location = useLocation();
  const navigate = useNavigate();

  const hotel = location.state?.hotel;

  const user =
    JSON.parse(localStorage.getItem("currentUser")) || {
      username: "Guest",
      phone: "N/A"
    };

  const handleConfirm = () => {

    if (!hotel) {
      alert("Booking data not found ❌");
      return;
    }

    /* Save Booking */
    const bookings =
      JSON.parse(localStorage.getItem("bookings")) || [];

    bookings.push({
      user: user.username,
      phone: user.phone,
      hotel: hotel,
      date: new Date().toLocaleString()
    });

    localStorage.setItem("bookings", JSON.stringify(bookings));

    /* WhatsApp Notification */
    const ownerNumber = "9026067073"; 

    const message = `
🔥 New Booking Alert

👤 Name : ${user.username}
📞 Phone : ${user.phone}

🏨 Hotel : ${hotel.name}
🚪 Room No : ${hotel.roomnumber}
📍 Location : ${hotel.location}
💰 Price : ₹${hotel.price}

✅ Booking Confirmed
`;

    const whatsappURL =
      `https://wa.me/${ownerNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank");

    alert("Booking Confirmed ✅");

    navigate("/mybooking");
  };

  if (!hotel) {
    return (
      <h2 style={{ textAlign: "center", padding: "40px" }}>
        No Booking Data Found ❌
      </h2>
    );
  }
  useEffect(() => {
    document.body.classList.add("confo-bg")
    return(() => {
      document.body.classList.remove("confo-bg")
    })
  })
  return (
    <div className="booking-container">

      <div className="booking-card">

        <h2>Confirm Booking</h2>

        <img src={hotel.photo} alt={hotel.name} />

        <h3>👤 {user.username}</h3>

        <p>🏨 Hotel : {hotel.name}</p>
        <p>🚪 Room : {hotel.roomnumber}</p>
        <p>📍 Location : {hotel.location}</p>
        <p>💰 Price : ₹{hotel.price}</p>

        <button onClick={handleConfirm}>
          Confirm Booking ✅
        </button>

      </div>

    </div>
  );
}