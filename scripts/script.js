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

  
  