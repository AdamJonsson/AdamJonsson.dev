import { Drawable } from "../../../model/drawable";
import { SunsetTime } from "./sunset-time";
import { skyTopColors, skyBottomColors } from "./colors/sky-color";

export class Sky implements Drawable {
    constructor(
        private sunsetTime: SunsetTime,
    ){}

    public draw(context: CanvasRenderingContext2D) {
        this.drawSkyGradient(context)
    };

    private drawSkyGradient(context: CanvasRenderingContext2D) {
        // Create gradient
        var grd = context.createLinearGradient(context.canvas.width / 2, context.canvas.height, context.canvas.width / 2, 0);
        grd.addColorStop(0, skyBottomColors.getColorFromTime(this.sunsetTime.currentTime)!.toString());
        grd.addColorStop(1, skyTopColors.getColorFromTime(this.sunsetTime.currentTime)!.toString());

        // Fill with gradient
        context.fillStyle = grd;
        // context.fillStyle = "rgba("+ this.sunsetTime.currentTime * 255 +", 0, 0)";
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    }



}