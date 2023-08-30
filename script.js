import srv from './services.js'
import fake from './fake.js'

const addForm = document.getElementById('add-form');
let tasks = [];

const renderTasks = () => {
    const list = document.getElementById("list")

    const list2render = tasks.map(task => `
    <div  class="task">
        <div class="left">
            <input data-id=${task.id} class="statusCheckBox" type="checkbox" ${task.completed ? "checked" : ""}>
            <p>${task.id}. ${task.todo}</p>
        </div>
        <div class="right">
        <p class="user-id grey-font with-radius">user#${task.userId}&nbsp;</p>
        <button class="task-btn edit-btn"><i class=" ph ph-pencil-simple-line"></i></button>
        <button class="task-btn x-btn"><i class="ph-bold ph-x"></i></button>
        </div>
        </div>
     `).join("");
    list.innerHTML = list2render;
}

const fetchFromApi = () => {
    return srv.fetchTasks()
        .then(res => {
            return res.json();
        })
        .then((res) => {
            localStorage.setItem("tasks", JSON.stringify(res.todos))
            tasks = res.todos;
        })
}

window.onload = () => {
    if (localStorage.getItem('tasks') && JSON.parse(localStorage.getItem('tasks')).length) {
        tasks = fake.parseTasks();
        renderTasks();
        const checkboxes = document.querySelectorAll('.statusCheckBox');

        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (event) => {
                const taskId = event.target.getAttribute('data-id');
                const newState = event.target.checked;
                srv.changeState(taskId, newState);
                fake.changeState(taskId, newState);
            })
        })
    }
    else {
        fetchFromApi()
            .then(() => renderTasks())
            .then(() => {
                const checkboxes = document.querySelectorAll('.statusCheckBox');

                checkboxes.forEach(checkbox => {
                    checkbox.addEventListener('change', (event) => {
                        const taskId = event.target.getAttribute('data-id');
                        const newState = event.target.checked;
                        srv.changeState(taskId, newState);
                        fake.changeState(taskId, newState);
                    })
                })
            })
    }
}

addForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newTask = e.target.newTask.value;
    srv.addTask(newTask, '1')
        .then(res => res.json())
        .then(res => {
            fake.addTask(res)
            tasks = fake.parseTasks();
            renderTasks();
        });
    addForm.reset();
});