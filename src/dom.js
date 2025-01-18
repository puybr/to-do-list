"use strict";

const container = document.querySelector('#container');

const domManager = () => {
    const listen = () => {
        console.log("Listening ...");
    };

    return { listen }
};

export default domManager