import React from 'react';
import { FaCoffee, FaGithub, FaGlobe, FaBook } from 'react-icons/fa';
import './styles/footer.css';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-logo">
          <FaCoffee size={30} className="footer-icon" />
          <span style={{ fontWeight: 'bold', fontSize: 'larger' }}>Espresso Dev Tour</span>
        </div>
        <p className="footer-copyright" style={{ fontWeight: 'bold', fontSize: 'larger' }}>&copy; {new Date().getFullYear()} Made with Love ❤️  by Caffeinated CEO</p>
        <div className="footer-links">
          <a href="https://github.com/espressosystems" target="_blank" rel="noopener noreferrer">
            <FaGithub size={30} /> <span style={{ fontWeight: 'bold', fontSize: 'larger' }}>GitHub</span>
          </a>
          <a href="https://www.espressosys.com/" target="_blank" rel="noopener noreferrer">
            <FaGlobe size={30} /> <span style={{ fontWeight: 'bold', fontSize: 'larger' }}>Website</span>
          </a>
          <a href="https://docs.espressosys.com/network" target="_blank" rel="noopener noreferrer">
            <FaBook size={30} /> <span style={{ fontWeight: 'bold', fontSize: 'larger' }}>Docs</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
