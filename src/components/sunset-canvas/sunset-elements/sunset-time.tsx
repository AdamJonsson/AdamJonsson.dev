export class SunsetTime {
    public speed = 0.000015;
    public currentTime: number = 0.15;
    public currentTimeNoLoop: number = this.currentTime;

    constructor() {}

    updateTime(deltaMS: number) {
        this.currentTime += this.speed * deltaMS;
        this.currentTimeNoLoop += this.speed * deltaMS;
        if (this.currentTime > 1) {
            this.currentTime = 0;
        }
    }

}