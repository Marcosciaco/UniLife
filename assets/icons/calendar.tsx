import * as React from "react";
import Svg, { Path } from "react-native-svg";

function CalendarIcon({
    color,
    width,
    height,
}: {
    color: string;
    width: number;
    height: number;
}) {
    return (
        <Svg height={height} width={width} viewBox="0 0 48 48">
            <Path
                fill={color}
                d="M9 44q-1.2 0-2.1-.9Q6 42.2 6 41V10q0-1.2.9-2.1Q7.8 7 9 7h3.25V4h3.25v3h17V4h3.25v3H39q1.2 0 2.1.9.9.9.9 2.1v15.05h-3V19.5H9V41h15.95v3zm35.45-10.95L40.9 29.5l1.45-1.45q.4-.4 1.05-.4t1.05.4l1.45 1.45q.4.4.4 1.05t-.4 1.05zM27.95 46v-3.55l10.8-10.8 3.55 3.55L31.5 46zM9 16.5h30V10H9zm0 0V10v6.5z"
            />
        </Svg>
    );
}

export default CalendarIcon;
