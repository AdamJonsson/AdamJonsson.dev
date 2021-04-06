import { Color } from "../../../model/color";
import { Coordinates } from "../../../model/coordinates";
import { Drawable } from "../../../model/drawable";
import { CelestialBody } from "./celestial-body";
import { ColorHelper } from "./color-helper";
import { SunRay } from "./sun-ray";
import { SunsetTime } from "./sunset-time";

export class GroundLayer implements Drawable {
    public image = new Image();
    private imageIsLoaded = false;
    constructor(public sunsetTime: SunsetTime, public pathOfImage: string,) {
        this.loadImage();
    }

    private loadImage() {
        this.image.onload = () => {
            this.imageIsLoaded = true;
        };
        console.log(this.pathOfImage);
        this.image.src = this.pathOfImage;
    }

    private createOverlayColor() {
        const sunsetColor = ColorHelper.getColorFromTime(this.sunsetTime.currentTime + 0.03);
        const lightness = 0.5;
        const highlight = 0.9;
        return new Color(
            sunsetColor.r * lightness,
            sunsetColor.g * lightness,
            sunsetColor.b * lightness,
            highlight,
        )
    }

    public draw (context: CanvasRenderingContext2D) {
        console.log(this.image);
        if (!this.imageIsLoaded) return;
        const imageRatio = this.image.height / this.image.width;
        const imageWidth = context.canvas.width;
        const imageHeight = imageWidth * imageRatio;
        const imageStartX = 0;
        const imageStartY = context.canvas.height - imageHeight;
        const color = this.createOverlayColor();

        context.drawImage(
            this.image, 
            imageStartX, 
            imageStartY, 
            imageWidth, 
            imageHeight
        );

        context.globalCompositeOperation = "source-atop";
        context.fillStyle = color.toString();
        context.fillRect(imageStartX, imageStartY, imageWidth, imageHeight);
        context.globalCompositeOperation = "source-over";
    };

}