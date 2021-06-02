const taskManager = (title, description, dueDate, priority) => {
    const listTask = () => {
        const container = document.querySelector('#container');
        const item = document.createElement('div');
        item.innerHTML = `
            <ul>
            <li>${title}</li>
            <li>${description}</li>
            <li>${dueDate}</li>
            <li>${priority}</li>
            </ul>
            `;
        container.appendChild(item);


    };
    return { listTask }
};

export default taskManager