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
            <select id="projects" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5">
            ${options}
            </select>
            <button type="submit" class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">select</button>
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