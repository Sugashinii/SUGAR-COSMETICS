function getItems(listName) {
  return JSON.parse(localStorage.getItem(listName)) || [];
}

function saveItems(listName, items) {
  localStorage.setItem(listName, JSON.stringify(items));
}

function removeItem(listName, productName) {
  const items = getItems(listName).filter(item => item.name !== productName);
  saveItems(listName, items);
  renderList(listName);
}

function addToCartFromWishlist(productName) {
  const wishlist = getItems("wishlist");
  const product = wishlist.find(p => p.name === productName);
  if (!product) return;

  let cart = getItems("cart");
  const existing = cart.find(item => item.name === product.name);

  if (!existing) {
    product.quantity = 1;
    cart.push(product);
    showToast("Added to cart!");
  } else {
    showToast("Already in cart!");
  }

  saveItems("cart", cart);
}

function updateQuantity(listName, productName, newQty) {
  const items = getItems(listName);
  const item = items.find(i => i.name === productName);
  if (item) {
    item.quantity = parseInt(newQty);
    saveItems(listName, items);
    renderList(listName);
  }
}

function moveToWishlist(productName) {
  const cart = getItems("cart");
  const wishlist = getItems("wishlist");

  const product = cart.find(item => item.name === productName);
  if (!product) return;

  const already = wishlist.some(p => p.name === productName);
  if (!already) {
    wishlist.push(product);
    saveItems("wishlist", wishlist);
  }

  const newCart = cart.filter(item => item.name !== productName);
  saveItems("cart", newCart);
  renderList("cart");
}

function renderList(listName) {
  const container = document.getElementById(`${listName}-items`);
  const summary = document.getElementById(`${listName}-summary`);
  const items = getItems(listName);

  container.innerHTML = "";
  if (summary) summary.innerHTML = "";

  if (items.length === 0) {
    container.innerHTML = `
      <p style="grid-column: 1 / -1; text-align: center;">No items in ${listName} yet!</p>
      <div style="text-align:center; grid-column: 1 / -1; margin-top: 20px;">
        <a href="index.html">


          <button class="shop-now-btn">Shop Now</button>
        </a>
      </div>
    `;

    if (listName === "cart") {
      const orderButton = document.querySelector(".place-order-btn");
      if (orderButton) orderButton.style.display = "none";
      if (summary) summary.innerHTML = "";
    }
    return;}

  let total = 0;

  items.forEach(item => {
    const quantity = item.quantity || 1;
    const priceNum = parseInt(item.price.replace("₹", ""));
    const subtotal = quantity * priceNum;
    total += subtotal;

    const card = document.createElement("div");
    card.className = "item-card";

    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p class="price">${item.price}</p>
      ${listName === "cart" ? `
        <label>Quantity:
          <select onchange="updateQuantity('${listName}', '${item.name}', this.value)">
            ${Array.from({ length: 10 }, (_, i) => {
              const val = i + 1;
              return `<option value="${val}" ${val === quantity ? "selected" : ""}>${val}</option>`;
            }).join("")}
          </select>
        </label>
        <p class="subtotal">Subtotal: ₹${subtotal}</p>
        <button onclick="removeItem('${listName}', '${item.name}')">Remove</button>
        <button onclick="moveToWishlist('${item.name}')">Move to Wishlist</button>
      ` : `
        <button onclick="removeItem('${listName}', '${item.name}')">Remove</button>
        <button onclick="addToCartFromWishlist('${item.name}')">Add to Cart</button>
      `}
    `;

    container.appendChild(card);
  });

  if (summary && listName === "cart") {
    summary.innerHTML = `<h2>Total: ₹${total}</h2>`;
  }
}

function showToast(message) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("cart-items")) renderList("cart");
  if (document.getElementById("wishlist-items")) renderList("wishlist");
});
