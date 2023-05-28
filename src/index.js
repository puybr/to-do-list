import controller from './controller';
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'

// Set up the main controller
const list = controller();

list.addProject();
list.renderProjects();
list.selectProject();
list.addTodo();
list.editTodoList();
list.updateTodoList();
list.deleteProject();