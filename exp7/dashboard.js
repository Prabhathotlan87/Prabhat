// Array to store tasks
let tasks = [];

// Add task function
document.getElementById('task-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const taskName = document.getElementById('task-name').value;
    const taskDescription = document.getElementById('task-description').value;
    const taskPriority = document.getElementById('task-priority').value;
    const taskDueDate = document.getElementById('task-due-date').value;
    const taskCategory = document.getElementById('task-category').value;

    const newTask = {
        id: Date.now(),
        taskName,
        taskDescription,
        taskPriority,
        taskDueDate,
        taskCategory,
        progress: "Pending"
    };

    tasks.push(newTask);
    displayTasks();
    document.getElementById('task-form').reset(); // Reset form fields after adding task
});

// Display tasks in table
function displayTasks() {
    const taskTableBody = document.querySelector('#task-table tbody');
    taskTableBody.innerHTML = ''; // Clear existing rows

    tasks.forEach(task => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${task.taskName}</td>
            <td>${task.taskDescription}</td>
            <td>${task.taskPriority}</td>
            <td>${task.taskDueDate}</td>
            <td>
                <select onchange="updateProgress(${task.id}, this.value)">
                    <option value="Pending" ${task.progress === 'Pending' ? 'selected' : ''}>Pending</option>
                    <option value="In Progress" ${task.progress === 'In Progress' ? 'selected' : ''}>In Progress</option>
                    <option value="Completed" ${task.progress === 'Completed' ? 'selected' : ''}>Completed</option>
                </select>
            </td>
            <td>${task.taskCategory}</td>
            <td>
                <button class="edit" onclick="editTask(${task.id})">Edit</button>
                <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
            </td>
        `;

        taskTableBody.appendChild(row);
    });
}

// Edit task function
function editTask(taskId) {
    const task = tasks.find(task => task.id === taskId);

    if (task) {
        document.getElementById('task-name').value = task.taskName;
        document.getElementById('task-description').value = task.taskDescription;
        document.getElementById('task-priority').value = task.taskPriority;
        document.getElementById('task-due-date').value = task.taskDueDate;
        document.getElementById('task-category').value = task.taskCategory;

        // Remove the task from the array (it will be added back when the form is submitted)
        tasks = tasks.filter(t => t.id !== taskId);
    }
}

// Delete task function
function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    displayTasks();
}

// Update task progress
function updateProgress(taskId, newProgress) {
    const task = tasks.find(task => task.id === taskId);
    if (task) {
        task.progress = newProgress;
        displayTasks();
    }
}

// Initialize by displaying tasks (in case there are any saved tasks from previous sessions)
displayTasks();
