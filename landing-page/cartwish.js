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

function updateQuantity(listName, productName, newQty) {
  const items = getItems(listName);
  const item = items.find(i => i.name === productName);
  if (item) {
    item.quantity = parseInt(newQty);
    saveItems(listName, items);
    renderList(listName);
  }
}

function renderList(listName) {
  const container = document.getElementById(`${listName}-items`);
  const summary = document.getElementById(`${listName}-summary`);
  const items = getItems(listName);

  container.innerHTML = "";
  if (summary) summary.innerHTML = "";

  if (items.length === 0) {
    container.innerHTML = `<p style="grid-column: 1 / -1; text-align: center;">No items in ${listName} yet!</p>`;
    return;
  }
  let total = 0;

  items.forEach(item => {
    const quantity = item.quantity || 1;
    const priceNum = parseInt(item.price.replace("₹", ""));
    const subtotal = quantity * priceNum;
    total += subtotal;

    const card = document.createElement("div");
    card.className = "item-card";

    const options = Array.from({ length: 10 }, (_, i) => {
      const val = i + 1;
      return `<option value="${val}" ${val === quantity ? "selected" : ""}>${val}</option>`;
    }).join("");

    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p class="price">${item.price}</p>

      <label style="display:block; margin:10px 0;">Quantity:
        <select onchange="updateQuantity('${listName}', '${item.name}', this.value)">
          ${options}
        </select>
      </label>

      <p class="subtotal">Subtotal: ₹${subtotal}</p>
      <button onclick="removeItem('${listName}', '${item.name}')">Remove</button>
    `;

    container.appendChild(card);
  });

  if (summary && listName === "cart") {
    summary.innerHTML = `<h2>Total: ₹${total}</h2>`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("cart-items")) renderList("cart");
  if (document.getElementById("wishlist-items")) renderList("wishlist");
});
