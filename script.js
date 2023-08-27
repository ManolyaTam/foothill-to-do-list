const api = "https://dummyjson.com/todos";
let tasks = [];
const fetchTasks = () => {
    return fetch(api);
};

const renderTasks = () => {
    const list = document.getElementById("list")

    const list2render = tasks.map(task => `
     <div>
     <p>${task.todo}</p>
     <div>
     `).join("");
    list.innerHTML = list2render;
}

window.onload = () => {
    fetchTasks()
        .then(res => {
            localStorage.setItem("tasks", res)
            return res.json();
        })
        .then((res) => {
            console.log(res);
            localStorage.setItem("tasks", JSON.stringify(tasks))
            tasks = res.todos;
            console.log(tasks)
        })
        .then(() => renderTasks())
}
