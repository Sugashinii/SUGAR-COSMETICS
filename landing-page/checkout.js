function getItems(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

function saveItems(key, items) {
  localStorage.setItem(key, JSON.stringify(items));
}

function updateQuantity(name, value) {
  const cart = getItems("cart");
  const item = cart.find(p => p.name === name);
  if (item) {
    item.quantity = parseInt(value);
    saveItems("cart", cart);
    renderCheckout();
  }
}

function removeItem(name) {
  let cart = getItems("cart");
  cart = cart.filter(p => p.name !== name);
  saveItems("cart", cart);
  renderCheckout();
}

function moveToWishlist(name) {
  let cart = getItems("cart");
  let wishlist = getItems("wishlist");

  const item = cart.find(p => p.name === name);
  if (!item) return;

  if (!wishlist.some(p => p.name === name)) {
    wishlist.push(item);
    saveItems("wishlist", wishlist);
    alert("Moved to wishlist!");
  }

  cart = cart.filter(p => p.name !== name);
  saveItems("cart", cart);
  renderCheckout();
}

function renderCheckout() {
  const container = document.getElementById("checkout-items");
  const summary = document.getElementById("checkout-summary");
  const cart = getItems("cart");

  container.innerHTML = "";
  summary.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = `<p style="grid-column: 1 / -1; text-align:center;">Your cart is empty.</p>`;
    return;
  }

  let total = 0;

  cart.forEach(item => {
    const quantity = item.quantity || 1;
    const price = parseInt(item.price.replace("₹", ""));
    const subtotal = price * quantity;
    total += subtotal;

    const card = document.createElement("div");
    card.className = "checkout-card";

    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="checkout-details">
        <h3>${item.name}</h3>
        <p class="price">Price: ${item.price}</p>
        <label>
          Quantity:
          <select onchange="updateQuantity('${item.name}', this.value)">
            ${Array.from({length: 10}, (_, i) => `<option value="${i+1}" ${i+1 === quantity ? "selected" : ""}>${i+1}</option>`).join("")}
          </select>
        </label>
        <p class="subtotal">Subtotal: ₹${subtotal}</p>
        <div class="checkout-actions">
          <button onclick="removeItem('${item.name}')">Remove</button>
          <button onclick="moveToWishlist('${item.name}')">Move to Wishlist</button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  summary.innerHTML = `<p>Total Amount: ₹${total}</p>`;
}

function placeOrder() {
  const cart = getItems("cart");
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert("Order placed successfully Sugar pie!");
  localStorage.removeItem("cart");
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", renderCheckout);
