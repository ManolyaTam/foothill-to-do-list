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

window.onload = () => {
    fetchTasks()
        .then(res => {
            return res.json();
        })
        .then((res) => {
            localStorage.setItem("tasks", JSON.stringify(res.todos))// should i keep this?
            tasks = res.todos;
        })
        .then(() => renderTasks())
}