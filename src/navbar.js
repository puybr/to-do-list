"use strict";

const navbar = document.querySelector('#navbar');

const navManager = () => {
    const render = () => {
        const nav = `
               <nav>
                <div class="flex items-center justify-between flex-wrap p-3">
                    <h1 class="select-none font-bold text-xl mb-2"><i class="fas fa-check text-green-500"><nobr /></i>todos</h1>
                    <div class="flex items-center">
                        <button class="flex-shrink-0 border-transparent border-4 text-green-500 hover:text-green-800 text-sm py-1 px-2 rounded" type="button"><i class="fa-solid fa-arrows-rotate text-green-500"></i></button>
                    </div>
                </div>
                </nav>`;
        navbar.insertAdjacentHTML('afterbegin', nav);
    };
    return { render }
};

export default navManager