import { Drawable } from "../../../model/drawable";
import { SunsetTime } from "./sunset-time";
import tree1 from "../../../assets/sunset/landscape/tree1.png";
import tree2 from "../../../assets/sunset/landscape/tree2.png";
import tree3 from "../../../assets/sunset/landscape/tree3.png";
import tree4 from "../../../assets/sunset/landscape/tree4.png";
import tree5 from "../../../assets/sunset/landscape/tree5.png";

export class Tree implements Drawable {
    private image = new Image();
    private imageIsLoaded = false;
    private currentWaveAmount = Math.random() * 2;
    public scrollOffset: number = 0;
    constructor(
        private xPos: number,
        private yPos: number,
        private width: number,
        private height: number,
        private waveSpeed: number,
        public sunsetTime: SunsetTime, 
    ) {
        this.loadImage();
    }

    private chooseRandomTreeTexture() {
        const options = [tree1, tree2, tree3, tree4, tree5];
        const randomIndex = Math.floor(options.length * Math.random()); 
        return options[randomIndex];
    }

    private loadImage() {
        this.image.onload = () => {
            this.imageIsLoaded = true;
        };
        this.image.src = this.chooseRandomTreeTexture();
    }

    private updateWaveAmount() {
        this.currentWaveAmount += this.waveSpeed;
        if (this.currentWaveAmount > 2) this.currentWaveAmount = 0;
    }

    public draw (context: CanvasRenderingContext2D) {
        this.updateWaveAmount();
        if (!this.imageIsLoaded) return;
        const scaleFactor = context.canvas.width;
        const width = this.width * scaleFactor; 
        const height = this.height * scaleFactor; 
        const x = this.xPos * scaleFactor;
        const y = this.yPos * scaleFactor + context.canvas.height - height - this.scrollOffset;
        const rotation = Math.PI * Math.sin(Math.PI * this.currentWaveAmount) * 0.03; 
        context.save();
        context.translate(x + width / 2, y + height);
        context.rotate(rotation);
        context.drawImage(
            this.image, 
            -width / 2, 
            -height, 
            width, 
            height
        );
        context.restore();
    };



}