export class Color {
    constructor(
        public r: number,
        public g: number,
        public b: number,
        public a: number,
    ){}

    public toString = () : string => {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    }

    public tintColor = () : number => {
        const hexAsString = `0x${this.toHex(this.r)}${this.toHex(this.g)}${this.toHex(this.b)}`;
        // console.log(hexAsString);
        return parseInt(hexAsString, 16);
    }

    private toHex(num: number) {
        num = Math.min(254, num);
        num = Math.max(0, num);
        num = Math.floor(num);
        var hex = num.toString(16);
        if (hex.length == 1) {
            hex = "0" + hex;
        }
        return hex;
    }
}