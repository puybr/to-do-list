"use strict";

const projectButton = document.querySelector('#addproject');
const projectInput = document.querySelector('#project');
const container = document.querySelector('#container');

const projectManager = () => {
    const renderProject = (project) => {
        const proj = `
            <section>
            <tr>
            <td class="projectlist">${project.name}</td>
            <td id="delete-project"><i class="fa fa-trash" aria-hidden="true" id="icon"></i></td>
            </tr>
            <tr>
                <form id="addTodoForm">
                <td><input type="text" id="title" name="title" placeholder="title"></td>
                <td><input type="date" id="date" name="date"></td>
                <td><select name="priority" id="priority">
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select></td>
                <td><button class="addtodo">+</button></td>
                </form>
            </tr>
            </section>
            <div id="todolist-${project.name}"></div>
            `;
        container.insertAdjacentHTML('afterbegin', proj);
    };
return { renderProject }
};

const addProject = () => {
    projectButton.addEventListener('click', (e) => {
        e.preventDefault(); // prevent page reloading
        const projectTemplate = {
            name: project.value,
            todos: [],
            select: true
        };
        if (project.value) {
            const newProject = Object.create(projectTemplate);
            myProjects.push(newProject);
            // console.log('Proto: '+ Object.getPrototypeOf(newProject));
             renderProjects(project.value);
             projectInput.value = '';
             selectProject();
             addTodo(); } else return;
    });
};

const selectProject = () => {
    document.querySelectorAll('.projectlist').forEach((project) => {
        project.addEventListener('click', (e) => {
            //this is what happens when you select a project :)
            e.preventDefault(); // prevent page reloading
            e.currentTarget.id = 'selected';
            renderProjects(e.target.textContent);
            changeProjectColor(e.target.textContent);
            addProject();
            checkTodo();
            editTodoList();
            updateTodoList();
            const projectName = document.querySelector('#selected').textContent;
            document.querySelectorAll('.to-do-row').forEach((row) => {
                if (row.id === projectName) {
                    row.style.display = 'block';
                } else row.style.display = 'none';    
            });
        });
         
    });       
};

const changeProjectColor = (projectName) => { // change the colour of the project when selected
    document.querySelectorAll('.projectlist').forEach((project) => {
        if (projectName === project.innerText) {
            project.id = 'selected';
            renderProjects(projectName);
            selectProject();
            addTodo();
            addProject();
            editTodoList();
            checkTodo();
            deleteTodo();
            updateTodoList();
            deleteProject();
    
        } else project.id = 'unselected';
    });    
};

const deleteProject = () => {
    const trashButton = document.querySelectorAll("#delete-project");
    trashButton.forEach((button) => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); // prevent page reloading
            const currentProjectName = e.currentTarget.parentNode.childNodes[1].innerText
            const myIndex = myProjects.map((el) => el.name).indexOf(currentProjectName)
            myProjects.splice(myIndex, 1)
            renderProjects(currentProjectName)
            selectProject();    
        });
    });
};

export default projectManager