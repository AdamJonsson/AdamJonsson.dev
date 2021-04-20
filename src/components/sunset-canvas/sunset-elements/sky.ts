import { SunsetTime } from "./sunset-time";
import { skyTopColors, skyBottomColors } from "./colors/sky-color";
import { PixiDrawable, PixiHelper } from "../../pixi/pixi-canvas";
import * as PIXI from 'pixi.js';

export default class Sky extends PixiDrawable {
    private canvasContext: CanvasRenderingContext2D | null = null;
    private skySprite: PIXI.Sprite | null = null;
    constructor(
    private sunsetTime: SunsetTime,
    ){
        super();
    }

    public onAttachApp(): void {
        this.canvasContext = PixiHelper.createCanvas(this.app!);
        this.skySprite = new PIXI.Sprite(PIXI.Texture.from(this.canvasContext!.canvas));
        this.app?.stage.addChild(this.skySprite);
    }

    public draw() {
        const dimensions = PixiHelper.getDimensions(this.app!);
        this.skySprite!.width = dimensions.width;
        this.skySprite!.height = dimensions.height;
        this.updateCanvasSprite();
    };

    public textures(): string[] {
        return [];
    }

    private updateCanvasSprite() {
        // Create gradient
        const grd = this.canvasContext!.createLinearGradient(
            this.canvasContext!.canvas.width / 2, 
            this.canvasContext!.canvas.height, 
            this.canvasContext!.canvas.width / 2, 
            0,
        );
        grd.addColorStop(0, skyBottomColors.getColorFromTime(this.sunsetTime.currentTime)!.toString());
        grd.addColorStop(1, skyTopColors.getColorFromTime(this.sunsetTime.currentTime)!.toString());
    
        
        // Fill with gradient
        const dimensions = PixiHelper.getDimensions(this.app!);
        this.canvasContext!.fillStyle = grd;
        this.canvasContext!.fillRect(0, 0, dimensions.width, dimensions.height);
        this.skySprite!.texture.update();
    }

}