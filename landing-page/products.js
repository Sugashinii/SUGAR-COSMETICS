const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");
const categoryTitle = document.getElementById("category-title");
const productList = document.getElementById("product-list");
const pagination = document.getElementById("pagination");

const sortSelect = document.getElementById("sort");
const minRange = document.getElementById("min-range");
const maxRange = document.getElementById("max-range");
const rangeMinVal = document.getElementById("range-min");
const rangeMaxVal = document.getElementById("range-max");
const sliderTrack = document.querySelector(".slider-track");
const filterBar = document.getElementById("filter-bar");

let originalProducts = [];
let filteredProducts = [];
let currentPage = 1;
const productsPerPage = 10;

function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card";
  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p class="price">${product.price}</p>
    <div class="stars">
      ${[1, 2, 3, 4, 5].map(i => {
        if (product.rating >= i) return '<span class="star full"></span>';
        else if (product.rating >= i - 0.5) return '<span class="star half"></span>';
        else return '<span class="star empty"></span>';
      }).join("")}
    </div>
    <button class="add-to-cart">Add to Cart</button>
  `;

  const button = card.querySelector(".add-to-cart");
  button.addEventListener("click", () => {
    showToast("Product added to cart!");
  });

  return card;
}


function displayProducts() {
  productList.innerHTML = "";
  const start = (currentPage - 1) * productsPerPage;
  const end = start + productsPerPage;
  const pageProducts = filteredProducts.slice(start, end);

  pageProducts.forEach(product => {
    const card = createProductCard(product);
    productList.appendChild(card);
  });

  renderPaginationButtons();
}

function renderPaginationButtons() {
  pagination.innerHTML = "";
  const pageCount = Math.ceil(filteredProducts.length / productsPerPage);
  for (let i = 1; i <= pageCount; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;
    btn.classList.add("page-btn");
    if (i === currentPage) btn.classList.add("active");
    btn.addEventListener("click", () => {
      currentPage = i;
      displayProducts();
    });
    pagination.appendChild(btn);
  }
}

function updateSliderTrack() {
  const min = parseInt(minRange.value);
  const max = parseInt(maxRange.value);
  const range = maxRange.max - minRange.min;
  const left = ((min - minRange.min) / range) * 100;
  const right = ((max - minRange.min) / range) * 100;
  sliderTrack.style.left = `${left}%`;
  sliderTrack.style.width = `${right - left}%`;
}

function applyFilters() {
  let filtered = [...originalProducts];
  const min = parseInt(minRange.value);
  const max = parseInt(maxRange.value);
  filtered = filtered.filter(p => {
    const price = parseInt(p.price.replace("₹", ""));
    return price >= min && price <= max;
  });

  const sort = sortSelect?.value;
  if (sort === "low-high") {
    filtered.sort((a, b) => parseInt(a.price.replace("₹", "")) - parseInt(b.price.replace("₹", "")));
  } else if (sort === "high-low") {
    filtered.sort((a, b) => parseInt(b.price.replace("₹", "")) - parseInt(a.price.replace("₹", "")));
  } else if (sort === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  rangeMinVal.textContent = min;
  rangeMaxVal.textContent = max;
  updateSliderTrack();

  filteredProducts = filtered;
  currentPage = 1;
  displayProducts();
  
}

function handleRangeInput(event) {
  let min = parseInt(minRange.value);
  let max = parseInt(maxRange.value);
  if (max < min + 10) {
    if (event.target.id === "min-range") {
      minRange.value = max - 10;
    } else {
      maxRange.value = min + 10;
    }
  }
  applyFilters();
}

if (category && allProducts[category]) {
  categoryTitle.textContent = category.toUpperCase();
  originalProducts = allProducts[category];
  filteredProducts = [...originalProducts];
  displayProducts();
  updateSliderTrack();
  filterBar.style.display = "flex";

  sortSelect.addEventListener("change", applyFilters);
  minRange.addEventListener("input", handleRangeInput);
  maxRange.addEventListener("input", handleRangeInput);
} else {
  productList.innerHTML = `<p style="text-align:center;">No products found for this category.</p>`;
  filterBar.style.display = "none";
}

const searchInput = document.getElementById("search-input");
if (searchInput) {
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filtered = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(query)
    );
    productList.innerHTML = "";
    filtered.forEach(product => {
      const card = createProductCard(product);
      productList.appendChild(card);
    });
  });
}
function showToast(message) {
  let toast = document.querySelector(".toast");

  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}
