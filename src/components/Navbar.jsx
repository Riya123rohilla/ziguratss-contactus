import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const Navbar = () => {
  const navRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );
  }, []);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handleClick = (e) => {
      if (!navRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpen]);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <>
      <nav className="navbar" ref={navRef}>
        <div className="navbar-container">

          <div className="navbar-logo">
            <div className="logo-box">
              <span className="logo-text" style={{color: '#deb222'}}>ZIGGURATSS</span>
            </div>
          </div>

          {/* Desktop menu — hidden on mobile via CSS */}
          <ul className="navbar-menu">
            <li><a href="#home">Home</a></li>
            <li><a href="#artwork">Artwork</a></li>
            <li><a href="#artist">Artist</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#blog">Blog</a></li>
            <li><a href="#contest">Contest</a></li>
            <li><a href="#contact" className="active">Contact</a></li>
          </ul>

          <div className="navbar-icons">
            <button className="nav-icon search-icon" aria-label="Search">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>
            <button className="nav-icon user-icon" aria-label="User">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </button>
            <button className="nav-icon cart-icon" aria-label="Cart">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
            </button>

            {/* Hamburger — visible only on mobile via CSS */}
            <button
              className={`hamburger${menuOpen ? ' open' : ''}`}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(prev => !prev)}
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile slide-down drawer */}
      <div className={`mobile-nav-drawer${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen}>
        <ul className="mobile-nav-list">
          <li><a href="#home"    onClick={handleLinkClick}>Home</a></li>
          <li><a href="#artwork" onClick={handleLinkClick}>Artwork</a></li>
          <li><a href="#artist"  onClick={handleLinkClick}>Artist</a></li>
          <li><a href="#about"   onClick={handleLinkClick}>About</a></li>
          <li><a href="#blog"    onClick={handleLinkClick}>Blog</a></li>
          <li><a href="#contest" onClick={handleLinkClick}>Contest</a></li>
          <li><a href="#contact" onClick={handleLinkClick} className="active">Contact</a></li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
