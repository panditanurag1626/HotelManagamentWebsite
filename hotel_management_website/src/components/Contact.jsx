import { useState } from "react";
import "./Contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useState(() => {
    document.body.classList.add("contact-bg");
    return () => {
      document.body.classList.remove("contact-bg");
    };
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSuccess(true);
    setFormData({ name: "", email: "", phone: "", message: "" });
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="contact-container contact-bg">
      <h1 className="contact-title">Contact Us</h1>
      <p className="contact-subtitle">
        Get in touch for bookings, queries or support
      </p>

      <div className="contact-wrapper">
        {/* Contact Info */}
        <div className="contact-info">
          <h3>Hotel Management Office</h3>
          <p>📍 Address: Ashwan Mishran, Rampur, Jaunpur, Uttar Pradesh</p>
          <a href="tel:+919026067073" className="call-btn">
          📞 Call Us: +91 9026067073
          </a>
          <p>✉️ Email: anurag56@gmail.com</p>
          <p>⏰ Working Hours: 24 x 7</p>

          {/* WhatsApp Link */}
          <a
            href="https://wa.me/9026067073"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-btn"
          >
            Chat on WhatsApp
          </a>

          {/* Map */}
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14410.258582820274!2d82.5153103123822!3d25.452814590753913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398fe036ec35af75%3A0x434a8f95fb599750!2sAsawan%2C%20Uttar%20Pradesh%20222203!5e0!3m2!1sen!2sin!4v1758253469381!5m2!1sen!2sin"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Contact Form */}
        <form className="contact-form" onSubmit={handleSubmit}>
          {success && (
            <div className="success-message">Message sent successfully ✅</div>
          )}

          <input
            type="text"
            placeholder="Your Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            placeholder="Your Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <textarea
            placeholder="Your Message"
            spellCheck="false"
            name="message"
            className="mass"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            required
          ></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
}