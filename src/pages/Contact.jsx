import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ContactInfo from '../components/ContactInfo';
import ContactForm from '../components/ContactForm';
import Navbar from '../components/Navbar';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const featureBoxesRef = useRef([]);
  const reachUsRef = useRef(null);

  useEffect(() => {
    // Animate info cards
    featureBoxesRef.current.forEach((box, index) => {
      if (box) {
        gsap.fromTo(
          box,
          { 
            opacity: 0, 
            y: 50,
            scale: 0.9
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: box,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    });

    // Contact Form section animation
    if (reachUsRef.current) {
      gsap.fromTo(
        reachUsRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: reachUsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    // Gallery items animation
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
      gsap.fromTo(
        item,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          delay: index * 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // Feature boxes animation
    const featureBoxes = document.querySelectorAll('.feature-box');
    featureBoxes.forEach((box, index) => {
      gsap.fromTo(
        box,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: box,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="contact-page">
      <Navbar />
      
      {/* Hero Section with Image */}
      <section className="contact-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content-wrapper">
          <h1 className="hero-main-title">Contact Zigguratss</h1>
          <p className="hero-description">
            Have questions about our artworks? Want to collaborate with our artists? 
            We're here to help you discover the perfect piece for your collection.
          </p>
          <a href="#contact-form" className="cta-button">Get In Touch</a>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="info-cards-section">
        <div className="info-cards-container">
          <div className="info-card" ref={el => featureBoxesRef.current[0] = el}>
            <div className="card-icon">📍</div>
            <h3>Find Us</h3>
            <p>New Delhi<br/>India</p>
          </div>
          
          <div className="info-card" ref={el => featureBoxesRef.current[1] = el}>
            <div className="card-icon">📞</div>
            <h3>Call Us</h3>
            <p><a href="tel:+917838535496">(+91) 7838535496</a></p>
          </div>
          
          <div className="info-card" ref={el => featureBoxesRef.current[2] = el}>
            <div className="card-icon">📅</div>
            <h3>Book Online</h3>
            <p>Schedule An Appointment</p>
            <a href="#contact-form" className="card-link">Book Now →</a>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section" id="contact-form" ref={reachUsRef}>
        <div className="form-container">
          <div className="form-text-content">
            <h2>Send Us A Message</h2>
            <p>Feel free to reach out with any questions about our artworks, artist collaborations, or gallery visits. We'd love to hear from you!</p>
          </div>
          <div className="form-wrapper">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Map and Additional Info */}
      <section className="map-info-section">
        <div className="map-container">
          <ContactInfo />
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <div className="feature-box">
            <div className="feature-icon">🚚</div>
            <h4>FREE SHIPPING WORLD WIDE</h4>
            <p>By Professionals</p>
          </div>
          <div className="feature-box">
            <div className="feature-icon">💰</div>
            <h4>MONEY BACK GUARANTEE</h4>
            <p>Within 14 days after delivery</p>
          </div>
          <div className="feature-box">
            <div className="feature-icon">🎨</div>
            <h4>SELECTED ARTIST</h4>
            <p>Artist's around the world</p>
          </div>
          <div className="feature-box">
            <div className="feature-icon">🔒</div>
            <h4>SECURE PAYMENTS</h4>
            <p>By credit card or online</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-sections">
            <div className="footer-section">
              <p className="section-label">Try Us !</p>
              <h4>FOR BUYERS</h4>
              <a href="https://zigguratss.com/cms/customer-guide">Customer Guide</a>
            </div>
            
            <div className="footer-section">
              <p className="section-label">Use Us !</p>
              <h4>FOR ARTISTS</h4>
              <a href="https://zigguratss.com/cms/artist-guide">Artist Guide</a>
            </div>
            
            <div className="footer-section">
              <p className="section-label">Talk to Us !</p>
              <h4>ZIGGURATSS ART</h4>
              <a href="https://zigguratss.com/cms/terms-and-conditions">Terms and Conditions</a>
              <a href="https://zigguratss.com/cms/contest-rules">Contest Rules</a>
              <a href="https://zigguratss.com/about/">About us</a>
              <a href="https://zigguratss.com/faq">FAQs</a>
              <a href="https://zigguratss.com/blog">Blog</a>
            </div>
            
            <div className="footer-section">
              <p className="section-label">We are Social !</p>
              <h4>FOLLOW US</h4>
              <div className="social-icons">
                <a href="https://www.facebook.com/people/Zigguratss-Artwork-LLP/100090657829166/" target="_blank" rel="noopener noreferrer">f</a>
                <a href="https://www.linkedin.com/company/zigguratssartwork/about/" target="_blank" rel="noopener noreferrer">in</a>
                <a href="https://www.instagram.com/zigguratss/" target="_blank" rel="noopener noreferrer">ig</a>
                <a href="https://in.pinterest.com/zigguratss/" target="_blank" rel="noopener noreferrer">p</a>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>Copyright © 2026 Zigguratss Artwork LLP. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
