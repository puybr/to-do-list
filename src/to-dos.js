const taskManager = (title, description, date, priority) => {
    const taskButton = document.querySelector('#submit');
    const renderList = () => {
        taskButton.addEventListener('click', (e) => {
            e.preventDefault(); // prevent page reloading
            console.log('CLICK!');

        });
    };

    return { renderList }
};

export default taskManager