export class CanvasImage {
    constructor() {
        this.src = null;
    }

    setImageSrc(src) {
        this.src = src;
    };

    clearImage() {
        this.src = null;
    };
}