const form = document.getElementById("payment-form");
const paymentSection = document.getElementById("payment-section");
const couponMsg = document.getElementById("coupon-message");

// Auto-fill saved shipping data from localStorage on page load
window.addEventListener("DOMContentLoaded", () => {
  const savedName = localStorage.getItem("shippingName");
  const savedAddress = localStorage.getItem("shippingAddress");
  const savedPincode = localStorage.getItem("shippingPincode");

  if (savedName) document.getElementById("name").value = savedName;
  if (savedAddress) document.getElementById("address").value = savedAddress;
  if (savedPincode) document.getElementById("pincode").value = savedPincode;
});

// Apply coupon and reveal payment section
function applyCoupon() {
  const name = document.getElementById("name").value.trim();
  const address = document.getElementById("address").value.trim();
  const pincode = document.getElementById("pincode").value.trim();
  const coupon = document.getElementById("coupon").value.trim();

  if (!name || !address || !pincode) {
    alert("Please fill in all shipping details before applying coupon.");
    return;
  }

  // Save shipping details to localStorage
  localStorage.setItem("shippingName", name);
  localStorage.setItem("shippingAddress", address);
  localStorage.setItem("shippingPincode", pincode);

  if (coupon.toLowerCase() === "sugar10") {
    couponMsg.textContent = "Coupon applied! 10% discount.";
    couponMsg.style.color = "green";
    localStorage.setItem("couponCode", coupon);
  } else {
    couponMsg.textContent = "Invalid or expired coupon.";
    couponMsg.style.color = "red";
    localStorage.removeItem("couponCode");
  }

  paymentSection.classList.remove("hidden");
}

// Show/hide payment fields based on selected method
function toggleFields() {
  const upi = document.querySelector('input[value="UPI"]').checked;
  const card = document.querySelector('input[value="Card"]').checked;

  document.getElementById("upi-field").classList.toggle("hidden", !upi);
  document.getElementById("card-field").classList.toggle("hidden", !card);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const selected = form.payment.value;

  alert("Payment successful via " + selected + "! 🎉");

  localStorage.removeItem("cart");
  localStorage.removeItem("shippingName");
  localStorage.removeItem("shippingAddress");
  localStorage.removeItem("shippingPincode");
  localStorage.removeItem("couponCode");

  window.location.href = "index.html";
});
