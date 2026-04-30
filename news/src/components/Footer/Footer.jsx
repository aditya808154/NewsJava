import React from "react";
import "./Footer.css";
import Logo from '../../assets/Image/DNN-LOGO.webp';
import { FaXTwitter, FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa6";

function Footer() {
  const socialIcons = [
    { icon: <FaXTwitter />, name: 'X', link: '#' },
    { icon: <FaFacebookF />, name: 'Facebook', link: '#' },
    { icon: <FaInstagram />, name: 'Instagram', link: '#' },
    { icon: <FaLinkedinIn />, name: 'LinkedIn', link: '#' },
    { icon: <FaYoutube />, name: 'YouTube', link: '#' },
  ];

  return (
    <footer className="reuters-footer">
      <div className="footer-container">

        {/* LEFT: Logo + About */}
        <div className="footer-left">
          <img src={Logo} alt="News Logo" />
          <h3>Day Night News</h3>
          <p>
            Day Night News is an online news portal that provides the latest news, updates, and articles. It covers a wide range of topics including national news, local stories, business, and social issues, offering timely and reliable information to readers.
          </p>
        </div>

        {/* CENTER: Contact Info */}
        <div className="footer-center footer-contact">
          <h3>Contact Us</h3>
          <p>📍 1, Himalaya Marg, Block D, Near Polytechnic Chauraha, Gyan Mandir Kanya Inter College, Indira Nagar, Lucknow 226016</p>
          <p>✉️ services@goampletech.in</p>
          <p>📞 +91 72890 40680</p>
        </div>

        {/* RIGHT: Social Icons */}
        <div className="footer-right">
          <h3>Follow Us</h3>
          <div className="footer-social-icons">
            {socialIcons.map((social) => (
              <a href={social.link} key={social.name} aria-label={`Follow us on ${social.name}`}>
                {social.icon}
              </a>
            ))}
          </div>
        </div>

      </div><br /><hr />

      <p className="footer-copy">
        © {new Date().getFullYear()} NewsPortal. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
