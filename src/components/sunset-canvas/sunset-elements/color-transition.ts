import { Color } from "../../../model/color";
import { ColorInterpolation } from "../../../model/color-interpolation";

export class ColorTransition {
    constructor(
        private startColor: Color,
        private endColor: Color,
        private startTime: number,
        private endTime: number
    ) {}

    public timeInRange(time: number) {
        return time >= this.startTime && time < this.endTime;
    }

    public getColor(time: number) {
        if (!this.timeInRange(time)) return null;
        return ColorInterpolation.calculate(
            this.startColor,
            this.endColor,
            (time - this.startTime) / (this.endTime - this.startTime)
        );
    }
}

export class ColorTransitions {
    constructor(
        private colors: ColorTransition[]
    ){}

    public getColorFromTime(time: number) {
        for (const color of this.colors) {
            if (color.timeInRange(time))
                return color.getColor(time);
        }
        return this.colors[0].getColor(0);
    }
}