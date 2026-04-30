import React from 'react';
import './ContactSection.css';

const ContactSection = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message Sent Successfully!');
    // Actual form submission logic here
  };

  const renderSocialIcons = () => (
    <div className="cs-social-list">
      <a href="#" target="_blank" rel="noopener noreferrer" className="cs-social-icon ts-facebook" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
      <a href="#" target="_blank" rel="noopener noreferrer" className="cs-social-icon ts-x" aria-label="X"><i className="fab fa-twitter"></i></a>
      <a href="#" target="_blank" rel="noopener noreferrer" className="cs-social-icon ts-youtube" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
      <a href="#" target="_blank" rel="noopener noreferrer" className="cs-social-icon ts-whatsapp" aria-label="Whatsapp"><i className="fab fa-whatsapp"></i></a>
      <a href="#" target="_blank" rel="noopener noreferrer" className="cs-social-icon ts-linkedin" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
    </div>
  );

  return (
    <div className="cs-main-container">

      {/* Dark Header */}
      <div className="cs-dark-header">
        <header className="cs-header-content">
          <h1 className="cs-main-heading">Contact Us</h1>
          <p className="cs-breadcrumb">daynightnews • Contact</p>
        </header>
      </div>

      {/* White Section */}
      <section className="cs-contact-section-white">
        <h2 className="cs-section-subtitle">
          हमसे संपर्क करें, हमें आपसे सुनना अच्छा लगेगा।
        </h2>

        <div className="cs-content-grid">

          {/* Left: Contact Form */}
          <div className="cs-form-wrapper">
            <h3 className="cs-form-heading">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="cs-contact-form">
              <div className="cs-form-group">
                <label htmlFor="name">आपका नाम</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className="cs-form-group">
                <label htmlFor="email">ईमेल पता</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className="cs-form-group">
                <label htmlFor="subject">विषय</label>
                <input type="text" id="subject" name="subject" />
              </div>
              <div className="cs-form-group">
                <label htmlFor="message">आपका संदेश</label>
                <textarea id="message" name="message" rows="5" required></textarea>
              </div>
              <button type="submit" className="cs-submit-button">संदेश भेजें</button>
            </form>
          </div>

          {/* Right: Contact Info */}
          <div className="cs-info-wrapper">
            <h3 className="cs-info-heading">Contact Details</h3>

            <div className="cs-detail-box">
              <span className="cs-icon"><i className="fas fa-map-marker-alt"></i></span>
              <h4>Office Address</h4>
              <p>1, Himalaya Marg, Block D, Near Polytechnic Chauraha, Gyan Mandir Kanya Inter College, Indira Nagar, Lucknow 226016</p>
            </div>

            <div className="cs-detail-box">
              <span className="cs-icon"><i className="fas fa-envelope"></i></span>
              <h4>Email Support</h4>
              <p>services@goampletech.in</p>
              <p>info@daynightnews.com</p>
            </div>

            <div className="cs-detail-box">
              <span className="cs-icon"><i className="fas fa-phone-alt"></i></span>
              <h4>Call Us</h4>
              <p> +91 72890 40680 (General Inquiries)</p>
              <p> +91 72890 40680 (Press & Media)</p>
            </div>

            <div className="cs-detail-box cs-social-box">
              <span className="cs-icon"><i className="fas fa-share-alt"></i></span>
              <h4>Connect with Us</h4>
              <p>सोशल मीडिया पर हमसे जुड़ें।</p>
              {renderSocialIcons()}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactSection;
