import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [uemail, setUemail] = useState("");
  const [upass, setUpass] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    document.body.classList.add("login-bg");
    return () => {
      document.body.classList.remove("login-bg");
    };
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!uemail || !upass) {
      setError("All fields are required");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.uemail === uemail && u.upass === upass
    );

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));

      window.dispatchEvent(new Event("userLogin"));

      alert("🔐 Login completed successfully");

      navigate("/Hotel");
    } else {
      setError("Invalid Email or Password");
    }
  };

  return (
    <div className="login-bg p-0">
      <div className="login-wrapper">
        <div className="login-card">
          <h2>Login 👤</h2>

          {error && <p className="text-danger">{error}</p>}

          <form onSubmit={handleLogin}>
            <div className="input-box">
              <label>Email</label>
              <input
                type="email"
                value={uemail}
                autoComplete="username"
                onChange={(e) => setUemail(e.target.value)}
              />
            </div>

            <div className="input-box">
              <label>Password</label>
              <input
                type="password"
                value={upass}
                autoComplete="current-password"
                onChange={(e) => setUpass(e.target.value)}
              />
            </div>

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>

          <div className="register-link">
            Don’t have an account?{" "}
            <Link
              to="/booking"
              style={{
                color: "black",
                borderBottom: "2px solid white",
              }}
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}