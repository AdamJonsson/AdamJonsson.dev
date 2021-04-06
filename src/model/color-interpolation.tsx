import { Color } from "./color";
import { LinearInterpolation } from "./linear-interpolation";

export class ColorInterpolation {
    static calculate(startColor: Color, endColor: Color, transitionFactor: number) {
        return new Color(
            LinearInterpolation.calculate(startColor.r, endColor.r, transitionFactor),
            LinearInterpolation.calculate(startColor.g, endColor.g, transitionFactor),
            LinearInterpolation.calculate(startColor.b, endColor.b, transitionFactor),
            LinearInterpolation.calculate(startColor.a, endColor.a, transitionFactor),
        )
    }
}