// get all needed DOM elements
const form = document.getElementById("checkInForm");
const attendee = document.getElementById("attendeeName");
const teamName = document.getElementById("teamSelect");

// track attendance
let count = 0;
const maxCount = 50;

// team counts
let teamCounts = {
  water: 0,
  zero: 0,
  power: 0,
};

// attendee list
let attendees = [];

// get counter and progress bar elements
const attendeeCount = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");
const attendeeList = document.getElementById("attendeeList");

// handle form submission
form.addEventListener("submit", function (event) {
  event.preventDefault(); // prevent default form submission

  // get form values
  const name = attendee.value.trim();
  const team = teamName.value;
  const teamFullName = teamName.selectedOptions[0].text;

  if (!name || !team) {
    return;
  }

  // increment count, but not above maxCount
  if (count < maxCount) {
    count++;
    teamCounts[team]++;
    attendees.push({ name: name, team: team });
    saveData();
    updateDisplay();
  }

  // welcome message
  const message = `HURRAHHH!! 🥳 Welcome ${name} from ${teamFullName}`;
  console.log(message);
  // show confetti
  showConfetti();
  form.reset();
});

// Simple confetti effect
function showConfetti() {
  for (let i = 0; i < 40; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = Math.random() * 100 + "%";
    confetti.style.backgroundColor = randomColor();
    confetti.style.animationDelay = Math.random() * 0.5 + "s";
    document.body.appendChild(confetti);
    setTimeout(function () {
      confetti.remove();
    }, 2000);
  }
}

// Save data to localStorage
function saveData() {
  localStorage.setItem("attendanceCount", count);
  localStorage.setItem("teamCounts", JSON.stringify(teamCounts));
  localStorage.setItem("attendees", JSON.stringify(attendees));
}

// Load data from localStorage
function loadData() {
  const savedCount = localStorage.getItem("attendanceCount");
  const savedTeamCounts = localStorage.getItem("teamCounts");
  const savedAttendees = localStorage.getItem("attendees");
  if (savedCount !== null) {
    count = parseInt(savedCount);
  }
  if (savedTeamCounts) {
    teamCounts = JSON.parse(savedTeamCounts);
  }
  if (savedAttendees) {
    attendees = JSON.parse(savedAttendees);
  }
}

// Update all display elements
function updateDisplay() {
  attendeeCount.textContent = count;
  document.getElementById("waterCount").textContent = teamCounts.water;
  document.getElementById("zeroCount").textContent = teamCounts.zero;
  document.getElementById("powerCount").textContent = teamCounts.power;
  // progress bar
  const percent = Math.round((count / maxCount) * 100);
  progressBar.style.width = `${percent}%`;
  progressBar.textContent = "";
  // attendee list
  attendeeList.innerHTML = "";
  attendees.forEach(function (person) {
    const li = document.createElement("li");
    const badge = document.createElement("span");
    badge.className = `team-badge ${person.team}`;
    badge.textContent =
      person.team === "water"
        ? "Water Wise"
        : person.team === "zero"
        ? "Net Zero"
        : "Renewables";
    li.appendChild(badge);
    li.appendChild(document.createTextNode(person.name));
    attendeeList.appendChild(li);
  });
}

// On page load, restore data
loadData();
updateDisplay();

function randomColor() {
  const colors = [
    "#00c7fd",
    "#00aeef",
    "#0071c5",
    "#f9d923",
    "#ff6f61",
    "#7ed957",
    "#f97fff",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}
