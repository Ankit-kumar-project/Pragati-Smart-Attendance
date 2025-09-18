<pre>
# 📌 Mark & Track – Prototype

Mark & Track is a modern, dark‑themed, modular attendance management system prototype.  
It combines automation, offline capabilities, secure storage, and real‑time analytics into a single, cohesive platform.

---

## ✨ Features

### 1️⃣ Facial Recognition‑Based Attendance
- Uses a camera feed or uploaded image to detect and match student faces against stored profiles.
- Automates attendance marking without manual input.
- Integrates with the database to log time, date, and student ID instantly.

### 2️⃣ Offline Mode – Photo Reader (OCR)
- Upload, drag‑drop, or paste an image of a student list or ID card.
- Uses **Tesseract.js** OCR to extract text directly in the browser — works offline if assets are cached.
- Shows a preview of the scanned image and displays all recognized text in a container below.
- Includes a progress bar and block‑by‑block confidence scores.

### 3️⃣ Add New Student Attendance
- Form with **Name**, **ID**, and **Upload Photo** fields.
- Supports drag‑drop or file selection for the photo, with instant preview.
- On submission, validates all fields and stores the new student record (ready for backend integration).

### 4️⃣ Encrypted & Tamper‑Proof Data Storage
- Before saving attendance data, it’s encrypted so it’s unreadable without the correct key.
- Adds a hash/digital signature to detect any tampering.
- Demo uses simple encoding; production should use AES‑256 or Web Crypto API.
- Ensures confidentiality, integrity, and authenticity of stored records.

### 5️⃣ Real‑Time Dashboard & Reporting
- Displays live charts (attendance breakdown, performance over time) using Chart.js.
- Shows a summary table of key metrics (attendance %, late arrivals, absentees).
- Updates automatically at set intervals or via a live data feed (WebSocket/API).
- Switches between **LIVE** and **Offline** status badges based on network connection.

---

## 🛠 Tech Stack
- **Frontend:** HTML5, CSS (Glassmorphism/Dark Theme), JavaScript (Modular)
- **Libraries:** Tesseract.js (OCR), Chart.js (Charts & Graphs)
- **Offline Support:** Service Worker + Local Tesseract assets
- **Security:** Simulated encryption in demo (replace with Web Crypto API for production)

---

## 📂 Project Structure
PRACTICAL-SMART-ATTENDANCE/
│
├── 📁 AddStudent/
│   ├── addStudent.html
│   ├── addStudent.css
│   └── addStudent.js
│
├── 📁 Assets/
│   ├──Add-Student.png
│   │──Cloud Backup.png
│   │──Encryption.png
│   │──Facial.png 
│   │──icon-clock.png 
│   │──icon-face.png  
│   ├──icon-secure.png
│   │──Login-Background.png 
│   │──logo.png
│   │──Offline-Mode.png 
│   │──Realtime-Database.png
│   │──Title-Logo.png
│   └──workflow.png
│       
│
├── 📁 Camera/
│   ├── camera.css
│   ├── camera.html
│   ├── cameraMedia.css
│   └── cameraMedia.js
│
├── 📁 Contact/
│   ├── contact.css
│   ├── contact.html
│   ├── contactMedia.css
│   └── contactMedia.js
│
├── 📁 DataShow/
│   ├── DataShow.css
│   ├── DataShow.html
│   └── DataShow.js
│
├── 📁 Encryption/
│   ├── encryption.css
│   ├── encryption.html
│   └── encryption.js
│
├── 📁 Feature/
│   ├── Feature.css
│   ├── Feature.html
│   └── FeatureMedia.css
│
├── 📁 Home/
│   ├── Home.css
│   ├── Home.html
│   ├── HomeMedia.css
│   └── HomePage.js
|
├── 📁 ScanPage/
│   ├── scanPage.css
│   ├── scanPage.html
│   └── scanPage.js
|
├── 📁 WorkFlow/
│   ├── workflow.html
│   ├── workflow.css
│   └── workflowMedia.css
|
├──index.html
├── style.css
├── script.js
└── README.md
</pre>