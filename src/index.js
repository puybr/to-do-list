import controller from './controller';
import taskManager from './to-dos';

const list = controller('Fred');
list.getInfo();



const item = taskManager('Code', 'Add some features & fix bugs', 2021, 'Low');
item.listTask();