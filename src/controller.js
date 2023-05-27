import todoManager from './to-dos';
import { format } from 'date-fns';

const todoList = todoManager(); //init the todolist module

const controller = () => {
    const projectButton = document.querySelector('#addproject');
    const projectInput = document.querySelector('#project');
    const container = document.querySelector('#container');

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
    ]}];//end of dummy tasks


    const renderProjects = (selectedProject) => {
        container.innerHTML = `<table id="container"></table>`;//refresh
        if (selectedProject === undefined) {
            myProjects.forEach((project) => {
                const proj = `
                            <tr>
                            <td class="projectlist">${project.name}</td>
                            <td>
                            <form id="addTodoForm" style="display: none;">
                            <input type="text" id="title" name="title" placeholder="title">
                            <input type="date" id="date" name="date">
                            <select name="priority" id="priority">
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                            </select>
                            <button class="addtodo">+</button>
                            </form>
                            </td>
                            <td id="delete-me"><i class="fa fa-trash" aria-hidden="true" id="icon"></i></td>
                            </tr>
                            `;
                project.todos.forEach((todo) => {
                    const t = `
                        <tr class="to-do-row" id="${project.name}" style="display: none;">
                        <td id="delete-me"><input type="checkbox" id="delete-checkbox" name="delete-checkbox"></td>
                        <td>${todo.title}</td>
                        <td>${todo.priority}</td>
                        <td>${todo.date}</td>
                        <td>${todo.description}</td>
                        <td class="edit"><i class="fas fa-edit"></i></td>
                        </tr>
                        `;
                    container.insertAdjacentHTML('afterbegin', t);
                });
            container.insertAdjacentHTML('afterbegin', proj);  
            });
        } else {
            myProjects.forEach((project) => {
                project.todos.forEach((todo) => {
                    if (project.name === selectedProject) {
                        const t = `
                                <tr class="to-do-row" id="${project.name}" style="display: block;">
                                <td id="delete-me"><input type="checkbox" id="delete-checkbox" name="delete-checkbox"></td>
                                <td>${todo.title}</td>
                                <td>${todo.priority}</td>
                                <td>${todo.date}</td>
                                <td>${todo.description}</td>
                                <td class="edit"><i class="fas fa-edit"></i></td>
                                </tr>
                                `;
                    container.insertAdjacentHTML('afterbegin', t);
                    } else {
                        const t = `
                                <tr class="to-do-row" id="${project.name}" style="display: none;">
                                <td id="delete-me"><input type="checkbox" id="delete-checkbox" name="delete-checkbox"></td>
                                <td>${todo.title}</td>        
                                <td>${todo.priority}</td>
                                <td>${todo.date}</td>
                                <td>${todo.description}</td>
                                <td class="edit"><i class="fas fa-edit"></i></td>
                                </tr>
                                `;
                    container.insertAdjacentHTML('afterbegin', t);

                    };
                });

            if (project.name === selectedProject) {
                const proj = `
                            <tr>
                            <td class="projectlist" id="selected">${project.name}</td>
                            <td>
                            <form id="addTodoForm" style="display: block;">
                            <input type="text" id="title" name="title" placeholder="title">
                            <input type="date" id="date" name="date">
                            <select id="priority" name="priority">
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                            </select>
                            <button class="addtodo">+</button>
                            </form>
                            </td>
                            <td id="delete-me"><i class="fa fa-trash" aria-hidden="true" id="icon"></i></td>
                            </tr>
                            `;
                container.insertAdjacentHTML('afterbegin', proj);
            } else {
                const proj = `
                            <tr>
                            <td class="projectlist">${project.name}</td>
                            <td>
                            <form id="addTodoForm" style="display: none;">
                            <input type="text" id="title" name="title" placeholder="title">
                            <input type="date" id="date" name="date">
                            <select id="priority" name="priority">
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                            </select>
                            <button class="addtodo">+</button>
                            </form>
                            </td>
                            <td id="delete-me"><i class="fa fa-trash" aria-hidden="true" id="icon"></i></td>
                            </tr>
                            `;
                container.insertAdjacentHTML('afterbegin', proj);  
            }
            });
        };
    };


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
            renderProjects(project.value);
            projectInput.value = '';
            selectProject();
            addTodo();  
        });
    };

    const selectProject = () => {
        checkTodo();
        addTodo();
        document.querySelectorAll('.projectlist').forEach((project) => {
            project.addEventListener('click', (e) => {
                //this is what happens when you select a project :)
                e.preventDefault(); // prevent page reloading
                e.currentTarget.id = 'selected';
                changeProjectColor(e.target.textContent);
                document.querySelectorAll('#addTodoForm').forEach((form) => {
                    form.style.display = 'none';
                });
                if (project.id === 'selected') {
                    project.parentNode.childNodes[3].childNodes[1].style.display = 'block';
                
                } else return;
                const projectName = document.querySelector('#selected').textContent;
                editTodoList();

                document.querySelectorAll('.to-do-row').forEach((row) => {
                    if (row.id === projectName) {
                        row.style.display = 'block';
                    } else row.style.display = 'none';    

                });
            });
             
        });
        
    };


    const checkTodo = () => {
        document.querySelectorAll('#delete-checkbox').forEach((del) => {
            del.addEventListener('click', (e) => {
                if (del.checked) { deleteTodo(del.parentNode.parentNode.childNodes[3].textContent); }});
            });
        
    };

    const deleteTodo = (todoName) => {
        const proj = document.querySelector("#selected").textContent;
        editTodoList();
        myProjects.forEach((project, projectIndex) => {
            if (project.name === proj) {
                myProjects[projectIndex].todos.forEach((todo, todoIndex) => {
                    if (todo.title === todoName) {
                        myProjects[projectIndex].todos.splice(todoIndex, 1);//at position index, remove 1 item
                        renderProjects(myProjects[projectIndex].name);
                        changeProjectColor(myProjects[projectIndex].name);
                        selectProject();
        

                    };
                });
            };
        });
       };
    


    const changeProjectColor = (projectName) => { // change the colour of the project when selected
        document.querySelectorAll('.projectlist').forEach((project) => {
            if (projectName === project.innerText) {
                project.id = 'selected';
                editTodoList();
            } else project.id = 'unselected';
        });
    };


    const addTodo = () => {
        document.querySelectorAll('.addtodo').forEach((button) => {
            button.addEventListener('click', (e) => {
                editTodoList();
                e.preventDefault(); // prevent page reloading
                document.querySelectorAll('#title').forEach((titleInput) => {
                    if (titleInput.value) {
                        myProjects.forEach((p, index) => {
                            const dateInput = document.querySelector('#date')
                            const priorityInput = document.querySelector('#priority')
                            if (p.name === (document.querySelector("#selected").textContent)) {
                                    const todoTemplate = {
                                        title: titleInput.value,
                                        description: 'Edit your description here ...', 
                                        date: dateInput.value,
                                        priority: priorityInput.value
                                    };
                                    const newTodo = Object.create(todoTemplate);
                                    myProjects[index].todos.push(newTodo);
                                    renderProjects(document.querySelector("#selected").textContent);
                                    changeProjectColor(document.querySelector("#selected").textContent);
                                    selectProject();
                                    };  // end of if statement                          
                                });
                            };
                        });
                    });
                });
            };

    const editTodoList = (selectedProject) => {
        const editButtons = document.querySelectorAll('.edit')
                    editButtons.forEach((button) => {
                        button.addEventListener('click', (e) => {
                        e.preventDefault(); // prevent page reloading
                        // const todoTitle = e.target.parentNode.parentNode.childNodes[3].textContent
                        const todoTitle = e.currentTarget.parentNode.childNodes[3].textContent
                        const todoDate = e.currentTarget.parentNode.childNodes[7].textContent
                        const todoDescription = e.currentTarget.parentNode.childNodes[9].textContent
                        console.log(todoDate)
                        e.currentTarget.parentNode.innerHTML = `
                        <form id="editTodoForm">
                        <input type="text" id="title" name="title" placeholder=${todoTitle}>
                        <input type="date" id="date" name="date"  value=${todoDate}>
                        <select id="priority" name="priority">
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                        <i class="fas fa-save" aria-hidden="true" id="icon"></i>
                        <i class="fa fa-trash" aria-hidden="true" id="icon"></i>

                        <textarea>${todoDescription}</textarea>
                        </form>
                        `;
            
                    
                        
                    
                        });
                    });
        // const projselect = document.querySelector("#selected").textContent;
        // myProjects.forEach((project, projectIndex) => {
        //     if (project.name === projselect) {
        //         myProjects[projectIndex].todos.forEach((todo, todoIndex) => {
                    

        //             });
        //         });
        //     };
        // });
       
        

    };



  


    return { addProject, renderProjects, selectProject, addTodo, editTodoList}
};

export default controller