import React, { useState } from "react";
import styles from "./styles.module.css";
import SectionHeader from "../SectionHeader/SectionHeader";
import phoneImg from "../../assets/imgs/phone.webp";
import mailImg from "../../assets/imgs/mail.webp";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendWhatsApp = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, phone, message } = formData;
    const fullMessage = `Hello, my name is ${firstName} ${lastName}%0AEmail: ${email}%0APhone: ${phone}%0A%0A${message}`;
    const whatsappUrl = `https://wa.me/201012938153?text=${encodeURIComponent(
      fullMessage
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section
      className={`${styles.contact} container-fluid text-light`}
      id="contact"
    >
      <SectionHeader
        title="Get in"
        highlightText="Touch"
        subtitle="Let's build something amazing together"
      />
      <div className={`${styles.contactWrapper} row g-4 mx-3`}>
        <div
          className={`${styles.contactInfo} col-xl-6 d-flex justify-content-center align-items-center`}
        >
          <ul className="list-unstyled">
            <li className="d-flex align-items-center mb-4">
              <img
                src={phoneImg}
                alt="phone"
                className="me-3"
                style={{ height: "80px", width: "auto" }}
              />
              <a
                className="fs-4 mb-0"
                style={{ color: "#f1f1f1", textDecoration: "none" }}
                href="tel:+201012938153"
              >
                +20 101 293 8153
              </a>
            </li>
            <li className="d-flex align-items-center">
              <img
                src={mailImg}
                alt="mail"
                className="me-5 me-sm-3 "
                style={{ height: "80px", width: "auto" }}
              />
              <a
                className="fs-4 mb-0"
                style={{
                  color: "#f1f1f1",
                  textDecoration: "none",
                  marginLeft: "-3rem",
                }}
                href="mailto:ashrafkareem2004@gmail.com"
              >
                ashrafkareem2004@gmail.com
              </a>
            </li>
          </ul>
        </div>
        <div className={`${styles.contactForm} col-xl-6 p-sm-4`}>
          <h2 className="display-5 fw-bold mb-3" style={{ color: "#f1f1f1" }}>
            Let's <span className={styles.gradientSpan}>connect</span>
          </h2>
          <p className="mb-4" style={{ color: "#c5c6c7" }}>
            Send me a message and let's schedule a call on WhatsApp!
          </p>
          <form onSubmit={handleSendWhatsApp}>
            <div className="row g-3">
              <div className="col-md-6">
                <input
                  type="text"
                  className={`${styles.contactInput} form-control`}
                  placeholder="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className={`${styles.contactInput} form-control`}
                  placeholder="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  type="email"
                  className={`${styles.contactInput} form-control`}
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  type="tel"
                  className={`${styles.contactInput} form-control`}
                  placeholder="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mt-3">
              <textarea
                className={`${styles.contactInput} form-control`}
                rows="4"
                placeholder="Your Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className={`${styles.submitBtn} btn w-100 fs-5 fw-semibold`}
              >
                Send via WhatsApp
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
