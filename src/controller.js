"use strict";

import projectManager from './projects';
import todoManager from './todos';
import { format } from 'date-fns';
const container = document.querySelector('#container');

let myProjects = [];

class Project {
    constructor(name, todos, select) {
        this.name = name;
        this.todos = todos;
        this.select = select;
    };
};

class Todo {
    constructor(project, title, description, date, priority) {
        this.project = project;
        this.title = title;
        this.description = description;
        this.date = date
        this.priority = priority
    };
};

const controller = () => {
    const control = () => {
        container.innerHTML = `<table id="container"></table>`;//refresh
        const projects = projectManager();
        const todos = todoManager();
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
                description: "a warming vegan supper with porcini mushrooms, leeks, carrots, and butternut squash.", 
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
        projects.renderProject(workproject);
        todos.renderTodo(defaultproject);
    }
    return { control }
};

export default controller