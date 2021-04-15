import { Color } from "../../../model/color";
import { Coordinates } from "../../../model/coordinates";
import { Drawable } from "../../../model/drawable";
import { CelestialBody } from "./celestial-body";
import { SunsetTime } from "./sunset-time";

export class Moon implements Drawable {
    public body: CelestialBody;
    constructor(public sunsetTime: SunsetTime) {
        this.body = new CelestialBody(sunsetTime, Math.PI);
    }

    public draw (context: CanvasRenderingContext2D) {
        var bodyPos = this.body.getCoordinates(context);
        this.drawMoonLight(context, bodyPos);
        this.drawMoon(context, bodyPos);
    };

    private drawMoon(context: CanvasRenderingContext2D, bodyPos: Coordinates) {
        var sunRadius = context.canvas.width * 0.02;

        context.beginPath();
        var gradient = context.createRadialGradient(
            bodyPos.x, 
            bodyPos.y, 
            sunRadius * 0.5, 
            bodyPos.x,
            bodyPos.y, 
            sunRadius,
        );
        // Add three color stops
        gradient.addColorStop(0, new Color(255, 255, 255, 1).toString());
        gradient.addColorStop(1, new Color(255, 255, 255, 0.5).toString());

        // Set the fill style and draw a rectangle
        context.arc(bodyPos.x, bodyPos.y, sunRadius, 0, 2 * Math.PI, true);
        context.fillStyle = gradient;
        context.fill();
        context.closePath();
    } 

    public drawMoonLight(context: CanvasRenderingContext2D, bodyPos: Coordinates) {
        context.beginPath();
        var lightRadius = context.canvas.width * 0.25;
        var gradient = context.createRadialGradient(
            bodyPos.x, 
            bodyPos.y, 
            0, 
            bodyPos.x,
            bodyPos.y, 
            lightRadius,
        );
        // Add three color stops
        gradient.addColorStop(0, new Color(255, 255, 255, 0.1).toString());
        gradient.addColorStop(1, new Color(255, 255, 255, 0).toString());

        // Set the fill style and draw a rectangle
        context.arc(bodyPos.x, bodyPos.y, lightRadius, 0, 2 * Math.PI, true);
        context.fillStyle = gradient;
        context.fill();
        context.closePath();
    }
}