document.addEventListener('DOMContentLoaded', function() {
    // Trigger click event on the "All" tab to display it by default
    document.querySelector('.allTab').click();
});

const modal = document.querySelector('.create-task');

open();

function open() {
    modal.classList.add('hide');
    const openbtn = document.querySelector('.tsk');

    function openmodal() {
        modal.classList.remove('hide');
    }

    openbtn.addEventListener('click', openmodal);
}

store();

const status = ['Pending', 'In Progress', 'Done'];

function store() {
    document.querySelector('.create-task form').addEventListener('submit', function(event) {
        event.preventDefault(); 
    
        const form = event.target;
        const title = form.querySelector('.title').value.trim();
        const description = form.querySelector('.description').value.trim();
        const priority = form.querySelector('#taskpriority').value;
        const isImportant = form.querySelector('#importantCheckbox').checked;
    
        const errorDiv = form.querySelector('.error'); 
    
        // Clear previous error message
        errorDiv.innerHTML = '';
    
        if (title === "" && description === "") {
            displayError('Enter Fields', errorDiv);
            return;
        }
    
        const task = {
            title: title,
            description: description,
            priority: priority,
            isImportant: isImportant,
            status: 0
        };
    
        // Get data or create new
        let tasks = JSON.parse(localStorage.getItem('tasksData')) || [];
        tasks.push(task);
    
        // Store updated
        localStorage.setItem('tasksData', JSON.stringify(tasks));
    
        console.log("Form submitted and task added to storage");
    
        alert('Task data stored!');
        modal.classList.add('hide');
        form.reset();
        loadTasks();
    });
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasksData')) || [];
    const taskContainer = document.querySelector('.all');

    // Clear any existing tasks
    taskContainer.innerHTML = '';

    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task-dsp');
        taskElement.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <p>Priority: ${task.priority}</p>
            <p>Important: ${task.isImportant ? 'Yes' : 'No'}</p>
        `;
        taskContainer.appendChild(taskElement);
    });
}

function displayError(message, errorDiv) {
    const errorMessage = document.createElement('div');
    errorMessage.textContent = message;
    errorMessage.classList.add('error-message');
    errorDiv.appendChild(errorMessage);
    
    errorDiv.classList.remove('hide');
    
    setTimeout(function() { // Hide after 3 seconds
        errorDiv.classList.add('hide');
        errorMessage.textContent = '';
    }, 3000);
}

document.querySelector('.allTab').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default anchor behavior
    document.querySelector('.allmain').classList.remove('hide');
    loadTasks();
});

// Add event listener for the close button
document.querySelector('.close-btn').addEventListener('click', function() {
    modal.classList.add('hide');
});
