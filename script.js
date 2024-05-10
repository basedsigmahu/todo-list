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

function store() {
    document.querySelector('.create-task form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        const form = event.target;
        const title = form.querySelector('.title').value.trim();
        const description = form.querySelector('.description').value.trim();
        const priority = form.querySelector('#taskpriority').value;
        const isImportant = form.querySelector('#importantCheckbox').checked;

        const errorDiv = form.querySelector('.error'); 

        // Clear previous error messages
        errorDiv.innerHTML = '';

        // Validate form fields
        if (title === "") {
            displayError('Title is required.', errorDiv);
            return;
        }

        if (description === "") {
            displayError('Description is required.', errorDiv);
            return;
        }

        const task = {
            title: title,
            description: description,
            priority: priority,
            isImportant: isImportant
        };
        console.log("Form submitted");
        const taskJSON = JSON.stringify(task);
        localStorage.setItem('taskData', taskJSON);
        alert('Task data stored !');
        modal.classList.add('hide');
        form.reset();
    });
}

function displayError(message, errorDiv) {
    const errorMessage = document.createElement('div');
    errorMessage.textContent = message;
    errorMessage.classList.add('error-message');
    errorDiv.appendChild(errorMessage);
}
