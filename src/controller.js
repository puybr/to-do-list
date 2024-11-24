"use strict";

import projectManager from './projects';
import todoManager from './todos';
import { format } from 'date-fns';

let myProjects = [];

const controller = () => {
    class Project {
        constructor(name, todos, select) {
            this.name = name;
            this.todos = todos;
            this.select = select;
        };
    };
    const projects = projectManager();
    const todos = todoManager();
    const render = () => {
        // container.innerHTML = `<table id="container"></table>`;//refresh
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
        projects.renderProject(defaultproject);
        myProjects.push(defaultproject);
        projects.renderProject(workproject);
        myProjects.push(workproject);
        todos.renderTodo(defaultproject);
        todos.renderTodo(workproject);
    }
    return { render }
};

export default controller