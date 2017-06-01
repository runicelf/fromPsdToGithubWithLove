"use strict";

const navButtons = document.getElementsByClassName('animate-anchor');

function addAnchorsHolder(buttons) {
    Object.keys(buttons).forEach(k => {
        const elem = buttons[k];
        elem.addEventListener('click', (e) => {
            e.preventDefault();
            const attr = elem.getAttribute('href').slice(1);
            const purpose = document.getElementsByName(attr)[0];
            if(!purpose) {
                throw new Error(`anchor with '${attr}' attribute not found`)
            }
            scrollToWithAnimate(purpose);
        })
    })
}

function scrollToWithAnimate(elem) {
    const currentPosition = window.pageYOffset;
    const purposePosition =  elem.getBoundingClientRect().top + currentPosition;

    const scrollDistance = currentPosition > purposePosition ? currentPosition - purposePosition : purposePosition - currentPosition;

    const timingFunction = (timePassed) => Math.pow(timePassed, 2);
    animate(timingFunction, scrollAnimate.bind(null, currentPosition, true), 500);

    function scrollAnimate(start, direction, timePassed) {
        const speed = scrollDistance - 10;
        const distance = direction ? timePassed * speed : timePassed * speed * -1;
        window.scrollTo(0, distance + start);
    }
}

function scroll(start, direction, timePassed) {
    const speed = 350;
    const distance = direction ? timePassed * speed : timePassed * speed * -1;
    window.scrollTo(0, distance + start);
}

function animate(timing, draw, duration) {

    let start = performance.now();

    requestAnimationFrame(function animate(time) {
        // timeFraction goes from 0 to 1
        let timeFraction = (time - start) / duration;
        if (timeFraction < 0) timeFraction = .01;
        if (timeFraction > 1) timeFraction = 1;

        // calculate the current animation state
        //let progress = timing(timeFraction);
        let progress = 1 - timing(1 - timeFraction);
        draw(progress); // draw it

        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }
    });
}

document.addEventListener('wheel', function (e) {
    const directionDown = e.deltaY > 0;
    e.preventDefault();
    const timingFunction = (timePassed) => Math.pow(timePassed, 2);
    animate(timingFunction, scroll.bind(null, window.pageYOffset ,directionDown), 500);
});

addAnchorsHolder(navButtons);