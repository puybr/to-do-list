"use strict";

const navbar = document.querySelector('#navbar');

const navManager = () => {
    const render = () => {
        const nav = `
               <nav>
                <div class="flex items-center justify-between flex-wrap p-3">
                    <h1 class="font-bold text-xl mb-2"><i class="fas fa-check text-green-500"><nobr /></i>todos</h1>
                    <div class="flex items-center space-x-6 rtl:space-x-reverse">
                        <div class="flex items-center">
                            <input class="appearance-none bg-transparent border-none w-full mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="add a project" aria-label="Project">
                            <button class="flex-shrink-0 bg-green-500 border-green-500 text-sm border-4 text-white py-1 px-2 rounded" type="button">
                                +
                            </button>
                            <button class="flex-shrink-0 border-transparent border-4 text-sm py-1 px-2 rounded" type="button">
                                reset
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            `;
        navbar.insertAdjacentHTML('afterbegin', nav);
    };
    return { render }
};

export default navManager