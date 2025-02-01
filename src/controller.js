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
                date: format(new Date(), "dd'\/'MM'\/'yyyy"),
                priority: "High"
            },
            {
                project: "default project",
                title: "cook dinner",
                description: "a warming vegan supper with porcini mushrooms, leeks, carrots, and butternut squash", 
                date: format(new Date(), "dd'\/'MM'\/'yyyy"),
                priority: "Medium"
            }
        ], true)
        const workproject = new Project("work project", [
            {
                project: "work project",
                title: "create a powerpoint presentation",
                description: "for the financial team",
                date: format(new Date(), "dd'\/'MM'\/'yyyy"),
                priority: "Low"
            },
            {
                project: "work project",
                title: "admin tasks",
                description: "office cleanup", 
                date: format(new Date(), "dd'\/'MM'\/'yyyy"),
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
        document.querySelector('#todoForm').innerHTML = ``;
        document.querySelector('#container').innerHTML = ``;
        if (myProjects.length == 0) {
            projects.renderProjects(myProjects);
        } else {
            let selectedProject = myProjects.filter((project) => { return project.select == true });
            projects.renderProjects(myProjects);
            todos.renderTodo(selectedProject[0]);
            todos.displayTodoForm(selectedProject[0]);
            selectProject();
            addProject();
            addTodo();
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
        document.querySelector('#submitProject').addEventListener('click', () => {
            if (!document.getElementById('newProject').value) {
                return;
            } else
            myProjects.push(new Project(document.querySelector('#newProject').value, [], true));
            document.querySelector('#projectForm').style.display = "none";
            document.querySelector('#todoForm').style.display = "none";
            document.querySelector('#navbar').style.display = "block";
            document.querySelector('#container').style.display = "block";
            sortProjects(document.getElementById('newProject').value);
            document.getElementById('newProject').value = '';
            render();
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