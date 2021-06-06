import taskManager from './to-dos';

const controller = () => {
    let items = [];

    const addTask = () => {
        const titleField = document.querySelector('#title');
        const descriptionField = document.querySelector('#description');
        const dateField = document.querySelector('#date');
        const priorityField = document.querySelector('#priority');
        const taskButton = document.querySelector('#submit');
        taskButton.addEventListener('click', (e) => {
            e.preventDefault(); // prevent page reload
            const newItem = taskManager(titleField.value, descriptionField.value, dateField.value, priorityField.value);
            items.push(newItem);
            newItem.listTask();
            console.log(items);

        });

    }

    return { addTask }
};

export default controller