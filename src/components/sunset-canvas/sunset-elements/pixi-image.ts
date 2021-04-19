import { Drawable } from "../../../model/drawable";

export class PixiImage implements Drawable {
    private image = new Image();
    private x: number = 0;
    private y: number = 0;
    public width: number = 0;
    public height: number = 0;
    private ratio: number = 1;
    public hasLoaded: boolean = false;
    
    constructor(
        private imagePath: string,
    ) {
        this.loadImage();
    }

    private loadImage() {
        this.image.onload = () => {
            this.hasLoaded = true;
            this.ratio = this.image.height / this.image.width;
            this.setSize({width: this.image.width, height: this.image.height})
        }
        this.image.src = this.imagePath;
    }

    public setSize(size: {width?: number, height?: number}) {
        if (size.width == null) {
            this.height = size.height ?? 0;
            this.width = size.height ?? 0 / this.ratio;
        }
        else if (size.height == null) {
            this.width = size.width ?? 0;
            this.height = size.width * this.ratio;
        }
        else {
            this.width = size.width;
            this.height = size.height;
        }
    }

    public setPosition(x: number, y: number, center: boolean = false) {
        this.x = x - (center ? this.width / 2 : 0);
        this.y = y - (center ? this.height / 2 : 0);
    }

    public draw(context: CanvasRenderingContext2D) {
        if (this.hasLoaded === false) return;
        context.drawImage(
            this.image,
            Math.floor(this.x),
            Math.floor(this.y),
            Math.floor(this.width),
            Math.floor(this.height),
        )
    };
}