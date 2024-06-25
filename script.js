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
    loadTasks();

    function setActiveTab(button) {
        tabs.forEach(tab => tab.classList.remove('active'));
        button.classList.add('active');
    }

    const allTabButton = document.querySelector('.all-tab');
    allTabButton.addEventListener('click', function(event) {
        event.preventDefault();
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

    allTabButton.click();
});

function store() {
    document.querySelector('.modal-main form').addEventListener('submit', function(event) {
        event.preventDefault();

        const form = event.target;
        const title = form.querySelector('.title').value.trim();
        const description = form.querySelector('.description').value.trim();
        const isImportant = form.querySelector('#importantCheckbox').checked;

        const radioButtons = form.querySelectorAll('input[name="task-status"]');
        let selectedValue = null;

        for (const radioButton of radioButtons) {
            if (radioButton.checked) {
                selectedValue = radioButton.value;
                break;
            }
        }

        const errorDiv = form.querySelector('.error');
        errorDiv.innerHTML = '';

        if (title === "" || description === "") {
            displayError('Enter Fields', errorDiv);
            return;
        }

        const task = {
            title: title,
            description: description,
            isImportant: isImportant,
            status: selectedValue
        };

        let tasks = JSON.parse(localStorage.getItem('tasksData')) || [];
        tasks.push(task);
        localStorage.setItem('tasksData', JSON.stringify(tasks));

        const modal = document.querySelector('.modal-main');
        modal.classList.add('hide');
        form.reset();
        loadTasks();
    });
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasksData')) || [];
    const taskContainer = document.querySelector('.all');

    taskContainer.innerHTML = '';

    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task-dsp');

        const titleElement = document.createElement('h3');
        titleElement.textContent = task.title;

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = task.description;

        const importantElement = document.createElement('p');
        importantElement.textContent = `Important: ${task.isImportant ? 'Yes' : 'No'}`;

        const statusElement = document.createElement('p');
        statusElement.textContent = `Status: ${task.status}`;

        taskElement.appendChild(titleElement);
        taskElement.appendChild(descriptionElement);
        taskElement.appendChild(importantElement);
        taskElement.appendChild(statusElement);

        taskContainer.appendChild(taskElement);
    });
}

function loadcompTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasksData')) || [];
    const taskContainer = document.querySelector('.all');

    taskContainer.innerHTML = '';
    const compTasks = tasks.filter(task => task.status === 'completed');

    compTasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task-dsp');

        const titleElement = document.createElement('h3');
        titleElement.textContent = task.title;

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = task.description;

        const importantElement = document.createElement('p');
        importantElement.textContent = `Important: ${task.isImportant ? 'Yes' : 'No'}`;

        const statusElement = document.createElement('p');
        statusElement.textContent = `Status: ${task.status}`;

        taskElement.appendChild(titleElement);
        taskElement.appendChild(descriptionElement);
        taskElement.appendChild(importantElement);
        taskElement.appendChild(statusElement);

        taskContainer.appendChild(taskElement);
    });
}

function loadPendingTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasksData')) || [];
    const taskContainer = document.querySelector('.all');

    taskContainer.innerHTML = '';
    const pendingTasks = tasks.filter(task => task.status === 'pending');

    pendingTasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task-dsp');

        const titleElement = document.createElement('h3');
        titleElement.textContent = task.title;

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = task.description;

        const importantElement = document.createElement('p');
        importantElement.textContent = `Important: ${task.isImportant ? 'Yes' : 'No'}`;

        const statusElement = document.createElement('p');
        statusElement.textContent = `Status: ${task.status}`;

        taskElement.appendChild(titleElement);
        taskElement.appendChild(descriptionElement);
        taskElement.appendChild(importantElement);
        taskElement.appendChild(statusElement);

        taskContainer.appendChild(taskElement);
    });
}

function loadImportantTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasksData')) || [];
    const taskContainer = document.querySelector('.all');

    taskContainer.innerHTML = '';

    const importantTasks = tasks.filter(task => task.isImportant);

    importantTasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task-dsp');

        const titleElement = document.createElement('h3');
        titleElement.textContent = task.title;

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = task.description;

        const importantElement = document.createElement('p');
        importantElement.textContent = 'Important: Yes';

        const statusElement = document.createElement('p');
        statusElement.textContent = `Status: ${task.status}`;

        taskElement.appendChild(titleElement);
        taskElement.appendChild(descriptionElement);
        taskElement.appendChild(importantElement);
        taskElement.appendChild(statusElement);

        taskContainer.appendChild(taskElement);
    });
}

function displayError(message, errorDiv) {
    const errorMessage = document.createElement('div');
    errorMessage.textContent = message;
    errorMessage.classList.add('error-message');
    errorDiv.appendChild(errorMessage);

    errorDiv.classList.remove('hide');

    setTimeout(function() {
        errorDiv.classList.add('hide');
        errorMessage.textContent = '';
    }, 3000);
}
