"use strict";
import './style.css';

import navManager from './navbar';
import controller from './controller';
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'

// Navigation
const nav = navManager();
nav.render();

// Set up the main controller
const list = controller();
list.init();

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