const form = document.getElementById("goalForm");
const titleInput = document.getElementById("goalInput");
const descriptionInput = document.getElementById("goalDescription");
const goalList = document.getElementById("goals");

let goals = JSON.parse(localStorage.getItem("goals") || "[]");

function renderGoals() {
  goalList.innerHTML = "";
  goals.forEach(goal => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${goal.title}</strong><br>${goal.description}`;
    goalList.appendChild(li);
  });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();

  if (title && description) {
    goals.push({ title, description });
    localStorage.setItem("goals", JSON.stringify(goals));
    renderGoals();
    titleInput.value = "";
    descriptionInput.value = "";
  }
});

// Load saved goals
renderGoals();

// Clear (without deleting storage)
document.getElementById("clearGoals").addEventListener("click", function () {
  goalList.innerHTML = "";
});

// Save explicitly
document.getElementById("saveGoals").addEventListener("click", function () {
  localStorage.setItem("goals", JSON.stringify(goals));
  alert("Goals saved!");
});

// Load goals from storage
document.getElementById("loadGoals").addEventListener("click", function () {
  goals = JSON.parse(localStorage.getItem("goals") || "[]");
  renderGoals();
  alert("Goals loaded!");
});

// Delete all goals
document.getElementById("deleteGoals").addEventListener("click", function () {
  if (confirm("Are you sure you want to delete all goals?")) {
    goals = [];
    localStorage.removeItem("goals");
    renderGoals();
  }
});

// Bulk edit all goals
document.getElementById("editGoals").addEventListener("click", function () {
  const newTitle = prompt("Enter new title for ALL goals:");
  const newDescription = prompt("Enter new description for ALL goals:");

  if (newTitle && newDescription) {
    goals = goals.map(goal => ({ title: newTitle, description: newDescription }));
    localStorage.setItem("goals", JSON.stringify(goals));
    renderGoals();
  }
});