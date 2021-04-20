import { ColorTransitions } from "./color-transition";
import { SunsetTime } from "./sunset-time";
import { Tree } from "./tree";
import { ScrollData } from "./scroll-data";
import { PixiDrawable, PixiHelper } from "../../pixi/pixi-canvas";
import * as PIXI from 'pixi.js';

import tree1 from "../../../assets/sunset/landscape/tree1.png";
import tree2 from "../../../assets/sunset/landscape/tree2.png";
import tree3 from "../../../assets/sunset/landscape/tree3.png";
import tree4 from "../../../assets/sunset/landscape/tree4.png";
import tree5 from "../../../assets/sunset/landscape/tree5.png";
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
    coverBelow?: boolean,
}

export class LandscapeLayer extends PixiDrawable {

    public landscapeSprite: PIXI.Sprite | null = null;
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
    private coverBelow: boolean;
    private coverSprite: PIXI.Sprite | null = null;

    constructor(param: LandscapeLayerParameters) {
        super();
        this.sunsetTime = param.sunsetTime;
        this.pathOfImage = param.pathOfImage;
        this.color = param.color;
        this.numberOfTrees = param.numberOfTrees;
        this.treeMaxYPos = param.treeMaxYPos;
        this.treeMinYPos = param.treeMinYPos;
        this.treeSize = param.treeSize;
        this.scrollData = param.scrollData;
        this.scrollParallaxFactor = param.scrollParallaxFactor;
        this.coverBelow = param.coverBelow ?? false;
    }

    public onAttachApp(): void {
        this.createTrees();
        const landscapeTexture = this.app!.loader.resources[this.pathOfImage].texture!;
        this.landscapeSprite = new PIXI.Sprite(landscapeTexture);
        this.app!.stage.addChild(this.landscapeSprite);
        
        if (this.coverBelow) {
            this.coverSprite = new PIXI.Sprite(PIXI.Texture.WHITE);
            this.app!.stage.addChild(this.coverSprite);
        }
    }
    public textures(): string[] {
        return [
            this.pathOfImage,
            tree1,
            tree2,
            tree3,
            tree4,
            tree5,
        ]
    }

    private createTrees() {
        for (let index = 0; index < this.numberOfTrees; index++) {
            const randXPos = Math.random();
            const width = this.treeSize + Math.random() * this.treeSize * 0.25;
            const height = width * (2 + Math.random());
            this.trees.push(new Tree(
                this.app!,
                randXPos,
                this.treeMinYPos + (this.treeMaxYPos - this.treeMinYPos) * Math.random(),
                width,
                height,
                0.0001 + Math.random() * 0.0002,
                this.sunsetTime
            ));
        }
    }

    private getScrollOffset() {
        return this.scrollData.currentScroll * this.scrollParallaxFactor;
    }

    public draw() {
        if (this.landscapeSprite == null) return;
        const dimensions = PixiHelper.getDimensions(this.app!);
        const scrollOffset = this.getScrollOffset();

        this.landscapeSprite.width = dimensions.width;
        this.landscapeSprite.anchor.set(0, 1);
        this.landscapeSprite.y = dimensions.height - scrollOffset;
        this.landscapeSprite.tint = this.color.getColorFromTime(this.sunsetTime.currentTime)!.tintColor();
        this.landscapeSprite.scale.set(
            this.landscapeSprite.scale.x,
        );

        if (this.coverSprite != null) {
            this.coverSprite!.x = 0;
            this.coverSprite!.y = dimensions.height - scrollOffset;
            this.coverSprite!.width = dimensions.width;
            this.coverSprite!.height = dimensions.height;
            this.coverSprite!.tint = this.landscapeSprite.tint;
        }

        this.drawTrees(this.landscapeSprite.tint);
    };

    public drawTrees(tint: number) {
        const scrollOffset = this.getScrollOffset();
        this.trees.forEach(tree => {
            tree.draw(scrollOffset, tint);
        });
    }

}