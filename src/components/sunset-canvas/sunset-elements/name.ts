import nameImage from "../../../assets/sunset/name.png";
import { ScrollData } from "./scroll-data";
import { PixiDrawable, PixiHelper } from "../../pixi/pixi-canvas";
import * as PIXI from 'pixi.js';

export class Name extends PixiDrawable {

    private nameSprite: PIXI.Sprite | null = null;;
    constructor(
        private scrollData: ScrollData
    ) {
        super();
    }

    public onAttachApp(): void {
        const texture = PixiHelper.getTexture(nameImage, this.app!);
        this.nameSprite = new PIXI.Sprite(texture);
        this.app!.stage.addChild(this.nameSprite);
    }
    public textures(): string[] {
        return [
            nameImage
        ]
    }
    public draw () {
        if (this.nameSprite == null) return;
        const dimensions = PixiHelper.getDimensions(this.app!);
        const scale = PixiHelper.getMainScaleRef(this.app!);
        this.nameSprite.anchor.set(0.5, 0.5);
        this.nameSprite.x = dimensions.width / 2;
        this.nameSprite.y = dimensions.height / 2 - this.scrollData.currentScroll * 0.2;
        this.nameSprite.width = scale * 0.3;
        this.nameSprite.height = this.nameSprite.width;
        this.nameSprite.scale.set(
            this.nameSprite.scale.x,
        );
    };

}