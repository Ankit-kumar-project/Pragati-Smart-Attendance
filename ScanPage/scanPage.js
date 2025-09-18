// app.js
// Ankit: This ships with a CDN setup for quick start.
// To be 100% offline, serve Tesseract assets locally and set the paths below (see OFFLINE CONFIG).

const els = {
  fileInput: document.getElementById('file-input'),
  browseBtn: document.getElementById('browse-btn'),
  dropzone: document.getElementById('dropzone'),
  preview: document.getElementById('preview'),
  scanBtn: document.getElementById('scan-btn'),
  clearBtn: document.getElementById('clear-btn'),
  output: document.getElementById('output'),
  progress: document.getElementById('progress'),
  progressBar: document.getElementById('progress-bar'),
  progressText: document.getElementById('progress-text'),
  blocksList: document.getElementById('blocks-list'),
  networkBadge: document.getElementById('network-badge'),
  pwaBadge: document.getElementById('pwa-badge'),
  installBtn: document.getElementById('install-btn'),
};

let currentFile = null;
let deferredPrompt = null;

// Network badge
function updateNetworkBadge() {
  if (navigator.onLine) {
    els.networkBadge.textContent = 'Online';
    els.networkBadge.style.background = 'rgba(93, 228, 199, 0.12)';
  } else {
    els.networkBadge.textContent = 'Offline';
    els.networkBadge.style.background = 'rgba(255, 107, 107, 0.12)';
  }
}
window.addEventListener('online', updateNetworkBadge);
window.addEventListener('offline', updateNetworkBadge);
updateNetworkBadge();

// File selection helpers
els.browseBtn.addEventListener('click', () => els.fileInput.click());
els.fileInput.addEventListener('change', (e) => {
  if (e.target.files && e.target.files[0]) {
    setFile(e.target.files[0]);
  }
});

// Drag & drop
['dragenter','dragover'].forEach(type => {
  els.dropzone.addEventListener(type, (e) => {
    e.preventDefault(); e.stopPropagation();
    els.dropzone.classList.add('dragover');
  });
});
['dragleave','drop'].forEach(type => {
  els.dropzone.addEventListener(type, (e) => {
    e.preventDefault(); e.stopPropagation();
    els.dropzone.classList.remove('dragover');
  });
});
els.dropzone.addEventListener('drop', (e) => {
  const file = e.dataTransfer?.files?.[0];
  if (file) setFile(file);
});

// Paste support
window.addEventListener('paste', (e) => {
  const items = e.clipboardData?.items || [];
  for (const item of items) {
    if (item.type.startsWith('image/')) {
      const file = item.getAsFile();
      if (file) setFile(file);
      break;
    }
  }
});

function setFile(file) {
  currentFile = file;
  const url = URL.createObjectURL(file);
  els.preview.src = url;
  els.preview.classList.remove('hidden');
  els.scanBtn.disabled = false;
  els.clearBtn.disabled = false;
  els.output.value = '';
  els.blocksList.innerHTML = '';
}

// Clear
els.clearBtn.addEventListener('click', () => {
  currentFile = null;
  els.preview.src = '';
  els.preview.classList.add('hidden');
  els.scanBtn.disabled = true;
  els.clearBtn.disabled = true;
  els.output.value = '';
  els.blocksList.innerHTML = '';
  els.progress.classList.add('hidden');
  els.progressBar.style.width = '0%';
  els.progressText.textContent = 'Ready';
  els.fileInput.value = '';
});

// OCR
els.scanBtn.addEventListener('click', async () => {
  if (!currentFile) return;
  lockUI(true);
  els.progress.classList.remove('hidden');
  els.progressBar.style.width = '0%';
  els.progressText.textContent = 'Initializing OCR…';

  try {
    // Quick-start (CDN): Tesseract.recognize(file, 'eng', { logger })
    // OFFLINE CONFIG:
    // 1) Download these into /tesseract:
    //    - tesseract.min.js
    //    - worker.min.js
    //    - tesseract-core.wasm.js
    //    - lang/eng.traineddata.gz
    // 2) Replace the <script> in index.html with:
    //    <script src="/tesseract/tesseract.min.js"></script>
    // 3) Pass local paths here in options:
    // const options = {
    //   workerPath: '/tesseract/worker.min.js',
    //   langPath: '/tesseract/lang',
    //   corePath: '/tesseract/tesseract-core.wasm.js',
    //   logger: updateProgress
    // };

    const options = { logger: updateProgress };
    const { data } = await Tesseract.recognize(currentFile, 'eng', options);

    // Raw text
    els.output.value = (data.text || '').trim();

    // Blocks with confidence
    renderBlocks(data.blocks || data.paragraphs || [], data.confidence);
    els.progressText.textContent = 'Complete';
    els.progressBar.style.width = '100%';
  } catch (err) {
    console.error(err);
    els.output.value = 'Error during OCR. Try a clearer image or different lighting.';
    els.progressText.textContent = 'Error';
  } finally {
    lockUI(false);
    setTimeout(() => els.progress.classList.add('hidden'), 800);
  }
});

function updateProgress(m) {
  if (!m) return;
  if (m.status) els.progressText.textContent = `${m.status} ${m.progress ? Math.round(m.progress * 100) + '%' : ''}`.trim();
  if (typeof m.progress === 'number') {
    const pct = Math.max(0, Math.min(100, Math.round(m.progress * 100)));
    els.progressBar.style.width = pct + '%';
  }
}

function renderBlocks(blocks, overallConfidence) {
  els.blocksList.innerHTML = '';
  if (!blocks.length) {
    const div = document.createElement('div');
    div.className = 'block-item';
    div.innerHTML = `<div class="block-head"><span>No blocks detected</span><span>Conf: —</span></div>`;
    els.blocksList.appendChild(div);
    return;
  }
  blocks.forEach((b, i) => {
    const text = (b.text || '').trim();
    const conf = typeof b.confidence === 'number' ? b.confidence : (typeof overallConfidence === 'number' ? overallConfidence : null);
    const div = document.createElement('div');
    div.className = 'block-item';
    div.innerHTML = `
      <div class="block-head">
        <span>Block ${i + 1}</span>
        <span>${conf !== null ? 'Conf: ' + conf.toFixed(1) : ''}</span>
      </div>
      <div class="block-text">${escapeHtml(text) || '<em class="muted">Empty</em>'}</div>
    `;
    els.blocksList.appendChild(div);
  });
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (m) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
}

function lockUI(locked) {
  els.scanBtn.disabled = locked || !currentFile;
  els.clearBtn.disabled = locked || !currentFile;
  els.browseBtn.disabled = locked;
  els.fileInput.disabled = locked;
}

// PWA install flow
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  els.installBtn.classList.remove('hidden');
});
els.installBtn.addEventListener('click', async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  if (outcome === 'accepted') {
    els.pwaBadge.classList.remove('hidden');
  }
  deferredPrompt = null;
});

// Service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(console.warn);
  });
}