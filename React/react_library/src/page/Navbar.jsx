import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import '../asset/css/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [id, setId] = useState('');
  const [isUsernameClicked, setIsUsernameClicked] = useState(false); 

  const dropdownRef = useRef(null);
  const navbarRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation(); 


  const getActiveNavItem = () => {
    const path = location.pathname;
    if (path.includes('purchase')) return 'purchased';
    if (path.includes('return')) return 'returned';
    if (path.includes('profileupdate')) return 'profile'; 
    if (path.includes('about')) return 'about'; 
    return 'home'; 
  };

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
      setIsUsernameClicked(false); 
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
      } else {
        navigate("/signin");
      }
    } else {
      navigate("/signin");
    }
  }, [navigate]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);


  const activeNavItem = getActiveNavItem();

  return (
    <nav className={`navbar navbar-expand-lg color ${isOpen ? 'show' : ''}`} ref={navbarRef}>
      <div className="container-fluid">
        <span className="navbar-brand pn">Library Management Systems</span>

        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-controls="navbarText"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
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
              <Link
                className={`nav-link text-dark ${activeNavItem === 'home' ? 'active' : ''}`}
                to={`/library/book/${id}`}
              >
                Dashboard
              </Link>
            </li>
            <li className="nav-item me-5">
              <Link
                className={`nav-link text-dark ${activeNavItem === 'purchased' ? 'active' : ''}`}
                to={`/library/purchase/${id}`}
              >
                Purchased
              </Link>
            </li>
            <li className="nav-item me-5">
              <Link
                className={`nav-link text-dark ${activeNavItem === 'returned' ? 'active' : ''}`}
                to={`/library/return/${id}`}
              >
                Returned
              </Link>
            </li>
            <li
              className="nav-item dropdown me-5"
              ref={dropdownRef}
              onMouseEnter={() => { 
                if (!isUsernameClicked) { 
                  setIsDropdownOpen(true); 
                } 
              }} 
              onMouseLeave={() => { 
                if (!isUsernameClicked) { 
                  setIsDropdownOpen(false); 
                } 
              }} 
            >
              <Link
                className={`nav-link dropdown-toggle text-dark d-flex align-items-center ${isDropdownOpen ? 'show' : ''}`}  
                to="#"
                role="button"
                aria-expanded={isDropdownOpen}
                onClick={() => { 
                  setIsUsernameClicked(true); 
                  toggleDropdown(); 
                }}
              >
                <span className={`username ${isDropdownOpen || isUsernameClicked || activeNavItem === 'profile' || activeNavItem === 'about' ? 'underline' : ''}`}>{userName}</span> 
                <Icon icon={isDropdownOpen ? "mingcute:up-line" : "mingcute:down-line"} className="ms-2" />
              </Link>

              {isDropdownOpen && (
                <ul className="dropdown-menu p-2 show bg-secondary">
                  <li><Link className={`dropdown-item text-black`} to={`/library/profileupdate/${id}`} onClick={() => { 
                    setIsUsernameClicked(true); 
                    toggleDropdown(); 
                  }}>Profile</Link></li>
                  <li><Link className={`dropdown-item text-black`} to={`/library/profileupdate/${id}`} onClick={() => { 
                    setIsUsernameClicked(true);
                    toggleDropdown(); 
                  }}>About Us</Link></li>
                  <li><hr className="dropdown-divider bg-white" /></li>
                  <li><Link className={`dropdown-item text-black`} to="/signin">Logout</Link></li>
                </ul>
              )}
            </li>
            <div className='me-4'></div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;