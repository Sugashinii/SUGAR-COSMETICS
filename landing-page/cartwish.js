function getData(listName) {
  const data = localStorage.getItem(listName);
  return data ? JSON.parse(data) : [];
}

function renderList(listName) {
  const items = getData(listName);
  const container = document.getElementById(`${listName}-items`);
  container.innerHTML = "";

  if (items.length === 0) {
    container.innerHTML = `<p style="grid-column: 1 / -1; text-align: center;">No items in ${listName} yet!</p>`;
    return;
  }

  items.forEach(product => {
    const card = document.createElement("div");
    card.className = "item-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p class="price">${product.price}</p>
      <button onclick="removeItem('${listName}', '${product.name}')">Remove</button>
    `;
    container.appendChild(card);
  });
}

function removeItem(listName, productName) {
  let items = getData(listName);
  items = items.filter(item => item.name !== productName);
  localStorage.setItem(listName, JSON.stringify(items));
  renderList(listName);
}
