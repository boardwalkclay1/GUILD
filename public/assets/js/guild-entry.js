// /public/pages/guild-entry.js
const PAYPAL_LINK = "https://www.paypal.com/ncp/payment/WT7W6ADE5WZKY";

document.addEventListener("DOMContentLoaded", () => {
  const paypalBtn = document.getElementById("paypalBtn");
  if (paypalBtn) paypalBtn.href = PAYPAL_LINK;

  const bg = document.body.getAttribute("data-bg");
  if (bg) document.body.style.backgroundImage = `url('${bg}')`;
});

function go(page) {
  window.location.href = page;
}

function beginEntry() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    alert("Enter a username and password.");
    return;
  }

  localStorage.setItem("pending_username", username);
  localStorage.setItem("pending_password", password);

  window.location.href = PAYPAL_LINK;
}
