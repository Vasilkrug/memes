import {colors} from "./colors.js";
import {CanvasText} from "./text.js";
import {CanvasImage} from "./image.js";
import {createImg} from "./utils.js";

const colorsList = document.querySelector('.colors-list');
const uploadImgBtn = document.querySelector('.upload-img');
const addTextBtn = document.querySelector('.add-text');
const textInput = document.querySelector('.input-meme-text');
const fontSizeCount = document.querySelector('.font-size-count');
const controlBtns = document.querySelectorAll('.control-btn');
const downloadButton = document.querySelector('.save-meme');
const newMemeBtn = document.querySelector('.new-meme');
const canvas = document.getElementById('canvas');
const context = canvas.getContext("2d");

const canvasText = new CanvasText(canvas);
const canvasImage = new CanvasImage();

const uploadImage = () => {
    uploadImgBtn.addEventListener('change', () => {
        const src = URL.createObjectURL(uploadImgBtn.files[0]);
        canvasImage.setImageSrc(src);
        const image = createImg(canvasImage.src);
        image.onload = () => context.drawImage(image, 0, 0, 900, 700);
        uploadImgBtn.value = '';
    });
};

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
    colorsItems.forEach(item => {
        item.addEventListener('click', () => {
            const color = item.dataset.color;
            for (let text of canvasText.texts) {
                context.fillStyle = color;
                context.fillText(text.text, text.x, text.y);
                draw();
            }
        })
    })
};

const initColors = () => {
    setupColorsList();
    changeActiveColor();
};

const fontSizeCountDraw = () => {
    fontSizeCount.innerHTML = canvasText.fontSize;
};

const draw = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    const src = canvasImage.src;
    if (src) {
        const image = createImg(src);
        context.drawImage(image, 0, 0, 900, 700);
    }

    for (let i = 0; i < canvasText.texts.length; i++) {
        let text = canvasText.texts[i];
        context.fillText(text.text, text.x, text.y);
    }
};

const fontSizeToggle = () => {
    controlBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.dataset.type;
            if (type === 'plus') {
                canvasText.increaseFontSize();
            } else {
                canvasText.decreaseFontSize();
            }
            for (let text of canvasText.texts) {
                context.font = `${canvasText.fontSize}px Impact`;
                context.fillText(text.text, text.x, text.y);
                draw();
            }
            fontSizeCountDraw();
        })
    });
}

const downloadMeme = () => {
    downloadButton.addEventListener('click', () => {
        downloadButton.href = canvas.toDataURL("image/jpeg");
        downloadButton.download = "meme.jpg";
    });
};

const createNewMeme = () => {
    newMemeBtn.addEventListener('click', () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        canvasImage.clearImage();
        canvasText.clearText();
    });
};

const canvasListeners = () => {
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
}

const addText = () => {
    addTextBtn.addEventListener('click', () => {
        const value = textInput.value;
        let y = canvasText.texts.length * 50 + 50;

        let text = {
            text: value,
            x: 20,
            y: y
        };

        context.font = `${canvasText.fontSize}px Impact`;
        text.width = context.measureText(text.text).width;
        text.height = 40;
        canvasText.addNewText(text)
        draw();
        textInput.value = '';
    });
}
const app = () => {
    uploadImage();
    fontSizeToggle();
    downloadMeme();
    createNewMeme();
    canvasListeners();
    addText();
    initColors();
    fontSizeCountDraw();
};

app();