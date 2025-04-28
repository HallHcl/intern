import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Layout.css';

const LayoutComponent = ({ children }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const navRef = useRef(null);

  const toggleDropdown = (type) => {
    setActiveDropdown(activeDropdown === type ? null : type);
  };

  const handleMouseEnter = (type) => {
    setIsHovering(true);
    setActiveDropdown(type);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    // ใช้ setTimeout เพื่อให้มีเวลาคลิกก่อนที่ dropdown จะปิด
    setTimeout(() => {
      if (!isHovering) {
        setActiveDropdown(null);
      }
    }, 300);
  };

  const handleDropdownMouseEnter = () => {
    setIsHovering(true);
  };

  const handleDropdownMouseLeave = () => {
    setIsHovering(false);
    setActiveDropdown(null);
  };

  return (
    <>
      <div className="page-container">
        <div id="headerMain">
          <div className="header-main-content">
            <div className="header-col-left">
              <a href="tel:028578888">
                <i className="icon-sl-phone"></i>📱 02-857-8888 (สำนักงานใหญ่)
              </a>
            </div>
            <div className="header-col-right">
            <a href="/login" class="login-btn" rel="noopener noreferrer" target="_blank">Login</a>
            <a href="/aboutus" target="_self">เกี่ยวกับเรา</a>
            </div>
          </div>
        </div>

        <div className="navbar" ref={navRef}>
          <div className="logo">
            <img src="https://www.turbo.co.th/static/images/logo/logo-desktop.png" alt="Logo" />
          </div>

          <nav className="nav-links">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/it-staff">IT Staff</Link></li>
              <li><Link to="/news">News</Link></li>
              <li 
                className="manuals"
                onMouseEnter={() => handleMouseEnter('manuals')}
                onMouseLeave={handleMouseLeave}
              >
                <button onClick={() => toggleDropdown('manuals')} className="manuals-button">
                  E-book
                </button>
                {activeDropdown === 'manuals' && (
                  <ul 
                    className="dropdown"
                    onMouseEnter={handleDropdownMouseEnter}
                    onMouseLeave={handleDropdownMouseLeave}
                  >
                    <li><Link to="/notebook-ebook">Notebook</Link></li>
                    <li><Link to="/printer">Printer</Link></li>
                    <li><Link to="/wifi-ebook">Wifi and VPN</Link></li>
                  </ul>
                )}
              </li>
              <li 
                className="videos"
                onMouseEnter={() => handleMouseEnter('videos')}
                onMouseLeave={handleMouseLeave}
              >
                <button onClick={() => toggleDropdown('videos')} className="videos-button">
                  Videos
                </button>
                {activeDropdown === 'videos' && (
                  <ul 
                    className="dropdown"
                    onMouseEnter={handleDropdownMouseEnter}
                    onMouseLeave={handleDropdownMouseLeave}
                  >
                    <li><Link to="/notebook-video">Notebook</Link></li>
                    <li><Link to="/printer-video">Printer</Link></li>
                    <li><Link to="/wifi-video">Wifi and VPN</Link></li>
                  </ul>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="content-container">
        {children}
      </div>
    </>
  );
};

export default LayoutComponent;