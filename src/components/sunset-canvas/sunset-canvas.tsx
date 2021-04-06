import React, { FunctionComponent, useEffect } from "react"
import LayeredCanvas, { CanvasLayerProps } from "../layered-canvas/layered-canvas";
import "./sunset-canvas.css";
import { GroundLayer } from "./sunset-elements/ground-layer";
import { Sky } from "./sunset-elements/sky";
import { SunsetTime } from "./sunset-elements/sunset-time";
import firstMountainImagePath from "../../assets/sunset/mountain_1.png";
import { Moon } from "./sunset-elements/moon";
import { Sun } from "./sunset-elements/sun";
import { Stars } from "./sunset-elements/starts";

export const SunsetCanvas: FunctionComponent = ({ children }) => {
    const time = new SunsetTime();
    const skyLayer: CanvasLayerProps = {
        drawables: [
            new Sky(time),
            new Stars(time),
            new Moon(time),
            new Sun(time),
        ]
    }
    const firstMountainLayer: CanvasLayerProps = {
        drawables: [
            new GroundLayer(
                time,
                firstMountainImagePath
            ),
        ]
    }

    useEffect(() => {
    }, []);

    return (
        <div className="container">
            <LayeredCanvas layers={[skyLayer, firstMountainLayer]}/>
        </div>
    );
}