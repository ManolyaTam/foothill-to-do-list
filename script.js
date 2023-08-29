import srv from './services.js'

const addForm = document.getElementById('add-form');
let tasks = [];

const renderTasks = () => {
    const list = document.getElementById("list")

    const list2render = tasks.map(task => `
    <div  class="task">
        <div class="left">
            <input type="checkbox" ${task.completed ? "checked" : ""}>
            <p>${task.id}.</p>
            <p>${task.todo}</p>
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

const FetchAndRenderTasks = () => {
    srv.fetchTasks()
        .then(res => {
            return res.json();
        })
        .then((res) => {
            localStorage.setItem("tasks", JSON.stringify(res.todos))// should i keep this?
            tasks = res.todos;
        })
        .then(() => renderTasks())
}

window.onload = FetchAndRenderTasks();

addForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newTask = e.target.newTask.value;
    srv.addTask(newTask, '1')
    .then(res => res.json())
    .then(res => {
        tasks.push(res);
        console.log(res);
        renderTasks();
    });
    // FetchAndRenderTasks(); 
    // in reality it should add to the server rather than change on local array

    addForm.reset();
});
