"use strict";

const navbar = document.querySelector('#navbar');

const navManager = () => {
    const render = () => {
        const nav = `
               <nav>
                <div class="flex items-center justify-between flex-wrap p-3">
                    <h1 class="font-bold text-xl mb-2"><i class="fas fa-check text-green-500"><nobr /></i>todos</h1>
                    <div class="flex items-center">
                        <i class="fa-solid fa-arrows-rotate text-green-500"></i>
                    </div>
                </div>
            </nav>
            `;
        navbar.insertAdjacentHTML('afterbegin', nav);
    };
    return { render }
};

export default navManager