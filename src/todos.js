"use strict";

const container = document.querySelector('#container');
const todoForm = document.querySelector('#todoForm');
import { format } from 'date-fns';

const todoManager = () => {
    const renderTodo = (todo) => {
        const addTodoButton = `<div class="flex justify-center p-2">
                                <button id="addTodoButton" class="flex-shrink-0 border-green-500 text-sm border-2 text-green-500 py-1 px-2 rounded w-96" type="button">+</button>
                               </div>`;
        if (todo.todos.length == 0) {
            const empty = `<div class="flex justify-center">
                            <p>¯\\_(ツ)_/¯ you have no todos yet!</p>
                          </div>`;
            container.insertAdjacentHTML('beforeend', empty);
            container.insertAdjacentHTML('beforeend', addTodoButton);
        } else {
            todo.todos.forEach((todo) => {
                const t = `
                    <nav id="${todo.title}" class="todos p-1">
                    <div class="todos bg-gray-100 p-2 flex flex-col justify-between leading-normal">
                    <div class="flex items-center justify-between flex-wrap p-3">
                        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">${todo.priority}</span>
                        <div class="flex items-center space-x-6 rtl:space-x-reverse">
                            <div class="flex items-center">
                                <div class="text-sm p-2">
                                    <p>${todo.date}</p>
                                </div>
                                <div class="text-sm">
                                    <button value="${todo.title}" class="edit-todo flex-shrink-0 bg-green-500 hover:bg-green-700 border-green-500 hover:border-green-700 text-sm border-4 text-white py-1 px-2 rounded" type="button"><i class="fas fa-edit"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="p-4">
                    <div class="flex items-center mb-4">
                        <input id="todo-checkbox" type="checkbox" value="${todo.title}" class="todo-checkbox focus:accent-green-500 w-4 h-4 bg-transparent border-none rounded">
                        <label for="todo-checkbox" class="ms-2 font-medium">${todo.title}</label>
                    </div>
                    <p class="text-sm text-base text-wrap">${todo.description}</p>
                    </div>
                    </nav>`;
                container.insertAdjacentHTML('beforeend', t);
                });
            container.insertAdjacentHTML('beforeend', addTodoButton);
        };
    };
    const displayTodoForm = (project) => {
        const form = `
            <div class="flex items-center justify-center h-96">
                <form class="w-full max-w-lg">
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                            ${project.name}
                        </label>
                        <input id="newTodoTitle" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-green-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none" type="text" placeholder="new todo">
                        </div>
                        <div class="w-full md:w-1/2 px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                            Date
                        </label>
                        <input id="newTodoDate" onfocus="(this.type='date')" class="focus:ring-green-500 focus:border-green-500 focus:accent-green-500 selection:text-green-500 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-500" type="text" placeholder="${format(new Date(), "dd'\/'MM'\/'yyyy")}">
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full px-3 pb-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                    Description
                            </label>
                            <input id="newTodoDescription" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-500" type="text" placeholder="add a short description">
                        </div>
                        <div class="w-full px-3 pb-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="priority">
                                Priority
                            </label>
                            <select id="newTodoPriority" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                        <div class="flex items-center justify-between flex-wrap p-3">
                            <div>
                                <button id="submitTodo" class="flex-shrink-0 bg-green-500 hover:bg-green-700 border-green-500 hover:border-green-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">+</button>
                            </div>
                            <div>
                                <button class="cancel flex-shrink-0 border-transparent border-4 text-green-500 hover:text-green-800 text-sm py-1 px-2 rounded" type="button">cancel</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>`;
        todoForm.insertAdjacentHTML('afterbegin', form);
    };
    const displayEditTodoForm = (todo) => {
        const priorities = ['High', 'Medium', 'Low']
        let options = priorities.map((priority) => {
            if (priority == todo.priority) {
                return `<option selected value="${priority}">${priority}</option>`;
            } else return `<option value="${priority}">${priority}</option>`;
        });
        document.getElementById(`${todo.title}`).outerHTML =`<nav>
                                                            <div class="todos bg-gray-100 p-2 flex flex-col justify-between leading-normal">
                                                            <textarea class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-500">${todo.title}</textarea>
                                                            <input onfocus="(this.type='date')" class="focus:ring-green-500 focus:border-green-500 focus:accent-green-500 selection:text-green-500 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-500" type="text" placeholder="${todo.date}">
                                                            <textarea class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-500">${todo.description}</textarea>
                                                            <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                                                ${options}
                                                            </select>
                                                            </div>
                                                            <div>
                                                                <button id="editTodoButton" class="flex-shrink-0 bg-green-500 hover:bg-green-700 border-green-500 hover:border-green-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">save</button>
                                                            </div>
                                                            <div>
                                                                <button id="cancelTodoButton" class="flex-shrink-0 border-transparent border-4 text-green-500 hover:text-green-800 text-sm py-1 px-2 rounded" type="button">cancel</button>
                                                            </div>
                                                        </nav>`;
    };
    return { renderTodo, displayTodoForm, displayEditTodoForm }
};

export default todoManager