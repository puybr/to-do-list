"use strict";

const container = document.querySelector('#container');

const todoManager = () => {
    class Todo {
        constructor(project, title, description, date, priority) {
            this.project = project;
            this.title = title;
            this.description = description;
            this.date = date
            this.priority = priority
        };
    };
    const renderTodo = (project) => {
        const addTodoButton = `<div class="flex justify-center">
                                    <button class="flex-shrink-0 border-green-500 text-sm border-2 text-green-500 py-1 px-2 rounded w-96" type="button">+</button>
                                </div>`;
        if (project.select == true) {
            project.todos.forEach((todo) => {
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
            container.insertAdjacentHTML('beforeend',addTodoButton);
        };
    };

    return { renderTodo }
};

export default todoManager