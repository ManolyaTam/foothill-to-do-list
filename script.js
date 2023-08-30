import srv from './services.js'
import fake from './fake.js'

const addForm = document.getElementById('add-form');
const searchBar = document.getElementById('search-bar');
let tasks = [];

const findMatching = () => {
    const searchParam = searchBar.value.trim().toLowerCase();
    const matchingArr = tasks.filter(task => {
        let matching = task.todo.trim().toLowerCase().includes(searchParam) 
        || task.userId.toString().includes(searchParam)
        || task.id.toString().includes(searchParam);
        return matching;
    })
    return matchingArr
}

searchBar.addEventListener('input', () => {
    renderTasks()
})

const renderTasks = () => {
    const list = document.getElementById("list")
    const matchingArr = findMatching();
    const list2render = matchingArr.map(task => `
    <div  class="task" data-id=${task.id}>
        <div class="left">
            <input data-id=${task.id} class="statusCheckBox" type="checkbox" ${task.completed ? "checked" : ""}>
            <p>${task.id}.</p><textarea readonly class="task-desc txt-input no-outline no-border" style="height: fit-content; padding: 1px 6px">${task.todo}</textarea>
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
        addEventListeners();

    } else {
        fetchFromApi()
            .then(() => renderTasks())
            .then(() => { addEventListeners() })
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

const addEventListeners = () => {
    // checkboxes
    const checkboxes = document.querySelectorAll('.statusCheckBox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (event) => {
            const taskId = event.target.getAttribute('data-id');
            const newState = event.target.checked;
            srv.changeState(taskId, newState);
            fake.changeState(taskId, newState);
        })
    })

    // edit buttons
    const EditBtns = document.querySelectorAll('.edit-btn');
    EditBtns.forEach(btn => {
        btn.addEventListener('click', (event) => {
            const targetTask = event.target.closest('.task');
            const taskId = targetTask.getAttribute('data-id');
            const textarea = targetTask.querySelector('.task-desc')
            textarea.readOnly = false;
            textarea.classList.remove('no-border');
            textarea.focus();

            textarea.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    const targetIndex = tasks.findIndex(task => task.id == taskId);
                    const newTaskObj = tasks[targetIndex]; // reminder: call by ref
                    newTaskObj.todo = textarea.value;
                    // there is no api for updating the todo

                    fake.storeTasks(tasks);
                    textarea.readOnly = true;
                    textarea.classList.add('no-border');
                }
            })
        })
    })
}