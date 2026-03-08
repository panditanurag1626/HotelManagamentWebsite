import React, { useEffect, useState } from "react";
import "./Order.css";

export default function PaymentForm() {

  const [roomId, setRoomId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cart, setCart] = useState([]);

  useEffect(() => {

    document.body.classList.add("order-bg");

    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);

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

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const username = currentUser?.username || "Guest";
    const phone = currentUser?.phone || "Not Provided";

    const orderItems = cart
      .map((item) => `${item.name} x ${item.qty}`)
      .join("\n");

    const totalPrice = cart.reduce(
      (total, item) => total + item.price * item.qty,
      0
    );

    const message = `
🍔 New Food Order Alert 🍔

👤 Name : ${username}
📞 Phone : ${phone}

🛏 Room ID : ${roomId}

🛒 Order Items
${orderItems}

💰 Total : ₹${totalPrice}

💳 Payment : ${paymentMethod}

✅ Payment Confirmed
`;

    const encodedMessage = encodeURIComponent(message);

    const whatsappNumber = "9026067073";

    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappURL, "_blank");

    localStorage.removeItem("cart");

    setRoomId("");
    setPaymentMethod("");
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  return (

    <div className="form-container">

      <form className="payment-form" onSubmit={handleSubmit}>

        <h2>🍔 Food Booking Payment</h2>

        <h3>Your Order</h3>

        {cart.map((item) => (
          <p key={item.id}>
            {item.name} x {item.qty}
          </p>
        ))}

        <h4>Total : ₹{totalPrice}</h4>

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