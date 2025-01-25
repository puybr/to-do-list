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
    const projects = projectManager();
    const todos = todoManager();
    const init = () => {
        const defaultproject = new Project("default project", [
            {
                project: "default project",
                title: "code",
                description: "try creating a web interface and a dynamic todo list", 
                date: format(new Date(), "yyyy'-'MM'-'dd"),
                priority: "High"
            },
            {
                project: "default project",
                title: "cook dinner",
                description: "a warming vegan supper with porcini mushrooms, leeks, carrots, and butternut squash", 
                date: format(new Date(), "yyyy'-'MM'-'dd"),
                priority: "Medium"
            }
        ], true)
        const workproject = new Project("work project", [
            {
                project: "work project",
                title: "create a powerpoint presentation",
                description: "for the financial team",
                date: format(new Date(), "yyyy'-'MM'-'dd"),
                priority: "Low"
            },
            {
                project: "work project",
                title: "admin tasks",
                description: "office cleanup", 
                date: format(new Date(), "yyyy'-'MM'-'dd"),
                priority: "Low"
            }
        ], false)
        myProjects.push(defaultproject);
        myProjects.push(workproject);
        projects.displayProjectForm();
        todos.displayTodoForm();
        document.querySelector('#projectForm').style.display = "none";
        document.querySelector('#todoForm').style.display = "none";
        render();
    };
    const render = () => {
        projects.renderProjects(myProjects);
        let selectedProject = myProjects.filter((project) => {
            return project.select == true;
        });
        todos.renderTodo(selectedProject[0]);
        selectProject();
        addProject();
        addTodo();
        cancel();
    };
    const selectProject = () => {
        document.querySelectorAll('.projects').forEach(element => {
            element.addEventListener('change', (e) => {
                e.preventDefault(); // prevent page reloading
                myProjects.forEach((project) => {
                    if (project.name == e.target.value) {
                        project.select = true;
                    } else
                    project.select = false;
                });
                document.querySelector('#container').innerHTML = ``;
                render();
            });
        });
    };
    const cancel = () => {
        document.querySelectorAll('.cancel').forEach(element => {
            element.addEventListener('click', () => {
                document.querySelector('#projectForm').style.display = "none";
                document.querySelector('#todoForm').style.display = "none";
                document.querySelector('#navbar').style.display = "block";
                document.querySelector('#container').style.display = "block";
            });
        });
    };
    const addProject = () => {
        document.querySelector('#addProjectButton').addEventListener('click', () => {
            document.querySelector('#projectForm').style.display = "block";
            document.querySelector('#navbar').style.display = "block";
            document.querySelector('#container').style.display = "none";
        });
    };
    const addTodo = () => {
        document.querySelector('#addTodoButton').addEventListener('click', () => {
            document.querySelector('#todoForm').style.display = "block";
            document.querySelector('#navbar').style.display = "block";
            document.querySelector('#container').style.display = "none";
        });
    }
    return { init }
};

export default controller