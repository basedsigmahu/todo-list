document.addEventListener('DOMContentLoaded', function() {
    const modalMain = document.querySelector('.modal-main');
    const createTaskButton = document.querySelector('.create-task');
    const close = document.querySelector('.close-btn');
    const tabs = document.querySelectorAll('.state-of-task button');

    function showModal() {
        modalMain.classList.remove('hide');
    }

    function closeModal() {
        modalMain.classList.add('hide');
    }

    createTaskButton.addEventListener('click', showModal);
    close.addEventListener('click', closeModal);

    store();
    loadTasks(); // Load tasks initially when the page loads

    // Function to set active class
    function setActiveTab(button) {
        tabs.forEach(tab => tab.classList.remove('active'));
        button.classList.add('active');
    }

    const allTabButton = document.querySelector('.all-tab');
    allTabButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default anchor behavior
        setActiveTab(this);
        document.querySelector('.allmain').classList.remove('hide');
        loadTasks();
    });

    const compBtn = document.querySelector('.completed-tab');
    compBtn.addEventListener('click', function(event) {
        event.preventDefault();
        setActiveTab(this);
        loadcompTasks();
    });

    const pendingBtn = document.querySelector('.pending-tab');
    pendingBtn.addEventListener('click', function(event) {
        event.preventDefault();
        setActiveTab(this);
        loadPendingTasks();
    });

    const impBtn = document.querySelector('.imp-tab');
    impBtn.addEventListener('click', function(event) {
        event.preventDefault();
        setActiveTab(this);
        loadImportantTasks();
    });

    // Trigger the click event on the "all-tab" button when the page loads
    allTabButton.click();
});

function store() {
    document.querySelector('.modal-main form').addEventListener('submit', function(event) {
        event.preventDefault();

        const form = event.target;
        const title = form.querySelector('.title').value.trim();
        const description = form.querySelector('.description').value.trim();
        const isImportant = form.querySelector('#importantCheckbox').checked; // Ensure this is correctly getting the checkbox value

        // Get all radio buttons within the 'radio-btn' div
        const radioButtons = form.querySelectorAll('input[name="task-status"]');
        let selectedValue = null;

        // Loop through the radio buttons to find the checked one
        for (const radioButton of radioButtons) {
            if (radioButton.checked) {
                selectedValue = radioButton.value;
                break; // Exit the loop once a checked radio button is found
            }
        }

        const errorDiv = form.querySelector('.error');

        // Clear previous error message
        errorDiv.innerHTML = '';

        if (title === "" || description === "") {
            displayError('Enter Fields', errorDiv);
            return;
        }

        const task = {
            title: title,
            description: description,
            isImportant: isImportant,
            status: selectedValue // Store the value of the selected radio button
        };

        // Get data or create new
        let tasks = JSON.parse(localStorage.getItem('tasksData')) || [];
        tasks.push(task);

        // Store updated tasks array in local storage
        localStorage.setItem('tasksData', JSON.stringify(tasks));

        console.log("Form submitted and task added to storage");

        // Hide the modal and reset the form
        const modal = document.querySelector('.modal-main');
        modal.classList.add('hide');
        form.reset();

        // to display tasks from local storage
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
            <p>Important: ${task.isImportant ? 'Yes' : 'No'}</p>
            <p>Status: ${task.status}</p>
        `;
        taskContainer.appendChild(taskElement);
    });
}

function loadcompTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasksData')) || [];
    const taskContainer = document.querySelector('.all');

    // Clear any existing tasks
    taskContainer.innerHTML = '';
    const compTasks = tasks.filter(task => task.status === 'completed');

    compTasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task-dsp');
        taskElement.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <p>Important: ${task.isImportant ? 'Yes' : 'No'}</p>
            <p>Status: ${task.status}</p>
        `;
        taskContainer.appendChild(taskElement);
    });
}

function loadPendingTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasksData')) || [];
    const taskContainer = document.querySelector('.all');

    // Clear any existing tasks
    taskContainer.innerHTML = '';
    const pendingTasks = tasks.filter(task => task.status === 'pending');

    pendingTasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task-dsp');
        taskElement.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <p>Important: ${task.isImportant ? 'Yes' : 'No'}</p>
            <p>Status: ${task.status}</p>
        `;
        taskContainer.appendChild(taskElement);
    });
}

function loadImportantTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasksData')) || [];
    const taskContainer = document.querySelector('.all');

    // Clear any existing tasks
    taskContainer.innerHTML = '';

    // Filter tasks to get only important ones
    const importantTasks = tasks.filter(task => task.isImportant);

    // Display only important tasks
    importantTasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task-dsp');
        taskElement.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <p>Important: Yes</p>
            <p>Status: ${task.status}</p>
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
