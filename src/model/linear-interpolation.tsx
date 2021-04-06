export class LinearInterpolation {
    static calculate(startValue: number, endValue: number, transitionFactor: number) {
        return startValue * (1 - transitionFactor) + endValue * transitionFactor;
    }
}