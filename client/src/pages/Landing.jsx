import { Link } from 'react-router-dom';
import './Landing.css';

export default function Landing() {
  return (
    <div className="landing-page">

      {/* Header */}
      <header className="landing-header">
        <h1 className="landing-logo">Banana</h1>
        <div className="landing-nav">
          <Link to="/login">Log In</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      </header>

      {/* Section 1: Hero */}
      <section className="landing-hero">
        <h2 className="landing-tagline">Eat!</h2>
        <p className="landing-sub">and Share Your Story</p>
        <Link to="/signup" className="landing-cta">Get Started</Link>
      </section>

      {/* Section 2: App preview images */}
      <section className="landing-preview">
        <div className="preview-placeholder">📸 App Screenshot</div>
        <div className="preview-placeholder">📸 App Screenshot</div>
        <div className="preview-placeholder">📸 App Screenshot</div>
      </section>

      {/* Section 3: Description */}
      <section className="landing-description">
        <p>
          Tell the world what you think about the food you love or the food you
          wouldn't try again. Share reviews, photos, and experiences with fellow
          food lovers on Banana.
        </p>
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
      <section className="landing-bottom-cta">
        <h2>What Did You Eat Today?</h2>
        <Link to="/signup" className="landing-cta">Share It Now</Link>
      </section>

    </div>
  );
}