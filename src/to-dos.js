"use strict";

const todoManager = (title, description, date, priority) => {
    const deleteTodo = () => {
        document.querySelectorAll('#delete-checkbox').forEach((del) => {
            del.addEventListener('click', (e) => {
                if (del.checked) {
                    console.log(myProjects);                
                    // getTodoIndex(todo.children[1].textContent);
                };
            });
        });      
    };

    return { deleteTodo }
};

export default todoManager
