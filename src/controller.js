import todoManager from './to-dos';
import { format } from 'date-fns';

const todoList = todoManager(); //init the todolist module

const controller = () => {
    const projectButton = document.querySelector('#addproject');
    const projectInput = document.querySelector('#project');
    const container = document.querySelector('#container');;

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
            description: "for the financial team",
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
                            <td><input type="text" id="title" name="title" placeholder="title"></td>
                            <td><input type="date" id="date" name="date"></td>
                            <td><select id="priority" name="priority">
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                            </select></td>
                            <td><button class="addtodo">+</button></td>
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



    const checkTodo = () => {
        document.querySelectorAll('#delete-checkbox').forEach((del) => {
            del.addEventListener('click', (e) => {
                if (del.checked) { 
                    deleteTodo(del.parentNode.parentNode.childNodes[3].textContent);
                    
                }});
            });
            const trashButton = document.querySelectorAll("#delete-me");
        trashButton.forEach((button) => {
            button.addEventListener('click', (e) => {
                e.preventDefault(); // prevent page reloading
                const currentProjectName = e.currentTarget.parentNode.childNodes[1].innerText
                const myIndex = myProjects.map((el) => el.name).indexOf(currentProjectName)
                myProjects.splice(myIndex, 1)
                renderProjects(currentProjectName)
                selectProject();
                
            })
        })

        
    };

    const deleteTodo = (todoName) => {
        const proj = document.querySelector("#selected").textContent;
        myProjects.forEach((project, projectIndex) => {
            if (project.name === proj) {
                myProjects[projectIndex].todos.forEach((todo, todoIndex) => {
                    if (todo.title === todoName) {
                        myProjects[projectIndex].todos.splice(todoIndex, 1);//at position index, remove 1 item
                        renderProjects(myProjects[projectIndex].name);
                        changeProjectColor(myProjects[projectIndex].name);
                        selectProject();
                        editTodoList();
                        checkTodo();

        

                    };
                });
            };
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
        
            } else project.id = 'unselected';
        });
        
    };




    const addTodo = () => {
        document.querySelectorAll('.addtodo').forEach((button) => {
            button.addEventListener('click', (e) => {
                e.preventDefault(); // prevent page reloading
                document.querySelectorAll('#title').forEach((titleInput) => {
                    if (titleInput.value) {
                        myProjects.forEach((p, index) => {
                            const dateInput = document.querySelector('#date')
                            const priorityInput = document.querySelector('#priority')
                            if (p.name === (document.querySelector("#selected").textContent)) {
                                    const todoTemplate = {
                                        title: titleInput.value,
                                        description: '', 
                                        date: dateInput.value,
                                        priority: priorityInput.value
                                    };
                                    const newTodo = Object.create(todoTemplate);
                                    myProjects[index].todos.push(newTodo);                                
                                    renderProjects(document.querySelector("#selected").textContent);
                                    changeProjectColor(document.querySelector("#selected").textContent);
                                    selectProject();
                                    editTodoList();
                                    checkTodo();
                                    deleteTodo();
                                    };  // end of if statement                          
                                });
                            };
                        });
                    });
                });
            };




    const editTodoList = () => {
        const editButtons = document.querySelectorAll('.edit')
                    editButtons.forEach((button) => {
                        button.addEventListener('click', (e) => {
                        e.preventDefault(); // prevent page reloading 
                        updateTodoList();      
                        const todoTitle = e.currentTarget.parentNode.childNodes[3].textContent
                        const todoDate = e.currentTarget.parentNode.childNodes[7].textContent
                        const todoDescription = e.currentTarget.parentNode.childNodes[9].textContent
                        e.currentTarget.parentNode.innerHTML = `
                                                            <tr>
                                                            <form id="editTodoForm">
                                                            <td><textarea id="updatedtodoTitle">${todoTitle}</textarea></td>
                                                            <td><select id="updatedPriority" name="updatedPriority" id="updatedPriority">
                                                                <option value="Low">Low</option>
                                                                <option value="Medium">Medium</option>
                                                                <option value="High">High</option>
                                                            </select></td>
                                                            <td><input type="date" id="updatedDate" value=${todoDate}></td>
                                                            <td><textarea id="updatedDescription">${todoDescription}</textarea></td>
                                                            <td class="savetodos"><i class="fas fa-save" id="icon"></i></td>
                                                            </form>
                                                            </tr>
                                                            `;

                
                    
                        });
                        
                        
                    });
                           

    };
    const updateTodoList = () => {
        const todoicons = document.querySelectorAll(".savetodos");
        todoicons.forEach((icon) => {
            icon.addEventListener('click', (e) => {
                const currentTodo = e.currentTarget.parentNode.childNodes[3].textContent
                const currentProject = document.querySelector("#selected").textContent
                const updatedtodoTitle = document.getElementById("updatedtodoTitle")
                const updatedPriority = document.getElementById("updatedPriority")
                const updatedDate = document.getElementById("updatedDate")
                const updatedDescription = document.getElementById("updatedDescription")
                myProjects.forEach((p, pindex) => {
                    if (p.name == currentProject) {
                        myProjects[pindex].todos.forEach((todo, tindex) =>{
                            if (todo.title == currentTodo) {
                                myProjects[pindex].todos.splice(tindex, 1);//at position index, remove 1 item
                                const todoTemplate = {
                                    title: updatedtodoTitle.value,
                                    description: updatedDescription.value, 
                                    date: updatedDate.value,
                                    priority: updatedPriority.value
                                };
                                const newTodo = Object.create(todoTemplate);
                                myProjects[pindex].todos.push(newTodo);                                 
                                renderProjects(document.querySelector("#selected").textContent)
                                selectProject()
                                addTodo();
                                editTodoList();
                                addProject();
                                checkTodo();
                                editTodoList();
                                

                            }
                        })


                    }
                })

                

            });
        });
        
    
    };  


    const deleteProject = () => {
        const trashButton = document.querySelectorAll("#delete-me");
        trashButton.forEach((button) => {
            button.addEventListener('click', (e) => {
                e.preventDefault(); // prevent page reloading
                const currentProjectName = e.currentTarget.parentNode.childNodes[1].innerText
                const myIndex = myProjects.map((el) => el.name).indexOf(currentProjectName)
                myProjects.splice(myIndex, 1)
                renderProjects(currentProjectName)
                selectProject();
                
            })
        })

    };

  


    return { addProject, renderProjects, selectProject, addTodo, editTodoList, updateTodoList, deleteProject }
};

export default controller