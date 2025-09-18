// Simple AES-like encryption simulation using btoa (for demo purposes only)
// In production, use a real crypto library like SubtleCrypto API

const encryptBtn = document.getElementById('encrypt-btn');
const plainText = document.getElementById('plain-text');
const encryptedText = document.getElementById('encrypted-text');

encryptBtn.addEventListener('click', () => {
  const text = plainText.value.trim();
  if (!text) {
    alert('Please enter some text to encrypt.');
    return;
  }

  // Simulated encryption
  const encoded = btoa(unescape(encodeURIComponent(text)));
  encryptedText.value = encoded;
});