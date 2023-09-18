import {colors} from "./colors.js";

const colorsList = document.querySelector('.colors-list');

const setupColorsList = () => {
    colors.forEach((item, index) => {
        const li = document.createElement('li');
        li.classList.add(`color-item`);
        li.setAttribute('data-color', item.color)
        li.style.backgroundColor = item.color;
        colorsList.appendChild(li)
    })
}
const changeActiveColor = () => {
    const colorsItems = document.querySelectorAll('.color-item');
    console.log(colorsItems)
}
const initColors = () => {
    setupColorsList()
    changeActiveColor()
}
initColors()