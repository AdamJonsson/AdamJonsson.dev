export class SunsetTime {
    public speed = 0.00005;
    public currentTime: number = 0.15;
    public currentTimeNoLoop: number = this.currentTime;

    constructor() {
        this.startCounter();
    }

    startCounter() {
        setInterval(() => {
            this.currentTime += this.speed;
            this.currentTimeNoLoop += this.speed;
            if (this.currentTime > 1) {
                this.currentTime = 0;
            }
        }, 1);
    }
}