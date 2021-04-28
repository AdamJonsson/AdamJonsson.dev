import React, { FunctionComponent } from "react"
import "./readable-text.css";

export const ReadableText: FunctionComponent = ({children}) => {
    return (
        <div className="readable-text-container">
            { children }
        </div>
    )
}