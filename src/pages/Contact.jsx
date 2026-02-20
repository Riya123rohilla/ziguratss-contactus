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

    // Blur effect on scroll
    const sections = document.querySelectorAll('.contact-page section');
    
    const observerOptions = {
      root: null,
      threshold: 0.5,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Section is in view - clear
          entry.target.style.filter = 'blur(0px)';
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'scale(1) translateZ(0)';
        } else {
          // Section is out of view - blur
          entry.target.style.filter = 'blur(3px)';
          entry.target.style.opacity = '0.7';
          entry.target.style.transform = 'scale(0.98) translateZ(-50px)';
        }
      });
    }, observerOptions);

    sections.forEach((section) => {
      observer.observe(section);
    });

    // Parallax effect on scroll
    let lastScrollTop = 0;
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const scrollPercent = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        
        // Parallax movement
        const parallaxSpeed = 50;
        const yOffset = (scrollPercent - 0.5) * parallaxSpeed;
        
        // 3D rotation based on scroll
        const rotateX = Math.max(-5, Math.min(5, (scrollPercent - 0.5) * 10));
        
        // Add parallax and rotation effects
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const elements = section.querySelectorAll('.cta-content, .vision-split-container, .services-container, .contact-info-container, .footer-modern-content');
          elements.forEach(el => {
            if (el) {
              gsap.to(el, {
                y: yOffset * -1,
                rotateX: rotateX,
                duration: 0.3,
                ease: 'power1.out'
              });
            }
          });
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Mouse move parallax effect
    const handleMouseMove = (e) => {
      const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const shapes = section.querySelectorAll('.shape, .floating-shapes');
          shapes.forEach((shape) => {
            if (shape) {
              gsap.to(shape, {
                x: mouseX * 30,
                y: mouseY * 30,
                duration: 1,
                ease: 'power2.out'
              });
            }
          });
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Contact info cards animation using IntersectionObserver
    const contactCards = document.querySelectorAll('.contact-info-card');
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const card = entry.target;
          const index = Array.from(contactCards).indexOf(card);
          gsap.fromTo(
            card,
            { opacity: 0, y: 60, scale: 0.92 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              delay: index * 0.15,
              ease: 'power3.out',
            }
          );
          cardObserver.unobserve(card);
        }
      });
    }, { threshold: 0.2 });

    contactCards.forEach((card) => cardObserver.observe(card));

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      observer.disconnect();
      cardObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
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
            <span>Contact Us</span>
            <div className="cta-btn-shine"></div>
          </a>
        </div>
        <div className="scroll-indicator"></div>
      </section>

      {/* Vision Statement Section - Page 2 */}
      <section className="vision-statement-section">
        <div className="vision-split-container">
          <div className="vision-left">
            <h2 className="vision-title">
              EVERY ARTWORK STARTS <span className="with-text-vision">with a</span> VISION.<br/>
              LET'S START YOURS
            </h2>
            <div className="vision-underline"></div>
          </div>

          <div className="vision-right">
            <div className="vision-form-wrapper">
              <h3 className="vision-form-title">Get in Touch</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Services Showcase Section */}
      <section className="services-showcase-section">
        <div className="services-container">
          <h2 className="services-title">OUR <span className="gold-text">SERVICES</span></h2>
          
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🎨</div>
              <h3>Custom Artwork</h3>
              <p>Original pieces tailored to your specifications</p>
              <ul className="service-list">
                <li>Oil & Acrylic Paintings</li>
                <li>Watercolor & Mixed Media</li>
                <li>Digital Art</li>
                <li>Sculptures</li>
              </ul>
            </div>
            
            <div className="service-card">
              <div className="service-icon">🖼️</div>
              <h3>Art Restoration</h3>
              <p>Breathe new life into cherished pieces</p>
              <ul className="service-list">
                <li>Damage Assessment</li>
                <li>Color Restoration</li>
                <li>Frame Repair</li>
                <li>Preservation</li>
              </ul>
            </div>
            
            <div className="service-card">
              <div className="service-icon">💼</div>
              <h3>Corporate Art</h3>
              <p>Elevate your business environment</p>
              <ul className="service-list">
                <li>Office Installations</li>
                <li>Brand Artwork</li>
                <li>Wall Murals</li>
                <li>Art Consultation</li>
              </ul>
            </div>
            
            <div className="service-card">
              <div className="service-icon">🏛️</div>
              <h3>Gallery Services</h3>
              <p>Professional curation and display</p>
              <ul className="service-list">
                <li>Exhibition Design</li>
                <li>Lighting Setup</li>
                <li>Collection Management</li>
                <li>Art Advisory</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Grid */}
      <section className="contact-info-grid-section">
        <div className="contact-info-container">

          {/* Card 1 - General Enquiries */}
          <div className="contact-info-card" data-delay="0">
            <div className="contact-card-icon">✉️</div>
            <h3 className="contact-card-title">GENERAL<br/>ENQUIRIES</h3>
            <div className="contact-card-divider"></div>
            <div className="contact-card-body">
              <span className="contact-card-label">STUDIO</span>
              <a href="mailto:contact@zigguratss.com" className="contact-card-link">contact@zigguratss.com</a>
              <a href="tel:+917838535496" className="contact-card-link">+91 7838535496</a>
            </div>
          </div>

          {/* Card 2 - Connect With Us */}
          <div className="contact-info-card" data-delay="1">
            <div className="contact-card-icon">🌐</div>
            <h3 className="contact-card-title">CONNECT<br/>WITH US</h3>
            <div className="contact-card-divider"></div>
            <div className="contact-card-body">
              <span className="contact-card-label">FOLLOW US</span>
              <div className="social-handles">
                <a href="https://www.instagram.com/zigguratss/" target="_blank" rel="noopener noreferrer" className="social-handle-row">
                  <span className="social-handle-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                  </span>
                  <span className="social-handle-name">Instagram</span>
                  <span className="social-handle-at">@zigguratss</span>
                </a>
                <a href="https://www.facebook.com/people/Zigguratss-Artwork-LLP/100090657829166/" target="_blank" rel="noopener noreferrer" className="social-handle-row">
                  <span className="social-handle-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  </span>
                  <span className="social-handle-name">Facebook</span>
                  <span className="social-handle-at">Zigguratss Artwork</span>
                </a>
                <a href="https://www.linkedin.com/company/zigguratssartwork/about/" target="_blank" rel="noopener noreferrer" className="social-handle-row">
                  <span className="social-handle-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                  </span>
                  <span className="social-handle-name">LinkedIn</span>
                  <span className="social-handle-at">zigguratssartwork</span>
                </a>
                <a href="https://in.pinterest.com/zigguratss/" target="_blank" rel="noopener noreferrer" className="social-handle-row">
                  <span className="social-handle-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
                  </span>
                  <span className="social-handle-name">Pinterest</span>
                  <span className="social-handle-at">@zigguratss</span>
                </a>
              </div>
            </div>
          </div>

          {/* Card 3 - Location */}
          <div className="contact-info-card" data-delay="2">
            <div className="contact-card-icon">📍</div>
            <h3 className="contact-card-title">OUR<br/>LOCATION</h3>
            <div className="contact-card-divider"></div>
            <div className="contact-card-body">
              <span className="contact-card-label">ADDRESS</span>
              <p className="contact-card-text">New Delhi<br/>India</p>
              <p className="contact-card-note">Visits by appointment only</p>
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
