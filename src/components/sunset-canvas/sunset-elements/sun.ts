import { Color } from "../../../model/color";
import { Coordinates } from "../../../model/coordinates";
import { Drawable } from "../../../model/drawable";
import { CelestialBody } from "./celestial-body";
import { SunRay } from "./sun-ray";
import { SunsetTime } from "./sunset-time";

export class Sun implements Drawable {
    public body: CelestialBody;
    public sunRays: SunRay[] = [];
    constructor(public sunsetTime: SunsetTime) {
        this.body = new CelestialBody(sunsetTime, 0);
        for (let index = 0; index < 25; index++) {
            this.sunRays.push(new SunRay(sunsetTime));
        }
    }

    public draw (context: CanvasRenderingContext2D) {
        var bodyPos = this.body.getCoordinates(context);
        this.drawSunRays(context, bodyPos);
        this.drawSun(context, bodyPos);
    };

    private drawSun(context: CanvasRenderingContext2D, bodyPos: Coordinates) {
        var sunRadius = context.canvas.width * 0.025;

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
        gradient.addColorStop(1, new Color(200, 200, 200, 1).toString());

        // Set the fill style and draw a rectangle
        context.arc(bodyPos.x, bodyPos.y, sunRadius, 0, 2 * Math.PI, true);
        context.fillStyle = gradient;
        context.fill();
        context.closePath();
    } 

    public drawSunRays(context: CanvasRenderingContext2D, bodyPos: Coordinates) {
        this.sunRays.forEach(sunRay => {
            sunRay.draw(context, bodyPos);
        });
    }
}