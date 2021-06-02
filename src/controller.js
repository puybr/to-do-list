const controller = () => {
    let items = [];
    const addTask = (object) => {
        console.log('Hi, this is the task adding features');
        items.push(object);
        console.log(items);

    };
    const getInfo = () => {
        const taskButton = document.querySelector('#submit');
        console.log(taskButton);
    }
    return { addTask, getInfo }
};

export default controller