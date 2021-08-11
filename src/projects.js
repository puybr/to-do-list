const projectManager = (name) => {
    console.log(name);
    name.name = name;
    // let keys = Object.keys(project);
    // console.log(keys);
    const container = document.querySelector('#projectnav');
    const renderList = (items) => {
        items.forEach((i) => {
            const proj = `
                <div class="projectlist">
                <i class="fa fa-trash" aria-hidden="true" id="icon"></i>
                ${project}
                </div>
                `;
        container.insertAdjacentHTML('afterbegin', proj);
        })
    };

    return { renderList }

};

export default projectManager