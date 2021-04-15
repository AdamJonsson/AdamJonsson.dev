import React, { FunctionComponent } from "react"
import { SunsetCanvas } from "./sunset-canvas/sunset-canvas";
import "./welcome-view.css";

export const WelcomeView: FunctionComponent = ({ children }) => <div className="welcome-view-container">
    <div>
        <SunsetCanvas/>
    </div>
</div>