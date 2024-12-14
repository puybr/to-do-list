"use strict";

const projectButton = document.querySelector('#addproject');
const projectInput = document.querySelector('#project');
const container = document.querySelector('#container');

const projectManager = () => {
    const renderProject = (project) => {
        const proj = `       
            <div class="projects" class="max-w-sm w-full lg:max-w-full lg:flex">
            <div>
                <div class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
                </div>
                <div class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                    <div class="mb-8">
                    <p class="text-sm flex items-center">
                        <i class="fa fa-trash fill-current w-3 h-3 mr-2" aria-hidden="true"></i>
                        ${project.name}
                    </p>
                    </div>
                    <form class="w-full max-w-lg">
                    <div class="flex flex-wrap -mx-3 mb-2">
                        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-xs font-bold mb-2" for="grid-city">
                            Todo
                        </label>
                        <input class="appearance-none block w-full bg-gray-200 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:border-gray-500" id="grid-city" type="text" placeholder="add a todo">
                        </div>
                        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-xs font-bold mb-2" for="grid-state">
                            Priority
                        </label>
                        <div class="relative">
                            <select class="block appearance-none w-full bg-gray-200 border border-gray-200 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-gray-500" id="grid-state">
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                            </select>
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                        </div>
                        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-xs font-bold mb-2" for="grid-zip">
                            Description
                        </label>
                        <input class="appearance-none block w-full bg-gray-200 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:border-gray-500" id="grid-zip" type="text" placeholder="add a description">
                        </div>
                    </div>
                    </form>
                <section id="todolist-${project.name}"></section>
                </div>
                </div>
                </section>
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