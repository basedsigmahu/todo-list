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
    
        // clr prv error msg
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
    
        // get data or create new
        let tasks = JSON.parse(localStorage.getItem('tasksData')) || [];
    
        
        tasks.push(task);
    
        // store updated
        localStorage.setItem('tasksData', JSON.stringify(tasks));
    
        console.log("Form submitted and task added to storage");
    
        alert('Task data stored!');
        modal.classList.add('hide');
        form.reset();
    });
    
    //display error messages
    function displayError(message, errorDiv) {
        const errorMessage = document.createElement('p');
        errorMessage.textContent = message;
        errorMessage.style.color = 'red';
        errorDiv.appendChild(errorMessage);
    }
    
}

document.querySelector('.close-btn').addEventListener('click', function() {
    modal.classList.add('hide');
});

function displayError(message, errorDiv) {
    const errorMessage = document.createElement('div');
    errorMessage.textContent = message;
    errorMessage.classList.add('error-message');
    errorDiv.appendChild(errorMessage);
    
    errorDiv.classList.remove('hide');
    
    setTimeout(function() { // hide after 3
        errorDiv.classList.add('hide');
        
        errorMessage.textContent = '';
    }, 3000);
}

