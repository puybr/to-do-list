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
        render();
    };
    const render = () => {
        projects.renderProjects(myProjects);
        let selectedProject = myProjects.filter((project) => {
            return project.select == true;
        });
        todos.renderTodo(selectedProject[0]);
        select();
    };
    const select = () => {
        document.querySelector('.projects').addEventListener('change', (e) => {
            e.preventDefault(); // prevent page reloading
            myProjects.forEach((project) => {
                if (project.name == e.target.value) {
                    project.select = true;
                } else
                project.select = false;
            });
            document.querySelector('#container').innerHTML = `<div id="container"></div>`;
            render();
        });
    };
    return { init }
};

export default controller