import { Drawable } from "../../../model/drawable";
import { SunsetTime } from "./sunset-time";
import tree1 from "../../../assets/sunset/landscape/tree1.png";
import tree2 from "../../../assets/sunset/landscape/tree2.png";
import tree3 from "../../../assets/sunset/landscape/tree3.png";
import tree4 from "../../../assets/sunset/landscape/tree4.png";
import tree5 from "../../../assets/sunset/landscape/tree5.png";
import * as PIXI from 'pixi.js';
import { PixiHelper } from "../../pixi/pixi-canvas";
export class Tree {
    private currentWaveAmount = Math.random() * 2;
    public scrollOffset: number = 0;
    private treeSprite: PIXI.Sprite;
    constructor(
        private app: PIXI.Application,
        private xPos: number,
        private yPos: number,
        private width: number,
        private height: number,
        private waveSpeed: number,
        public sunsetTime: SunsetTime,
    ) {
        const texture = this.app.loader.resources[this.chooseRandomTreeTexture()].texture!;
        this.treeSprite = new PIXI.Sprite(texture);
        this.app.stage.addChild(this.treeSprite);
    }

    private chooseRandomTreeTexture() {
        const options = [tree1, tree2, tree3, tree4, tree5];
        const randomIndex = Math.floor(options.length * Math.random()); 
        return options[randomIndex];
    }

    private updateWaveAmount() {
        this.currentWaveAmount += this.waveSpeed * this.app!.ticker.deltaMS;
        if (this.currentWaveAmount > 2) this.currentWaveAmount = 0;
    }

    public draw (scrollOffset: number, tint: number) {
        this.updateWaveAmount();
        const scaleFactor = PixiHelper.getMainScaleRef(this.app);
        const dimensions = PixiHelper.getDimensions(this.app);
        const width = this.width * scaleFactor; 
        const height = this.height * scaleFactor; 
        const x = this.xPos * scaleFactor;
        const y = dimensions.height + this.yPos * scaleFactor - scrollOffset;
        const rotation = Math.PI * Math.sin(Math.PI * this.currentWaveAmount) * 0.03; 
        this.treeSprite.rotation = rotation;
        this.treeSprite.anchor.set(0.5, 1);
        this.treeSprite.x = x;
        this.treeSprite.y = y;
        this.treeSprite.tint = tint;
        this.treeSprite.width = width;
        this.treeSprite.height = height;
    };



}