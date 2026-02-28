import { useLocation, useNavigate } from "react-router-dom";
import "./ConfirmBooking.css";

export default function ConfirmBooking() {

  const location = useLocation();
  const navigate = useNavigate();

  const hotel = location.state?.hotel;
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const handleConfirm = () => {

    if (!user || !hotel) return;

    /* Save Booking */
    const bookings =
      JSON.parse(localStorage.getItem("bookings")) || [];

    bookings.push({
      user: user.username,
      hotel: hotel,
      date: new Date().toLocaleString()
    });

    localStorage.setItem("bookings", JSON.stringify(bookings));

    const hotelOwnerNumber = "9026067073";

    const message = `
🔥 New Booking Alert

👤 Name : ${user.username}
🏨 Hotel : ${hotel.name}
🚪 Room No : ${hotel.roomnumber}
💰 Price : ₹${hotel.price}

✅ Room Booked Successfully
`;

    const whatsappURL =
      `https://wa.me/${hotelOwnerNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank");

    alert("Booking Confirmed ✅");

    navigate("/mybooking");
  };

  if (!hotel) {
    return <h2 style={{ textAlign: "center" }}>
      No Booking Data Found ❌
    </h2>;
  }

  return (
    <div className="booking-container">

      <div className="booking-card">

        <h2>Confirm Booking</h2>

        <img src={hotel.photo} alt={hotel.name} />

        <h3>{hotel.name}</h3>

        <p>Room : {hotel.roomnumber}</p>
        <p>Location : {hotel.location}</p>
        <p>Price : ₹{hotel.price}</p>

        <button onClick={handleConfirm}>
          Confirm Booking ✅
        </button>

      </div>

    </div>
  );
}