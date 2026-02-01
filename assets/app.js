// Filter chips for apps page
const filterChips = document.querySelectorAll('[data-filter]');
const appCards = document.querySelectorAll('[data-category]');

if (filterChips.length > 0 && appCards.length > 0) {
  filterChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const filter = chip.dataset.filter;

      filterChips.forEach((item) => item.classList.remove('is-active'));
      chip.classList.add('is-active');

      appCards.forEach((card) => {
        const category = card.dataset.category;
        const shouldShow = filter === 'tutte' || category === filter;

        if (shouldShow) {
          card.style.display = 'flex';
          card.classList.remove('is-visible');
          window.requestAnimationFrame(() => {
            card.classList.add('is-visible');
          });
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// Card entry animations - Updated for new Design System
const cards = document.querySelectorAll('.card, .app-card-cover, .app-card, .hero-card-featured');
if (cards.length > 0) {
  const maxDelay = 240;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    cards.forEach((card, index) => {
      // Add initial state class if not present in CSS/HTML (though CSS usually handles opacity:0)
      card.style.transitionDelay = `${Math.min(index * 80, maxDelay)}ms`;
      observer.observe(card);
    });
  } else {
    cards.forEach((card, index) => {
      card.style.transitionDelay = `${Math.min(index * 80, maxDelay)}ms`;
      setTimeout(() => card.classList.add('is-visible'), 60);
    });
  }
}

// Current year in footer
const yearSpan = document.querySelector('[data-year]');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
