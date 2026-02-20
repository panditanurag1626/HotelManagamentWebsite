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
      `🎉 Congratulations! Your food booking is confirmed. 🍽️✅
Room ID: ${roomId}
Payment: ${paymentMethod}
`
    );

    if (result) {
      window.location.href = "/";
    }

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
          style={{ border: "1px solid black" }}
        />

        <div className="payment-options">
          <section>Payment Method</section>

          <div
            className={`payment-btn ${paymentMethod === "Cash" ? "selected" : ""
              }`}
            onClick={() => setPaymentMethod("Cash")}
          // style={{border:"1px solid black",color:"black"}}
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