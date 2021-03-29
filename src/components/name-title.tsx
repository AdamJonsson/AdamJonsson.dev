import React, { FunctionComponent } from "react"
import { Center } from "./center";
import "./name-title.css";

export const NameTitle: FunctionComponent = () =>
    <div className="name-title-container">
        <div className="first-name-row-container">
            <div className="first-name">
                ADAM
            </div>
            <div className="dev-name-container">
                <div className="dev-name">
                    <Center>
                        .DEV
                    </Center>
                </div>
            </div>
        </div>
        <div className="last-name">
            JONSSON
        </div>
    </div>