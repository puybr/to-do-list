const projectManager = (project) => {
    const container = document.querySelector('#container');
    const renderList = (items) => {
        items.forEach((i) => {
            const todo = `
                <div><h4>${project}</h4></div>
                `;
        container.insertAdjacentHTML('afterbegin', todo);
        })
    };

    return { renderList }

};

export default projectManager