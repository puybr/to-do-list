"use strict";

const container = document.querySelector('#container');
const projectForm = document.querySelector('#projectForm');

const projectManager = () => {
    const renderProjects = (myProjects) => {
        console.log(myProjects, myProjects.length);
        if (myProjects.length == 0) {
            const empty = `<div class="flex justify-center">
                            <p>¯\\_(ツ)_/¯ you have no projects yet!</p>
                            <div class="grid grid-cols-2 gap-2">
                                <button class="addProjectButton flex-shrink-0 bg-green-500 border-green-500 text-sm border-4 text-white py-1 px-2 rounded" type="button">New Project</button>
                            </div>
                          </div>`;
            container.insertAdjacentHTML('beforeend', empty);
        } else {
            let options = myProjects.map((option) => {
                if (option.select == true) {
                    return `<option selected value="${option.name}">${option.name}</option>`;
                } else return `<option value="${option.name}">${option.name}</option>`;
            });
            const nav = `
                <div class="flex items-center justify-between flex-wrap p-3">
                    <div class="grid grid-cols-2 gap-2">
                        <div>
                            <form id="project">
                            <label>
                            <select name="projects" class="projects bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 focus:outline-none block p-2.5 appearance-none">
                            ${options}
                            </select>
                            </label>
                            </form>
                        </div>
                        <div>
                            <button class="addProjectButton flex-shrink-0 bg-green-500 border-green-500 text-sm border-4 text-white py-1 px-2 rounded" type="button">+</button>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <button id="deleteProjectButton" class="flex-shrink-0 bg-red-500 border-red-500 text-sm border-4 text-white py-1 px-2 rounded" type="button"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
                `;
            container.insertAdjacentHTML('afterbegin', nav);
        };
    };
    const displayProjectForm = () => {
        const form = `
            <form class="w-full max-w-sm p-4">
            <div class="flex items-center border-green-500">
                <input id="newProject" class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="new project" aria-label="project">
                <button id="submitProject" class="flex-shrink-0 bg-green-500 hover:bg-green-700 border-green-500 hover:border-green-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">+</button>
                <button class="cancel flex-shrink-0 border-transparent border-4 text-green-500 hover:text-green-800 text-sm py-1 px-2 rounded" type="button"><i class="fa-solid fa-xmark"></i></button>
            </div>
            </form>`;
        projectForm.insertAdjacentHTML('afterbegin', form);
    };
return { renderProjects, displayProjectForm }
};

export default projectManager