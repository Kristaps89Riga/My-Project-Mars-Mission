// mars.js
export function initMarsPage() {
	if (window.__marsInitDone) return;
	window.__marsInitDone = true;
	
  /* ===== NAV SMOOTH + SOUNDS ===== */
  const music = document.getElementById('bgMusic');
  const toggleMusicBtn = document.getElementById('toggleMusicBtn');
  const video = document.getElementById('bgVideo');
  let soundEnabled = true;

  const hoverBase = new Audio('assets/audio/sound01.wav');
  const clickBase = new Audio('assets/audio/sound02.wav');
  const HOVER_VOL = 0.25;
  const CLICK_VOL = 0.35;

  function playClone(base, vol = 0.3) {
    if (!soundEnabled) return;
    const a = base.cloneNode();
    a.volume = vol;
    a.play().catch(() => {});
  }

  // Smooth scroll for nav buttons
  document.querySelectorAll('[data-target]').forEach((el) => {
    el.addEventListener('click', () => {
      const id = el.getAttribute('data-target');
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Hover / click sounds on nav + logo + toggle button
  const navButtons = document.querySelectorAll('.nav-btn');
  const logoLink = document.querySelector('.logo');
  const hoverTargets = [];

  if (toggleMusicBtn) hoverTargets.push(toggleMusicBtn);
  navButtons.forEach((btn) => hoverTargets.push(btn));
  if (logoLink) hoverTargets.push(logoLink);

  hoverTargets.forEach((el) => {
    el.addEventListener('mouseenter', () => playClone(hoverBase, HOVER_VOL));
    el.addEventListener('click', () => playClone(clickBase, CLICK_VOL));
  });

  // Background music (guard in case music or button missing)
  if (music && toggleMusicBtn) {
    window.addEventListener('load', () => {
      music.volume = 0.5;
      music
        .play()
        .then(() => {
          toggleMusicBtn.textContent = '🔊 Sound Off';
        })
        .catch(() => {
          toggleMusicBtn.textContent = '🔈 Sound On';
          const startMusic = () => {
            if (soundEnabled) {
              music.play().then(() => {
                toggleMusicBtn.textContent = '🔊 Sound Off';
              });
            }
            document.removeEventListener('click', startMusic);
          };
          document.addEventListener('click', startMusic);
        });
    });

    toggleMusicBtn.addEventListener('click', () => {
      if (soundEnabled) {
        soundEnabled = false;
        music.pause();
        toggleMusicBtn.textContent = '🔈 Sound On';
      } else {
        soundEnabled = true;
        music.play().then(() => {
          toggleMusicBtn.textContent = '🔊 Sound Off';
        });
      }
    });
  }

  // Video end handler (no optional chaining)
  if (video) {
	video.addEventListener('ended', () => {
      video.pause();
      video.currentTime = video.duration;
    });
  }
    document.addEventListener("DOMContentLoaded", () => {
    if (window.innerWidth < 900) {
      const vid = document.querySelector(".hero-video");
      if (vid) vid.remove();  // remove video entirely
    }
  });

  /* ===== SPONSORS AUTO-LOOP ===== */
  (function () {
    const track = document.getElementById('sponsor-track');
    if (!track) return;

    const SPEED = 20; // pixels per second

    function ensureDoubled() {
      if (track.dataset.doubled === '1') return;
      track.innerHTML += track.innerHTML;
      track.dataset.doubled = '1';
    }

    function setDuration() {
      const halfWidth = track.scrollWidth / 2;
      if (halfWidth === 0) return;
      const seconds = halfWidth / SPEED;
      track.style.animationDuration = seconds + 's';
    }

    function whenImagesReady(cb) {
      const imgs = track.querySelectorAll('img');
      let pending = imgs.length;
      if (pending === 0) {
        cb();
        return;
      }
      imgs.forEach((img) => {
        if (img.complete) {
          pending--;
          if (pending === 0) cb();
        } else {
          img.addEventListener('load', () => {
            if (--pending === 0) cb();
          });
          img.addEventListener('error', () => {
            if (--pending === 0) cb();
          });
        }
      });
    }

    function boot() {
      ensureDoubled();
      setDuration();
    }

    whenImagesReady(boot);

    let rAF;
    window.addEventListener('resize', () => {
      cancelAnimationFrame(rAF);
      rAF = requestAnimationFrame(setDuration);
    });
  })();

  /* ===== CONTACT AJAX (native validation kept) ===== */
  const form = document.getElementById('contactForm');
  const msg = document.getElementById('formMsg');

  if (form && msg) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      msg.textContent = 'Sending...';
      msg.className = 'msg';

      try {
        const res = await fetch(form.action, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: new FormData(form),
        });

        if (res.ok) {
          msg.textContent = 'Thank you! Your message has been sent.';
          msg.className = 'msg ok';
          form.reset();
        } else {
          msg.textContent = 'Error sending. Please try again.';
          msg.className = 'msg err';
        }
      } catch {
        msg.textContent = 'Network error — please try again.';
        msg.className = 'msg err';
      }
    });
  }

  /* ===== 21-IMAGE / 7-SET GALLERY + LIGHTBOX ===== */
  (() => {
    const IMAGES = [
      { t: 'Mission to Mars: The New Dawn', d: "Humanity has finally gone beyond Earth's horizon. Mars — our new beginning. Here, science, technology, and imagination come together to create new life on another planet.", s: 'assets/img/01.png' },
      { t: 'Landing at Dusk — Olympus Mons Base', d: 'A spacecraft descends toward a Martian landing pad at sunset, with Olympus Mons towering in the distance.', s: 'assets/img/02.png' },
      { t: 'Martian Explorer — EVA-07 Suit Prototype', d: "An astronaut stands on the red plains wearing an advanced exploration suit built for Mars harsh environment.", s: 'assets/img/03.png' },
      { t: 'Ares Habitat Dome — Sector 3', d: 'A modular living structure combining domes and cylindrical units for sustainable Martian life.', s: 'assets/img/04.png' },
      { t: 'Rover Convoy — Supply Route Delta', d: 'Autonomous supply rovers traverse a canyon carrying vital cargo between remote colonies.', s: 'assets/img/05.png' },
      { t: 'Tesla Mars Rover — Solar Recon Unit', d: 'A rugged exploration vehicle powered by solar panels, designed for long-range terrain scouting.', s: 'assets/img/06.png' },
      { t: 'Terraforming towers (Steam towers)', d: 'Generators that evaporate ice, producing humidity and microclimate.', s: 'assets/img/07.png' },
      { t: 'Mission Control — Mars Orbital Operations', d: 'Scientists monitor data from orbiting satellites and coordinate planetary missions.', s: 'assets/img/08.png' },
      { t: 'Solar panel fields (Solar network builders)', d: 'Robots automatically install and maintain solar panels.', s: 'assets/img/09.png' },
      { t: 'Rover convoy and transport robots', d: 'Autonomous trucks with solar panels and navigation antennas.', s: 'assets/img/10.png' },
      { t: 'Red Market — Colony Exchange Hub', d: 'Colonists and robots gather to trade tools, resources, and innovations under protective canopies.', s: 'assets/img/11.png' },
      { t: 'Canyon City — The Redstone Metropolis', d: 'A sprawling Martian city carved into canyon walls, connected by transparent walkways.', s: 'assets/img/12.png' },
      { t: 'Living modules (HABITAT X, biodomes, domes)', d: 'Hermetic biotopes with life support systems.', s: 'assets/img/13.png' },
      { t: 'Museum of Mars Exploration — Legacy Hall', d: 'Visitors explore early Mars landers and rovers preserved as symbols of human progress.', s: 'assets/img/14.png' },
      { t: 'AI sistēma (PROMETHEUS-II)', d: 'Artificial intelligence that analyzes colony data, controls robots, energy networks, and rovers.', s: 'assets/img/15.png' },
      { t: 'Magnetic trains (Maglev tunnels)', d: 'Underground transport network between cities.', s: 'assets/img/16.png' },
      { t: 'Hydroponic greenhouses (Ares Greenhouse-01)', d: 'Plant cultivation in LED and water recirculation systems.', s: 'assets/img/17.png' },
      { t: 'Forest Dome One (Green breath on a red planet)', d: 'Forest canopy with birds, trees, and a humid ecosystem.', s: 'assets/img/18.png' },
      { t: 'Control center / Holographic interface', d: '3D maps of Mars, real-time data, AI communication with Earth.', s: 'assets/img/19.png' },
      { t: 'Blue Dawn — The Terraforming Horizon', d: 'The Martian sky begins to turn blue as the atmosphere thickens, marking a new dawn.', s: 'assets/img/20.png' },
      { t: 'Stargazers — The Perseid Dome', d: 'Colonists watch a meteor rain through a transparent dome, united under the Martian night sky.', s: 'assets/img/21.png' },
    ];

    const root = document.getElementById('gallery21');
    if (!root) return;

    root.classList.add('theme-orange');

    const grid = document.getElementById('gGrid');
    const gPrev = document.getElementById('gPrev');
    const gNext = document.getElementById('gNext');
    const gLabel = document.getElementById('gLabel');
    const gSets = document.getElementById('gSets');

    const dlg = document.getElementById('gViewer');
    const lbImg = document.getElementById('lbImg');
    const lbTitle = document.getElementById('lbTitle');
    const lbDesc = document.getElementById('lbDesc');
    const lbPrev = document.getElementById('lbPrev');
    const lbNext = document.getElementById('lbNext');
    const closeBtn = document.getElementById('closeBtn');
    const dlBtn = document.getElementById('dlBtn');

    const total = IMAGES.length;
    let perSet = window.innerWidth <= 900 ? 1 : 3; // mobile = 1, desktop = 3
    let totalSets = Math.ceil(total / perSet);
    let setIndex = 0;
    let globalIndex = 0;
    let resizeTimer;

    function renderSet() {
      const start = setIndex * perSet;
      const slice = IMAGES.slice(start, start + perSet);
      grid.innerHTML = slice
        .map(
          (im, i) => `
        <figure class="gitem" data-g="${start + i}">
          <img src="${im.s}" alt="${im.t}" loading="lazy">
          <figcaption class="gcap"><h3>${im.t}</h3><p>${im.d}</p></figcaption>
        </figure>
      `
        )
        .join('');

      grid.querySelectorAll('.gitem').forEach((el) => {
        el.addEventListener('click', () => {
          globalIndex = Number(el.dataset.g) || 0;
          playClone(clickBase, CLICK_VOL);
          openLB(globalIndex);
        });
      });

      if (perSet === 1) {
        const currentImageNumber = setIndex * perSet + 1;
        gLabel.textContent = `Image ${currentImageNumber} / ${total}`;
      } else {
        gLabel.textContent = `Set ${setIndex + 1} / ${totalSets}`;
      }

      gSets.innerHTML = '';
      if (perSet === 3) {
        gSets.style.display = 'flex';
        for (let i = 0; i < totalSets; i++) {
          const b = document.createElement('button');
          b.className = 'gset' + (i === setIndex ? ' active' : '');
          b.textContent = i + 1;
          b.addEventListener('mouseenter', () => playClone(hoverBase, HOVER_VOL));
          b.addEventListener('click', () => {
            playClone(clickBase, CLICK_VOL);
            setIndex = i;
            renderSet();
          });
          gSets.appendChild(b);
        }
      } else {
        gSets.style.display = 'none';
      }
    }

    function recalcSetsForResize() {
      const newPerSet = window.innerWidth <= 900 ? 1 : 3;
      if (newPerSet !== perSet) {
        perSet = newPerSet;
        totalSets = Math.ceil(total / perSet);
        setIndex = Math.floor(globalIndex / perSet);
        renderSet();
      }
    }

    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(recalcSetsForResize, 150);
    });

    function nextSet() {
      setIndex = (setIndex + 1) % totalSets;
      renderSet();
    }

    function prevSet() {
      setIndex = (setIndex - 1 + totalSets) % totalSets;
      renderSet();
    }

    if (gNext && gPrev) {
      gNext.addEventListener('mouseenter', () => playClone(hoverBase, HOVER_VOL));
      gPrev.addEventListener('mouseenter', () => playClone(hoverBase, HOVER_VOL));
      gNext.addEventListener('click', () => {
        playClone(clickBase, CLICK_VOL);
        nextSet();
      });
      gPrev.addEventListener('click', () => {
        playClone(clickBase, CLICK_VOL);
        prevSet();
      });
    }

    const agreeBox = document.getElementById('agreeMars');
    const submitBtn = document.querySelector('#contactForm button[type="submit"]');

    if (agreeBox && submitBtn && agreeBox.parentElement) {
      agreeBox.parentElement.addEventListener('mouseenter', () => {
        playClone(hoverBase, HOVER_VOL);
      });

      submitBtn.addEventListener('mouseenter', () => {
        playClone(hoverBase, HOVER_VOL);
      });

      agreeBox.addEventListener('change', () => {
        playClone(clickBase, CLICK_VOL);
      });

      submitBtn.addEventListener('click', () => {
        playClone(clickBase, CLICK_VOL);
      });
    }

    function openLB(idx) {
      playClone(clickBase, CLICK_VOL);
      syncSetFor(idx);
      paintLB(idx);
      if (dlg && !dlg.open) dlg.showModal();
      new Image().src = IMAGES[(idx + 1) % total].s;
      new Image().src = IMAGES[(idx - 1 + total) % total].s;
    }

    function paintLB(idx) {
      const it = IMAGES[idx];
      if (!lbImg || !lbTitle || !lbDesc) return;
      lbImg.src = it.s;
      lbImg.alt = it.t;
      lbTitle.textContent = it.t;
      lbDesc.textContent = it.d;
    }

    function syncSetFor(idx) {
      const targetSet = Math.floor(idx / perSet);
      if (targetSet !== setIndex) {
        setIndex = targetSet;
        renderSet();
      }
    }

    function lbNextImg() {
      globalIndex = (globalIndex + 1) % total;
      paintLB(globalIndex);
      syncSetFor(globalIndex);
    }

    function lbPrevImg() {
      globalIndex = (globalIndex - 1 + total) % total;
      paintLB(globalIndex);
      syncSetFor(globalIndex);
    }

    if (closeBtn && dlg) {
      closeBtn.addEventListener('click', () => dlg.close());
      dlg.addEventListener('click', (e) => {
        if (!e.target.closest('.gbox')) dlg.close();
      });
    }

    window.addEventListener('keydown', (e) => {
      if (!dlg) return;

      if (!dlg.open) {
        if (e.key === 'ArrowRight') {
          playClone(clickBase, CLICK_VOL);
          nextSet();
        }
        if (e.key === 'ArrowLeft') {
          playClone(clickBase, CLICK_VOL);
          prevSet();
        }
        return;
      }

      if (e.key === 'Escape') {
        playClone(clickBase, CLICK_VOL);
        dlg.close();
      }
      if (e.key === 'ArrowRight') {
        playClone(clickBase, CLICK_VOL);
        lbNextImg();
      }
      if (e.key === 'ArrowLeft') {
        playClone(clickBase, CLICK_VOL);
        lbPrevImg();
      }
    });

    if (dlBtn) {
      dlBtn.addEventListener('click', () => {
        const name = IMAGES[globalIndex].s.split('/').pop();
        const a = document.createElement('a');
        a.href = IMAGES[globalIndex].s;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        a.remove();
      });
    }

    if (lbNext && lbPrev) {
      lbNext.addEventListener('mouseenter', () => playClone(hoverBase, HOVER_VOL));
      lbPrev.addEventListener('mouseenter', () => playClone(hoverBase, HOVER_VOL));

      lbNext.addEventListener('click', () => {
        playClone(clickBase, CLICK_VOL);
        lbNextImg();
      });
      lbPrev.addEventListener('click', () => {
        playClone(clickBase, CLICK_VOL);
        lbPrevImg();
      });
    }

    renderSet();
  })();

  /* ===== VIBE COUNTERS ===== */
  (function () {
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    function formatNumber(n, pattern) {
      if (!pattern) return n.toLocaleString('en-US');
      const s = String(Math.floor(n));
      const width = pattern.length;
      const padded = s.padStart(width, '0');
      return padded.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    function animateCounter(el) {
      const target = Number(el.dataset.target || '0');
      const suffix = el.dataset.suffix || '';
      const pattern = el.dataset.format || '';
      const duration = Math.max(900, Math.min(2200, 300 + target * 0.08));
      const start = performance.now();

      function tick(now) {
        const t = Math.min(1, (now - start) / duration);
        const eased = easeOutCubic(t);
        const value = Math.floor(eased * target);
        el.textContent = formatNumber(value, pattern) + suffix;
        if (t < 1) requestAnimationFrame(tick);
        else {
          el.textContent = formatNumber(target, pattern) + suffix;
          if (el.dataset.jitter === 'true') startJitter(el, target, suffix, pattern);
        }
      }

      requestAnimationFrame(tick);
    }

    function startJitter(el, base, suffix, pattern) {
      let v = base;
      const MIN = 15;
      const MAX = 21;

      setInterval(() => {
        const delta = Math.random() < 0.5 ? -1 : 1;
        v = v + delta;
        if (v > MAX) v = MAX;
        if (v < MIN) v = MIN;
        el.textContent = formatNumber(v, pattern) + suffix;
      }, 1200 + Math.random() * 900);
    }

    const els = [...document.querySelectorAll('.vibe-counter')];
    const seen = new WeakSet();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !seen.has(e.target)) {
            seen.add(e.target);
            animateCounter(e.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    els.forEach((el) => io.observe(el));
  })();

  /* Social icons: make inert (no reload / no navigation) */
  document.querySelectorAll('.socials a').forEach((a) => {
    a.addEventListener('click', (e) => e.preventDefault());
  });

  /* ===== MOBILE HAMBURGER ===== */
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navOverlay = document.getElementById('navOverlay');

  if (menuToggle && navMenu && navOverlay) {
    function openMenu() {
      navMenu.classList.add('open');
      menuToggle.classList.add('is-open');
      menuToggle.setAttribute('aria-expanded', 'true');
      navOverlay.hidden = false;
      document.documentElement.style.overflow = 'hidden';
    }

    function closeMenu() {
      navMenu.classList.remove('open');
      menuToggle.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      navOverlay.hidden = true;
      document.documentElement.style.overflow = '';
    }

    menuToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.contains('open');
      playClone(clickBase, 0.35);
      isOpen ? closeMenu() : openMenu();
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        closeMenu();
      }
    });

    document.querySelectorAll('#navMenu .nav-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          closeMenu();
        }
      });
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 900 && navMenu.classList.contains('open')) {
        closeMenu();
      }
    });
  }
}
