import { FunctionComponent } from "react";
import "./center.css";

export const Center: FunctionComponent = ({ children }) => <div className="center-container">
    <div className="center-content">
        {children}
    </div>
</div>