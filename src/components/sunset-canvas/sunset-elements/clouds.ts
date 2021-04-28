import { PixiDrawable, PixiHelper } from "../../pixi/pixi-canvas";

import cloud1TextureImage from "../../../assets/sunset/clouds/cloud1.png";
import cloud2TextureImage from "../../../assets/sunset/clouds/cloud2.png";
import cloud3TextureImage from "../../../assets/sunset/clouds/cloud3.png";
import cloud4TextureImage from "../../../assets/sunset/clouds/cloud4.png";
import * as PIXI from 'pixi.js';
import { SunsetTime } from "./sunset-time";

class Cloud {
    public x = 0;
    public y = 0;
    public vx = 0;
    private alpha = 0.2;
    
    constructor(
        private sprite: PIXI.Sprite,
        private time: SunsetTime,
    ) {
        this.vx = Math.random() + 2;
    }

    public setPosAndSize(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.sprite.width = width;
        this.sprite.height = height;
        this.sprite.scale.set(
            Math.min(this.sprite.scale.y, this.sprite.scale.x)
        );
    }

    public update(app: PIXI.Application) {
        this.setAlphaValue();
        const dimensions = PixiHelper.getDimensions(app);
        this.x -= dimensions.width * 0.00005 * this.vx * app.ticker.deltaTime;
        if (this.x < -this.sprite.width) {
            this.x = dimensions.width;
        }

        this.sprite.alpha = this.alpha;
        this.sprite.x = this.x;
        this.sprite.y = this.y + Math.sin(this.x / dimensions.width * 16 * Math.PI) * dimensions.height * 0.02;
    }

    private setAlphaValue() {
        const transitionSpeed = 0.01;
        if (this.time.currentTime < 0.3 || this.time.currentTime > 0.7) {
            if (this.alpha > 0.2) this.alpha -= transitionSpeed;
            return;
        }

        if (this.alpha < 0.5) this.alpha += transitionSpeed;
    }

}

export class Clouds extends PixiDrawable {
    private cloudSprites: Cloud[] = [];

    constructor(
        private sunsetTime: SunsetTime,
    ) {
        super();
    }

    private cloudTexture = [
        cloud1TextureImage,
        cloud2TextureImage,
        cloud3TextureImage,
        cloud4TextureImage,
    ]
    
    public onAttachApp(): void {
        const numOfClouds = 6;

        for (let index = 0; index < numOfClouds; index++) {
            const sprite = new PIXI.Sprite(this.getRandomCloudTexture()); 
            const newCloud = new Cloud(sprite, this.sunsetTime);
            this.setRandomStartPosAndSize(newCloud);
            this.cloudSprites.push(newCloud);
            this.app?.stage.addChild(sprite);
        }
    }
    
    private setRandomStartPosAndSize(cloud: Cloud) {
        const dimensions = PixiHelper.getDimensions(this.app!);
        const scale = PixiHelper.getMainScaleRef(this.app!);
        const randomSize = scale * (0.15 + Math.random() * 0.05);
        cloud.setPosAndSize(
            dimensions.width * Math.random(),
            dimensions.height * Math.random() * 0.75,
            randomSize,
            randomSize,
        );
    }

    private getRandomCloudTexture() {
        const randomIndex = Math.floor(this.cloudTexture.length * Math.random() );
        const randomTextureImage = this.cloudTexture[randomIndex];
        return this.app!.loader.resources[randomTextureImage].texture!;
    }

    public textures(): string[] {
        return this.cloudTexture;
    }

    public draw(): void {
        this.moveClouds();
    }

    private moveClouds() {
        this.cloudSprites.forEach(cloud => {
            cloud.update(this.app!);
        });
    }

}