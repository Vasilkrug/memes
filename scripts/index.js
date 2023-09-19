import {colors} from "./colors.js";
import {CanvasText} from "./text.js";
import {CanvasImage} from "./image.js";

const colorsList = document.querySelector('.colors-list');
const uploadImgBtn = document.querySelector('.upload-img');
const addTextBtn = document.querySelector('.add-text');
const textInput = document.querySelector('.input-meme-text');
const canvas = document.getElementById('canvas');
const context = canvas.getContext("2d");

const canvasText = new CanvasText(canvas);
const canvasImage = new CanvasImage()

const createImg = (src) => {
    const image = document.createElement('img');
    image.setAttribute('src', src);
    return image;
};

uploadImgBtn.addEventListener('change', () => {
    const src = URL.createObjectURL(uploadImgBtn.files[0]);
    canvasImage.setImageSrc(src)
    const image = createImg(canvasImage.src)
    image.onload = () => context.drawImage(image, 0, 0, 900, 700);
    uploadImgBtn.value = '';
});

const setupColorsList = () => {
    colors.forEach((item, index) => {
        const li = document.createElement('li');
        li.classList.add(`color-item`);
        li.setAttribute('data-color', item.color)
        li.style.backgroundColor = item.color;
        colorsList.appendChild(li);
    });
};

const changeActiveColor = () => {
    const colorsItems = document.querySelectorAll('.color-item');
};

const initColors = () => {
    setupColorsList();
    changeActiveColor();
};

initColors();


const draw = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    const src = canvasImage.src;
    const image = createImg(src);
    context.drawImage(image, 0, 0, 900, 700);
    for (let i = 0; i < canvasText.texts.length; i++) {
        let text = canvasText.texts[i];
        context.fillText(text.text, text.x, text.y);
    }
}


canvas.onmousedown = (function (e) {
    canvasText.handleMouseDown(e);
});
canvas.onmousemove = (function (e) {
    canvasText.handleMouseMove(e);
    draw()
});
canvas.onmouseup = (function (e) {
    canvasText.handleMouseUp(e);
});
canvas.onmouseout = (function (e) {
    canvasText.handleMouseOut(e);
});

addTextBtn.addEventListener('click', () => {
    const value = textInput.value;
    let y = canvasText.texts.length * 20 + 20;

    let text = {
        text: value,
        x: 20,
        y: y
    };

    context.font = "16px verdana";
    context.strokeStyle = "red";
    text.width = context.measureText(text.text).width;
    text.height = 16;
    canvasText.addNewText(text)
    draw();
})


