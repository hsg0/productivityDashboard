// DOM Elements
const calendarGrid = document.getElementById("calendarGrid");
const monthYear = document.getElementById("monthYear");
const prevBtn = document.getElementById("prevMonth");
const nextBtn = document.getElementById("nextMonth");
const eventModal = document.getElementById("eventModal");
const eventTitleInput = document.getElementById("eventTitle");
const eventTimeInput = document.getElementById("eventTime");
const saveEventBtn = document.getElementById("saveEvent");
const cancelEventBtn = document.getElementById("cancelEvent");
const modalDateTitle = document.getElementById("modalDateTitle");
const eventList = document.getElementById("eventList");

// Global State
let currentDate = new Date();
let selectedDate = null;
let editingIndex = null;
let events = JSON.parse(localStorage.getItem("calendarEvents") || "[]");

// Utils
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Render Calendar
function renderCalendar(date) {
  calendarGrid.innerHTML = "";

  const year = date.getFullYear();
  const month = date.getMonth();
  const today = new Date();

  monthYear.textContent = `${monthNames[month]} ${year}`;

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Add Day Headers
  days.forEach(day => {
    const dayName = document.createElement("div");
    dayName.textContent = day;
    dayName.className = "day-name";
    calendarGrid.appendChild(dayName);
  });

  // Fill Blank Cells
  for (let i = 0; i < firstDay; i++) {
    calendarGrid.appendChild(document.createElement("div"));
  }

  // Add Day Cells
  for (let day = 1; day <= daysInMonth; day++) {
    const dayCell = document.createElement("div");
    dayCell.textContent = day;

    const cellDate = new Date(year, month, day);
    const isoDate = cellDate.toISOString().split("T")[0];
    dayCell.dataset.date = isoDate;

    if (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      dayCell.classList.add("today");
    }

    dayCell.addEventListener("click", () => {
      selectedDate = isoDate;
      editingIndex = null;
      modalDateTitle.textContent = `Add Event for ${selectedDate}`;
      eventTitleInput.value = "";
      eventTimeInput.value = "";
      eventModal.classList.remove("hidden");
    });

    calendarGrid.appendChild(dayCell);
  }

  renderEventList();
}

// Save (or update) Event
saveEventBtn.addEventListener("click", () => {
  const title = eventTitleInput.value.trim();
  const time = eventTimeInput.value;

  if (!title || !time || !selectedDate) {
    alert("All fields required.");
    return;
  }

  const newEvent = { date: selectedDate, title, time };

  if (editingIndex !== null) {
    events[editingIndex] = newEvent;
  } else {
    events.push(newEvent);
  }

  localStorage.setItem("calendarEvents", JSON.stringify(events));
  eventModal.classList.add("hidden");
  renderCalendar(currentDate);
});

// Cancel Modal
cancelEventBtn.addEventListener("click", () => {
  eventModal.classList.add("hidden");
  editingIndex = null;
});

// Render Event List
function renderEventList() {
  eventList.innerHTML = "";

  const sorted = events.sort((a, b) => a.date.localeCompare(b.date));
  sorted.forEach((event, index) => {
    const item = document.createElement("li");
    item.innerHTML = `
      <strong>${event.date} @ ${event.time}</strong> - ${event.title}
      <div class="event-buttons">
        <button class="edit-btn" data-index="${index}">✎</button>
        <button class="delete-btn" data-index="${index}">🗑</button>
      </div>
    `;
    eventList.appendChild(item);
  });

  // Delete Event
  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = btn.dataset.index;
      events.splice(index, 1);
      localStorage.setItem("calendarEvents", JSON.stringify(events));
      renderEventList();
    });
  });

  // Edit Event
  document.querySelectorAll(".edit-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = btn.dataset.index;
      const event = events[index];
      selectedDate = event.date;
      editingIndex = index;
      modalDateTitle.textContent = `Edit Event for ${event.date}`;
      eventTitleInput.value = event.title;
      eventTimeInput.value = event.time;
      eventModal.classList.remove("hidden");
    });
  });
}

// Reminders (every minute)
setInterval(() => {
  const now = new Date();
  const currentTime = now.toTimeString().slice(0, 5);
  const todayDate = now.toISOString().split("T")[0];

  events.forEach(event => {
    if (event.date === todayDate && event.time === currentTime) {
      alert(`Event Reminder: ${event.title} at ${event.time}`);
    }
  });
}, 60000);

// Navigation
prevBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
});

nextBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
});

// Load
renderCalendar(currentDate);