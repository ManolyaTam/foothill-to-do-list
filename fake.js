const parseTasks = () => {
    return JSON.parse(localStorage.getItem('tasks'));
};

const storeTasks = (arr) => {
    localStorage.setItem('tasks', JSON.stringify(arr));
}

const addTask = (newTask) => {
    const tmp = parseTasks();
    tmp.push(newTask);
    storeTasks(tmp);
}

/**
 * changes the 'completed' attribute value
 */
const changeState = (taskId, newState) => {
    const tmp = parseTasks();
    tmp[taskId - 1].completed = newState;
    localStorage.setItem('tasks', JSON.stringify(tmp));
}

export default { parseTasks, addTask, changeState }