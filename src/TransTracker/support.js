import React, { useState } from "react";
import "./SupportPage.css"; // Import CSS for the styles

const SupportPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted: ", formData);
    // You can integrate an API call here to submit the form
    alert("Your message has been submitted!");
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="support-container">
      <header className="support-header">
        <h1>Support Center</h1>
        <p>We're here to help you with any issues or inquiries you might have.</p>
      </header>

      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq">
          <h3>How do I reset my password?</h3>
          <p>You can reset your password by clicking the "Forgot Password" link on the login page.</p>
        </div>
        <div className="faq">
          <h3>How do I contact customer support?</h3>
          <p>Fill out the form below and we will get back to you as soon as possible.</p>
        </div>
        <div className="faq">
          <h3>How can I update my account information?</h3>
          <p>Go to your account settings and update your information from there.</p>
        </div>
      </section>

      <section className="support-form-section">
        <h2>Submit a Support Request</h2>
        <form className="support-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="btn-submit">
            Submit
          </button>
        </form>
      </section>
    </div>
  );
};

export default SupportPage;
