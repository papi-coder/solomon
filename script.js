// Common helpers
const setYear = (id) => {
  const el = document.getElementById(id);
  if (el) el.textContent = new Date().getFullYear();
};
setYear('year');
setYear('year2');
setYear('year3');
setYear('year4');

// Initialize AOS
AOS.init({ duration: 1000, once: true });

// Typewriter class
class Typewriter {
  constructor(el, words, wait = 2000) {
    this.el = el;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.isDeleting = false;
    this.type();
  }

  type() {
    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current];
    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
    this.el.textContent = this.txt;
    let typeSpeed = 120;
    if (this.isDeleting) typeSpeed /= 2;
    if (!this.isDeleting && this.txt === fullTxt) {
      typeSpeed = this.wait;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 500;
    }
    setTimeout(() => this.type(), typeSpeed);
  }
}

// Theme toggle
const themeToggle = document.getElementById("theme-toggle");
const userTheme = localStorage.getItem("theme");
const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (userTheme === "dark" || (!userTheme && systemDark)) {
  document.documentElement.setAttribute("data-theme", "dark");
  themeToggle.textContent = "🌙";
} else {
  document.documentElement.setAttribute("data-theme", "light");
  themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", newTheme);
  themeToggle.textContent = newTheme === "dark" ? "🌙" : "☀️";
  localStorage.setItem("theme", newTheme);
});

// Scroll to top
const scrollTopBtn = document.getElementById("scrollTop");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Particles background
tsParticles.load("particles-js", {
  background: { color: "transparent" },
  fpsLimit: 60,
  interactivity: {
    events: {
      onHover: { enable: true, mode: "repulse" },
      resize: true,
    },
    modes: { repulse: { distance: 100, duration: 0.4 } },
  },
  particles: {
    color: { value: ["#7b61ff", "#00d4ff"] },
    links: { color: "#00d4ff", distance: 120, enable: true, opacity: 0.3, width: 1 },
    move: { enable: true, speed: 2 },
    number: { value: 60 },
    opacity: { value: 0.5 },
    shape: { type: "circle" },
    size: { value: { min: 1, max: 4 } },
  },
  detectRetina: true,
});

// Initialize EmailJS
emailjs.init("PUBqpqnxqvdXPJBjCTOP");

// Contact form with EmailJS
const contactForm = document.getElementById("contact-form");
const toast = document.getElementById("toast");
const toastSound = document.getElementById("toast-sound");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const btn = contactForm.querySelector("button");
    if (btn) {
      btn.textContent = "⏳ Sending...";
      btn.disabled = true;
    }

    // Replace with your EmailJS service and template IDs
    emailjs
      .sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", this)
      .then(() => {
        showToast("✅ Message sent successfully!", "success");
        if (btn) btn.textContent = "✅ Sent!";
        contactForm.reset();
        setTimeout(() => {
          if (btn) {
            btn.textContent = "📨 Send Message";
            btn.disabled = false;
          }
        }, 2000);
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        showToast("❌ Failed to send message. Please try again.", "error");
        if (btn) {
          btn.textContent = "❌ Try Again";
          btn.disabled = false;
        }
      });
  });
}

// Toast notification helper
function showToast(message, type = "success") {
  if (!toast) return;
  toast.textContent = message;
  toast.className = `toast ${type} show`;

  // Optional sound
  if (toastSound && typeof toastSound.play === "function") {
    try {
      toastSound.currentTime = 0;
      toastSound.play();
    } catch (e) {
      /* noop */
    }
  }

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}

window.addEventListener('DOMContentLoaded', () => {
  // Init typewriter
  document.querySelectorAll('.typewriter').forEach(el => {
    let wordsRaw = el.getAttribute('data-words') || '[]';
    try {
      const words = JSON.parse(wordsRaw);
      new Typewriter(el, words, 1800);
    } catch (e) {
      console.warn('Typewriter words parse failed', e);
    }
  });

  // Responsive menu
  document.querySelectorAll('.menu-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelector('.nav-links').classList.toggle('open');
    });
  });
});
// Hamburger menu toggle
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  menuToggle.classList.toggle("active"); // animates hamburger
});

// Mobile dropdown toggle
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const mobileOnly = document.querySelector(".mobile-only");

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", () => {
    mobileOnly.classList.toggle("active");
  });
}

