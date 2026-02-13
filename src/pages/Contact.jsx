import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ContactInfo from '../components/ContactInfo';
import ContactForm from '../components/ContactForm';
import Navbar from '../components/Navbar';

gsap.registerPlugin(ScrollTrigger);

const bannerImages = [
  'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=1600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=1600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=1600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1549887534-1541e9326642?w=1600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1600&h=600&fit=crop'
];

const Contact = () => {
  const heroRef = useRef(null);
  const headingRef = useRef(null);
  const featureBoxesRef = useRef([]);
  const titleRef = useRef(null);
  const reachUsRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Auto-slide banner every 8 seconds (slower)
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 8000);

    // Hero section fade in
    gsap.fromTo(
      heroRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: 'power3.out' }
    );

    // Subtitle slide up animation
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: 'power2.out' }
    );

    // Main title animation with split text effect
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 50, scale: 0.8 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        duration: 1, 
        delay: 0.5, 
        ease: 'back.out(1.7)' 
      }
    );

    // Floating animation for hero content
    gsap.to(heroRef.current, {
      y: 20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // Reach Us section animation
    gsap.fromTo(
      reachUsRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: reachUsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );

    // Animate feature boxes
    featureBoxesRef.current.forEach((box, index) => {
      if (box) {
        gsap.fromTo(
          box,
          { 
            opacity: 0, 
            y: 30
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: box,
              start: 'top 90%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    });

    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="contact-page">
      <Navbar />
      
      <section className="hero-section" ref={heroRef}>
        {/* Banner Slider */}
        <div className="banner-slider">
          {bannerImages.map((image, index) => (
            <div
              key={index}
              className={`banner-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${image})` }}
            />
          ))}
        </div>
        
        {/* Floating Emojis */}
        <div className="floating-emojis">
          <span className="float-emoji emoji-1">🎨</span>
          <span className="float-emoji emoji-2">🖼️</span>
          <span className="float-emoji emoji-3">✨</span>
          <span className="float-emoji emoji-4">🎭</span>
          <span className="float-emoji emoji-5">🖌️</span>
          <span className="float-emoji emoji-6">⭐</span>
          <span className="float-emoji emoji-7">💫</span>
          <span className="float-emoji emoji-8">🌟</span>
          <span className="float-emoji emoji-9">🎪</span>
          <span className="float-emoji emoji-10">🏛️</span>
        </div>
        
        {/* Slider Controls - Hidden */}
        <div className="slider-controls">
          <button 
            className="slider-btn prev-btn"
            onClick={() => setCurrentSlide((prev) => (prev - 1 + bannerImages.length) % bannerImages.length)}
            aria-label="Previous slide"
          >
            ‹
          </button>
          <button 
            className="slider-btn next-btn"
            onClick={() => setCurrentSlide((prev) => (prev + 1) % bannerImages.length)}
            aria-label="Next slide"
          >
            ›
          </button>
        </div>

        {/* Slider Dots */}
        <div className="slider-dots">
          {bannerImages.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="hero-content">
          <p className="hero-subtitle" ref={headingRef}>We're here to make you feel happy!</p>
          <h1 ref={titleRef}>LET'S TALK! 🎨</h1>
        </div>
      </section>

      <section className="reach-us-section" ref={reachUsRef}>
        <div className="reach-us-content">
          <h2>REACH US FOR ANY QUESTIONS YOU MIGHT HAVE</h2>
        </div>
      </section>

      <div className="container">
        <ContactForm />
        <ContactInfo />
      </div>

      <section className="features-section">
        <div className="features-container">
          <div className="feature-box" ref={el => featureBoxesRef.current[0] = el}>
            <div className="feature-icon">🚚</div>
            <h4>FREE SHIPPING WORLD WIDE</h4>
            <p>By Professionals</p>
          </div>
          <div className="feature-box" ref={el => featureBoxesRef.current[1] = el}>
            <div className="feature-icon">💰</div>
            <h4>MONEY BACK GUARANTEE</h4>
            <p>Within 14 days after delivery</p>
          </div>
          <div className="feature-box" ref={el => featureBoxesRef.current[2] = el}>
            <div className="feature-icon">🎨</div>
            <h4>SELECTED ARTIST</h4>
            <p>Artist's around the world</p>
          </div>
          <div className="feature-box" ref={el => featureBoxesRef.current[3] = el}>
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
