import "./styles.css";

const tasksArr = [];

const addTaskTrigger = document.querySelector(".addTaskTrigger");
const addTaskForm = document.querySelector(".addTaskForm");
const cancelTaskButton = document.querySelector("#cancelTaskButton");
const inputTaskDate = document.querySelector("#inputTaskDate");
const addTaskButton = document.querySelector("#addTaskButton");
addTaskTrigger.addEventListener("click", () => {
  addTaskTrigger.classList.toggle("active");
  if (addTaskTrigger.classList.contains("active")) {
    addTaskForm.style.display = "block";
  } else {
    addTaskForm.style.display = "none";
  }
});

cancelTaskButton.addEventListener("click", () => {
  addTaskForm.style.display = "none";
  addTaskTrigger.classList.toggle("active");
});

inputTaskDate.valueAsDate = new Date();
const [datePart] = new Date().toISOString().split("T");
inputTaskDate.min = datePart;

addTaskButton.addEventListener("click", () => {
  const taskName = document.querySelector("#inputTaskName").value;
  const taskDate = document.querySelector("#inputTaskDate").value;
  const taskDescription = document.querySelector("#inputTaskDetails").value;

  if (taskName && taskDate) {
    const task = {
      name: taskName,
      date: taskDate,
      description: taskDescription,
    };
    const tasksDiv = document.querySelector(".TasksDiv");
    tasksDiv.innerHTML = "";
    tasksArr.push(task);
    tasksArr.forEach((task) => {
      addTaskToDOM(task.name, task.description);
    });
  } else {
    alert("Please fill all the fields");
  }
});

function createTaskElement(taskName, taskDescription) {
  // Create the main task div
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task");

  // Create the task details div
  const taskDetailsDiv = document.createElement("div");
  taskDetailsDiv.classList.add("taskDetails");

  // Create the task name heading
  const taskNameHeading = document.createElement("h3");
  taskNameHeading.classList.add("taskName");
  taskNameHeading.textContent = taskName; // Set the task name

  // Create the task description paragraph
  const taskDescriptionParagraph = document.createElement("p");
  taskDescriptionParagraph.classList.add("taskDescription");
  taskDescriptionParagraph.textContent = taskDescription; // Set the task description

  // Append task name and description to task details div
  taskDetailsDiv.appendChild(taskNameHeading);
  taskDetailsDiv.appendChild(taskDescriptionParagraph);

  // Create the task options div
  const taskOptionsDiv = document.createElement("div");
  taskOptionsDiv.classList.add("taskOptions");

  // Create the edit icon (using Font Awesome - make sure it's included)
  const editIcon = document.createElement("i");
  editIcon.classList.add("fa-solid", "fa-pencil", "taskOptionIcon");
  editIcon.ariaHidden = true; // Important for accessibility

  // Create the delete icon (using Font Awesome - make sure it's included)
  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fa-solid", "fa-trash", "taskOptionIcon");
  deleteIcon.ariaHidden = true;

  // Append icons to task options div
  taskOptionsDiv.appendChild(editIcon);
  taskOptionsDiv.appendChild(deleteIcon);

  // Append task details and task options to the main task div
  taskDiv.appendChild(taskDetailsDiv);
  taskDiv.appendChild(taskOptionsDiv);

  return taskDiv; // Return the created task element
}

function addTaskToDOM(taskName, taskDescription) {
  const tasksDiv = document.querySelector(".TasksDiv"); // Get the container

  if (tasksDiv) {
    // Check if the element exists
    const newTask = createTaskElement(taskName, taskDescription);
    tasksDiv.appendChild(newTask);
  } else {
    console.error("Element with class 'TasksDiv' not found.");
  }
}

// Example of how to add event listeners to the dynamically created icons:
document.querySelector(".TasksDiv").addEventListener("click", function (event) {
  if (event.target.classList.contains("fa-pencil")) {
    // Handle edit click
    console.log(
      "Edit clicked for:",
      event.target.closest(".task").querySelector(".taskName").textContent,
    );
  } else if (event.target.classList.contains("fa-trash")) {
    // Handle delete click
    console.log(
      "Delete clicked for:",
      event.target.closest(".task").querySelector(".taskName").textContent,
    );
    event.target.closest(".task").remove(); // Remove the task from the DOM
  }
});
