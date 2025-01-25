"use strict";

const container = document.querySelector('#container');
const projectForm = document.querySelector('#projectForm');

const projectManager = () => {
    const renderProjects = (myProjects) => {
        let options = myProjects.map((option) => {
            if (option.select == true) {
                return `<option selected value="${option.name}">${option.name}</option>`;
            } else
            return `<option value="${option.name}">${option.name}</option>`;
        });
        const nav = `
            <div class="flex items-center justify-between flex-wrap p-3">
                <form id="project">
                <label>
                <select name="projects" class="projects bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5">
                ${options}
                </select>
                </label>
                </form>
                <div class="flex items-center">
                    <button id="addProjectButton" class="flex-shrink-0 bg-green-500 border-green-500 text-sm border-4 text-white py-1 px-2 rounded" type="button">+</button>
                    <i class="fa-solid fa-trash text-gray-300"></i>
                </div>
            </div>
            `;
        container.insertAdjacentHTML('afterbegin', nav);
    };
    const displayProjectForm = () => {
        const form = `
            <form class="w-full max-w-sm">
            <div class="flex items-center border-green-500">
                <input class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="new project" aria-label="project">
                <button class="flex-shrink-0 bg-green-500 hover:bg-green-700 border-green-500 hover:border-green-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">+</button>
                <button class="cancel flex-shrink-0 border-transparent border-4 text-green-500 hover:text-green-800 text-sm py-1 px-2 rounded" type="button">Cancel</button>
            </div>
            </form>`;
        projectForm.insertAdjacentHTML('afterbegin', form);
    };
return { renderProjects, displayProjectForm }
};

export default projectManager