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
        card.style.display = shouldShow ? 'flex' : 'none';
      });
    });
  });
}

// Current year in footer
const yearSpan = document.querySelector('[data-year]');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
