import controller from './controller'
import toDo from './to-dos'


controller('World!');

const toDo01 = toDo('Code', 'Add some features & fix bugs', [2021, 6, 02], 'Low');
toDo01.newToDo();