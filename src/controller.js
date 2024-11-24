"use strict";

import projectManager from './projects';
import { format } from 'date-fns';
const container = document.querySelector('#container');

class Project {
    constructor(name, todos) {
        this.name = name;
        this.todos = todos;
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
        const defaultproject = new Project("default project", [
            {
                title: "code",
                description: "try creating a web interface and a dynamic todo list", 
                date: format(new Date(), "yyyy'-'MM'-'dd"),
                priority: "High"
            },
            {
                title: "cook dinner",
                description: "a warming vegan supper with porcini mushrooms, leeks, carrots, and butternut squash.", 
                date: format(new Date(), "yyyy'-'MM'-'dd"),
                priority: "Medium"
            }
        ])
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
        ])
        projects.renderProject(defaultproject);
        projects.renderProject(workproject);
        container.insertAdjacentHTML('afterbegin', projects);
    }
    return { control }
};

export default controller