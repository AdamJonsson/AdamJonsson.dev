import React, { FunctionComponent } from "react"
import "./content-container.css";

export const ContentContainer: FunctionComponent = ({ children }) =>
    <div className="content-container">
        {children}
    </div>