"use strict";

const todoManager = () => {
    class Todo {
        constructor(project, title, description, date, priority) {
            this.project = project;
            this.title = title;
            this.description = description;
            this.date = date
            this.priority = priority
        };
    };
    const renderTodo = (project) => {
        if (project.select == true) {
            project.todos.forEach((todo) => {
                console.log(todo);
                let todolist = document.getElementById(`todolist-${todo.project}`);
                const t = `
                    <div class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                    <i class="fas fa-edit"></i>
                    <div class="px-6 py-4">
                        <div class="font-bold text-xl mb-2">${todo.title}</div>
                        <p class="text-gray-700 text-base">
                        ${todo.description}
                        </p>
                    </div>
                    <div class="px-6 pt-4 pb-2">
                        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">${todo.priority}</span>
                        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">${todo.date}</span>
                    </div>
                    </div>
                    `;
                todolist.insertAdjacentHTML('afterbegin', t);
                }); 
        };
    };

    return { renderTodo }
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

export default todoManager