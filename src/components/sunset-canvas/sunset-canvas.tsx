import React, { FunctionComponent, useEffect, } from "react"
import "./sunset-canvas.css";
import Sky from "./sunset-elements/sky";
import { SunsetTime } from "./sunset-elements/sunset-time";
import { Moon } from "./sunset-elements/moon";
import { Sun } from "./sunset-elements/sun";

import mountainsBack from "../../assets/sunset/landscape/mountainsBack.png";
import { mountainsBackColor } from "./sunset-elements/colors/mountains-back-color";

import mountainsFront from "../../assets/sunset/landscape/mountainsFront.png";
import { mountainsFrontColor } from "./sunset-elements/colors/mountains-front-color";

import groundBack from "../../assets/sunset/landscape/groundBack.png";
import { groundBackColor } from "./sunset-elements/colors/ground-back-color";

import groundFront from "../../assets/sunset/landscape/groundFront.png";
import { groundFrontColor } from "./sunset-elements/colors/ground-front-color";

import { ScrollData } from "./sunset-elements/scroll-data";
import PixiCanvas, { PixiDrawable } from "../pixi/pixi-canvas";
import { LandscapeLayer } from "./sunset-elements/landscape-layer";
import { Name } from "./sunset-elements/name";
import { Stars } from "./sunset-elements/stars";
import { Clouds } from "./sunset-elements/clouds";

export const SunsetCanvas: FunctionComponent = ({ children }) => {
    const time = new SunsetTime();
    const scrollData = new ScrollData();

    const drawables: PixiDrawable[] = [
        new Sky(time),
        new Stars(time),
        new Moon(time),
        new Sun(time),
        new Clouds(time),
        new LandscapeLayer({
            sunsetTime: time,
            pathOfImage: mountainsBack,
            color: mountainsBackColor,
            numberOfTrees: 0,
            treeMaxYPos: 0,
            treeMinYPos: 0,
            treeSize: 0,
            scrollData: scrollData,
            scrollParallaxFactor: 0.1,
        }),
        new Name(
            scrollData,
        ),
        new LandscapeLayer({
            sunsetTime: time,
            pathOfImage: mountainsFront,
            color: mountainsFrontColor,
            numberOfTrees: 0,
            treeMaxYPos: 0,
            treeMinYPos: 0,
            treeSize: 0,
            scrollData: scrollData,
            scrollParallaxFactor: 0.3,
        }),
        new LandscapeLayer({
            sunsetTime: time,
            pathOfImage: groundBack,
            color: groundBackColor,
            numberOfTrees: 80,
            treeMaxYPos: -0.04,
            treeMinYPos: -0.04,
            treeSize: 0.025,
            scrollData: scrollData,
            scrollParallaxFactor: 0.6,
        }),
        new LandscapeLayer({
            sunsetTime: time,
            pathOfImage: groundFront,
            color: groundFrontColor,
            numberOfTrees: 30,
            treeMaxYPos: -0.01,
            treeMinYPos: 0.02,
            treeSize: 0.045,
            scrollData: scrollData,
            scrollParallaxFactor: 0.9,
            coverBelow: true,
        }),
    ];

    useEffect(() => {
        const onScrollUpdate = () => {
            scrollData.currentScroll = window.scrollY;
        }
    
        function watchScroll() {
            window.addEventListener("scroll", onScrollUpdate);
        }
        watchScroll();
        return () => {
            window.removeEventListener("scroll", onScrollUpdate);
        };
    });
  
    return (
        <div className="margin-container">
            <div className="container">
                <PixiCanvas drawables={drawables} onTick={(deltaMS) => {
                    time.updateTime(deltaMS);
                }}/>
            </div>
        </div>
    );
}