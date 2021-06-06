import taskManager from './to-dos';

const controller = () => {
    const titleField = document.querySelector('#title');
    const descriptionField = document.querySelector('#description');
    const dateField = document.querySelector('#date');
    const priorityField = document.querySelector('#priority');
    const taskButton = document.querySelector('#submit');

    const addTask = () => {
        taskButton.addEventListener('click', (e) => {
            let items = [];
            e.preventDefault(); // prevent page reload
            const newItem = taskManager(titleField.value, descriptionField.value, dateField.value, priorityField.value);
            items.push(newItem);
            newItem.renderList(items);
            checkList();
            console.log(items)
        });

    };
    const checkList = () => {
        const deleteButton = document.querySelectorAll('#delete');
        deleteButton.forEach((button) => {
            button.addEventListener('click', (e) => {
                console.log(e.target.parentNode.innerText);
            });
        });

    };


    return { addTask }
};

export default controller