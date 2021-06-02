import controller from './controller';
import taskManager from './to-dos';

// Set up the main controller
const list = controller();


const item1 = taskManager('Code', 'Add some features & fix bugs', 2021, 'Low');
item1.listTask();
const item2 = taskManager('Water Plants', '/', 2021, 'Low');
item2.listTask();
list.addTask(item1);
list.addTask(item2);


list.getInfo();
