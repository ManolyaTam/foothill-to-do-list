const api = "https://dummyjson.com/todos";

/**
 * Fetches tasks from server
 * @returns {Array}
 */
const fetchTasks = () => {
    return fetch(api);
};

/**
 * Creates a new task on server
 * @param {number} taskId 
 * @param {boolean} newState 
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
    fetch(`${api}/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: newState })
    })
}

export default { fetchTasks, addTask, changeState }