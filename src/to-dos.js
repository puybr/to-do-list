const taskManager = (title, description, date, priority) => {
    const container = document.querySelector('#container');

    const renderList = (items) => {
        items.forEach((i) => {
            const todo = `
                <tr>
                <input type="radio" id="delete" name="delete">
                <td>${title}</td>
                <td>${description}</td>
                <td>${date}</td>
                <td>${priority}</td>
                </tr>
                `;
        container.insertAdjacentHTML('afterbegin', todo);
        })
    };

    return { renderList }
};

export default taskManager