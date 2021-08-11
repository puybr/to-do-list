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

    let myProjects = [{
        name: "default project",
        todos: [{
            title: "Code",
            description: "Test 01", 
            date: "Test 01",
            priority: "Test 01"
        },
        {
            title: "Eat",
            description: "Test 02", 
            date: "Test 03",
            priority: "Test 04"
        }
    ]},
    {
        name: "work project",
        todos: [{
            title: "create a powerpoint presentation",
            description: "Test 01", 
            date: "Test 01",
            priority: "Test 01"
        },
        {
            title: "Test 02",
            description: "Test 02", 
            date: "Test 03",
            priority: "Test 04"
        }
    ]
    }
    ]; // end of dummy tasks


    const renderProjects = () => {
        const container = document.querySelector('#projectnav');
        container.innerHTML = '';
        // console.log(myProjects[1].todos[0].title);
        myProjects.forEach((project) => {
            console.log(project);
            const proj = `
            <div class="projectlist">
            <i class="fa fa-trash" aria-hidden="true" id="icon"></i>
            ${project.name}
            </div>
            `;
        container.insertAdjacentHTML('afterbegin', proj);

        });


    };
    renderProjects();

    const addProject = () => {
        projectButton.addEventListener('click', (e) => {
            e.preventDefault(); // prevent page reloading
            const projectTemplate = {
                name: project.value,
                todos: [] 
            };
            const newProject = Object.create(projectTemplate);
            myProjects.push(newProject);
            projectInput.value = '';
            console.log('Add the project: ' + newProject.name);
            renderProjects();
            selectProject();
            
        });
    }

    const selectProject = () => {
        const list = document.querySelectorAll('.projectlist');
        list.forEach((project) => {
            project.addEventListener('click', (e) => {
                console.log('add todo...')
                const p = `
                <h3>${e.target.innerText}'s todos</h3>
                `
                document.getElementById("taskform").style.display = "block";
                document.getElementById("project-todos").innerHTML = p;
                console.log(e.target.innerText);
            })
             
        })
    }
    selectProject();

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