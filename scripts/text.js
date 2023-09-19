export class CanvasText {
    constructor(canvas) {
        this.offsetX = canvas.offsetLeft;
        this.offsetY = canvas.offsetTop;
        this.startX = null;
        this.startY = null;
        this.texts = [];
        this.selectedText = -1;
    }

    addNewText(text) {
        this.texts.push(text)
    }

    textHittest(x, y, textIndex) {
        let text = this.texts[textIndex];
        return (x >= text.x && x <= text.x + text.width && y >= text.y - text.height && y <= text.y);
    };

    handleMouseDown(e) {
        e.preventDefault();
        this.startX = Number(e.clientX - this.offsetX);
        this.startY = Number(e.clientY - this.offsetY);

        for (let i = 0; i < this.texts.length; i++) {
            if (this.textHittest(this.startX, this.startY, i)) {
                this.selectedText = i;
            }
        }
    };

    handleMouseUp(e) {
        e.preventDefault();
        this.selectedText = -1;
    }

    handleMouseOut(e) {
        e.preventDefault();
        this.selectedText = -1;
    }

    handleMouseMove(e) {
        if (this.selectedText < 0) {
            return;
        }
        e.preventDefault();
        let mouseX = Number(e.clientX - this.offsetX);
        let mouseY = Number(e.clientY - this.offsetY);

        let dx = mouseX - this.startX;
        let dy = mouseY - this.startY;
        this.startX = mouseX;
        this.startY = mouseY;

        let text = this.texts[this.selectedText];
        text.x += dx;
        text.y += dy;
    }
}