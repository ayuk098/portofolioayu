document.addEventListener('DOMContentLoaded', function() {
  // --- Header Scroll Effect ---
  const header = document.querySelector('header');
  if (header) { // Pastikan elemen header ada
      window.addEventListener('scroll', () => {
          if (window.scrollY > 50) { // Anda bisa menyesuaikan nilai ini
              header.classList.add('scrolled');
          } else {
              header.classList.remove('scrolled');
          }
      });
  }

  // --- Hamburger Menu Toggle (untuk mobile navigation) ---
  const hamburger = document.querySelector('.hamburger-menu');
  const navUl = document.querySelector('nav ul');

  if (hamburger && navUl) {
      hamburger.addEventListener('click', function() {
          navUl.classList.toggle('active');
      });

      // Opsional: Tutup menu saat link navigasi diklik
      navUl.querySelectorAll('a').forEach(link => {
          link.addEventListener('click', () => {
              // Hanya tutup jika menu aktif (pada tampilan mobile)
              if (navUl.classList.contains('active')) {
                  navUl.classList.remove('active');
              }
          });
      });
  }

  // --- Smooth Scrolling for Navigation ---
  document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault(); // Mencegah perilaku default link

          const targetId = this.getAttribute('href').substring(1); // Ambil ID tanpa '#'
          const targetElement = document.getElementById(targetId);

          if (targetElement) { // Pastikan elemen target ada
              // Hitung posisi scroll, kurangi tinggi header jika sticky
              // Perhatikan offset untuk header yang sticky
              const headerHeight = header ? header.offsetHeight : 0;
              // Mengurangi 20px tambahan untuk memberikan sedikit padding di atas section
              const offsetTop = targetElement.offsetTop - headerHeight - 20; 

              window.scrollTo({
                  top: offsetTop,
                  behavior: 'smooth'
              });
          }
      });
  });

  // --- Intersection Observer for Section Animations (fade-up/show) ---
  // Ini akan menangani animasi untuk semua section dan elemen lain yang Anda tandai dengan 'show'
  const sectionsToObserve = document.querySelectorAll('section, .intro, .image-section, .skills-card, .certification-card, .project-row, .tool-card'); 

  const generalObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              // Pastikan class 'fade-up' atau 'show' ditambahkan
              entry.target.classList.add('show'); 
              // Opsional: berhenti mengamati setelah elemen terlihat
              observer.unobserve(entry.target); 
          } else {
              // Opsional: Jika Anda ingin animasi menghilang saat keluar dari viewport
              // entry.target.classList.remove('show');
          }
      });
  }, {
      threshold: 0.1 // Ambang batas: elemen dianggap 'terlihat' jika 10% dari elemen masuk ke viewport
  });

  sectionsToObserve.forEach(element => {
      generalObserver.observe(element);
  });

  // --- Education Toggle Functionality ---
  const toggleButtons = document.querySelectorAll('.toggle-btn');
  const educationContents = document.querySelectorAll('.education-content');

  if (toggleButtons.length > 0 && educationContents.length > 0) {
      toggleButtons.forEach(button => {
          button.addEventListener('click', function() {
              // Hapus kelas 'active' dari semua tombol
              toggleButtons.forEach(btn => btn.classList.remove('active'));
              // Tambahkan kelas 'active' ke tombol yang diklik
              this.classList.add('active');

              // Sembunyikan semua konten edukasi
              educationContents.forEach(content => content.classList.remove('active'));

              // Tampilkan konten edukasi yang sesuai
              const targetId = this.getAttribute('data-target');
              const targetContent = document.getElementById(targetId);
              if (targetContent) {
                  targetContent.classList.add('active');
              }
          });
      });
      // Aktifkan tombol pertama secara default saat halaman dimuat
      toggleButtons[0].click();
  }

  // --- Skill Bar Animation on Section Scroll ---
  const skillItems = document.querySelectorAll('.skill-item[data-skill]');
  const skillSection = document.querySelector('.skills-section'); // Mengamati seluruh bagian skills

  const skillObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              // Hanya jalankan animasi untuk skill bar yang ada di dalam section skill
              skillItems.forEach(item => {
                  const skillLevel = item.getAttribute('data-skill');
                  const progressBar = item.querySelector('.skill-progress');
                  if (progressBar && skillLevel) {
                      progressBar.style.width = skillLevel + '%';
                  }
              });
              // Berhenti mengamati section skill setelah animasinya berjalan
              observer.unobserve(entry.target);
          }
      });
  }, {
      threshold: 0.5 // Animasi akan berjalan saat 50% bagian skill terlihat
  });

  if (skillSection) {
      skillObserver.observe(skillSection);
  }

  // --- Project Gallery Navigation and Auto-slide ---
  document.querySelectorAll('.project-gallery').forEach(gallery => {
      const slidesContainer = gallery.querySelector('.gallery-slides');
      const slides = gallery.querySelectorAll('.slide');
      const prevArrow = gallery.querySelector('.nav-arrow.prev');
      const nextArrow = gallery.querySelector('.nav-arrow.next');
      const slideCount = slides.length;
      let currentIndex = 0;
      let slideInterval;
      let startX, moveX; // Untuk touch swipe

      // Fungsi untuk berpindah slide
      const goToSlide = (index) => {
          currentIndex = index;
          slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
      };

      // Event listener untuk panah navigasi
      if (nextArrow) {
          nextArrow.addEventListener('click', () => {
              goToSlide((currentIndex + 1) % slideCount);
              startAutoSlide(); // Reset auto-slide setelah interaksi manual
          });
      }
      
      if (prevArrow) {
          prevArrow.addEventListener('click', () => {
              goToSlide((currentIndex - 1 + slideCount) % slideCount);
              startAutoSlide(); // Reset auto-slide setelah interaksi manual
          });
      }

      // Touch swipe untuk mobile
      gallery.addEventListener('touchstart', (e) => {
          startX = e.touches[0].clientX;
          clearInterval(slideInterval); // Hentikan auto-slide saat disentuh
      }, { passive: true });

      gallery.addEventListener('touchmove', (e) => {
          if (!startX) return;
          moveX = e.touches[0].clientX;
      }, { passive: true });

      gallery.addEventListener('touchend', () => {
          if (startX === null || moveX === null) return; // Perbaiki cek null
          
          const diffX = startX - moveX;
          if (Math.abs(diffX) > 50) { // Ambang batas swipe (50px)
              if (diffX > 0) { // Swipe ke kiri (next slide)
                  goToSlide((currentIndex + 1) % slideCount);
              } else { // Swipe ke kanan (prev slide)
                  goToSlide((currentIndex - 1 + slideCount) % slideCount);
              }
          }
          
          startX = null; // Reset nilai
          moveX = null; // Reset nilai
          startAutoSlide(); // Lanjutkan auto-slide
      });

      // Fungsi auto-slide
      function startAutoSlide() {
          clearInterval(slideInterval); // Pastikan interval sebelumnya dihentikan
          slideInterval = setInterval(() => {
              goToSlide((currentIndex + 1) % slideCount);
          }, 5000); // Ganti 5000ms (5 detik) sesuai keinginan
      }

      // Pause auto-slide saat hover
      gallery.addEventListener('mouseenter', () => {
          clearInterval(slideInterval);
      });

      // Lanjutkan auto-slide saat tidak hover
      gallery.addEventListener('mouseleave', () => {
          startAutoSlide();
      });

      // Mulai auto-slide saat halaman dimuat
      if (slides.length > 1) { // Hanya mulai auto-slide jika ada lebih dari 1 slide
          startAutoSlide();
      }
  });
});