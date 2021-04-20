import { Color } from "../../../model/color";
import { Coordinates } from "../../../model/coordinates";
import { Drawable } from "../../../model/drawable";
import { LinearInterpolation } from "../../../model/linear-interpolation";
import { SunsetTime } from "./sunset-time";
import * as PIXI from 'pixi.js';
import { PixiDrawable, PixiHelper } from "../../pixi/pixi-canvas";
import { start } from "node:repl";
import { graphicsUtils } from "pixi.js";

class Star {
    public linesToStars: Star[] = [];
    public linesToStarsGraphics: PIXI.Graphics[] = [];
    private starGraphics: PIXI.Graphics;

    constructor(
        private time: SunsetTime,
        private startAngle: number,
        private radius: number,
        private app: PIXI.Application,
    ){
        this.starGraphics = new PIXI.Graphics();
        const scale = PixiHelper.getMainScaleRef(this.app);
        this.starGraphics.beginFill(0xffffff);
        this.starGraphics.drawCircle(0, 0, scale * 0.0010);
        this.starGraphics.endFill();
        app.stage.addChild(this.starGraphics)
    }

    public pos() {
        const dimensions = PixiHelper.getDimensions(this.app);
        var width = dimensions.width;
        var height = dimensions.height;
        var angle = Math.PI * 2 * this.time.currentTimeNoLoop / 5;
        return new Coordinates(
            this.radius * width * Math.cos(angle + this.startAngle) + width / 2,
            this.radius * width * Math.sin(angle + this.startAngle) + height,
        );
    }

    public draw(opacity: number) {
        if (!this.shouldRender()) return;
        const pos = this.pos();
        this.starGraphics.x = pos.x;
        this.starGraphics.y = pos.y;
        this.starGraphics.alpha = opacity;
        this.drawLinesToStars(opacity);
    }

    private drawLinesToStars(opacity: number) {
        const starFromPos = this.pos();
        const scale = PixiHelper.getMainScaleRef(this.app);
        for (let index = 0; index < this.linesToStars.length; index++) {
            const starTo = this.linesToStars[index];
            const graphic = this.linesToStarsGraphics[index];
            graphic.visible = opacity != 0;
            
            if (opacity == 0) {
                return;
            }

            const starToPos = starTo.pos();
            graphic.clear()
                .lineStyle(scale * 0.001, 0xFFFFFF)
                .moveTo(starFromPos.x, starFromPos.y)
                .lineTo(starToPos.x, starToPos.y);
            graphic.alpha = Math.min(0.1, opacity);
        }
    }

    public createLinesToStars(stars: Star[]) {
        this.linesToStars = stars;
        for (let index = 0; index < stars.length; index++) {
            const lineGraphic = new PIXI.Graphics(new PIXI.GraphicsGeometry());
            this.app.stage.addChild(lineGraphic);
            this.linesToStarsGraphics.push(lineGraphic);
        }
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
        return [];
    }

    private createStars() {
        const numberOfStars = 400;
        for (let index = 0; index < numberOfStars; index++) {
            this.stars.push(
                new Star(
                    this.sunsetTime,
                    Math.random() * Math.PI * 2,
                    1 - Math.pow(Math.random(), 2),
                    this.app!,
                )
            );
        }
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