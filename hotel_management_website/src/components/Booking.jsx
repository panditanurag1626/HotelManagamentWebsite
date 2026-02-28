import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Booking.css";

export default function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    uname: "",
    unum: "",
    uemail: "",
    upass: "",
    ucpass: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    role: "user",
  });

  const [errors, setErrors] = useState({});
  const [isAdminTaken, setIsAdminTaken] = useState(false);
  
  /* Check Admin Exists */
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const adminExists = users.some(u => u.role === "admin");
    setIsAdminTaken(adminExists);
  }, []);

  /* Background Class */
  useEffect(() => {
    document.body.classList.add("booking-page");

    return () => {
      document.body.classList.remove("booking-page");
    };
  }, []);

  /* Validation */
  const validate = () => {

    let err = {};

    if (!formData.uname) err.uname = "Name is required";
    if (!formData.unum) err.unum = "Phone is required";
    if (!formData.uemail) err.uemail = "Email is required";
    if (!formData.upass) err.upass = "Password is required";
    if (!formData.ucpass) err.ucpass = "Confirm password required";

    if (formData.upass !== formData.ucpass) {
      err.ucpass = "Passwords do not match";
    }

    if (!formData.checkIn) err.checkIn = "Check-in required";
    if (!formData.checkOut) err.checkOut = "Check-out required";

    if (formData.checkIn && formData.checkOut &&
      formData.checkOut <= formData.checkIn) {
      err.checkOut = "Invalid checkout date";
    }

    if (formData.guests < 1) err.guests = "Minimum 1 guest required";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  /* Input Change */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  /* Submit */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    /* Only 1 Admin Allowed */
    if (formData.role === "admin" && isAdminTaken) {
      alert("Only one admin allowed ❌");
      return;
    }

    users.push(formData);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration Successful ✅");

    navigate("/login");
  };

  return (
    <div className="container" style={{ maxWidth: "420px", margin: "40px auto" }}>

      <h2 style={{ textAlign: "center" }}>Register 👤</h2>

      <form onSubmit={handleSubmit}>

        <label>Name</label>
        <input
          type="text"
          name="uname"
          value={formData.uname}
          onChange={handleChange}
        />
        {errors.uname && <p className="text-danger">{errors.uname}</p>}

        <label>Phone</label>
        <input
          type="text"
          name="unum"
          value={formData.unum}
          onChange={handleChange}
        />
        {errors.unum && <p className="text-danger">{errors.unum}</p>}

        <label>Email</label>
        <input
          type="email"
          name="uemail"
          value={formData.uemail}
          onChange={handleChange}
        />
        {errors.uemail && <p className="text-danger">{errors.uemail}</p>}

        <label>Password</label>
        <input
          type="password"
          name="upass"
          value={formData.upass}
          onChange={handleChange}
        />
        {errors.upass && <p className="text-danger">{errors.upass}</p>}

        <label>Confirm Password</label>
        <input
          type="password"
          name="ucpass"
          value={formData.ucpass}
          onChange={handleChange}
        />
        {errors.ucpass && <p className="text-danger">{errors.ucpass}</p>}

        <label>Check In</label>
        <input
          type="date"
          name="checkIn"
          value={formData.checkIn}
          onChange={handleChange}
        />
        {errors.checkIn && <p className="text-danger">{errors.checkIn}</p>}

        <label>Check Out</label>
        <input
          type="date"
          name="checkOut"
          value={formData.checkOut}
          onChange={handleChange}
        />
        {errors.checkOut && <p className="text-danger">{errors.checkOut}</p>}

        <label>Guests</label>
        <input
          type="number"
          name="guests"
          min="1"
          value={formData.guests}
          onChange={handleChange}
        />
        {errors.guests && <p className="text-danger">{errors.guests}</p>}

        <label>Role</label>

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          style={{ background: "transparent" }}
        >
          <option value="user">User</option>
          {!isAdminTaken && <option value="admin">Admin</option>}
        </select>

        <button
          type="submit"
          style={{ width: "100%", marginTop: "15px" }}
        >
          Register
        </button>

      </form>

    </div>
  );
} 