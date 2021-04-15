import { Color } from "../../../../model/color";
import { ColorTransition, ColorTransitions } from "../color-transition";

const nightBottomColor = new Color(2, 0, 69, 1);
const nightTopColor = new Color(0, 4, 36, 1);

const lateDawnBottomColor = new Color(134, 36, 36, 1);
const lateDawnTopColor = new Color(47, 0, 47, 1);

const earlyDawnBottomColor = new Color(255, 230, 184, 1);
const earlyDawnTopColor = new Color(255, 112, 0, 1);

const dayBottomColor = new Color(212, 234, 255, 1);
const dayTopColor = new Color(0, 143, 255, 1);

export const skyBottomColors = new ColorTransitions(
    [
        new ColorTransition(
            nightBottomColor,
            nightBottomColor,
            0, 0.1,
        ),
        new ColorTransition(
            nightBottomColor,
            lateDawnBottomColor,
            0.1, 0.2,
        ),
        new ColorTransition(
            lateDawnBottomColor,
            earlyDawnBottomColor,
            0.2, 0.3,
        ),
        new ColorTransition(
            earlyDawnBottomColor,
            dayBottomColor,
            0.3, 0.4,
        ),
        new ColorTransition(
            dayBottomColor,
            dayBottomColor,
            0.4, 0.6,
        ),
        new ColorTransition(
            dayBottomColor,
            earlyDawnBottomColor,
            0.6, 0.7,
        ),
        new ColorTransition(
            earlyDawnBottomColor,
            lateDawnBottomColor,
            0.7, 0.8,
        ),
        new ColorTransition(
            lateDawnBottomColor,
            nightBottomColor,
            0.8, 0.9,
        ),
        new ColorTransition(
            nightBottomColor,
            nightBottomColor,
            0.9, 1.0,
        ),
    ]
);


export const skyTopColors = new ColorTransitions(
    [
        new ColorTransition(
            nightTopColor,
            nightTopColor,
            0, 0.1,
        ),
        new ColorTransition(
            nightTopColor,
            lateDawnTopColor,
            0.1, 0.2,
        ),
        new ColorTransition(
            lateDawnTopColor,
            earlyDawnTopColor,
            0.2, 0.3,
        ),
        new ColorTransition(
            earlyDawnTopColor,
            dayTopColor,
            0.3, 0.4,
        ),
        new ColorTransition(
            dayTopColor,
            dayTopColor,
            0.4, 0.6,
        ),
        new ColorTransition(
            dayTopColor,
            earlyDawnTopColor,
            0.6, 0.7,
        ),
        new ColorTransition(
            earlyDawnTopColor,
            lateDawnTopColor,
            0.7, 0.8,
        ),
        new ColorTransition(
            lateDawnTopColor,
            nightTopColor,
            0.8, 0.9,
        ),
        new ColorTransition(
            nightTopColor,
            nightTopColor,
            0.9, 1.0,
        ),
    ]
);