"use strict";
import './style.css';

import navManager from './navbar';
import controller from './controller';
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'
import { format } from 'date-fns';

const myProjects = [
    {
        name: "default project",
        todos: [
            {
                title: "code",
                description: "try creating a web interface and a dynamic todo list", 
                date: format(new Date(), "yyyy'-'MM'-'dd"),
                priority: "High"
            },
            {
                title: "cook dinner",
                description: "a warming vegan supper with porcini mushrooms, leeks, carrots, and butternut squash", 
                date: format(new Date(), "yyyy'-'MM'-'dd"),
                priority: "Medium"
            }
        ],
        select: true
    },
    {
        name: "work project",
        todos: [
            {
                title: "create a powerpoint presentation",
                description: "for the financial team",
                date: format(new Date(), "yyyy'-'MM'-'dd"),
                priority: "Low"
            },
            {
                title: "admin tasks",
                description: "office cleanup", 
                date: format(new Date(), "yyyy'-'MM'-'dd"),
                priority: "Low"
            }
        ],
        select: false
    }
]

// Navigation
const nav = navManager();
nav.render();

// Set up the main controller
const list = controller();
list.init(myProjects);

// Check and apply the user's stored preference or the system preference on page load
// if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
//     document.body.classList.add('dark');
//   } else {
//     document.body.classList.remove('dark');
// }
  
// User actions to explicitly choose themes
// function toggleTheme(isDark) {
//   localStorage.theme = isDark ? 'dark' : 'light'; // Save preference
//   document.body.classList.toggle('dark', isDark);
// }