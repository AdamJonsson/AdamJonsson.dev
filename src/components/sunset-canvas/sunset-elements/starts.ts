import { Color } from "../../../model/color";
import { Coordinates } from "../../../model/coordinates";
import { Drawable } from "../../../model/drawable";
import { LinearInterpolation } from "../../../model/linear-interpolation";
import { SunsetTime } from "./sunset-time";

class Star {
    public linesToStars: Star[] = [];

    constructor(
        private time: SunsetTime,
        private startAngle: number,
        private radius: number,
    ){}

    public pos(context: CanvasRenderingContext2D) {
        var width = context.canvas.width;
        var height = context.canvas.height;
        var angle = Math.PI * 2 * this.time.currentTimeNoLoop / 5;
        return new Coordinates(
            this.radius * width * Math.cos(angle + this.startAngle) + width / 2,
            this.radius * width * Math.sin(angle + this.startAngle) + height,
        );
    }

    public getFactorPos() {
        return new Coordinates(
            this.radius * Math.cos(this.startAngle),
            this.radius * Math.sin(this.startAngle),
        );
    }

    public shouldRender(context: CanvasRenderingContext2D) {
        var pos = this.pos(context);
        if (pos.x > context.canvas.width) return false;
        if (pos.x < 0) return false;
        if (pos.y > context.canvas.height) return false;
        if (pos.y < 0) return false;
        return true;
    }
}

export class Stars implements Drawable {
    private stars: Star[] = [];

    constructor(public sunsetTime: SunsetTime) {
        this.createStars();
        this.createLinesBetweenStars();
    }

    private createStars() {
        const numberOfStars = 200;
        for (let index = 0; index < numberOfStars; index++) {
            this.stars.push(new Star(
                this.sunsetTime,
                Math.random() * Math.PI * 2,
                1 - Math.pow(Math.random(), 2),
            ));
        }
    }

    private createLinesBetweenStars() {
        for (let i = 0; i < this.stars.length; i++) {
            const star = this.stars[i];
            const starPos = star.getFactorPos();
            for (let j = 0; j < this.stars.length; j++) {
                const starToCheck = this.stars[j];
                if (starToCheck.linesToStars.includes(star)) continue;
                // if (starToCheck.lineToStar == star.lineToStar && starToCheck.lineToStar != null) continue;
                const starToCheckPos = starToCheck.getFactorPos();
                const distance = Math.hypot(
                    starPos.x - starToCheckPos.x, 
                    starPos.y - starToCheckPos.y
                );
                if (distance < 0.1) {
                    star.linesToStars.push(starToCheck);
                }
            }
        }
    }

    public draw (context: CanvasRenderingContext2D) {
        this.drawStarConnections(context);
        this.drawAllStars(context);
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

    private drawAllStars(context: CanvasRenderingContext2D) {
        var starRadius = context.canvas.width * 0.001;
        for (let index = 0; index < this.stars.length; index++) {
            const star = this.stars[index];
            if (!star.shouldRender(context)) {
                continue;
            }
            const starPos = star.pos(context);
            context.beginPath();
            context.arc(
                starPos.x,
                starPos.y,
                starRadius, 
                0, 2 * Math.PI, true);
            context.fillStyle = new Color(255, 255, 255, this.getOpacity()).toString();
            context.fill();
            context.closePath();
        }
    }

    private drawStarConnections(context: CanvasRenderingContext2D) {
        for (let i = 0; i < this.stars.length; i++) {
            const star = this.stars[i];
            if (!star.shouldRender(context)) continue;

            for (let j = 0; j < star.linesToStars.length; j++) {
                const starTo = star.linesToStars[j];
                if (!starTo.shouldRender(context)) continue;
                const starPos = star.pos(context);
                const starToPos = starTo.pos(context);
                context.beginPath();
                context.moveTo(starPos.x, starPos.y);
                context.lineTo(starToPos.x, starToPos.y);
                context.strokeStyle = new Color(255, 255, 255, this.getOpacity() * 0.1).toString();
                context.lineWidth = context.canvas.width * 0.001;
                context.stroke();
                context.closePath();
            }
        }
    }

}