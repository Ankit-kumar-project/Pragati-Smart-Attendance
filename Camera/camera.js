const video = document.getElementById("camera");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const container = document.getElementById("showAttendance");
const clearBtn = document.getElementById("clearContainer");

const users = [
  { id: 1, name: "Aarav Pandey" },
  { id: 2, name: "Vihaan Mehta" },
  { id: 3, name: "Aditya Sharma" },
  { id: 4, name: "Kabir Kohli" },
  { id: 5, name: "Arjun Dhoni" },
  { id: 6, name: "Reyansh Dev Pandey" },
  { id: 7, name: "Atharv Singh" },
  { id: 8, name: "Krishna Yadav" },
  { id: 9, name: "Ishaan Verma" },
  { id: 10, name: "Dhruv Malhotra" },
  { id: 11, name: "Ananya Reddy" },
  { id: 12, name: "Diya Nair" },
  { id: 13, name: "Ira Kapoor" },
  { id: 14, name: "Myra Joshi" },
  { id: 15, name: "Aadhya Bhatia" },
  { id: 16, name: "Avni Deshmukh" },
  { id: 17, name: "Kavya Menon" },
  { id: 18, name: "Riya Choudhary" },
  { id: 19, name: "Saanvi Iyer" },
  { id: 20, name: "Meera Patil" },
  { id: 21, name: "Aanya Rao" },
  { id: 22, name: "Navya Pillai" },
  { id: 23, name: "Pari Gupta" },
  { id: 24, name: "Shruti Kulkarni" },
  { id: 25, name: "Tara Saxena" },
  { id: 26, name: "Neha Joshi" },
  { id: 27, name: "Priya Agarwal" },
  { id: 28, name: "Simran Kaur" },
  { id: 29, name: "Pooja Mishra" },
  { id: 30, name: "Swara Jain" },
];

let stream;
let timer=null;

//Update clock
function updateContainer() {
  const now = new Date();

  //Date
  const day = now.getDate(); // 1 - 31
  const month = now.getMonth() + 1; // 0 - 11, so add 1
  const year = now.getFullYear(); // 4-digit year
  const dateString = `${day.toString().padStart(2, "0")}/${month.toString().padStart(2, "0")}/${year}`;
  //Time
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  const currentTime = `${hours}:${minutes}:${seconds}`;

  //user
  let num=Math.random();
  num=Math.floor(num*30)+1;

  // Create a new row
      const row = document.createElement("pre");
      row.className = "row";
      row.textContent = "Date: "+ dateString + "     "+"Time: " + currentTime +"     "+"ID: "+users[num].id+ "     "+"Name "+ users[num].name  ;

      // Append to container
      container.appendChild(row);
}

clearBtn.style.display="none";
video.style.animationPlayState = "paused";
async function startCamera() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    video.style.animationPlayState = "running";
    timer=setInterval(updateContainer,1000);
    clearBtn.style.display="none";
  } catch (err) {
    console.error("Error accessing camera: ", err);
    alert("Unable to access camera. Please allow permissions.");
  }
}

function stopCamera() {
  clearInterval(timer);
  clearBtn.style.display="inline-block";
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
    video.srcObject = null;
    video.style.animationPlayState = "paused";
    
  }
}
function clearContainer(){
  container.innerHTML="";
  clearBtn.style.display="none";
}
startBtn.addEventListener("click", startCamera);
stopBtn.addEventListener("click", stopCamera);
clearBtn.addEventListener("click",clearContainer);
