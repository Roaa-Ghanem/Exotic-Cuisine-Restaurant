// ==================== RESTAURANT WEBSITE JAVASCRIPT ====================
document.addEventListener("DOMContentLoaded", function () {
  // Header scroll effect
  const header = document.querySelector("header");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Mobile menu toggle
  const mobileMenuBtn = document.createElement("div");
  mobileMenuBtn.classList.add("mobile-menu-btn");
  mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';

  const navIcons = document.querySelector(".nav-icons");
  const nav = document.querySelector("nav");
  const navLinks = document.querySelector(".nav-links");

  nav.insertBefore(mobileMenuBtn, navIcons);

  mobileMenuBtn.addEventListener("click", function () {
    navLinks.classList.toggle("active");
    // Change icon based on menu state
    if (navLinks.classList.contains("active")) {
      mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
    } else {
      mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (event) {
    if (
      navLinks.classList.contains("active") &&
      !navLinks.contains(event.target) &&
      !mobileMenuBtn.contains(event.target)
    ) {
      navLinks.classList.remove("active");
      mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Close mobile menu if open
        if (navLinks.classList.contains("active")) {
          navLinks.classList.remove("active");
          mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }

        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Active nav link based on scroll position
  const sections = document.querySelectorAll("section[id]");
  window.addEventListener("scroll", function () {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 150) {
        current = section.getAttribute("id");
      }
    });

    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // Testimonial Slider
  const testimonialSlides = document.querySelectorAll(".testimonial-slide");
  const dots = document.querySelectorAll(".dot");
  let currentSlide = 0;

  // Hide all slides except the first one
  testimonialSlides.forEach((slide, index) => {
    if (index !== 0) {
      slide.style.display = "none";
    }
  });

  // Function to change slides
  function changeSlide(index) {
    // Hide all slides
    testimonialSlides.forEach((slide) => {
      slide.style.display = "none";
      slide.classList.remove("active");
    });

    // Remove active class from all dots
    dots.forEach((dot) => {
      dot.classList.remove("active");
    });

    // Display the selected slide and add active class to the dot
    testimonialSlides[index].style.display = "block";
    testimonialSlides[index].classList.add("active");
    dots[index].classList.add("active");
    currentSlide = index;
  }

  // Add click event listeners to dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      changeSlide(index);
    });
  });

  // Auto-slide function
  function autoSlide() {
    let nextSlide = (currentSlide + 1) % testimonialSlides.length;
    changeSlide(nextSlide);
  }

  // Set auto-slide interval
  let slideInterval = setInterval(autoSlide, 5000);

  // Reset interval when manually changing slides
  dots.forEach(() => {
    clearInterval(slideInterval);
    slideInterval = setInterval(autoSlide, 5000);
  });

  // Reservation form validation
  const bookingForm = document.getElementById("bookingForm");
  if (bookingForm) {
    bookingForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Simple validation example - can be expanded
      let valid = true;
      const inputs = this.querySelectorAll("input, select, textarea");

      inputs.forEach((input) => {
        if (input.hasAttribute("required") && !input.value) {
          valid = false;
          input.style.borderColor = "red";
        } else {
          input.style.borderColor = "";
        }
      });

      if (valid) {
        // Show success message
        const successMsg = document.createElement("div");
        successMsg.classList.add("success-message");
        successMsg.textContent =
          "Your reservation has been confirmed. We will contact you shortly!";
        successMsg.style.color = "#4CAF50";
        successMsg.style.padding = "15px 0";
        successMsg.style.fontWeight = "600";

        // Display message and reset form
        this.appendChild(successMsg);
        this.reset();

        // Remove message after a few seconds
        setTimeout(() => {
          successMsg.remove();
        }, 5000);
      }
    });
  }

  // Animate elements on scroll
  const animateElements = document.querySelectorAll(
    ".menu-item, .blog-card, .testimonial-slide, .menu-item-horizontal, .feature-card"
  );

  function checkIfInView() {
    animateElements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight;

      if (elementPosition < screenPosition - 100) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  }

  // Set initial styles for animation
  animateElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(50px)";
    element.style.transition = "opacity 0.8s ease, transform 0.8s ease";
  });

  // Check elements on scroll
  window.addEventListener("scroll", checkIfInView);

  // Check on load
  window.addEventListener("load", checkIfInView);

  // Newsletter form
  const newsletterForm = document.querySelector(".newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const emailInput = this.querySelector('input[type="email"]');
      if (emailInput.value) {
        // Show success message
        const parent = this.parentElement;
        const successMsg = document.createElement("p");
        successMsg.textContent = "Thanks for subscribing to our newsletter!";
        successMsg.style.color = "var(--primary-color)";

        parent.appendChild(successMsg);
        this.reset();

        // Remove message after a few seconds
        setTimeout(() => {
          successMsg.remove();
        }, 5000);
      }
    });
  }

  // Create image folders
  function createImagesFolder() {
    // This is just to inform that we need to create the images folder
    console.log(
      'Note: Please create an "images" folder in your project root for all images'
    );
  }

  createImagesFolder();
});
