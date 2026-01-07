import React, { useState } from "react";

import styles from "./styles.module.css";

import phoneImg from "../../assets/imgs/phone.png";
import mailImg from "../../assets/imgs/mail.png";

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
    const whatsappUrl = `https://wa.me/201012938153?text=${encodeURIComponent(fullMessage)}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <section className="container-fluid mt-3 text-light" id="contact">
      <div className="row g-4 px-4 py-5 rounded" style={{background: "linear-gradient(to bottom, #040407, #381a5f)"}}>
        {/* Contact Info */}
        <div className="col-lg-6 d-flex justify-content-center align-items-center">
          <ul className="list-unstyled">
            <li className="d-flex align-items-center mb-4">
              <img
                src={phoneImg}
                alt="phone"
                className="me-3"
                style={{ height: "110px", width: "auto" }}
              />
              <p className="fs-4 mb-0">+20 101 293 8153</p>
            </li>
            <li className="d-flex align-items-center">
              <img
                src={mailImg}
                alt="mail"
                className="me-3"
                style={{ height: "110px", width: "auto" }}
              />
              <p className="fs-4 mb-0">ashrafkareem2004@gmail.com</p>
            </li>
          </ul>
        </div>

        {/* WhatsApp Form */}
        <div className="col-lg-6 p-4 rounded">
          <h2 className="display-5 text-warning fw-bold mb-3">Let’s connect</h2>
          <p className="mb-4">Send me a message and let's schedule a call on WhatsApp!</p>
          <form onSubmit={handleSendWhatsApp}>
            <div className="row g-3">
              <div className="col-md-6">
                <input
                  type="text"
                  className={`${styles.contactInput} form-control bg-dark text-light border-warning`}
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
                  className={`${styles.contactInput} form-control bg-dark text-light border-warning`}
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
                  className={`${styles.contactInput} form-control bg-dark text-light border-warning`}
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
                  className={`${styles.contactInput} form-control bg-dark text-light border-warning`}
                  placeholder="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mt-3">
              <textarea
                className={`${styles.contactInput} form-control bg-dark text-light border-warning`}
                rows="4"
                placeholder="Your Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="mt-4">
              <button type="submit" className="btn btn-success w-100 fs-5 fw-semibold">
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
