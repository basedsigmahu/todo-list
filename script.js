document.addEventListener('DOMContentLoaded', function() {
    const modalMain = document.querySelector('.modal-main');
    const createTaskButton = document.querySelector('.create-task');
    const close = document.querySelector('.close-btn');
    const tabs = document.querySelectorAll('.state-of-task button');
    let editMode = false;
    let editTaskIndex = null;

    function showModal() {
        console.log("Showing modal");
        modalMain.classList.remove('hide');
    }

    function closeModal() {
        console.log("Closing modal");
        modalMain.classList.add('hide');
    }

    createTaskButton.addEventListener('click', () => {
        editMode = false;
        resetForm();
        showModal();
    });

    close.addEventListener('click', closeModal);

    store();

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
        window.location.hash = '#all';
    });

    const compBtn = document.querySelector('.completed-tab');
    compBtn.addEventListener('click', function(event) {
        event.preventDefault();
        setActiveTab(this);
        document.querySelector('.allmain').classList.remove('hide');
        loadcompTasks();
        window.location.hash = '#completed';
    });

    const pendingBtn = document.querySelector('.pending-tab');
    pendingBtn.addEventListener('click', function(event) {
        event.preventDefault();
        setActiveTab(this);
        document.querySelector('.allmain').classList.remove('hide');
        loadPendingTasks();
        window.location.hash = '#pending';
    });

    const impBtn = document.querySelector('.imp-tab');
    impBtn.addEventListener('click', function(event) {
        event.preventDefault();
        setActiveTab(this);
        document.querySelector('.allmain').classList.remove('hide');
        loadImportantTasks();
        window.location.hash = '#important';
    });

    function deleteTask(index) {
        let tasks = JSON.parse(localStorage.getItem('tasksData')) || [];
        const taskTitle = tasks[index].title;

        const confirmDelete = confirm(`Are you sure you want to delete the task "${taskTitle}"?`);
        if (confirmDelete) {
            tasks.splice(index, 1);
            localStorage.setItem('tasksData', JSON.stringify(tasks));

            if (document.querySelector('.all-tab').classList.contains('active')) {
                loadTasks();
            } else if (document.querySelector('.pending-tab').classList.contains('active')) {
                loadPendingTasks();
            } else if (document.querySelector('.completed-tab').classList.contains('active')) {
                loadcompTasks();
            } else if (document.querySelector('.imp-tab').classList.contains('active')) {
                loadImportantTasks();
            }
        }
    }

    function store() {
        document.querySelector('.modal-main form').addEventListener('submit', function(event) {
            event.preventDefault();

            const form = event.target;
            const title = form.querySelector('.title').value.trim();
            const description = form.querySelector('.description').value.trim();
            const isImportant = form.querySelector('#importantCheckbox').checked;
            const selectedValue = form.querySelector('#task-status').value;

            const errorDiv = form.querySelector('.error');
            errorDiv.innerHTML = '';

            if (title === "" || description === "") {
                displayError('Enter Fields', errorDiv);
                return;
            }

            let tasks = JSON.parse(localStorage.getItem('tasksData')) || [];

            if (editMode) {
                console.log(`Editing task at index ${editTaskIndex}`);
                tasks[editTaskIndex] = {
                    title: title,
                    description: description,
                    isImportant: isImportant,
                    status: selectedValue
                };
            } else {
                const task = {
                    title: title,
                    description: description,
                    isImportant: isImportant,
                    status: selectedValue
                };
                tasks.push(task);
            }

            localStorage.setItem('tasksData', JSON.stringify(tasks));

            modalMain.classList.add('hide');
            form.reset();
            loadTasks();
        });
    }

    function loadTasks() {
        let tasks = JSON.parse(localStorage.getItem('tasksData')) || [];
        const taskContainer = document.querySelector('.all');

        taskContainer.innerHTML = '';

        tasks.forEach((task, index) => {
            const taskElement = createTaskElement(task, index);
            taskContainer.appendChild(taskElement);
        });
    }

    function loadPendingTasks() {
        let tasks = JSON.parse(localStorage.getItem('tasksData')) || [];
        const taskContainer = document.querySelector('.all');

        taskContainer.innerHTML = '';
        const pendingTasks = tasks.filter(task => task.status === 'pending');

        pendingTasks.forEach((task, index) => {
            const taskElement = createTaskElement(task, index);
            taskContainer.appendChild(taskElement);
        });
    }

    function loadImportantTasks() {
        let tasks = JSON.parse(localStorage.getItem('tasksData')) || [];
        const taskContainer = document.querySelector('.all');

        taskContainer.innerHTML = '';
        const importantTasks = tasks.filter(task => task.isImportant);

        importantTasks.forEach((task, index) => {
            const taskElement = createTaskElement(task, index);
            taskContainer.appendChild(taskElement);
        });
    }

    function loadcompTasks() {
        let tasks = JSON.parse(localStorage.getItem('tasksData')) || [];
        const taskContainer = document.querySelector('.all');

        taskContainer.innerHTML = '';
        const compTasks = tasks.filter(task => task.status === 'completed');

        compTasks.forEach((task, index) => {
            const taskElement = createTaskElement(task, index);
            taskContainer.appendChild(taskElement);
        });
    }

    function createTaskElement(task, index) {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task-dsp');
        taskElement.dataset.index = index;

        const titleElement = document.createElement('h3');
        titleElement.textContent = task.title;

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = task.description;

        const importantElement = document.createElement('p');
        importantElement.textContent = `Important: ${task.isImportant ? 'Yes' : 'No'}`;

        const statusElement = document.createElement('p');
        statusElement.textContent = `Status: ${task.status}`;

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-btn');
        editButton.addEventListener('click', () => {
            editTask(index);
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', () => {
            deleteTask(index);
        });

        taskElement.appendChild(titleElement);
        taskElement.appendChild(descriptionElement);
        taskElement.appendChild(importantElement);
        taskElement.appendChild(statusElement);
        taskElement.appendChild(editButton);
        taskElement.appendChild(deleteButton);

        return taskElement;
    }

    function editTask(index) {
        const tasks = JSON.parse(localStorage.getItem('tasksData')) || [];
        const task = tasks[index];

        const form = modalMain.querySelector('form');
        form.querySelector('.title').value = task.title;
        form.querySelector('.description').value = task.description;
        form.querySelector('#importantCheckbox').checked = task.isImportant;
        form.querySelector('#task-status').value = task.status;

        editMode = true;
        editTaskIndex = index;

        showModal();
    }

    function resetForm() {
        const form = document.querySelector('.modal-main form');
        form.reset();
        form.querySelector('.error').innerHTML = '';
        editMode = false;
        editTaskIndex = null;
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

    function loadTabFromHash() {
        const hash = window.location.hash;

        if (hash === '#completed') {
            setActiveTab(compBtn);
            document.querySelector('.allmain').classList.remove('hide');
            loadcompTasks();
        } else if (hash === '#pending') {
            setActiveTab(pendingBtn);
            document.querySelector('.allmain').classList.remove('hide');
            loadPendingTasks();
        } else if (hash === '#important') {
            setActiveTab(impBtn);
            document.querySelector('.allmain').classList.remove('hide');
            loadImportantTasks();
        } else {
            setActiveTab(allTabButton);
            document.querySelector('.allmain').classList.remove('hide');
            loadTasks();
        }
    }

    loadTabFromHash();
});
