// components/Footer.js
import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="#pricing">Pricing</a>
        <a href="#about">About us</a>
        <a href="#help">Help Center</a>
        <a href="#contact">Contact us</a>
        <a href="#faqs">FAQs</a>
      </div>
      {/*<button className="call-button">Call Us</button>*/}
      <p>© 2024 DentalIQ - Privacy - Terms</p>
    </footer>
  );
}

export default Footer;
