import todoManager from './to-dos';
import { format } from 'date-fns';

const todoList = todoManager(); //init the todolist module

const controller = () => {
    const titleFields = document.querySelector('#title');
    const dateFields = document.querySelector('#date');
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
                        <td>${todo.date}</td>
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
                                <td>${todo.date}</td>
                                <td class="edit"><i class="fas fa-edit"></i></td>
                                </tr>
                                `;
                    container.insertAdjacentHTML('afterbegin', t);
                    } else {
                        const t = `
                                <tr class="to-do-row" id="${project.name}" style="display: none;">
                                <td id="delete-me"><input type="checkbox" id="delete-checkbox" name="delete-checkbox"></td>
                                <td>${todo.title}</td>
                                <td>${todo.date}</td>
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
                    addTodo();
                } else return;
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
                if (del.checked) { deleteTodo(del.parentNode.parentNode.childNodes[3].textContent); }});
            });
        
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
                    };
                });
            };
        });
       };
    


    const changeProjectColor = (projectName) => { // change the colour of the project when selected
        document.querySelectorAll('.projectlist').forEach((project) => {
            if (projectName === project.innerText) {
                project.id = 'selected';
            } else project.id = 'unselected';
        });
    };


    const addTodo = () => {
        // myProjects.forEach((p, index) => {
        //     if (p.name === (document.getElementById("project-todos").innerText)) {
        //             const todoTemplate = {
        //                 title: title.value,
        //                 description: 'Enter your description here ...', 
        //                 date: date.value,
        //                 priority: 'Low'
        //             };
        //             const newTodo = Object.create(todoTemplate);
        //             myProjects[index].todos.push(newTodo);
        //             renderTodoList(index);
        //             }  // end of if statement                          
        //         });

        document.querySelectorAll('.addtodo').forEach((button) => {
            button.addEventListener('click', (e) => {
                e.preventDefault(); // prevent page reloading
                // reset default values
                // titleField.value = '';
                // dateField.value = '';
                console.log(e);
            });
        });
    };

    addTodo();




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
                            renderTodoList(itemindex);
                            //the array to get all the html elements on the page
                            Array.from(document.querySelectorAll('.to-do-row')).forEach((task) => {
                                if (task.childNodes[3].innerText === myProjects[itemindex].todos[tindex].title) {
                                    const editTask = `<tr class="edited-to-do">
                                                <td id="delete-me"><input type="radio" id="delete" name="delete"></td>
                                                <td class="edit-prop" id="title">${myProjects[itemindex].todos[tindex].title}</td>
                                                <td class="edit-prop" id="description">${myProjects[itemindex].todos[tindex].description}</td>
                                                <td class="edit-prop" id="date">${myProjects[itemindex].todos[tindex].date}</td>
                                                <td>
                                                <select>
                                                <option value="Low">Low</option>
                                                <option value="Medium">Medium</option>
                                                <option value="High">High</option>
                                                </select>
                                                </td>
                                                <td id="save-me"><i class="fas fa-save"></i></td>
                                                </tr>`;
                                    task.innerHTML = '';
                                    task.innerHTML = editTask;
                                    editProp(myProjects[itemindex].todos[tindex].title, myProjects[itemindex].todos[tindex].description, myProjects[itemindex].todos[tindex].date);
    
                                };
                            });
                        };
                        
                    });
                });
            });

        });

    };

    const editProp = (title, description, date) => {
        const prop = document.querySelectorAll('.edit-prop');
        prop.forEach((p) => {
            p.addEventListener('click', (e) => {
                e.preventDefault(); // prevent page reloading
                //refresher function
                e.target.parentNode.childNodes.forEach((node) => {
                    switch (node.id) {
                        case 'title':
                            node.innerHTML = `<td class="edit-prop">${title}</td>`;
                            return title;
                        case 'description':
                            node.innerHTML = `<td class="edit-prop">${description}</td>`;
                            return description;
                        case 'date':
                            node.innerHTML = `<td class="edit-prop">${date}</td>`;
                            return date;
                    };

                });
                if (e.target.id === 'title') {
                    e.target.innerHTML = `<input type="text" name="title" value="${title}">`;               
                };
                if (e.target.id === 'description') {
                    e.target.innerHTML = `<textarea>${description}</textarea>`;            
                };
                if (e.target.id === 'date') {
                    e.target.innerHTML = `<input type="date" name="date" value="${date}">`;            
                };
                
            });
        });

    };


    return { addProject, renderProjects, selectProject }
};

export default controller