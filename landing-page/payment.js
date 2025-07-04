const form = document.getElementById("payment-form");
const paymentSection = document.getElementById("payment-section");
const couponMsg = document.getElementById("coupon-message");

function applyCoupon() {
  const name = document.getElementById("name").value.trim();
  const address = document.getElementById("address").value.trim();
  const pincode = document.getElementById("pincode").value.trim();
  const coupon = document.getElementById("coupon").value.trim();

  if (!name || !address || !pincode) {
    alert("Please fill in all shipping details before applying coupon.");
    return;
  }

  if (coupon.toLowerCase() === "sugar10") {
    couponMsg.textContent = "Coupon applied! 10% discount.";
    couponMsg.style.color = "green";
  } else {
    couponMsg.textContent = "Invalid or expired coupon.";
    couponMsg.style.color = "red";
  }

  paymentSection.classList.remove("hidden");
}

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
  window.location.href = "thankyou.html";
});
