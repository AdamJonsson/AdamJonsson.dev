import React, { useEffect } from 'react';
import { Drawable } from '../../model/drawable';
import "./layered-canvas.css";

export type LayeredCanvasProps = {
    layers: CanvasLayerProps[]
}

export type CanvasLayerProps = {
    drawables: Drawable[],
}

class CanvasLayer {
    public context: CanvasRenderingContext2D | null = null;

    constructor(
        public canvasRef: React.RefObject<HTMLCanvasElement>,
        public drawables: Drawable[]
    ) {}
    
    public generateContext() {
        this.context = this.canvasRef!.current!.getContext('2d')!;
    }

    public render() {
        if (this.context == null) return;
        this.context.setTransform(1, 0, 0, 1, 0, 0);
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        this.drawables.forEach(drawable => {
            drawable.draw(this.context!);
        });
    }
}

const LayeredCanvas = (props: LayeredCanvasProps) => {
    const canvasLayers = props.layers.map(layer => {
            return new CanvasLayer(
                React.createRef(),
                layer.drawables
            );
        }
    );

  useEffect(() => {
    const onResizeWindow = () => {
        canvasLayers.forEach(layer => {
            resizeCanvasLayer(layer);
        });
    }

    canvasLayers.forEach(layer => {
        layer.generateContext();
        resizeCanvasLayer(layer);
    });
    let animationFrameId: number;
    
    const render = () => {
        canvasLayers.forEach(layer => {
            layer.render();
        });
        animationFrameId = window.requestAnimationFrame(render)
    }
    render()
    window.addEventListener('resize', onResizeWindow);
    return () => {
        window.removeEventListener('resize', onResizeWindow);
        window.cancelAnimationFrame(animationFrameId)
    }
  }, [props.layers, canvasLayers])


  const resizeCanvasLayer = (canvasLayer: CanvasLayer) => {
    const canvas = canvasLayer.canvasRef.current!;
    const { width, height } = canvas.getBoundingClientRect()
    
    if (canvas.width !== width || canvas.height !== height) {
      const { devicePixelRatio:ratio=1 } = window;
      canvas.width = width*ratio;
      canvas.height = height*ratio;
      canvasLayer.context!.scale(ratio, ratio);
      return true
    }

    return false
  }
  
  return (
      <div>
          {
            canvasLayers.map((layer, index) => {
                return <canvas
                    className="canvas-layer"
                    key={"canvas-" + index} 
                    ref={layer.canvasRef}></canvas>
            })
          }
      </div>
  )
}

export default LayeredCanvas