import { Color } from "../../../model/color";
import { ColorInterpolation } from "../../../model/color-interpolation";
import { Drawable } from "../../../model/drawable";
import { ColorHelper } from "./color-helper";
import { Moon } from "./moon";
import { Stars } from "./starts";
import { Sun } from "./sun";
import { SunsetTime } from "./sunset-time";

export class Sky implements Drawable {
    constructor(
        private sunsetTime: SunsetTime
    ){}

    public draw(context: CanvasRenderingContext2D) {
        this.drawSkyGradient(context)
    };

    private drawSkyGradient(context: CanvasRenderingContext2D) {
        // Create gradient
        var grd = context.createLinearGradient(context.canvas.width / 2, context.canvas.height, context.canvas.width / 2, 0);
        
        grd.addColorStop(0, ColorHelper.getColorFromTime(this.sunsetTime.currentTime + 0.05).toString());
        grd.addColorStop(1, ColorHelper.getColorFromTime(this.sunsetTime.currentTime - 0.05).toString());

        // Fill with gradient
        context.fillStyle = grd;
        // context.fillStyle = "rgba("+ this.sunsetTime.currentTime * 255 +", 0, 0)";
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    }



}