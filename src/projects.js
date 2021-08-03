const projectManager = (project) => {
    const container = document.querySelector('#projectnav');
    const renderList = (items) => {
        items.forEach((i) => {
            const todo = `
                <div class="projectlist">
                <i class="fa fa-trash" aria-hidden="true" id="icon"></i>
                ${project}
                </div>
                `;
        container.insertAdjacentHTML('afterbegin', todo);
        })
    };

    return { renderList }

};

export default projectManager