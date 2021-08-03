import taskManager from './to-dos';
import projectManager from './projects';

const controller = () => {
    const titleField = document.querySelector('#title');
    const descriptionField = document.querySelector('#description');
    const dateField = document.querySelector('#date');
    const priorityField = document.querySelector('#priority');
    const taskButton = document.querySelector('#submit');
    const projectButton = document.querySelector('#addproject');
    const projectInput = document.querySelector('#project');

    const addProject = () => {
        projectButton.addEventListener('click', (e) => {
            e.preventDefault(); // prevent page reload
            let projects = [];
            const newProject = projectManager(project.value);
            projects.push(newProject);
            newProject.renderList(projects);
            projectInput.value = '';
            selectProject();
        });
    }

    const selectProject = () => {
        const list = document.querySelectorAll('.projectlist');
        list.forEach((project) => {
            project.addEventListener('click', (e) => {
                const p = `
                <h3>${e.target.innerText}'s todos</h3>
                `
                document.getElementById("taskform").style.display = "block";
                document.getElementById("project-todos").innerHTML = p;
                console.log(e.target.innerText);
            })
        })
    }

    const addTask = () => {
        taskButton.addEventListener('click', (e) => {
            e.preventDefault(); // prevent page reload
            let items = [];
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


    return { addTask, addProject }
};

export default controller