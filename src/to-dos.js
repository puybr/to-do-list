const taskManager = (title, description, dueDate, priority) => {
    const listTask = () => {
        const container = document.querySelector('#container');
        const item = `
            <tr>
            <input type="radio" id="delete" name="delete">
            <td>${title}</td>
            <td>${description}</td>
            <td>${dueDate}</td>
            <td>${priority}</td>
            </tr>
            `;
        container.insertAdjacentHTML('afterbegin', item); 


    };
    return { listTask }
};

export default taskManager