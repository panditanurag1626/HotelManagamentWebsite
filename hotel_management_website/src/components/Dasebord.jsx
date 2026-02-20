import { useEffect, useState } from "react";

export default function UserDashboard() {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [myBookings, setMyBookings] = useState([]);

  useEffect(() => {
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    const filtered = bookings.filter(
      (b) => b.userId === currentUser.id
    );

    setMyBookings(filtered);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Bookings</h2>

      {myBookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        myBookings.map((b) => (
          <div key={b.id} style={{border:"1px solid gray", padding:"10px", margin:"10px 0"}}>
            <h4>{b.hotelName}</h4>
            <p>Room No: {b.roomNumber}</p>
            <p>Price: ₹{b.price}</p>
            <p>Check In: {b.checkIn}</p>
            <p>Check Out: {b.checkOut}</p>
          </div>
        ))
      )}
    </div>
  );
}