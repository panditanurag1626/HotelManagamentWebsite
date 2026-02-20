import React, { useState, useEffect } from "react";
import "./Dining.css";
import { useNavigate } from "react-router-dom";

export default function Order() {
    const navigate = useNavigate(); 
    
    const menu = [
        { id: 1, name: "Burger", price: 200, img: "https://cdn.pixabay.com/photo/2014/10/23/18/05/burger-500054_1280.jpg" },
        { id: 2, name: "Pizza", price: 300, img: "https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1280.jpg" },
        { id: 3, name: "Pasta", price: 150, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2hD2ZL5c7F1QYt1Dmn8v5Hz9RODrNZFrdJA&s" },
        { id: 4, name: "Salad", price: 120, img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c" },
        { id: 5, name: "Manchurian", price: 175, img: "https://orders.popskitchen.in/storage/2024/09/image-167.png" },
        { id: 6, name: "Fried Rice", price: 90, img: "https://images.getrecipekit.com/20220904015448-veg-20fried-20rice.png" }
    ];
        useEffect( () => {
            document.body.classList.add("dining-bg");

            return () => {
                document.body.classList.remove("dining-bg");
            };

        }, []);
    //  LocalStorage cart
    const [cart, setCart] = useState(() => 
        JSON.parse(localStorage.getItem("cart")) || []
    );

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const handleBuyNow = () => {
        if (cart.length === 0) {
            alert("Cart is empty!");
            return;
        }
        alert("🍽️ Food Ordering Book");
        setCart([]);
        navigate("/order");
    };

    const addToCart = (item) => {
        const exist = cart.find((x) => x.id === item.id);
        if (exist) {
            setCart(cart.map((x) => 
                x.id === item.id ? { ...x, qty: x.qty + 1 } : x
            ));
        } else {
            setCart([...cart, { ...item, qty: 1 }]);
        }
    };

    const totalPrice = cart
        .reduce((total, item) => total + item.price * item.qty, 0);

    return (
        <div className="order-container">
            <h1 className="heading">🍽️ Food Ordering System</h1>
            <div className="grid-container">
                
                <div>
                    <h2 className="menu-title">Menu</h2>
                    <div className="menu-grid">
                        {menu.map((item) => (
                            <div key={item.id} className="food-card">
                                <img src={item.img} alt={item.name} className="food-img" />
                                <h3>{item.name}</h3>
                                <p>₹{item.price}</p>
                                <button onClick={() => addToCart(item)} className="add-btn">
                                    Add to Cart
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="cart-box">
                    <h2>Your Order 🛒</h2>

                    {cart.length === 0 ? (
                        <p className="empty-text">Cart is empty</p>
                    ) : (
                        cart.map((item) => (
                            <div key={item.id} className="cart-item">
                                <span>{item.name} x {item.qty}</span>
                                <span>₹{item.price * item.qty}</span>
                            </div>
                        ))
                    )}

                    <h3 className="total">Total: ₹{totalPrice}</h3>

                    {cart.length > 0 && (
                        <>
                            <button className="checkout-btn">Checkout ✅</button>
                            <button onClick={handleBuyNow} className="buy-btn">
                                Buy Now
                            </button>
                        </>
                    )}
                </div>

            </div>
        </div>
    );
}