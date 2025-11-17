// src/MarsPage.tsx
import { useEffect } from "react";
import "./styles/mars.css";
import { initMarsPage } from "./scripts/mars";

const MarsPage: React.FC = () => {
  useEffect(() => {
    // Run your DOM logic once after React mounts
    initMarsPage();
  }, []);

  return (
    <>
      {/* NAV */}
      <nav>
        <div className="nav-inner">
          <a href="/" className="logo">
            <img src="/assets/img/logoMars.png" alt="Mars Mission Logo" />
            <span>Mars Mission</span>
          </a>

          <button
            className="hamburger"
            id="menuToggle"
            aria-label="Open menu"
            aria-expanded="false"
            aria-controls="navMenu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className="nav-overlay" id="navOverlay" hidden></div>

          <div className="nav-buttons" id="navMenu">
            <button className="nav-btn" data-target="about">
              About
            </button>
            <button className="nav-btn" data-target="gallery21">
              Gallery
            </button>
            <button className="nav-btn" data-target="sponsors">
              Sponsors
            </button>
            <button className="nav-btn" data-target="contact">
              Contact
            </button>
          </div>

          <button id="toggleMusicBtn">🔈 Sound On</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" id="top">
         {/* Desktop/Tablet Video */}
	  <video
		className="hero-bg hero-video"
		autoPlay
		muted
		loop
		playsInline
		id="bgVideo"
	  >
		<source src="/assets/video/mars.webm" type="video/webm" />
	  </video>

	  {/* Desktop Image (your original fallback) */}
	  <img
		className="hero-bg hero-img"
		src="/assets/img/spaceshipCabin.webp"
		alt=""
	  />

	  {/* Mobile-Only Background Image */}
	  <img
		className="hero-image-mobile"
		src="/assets/img/spaceshipMobile.webp"
		alt="Mars Mobile Background"
	  />
        <div className="hero-content">
          <h1>Welcome to Mars</h1>
          <p>Explore the next frontier of human innovation.</p>
        </div>
      </section>

      {/* ABOUT */}
      <section className="block" id="about">
        <h2 className="section-title">About</h2>
        <p style={{ paddingBottom: 0 }}>
          Ares Chronicle brings the story of Mars colonization to life through
          immersive narrative and design. The homepage is your launchpad —
          mission timeline, visual galleries, and the human journey that turned
          a barren world into a living one.
        </p>
      </section>

      {/* GALLERY */}
      <section className="block theme-orange" id="gallery21">
        <h2 className="section-title">Gallery</h2>
        <p>
          It is a chronicle of our journey from Earth to the Red Frontier — a
          record of the moments where imagination became reality.
        </p>

        {/* JS fills this with tiles */}
        <div className="ggrid" id="gGrid"></div>

        <div className="gbar">
          <div className="gcontrols" role="group" aria-label="Set navigation">
            <button className="gchev" id="gPrev" aria-label="Previous section">
              ‹
            </button>
            <span id="gLabel" aria-live="polite">
              Set 1 / 7
            </span>
            <button className="gchev" id="gNext" aria-label="Next section">
              ›
            </button>
          </div>
          <div className="gsets" id="gSets"></div>
        </div>

        {/* Lightbox */}
        <dialog id="gViewer" aria-label="Image viewer">
          <div className="gbox" role="document">
            <div className="gtop">
              <div className="gtitles">
                <strong id="lbTitle">Preview</strong>
                <small id="lbDesc"></small>
              </div>
              <div className="gactions">
                <button className="gbtn" id="dlBtn">
                  Download
                </button>
                <button className="gbtn accent" id="closeBtn">
                  Close
                </button>
              </div>
            </div>
            <div className="gview">
              <div className="frame">
                <button
                  className="side left"
                  id="lbPrev"
                  aria-label="Previous image"
                >
                  ‹
                </button>
                <img id="lbImg" alt="" />
                <button
                  className="side right"
                  id="lbNext"
                  aria-label="Next image"
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        </dialog>
      </section>

      {/* VIBE */}
      <section className="vibe-wrap">
        <h2 className="vibe-title">Mission Vibes</h2>
        <div className="vibe-grid">
          <article className="vibe-card">
            <div className="vibe-label">Habitat Population</div>
            <div className="vibe-counter" data-target="32">
              0
            </div>
            <div className="vibe-sub">crew inside</div>
          </article>
          <article className="vibe-card">
            <div className="vibe-label">Oxygen Index</div>
            <div
              className="vibe-counter"
              data-target="21"
              data-suffix="%"
              data-jitter="true"
            >
              0
            </div>
            <div className="vibe-sub">atmosphere mix</div>
          </article>
          <article className="vibe-card">
            <div className="vibe-label">Generation Index</div>
            <div className="vibe-counter" data-target="4">
              0
            </div>
            <div className="vibe-sub">born on Mars</div>
          </article>
        </div>
      </section>

      {/* SPONSORS */}
      <section className="block" id="sponsors">
        <h2 className="section-title">Sponsors</h2>
        <p>
          Supported by leading innovators in aerospace, renewable energy, and
          biotechnology working together toward the Mars colonization vision.
        </p>
        <div className="sponsor-box">
          <div className="sponsor-viewport">
            <div className="sponsor-track" id="sponsor-track">
              <div className="sponsor-item">
                <img src="/assets/sponsors/sponsor1.png" alt="Sponsor 1" />
              </div>
              <div className="sponsor-item">
                <img src="/assets/sponsors/sponsor2.png" alt="Sponsor 2" />
              </div>
              <div className="sponsor-item">
                <img src="/assets/sponsors/sponsor3.png" alt="Sponsor 3" />
              </div>
              <div className="sponsor-item">
                <img src="/assets/sponsors/sponsor4.png" alt="Sponsor 4" />
              </div>
              <div className="sponsor-item">
                <img src="/assets/sponsors/sponsor5.png" alt="Sponsor 5" />
              </div>
              <div className="sponsor-item">
                <img src="/assets/sponsors/sponsor6.png" alt="Sponsor 6" />
              </div>
              <div className="sponsor-item">
                <img src="/assets/sponsors/sponsor7.png" alt="Sponsor 7" />
              </div>
              <div className="sponsor-item">
                <img src="/assets/sponsors/sponsor8.png" alt="Sponsor 8" />
              </div>
              <div className="sponsor-item">
                <img src="/assets/sponsors/sponsor9.png" alt="Sponsor 9" />
              </div>
              <div className="sponsor-item">
                <img src="/assets/sponsors/sponsor10.png" alt="Sponsor 10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="block" id="contact">
        <h2 className="section-title">Contact</h2>
        <p>Send us your message or collaboration idea — we’ll reply soon!</p>

        <div className="contact-card">
          <form
            id="contactForm"
            action="https://formspree.io/f/xanawaww"
            method="POST"
          >
            <div className="col-left">
              <input
                type="text"
                name="name"
                placeholder="Full name*"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email address*"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone number (optional)"
              />
            </div>

            <div className="col-right">
              <textarea name="message" placeholder="Message..."></textarea>
            </div>

            <label className="chk">
              <input type="checkbox" id="agreeMars" required />
              <span className="box" aria-hidden="true"></span>
              I agree my details can be used to contact me about this enquiry.
            </label>

            <button type="submit">Submit</button>
            <div id="formMsg" className="msg"></div>
          </form>

          <footer className="site-footer">
            <div className="socials">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                aria-disabled="true"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06C2 17.08 5.66 21.2 10.44 22v-7.03H7.9v-2.91h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.91h-2.34V22C18.34 21.2 22 17.08 22 12.06z" />
                </svg>
              </a>

              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                aria-disabled="true"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.25 3H21l-6.5 7.43L22 21h-5.5l-4.3-5.24L7.1 21H3l7.2-8.23L2 3h5.6l3.9 4.93L18.25 3zm-2.1 16h1.54L8.96 5H7.34l8.81 14z" />
                </svg>
              </a>

              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                aria-disabled="true"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.6 3.5 12 3.5 12 3.5s-7.6 0-9.4.6A3 3 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.8.6 9.4.6 9.4.6s7.6 0 9.4-.6a3 3 0 0 0 2.1-2.1c.4-1.9.5-3.8.5-5.8s0-3.9-.5-5.8zM9.8 15.5V8.5l6.2 3.5-6.2 3.5z" />
                </svg>
              </a>

              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                aria-disabled="true"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9A4.5 4.5 0 0 1 16.5 21h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3zm0 2A2.5 2.5 0 0 0 5 7.5v9A2.5 2.5 0 0 0 7.5 19h9A2.5 2.5 0 0 0 19 16.5v-9A2.5 2.5 0 0 0 16.5 5h-9zm9.75.75a1 1 0 1 1-1 1 1 1 0 0 1 1-1zM12 8a4 4 0 1 1-4 4 4.003 4.003 0 0 1 4-4zm0 2a2 2 0 1 0 2 2 2.002 2.002 0 0 0-2-2z" />
                </svg>
              </a>
            </div>

            <p>© 2025 Mars Mission — All rights reserved.</p>
          </footer>
        </div>
      </section>

      {/* MUSIC (background audio) */}
      <audio id="bgMusic">
        <source src="/assets/audio/backgroundSound.mp3" type="audio/mpeg" />
      </audio>
    </>
  );
};

export default MarsPage;
