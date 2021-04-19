export class SunsetTime {
    public speed = 0.00002;
    public currentTime: number = 0.15;
    public currentTimeNoLoop: number = this.currentTime;

    constructor() {
        this.startCounter();
    }

    startCounter() {
        const latency = 3;
        var lastUpdate = Date.now();
        setInterval(() => {
            var now = Date.now();
            var dt = now - lastUpdate;
            lastUpdate = Date.now();

            this.currentTime += this.speed * dt;
            this.currentTimeNoLoop += this.speed * dt;
            if (this.currentTime > 1) {
                this.currentTime = 0;
            }
        }, latency);
    }
}