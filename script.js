// Registering ScrollTrigger Engine Extension explicitly
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  // --- 0. Theme Toggle Memory Engine ---
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;
  const themeIcon = themeToggle.querySelector("i");

  // Synchronize UI elements with the theme applied by the inline script
  const isLightTheme = body.classList.contains("light-theme");
  themeIcon.className = isLightTheme ? "fa-solid fa-moon" : "fa-solid fa-sun";
  themeToggle.setAttribute("aria-pressed", isLightTheme ? "true" : "false");
  
  // Explicitly sync the initial screen-reader accessibility labels on boot
  themeToggle.setAttribute("aria-label", isLightTheme ? "Switch to Dark Mode" : "Switch to Light Mode");

  themeToggle.addEventListener("click", () => {
    if (body.classList.contains("dark-theme")) {
      body.classList.replace("dark-theme", "light-theme");
      themeIcon.className = "fa-solid fa-moon";
      localStorage.setItem("portfolio-theme", "light-theme");
      themeToggle.setAttribute("aria-pressed", "true");
      themeToggle.setAttribute("aria-label", "Switch to Dark Mode");
    } else {
      body.classList.replace("light-theme", "dark-theme");
      themeIcon.className = "fa-solid fa-sun";
      localStorage.setItem("portfolio-theme", "dark-theme");
      themeToggle.setAttribute("aria-pressed", "false");
      themeToggle.setAttribute("aria-label", "Switch to Light Mode");
    }
  });

  // --- 1. Custom Kinetic Physics Cursor Core ---
  const cursorBall = document.querySelector(".custom-cursor");
  const cursorDot = document.querySelector(".custom-cursor-dot");
  
  // Only init cursor if on a device with a fine pointer (mouse)
  if (window.matchMedia("(pointer: fine)").matches && cursorBall && cursorDot) {
    window.addEventListener("mousemove", (e) => {
      gsap.to(cursorDot, { x: e.clientX, y: e.clientY, duration: 0 });
      gsap.to(cursorBall, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power2.out",
      });
    });

    const interactiveTargets = document.querySelectorAll(
      ".magnetic, .nav-item, .project-card, .btn, .channel-row, .skill-card, .language-card, input, textarea, button"
    );
    interactiveTargets.forEach((target) => {
      target.addEventListener("mouseenter", () => cursorBall.classList.add("cursor-hover-active"));
      target.addEventListener("mouseleave", () => cursorBall.classList.remove("cursor-hover-active"));
    });
  }

  // --- 2. Kinetic Magnetic Interaction Core ---
  const isDesktop = () => window.innerWidth > 992;
  
  function initMagnetic() {
    if (!isDesktop()) return;
    
    const magneticElements = document.querySelectorAll(".magnetic:not(.magnetic-init)");
    magneticElements.forEach((el) => {
      el.classList.add("magnetic-init");
      
      el.addEventListener("mousemove", (e) => {
        const boundingBox = el.getBoundingClientRect();
        const deltaX = e.clientX - boundingBox.left - boundingBox.width / 2;
        const deltaY = e.clientY - boundingBox.top - boundingBox.height / 2;

        gsap.to(el, {
          x: deltaX * 0.45,
          y: deltaY * 0.45,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      el.addEventListener("mouseleave", () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.4, ease: "elastic.out(1, 0.3)" });
      });
    });
  }
  
  initMagnetic();
  
  // --- 3. Premium Interactive Moving Slider Navigation Dock Engine ---
  const navWrapper = document.querySelector(".nav-wrapper");
  const navBubble = document.querySelector(".nav-active-bubble");
  const navItems = document.querySelectorAll(".nav-item");
  let currentActiveItem = null;

  function recalculateBubble(target) {
    if (!target || !isDesktop()) {
      if (navWrapper) navWrapper.classList.remove("has-active");
      return;
    }
    const wrapperRect = navWrapper.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    const calculatedLeft = targetRect.left - wrapperRect.left;
    const calculatedWidth = targetRect.width;

    navWrapper.classList.add("has-active");
    if (navBubble) {
      navBubble.style.left = `${calculatedLeft}px`;
      navBubble.style.width = `${calculatedWidth}px`;
    }
  }

  navItems.forEach((item) => {
    item.addEventListener("mouseenter", () => recalculateBubble(item));
    item.addEventListener("mouseleave", () => {
      if (currentActiveItem && isDesktop()) {
        recalculateBubble(currentActiveItem);
      } else {
        if (navWrapper) navWrapper.classList.remove("has-active");
      }
    });
  });

  // --- 4. Cinematic Hero Entry Sequence & Background Parallax ---
  // Hero text - NO reverse, plays once only
  gsap.from(".gsap-reveal", {
    y: "115%",
    duration: 1.2,
    stagger: 0.15,
    ease: "power4.out",
    delay: 0.2,
  });

  gsap.from(".gsap-fade-up", {
    opacity: 0,
    y: 30,
    duration: 1,
    ease: "power3.out",
    delay: 0.6,
    clearProps: "all",
  });

  // Parallax Hero Background
  gsap.to(".hero-bg", {
    yPercent: 20,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });

  // --- 5. Section Header Entry Mechanics & Dynamic Underlines ---
  const sectionHeaders = document.querySelectorAll(".section-header");

  sectionHeaders.forEach((header) => {
    const title = header.querySelector(".section-title");
    const subtitle = header.querySelector(".section-subtitle");

    if (subtitle && title) {
      gsap.fromTo([subtitle, title], 
        { opacity: 0, y: 25 },
        {
          scrollTrigger: {
            trigger: header,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
        }
      );
    }

    if (title) {
      gsap.fromTo(title, 
        { "--underline-scale": 0 },
        {
          scrollTrigger: {
            trigger: header,
            start: "top 75%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          },
          "--underline-scale": 1,
          duration: 0.8,
          ease: "power3.out"
        }
      );
    }
  });

  // --- 6. Smart Viewport Intersection Active Track Routine ---
  document.querySelectorAll("section").forEach((section) => {
    const sectionId = section.getAttribute("id");
    const correlatedLink = document.querySelector(`.nav-item[href="#${sectionId}"]`);

    if (correlatedLink) {
      ScrollTrigger.create({
        trigger: section,
        start: "top 40%",
        end: "bottom 40%",
        onToggle: (self) => {
          if (self.isActive && isDesktop()) {
            navItems.forEach((link) => link.classList.remove("active"));
            correlatedLink.classList.add("active");
            currentActiveItem = correlatedLink;
            recalculateBubble(correlatedLink);
          }
        },
      });
    }
  });

  // --- 7. About Biography Content Reveal ---
  gsap.fromTo(".gsap-trigger-card", 
    { opacity: 0, x: -30 },
    {
      scrollTrigger: {
        trigger: ".about-content",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "power3.out",
    }
  );

  // --- 8. MODERN SKILL CARDS ANIMATION (fully reversible) ---
  if (document.querySelector(".skills")) {
    // Animate category headers - plays on scroll down, reverses on scroll up
    gsap.fromTo(".category-header",
      { opacity: 0, x: -30 },
      {
        scrollTrigger: {
          trigger: ".skills-showcase",
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        opacity: 1,
        x: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: "power2.out",
      }
    );

    // Animate skill cards - plays on scroll down, reverses on scroll up
    gsap.fromTo(".skill-card",
      { opacity: 0, y: 50 },
      {
        scrollTrigger: {
          trigger: ".skills-showcase",
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        opacity: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: "power3.out",
      }
    );

    // Animate each progress bar with its OWN ScrollTrigger, set up once
    // (not nested inside an onComplete) so it fills on scroll down and
    // un-fills cleanly every single time the user scrolls back up.
    document.querySelectorAll(".skill-card").forEach((card) => {
      const progressBar = card.querySelector(".skill-progress-bar");
      const progress = card.dataset.progress || "0";

      if (progressBar) {
        gsap.fromTo(progressBar,
          { width: "0%" },
          {
            width: `${progress}%`,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }
    });
  }

  // --- 8b. Languages - Pinned Cards Animation (fully reversible) ---
  const langCards = document.querySelectorAll('.lang-card');
  const langSection = document.querySelector('.languages');

  if (langCards.length && langSection) {

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.pinboard',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
        invalidateOnRefresh: true,
      }
    });

    // Cards drop/fade/rotate into place on scroll down, and reverse back
    // out on scroll up. Rotation is driven by GSAP itself (using each
    // card's data-rotation attribute) instead of being force-reset
    // afterward, so there is always a valid "from" state to reverse to.
    tl.fromTo(langCards,
      {
        opacity: 0,
        y: 60,
        scale: 0.9,
        rotation: 0,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotation: (i, target) => parseFloat(target.dataset.rotation) || 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'back.out(1.7)',
      }
    );

    // Thumbtacks drop in on scroll down, lift away on scroll up.
    const tacks = document.querySelectorAll('.thumbtack');
    tl.fromTo(tacks,
      { y: -50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.15,
        ease: 'bounce.out',
      },
      '-=0.4'
    );
  }

  // --- 8c. Education Section Reveal - FIXED for both cards ---
  const eduCards = document.querySelectorAll(".edu-card");

  if (eduCards.length > 0) {
    // Reset any existing GSAP properties
    eduCards.forEach(card => {
      gsap.set(card, { 
        opacity: 0, 
        y: 30,
        clearProps: "all"
      });
    });

    // Create a single timeline for all education cards
    const eduTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".education-grid",
        start: "top 85%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
      defaults: {
        duration: 0.8,
        ease: "power3.out"
      }
    });

    // Animate each card with stagger
    eduTl
      .fromTo(eduCards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out"
        }
      );
  }

  // --- 9. Project Gallery - FULLY FIXED for Mobile, Tablet & Desktop ---
  const track = document.querySelector(".projects-slider-deck");
  const cards = gsap.utils.toArray(".gsap-onic-card");
  const scrollWrapper = document.querySelector(".projects-scroll-wrapper");
  const pinContainer = document.querySelector(".projects-pin-container");
  
  if (track && cards.length > 0 && scrollWrapper) {
    
    // Clean up any previous ScrollTriggers tied to projects
    function killAllProjectTriggers() {
      ScrollTrigger.getAll().forEach(st => {
        const triggerEl = st.vars.trigger;
        if (
          triggerEl === scrollWrapper ||
          triggerEl === track ||
          triggerEl === pinContainer ||
          (st.vars.containerAnimation)
        ) {
          st.kill();
        }
      });
    }

    // Unpin the pin container (in case it was pinned before)
    function unpinContainer() {
      if (pinContainer) {
        ScrollTrigger.getAll().forEach(st => {
          if (st.vars.pin && st.vars.pin === pinContainer) {
            st.kill();
          }
        });
        // Broaden cleanup target properties to wash out remaining desktop calculations on resize
        gsap.set([track, cards, pinContainer], { clearProps: "all" });
      }
    }

    // DESKTOP: GSAP horizontal scroll with pinning
    function setupDesktopProjects() {
      killAllProjectTriggers();
      unpinContainer();
      
      // Reset track position
      gsap.set(track, { clearProps: "transform" });
      
      // Ensure native scroll is disabled on desktop wrapper
      scrollWrapper.style.overflow = "hidden";
      scrollWrapper.style.overflowX = "hidden";
      
      const scrollDistance = track.scrollWidth - window.innerWidth;
      
      // If content fits, just animate cards in
      if (scrollDistance <= 0) {
        cards.forEach((card, i) => {
          gsap.set(card, { clearProps: "all" });
          gsap.fromTo(card, 
            { opacity: 0, y: 40 },
            {
              opacity: 1, y: 0,
              duration: 0.6,
              delay: i * 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
              }
            }
          );
        });
        return;
      }

      // Create the horizontal scroll timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scrollWrapper,
          start: "center center",
          end: () => `+=${scrollDistance + window.innerHeight * 0.5}`,
          pin: pinContainer,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      });

      tl.to(track, {
        x: () => -scrollDistance,
        ease: "none",
        duration: 1
      });

      // Animate cards as they come into view during horizontal scroll
      cards.forEach((card) => {
        gsap.fromTo(card,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: tl,
              start: "left 92%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }

    // MOBILE/TABLET: No horizontal scroll, cards stack vertically naturally
    function setupMobileProjects() {
      killAllProjectTriggers();
      unpinContainer();
      
      // Clear any GSAP transforms and properties completely
      gsap.set([track, cards, pinContainer], { clearProps: "all" });
      
      // Ensure no overflow scroll (CSS handles vertical stacking)
      scrollWrapper.style.overflow = "visible";
      scrollWrapper.style.overflowX = "visible";
      scrollWrapper.style.overflowY = "visible";
      track.style.transform = "";
      
      // Reset all cards to hidden state
      cards.forEach(card => {
        card.style.opacity = "0";
        card.style.transform = "translateY(30px) scale(0.95)";
        card.style.transition = "opacity 0.5s ease, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
      });

      // Create a single IntersectionObserver for the projects section
      const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // When projects section is visible, animate all cards with stagger
            cards.forEach((card, i) => {
              setTimeout(() => {
                card.style.opacity = "1";
                card.style.transform = "translateY(0) scale(1)";
              }, i * 150);
            });
            // Don't unobserve - keep watching for reverse
          } else {
            // Reverse the animation when scrolling up
            cards.forEach((card) => {
              card.style.opacity = "0";
              card.style.transform = "translateY(30px) scale(0.95)";
            });
          }
        });
      }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
      });

      const projectsSection = document.getElementById("projects");
      if (projectsSection) {
        sectionObserver.observe(projectsSection);
      }

      // Also reveal cards individually if they enter viewport (safety net)
      const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0) scale(1)";
          } else {
            entry.target.style.opacity = "0";
            entry.target.style.transform = "translateY(30px) scale(0.95)";
          }
        });
      }, {
        threshold: 0.2,
        rootMargin: "0px 50px 0px 0px"
      });

      cards.forEach(card => {
        cardObserver.observe(card);
      });
    }

    // Check viewport and apply correct setup
    function checkAndSetup() {
      const isMobile = window.innerWidth <= 992;
      
      if (isMobile) {
        setupMobileProjects();
      } else {
        setupDesktopProjects();
      }
    }

    // Initial setup
    checkAndSetup();

    // Debounced resize handler
    let resizeDebounce;
    window.addEventListener("resize", () => {
      clearTimeout(resizeDebounce);
      resizeDebounce = setTimeout(() => {
        const wasMobile = scrollWrapper.style.overflow === "auto" || scrollWrapper.style.overflowX === "auto";
        const isMobileNow = window.innerWidth <= 992;
        
        if (wasMobile !== isMobileNow) {
          checkAndSetup();
        }
      }, 400);
    });

    // Handle orientation change on mobile
    window.addEventListener("orientationchange", () => {
      setTimeout(() => {
        if (window.innerWidth <= 992) {
          setupMobileProjects();
        }
      }, 500);
    });
  }

  // --- 10. Contact Module Split-Asymmetric Framework Entry Placement ---
  if (document.querySelector(".contact-layout")) {
    gsap.fromTo(".gsap-contact-left .channel-row",
      { opacity: 0, x: -40 },
      {
        scrollTrigger: { 
          trigger: ".contact-layout", 
          start: "top 80%", 
          end: "bottom 20%",
          toggleActions: "play none none reverse" 
        },
        opacity: 1, 
        x: 0, 
        stagger: 0.12, 
        duration: 0.8, 
        ease: "power2.out",
      }
    );
    gsap.fromTo(".gsap-contact-right",
      { opacity: 0, x: 40 },
      {
        scrollTrigger: { 
          trigger: ".contact-layout", 
          start: "top 80%", 
          end: "bottom 20%",
          toggleActions: "play none none reverse" 
        },
        opacity: 1, 
        x: 0, 
        duration: 0.9, 
        ease: "power2.out",
      }
    );
  }

  // --- 11. Cinematic Mobile Navigation Menu Toggle Engine ---
  const menuToggle = document.getElementById("menuToggle");
  const mobileNavWrapper = document.querySelector(".nav-wrapper");
  let isMenuOpen = false;

  function openMenu() {
    isMenuOpen = true;
    menuToggle.classList.add("active");
    mobileNavWrapper.classList.add("active");
    menuToggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    
    gsap.to(".nav-item", {
      y: 0, 
      opacity: 1, 
      duration: 0.5, 
      stagger: 0.08, 
      ease: "power3.out",
      delay: 0.15
    });
  }

  function closeMenu() {
    isMenuOpen = false;
    menuToggle.classList.remove("active");
    mobileNavWrapper.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    
    gsap.to(".nav-item", { 
      y: 30, 
      opacity: 0, 
      duration: 0.2,
      ease: "power2.in"
    });
  }

  function toggleMenu() {
    if (isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  if (menuToggle && mobileNavWrapper) {
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    navItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        if (isMenuOpen && !isDesktop()) {
          setTimeout(() => {
            closeMenu();
          }, 100);
        }
      });
    });

    document.addEventListener("click", (e) => {
      if (isMenuOpen && !isDesktop()) {
        const clickedInsideNav = mobileNavWrapper.contains(e.target);
        const clickedOnToggle = menuToggle.contains(e.target);
        
        if (!clickedInsideNav && !clickedOnToggle) {
          closeMenu();
        }
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && isMenuOpen) {
        closeMenu();
        menuToggle.focus();
      }
    });

    window.addEventListener("resize", () => {
      if (isDesktop() && isMenuOpen) {
        closeMenu();
      }
      
      initMagnetic();
      
      if (currentActiveItem && isDesktop()) {
        recalculateBubble(currentActiveItem);
      } else if (!isDesktop() && navWrapper) {
        navWrapper.classList.remove("has-active");
      }
    });
  }

  // --- 12. Contact Form Submission Handler ---
  const contactForm = document.querySelector(".contact-form");
  
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector(".form-submit-btn");
      const originalBtnText = submitBtn.innerHTML;
      
      submitBtn.innerHTML = 'SENDING... <i class="fa-solid fa-spinner fa-spin"></i>';
      submitBtn.disabled = true;
      
      try {
        const formData = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
          method: "POST",
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (response.ok) {
          submitBtn.innerHTML = 'SENT! <i class="fa-solid fa-check"></i>';
          submitBtn.style.background = '#4CAF50';
          contactForm.reset();
          
          setTimeout(() => {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
          }, 3000);
        } else {
          throw new Error('Failed to send');
        }
      } catch (error) {
        submitBtn.innerHTML = 'TRY AGAIN <i class="fa-solid fa-exclamation-triangle"></i>';
        submitBtn.style.background = '#f44336';
        submitBtn.disabled = false;
        
        setTimeout(() => {
          submitBtn.innerHTML = originalBtnText;
          submitBtn.style.background = '';
        }, 3000);
      }
    });
  }
});