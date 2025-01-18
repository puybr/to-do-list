"use strict";

import todoManager from './todos';

const projectManager = () => {
    const todos = todoManager();
    const renderProjects = (myProjects) => {
        let options = myProjects.map((option) => {
            if (option.select == true) {
                return `<option selected value="${option.name}">${option.name}</option>`;
            } else
            return `<option value="${option.name}">${option.name}</option>`;
        });
        const form = `
            <form class="max-w-sm mx-auto">
            <label for="projects" class="block mb-2 text-sm font-medium text-gray-900">select a project</label>
            <select id="projects" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5">
            ${options}
            </select>
            </form>
            `;
        container.insertAdjacentHTML('afterbegin', form);
        let selectedProject = myProjects.filter((project) => {
            return project.select == true;
        });
        todos.renderTodo(selectedProject[0]);
    };
return { renderProjects }
};


export default projectManager