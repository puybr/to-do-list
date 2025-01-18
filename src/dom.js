"use strict";

// import { tr } from "date-fns/locale";
import projectManager from './projects';
import todoManager from './todos';

const domManager = () => {
    const projects = projectManager();
    const todos = todoManager();
    const selectProject = (myProjects) => {
        console.log(myProjects);
        document.querySelector('.projects').addEventListener('change', (e) => {
            console.log(e.target.value);
        });
    };

    return { selectProject }
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

const checkTodo = () => {
    document.querySelectorAll('#delete-checkbox').forEach((del) => {
        del.addEventListener('click', (e) => {
            if (del.checked) { 
                deleteTodo(del.parentNode.parentNode.childNodes[3].textContent);
                
            }});
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
                    editTodoList();
                    checkTodo();
                };
            });
        };
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
                        };
                    });
                };
            });                
        });
    }); 
};

export default domManager