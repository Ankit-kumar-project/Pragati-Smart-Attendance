// Status badge toggle based on network
const liveBadge = document.getElementById('live-status');
const offlineBadge = document.getElementById('offline-status');

function updateStatus() {
  if (navigator.onLine) {
    liveBadge.classList.remove('hidden');
    offlineBadge.classList.add('hidden');
  } else {
    liveBadge.classList.add('hidden');
    offlineBadge.classList.remove('hidden');
  }
}
window.addEventListener('online', updateStatus);
window.addEventListener('offline', updateStatus);
updateStatus();

// Chart.js demo data
const attendanceCtx = document.getElementById('attendanceChart').getContext('2d');
new Chart(attendanceCtx, {
  type: 'pie',
  data: {
    labels: ['Present', 'Absent', 'Late'],
    datasets: [{
      data: [85, 10, 5],
      backgroundColor: ['#5de4c7', '#ff6b6b', '#7aa2f7']
    }]
  },
  options: { responsive: true }
});

const performanceCtx = document.getElementById('performanceChart').getContext('2d');
new Chart(performanceCtx, {
  type: 'line',
  data: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [{
      label: 'Attendance %',
      data: [90, 88, 92, 85, 95],
      borderColor: '#5de4c7',
      backgroundColor: 'rgba(93, 228, 199, 0.1)',
      fill: true,
      tension: 0.3
    }]
  },
  options: { responsive: true }
});

// Simulate live data updates
setInterval(() => {
  const tbody = document.getElementById('report-body');
  tbody.innerHTML = `
    <tr><td>Attendance %</td><td>${rand(85,95)}%</td><td>${rand(80,95)}%</td><td>${rand(78,95)}%</td></tr>
    <tr><td>Late Arrivals</td><td>${rand(0,5)}</td><td>${rand(5,15)}</td><td>${rand(20,40)}</td></tr>
    <tr><td>Absentees</td><td>${rand(0,5)}</td><td>${rand(5,12)}</td><td>${rand(15,30)}</td></tr>
  `;
}, 5000);

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}