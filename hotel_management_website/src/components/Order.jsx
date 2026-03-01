import React, { useEffect, useState } from "react";
import "./Order.css";

export default function PaymentForm() {

  const [roomId, setRoomId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    document.body.classList.add("order-bg");
    return () => {
      document.body.classList.remove("order-bg");
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!roomId || !paymentMethod) {
      alert("Please fill all details!");
      return;
    }

    const result = window.confirm(
      `🎉 Confirm Food Booking?
Room ID: ${roomId}
Payment: ${paymentMethod}`
    );

    if (!result) return;

  
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const username = currentUser?.username || "Guest";
    const phone = currentUser?.phone || "Not Provided";

    const message = `
🍔 New Food Order Alert 🍔

👤 Name : ${username}
📞 Phone : ${phone}
🛏 Room ID : ${roomId}
💳 Payment : ${paymentMethod}

✅ Payment Confirmed
`;

    const encodedMessage = encodeURIComponent(message);

    const whatsappNumber = "9026067073"; 
   

    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappURL, "_blank");

    setRoomId("");
    setPaymentMethod("");
  };

  return (
    <div className="form-container">
      <form className="payment-form" onSubmit={handleSubmit}>

        <h2>🍔 Food Booking Payment</h2>

        <label>Room ID</label>
        <input
          type="text"
          placeholder="Enter Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />

        <div className="payment-options">
          <section>Payment Method</section>

          <div
            className={`payment-btn ${paymentMethod === "Cash" ? "selected" : ""}`}
            onClick={() => setPaymentMethod("Cash")}
          >
            Cash
          </div>
        </div>

        <button type="submit" className="pay-btn">
          Confirm Payment 💳
        </button>

      </form>
    </div>
  );
}