import { useEffect, useState } from "react";
import "./Base.css";
import { NavLink, useNavigate, Outlet } from "react-router-dom";

export default function Base() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState(() => {
    return JSON.parse(localStorage.getItem("currentUser") || "null");
  });

  const handlelogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    navigate("/");
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setCurrentUser(
        JSON.parse(localStorage.getItem("currentUser") || "null")
      );
    };

    window.addEventListener("userLogin", handleStorageChange);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("userLogin", handleStorageChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <>
      <nav className="navbar">
        <header className="logo">
          <img src="/hotel1.png" alt="Hotel Logo" />
        </header>

        {!currentUser && (
          <div
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✖" : "☰"}
          </div>
        )}

        <div className={`nav-links ${menuOpen ? "show" : ""}`}>
          {!currentUser && (
            <>
              <NavLink to="/" className="navlink" onClick={closeMenu}>Home</NavLink>
              <NavLink to="/about" className="navlink" onClick={closeMenu}>About</NavLink>
              <NavLink to="/hotel" className="navlink" onClick={closeMenu}>Hotel</NavLink>
              <NavLink to="/booking" className="navlink" onClick={closeMenu}>Booking</NavLink>
              <NavLink to="/login" className="navlink" onClick={closeMenu}>Login</NavLink>
              <NavLink to="/contact" className="navlink" onClick={closeMenu}>Contact.US</NavLink>
            </>
          )}
        </div>

        {currentUser && (
          <div className="user-section">
            <h3>
              👋 Welcome, {currentUser.role === "admin"
                ? `Admin ${currentUser.uname}`
                : currentUser.uname}
            </h3>
            <button onClick={handlelogout} className="out">🚪 Logout</button>
          </div>
        )}
      </nav>

      <Outlet />

      <footer className="footer">
        © {new Date().getFullYear()} Hotel Management App. All Rights Reserved. Developed by Anurag Pandit.
      </footer>
    </>
  );
}