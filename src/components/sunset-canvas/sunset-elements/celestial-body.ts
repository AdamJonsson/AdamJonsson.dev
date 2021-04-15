import { Coordinates } from "../../../model/coordinates";
import { SunsetTime } from "./sunset-time";

export class CelestialBody {
    constructor(
        public sunsetTime: SunsetTime,
        public startAngel: number,
    ){}

    public getCoordinates(context: CanvasRenderingContext2D): Coordinates {
        const orbitalRadius = context.canvas.width * 0.35;
        var centerX = context.canvas.width / 2;
        var centerY = context.canvas.height * 0.9;
        var angle = Math.PI * 2 * this.sunsetTime.currentTime + Math.PI / 2 + this.startAngel;
        var sinFactor =  Math.sin(angle);
        var cosFactor =  Math.cos(angle);
        return new Coordinates(
            centerX + cosFactor * orbitalRadius,
            centerY + sinFactor * orbitalRadius,
        );
    }
}