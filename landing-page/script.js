const track = document.querySelector('.carousel-track');
const leftBtn = document.querySelector('.arrow.left');
const rightBtn = document.querySelector('.arrow.right');
const dots = document.querySelectorAll('.dot');
const slides = document.querySelectorAll('.grid-item.big');

if (rightBtn && leftBtn && track) {
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
}
const categorySelect = document.getElementById('sort-category');
const allItems = document.querySelectorAll('.grid-item.small');

if (categorySelect) {
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
}

const searchBar = document.getElementById('search-bar');
if (searchBar) {
  searchBar.addEventListener('input', (e) => {
    console.log('Search keyword:', e.target.value);
  });
}

const profileIcon = document.getElementById('profile-icon');
const profileDropdown = document.getElementById('profile-dropdown');

if (profileIcon && profileDropdown) {
  profileIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    profileDropdown.classList.toggle('show');
  });

  document.addEventListener('click', (e) => {
    if (!profileDropdown.contains(e.target)) {
      profileDropdown.classList.remove('show');
    }
  });
}
function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card";

  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}" />
    <h3>${product.name}</h3>
    <p class="price">${product.price}</p>
    <div class="stars">
      ${[1, 2, 3, 4, 5].map(i => {
        if (product.rating >= i) return '<span class="star full"></span>';
        else if (product.rating >= i - 0.5) return '<span class="star half"></span>';
        else return '<span class="star empty"></span>';
      }).join('')}
    </div>
    <button class="add-to-cart">Add to Cart</button>
  `;

  return card;
}

let productsPerPage = 10;
let currentPage = 1;
let filteredProducts = [];

function renderPaginationButtons(totalProducts) {
  const pageCount = Math.ceil(totalProducts / productsPerPage);
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";

  for (let i = 1; i <= pageCount; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;
    btn.classList.add("page-btn");
    if (i === currentPage) btn.classList.add("active");
    btn.addEventListener("click", () => {
      currentPage = i;
      displayProducts();
    });
    paginationContainer.appendChild(btn);
  }
}

function displayProducts() {
  const start = (currentPage - 1) * productsPerPage;
  const end = start + productsPerPage;
  const pageProducts = filteredProducts.slice(start, end);

  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  pageProducts.forEach(product => {
    const card = createProductCard(product);
    productList.appendChild(card);
  });

  renderPaginationButtons(filteredProducts.length);
}

if (category && allProducts[category]) {
  filteredProducts = allProducts[category];
  displayProducts();
}
