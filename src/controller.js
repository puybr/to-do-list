import taskManager from './to-dos';

const controller = () => {
    let items = [];
    const titleField = document.querySelector('#title');
    const descriptionField = document.querySelector('#description');
    const dateField = document.querySelector('#date');
    const priorityField = document.querySelector('#priority');
    const taskButton = document.querySelector('#submit');

    const addTask = () => {
        taskButton.addEventListener('click', (e) => {
            e.preventDefault(); // prevent page reload
            const newItem = taskManager(titleField.value, descriptionField.value, dateField.value, priorityField.value);
            items.push(newItem);
            newItem.renderList(items);
            checkList();
        });

    };
    const checkList = () => {
        const deleteButton = document.querySelectorAll('#delete');
        deleteButton.forEach((button) => {
            button.addEventListener('click', () => {
                console.log(button);
            });
        });

    };


    return { addTask }
};

export default controller