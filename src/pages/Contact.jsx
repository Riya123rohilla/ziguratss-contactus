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
      
      {/* Animated Background Section - First */}
      <section className="animated-cta-section">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
          <div className="shape shape-5"></div>
        </div>
        <div className="cta-content">
          <h2 className="cta-heading">
            <span className="cta-line">CREATE</span>
            <span className="cta-line cta-gold">SOMETHING</span>
            <span className="cta-line">EXTRAORDINARY</span>
          </h2>
          <p className="cta-subtitle">Let's bring your artistic vision to life</p>
          <a href="#contact-form" className="cta-btn-modern">
            <span>Start Your Project</span>
            <div className="cta-btn-shine"></div>
          </a>
        </div>
        <div className="scroll-indicator"></div>
      </section>

      {/* Hero Section with Form */}
      <section className="contact-hero-elicyon" id="contact-form">
        <div className="hero-content-elicyon">
          <div className="hero-text-elicyon">
            <h1 className="hero-title-elicyon">
              EVERY ARTWORK STARTS <span className="with-text">with a</span> VISION.<br/>
              LET'S START YOURS
            </h1>
          </div>
          
          <div className="hero-form-container">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Contact Information Grid */}
      <section className="contact-info-grid-section">
        <div className="contact-info-container">
          <div className="contact-info-column">
            <h3 className="contact-column-title">GENERAL<br/>ENQUIRIES</h3>
            <div className="contact-details-list">
              <div className="contact-detail-group">
                <h4>STUDIO</h4>
                <p><a href="mailto:contact@zigguratss.com">contact@zigguratss.com</a></p>
                <p><a href="tel:+917838535496">+91 7838535496</a></p>
              </div>
            </div>
          </div>

          <div className="contact-info-column">
            <h3 className="contact-column-title">CONNECT<br/>WITH US</h3>
            <div className="contact-details-list">
              <div className="contact-detail-group">
                <h4>SOCIAL</h4>
                <p><a href="https://www.facebook.com/people/Zigguratss-Artwork-LLP/100090657829166/" target="_blank" rel="noopener noreferrer">Facebook</a></p>
                <p><a href="https://www.linkedin.com/company/zigguratssartwork/about/" target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
                <p><a href="https://www.instagram.com/zigguratss/" target="_blank" rel="noopener noreferrer">Instagram</a></p>
              </div>
            </div>
          </div>

          <div className="contact-info-column">
            <h3 className="contact-column-title">OUR<br/>LOCATION</h3>
            <div className="contact-details-list">
              <div className="contact-detail-group">
                <p>New Delhi<br/>India</p>
                <p className="visit-note">Visits by appointment only</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Minimalist Footer */}
      <footer className="footer-modern">
        <div className="footer-modern-content">
          <div className="footer-brand">
            <h3>ZIGGURATSS</h3>
            <p>Artwork Excellence Since 2020</p>
          </div>
          
          <div className="footer-links-grid">
            <div className="footer-col">
              <h4>Explore</h4>
              <a href="https://zigguratss.com/about/">About</a>
              <a href="https://zigguratss.com/blog">Journal</a>
              <a href="https://zigguratss.com/faq">FAQs</a>
            </div>
            
            <div className="footer-col">
              <h4>Resources</h4>
              <a href="https://zigguratss.com/cms/customer-guide">Buyer's Guide</a>
              <a href="https://zigguratss.com/cms/artist-guide">Artist's Guide</a>
              <a href="https://zigguratss.com/cms/terms-and-conditions">Terms</a>
            </div>
            
            <div className="footer-col">
              <h4>Connect</h4>
              <a href="https://www.facebook.com/people/Zigguratss-Artwork-LLP/100090657829166/" target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href="https://www.linkedin.com/company/zigguratssartwork/about/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://www.instagram.com/zigguratss/" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://in.pinterest.com/zigguratss/" target="_blank" rel="noopener noreferrer">Pinterest</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom-modern">
          <p>© 2026 Zigguratss Artwork LLP. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
