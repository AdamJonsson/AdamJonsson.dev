import React, { FunctionComponent, useState } from "react"
import { Button } from "../button";
import { FadeSwitch } from "../fade-switch/fade-switch";
import "./social-button.css";

type SocialButtonProps = {
    greyImage: string,
    colorImage: string,
    link: string,
}

export const SocialButton: FunctionComponent<SocialButtonProps> = ({ link, greyImage, colorImage }) => {
    const [isHovering, setIsHovering] = useState<boolean>(false);

    return (
        <div className="social-button-container">
            <a href={link}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}>
                <Button>
                    <FadeSwitch
                        switch={isHovering}
                        original={
                            <img className="social-icon" src={greyImage} alt="" />
                        }
                        new={
                            <img className="social-icon" src={colorImage} alt="" />
                        }
                    />
                </Button>
            </a>
        </div>
    )
}