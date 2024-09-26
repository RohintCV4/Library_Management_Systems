import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import '../asset/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
  const [userName, setUserName] = useState('');
  const [id, setId] = useState('');
  const dropdownRef = useRef(null);
  const navbarRef = useRef(null);  

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); 
    if (dropdownRef.current) {
      const isDropdownVisible = dropdownRef.current.classList.contains('show');
      if (isDropdownVisible) {
        dropdownRef.current.classList.remove('show');
      } else {
        dropdownRef.current.classList.add('show');
      }
    }
  };

  const handleClickOutside = (event) => {

    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      dropdownRef.current.classList.remove('show');
      setIsDropdownOpen(false);
    }

    if (navbarRef.current && !navbarRef.current.contains(event.target) && isOpen) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("Token");

    if (token) {
      const tokenParts = token.split('.');
      if (tokenParts.length === 3) {
        const payloadBase64 = tokenParts[1];
        const decodedPayload = atob(payloadBase64);
        const payload = JSON.parse(decodedPayload);

        setUserName(payload.user_name);
        setId(payload.user_id);
        console.log('User Name:', payload.user_name);
        console.log('User id:', payload.user_id);
      }
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]); 

  const brandTextStyle = {
    fontSize: '1.7rem',
  };

  const smallScreenStyle = {
    fontSize: '1.0rem',
  };

  return (
    <>
      <nav className={`navbar navbar-expand-lg bg-body-tertiary ${isOpen ? 'show' : ''}`} ref={navbarRef}>
        <div className="container-fluid">
          <span
            className="navbar-brand"
            style={window.innerWidth < 780 ? smallScreenStyle : brandTextStyle}
          >
            Library Management Systems
          </span>

          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleNavbar}
            aria-controls="navbarText"
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
            style={{ border: 'none', outline: 'none' }}
          >
            {isOpen ? (
              <Icon icon="radix-icons:cross-2" />
            ) : (
              <Icon icon="mdi:menu" />
            )}
          </button>

          <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarText">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item me-5">
                <Link className="nav-link text-dark" to="/library/book">Home</Link>
              </li>
              <li className="nav-item me-5">
                <Link className="nav-link text-dark" to="#purchased">Purchased</Link>
              </li>
              <li className="nav-item me-5">
                <Link className="nav-link text-dark" to="#return">Returned</Link>
              </li>
              <li className="nav-item dropdown me-5" ref={dropdownRef}>
                <Link
                  className="nav-link dropdown-toggle text-dark d-flex align-items-center"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded={false}
                  onClick={toggleDropdown}
                >
                  {userName}
                  
                  <Icon
                    icon={isDropdownOpen ? "mingcute:up-line" : "mingcute:down-line"}
                    className="ms-2"
                  />
                </Link>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to={`/library/profileupdate/${id}`}>Profile</Link></li>
                  <li><Link className="dropdown-item" to="#">Another action</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to="/signin">Logout</Link></li>
                </ul>
              </li>
              <div className='me-4'></div>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
