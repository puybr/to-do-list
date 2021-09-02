import taskManager from './to-dos';
import { format } from 'date-fns';

const todoList = taskManager();
todoList.renderList();
const controller = () => {
    const titleField = document.querySelector('#title');
    const dateField = document.querySelector('#date');
    const taskButton = document.querySelector('#submit');
    const projectButton = document.querySelector('#addproject');
    const projectInput = document.querySelector('#project');
    const subTasks = document.querySelector('#subtasks');

    let myProjects = [{
        name: "default project",
        todos: [{
            title: "code",
            description: "try creating a web interface and a dynamic todo list", 
            date: format(new Date(), "yyyy'-'MM'-'dd"),
            priority: "High"
        },
        {
            title: "cook dinner",
            description: "A warming vegan supper with porcini mushrooms, leeks, carrots, and butternut squash.", 
            date: format(new Date(), "yyyy'-'MM'-'dd"),
            priority: "Medium"
        }
    ]},
    {
        name: "work project",
        todos: [{
            title: "create a powerpoint presentation",
            description: "for the finacial team",
            date: format(new Date(), "yyyy'-'MM'-'dd"),
            priority: "Low"
        },
        {
            title: "admin tasks",
            description: "office cleanup", 
            date: format(new Date(), "yyyy'-'MM'-'dd"),
            priority: "Low"
        }
    ]
    }
    ]; // end of dummy tasks


    const renderProjects = () => {
        const container = document.querySelector('#projectnav');
        container.innerHTML = '';
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
            // console.log('Proto: '+ Object.getPrototypeOf(newProject));
            projectInput.value = '';
            renderProjects();
            selectProject();
            getProjectIndex(document.getElementById("project-todos").innerText);           
        });
    };

    const changeProjectColor = () => { // change the colour of the project when selected
        const list = document.querySelectorAll('.projectlist');
        const title = document.querySelector("#project-title").textContent;
        list.forEach((project) => {
            if (title === project.innerText) {
                project.id = 'selected';
            } else project.id = 'unselected';
        });
    };


    const selectProject = () => {
        const list = document.querySelectorAll('.projectlist');
        subTasks.innerHTML = '';
        list.forEach((project) => {
            project.addEventListener('click', (e) => {
                //this is what happens when you select a project :)
                e.preventDefault(); // prevent page reloading
                document.getElementById("project-todos").innerHTML = '';
                const p = `<h4 id="project-title">${e.target.innerText}</h4>`;
                document.getElementById("taskform").style.display = "block";
                document.getElementById("project-todos").innerHTML = p;
                project.id = '';
                getProjectIndex(e.target.innerText);
                changeProjectColor();
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
        dateField.value = '';
    });

    const renderTodoList = (index) => {
        subTasks.innerHTML = '';
        myProjects[index].todos.forEach((todo) => {
            const t = `
                    <tr class="to-do-row">
                    <td id="delete-me"><input type="radio" id="delete" name="delete"></td>
                    <td>${todo.title}</td>
                    <td>${todo.date}</td>
                    <td class="edit"><i class="fas fa-edit"></i></td>
                    </tr>
                `;
            subTasks.insertAdjacentHTML('afterbegin', t);
        });
        deleteTodo();
        editTodoList();
    };

    const deleteTodo = () => {
        const todos = document.querySelectorAll('.to-do-row');
        todos.forEach((todo) => {
            todo.addEventListener('click', (e) => {
                if (todo.childNodes[1].childNodes[0].checked) {
                    getTodoIndex(todo.children[1].innerText);
                }
            });

        });
        
    };

    const editTodoList = () => {
        const editButton = document.querySelectorAll('.edit');
        const list = document.querySelectorAll('.projectlist');
        editButton.forEach((button) => {
            button.addEventListener('click', (e) => {
                list.forEach((item, itemindex) => {
                    if (item.id === 'selected') { return itemindex };
                    //the array to get the item in the main array                
                    myProjects[itemindex].todos.forEach((todo, tindex) => {
                        if (e.currentTarget.parentNode.childNodes[3].textContent === todo.title) {
                            //the array to get all the html elements on the page
                            Array.from(document.querySelectorAll('.to-do-row')).forEach((task) => {
                                if (task.childNodes[3].innerText === myProjects[itemindex].todos[tindex].title) {
                                    const editTask = `<tr class="to-do-row">
                                                <td id="delete-me"><input type="radio" id="delete" name="delete"></td>
                                                <td><input placeholder=${myProjects[itemindex].todos[tindex].title}></input></td>
                                                <td><input placeholder=${myProjects[itemindex].todos[tindex].description}></input></td>
                                                <td><input placeholder=${myProjects[itemindex].todos[tindex].date}></input></td>
                                                <td>
                                                <select>
                                                <option value="Low">Low</option>
                                                <option value="Medium">Medium</option>
                                                <option value="High">High</option>
                                                </select>
                                                </td>
                                                <td><i class="fas fa-save"></i></td>
                                                </tr>`;
                                    task.innerHTML = '';
                                    task.innerHTML = editTask;
                                    console.log(myProjects[itemindex].todos[tindex].description);
    
                                };
                            });
                        };
                        
                    });
                });
            });

        });

    };

    const getTodoIndex = (todoName) => {
        const proj = document.querySelector("#project-title").textContent;
        myProjects.forEach((project, projectIndex) => {
            if (project.name === proj) {
                myProjects[projectIndex].todos.forEach((todo, todoIndex) => {
                    if (todo.title === todoName) {
                        myProjects[projectIndex].todos.splice(todoIndex, 1); //at position index, remove 1 item
                        renderTodoList(projectIndex);
                    };
                });
            };
        });
       };

    const addTodo = () => {
        myProjects.forEach((p, index) => {
            if (p.name === (document.getElementById("project-todos").innerText)) {
                    const todoTemplate = {
                        title: title.value,
                        description: '', 
                        date: date.value,
                        priority: ''
                    };
                    const newTodo = Object.create(todoTemplate);
                    myProjects[index].todos.push(newTodo);
                    renderTodoList(index);
                    }  // end of if statement                          
                });
            };



    return { addProject }
};

export default controller