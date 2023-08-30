const api = "https://dummyjson.com/todos";

/**
 * Fetches tasks from server
 */
const fetchTasks = () => {
    return fetch(api);
};

/**
 * Creates a new task on server
 * @param {string} description 
 * @param {number} userId
 */
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
 * Changes the 'completed' attribute value in server
 * @param {number} taskId 
 * @param {boolean} newState 
 */
const changeState = (taskId, newState) => {
    return fetch(`${api}/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: newState })
    })
}

/**
 * Deletes a task in the server
 * @param {number} taskId
 */
const deleteTask = (taskId) => {
    return fetch(`${api}/${taskId}`,{
        method: 'DELETE'
    })
}

export default { fetchTasks, addTask, changeState, deleteTask }