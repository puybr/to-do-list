const taskManager = (title, description, date, priority) => {
    const container = document.querySelector('#container');

    const renderList = (items) => {
        items.forEach((i) => {
            const todo = `
                <div>
                    <tr>
                    <td><input type="radio" id="delete" name="delete"></td>
                    <td>${title}</td>
                    <td>${description}</td>
                    <td>${date}</td>
                    <td>${priority}</td>
                    </tr>
                </div>
                `;
        container.insertAdjacentHTML('afterbegin', todo);
        })
    };

    return { renderList }
};

export default taskManager