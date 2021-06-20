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
            getItem(items);
        });

    };

    const getItem = (items) => {
        items.forEach((i) => {
            console.log(`${title.value}`);
        })
        const deleteButton = document.querySelectorAll('#delete');
        deleteButton.forEach((button) => {
            button.addEventListener('click', (e) => {
                const currentTarget = e.target.parentNode.innerText;
            });
        });
    };


    return { addTask }
};

export default controller