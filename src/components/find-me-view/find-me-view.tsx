import React, { FunctionComponent } from "react"
import { SocialButtons } from "../social-buttons";
import { SunsetFade } from "../sunset-fade/sunset-fade";
import "./find-me-view.css";

export const FindMeView: FunctionComponent = () => <div className="find-me-view-container">
    <SunsetFade>
        <div className="content-container">
            <h1>You can find me here</h1>
            <SocialButtons/>
        </div>
    </SunsetFade>
</div>