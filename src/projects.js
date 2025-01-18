"use strict";

import { tr } from "date-fns/locale";
import todoManager from './todos';

const projectButton = document.querySelector('#addproject');
const projectInput = document.querySelector('#project');
const container = document.querySelector('#container');

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
        console.log(selectedProject[0]);
        todos.renderTodo(selectedProject[0]);
    };
return { renderProjects }
};

const addProject = () => {
    projectButton.addEventListener('click', (e) => {
        e.preventDefault(); // prevent page reloading
        const projectTemplate = {
            name: project.value,
            todos: [],
            select: true
        };
        if (project.value) {
            const newProject = Object.create(projectTemplate);
            myProjects.push(newProject);
            // console.log('Proto: '+ Object.getPrototypeOf(newProject));
             renderProjects(project.value);
             projectInput.value = '';
             selectProject();
             addTodo(); } else return;
    });
};

const selectProject = () => {
    document.querySelectorAll('.projectlist').forEach((project) => {
        project.addEventListener('click', (e) => {
            //this is what happens when you select a project :)
            e.preventDefault(); // prevent page reloading
            e.currentTarget.id = 'selected';
            renderProjects(e.target.textContent);
            changeProjectColor(e.target.textContent);
            addProject();
            checkTodo();
            editTodoList();
            updateTodoList();
            const projectName = document.querySelector('#selected').textContent;
            document.querySelectorAll('.to-do-row').forEach((row) => {
                if (row.id === projectName) {
                    row.style.display = 'block';
                } else row.style.display = 'none';    
            });
        });
         
    });       
};

const changeProjectColor = (projectName) => { // change the colour of the project when selected
    document.querySelectorAll('.projectlist').forEach((project) => {
        if (projectName === project.innerText) {
            project.id = 'selected';
            renderProjects(projectName);
            selectProject();
            addTodo();
            addProject();
            editTodoList();
            checkTodo();
            deleteTodo();
            updateTodoList();
            deleteProject();
    
        } else project.id = 'unselected';
    });    
};

const deleteProject = () => {
    const trashButton = document.querySelectorAll("#delete-project");
    trashButton.forEach((button) => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); // prevent page reloading
            const currentProjectName = e.currentTarget.parentNode.childNodes[1].innerText
            const myIndex = myProjects.map((el) => el.name).indexOf(currentProjectName)
            myProjects.splice(myIndex, 1)
            renderProjects(currentProjectName)
            selectProject();    
        });
    });
};

export default projectManager