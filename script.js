window.onload = function () {
  let coins = parseInt(localStorage.getItem("coins"));
  if (isNaN(coins)) coins = 30000;

  const coinCount = document.getElementById("coin-count");
  const levelDisplay = document.getElementById("level");

  function updateCoins() {
    localStorage.setItem("coins", coins);
    coinCount.innerText = coins;
    levelDisplay.innerText = "🏅 Level " + getLevel(coins);
  }

  function getLevel(coins) {
    let level = 1;
    let needed = 500;
    while (coins >= needed && level < 100) {
      coins -= needed;
      level++;
      needed += Math.floor(needed * 0.15); // harder each level
    }
    return level;
  }

  // Coin sound (optional)
  const audio = new Audio("coin.mp3");

  document.querySelectorAll(".task button").forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("claimed")) return;
      const value = parseInt(btn.dataset.value);
      coins += value;
      btn.classList.add("claimed");
      btn.innerText = "Claimed";
      updateCoins();
      audio.play(); // play sound
    });
  });

  document.querySelectorAll(".shop-item button").forEach(btn => {
    btn.addEventListener("click", () => {
      const cost = parseInt(btn.dataset.cost);
      if (coins < cost) {
        alert("Not enough coins!");
        return;
      }
      coins -= cost;
      updateCoins();
      alert("Purchase successful!");
    });
  });

  document.getElementById("search").addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();
    document.querySelectorAll(".task, .shop-item").forEach(item => {
      const text = item.innerText.toLowerCase();
      item.style.display = text.includes(searchTerm) ? "flex" : "none";
    });
  });

  updateCoins();
};