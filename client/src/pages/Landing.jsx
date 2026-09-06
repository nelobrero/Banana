import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import './Landing.css';
import img1 from '../assets/1.png';
import img2 from '../assets/2.png';
import img3 from '../assets/3.png';
import img4 from '../assets/4.png';
import img5 from '../assets/5.png';
import img6 from '../assets/6.png';
import section3bg from '../assets/section3.png';

export default function Landing() {

const row1Ref = useRef(null);
const row2Ref = useRef(null);
let lastScrollY = 0;

useEffect(() => {
  let offset1 = 0;
  let offset2 = 0;

  function handleScroll() {
    const currentScrollY = window.scrollY;
    const delta = currentScrollY - lastScrollY;
    lastScrollY = currentScrollY;

    offset1 -= delta * 0.5;
    offset2 += delta * 0.5;

    if (row1Ref.current) {
      row1Ref.current.style.transform = `translateX(${offset1}px)`;
    }
    if (row2Ref.current) {
      row2Ref.current.style.transform = `translateX(${offset2}px)`;
    }
  }

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

  return (
    <div className="landing-page">

      {/* Header */}


      {/* Section 1: Hero */}
      <section className="landing-hero">
        <h1>Banana</h1>
        <h2 className="landing-tagline">Eat and Share Your Story</h2>
        <button className="landing-cta" onClick={() => window.location.href = '/login'}>Get Started</button>
      </section>

      {/* Section 2: App preview images */}
      <section className="landing-preview">
        <div className="slider-track">
          <div className="preview-row1" ref={row1Ref}>
            <img src={img1} className="preview-placeholder" />
            <img src={img2} className="preview-placeholder" />
            <img src={img3} className="preview-placeholder" />
            <img src={img1} className="preview-placeholder" />
            <img src={img2} className="preview-placeholder" />
            <img src={img3} className="preview-placeholder" />
          </div>
        </div>
        <div className="slider-track">
          <div className="preview-row2" ref={row2Ref}>
            <img src={img4} className="preview-placeholder" />
            <img src={img5} className="preview-placeholder" />
            <img src={img6} className="preview-placeholder" />
            <img src={img4} className="preview-placeholder" />
            <img src={img5} className="preview-placeholder" />
            <img src={img6} className="preview-placeholder" />
          </div>
        </div>    
      </section>

      {/* Section 3: Description */}
      <section className="landing-description" style={{ backgroundImage: `url(${section3bg})` }}>
        <div>
          <p>
          Tell the world what you think about the food you love or the food you
          wouldn't try again. Share reviews, photos, and experiences with fellow
          food lovers on Banana.
        </p>
        </div>
      </section>

      {/* Section 4: Steps */}
      <section className="landing-steps">
        <div className="step">
          <span className="step-icon">📷</span>
          <h3>Snap</h3>
          <p>Take a photo of your meal</p>
        </div>
        <div className="step">
          <span className="step-icon">✍️</span>
          <h3>Review</h3>
          <p>Share your honest thoughts</p>
        </div>
        <div className="step">
          <span className="step-icon">🌍</span>
          <h3>Share</h3>
          <p>Connect with food lovers</p>
        </div>
      </section>

      {/* Section 5: Bottom CTA */}
      <section className="landing-bottom">
        <h2>What Did You Eat Today?</h2>
        <button className="landing-cta" onClick={() => window.location.href = '/signup'}>Share It Now</button>
      </section>

    </div>
  );
}