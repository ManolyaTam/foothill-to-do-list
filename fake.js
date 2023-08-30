/**
 * Parses tasks from localStorage
 * @returns {Array}
 */
const parseTasks = () => {
    return JSON.parse(localStorage.getItem('tasks'));
};

/**
 * Stores tasks in localStorage
 * @param {Array} arr 
 */
const storeTasks = (arr) => {
    localStorage.setItem('tasks', JSON.stringify(arr));
}

/**
 * Creates a new task locally
 * @param {number} taskId 
 * @param {boolean} newState 
 */
const addTask = (newTask) => {
    const tmp = parseTasks();
    tmp.push(newTask);
    storeTasks(tmp);
}

/**
 * Changes the 'completed' attribute value locally
 * @param {number} taskId 
 * @param {boolean} newState 
 */
const changeState = (taskId, newState) => {
    const tmp = parseTasks();
    tmp[taskId - 1].completed = newState;
    localStorage.setItem('tasks', JSON.stringify(tmp));
}

export default { parseTasks, addTask, changeState, storeTasks }