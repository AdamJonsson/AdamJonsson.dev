import { Drawable } from "../../../model/drawable";
import nameImage from "../../../assets/sunset/name.png";
import { CanvasImage } from "./canvas-image";
import { ScrollData } from "./scroll-data";

export class Name implements Drawable {
    private image: CanvasImage;
    constructor(
        private scrollData: ScrollData
    ) {
        this.image = new CanvasImage(nameImage);
    }
    public draw (context: CanvasRenderingContext2D) {
        if (!this.image.hasLoaded) return;
        this.image.setSize({width: context.canvas.width * 0.3})
        this.image.setPosition(
            context.canvas.width / 2, 
            context.canvas.height / 2 - this.scrollData.currentScroll * 0.2, 
            true
        );
        this.image.draw(context);
    };

}