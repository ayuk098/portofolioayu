document.addEventListener("DOMContentLoaded", () => {
  const fadeUps = document.querySelectorAll('.fade-up');

  const appearOnScroll = () => {
    fadeUps.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        el.classList.add('show');
      }
    });
  };

  window.addEventListener('scroll', appearOnScroll);
  appearOnScroll();
});

// Add this JavaScript to handle the toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  const toggleButtons = document.querySelectorAll('.toggle-btn');
  
  toggleButtons.forEach(button => {
      button.addEventListener('click', function() {
          // Remove active class from all buttons
          toggleButtons.forEach(btn => btn.classList.remove('active'));
          
          // Add active class to clicked button
          this.classList.add('active');
          
          // Hide all content sections
          document.querySelectorAll('.education-content').forEach(content => {
              content.classList.remove('active');
          });
          
          // Show the targeted content
          const targetId = this.getAttribute('data-target');
          document.getElementById(targetId).classList.add('active');
      });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // Animate skill bars when section comes into view
  const skillItems = document.querySelectorAll('.skill-item[data-skill]');
  
  const animateSkills = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const skillItem = entry.target;
        const skillLevel = skillItem.getAttribute('data-skill');
        const progressBar = skillItem.querySelector('.skill-progress');
        
        progressBar.style.width = skillLevel + '%';
        observer.unobserve(skillItem);
      }
    });
  };
  
  const skillsObserver = new IntersectionObserver(animateSkills, {
    threshold: 0.5
  });
  
  skillItems.forEach(item => {
    skillsObserver.observe(item);
  });
  
  // Scroll animations for sections
  const sections = document.querySelectorAll('.fade-up');
  
  const fadeInOnScroll = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  };
  
  const sectionObserver = new IntersectionObserver(fadeInOnScroll, {
    threshold: 0.2
  });
  
  sections.forEach(section => {
    sectionObserver.observe(section);
  });
});

document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    targetElement.scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Menggunakan Intersection Observer API
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show'); // Opsional, jika ingin animasi hilang saat keluar viewport
    }
  });
});

// Header Scroll Effect
window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Smooth Scrolling for Navigation
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    window.scrollTo({
      top: targetElement.offsetTop - 80,
      behavior: 'smooth'
    });
  });
});

// Intersection Observer for Section Animations
const sections = document.querySelectorAll('section');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, {
  threshold: 0.1
});

sections.forEach(section => {
  sectionObserver.observe(section);
});

// Education Toggle
const toggleButtons = document.querySelectorAll('.toggle-btn');
const educationContents = document.querySelectorAll('.education-content');

toggleButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    toggleButtons.forEach(btn => btn.classList.remove('active'));
    // Add active to clicked button
    button.classList.add('active');
    
    // Hide all contents
    educationContents.forEach(content => content.classList.remove('active'));
    // Show target content
    const target = button.getAttribute('data-target');
    document.getElementById(target).classList.add('active');
  });
});

// Skill Bar Animation
const skillItems = document.querySelectorAll('.skill-item[data-skill]');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const skillLevel = entry.target.getAttribute('data-skill');
      const progressBar = entry.target.querySelector('.skill-progress');
      progressBar.style.width = skillLevel + '%';
      skillObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.5
});

skillItems.forEach(item => {
  skillObserver.observe(item);
});
