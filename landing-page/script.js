const track = document.querySelector('.carousel-track');
const leftBtn = document.querySelector('.arrow.left');
const rightBtn = document.querySelector('.arrow.right');
const dots = document.querySelectorAll('.dot');
const slides = document.querySelectorAll('.grid-item.big');

rightBtn.addEventListener('click', () => {
  track.scrollBy({ left: track.offsetWidth * 0.9, behavior: 'smooth' });
});

leftBtn.addEventListener('click', () => {
  track.scrollBy({ left: -track.offsetWidth * 0.9, behavior: 'smooth' });
});

track.addEventListener('scroll', () => {
  const slideWidth = slides[0].offsetWidth + 20; 
  const index = Math.round(track.scrollLeft / slideWidth);
  dots.forEach(dot => dot.classList.remove('active'));
  if (dots[index]) dots[index].classList.add('active');
});

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    const slideWidth = slides[0].offsetWidth + 20;
    track.scrollTo({ left: i * slideWidth, behavior: 'smooth' });
  });
});

const categorySelect = document.getElementById('sort-category');
const allItems = document.querySelectorAll('.grid-item.small');

categorySelect.addEventListener('change', () => {
  const selectedCategory = categorySelect.value;

  allItems.forEach(item => {
    const itemCategory = item.dataset.category;

    if (selectedCategory === 'all' || itemCategory === selectedCategory) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
});

document.getElementById('search-bar').addEventListener('input', function (e) {
  console.log('Customer wants:', e.target.value);
});
document.getElementById('search-bar').addEventListener('input', function (e) {
  console.log('Search keyword:', e.target.value);
});
