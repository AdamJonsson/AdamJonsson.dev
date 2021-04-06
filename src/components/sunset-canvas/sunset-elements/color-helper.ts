import { Color } from "../../../model/color";
import { ColorInterpolation } from "../../../model/color-interpolation";

export class ColorHelper {
    public static getColorFromTime(currentTime: number) {
        var nightColor = new Color(0, 5, 30, 1);
        var sunriseColor = new Color(200, 50, 50, 1);
        var dayColor = new Color(50, 100, 200, 1);
        var dawnColor = new Color(200, 50, 50, 1);

        if (currentTime < 0) {
            currentTime = 1 - currentTime;
        }
        currentTime = Math.abs(currentTime % 1);

        // Only night
        var onlyNight = this.createColorInterpolation(
            nightColor,
            nightColor,
            0, 0.2, currentTime,
        );
        if (onlyNight != null) return onlyNight;

        // Night to sunrise
        var nightToSunrise = this.createColorInterpolation(
            nightColor,
            sunriseColor,
            0.2, 0.3, currentTime,
        );
        if (nightToSunrise != null) return nightToSunrise;

        // Sunrise to day
        var sunriseToDay = this.createColorInterpolation(
            sunriseColor,
            dayColor,
            0.3, 0.4, currentTime,
        );
        if (sunriseToDay != null) return sunriseToDay;

        // Only day 
        var dayOnly = this.createColorInterpolation(
            dayColor,
            dayColor,
            0.4, 0.6, currentTime,
        );
        if (dayOnly != null) return dayOnly;

        // Day to dawn
        var dayToDawn = this.createColorInterpolation(
            dayColor,
            dawnColor,
            0.6, 0.75, currentTime,
        );
        if (dayToDawn != null) return dayToDawn;

        // Dawn to night
        var dawnToNight = this.createColorInterpolation(
            dawnColor,
            nightColor,
            0.75, 0.9, currentTime,
        );
        if (dawnToNight != null) return dawnToNight;

        // Only night
        var onlyNight = this.createColorInterpolation(
            nightColor,
            nightColor,
            0.9, 1, currentTime,
        );
        if (onlyNight != null) return onlyNight;
        
        return new Color(0, 0, 0, 1);
    }

    private static createColorInterpolation(
        startColor: Color, 
        endColor: Color, 
        startTime: number, 
        endTime: number, 
        currentTime: number) {
        if (currentTime > startTime && currentTime < endTime) {
            return ColorInterpolation.calculate(
                startColor,
                endColor,
                (currentTime - startTime) / (endTime - startTime)
            );
        }
        return null;
    }
}