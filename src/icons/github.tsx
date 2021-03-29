import React, { FunctionComponent } from "react"


export const GitHubIcon: FunctionComponent = () => <div className="social-buttons-container">
    <svg
        width="100%"
        height="100%"
        viewBox="0 0 64 63"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        style={{
            fillRule: "evenodd",
            clipRule: "evenodd",
            strokeLinejoin: "round",
            strokeMiterlimit: 2,
        }}>
        <use x="0" y="0" width="63.768px" height="62.194px" transform="matrix(0.99637,0,0,0.987202,0,0)" />
        <defs>
            <image id="_Image1" width="64px" height="63px" xlinkHref="data:image/png;base64,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" />
        </defs>
    </svg>
</div>

