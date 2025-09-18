const uploadBox = document.getElementById('upload-box');
const uploadBtn = document.getElementById('upload-btn');
const photoInput = document.getElementById('photo-input');
const photoPreview = document.getElementById('photo-preview');
const form = document.getElementById('student-form');

// Open file dialog
uploadBtn.addEventListener('click', () => photoInput.click());

// File input change
photoInput.addEventListener('change', () => {
  if (photoInput.files && photoInput.files[0]) {
    previewImage(photoInput.files[0]);
  }
});

// Drag & drop
['dragenter', 'dragover'].forEach(evt => {
  uploadBox.addEventListener(evt, e => {
    e.preventDefault();
    uploadBox.classList.add('dragover');
  });
});
['dragleave', 'drop'].forEach(evt => {
  uploadBox.addEventListener(evt, e => {
    e.preventDefault();
    uploadBox.classList.remove('dragover');
  });
});
uploadBox.addEventListener('drop', e => {
  const file = e.dataTransfer.files[0];
  if (file) {
    photoInput.files = e.dataTransfer.files;
    previewImage(file);
  }
});

function previewImage(file) {
  const reader = new FileReader();
  reader.onload = e => {
    photoPreview.src = e.target.result;
    photoPreview.classList.remove('hidden');
  };
  reader.readAsDataURL(file);
}

// Form submit
form.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('student-name').value.trim();
  const id = document.getElementById('student-id').value.trim();
  if (!name || !id || !photoInput.files.length) {
    alert('Please fill all fields and upload a photo.');
    return;
  }
  alert(`Student "${name}" (ID: ${id}) added successfully!`);
  form.reset();
  photoPreview.classList.add('hidden');
});