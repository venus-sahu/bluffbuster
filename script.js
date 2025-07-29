const socket = io();

document.addEventListener('DOMContentLoaded', () => {
  const splash = document.getElementById("splashScreen");
  const avatarScreen = document.getElementById("avatarScreen");
  const termsModal = document.getElementById("termsModal");
  const loadingScreen = document.getElementById("loading");
  const playerCountElement = document.getElementById("playerCount");

  // Hide splash and show avatar selection
  setTimeout(() => {
    splash.classList.add("hidden");
    avatarScreen.classList.remove("hidden");
  }, 1000);

  document.getElementById("avatarForm").addEventListener("submit", function (e) {
    e.preventDefault();
    avatarScreen.classList.add("hidden");
    termsModal.classList.remove("hidden");
  });

  document.getElementById("startConsentBtn").addEventListener("click", function () {
    const checkbox = document.getElementById("termsCheck");
    if (checkbox.checked) {
      termsModal.classList.add("hidden");
      loadingScreen.classList.remove("hidden");

      // Send join event to server
      socket.emit("playerJoined");
    } else {
      alert("Please provide consent to continue.");
    }
  });

  // Listen for player count update
  socket.on('updatePlayerCount', (count) => {
    if (playerCountElement) {
      playerCountElement.textContent = `(${count}/5 joined)`;
    }
  });
});