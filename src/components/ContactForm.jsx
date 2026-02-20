import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const ContactForm = () => {
  const formRef = useRef(null);
  const buttonRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState('');

  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.3 }
    );
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Required';
    if (!formData.email.trim()) newErrors.email = 'Required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.message.trim()) newErrors.message = 'Required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      gsap.to(formRef.current, { x: [-8, 8, -8, 8, 0], duration: 0.4, ease: 'power2.out' });
      return;
    }
    gsap.to(buttonRef.current, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', mobile: '', message: '' });
    }, 3000);
  };

  return (
    <div className="dramatic-form-wrapper" ref={formRef}>

      {/* Decorative corner lines */}
      <div className="form-corner form-corner-tl"></div>
      <div className="form-corner form-corner-tr"></div>
      <div className="form-corner form-corner-bl"></div>
      <div className="form-corner form-corner-br"></div>

      {submitted ? (
        <div className="form-success-state">
          <div className="success-checkmark">✦</div>
          <h3>MESSAGE SENT</h3>
          <p>We'll be in touch soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="dramatic-form" noValidate>

          {/* Row 1 — Name + Email side by side */}
          <div className="df-row df-row-split">
            <div className={`df-field ${focused === 'name' ? 'df-active' : ''} ${errors.name ? 'df-error' : ''} ${formData.name ? 'df-filled' : ''}`}>
              <label className="df-label">01 — YOUR NAME</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocused('name')}
                onBlur={() => setFocused('')}
                className="df-input"
                autoComplete="off"
              />
              <span className="df-underline"></span>
              {errors.name && <span className="df-err-msg">{errors.name}</span>}
            </div>

            <div className={`df-field ${focused === 'email' ? 'df-active' : ''} ${errors.email ? 'df-error' : ''} ${formData.email ? 'df-filled' : ''}`}>
              <label className="df-label">02 — EMAIL ADDRESS</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocused('email')}
                onBlur={() => setFocused('')}
                className="df-input"
                autoComplete="off"
              />
              <span className="df-underline"></span>
              {errors.email && <span className="df-err-msg">{errors.email}</span>}
            </div>
          </div>

          {/* Row 2 — Mobile full width */}
          <div className="df-row">
            <div className={`df-field ${focused === 'mobile' ? 'df-active' : ''} ${formData.mobile ? 'df-filled' : ''}`}>
              <label className="df-label">03 — PHONE NUMBER <span className="df-optional">(optional)</span></label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                onFocus={() => setFocused('mobile')}
                onBlur={() => setFocused('')}
                className="df-input"
                autoComplete="off"
              />
              <span className="df-underline"></span>
            </div>
          </div>

          {/* Row 3 — Message */}
          <div className="df-row">
            <div className={`df-field ${focused === 'message' ? 'df-active' : ''} ${errors.message ? 'df-error' : ''} ${formData.message ? 'df-filled' : ''}`}>
              <label className="df-label">04 — YOUR MESSAGE</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused('')}
                className="df-input df-textarea"
                rows="4"
              />
              <span className="df-underline"></span>
              {errors.message && <span className="df-err-msg">{errors.message}</span>}
            </div>
          </div>

          {/* Submit */}
          <button type="submit" className="df-submit" ref={buttonRef}>
            <span className="df-submit-text">SEND MESSAGE</span>
            <span className="df-submit-arrow">→</span>
            <div className="df-submit-fill"></div>
          </button>

        </form>
      )}
    </div>
  );
};

export default ContactForm;
