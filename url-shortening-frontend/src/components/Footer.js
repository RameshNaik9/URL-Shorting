import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} URL Shortener. All rights reserved. Ramesh Naik Lahori</p>
      </div>
    </footer>
  );
}

export default Footer;
