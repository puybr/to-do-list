"use strict";

import projectManager from './projects';
import todoManager from './todos';
import { format } from 'date-fns';

const controller = () => {
    let myProjects = [];
    class Project {
        constructor(name, todos, select) {
            this.name = name;
            this.todos = todos;
            this.select = select;
        };
    };
    class Todo {
        constructor(title, description, date, priority) {
            this.title = title;
            this.description = description;
            this.date = date
            this.priority = priority
        };
    };
    const projects = projectManager();
    const todos = todoManager();
    const init = () => {
        const defaultproject = new Project("default project", [
            {
                title: "code",
                description: "try creating a web interface and a dynamic todo list", 
                date: format(new Date(), "yyyy'-'MM'-'dd"),
                priority: "High"
            },
            {
                title: "cook dinner",
                description: "a warming vegan supper with porcini mushrooms, leeks, carrots, and butternut squash", 
                date: format(new Date(), "yyyy'-'MM'-'dd"),
                priority: "Medium"
            }
        ], true)
        const workproject = new Project("work project", [
            {
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
        ], false)
        myProjects.push(defaultproject);
        myProjects.push(workproject);
        document.querySelector('#projectForm').style.display = "none";
        document.querySelector('#todoForm').style.display = "none";
        projects.displayProjectForm();
        render();
    };
    const render = () => {
        let selectedProject;
        document.querySelector('#todoForm').innerHTML = ``;
        document.querySelector('#container').innerHTML = ``;
        if (myProjects.length == 0) {
            projects.renderProjects(myProjects);
        } else {
            if (myProjects.length > 1) {
                selectedProject = myProjects.filter((project) => { return project.select == true })[0];
            } else {
                selectedProject = myProjects[0];
            };
            projects.renderProjects(myProjects);
            todos.renderTodo(selectedProject);
            todos.displayTodoForm(selectedProject);
            selectProject();
            deleteProject();
            addProject();
            addTodo();
            checkTodo();
            editTodo();
            cancel();
        };
    };
    const sortProjects = (name) => {
        myProjects.forEach((project) => {
            if (project.name == name) {
                project.select = true;
            } else
            project.select = false;
        });
    };
    const selectProject = () => {
        document.querySelectorAll('.projects').forEach(element => {
            element.addEventListener('change', (e) => {
                e.preventDefault(); // prevent page reloading
                sortProjects(e.target.value);
                render();
            });
        });
    };
    const cancel = () => {
        document.querySelectorAll('.cancel').forEach(element => {
            element.addEventListener('click', () => {
                let selectedProject;
                let indexProject;
                if (myProjects.length > 1) {
                    selectedProject = myProjects.filter((project) => { return project.select == true })[0];
                    indexProject = myProjects.indexOf(selectedProject);
                    myProjects[0].select = true;
                } else {
                    selectedProject = myProjects[0];
                    indexProject = 0;
                    myProjects.select = true;
                };
                if (selectedProject) {
                    document.querySelector('#projectForm').style.display = "none";
                    document.querySelector('#todoForm').style.display = "none";
                    document.querySelector('#navbar').style.display = "block";
                    document.querySelector('#container').style.display = "block";
                } else return;
            });
        });
    };
    const addProject = () => {
        document.querySelectorAll('.addProjectButton').forEach(element => {
            document.querySelector('#addProjectButton').addEventListener('click', () => {
                document.querySelector('#projectForm').style.display = "block";
                document.querySelector('#navbar').style.display = "block";
                document.querySelector('#container').style.display = "none";
            });
        });
        document.querySelector('#submitProject').addEventListener('click', () => {
            if (!document.getElementById('newProject').value) {
                return;
            } else {
                myProjects.push(new Project(document.querySelector('#newProject').value, [], true));
                document.querySelector('#projectForm').style.display = "none";
                document.querySelector('#todoForm').style.display = "none";
                document.querySelector('#navbar').style.display = "block";
                document.querySelector('#container').style.display = "block";
                sortProjects(document.getElementById('newProject').value);
                document.getElementById('newProject').value = '';
                render();
            };
        });
    };
    const deleteProject = () => {
        document.querySelector('#deleteProjectButton').addEventListener('click', () => {
            let selectedProject;
            let indexProject;
            if (myProjects.length > 1) {
                selectedProject = myProjects.filter((project) => { return project.select == true })[0];
                indexProject = myProjects.indexOf(selectedProject);
                myProjects[0].select = true;
            } else {
                selectedProject = myProjects[0];
                indexProject = 0;
                myProjects.select = true;
            };
            myProjects.splice(indexProject, 1);
            render();
        });
    };
    const addTodo = () => {
        document.querySelector('#addTodoButton').addEventListener('click', () => {
            document.querySelector('#todoForm').style.display = "block";
            document.querySelector('#navbar').style.display = "block";
            document.querySelector('#container').style.display = "none";
        });
        document.querySelector('#submitTodo').addEventListener('click', () => {
            if (!document.getElementById('newTodoTitle').value || !document.getElementById('newTodoDate').value) {
                return;
            } else {
                const newTodo = new Todo(document.querySelector('#newTodoTitle').value,
                                        document.querySelector('#newTodoDescription').value,
                                        document.querySelector('#newTodoDate').value,
                                        document.querySelector('#newTodoPriority').value);
                let selectedProject;
                if (myProjects.length > 1) {
                    selectedProject = myProjects.filter((project) => { return project.select == true })[0];
                } else {
                    selectedProject = myProjects[0];
                };
                selectedProject.todos.push(newTodo);
                document.querySelector('#projectForm').style.display = "none";
                document.querySelector('#todoForm').style.display = "none";
                document.querySelector('#navbar').style.display = "block";
                document.querySelector('#container').style.display = "block";
                render();
            };
        });
    };
    const checkTodo = () => {
        document.querySelectorAll('.todo-checkbox').forEach(element => {
            element.addEventListener('click', (e) => {
                let selectedProject;
                let selectedTodo;
                let indexProject;
                let indexTodo;
                if (myProjects.length > 1) {
                    selectedProject = myProjects.filter((project) => { return project.select == true })[0];
                    indexProject = myProjects.indexOf(selectedProject);
                } else {
                    selectedProject = myProjects[0];
                    indexProject = 0;
                };
                if (myProjects[indexProject].todos.length > 1) {
                    selectedTodo = myProjects[indexProject].todos.filter((todo) => { return e.currentTarget.value === todo.title })[0];
                    indexTodo = myProjects[indexProject].todos.indexOf(selectedTodo);
                } else {
                    selectedTodo = myProjects[indexProject].todos[0];
                    indexTodo = 0;
                };
                myProjects[indexProject].todos.splice(indexTodo, 1);
                render();
            });
        });
    };
    const editTodo = () => {
        let click = 0;
        document.querySelectorAll('.edit-todo').forEach(element => {
            element.addEventListener('click', function edit(e) {
                e.preventDefault(); // prevent page reloading
                click++;
                if (click == 1) {
                    let selectedProject;
                    let selectedTodo;
                    let indexProject;
                    if (myProjects.length > 1) {
                        selectedProject = myProjects.filter((project) => { return project.select == true })[0];
                        indexProject = myProjects.indexOf(selectedProject);
                    } else {
                        selectedProject = myProjects[0];
                        indexProject = 0;
                    };
                    if (myProjects[indexProject].todos.length > 1) {
                        selectedTodo = myProjects[indexProject].todos.filter((todo) => { return e.currentTarget.value === todo.title })[0];
                    } else {
                        selectedTodo = myProjects[indexProject].todos[0];
                    };
                    todos.displayEditTodoForm(selectedTodo);
                } else {
                    element.removeEventListener('click', edit);
                };
                saveTodo();   
            });
        });
    };
    const saveTodo = () => {
        document.getElementById('editTodoButton').addEventListener('click', (e) => {
            e.preventDefault(); // prevent page reloading
            let selectedProject;
            let selectedTodo;
            let indexProject;
            let indexTodo;
            if (myProjects.length > 1) {
                selectedProject = myProjects.filter((project) => { return project.select == true })[0];
                indexProject = myProjects.indexOf(selectedProject);
            } else {
                selectedProject = myProjects[0];
                indexProject = 0;
            };
            if (myProjects[indexProject].todos.length > 1) {
                selectedTodo = myProjects[indexProject].todos.filter((todo) => { return e.currentTarget.value === todo.title })[0];
                indexTodo = myProjects[indexProject].todos.indexOf(selectedTodo);
            } else {
                selectedTodo = myProjects[indexProject].todos[0];
                indexTodo = 0;
            };
            myProjects[indexProject].todos[indexTodo].title = document.getElementById('editTodoTitle').value;
            myProjects[indexProject].todos[indexTodo].date = document.getElementById('editTodoDate').value;
            myProjects[indexProject].todos[indexTodo].description = document.getElementById('editTodoDescription').value;
            myProjects[indexProject].todos[indexTodo].priority = document.getElementById('editTodoPriority').value;
            render();
        });
        document.getElementById('cancelTodoButton').addEventListener('click', (e) => {
            e.preventDefault(); // prevent page reloading
            render();
        });
    };
    return { init }
};

export default controller