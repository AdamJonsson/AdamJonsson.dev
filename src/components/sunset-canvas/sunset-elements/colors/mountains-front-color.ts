import { Color } from "../../../../model/color";
import { ColorTransition, ColorTransitions } from "../color-transition";

const visibleHighlight = 1;
const nightColor = new Color(20, 23, 56, visibleHighlight);
const lateDawnColor = new Color(69, 24, 40, visibleHighlight);
const earlyDawnColor = new Color(139, 75, 57, visibleHighlight);
const dayColor = new Color(56, 87, 143, visibleHighlight);

export const mountainsFrontColor = new ColorTransitions(
    [
        new ColorTransition(
            nightColor,
            nightColor,
            0, 0.1,
        ),
        new ColorTransition(
            nightColor,
            lateDawnColor,
            0.1, 0.2,
        ),
        new ColorTransition(
            lateDawnColor,
            earlyDawnColor,
            0.2, 0.3,
        ),
        new ColorTransition(
            earlyDawnColor,
            dayColor,
            0.3, 0.4,
        ),
        new ColorTransition(
            dayColor,
            dayColor,
            0.4, 0.6,
        ),
        new ColorTransition(
            dayColor,
            earlyDawnColor,
            0.6, 0.7,
        ),
        new ColorTransition(
            earlyDawnColor,
            lateDawnColor,
            0.7, 0.8,
        ),
        new ColorTransition(
            lateDawnColor,
            nightColor,
            0.8, 0.9,
        ),
        new ColorTransition(
            nightColor,
            nightColor,
            0.9, 1.0,
        ),
    ]
);