import { Coordinates } from "../../../model/coordinates";
import { LinearInterpolation } from "../../../model/linear-interpolation";
import { SunsetTime } from "./sunset-time";
import * as PIXI from 'pixi.js';
import { PixiDrawable, PixiHelper } from "../../pixi/pixi-canvas";
import starTextureImage from "../../../assets/sunset/landscape/star.png";

class Star {
    public linesToStarsGraphics: PIXI.Graphics[] = [];
    private starSprite: PIXI.Sprite;
    public maxOpacity: number;

    constructor(
        private time: SunsetTime,
        private startAngle: number,
        private radius: number,
        starTexture: PIXI.Texture,
        container: PIXI.ParticleContainer,
        private app: PIXI.Application,
    ){
        this.starSprite = new PIXI.Sprite(starTexture);
        const scale = PixiHelper.getMainScaleRef(this.app);
        const size = scale * 0.002;
        this.starSprite.width = size;
        this.starSprite.height = size;
        this.maxOpacity = 0.25 + 0.75 * Math.random();
        container.addChild(this.starSprite)
    }

    public pos() {
        const dimensions = PixiHelper.getDimensions(this.app);
        var width = dimensions.width;
        var height = dimensions.height;
        var maxRadius = (Math.max(width, height)) * 1.2;
        var angle = Math.PI * 2 * this.time.currentTimeNoLoop / 5;
        return new Coordinates(
            this.radius * maxRadius * Math.cos(angle + this.startAngle) + width / 2,
            this.radius * maxRadius * Math.sin(angle + this.startAngle) + height,
        );
    }

    public draw(opacity: number) {
        if (!this.shouldRender()) return;
        const pos = this.pos();
        this.starSprite.x = pos.x;
        this.starSprite.y = pos.y;
        this.starSprite.alpha = Math.min(opacity, this.maxOpacity);
    }


    public getFactorPos() {
        return new Coordinates(
            this.radius * Math.cos(this.startAngle),
            this.radius * Math.sin(this.startAngle),
        );
    }

    public shouldRender() {
        const dimensions = PixiHelper.getDimensions(this.app);
        var pos = this.pos();
        if (pos.x > dimensions.width) return false;
        if (pos.x < -dimensions.width / 6) return false;
        if (pos.y > dimensions.height) return false;
        if (pos.y < -dimensions.height / 6) return false;
        return true;
    }
}

export class Stars extends PixiDrawable{
    private stars: Star[] = [];

    constructor(public sunsetTime: SunsetTime) {
        super();
    }

    public onAttachApp(): void {
        this.createStars();
    }

    public textures(): string[] {
        return [
            starTextureImage,
        ];
    }

    private createStars() {
        const starTexture = PixiHelper.getTexture(starTextureImage, this.app!);
        const numberOfStars = 1000;
        const starContainer = new PIXI.ParticleContainer(numberOfStars, {
            scale: true,
            position: true,
            alpha: true,
            rotation: false,
            tint: false
        });
        for (let index = 0; index < numberOfStars; index++) {
            this.stars.push(
                new Star(
                    this.sunsetTime,
                    Math.random() * Math.PI * 2,
                    1 - Math.pow(Math.random(), 2),
                    starTexture,
                    starContainer,
                    this.app!,
                )
            );
        }
        this.app!.stage.addChild(starContainer);
    }

    public draw() {
        this.drawAllStars();
    };

    private getOpacity() {
        if (this.sunsetTime.currentTime > 0 && this.sunsetTime.currentTime <= 0.2)
            return 1;
        if (this.sunsetTime.currentTime > 0.2 && this.sunsetTime.currentTime < 0.3)
            return LinearInterpolation.calculate(
                1, 
                0, 
                (this.sunsetTime.currentTime - 0.2) / 0.1
            );
            
        if (this.sunsetTime.currentTime > 0.8 && this.sunsetTime.currentTime < 1)
            return 1;

        if (this.sunsetTime.currentTime > 0.7 && this.sunsetTime.currentTime < 0.8)
            return LinearInterpolation.calculate(
                0, 
                1, 
                (this.sunsetTime.currentTime - 0.7) / 0.1
            );

        return 0;
    }

    private drawAllStars() {
        for (let index = 0; index < this.stars.length; index++) {
            const star = this.stars[index];
            star.draw(this.getOpacity());
        }
    }

}