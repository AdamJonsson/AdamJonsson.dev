import { PixiDrawable, PixiHelper } from "../../pixi/pixi-canvas";
import { CelestialBody } from "./celestial-body";
import { SunsetTime } from "./sunset-time";
import moonTextureImage from "../../../assets/sunset/landscape/moon.png";
import * as PIXI from 'pixi.js';

export class Moon extends PixiDrawable {
    public body: CelestialBody;
    private moonSprite: PIXI.Sprite | null = null;
    constructor(public sunsetTime: SunsetTime) {
        super();
        this.body = new CelestialBody(sunsetTime, Math.PI);
    }
    
    public onAttachApp(): void {
        const moonTexture =  PixiHelper.getTexture(moonTextureImage, this.app!);
        this.moonSprite = new PIXI.Sprite(moonTexture);
        this.app?.stage.addChild(this.moonSprite);
    }

    public textures(): string[] {
        return [
            moonTextureImage
        ];
    }

    public draw () {
        if (this.moonSprite == null) return;
        const dimensions = PixiHelper.getMainScaleRef(this.app!);
        var bodyPos = this.body.getCoordinates(this.app!);
        this.moonSprite.x = bodyPos.x;
        this.moonSprite.y = bodyPos.y;
        this.moonSprite.anchor.set(0.5, 0.5);
        this.moonSprite.width = dimensions * 0.25;
        this.moonSprite.height = dimensions * 0.25;
    };
}