import taskManager from './to-dos';

const controller = () => {
    const titleField = document.querySelector('#title');
    const descriptionField = document.querySelector('#description');
    const dateField = document.querySelector('#date');
    const priorityField = document.querySelector('#priority');
    const taskButton = document.querySelector('#submit');
    const projectButton = document.querySelector('#addproject');
    const projectInput = document.querySelector('#project');

    let myProjects = [{
        name: "default project",
        todos: [{
            title: "code",
            description: "try creating a web interface and a dynamic todo list", 
            date: "Monday",
            priority: "High"
        },
        {
            title: "cook dinner",
            description: "A warming vegan supper with porcini mushrooms, leeks, carrots, and butternut squash.", 
            date: "Wednesday",
            priority: "Medium"
        }
    ]},
    {
        name: "work project",
        todos: [{
            title: "create a powerpoint presentation",
            description: "for the finacial team",
            date: "Tuesday",
            priority: "Low"
        },
        {
            title: "admin tasks",
            description: "office cleanup", 
            date: "Friday",
            priority: "Low"
        }
    ]
    }
    ]; // end of dummy tasks


    const renderProjects = () => {
        const container = document.querySelector('#projectnav');
        container.innerHTML = '';
        // console.log(myProjects[1].todos[0].title);
        myProjects.forEach((project) => {
            const proj = `
            <div class="projectlist">
            ${project.name}
            </div><i class="fa fa-trash" aria-hidden="true" id="icon"></i>
            `;
        container.insertAdjacentHTML('afterbegin', proj);

        });


    };
    renderProjects();

    const addProject = () => {
        projectButton.addEventListener('click', (e) => {
            e.preventDefault(); // prevent page reloading
            const projectTemplate = {
                name: project.value,
                todos: [] 
            };
            const newProject = Object.create(projectTemplate);
            myProjects.push(newProject);
            console.log('Proto: '+ Object.getPrototypeOf(newProject));
            projectInput.value = '';
            renderProjects();
            selectProject();
            
        });
    }

    const selectProject = () => {
        const list = document.querySelectorAll('.projectlist');
        list.forEach((project) => {
            project.addEventListener('click', (e) => {
                //this is what happens when you select a project :)
                console.log('add todo...')
                const p = `
                <h3>${e.target.innerText}'s todos</h3>
                `
                document.getElementById("taskform").style.display = "block";
                document.getElementById("project-todos").innerHTML = p;
                getProjectIndex(e.target.innerText);
            })
             
        })
    }
    selectProject();

    const getProjectIndex = (projectName) => {
          myProjects.forEach((project, index) => {
            if (project.name === projectName) {
                renderTodoList(index);
            }
        });

    };

    const renderTodoList = (index) => {
        const subTasks = document.querySelector('#subtasks');
        subTasks.innerHTML = '';
        myProjects[index].todos.forEach((todo) => {
            const t = `
                    <table>
                    <tr>
                    <td><input type="radio" id="delete" name="delete"></td>
                    <td>${todo.title}</td>
                    <td>${todo.description}</td>
                    <td>${todo.date}</td>
                    <td>${todo.priority}</td>
                    </tr>
                    </table>
                `;
            subTasks.insertAdjacentHTML('afterbegin', t);
        })
    };


    const addTask = () => {
        taskButton.addEventListener('click', (e) => {
            e.preventDefault(); // prevent page reload
            let items = [];
            const newItem = taskManager(titleField.value, descriptionField.value, dateField.value, priorityField.value);
            items.push(newItem);
            newItem.renderList(items);
            getItem(items);
        });

    };

    const getItem = (items) => {
        items.forEach((i) => {
            console.log(`${title.value}`);
        })
        const deleteButton = document.querySelectorAll('#delete');
        deleteButton.forEach((button) => {
            button.addEventListener('click', (e) => {
                const currentTarget = e.target.parentNode.innerText;
            });
        });
    };


    return { addTask, addProject }
};

export default controller