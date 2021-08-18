import taskManager from './to-dos';

const todoList = taskManager();
todoList.renderList();
const controller = () => {
    const titleField = document.querySelector('#title');
    const descriptionField = document.querySelector('#description');
    const dateField = document.querySelector('#date');
    const priorityField = document.querySelector('#priority');
    const taskButton = document.querySelector('#submit');
    const projectButton = document.querySelector('#addproject');
    const projectInput = document.querySelector('#project');
    const subTasks = document.querySelector('#subtasks');
    const projectList = document.querySelectorAll(".projectlist")

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
            <tr>
            <td id="delete-me"><i class="fa fa-trash" aria-hidden="true" id="icon"></i></td>
            <td class="projectlist" >${project.name}</td>
            </tr>
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
            getProjectIndex(document.getElementById("project-todos").innerText);           
        });
    }

    const selectProject = () => {
        const list = document.querySelectorAll('.projectlist');
        subTasks.innerHTML = '';
        list.forEach((project) => {
            project.addEventListener('click', (e) => {
                //this is what happens when you select a project :)
                e.preventDefault(); // prevent page reloading
                document.getElementById("project-todos").innerHTML = '';
                const p = `
                <h3 id="project-title">${e.target.innerText}</h3>
                `
                document.getElementById("taskform").style.display = "block";
                document.getElementById("project-todos").innerHTML = p;
                getProjectIndex(e.target.innerText);
                console.log(project);
                // change the colour of the project when selected
                if (e.target.innerText === project.innerText) {
                    project.style.color = 'orangered';
                    console.log(project.innerText);
                }
            });
             
        });
    };
    selectProject();

    const getProjectIndex = (projectName) => {
          myProjects.forEach((project, index) => {
            if (project.name === projectName) {
                renderTodoList(index);
            };
        });

    };

    // this is not being called by any function
    taskButton.addEventListener('click', (e) => {
        e.preventDefault(); // prevent page reloading
        addTodo();
        // reset default values
        titleField.value = '';
        descriptionField.value = '';
        dateField.value = '';
        priorityField.value = 'low';

    });

    const renderTodoList = (index) => {
        subTasks.innerHTML = '';
        myProjects[index].todos.forEach((todo) => {
            const t = `
                    <tr class="to-do-row">
                    <td id="delete-me"><input type="radio" id="delete" name="delete"></td>
                    <td>${todo.title}</td>
                    <td>${todo.description}</td>
                    <td>${todo.date}</td>
                    <td>${todo.priority}</td>
                    </tr>
                `;
            subTasks.insertAdjacentHTML('afterbegin', t);
        });
    };


    const addTodo = () => {
        myProjects.forEach((p, index) => {
            if (p.name === (document.getElementById("project-todos").innerText)) {
                    console.log(index);
                    const todoTemplate = {
                        title: title.value,
                        description: description.value, 
                        date: date.value,
                        priority: priority.value
                    };
                    const newTodo = Object.create(todoTemplate);
                    myProjects[index].todos.push(newTodo);
                    renderTodoList(index);
                    console.log(myProjects);
                    }  // end of if statement                          
                });
            };



    return { addProject }
};

export default controller