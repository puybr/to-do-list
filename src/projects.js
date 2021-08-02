const projectManager = (project) => {
    const container = document.querySelector('#container');
    const renderList = (items) => {
        items.forEach((i) => {
            const todo = `
                <div>
                    <tr>
                    <td><input type="radio" id="delete" name="delete"></td>
                    <td>${project}</td>
                    </tr>
                </div>
                `;
        container.insertAdjacentHTML('afterbegin', todo);
        })
    };

    return { renderList }

};

export default projectManager