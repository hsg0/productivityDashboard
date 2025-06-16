const addToDoButton = document.getElementById("addTaskButton");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Load tasks from local storage on page load
window.addEventListener("load", function () {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach((task) => {
        addTaskToDOM(task);
    });
});

addToDoButton.addEventListener("click", function () {
    const inputValue = taskInput.value.trim();

    if (inputValue === "") {
        alert("Please enter a task.");
        return;
    }

    const taskObject = {
        text: inputValue,
        timestamp: getCurrentDateTime()
    };

    addTaskToDOM(taskObject);
    saveTaskToLocalStorage(taskObject);

    taskInput.value = "";
});

function addTaskToDOM(task) {
    const newToDoItem = document.createElement("li");
    newToDoItem.className = "task-item";

    const textSpan = document.createElement("span");
    textSpan.textContent = task.text;
    textSpan.className = "task-text";

    const timeStamp = document.createElement("div");
    timeStamp.textContent = task.timestamp;
    timeStamp.className = "timestamp";

    const buttonGroup = document.createElement("div");
    buttonGroup.className = "button-group";

    // Edit button
    const editButton = document.createElement("button");
    editButton.textContent = "✎";
    editButton.className = "edit-btn";
    editButton.addEventListener("click", function () {
        const currentText = textSpan.textContent;
        const input = document.createElement("input");
        input.type = "text";
        input.value = currentText;
        input.className = "edit-input";

        const saveButton = document.createElement("button");
        saveButton.textContent = "✔";
        saveButton.className = "save-btn";

        textSpan.replaceWith(input);
        editButton.replaceWith(saveButton);

        saveButton.addEventListener("click", function () {
            const newText = input.value.trim();
            if (newText === "") {
                alert("Task cannot be empty.");
                return;
            }

            input.replaceWith(textSpan);
            textSpan.textContent = newText;
            saveButton.replaceWith(editButton);

            updateTaskInLocalStorage(currentText, newText);
        });
    });

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "✕";
    deleteButton.addEventListener("click", function () {
        taskList.removeChild(newToDoItem);
        removeTaskFromLocalStorage(task.text);
    });

    buttonGroup.appendChild(editButton);
    buttonGroup.appendChild(deleteButton);

    newToDoItem.appendChild(textSpan);
    newToDoItem.appendChild(timeStamp);
    newToDoItem.appendChild(buttonGroup);
    taskList.appendChild(newToDoItem);
}

// Utility function to get formatted current date and time
function getCurrentDateTime() {
    const now = new Date();
    return now.toLocaleString(); // e.g., "6/13/2025, 5:47:30 PM"
}

// Save task to local storage
function saveTaskToLocalStorage(taskObject) {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.push(taskObject);
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
}

// Remove task from local storage
function removeTaskFromLocalStorage(taskText) {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = savedTasks.filter((task) => task.text !== taskText);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}

// Update task in local storage
function updateTaskInLocalStorage(oldText, newText) {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const index = savedTasks.findIndex((task) => task.text === oldText);
    if (index !== -1) {
        savedTasks[index].text = newText;
        savedTasks[index].timestamp = getCurrentDateTime();
        localStorage.setItem("tasks", JSON.stringify(savedTasks));
    }
}



    
