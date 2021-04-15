import { Drawable } from "../../../model/drawable";
import { ColorTransitions } from "./color-transition";
import { SunsetTime } from "./sunset-time";
import { Tree } from "./tree";
import { CanvasImage } from "./canvas-image";
import { ScrollData } from "./scroll-data";

export interface LandscapeLayerParameters {
    sunsetTime: SunsetTime, 
    pathOfImage: string,
    color: ColorTransitions,
    numberOfTrees: number,
    treeMaxYPos: number,
    treeMinYPos: number,
    treeSize: number,
    scrollData: ScrollData,
    scrollParallaxFactor: number,
}

export class LandscapeLayer implements Drawable {
    public landscapeImage: CanvasImage;
    public trees: Tree[] = [];
    public sunsetTime: SunsetTime;
    public pathOfImage: string;
    public color: ColorTransitions;
    private numberOfTrees: number = 20;
    private treeMaxYPos: number;
    private treeMinYPos: number;
    private treeSize: number;
    private scrollData: ScrollData;
    private scrollParallaxFactor: number;

    constructor(param: LandscapeLayerParameters) {
        this.sunsetTime = param.sunsetTime;
        this.pathOfImage = param.pathOfImage;
        this.color = param.color;
        this.numberOfTrees = param.numberOfTrees;
        this.treeMaxYPos = param.treeMaxYPos;
        this.treeMinYPos = param.treeMinYPos;
        this.treeSize = param.treeSize;
        this.landscapeImage = new CanvasImage(this.pathOfImage);
        this.scrollData = param.scrollData;
        this.scrollParallaxFactor = param.scrollParallaxFactor;
        this.createTrees();
    }

    private createTrees() {
        for (let index = 0; index < this.numberOfTrees; index++) {
            const randXPos = Math.random();
            const width = this.treeSize + Math.random() * this.treeSize * 0.25;
            const height = width * (2 + Math.random());
            this.trees.push(new Tree(
                randXPos,
                this.treeMinYPos + (this.treeMaxYPos - this.treeMinYPos) * Math.random(),
                width,
                height,
                Math.random() * 0.004,
                this.sunsetTime
            ));
        }
    }

    private createOverlayColor() {
        return this.color.getColorFromTime(this.sunsetTime.currentTime);
    }

    private getScrollOffset() {
        return this.scrollData.currentScroll * this.scrollParallaxFactor;
    }

    public draw (context: CanvasRenderingContext2D) {
        if (!this.landscapeImage.hasLoaded) return;
        this.landscapeImage.setSize({width: context.canvas.width});
        this.landscapeImage.setPosition(
            0, 
            context.canvas.height - this.landscapeImage.height - this.getScrollOffset()
        );
        
        this.landscapeImage.draw(context);
        this.drawTrees(context);

        context.fillStyle = "#000000";
        context.fillRect(0, context.canvas.height - this.getScrollOffset() - 1, context.canvas.width, context.canvas.height * 3);
            
        const color = this.createOverlayColor()!;
        context.globalCompositeOperation = "source-atop";
        context.fillStyle = color.toString();
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        context.globalCompositeOperation = "source-over";
    };

    public drawTrees(context: CanvasRenderingContext2D) {
        this.trees.forEach(tree => {
            tree.scrollOffset = this.getScrollOffset();
            tree.draw(context);
        });
    }

}