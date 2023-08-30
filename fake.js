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
const changeState = (taskId, newState) => { // pass index instead of id
    const tmp = parseTasks();
    tmp[taskId - 1].completed = newState; //                TODO
    localStorage.setItem('tasks', JSON.stringify(tmp));
}

/**
 * deletes a task in localStorage
 * @param {number} taskIndex
 */
const deleteTask = (taskIndex) => {
    const tmp = parseTasks();
    tmp.splice(taskIndex, 1);
    localStorage.setItem('tasks', JSON.stringify(tmp));

}

export default { parseTasks, addTask, changeState, storeTasks, deleteTask }