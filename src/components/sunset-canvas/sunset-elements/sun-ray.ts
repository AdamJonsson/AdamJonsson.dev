import { Coordinates } from "../../../model/coordinates";
import { SunsetTime } from "./sunset-time";
import * as PIXI from 'pixi.js';
import { PixiHelper } from "../../pixi/pixi-canvas";
export class SunRay{
    public currentAngel: number;
    public angelSpeed: number;
    private sunraySprite: PIXI.Sprite;
    constructor(
        public sunTime: SunsetTime,
        public app: PIXI.Application,
        public container: PIXI.ParticleContainer,
        private sunrayTexture: PIXI.Texture,
    ){
        this.currentAngel = Math.random() * Math.PI * 2;
        this.angelSpeed = (0.5 - Math.random()) * Math.PI * 2 * 0.001;
        this.sunraySprite = new PIXI.Sprite(this.sunrayTexture);
        this.sunraySprite.anchor.set(0.5, 1);
        const scale = PixiHelper.getMainScaleRef(this.app!);
        const length = scale * 0.5;
        this.sunraySprite.width = length * 0.75;
        this.sunraySprite.height = length - length * 0.1 * Math.random();
        this.container.addChild(this.sunraySprite);
    }

    public draw(bodyPos: Coordinates) {
        this.currentAngel += this.angelSpeed * this.app.ticker.deltaTime;
        this.sunraySprite.rotation = this.currentAngel;
        this.sunraySprite.x = bodyPos.x;
        this.sunraySprite.y = bodyPos.y;
    };
}