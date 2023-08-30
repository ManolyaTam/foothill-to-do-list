const api = "https://dummyjson.com/todos";

const fetchTasks = () => {
    return fetch(api);
};

const addTask = (description, userId) => {
    return fetch(`${api}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            todo: description,
            completed: false,
            userId: userId
        })
    })
}

/**
 * changes the 'completed' attribute value
 */
const changeState = (taskId, newState) => {
    fetch(`${api}/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: newState })
    })
}

export default { fetchTasks, addTask, changeState }