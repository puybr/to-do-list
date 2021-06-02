const controller = () => {
    let items = [];
    const addTask = (object) => {
        console.log('Hi, this is the task adding features');
        items.push(object);

    };
    const getInfo = () => {
        const taskButton = document.querySelector('#submit');
        console.log(taskButton);
        console.log(items);
    }
    return { addTask, getInfo }
};

export default controller