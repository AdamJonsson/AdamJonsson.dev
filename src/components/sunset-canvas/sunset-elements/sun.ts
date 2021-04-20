import { PixiDrawable, PixiHelper } from "../../pixi/pixi-canvas";
import { CelestialBody } from "./celestial-body";
import { SunRay } from "./sun-ray";
import { SunsetTime } from "./sunset-time";
import sunTextureImage from "../../../assets/sunset/landscape/sun.png";
import sunrayTextureImage from "../../../assets/sunset/landscape/sunray.png";
import * as PIXI from 'pixi.js';
export class Sun extends PixiDrawable {
    public body: CelestialBody;
    public sunRays: SunRay[] = [];
    private sunSprite: PIXI.Sprite | null = null;
    constructor(public sunsetTime: SunsetTime) {
        super();
        this.body = new CelestialBody(sunsetTime, 0);
    }

    public draw () {
        if (this.sunSprite == null) return;
        const scale = PixiHelper.getMainScaleRef(this.app!);
        var bodyPos = this.body.getCoordinates(this.app!);
        this.sunSprite.x = bodyPos.x;
        this.sunSprite.y = bodyPos.y;
        this.sunSprite.anchor.set(0.5, 0.5);
        this.sunSprite.width = scale * 0.05;
        this.sunSprite.height = scale * 0.05;
        this.drawSunRays();
    };

    public onAttachApp(): void {
        const sunTexture = PixiHelper.getTexture(sunTextureImage, this.app!);
        const sunrayTexture = PixiHelper.getTexture(sunrayTextureImage, this.app!);
        this.sunSprite = new PIXI.Sprite(sunTexture);
        this.app?.stage.addChild(this.sunSprite);

        const numOfSunRays = 40;
        const sunrayContainer = new PIXI.ParticleContainer(numOfSunRays, {
            scale: true,
            position: true,
            rotation: true,
            uvs: true,
            alpha: true
        });
        for (let index = 0; index < numOfSunRays; index++) {
            this.sunRays.push(new SunRay(this.sunsetTime, this.app!, sunrayContainer, sunrayTexture));
        }
        this.app?.stage.addChild(sunrayContainer);
    }

    public textures(): string[] {
        return [
            sunTextureImage,
            sunrayTextureImage
        ];
    }

    public drawSunRays() {
        const coordinates = this.body.getCoordinates(this.app!);
        this.sunRays.forEach(sunRay => {
            sunRay.draw(coordinates);
        });
    }
}