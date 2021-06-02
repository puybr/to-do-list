const toDo = (title, description, dueDate, priority) => {
    const newToDo = () => {
        console.log(title + description + dueDate + priority);

    };
    return { newToDo }
};

export default toDo