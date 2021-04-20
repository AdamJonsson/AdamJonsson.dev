import React, { FC, useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';

export class PixiHelper {
    static getDimensions(app: PIXI.Application) {
        return {
            width: app.screen.width ,
            height: app.screen.height,
        }
    }

    static getMainScaleRef(app: PIXI.Application) {
        const dimensions = PixiHelper.getDimensions(app);
        return Math.max(dimensions.width, dimensions.height);
    }

    static createCanvas(app: PIXI.Application) {
        var canvas = document.createElement('canvas');
        const ratio = window.devicePixelRatio;
        canvas.width  = app.renderer.width / ratio;
        canvas.height = app.renderer.height / ratio;
        console.log("App renderer: " + app.renderer.width);
        var ctx = canvas.getContext('2d');
        return ctx!;
    }

    static getTexture(path: string, app: PIXI.Application) {
        return app.loader.resources[path].texture!;
    }
}

export abstract class PixiDrawable {
    protected app: PIXI.Application | null = null;

    public abstract draw(): void;
    attachApp(app: PIXI.Application) {
        this.app = app;
        this.onAttachApp();
    };

    public abstract onAttachApp(): void;

    public abstract textures(): string[];
}

type PixiCanvasProps = {
    drawables: PixiDrawable[],
    onTick: (deltaMS: number) => void,
}

const PixiCanvas: FC<PixiCanvasProps> = ({drawables, onTick}) => {

    const pixiContainer = useRef<HTMLDivElement>(null);
    
    useEffect(() => {

        const app: PIXI.Application = new PIXI.Application({
            resizeTo: window,
            // autoDensity: true,
            // resolution: window.devicePixelRatio,
            antialias: true,
        });
        
        // Make the screen scrollable
        app.renderer.plugins.interaction.autoPreventDefault = false;
        app.renderer.view.style.touchAction = 'auto';
        
        const startLoadingTexture = () => {
            return new Promise ((resolve, reject) => {
                console.groupCollapsed("Texture loading");
                console.log("Starting loading textures...");
                var textures: string[] = [];
                drawables.forEach((drawable) => {
                    textures = textures.concat(drawable.textures());
                });
                textures = textures.filter((texture, index) => {
                    return textures.indexOf(texture) === index;
                })
                console.log("Textures that should load: ", textures);
                const loader = app.loader.add(textures);
                loader.load();
                loader.onProgress.add(() => {
                    console.log("Texture loading progress: " + loader.progress + "%");
                });
                loader.onComplete.add(() => {
                    console.log("Done loading textures!");
                    console.groupEnd();
                    resolve(null);
                });
            })
        }

        const settingUpCanvas = async () => {
            await startLoadingTexture();
    
            drawables.forEach(drawable => {
                drawable.attachApp(app);
            });
    
            app.ticker.add(() => {
                onTick(app.ticker.deltaMS);
                drawables.forEach(drawable => {
                    drawable.draw();
                });
            });
    
            pixiContainer.current!.innerHTML = "";
            pixiContainer.current!.appendChild(app.view);
        }
        settingUpCanvas();
    }, [drawables, onTick])

    return (
        <div ref={pixiContainer}></div>
    )
}

export default PixiCanvas