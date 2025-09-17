const feedbackBtn = document.getElementById("feedbackBtn");
const feedbackModal = document.getElementById("feedbackModal");
const cancelBtn = document.getElementById("cancelBtn");

// Open modal
feedbackBtn.addEventListener("click", () => {
  feedbackModal.style.display = "block";
});

// Close modal
cancelBtn.addEventListener("click", () => {
  feedbackModal.style.display = "none";
});

// Close modal when clicking outside content
window.addEventListener("click", (e) => {
  if (e.target === feedbackModal) {
    feedbackModal.style.display = "none";
  }
});
