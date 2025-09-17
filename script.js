const container = document.getElementById('container');
const toggleBtn = document.getElementById('toggleBtn');
const inlineSignup = document.getElementById('inlineSignup');
const inlineLogin = document.getElementById('inlineLogin');

function setMode(signup) {
  if (signup) {
    container.classList.add('show-signup');
    toggleBtn.textContent = 'Go to Login';
  } else {
    container.classList.remove('show-signup');
    toggleBtn.textContent = 'Go to Sign Up';
  }
}

toggleBtn.addEventListener('click', () => {
  setMode(!container.classList.contains('show-signup'));
});
inlineSignup.addEventListener('click', e => { e.preventDefault(); setMode(true); });
inlineLogin.addEventListener('click', e => { e.preventDefault(); setMode(false); });

// Login validation
document.getElementById('loginForm').addEventListener('submit', e => {
  e.preventDefault();
  const u = document.getElementById('loginUsername').value.trim();
  const p = document.getElementById('loginPassword').value.trim();
  if (!u || !p) return alert('⚠ Please fill in all fields!');
  if (p.length < 6) return alert('⚠ Password must be at least 6 characters!');
  alert('✅ Login successful!');
  window.location.href = "./Home Page/Home.html";
});

// Sign Up validation
document.getElementById('signupForm').addEventListener('submit', e => {
  e.preventDefault();
  const n = document.getElementById('fullname').value.trim();
  const em = document.getElementById('email').value.trim();
  const u = document.getElementById('signupUsername').value.trim();
  const p = document.getElementById('signupPassword').value.trim();
  const c = document.getElementById('confirmPassword').value.trim();
  if (!n || !em || !u || !p || !c) return alert('⚠ Please fill in all fields!');
  if (p.length < 6) return alert('⚠ Password must be at least 6 characters!');
  if (p !== c) return alert('⚠ Passwords do not match!');
  alert('✅ Account created successfully!');
});