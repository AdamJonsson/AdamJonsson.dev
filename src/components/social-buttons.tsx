import React, { FunctionComponent } from "react"
import "./social-buttons.css";

import githubIcon from "../assets/github.svg";
import stackOverflowIcon from "../assets/stackoverflow.svg";
import stackOverflowColorIcon from "../assets/stackoverflowColor.svg";
import linkedInColorIcon from "../assets/linkedInColor.svg";
import linkedInIcon from "../assets/linkedIn.svg";
import mailColorIcon from "../assets/mailColor.svg";
import mailIcon from "../assets/mail.svg";
import { SocialButton } from "./social-button/social-button";

export const SocialButtons: FunctionComponent = () => <div className="social-buttons-container">
    <SocialButton
        link="https://stackoverflow.com/users/4425071/adam-jonsson"
        greyImage={stackOverflowIcon}
        colorImage={stackOverflowColorIcon}
    />
    <SocialButton
        link="https://www.linkedin.com/in/adam-jonsson/"
        greyImage={linkedInIcon}
        colorImage={linkedInColorIcon}
    />
    <SocialButton
        link="https://github.com/AdamJonsson"
        greyImage={githubIcon}
        colorImage={githubIcon}
    />
    <SocialButton
        link="mailto:adamsmajl@gmail.com"
        greyImage={mailIcon}
        colorImage={mailColorIcon}
    />
</div>