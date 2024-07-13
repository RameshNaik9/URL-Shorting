import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} URL Shortener. All rights reserved. <a className="buttona" href="https://www.linkedin.com/in/ramesh-lahori-a2799b200/" target="_blank" rel="noopener noreferrer">
                  Ramesh Lahori
                </a></p>
      </div>
    </footer>
  );
}

export default Footer;
