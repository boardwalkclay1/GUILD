function go(page) {
  window.location.href = page;
}

async function login() {
  const user = document.getElementById("loginUser").value.trim();
  const pass = document.getElementById("loginPass").value.trim();

  if (!user || !pass) {
    alert("Enter username and password.");
    return;
  }

  const res = await fetch("/data/users.json");
  const users = await res.json();

  if (!users[user]) {
    alert("User not found.");
    return;
  }

  if (users[user].password !== pass) {
    alert("Incorrect password.");
    return;
  }

  if (Date.now() > users[user].unlockUntil) {
    alert("Your access has expired. Renew in the Inner Hall.");
    return;
  }

  // TEMP localStorage until success page writes IndexedDB
  localStorage.setItem("guild_username", user);

  // Redirect to success page to write IndexedDB
  window.location.href = `/pages/success.html?user=${encodeURIComponent(user)}`;
}
