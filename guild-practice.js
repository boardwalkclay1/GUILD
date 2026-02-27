window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("scroll").classList.add("open");
  }, 300);
});

let trade = {
  direction: "",
  strike: "",
  expiration: "",
  entry: "",
  exit: ""
};

function chooseDirection(choice) {
  trade.direction = choice;
  document.getElementById("exp1").innerHTML =
    choice + " means you expect the stock to move in that direction.";
  document.getElementById("exp1").classList.remove("hidden");
  document.getElementById("step2").classList.remove("hidden");
}

function chooseStrike(choice) {
  trade.strike = choice;
  document.getElementById("exp2").innerHTML =
    choice + " affects cost, risk, and probability.";
  document.getElementById("exp2").classList.remove("hidden");
  document.getElementById("step3").classList.remove("hidden");
}

function chooseExpiration(choice) {
  trade.expiration = choice;
  document.getElementById("exp3").innerHTML =
    choice + " controls how much time your trade has to work.";
  document.getElementById("exp3").classList.remove("hidden");
  document.getElementById("step4").classList.remove("hidden");
}

function chooseEntry(choice) {
  trade.entry = choice;
  document.getElementById("exp4").innerHTML =
    choice + " defines the moment you enter based on price action.";
  document.getElementById("exp4").classList.remove("hidden");
  document.getElementById("step5").classList.remove("hidden");
}

function chooseExit(choice) {
  trade.exit = choice;
  document.getElementById("exp5").innerHTML =
    choice + " is your exit strategy.";
  document.getElementById("exp5").classList.remove("hidden");
  showSummary();
}

function showSummary() {
  const box = document.getElementById("summary");
  box.classList.remove("hidden");
  box.innerHTML = `
    <h2>Your Practice Trade</h2>
    <p><strong>Direction:</strong> ${trade.direction}</p>
    <p><strong>Strike:</strong> ${trade.strike}</p>
    <p><strong>Expiration:</strong> ${trade.expiration}</p>
    <p><strong>Entry:</strong> ${trade.entry}</p>
    <p><strong>Exit:</strong> ${trade.exit}</p>
    <button class="btn" onclick="location.reload()">Practice Again</button>
  `;
}
