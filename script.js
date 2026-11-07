const menu = document.querySelector('.menu');
const nav = document.querySelector('nav');
if (menu && nav) {
  menu.addEventListener('click', () => {
    nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', nav.classList.contains('open') ? 'true' : 'false');
    menu.textContent = nav.classList.contains('open') ? '×' : '☰';
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
}
const observer = ('IntersectionObserver' in window) ? new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, {threshold: .12}) : null;
if (observer) document.querySelectorAll('.about-grid article,.why,.why-grid article,.feature-content,.festival-copy,.directory-title,.place,.detail-text,.sunrise p').forEach(el => {
  el.classList.add('reveal'); observer.observe(el);
});
document.querySelectorAll('.filters button').forEach(btn => btn.addEventListener('click', () => {
  document.querySelectorAll('.filters button').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  const filter = btn.dataset.filter;
  document.querySelectorAll('.place').forEach(card => card.classList.toggle('hide', filter !== 'all' && card.dataset.category !== filter));
}));
document.querySelectorAll('.place').forEach(card => {
  const link = card.querySelector('a[href$=".html"]');
  if (!link) return;
});
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();


/* =========================================
   TOP DESTINATION SLIDER
========================================= */

(() => {
    const slider = document.getElementById("destinationSlider");

    if (!slider) return;

    const track = document.getElementById("destinationTrack");
    const slides = [...slider.querySelectorAll(".destination-slide")];
    const dots = [...slider.querySelectorAll(".destination-dot")];
    const previews = [...slider.querySelectorAll(".preview-image")];

    let currentSlide = 0;
    let startX = 0;
    let startY = 0;

    function showSlide(index) {
        currentSlide = (index + slides.length) % slides.length;

        track.style.transform =
            `translateX(-${currentSlide * 100}%)`;

        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === currentSlide);
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === currentSlide);
        });

        previews.forEach((preview, i) => {
            preview.classList.toggle("active", i === currentSlide);
        });
    }

    // Arrow navigation
    document.getElementById("destinationPrev")
        .addEventListener("click", () => {
            showSlide(currentSlide - 1);
        });

    document.getElementById("destinationNext")
        .addEventListener("click", () => {
            showSlide(currentSlide + 1);
        });

    // Indicator navigation
    dots.forEach(dot => {
        dot.addEventListener("click", () => {
            showSlide(Number(dot.dataset.slide));
        });
    });

    // Click a preview image to open its slide
    previews.forEach(preview => {
        preview.addEventListener("click", () => {
            showSlide(Number(preview.dataset.slide));
        });

        preview.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                showSlide(Number(preview.dataset.slide));
            }
        });
    });

    // Touch swipe for mobile devices
    slider.addEventListener("touchstart", event => {
        startX = event.changedTouches[0].clientX;
        startY = event.changedTouches[0].clientY;
    }, { passive: true });

    slider.addEventListener("touchend", event => {
        const endX = event.changedTouches[0].clientX;
        const endY = event.changedTouches[0].clientY;

        const differenceX = endX - startX;
        const differenceY = endY - startY;

        // Only change slides when the gesture is mainly horizontal
        if (
            Math.abs(differenceX) > 45 &&
            Math.abs(differenceX) > Math.abs(differenceY)
        ) {
            showSlide(
                currentSlide + (differenceX < 0 ? 1 : -1)
            );
        }
    }, { passive: true });

    // Keyboard arrows
    slider.addEventListener("keydown", event => {
        if (event.key === "ArrowRight") {
            showSlide(currentSlide + 1);
        }

        if (event.key === "ArrowLeft") {
            showSlide(currentSlide - 1);
        }
    });

    // Display the first destination initially
    showSlide(0);
})();
