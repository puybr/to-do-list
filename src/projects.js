"use strict";

const container = document.querySelector('#container');

const projectManager = () => {
    const renderProjects = (myProjects) => {
        let options = myProjects.map((option) => {
            if (option.select == true) {
                return `<option selected value="${option.name}">${option.name}</option>`;
            } else
            return `<option value="${option.name}">${option.name}</option>`;
        });
        const form = `
            <div class="flex items-center justify-between flex-wrap p-3">
                <form id="project">
                <label>
                <select name="projects" class="projects bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5">
                ${options}
                </select>
                </label>
                </form>
                <div class="flex items-center">
                    <button class="flex-shrink-0 bg-green-500 border-green-500 text-sm border-4 text-white py-1 px-2 rounded" type="button">+</button>
                    <i class="fa-solid fa-trash text-gray-300"></i>
                </div>
            </div>
            `;
        container.insertAdjacentHTML('afterbegin', form);
    };
return { renderProjects }
};

export default projectManager