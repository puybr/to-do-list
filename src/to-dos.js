const taskManager = (title, description, dueDate, priority) => {
    const listTask = () => {
        const container = document.querySelector('#container');
        const item = `
            <ul>
            <li>${title}</li>
            <li>${description}</li>
            <li>${dueDate}</li>
            <li>${priority}</li>
            </ul>
            `;
        container.insertAdjacentHTML('afterbegin', item); 


    };
    return { listTask }
};

export default taskManager