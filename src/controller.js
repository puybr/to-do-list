const controller = (name) => {
    const sayHi = () => {
        console.log('Hi ' + name);
    };
    const getInfo = () => {
        const taskButton = document.querySelector('#submit');
        console.log(taskButton);
    }
    return { sayHi, getInfo }
};

export default controller