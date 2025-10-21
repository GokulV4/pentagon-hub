import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      details: ["123 Skating Lane", "Downtown District", "City, State 12345"],
    },
    {
      icon: Phone,
      title: "Phone",
      details: ["(555) 123-4567", "(555) 123-4568"],
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@pentagon.com", "support@pentagon.com"],
    },
    {
      icon: Clock,
      title: "Hours",
      details: ["Mon-Fri: 9:00 AM - 10:00 PM", "Sat-Sun: 8:00 AM - 11:00 PM"],
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily: "Inter, sans-serif",
        background: "radial-gradient(circle at top, #0f0c29, #302b63, #24243e)",
        color: "white",
      }}
    >
      {/* Hero Section */}
      <section
        style={{
          padding: "120px 20px 80px",
          textAlign: "center",
          background:
            "linear-gradient(135deg, rgba(102,126,234,0.1) 0%, rgba(118,75,162,0.15) 100%)",
          backdropFilter: "blur(10px)",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(2.5rem, 7vw, 4rem)",
            fontWeight: 800,
            marginBottom: "24px",
            background:
              "linear-gradient(135deg, #8a5cf5 0%, #00e5ff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 0 30px rgba(118,75,162,0.5)",
          }}
        >
          Contact Us
        </h1>
        <p
          style={{
            fontSize: "1.2rem",
            maxWidth: "700px",
            margin: "0 auto",
            opacity: 0.9,
            lineHeight: 1.6,
          }}
        >
          Have questions or ideas? We’d love to hear from you. Connect with our
          futuristic team today.
        </p>
      </section>

      {/* Contact Info */}
      <section
        style={{
          padding: "80px 20px",
          display: "grid",
          gap: "32px",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {contactInfo.map((info, i) => (
          <div
            key={i}
            style={{
              background: "rgba(255, 255, 255, 0.08)",
              borderRadius: "20px",
              padding: "40px 20px",
              textAlign: "center",
              border: "1px solid rgba(255,255,255,0.15)",
              boxShadow: "0 0 25px rgba(118,75,162,0.3)",
              transition: "all 0.4s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow =
                "0 0 40px rgba(102,126,234,0.7)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 0 25px rgba(118,75,162,0.3)";
            }}
          >
            <div
              style={{
                width: "60px",
                height: "60px",
                margin: "0 auto 20px",
                borderRadius: "50%",
                background:
                  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
              }}
            >
              <info.icon size={26} />
            </div>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 700 }}>
              {info.title}
            </h3>
            {info.details.map((d, j) => (
              <p
                key={j}
                style={{
                  color: "#cbd5e1",
                  fontSize: "0.95rem",
                  margin: "4px 0",
                }}
              >
                {d}
              </p>
            ))}
          </div>
        ))}
      </section>

      {/* Contact Form */}
      <section style={{ padding: "100px 20px", maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "60px",
          }}
        >
          {/* Form */}
          <div
            style={{
              background: "rgba(255,255,255,0.07)",
              borderRadius: "20px",
              padding: "40px",
              border: "1px solid rgba(255,255,255,0.2)",
              boxShadow: "0 0 25px rgba(118,75,162,0.4)",
              backdropFilter: "blur(15px)",
            }}
          >
            <h2
              style={{
                fontSize: "clamp(2rem, 6vw, 2.5rem)",
                fontWeight: "800",
                marginBottom: "24px",
                background:
                  "linear-gradient(135deg, #8a5cf5 0%, #00e5ff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Send us a Message
            </h2>

            <form onSubmit={handleSubmit}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "20px",
                  marginBottom: "20px",
                }}
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name *"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email *"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "20px",
                  marginBottom: "20px",
                }}
              >
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  style={inputStyle}
                />
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                >
                  <option value="">Select Subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="membership">Membership Info</option>
                  <option value="lessons">Lessons</option>
                  <option value="events">Events</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <textarea
                name="message"
                placeholder="Your Message *"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                style={{ ...inputStyle, resize: "vertical" }}
              />

              <button
                type="submit"
                disabled={isSubmitted}
                style={{
                  width: "100%",
                  marginTop: "20px",
                  padding: "16px 32px",
                  background: isSubmitted
                    ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                    : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  cursor: isSubmitted ? "default" : "pointer",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  boxShadow: "0 0 25px rgba(118,75,162,0.5)",
                }}
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle size={20} />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

// Common Input Style
const inputStyle = {
  width: "100%",
  padding: "14px 18px",
  borderRadius: "10px",
  border: "1px solid rgba(255,255,255,0.2)",
  background: "rgba(255,255,255,0.05)",
  color: "white",
  fontSize: "1rem",
  outline: "none",
  transition: "all 0.3s ease",
  fontFamily: "inherit",
};

export default Contact;
