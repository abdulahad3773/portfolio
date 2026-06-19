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
  }

  themeToggle.addEventListener("click", () => {
    if (body.classList.contains("dark-theme")) {
      body.classList.replace("dark-theme", "light-theme");
      themeIcon.className = "fa-solid fa-moon";
      localStorage.setItem("portfolio-theme", "light-theme");
    } else {
      body.classList.replace("light-theme", "dark-theme");
      themeIcon.className = "fa-solid fa-sun";
      localStorage.setItem("portfolio-theme", "dark-theme");
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
  // Apply magnetic effect only on larger screens to prevent mobile layout breaking
  if (window.innerWidth > 992) {
    const magneticElements = document.querySelectorAll(".magnetic");
    magneticElements.forEach((el) => {
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

  // --- 3. Premium Interactive Moving Slider Navigation Dock Engine ---
  const navWrapper = document.querySelector(".nav-wrapper");
  const navBubble = document.querySelector(".nav-active-bubble");
  const navItems = document.querySelectorAll(".nav-item");
  let currentActiveItem = null;

  function recalculateBubble(target) {
    if (!target || window.innerWidth <= 992) {
      navWrapper.classList.remove("has-active");
      return;
    }
    const wrapperRect = navWrapper.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    const calculatedLeft = targetRect.left - wrapperRect.left;
    const calculatedWidth = targetRect.width;

    navWrapper.classList.add("has-active");
    navBubble.style.left = `${calculatedLeft}px`;
    navBubble.style.width = `${calculatedWidth}px`;
  }

  navItems.forEach((item) => {
    item.addEventListener("mouseenter", () => recalculateBubble(item));
    item.addEventListener("mouseleave", () => {
      if (currentActiveItem) {
        recalculateBubble(currentActiveItem);
      } else {
        navWrapper.classList.remove("has-active");
      }
    });
  });

  window.addEventListener("resize", () => {
    if (currentActiveItem && window.innerWidth > 992) {
      recalculateBubble(currentActiveItem);
    } else {
      navWrapper.classList.remove("has-active");
    }
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
          if (self.isActive && window.innerWidth > 992) {
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
      clearProps: "transform,opacity", // Hands control back to CSS for hover effects
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
    clearProps: "transform,opacity" // Hands control back to CSS for hover effects
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

  // --- 9. Project Gallery Structural Sequence Grid Flow ---
 // --- 9. Project Gallery Animated Layered Swipe Deck Framework ---
  const cards = gsap.utils.toArray(".gsap-onic-card");
  
  if (cards.length > 0) {
    // 1. Initial Stack Setup Configuration Loop
    cards.forEach((card, index) => {
      if (index > 0) {
        // Offset card placements depth layers
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
        end: `+=${cards.length * 400}`, // Creates dynamic scroll duration space
        pin: true,                      // Pins the section during swiping sequence
        scrub: 1,                       // Link animation directly to smooth scrolling
        anticipatePin: 1
      }
    });

    // 3. Sequential Swipe Animation Assembly Lines
    cards.forEach((card, index) => {
      if (index < cards.length - 1) {
        // Animate out the active card
        swipeTimeline.to(card, {
          x: index % 2 === 0 ? -window.innerWidth * 0.7 : window.innerWidth * 0.7,
          rotation: index % 2 === 0 ? -15 : 15,
          opacity: 0,
          duration: 1
        }, `card-${index}`)
        
        // Pull forward the remaining cards behind it simultaneously
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

  // --- 11. Cinematic Mobile Navigation Menu Toggle Engine ---
  const menuToggle = document.getElementById("menuToggle");
  const mobileNavWrapper = document.querySelector(".nav-wrapper");
  let isMenuOpen = false;

  if (menuToggle && mobileNavWrapper) {
    menuToggle.addEventListener("click", () => {
      isMenuOpen = !isMenuOpen;
      menuToggle.classList.toggle("active");
      mobileNavWrapper.classList.toggle("active");

      if (isMenuOpen && window.innerWidth <= 992) {
        // Staggered reveal for mobile links
        gsap.to(".nav-item", {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out", delay: 0.2
        });
      } else {
        // Reset state
        gsap.to(".nav-item", { y: 30, opacity: 0, duration: 0.2 });
      }
    });

    // Close menu on item click
    navItems.forEach((item) => {
      item.addEventListener("click", () => {
        if (isMenuOpen && window.innerWidth <= 992) {
          menuToggle.click();
        }
      });
    });
  }
});