"use strict";

const container = document.querySelector('#container');
const todoForm = document.querySelector('#todoForm');

const todoManager = () => {
    class Todo {
        constructor(todo, title, description, date, priority) {
            this.todo = todo;
            this.title = title;
            this.description = description;
            this.date = date
            this.priority = priority
        };
    };
    const renderTodo = (todo) => {
        const addTodoButton = `<div class="flex justify-center">
                                <button id="addTodoButton" class="flex-shrink-0 border-green-500 text-sm border-2 text-green-500 py-1 px-2 rounded w-96" type="button">+</button>
                                </div>`;
        if (todo.todos.length == 0) {
            const empty = `<div>
                            ¯\_(ツ)_/¯ You have no todos yet!
                          </div>`;
            container.insertAdjacentHTML('beforeend', empty);
            container.insertAdjacentHTML('beforeend', addTodoButton);
        } else {
            todo.todos.forEach((todo) => {
                const t = `
                    <nav class="todos p-1">
                    <div class="todos bg-gray-100 p-2 flex flex-col justify-between leading-normal">
                    <div class="flex items-center justify-between flex-wrap p-3">
                        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">${todo.priority}</span>
                        <div class="flex items-center space-x-6 rtl:space-x-reverse">
                            <div class="flex items-center">
                                <div class="text-sm p-2">
                                    <p>${todo.date}</p>
                                </div>
                                <div class="text-sm">
                                    <p><i class="fas fa-edit"></i></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="p-4">
                    <div class="flex items-center mb-4">
                        <input id="default-checkbox" type="checkbox" value="" class="focus:accent-green-500 w-4 h-4 bg-transparent border-none rounded">
                        <label for="default-checkbox" class="ms-2 font-medium">${todo.title}</label>
                    </div>
                    <p class="text-sm text-base text-wrap">${todo.description}</p>
                    </div>
                    </nav>`;
                container.insertAdjacentHTML('beforeend', t);
                });
            container.insertAdjacentHTML('beforeend', addTodoButton);
        };
    };
    const displayTodoForm = () => {
        const form = `
            <form class="w-full max-w-sm">
                <input class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="new todo" aria-label="todo">
                <input type="date" placeholder="select date">
                <textarea></textarea>
                <label>
                <select name="projects" class="projects bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5">
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                </select>
                </label>
                <button class="flex-shrink-0 bg-green-500 hover:bg-green-700 border-green-500 hover:border-green-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">+</button>
                <button class="cancel flex-shrink-0 border-transparent border-4 text-green-500 hover:text-green-800 text-sm py-1 px-2 rounded" type="button">cancel</button>
            </form>`;
        todoForm .insertAdjacentHTML('afterbegin', form);
    };

    return { renderTodo, displayTodoForm }
};

export default todoManager