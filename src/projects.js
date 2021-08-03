const projectManager = (project) => {
    const container = document.querySelector('#projectnav');
    const renderList = (items) => {
        items.forEach((i) => {
            const todo = `
                <div>
                <tr>
                <td>
                <i class="fa fa-trash" aria-hidden="true"></i>
                <h4>${project}</h4>
                </td>
                </tr>
                </div>
                `;
        container.insertAdjacentHTML('afterbegin', todo);
        })
    };

    return { renderList }

};

export default projectManager