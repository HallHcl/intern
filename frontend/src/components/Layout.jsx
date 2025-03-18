import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Layout.css';

const LayoutComponent = ({ children }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleManualsDropdown = () => {
    setActiveDropdown(activeDropdown === 'manuals' ? null : 'manuals');
  };

  const toggleVideosDropdown = () => {
    setActiveDropdown(activeDropdown === 'videos' ? null : 'videos');
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest('.manuals') && !event.target.closest('.videos')) {
      setActiveDropdown(null);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <>
      <div className="page-container">
        <div id="headerMain">
          <div className="header-main-content">
            <div className="header-col-left">
              <a href="tel:028578888">
                <i className="icon-sl-phone"></i>📞 02-857-8888 (สำนักงานใหญ่)
              </a>
            </div>
            <div className="header-col-right">
              <a href="https://careers.turbo.co.th/" rel="noopener noreferrer" target="_blank">ร่วมงานกับเรา</a>
              <a href="/aboutus" target="_self">เกี่ยวกับเรา</a>
            </div>
          </div>
        </div>

        <div className="navbar">
          <div className="logo">
            <img src="https://www.turbo.co.th/static/images/logo/logo-desktop.png" alt="Logo" />
          </div>

          <nav className="nav-links">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/it-staff">IT Staff</Link></li>
              <li><Link to="/news">News</Link></li>
              <li className="manuals">
                <button onClick={toggleManualsDropdown} className="manuals-button">
                  Manuals
                </button>
                {activeDropdown === 'manuals' && (
                  <ul className="dropdown">
                    <li><Link to="/notebook-ebook">Notebook</Link></li>
                    <li><Link to="/printer-ebook">Printer</Link></li>
                    <li><Link to="/wifi-ebook">Wifi and VPN</Link></li>
                  </ul>
                )}
              </li>
              <li className="videos">
                <button onClick={toggleVideosDropdown} className="videos-button">
                  Videos
                </button>
                {activeDropdown === 'videos' && (
                  <ul className="dropdown">
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
