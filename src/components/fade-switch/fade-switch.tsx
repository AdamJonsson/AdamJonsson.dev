import React, { FunctionComponent } from "react"
import "./fade-switch.css";

type FadeSwitchProps = {
    original: React.ReactNode,
    new: React.ReactNode,
    switch: boolean,
}

export const FadeSwitch: FunctionComponent<FadeSwitchProps> = (props) => {
    return (
        <div className="switch-container">
            <div className={
                "original switch-element " + (!props.switch ? "visible" : "")
            }>
                {props.original}
            </div>
            <div className={
                "new switch-element " + (props.switch ? "visible" : "")
            }>
                {props.new}
            </div>
        </div>
    )
}