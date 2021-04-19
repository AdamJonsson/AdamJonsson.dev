import { Coordinates } from "../../../model/coordinates";
import { SunsetTime } from "./sunset-time";
import * as PIXI from 'pixi.js';
import { PixiHelper } from "../../pixi/pixi-canvas";

export class CelestialBody {
    constructor(
        public sunsetTime: SunsetTime,
        public startAngel: number,
    ){}

    public getCoordinates(app: PIXI.Application): Coordinates {
        const dimensions = PixiHelper.getDimensions(app);
        const orbitalRadius = dimensions.width * 0.35;
        var centerX = dimensions.width / 2;
        var centerY = dimensions.height * 0.9;
        var angle = Math.PI * 2 * this.sunsetTime.currentTime + Math.PI / 2 + this.startAngel;
        var sinFactor =  Math.sin(angle);
        var cosFactor =  Math.cos(angle);
        return new Coordinates(
            centerX + cosFactor * orbitalRadius,
            centerY + sinFactor * orbitalRadius,
        );
    }
}