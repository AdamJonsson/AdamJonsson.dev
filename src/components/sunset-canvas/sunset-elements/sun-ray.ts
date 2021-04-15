import { Color } from "../../../model/color";
import { Coordinates } from "../../../model/coordinates";
import { SunsetTime } from "./sunset-time";

export class SunRay{
    public currentAngel: number;
    public angelSpeed: number;

    constructor(
        public sunTime: SunsetTime
    ){
        this.currentAngel = Math.random() * Math.PI * 2;
        this.angelSpeed = (0.5 - Math.random()) * Math.PI * 2 * 0.001;
    }

    public draw(context: CanvasRenderingContext2D, bodyPos: Coordinates) {
        this.currentAngel += this.angelSpeed;
        
        const length = context.canvas.width * 0.6;
        const width = Math.PI / 10;
        const rayStarAngle = this.currentAngel - width;
        const rayEndAngle = this.currentAngel + width;
        const rayStartPos = this.getPosFromAngle(bodyPos, rayStarAngle, length);
        const rayEndPos = this.getPosFromAngle(bodyPos, rayEndAngle, length);
        const rayGradientEnd = this.getPosFromAngle(bodyPos, this.currentAngel, length);
        var rayColor = context.createLinearGradient(
            bodyPos.x, 
            bodyPos.y, 
            rayGradientEnd.x, 
            rayGradientEnd.y
        );
        
        rayColor.addColorStop(0, new Color(255, 255, 200, 0.05).toString());
        rayColor.addColorStop(0.75, new Color(255, 255, 255, 0).toString());

        context.beginPath();
        context.moveTo(Math.floor(bodyPos.x), Math.floor(bodyPos.y));
        context.lineTo(rayStartPos.x, rayStartPos.y);
        context.lineTo(rayEndPos.x, rayEndPos.y);
        context.lineTo(bodyPos.x, bodyPos.y);
        context.fillStyle = rayColor;
        context.fill();
        context.closePath();
    };

    private getPosFromAngle(bodyPos: Coordinates, angle: number, size: number) {
        return new Coordinates(bodyPos.x + Math.cos(angle) * size, bodyPos.y + Math.sin(angle) * size);
    }
}