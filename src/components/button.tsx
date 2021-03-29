import React, { FunctionComponent } from "react"
import "./button.css";

export const Button: FunctionComponent = ({ children }) =>
    <div className="button-container">
        {children}
    </div>