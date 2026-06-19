// Registering ScrollTrigger Engine Extension explicitly
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  // --- 0. Theme Toggle Memory Engine ---
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;
  const themeIcon = themeToggle.querySelector("i");

  // Check Local Storage
  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme) {
    body.className = savedTheme;
    themeIcon.className = savedTheme === "light-theme" ? "fa-solid fa-moon" : "fa-solid fa-sun";
    themeToggle.setAttribute("aria-pressed", savedTheme === "light-theme" ? "true" : "false");
  }

  themeToggle.addEventListener("click", () => {
    if (body.classList.contains("dark-theme")) {
      body.classList.replace("dark-theme", "light-theme");
      themeIcon.className = "fa-solid fa-moon";
      localStorage.setItem("portfolio-theme", "light-theme");
      themeToggle.setAttribute("aria-pressed", "true");
    } else {
      body.classList.replace("light-theme", "dark-theme");
      themeIcon.className = "fa-solid fa-sun";
      localStorage.setItem("portfolio-theme", "dark-theme");
      themeToggle.setAttribute("aria-pressed", "false");
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
      ".magnetic, .nav-item, .project-card, .btn, .channel-row, .skill-pill, .language-card, input, textarea, button"
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
    
    const magneticElements = document.querySelectorAll(".magnetic");
    magneticElements.forEach((el) => {
      const newEl = el.cloneNode(true);
      if (el.parentNode) {
        el.parentNode.replaceChild(newEl, el);
      }
      
      newEl.addEventListener("mousemove", (e) => {
        const boundingBox = newEl.getBoundingClientRect();
        const deltaX = e.clientX - boundingBox.left - boundingBox.width / 2;
        const deltaY = e.clientY - boundingBox.top - boundingBox.height / 2;

        gsap.to(newEl, {
          x: deltaX * 0.45,
          y: deltaY * 0.45,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      newEl.addEventListener("mouseleave", () => {
        gsap.to(newEl, { x: 0, y: 0, duration: 0.4, ease: "elastic.out(1, 0.3)" });
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
      gsap.from([subtitle, title], {
        scrollTrigger: {
          trigger: header,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 25,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
      });
    }

    if (title) {
      gsap.fromTo(title, 
        { "--underline-scale": 0 },
        {
          scrollTrigger: {
            trigger: header,
            start: "top 75%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse"
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
  gsap.from(".gsap-trigger-card", {
    scrollTrigger: {
      trigger: ".about-content",
      start: "top 80%",
    },
    opacity: 0,
    x: -30,
    duration: 1,
    ease: "power3.out",
  });

  // --- 8. Skill Inventory Progressive Capsule Shutter Shimmer ---
  if (document.querySelector(".skills")) {
    gsap.from(".gsap-pill", {
      scrollTrigger: {
        trigger: ".skills-grid",
        start: "top 85%", 
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 40,
      stagger: 0.1,
      duration: 0.8,
      ease: "power2.out",
      clearProps: "transform,opacity",
      onComplete: () => {
        document.querySelectorAll(".progress").forEach((bar) => {
          gsap.to(bar, { width: bar.getAttribute("data-width"), duration: 1.4, ease: "power3.out" });
        });
      },
    });
  }

  // --- 8b. Languages Micro-structural Reveal Frame ---
  gsap.from(".gsap-lang", {
    scrollTrigger: { trigger: ".languages-grid", start: "top 85%" },
    opacity: 0, 
    y: 30, 
    stagger: 0.15, 
    duration: 0.9, 
    ease: "power3.out",
    clearProps: "transform,opacity"
  });

  // --- 8c. Education Section Reveal ---
  gsap.from(".edu-card", {
    scrollTrigger: {
      trigger: ".education-grid",
      start: "top 85%"
    },
    opacity: 0,
    y: 30,
    stagger: 0.2,
    duration: 0.8,
    ease: "power2.out"
  });

  // --- 9. Project Gallery Animated Layered Swipe Deck Framework ---
  const cards = gsap.utils.toArray(".gsap-onic-card");
  
  if (cards.length > 0) {
    // 1. Initial Stack Setup Configuration Loop
    cards.forEach((card, index) => {
      if (index > 0) {
        gsap.set(card, {
          y: index * 15,
          scale: 1 - index * 0.04,
          rotation: index % 2 === 0 ? index * 1.5 : index * -1.5,
          zIndex: cards.length - index
        });
      } else {
        gsap.set(card, { zIndex: cards.length, rotation: -1 });
      }
    });

    // 2. Continuous Scroll Timeline ScrollTrigger Construction
    const swipeTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".projects-slider-deck",
        start: "top 20%",
        end: `+=${cards.length * 400}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1
      }
    });

    // 3. Sequential Swipe Animation Assembly Lines
    cards.forEach((card, index) => {
      if (index < cards.length - 1) {
        swipeTimeline.to(card, {
          x: index % 2 === 0 ? "-70vw" : "70vw",
          rotation: index % 2 === 0 ? -15 : 15,
          opacity: 0,
          duration: 1
        }, `card-${index}`)
        
        .to(cards.slice(index + 1), {
          y: (i) => i * 15,
          scale: (i) => 1 - i * 0.04,
          rotation: (i) => (i + index) % 2 === 0 ? 1.5 : -1.5,
          duration: 0.6,
          ease: "power1.out"
        }, `card-${index}+=0.2`);
      }
    });
  }

  // --- 10. Contact Module Split-Asymmetric Framework Entry Placement ---
  if (document.querySelector(".contact-layout")) {
    gsap.from(".gsap-contact-left .channel-row", {
      scrollTrigger: { trigger: ".contact-layout", start: "top 80%" },
      opacity: 0, x: -40, stagger: 0.12, duration: 0.8, ease: "power2.out",
    });
    gsap.from(".gsap-contact-right", {
      scrollTrigger: { trigger: ".contact-layout", start: "top 80%" },
      opacity: 0, x: 40, duration: 0.9, ease: "power2.out",
    });
  }

  // --- 11. FIXED: Cinematic Mobile Navigation Menu Toggle Engine ---
  const menuToggle = document.getElementById("menuToggle");
  const mobileNavWrapper = document.querySelector(".nav-wrapper");
  let isMenuOpen = false;

  function openMenu() {
    isMenuOpen = true;
    menuToggle.classList.add("active");
    mobileNavWrapper.classList.add("active");
    menuToggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden"; // Prevent background scroll
    
    // Animate nav items in
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
    document.body.style.overflow = ""; // Restore scroll
    
    // Reset nav items
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
    // Toggle menu on hamburger click
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Close menu when a nav item is clicked (mobile only)
    navItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        if (isMenuOpen && !isDesktop()) {
          // Let the link navigation happen, then close
          setTimeout(() => {
            closeMenu();
          }, 100);
        }
      });
    });

    // Close menu when clicking outside on mobile
    document.addEventListener("click", (e) => {
      if (isMenuOpen && !isDesktop()) {
        const clickedInsideNav = mobileNavWrapper.contains(e.target);
        const clickedOnToggle = menuToggle.contains(e.target);
        
        if (!clickedInsideNav && !clickedOnToggle) {
          closeMenu();
        }
      }
    });

    // Close menu on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && isMenuOpen) {
        closeMenu();
        menuToggle.focus(); // Return focus to hamburger
      }
    });

    // Handle resize events
    window.addEventListener("resize", () => {
      if (isDesktop() && isMenuOpen) {
        closeMenu();
      }
      
      // Re-init magnetic on desktop
      initMagnetic();
      
      // Update bubble position if on desktop
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
      
      // Show loading state
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
          // Success
          submitBtn.innerHTML = 'SENT! <i class="fa-solid fa-check"></i>';
          submitBtn.style.background = '#4CAF50';
          contactForm.reset();
          
          // Reset button after 3 seconds
          setTimeout(() => {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
          }, 3000);
        } else {
          throw new Error('Failed to send');
        }
      } catch (error) {
        // Error
        submitBtn.innerHTML = 'TRY AGAIN <i class="fa-solid fa-exclamation-triangle"></i>';
        submitBtn.style.background = '#f44336';
        submitBtn.disabled = false;
        
        // Reset button after 3 seconds
        setTimeout(() => {
          submitBtn.innerHTML = originalBtnText;
          submitBtn.style.background = '';
        }, 3000);
      }
    });
  }

});