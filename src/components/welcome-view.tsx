import React, { FunctionComponent } from "react"
import { Center } from "./center";
import { NameTitle } from "./name-title";
import { SocialButtons } from "./social-buttons";
import "./welcome-view.css";

export const WelcomeView: FunctionComponent = ({ children }) => <div className="welcome-view-container">
    <Center>
        <div>
            <NameTitle />
        </div>
        <div>
            <SocialButtons />
        </div>
    </Center>
</div>