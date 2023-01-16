import * as React from "react";
import Svg, { Path } from "react-native-svg";

function ReserveIcon({
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
                d="M24 46 9.15 34.85q-.6-.45-.875-1.15T8 32.25V7q0-1.2.9-2.1Q9.8 4 11 4h26q1.2 0 2.1.9.9.9.9 2.1v25.25q0 .75-.275 1.45t-.875 1.15Zm0-3.75 13-10V7H11v25.25ZM21.9 30l11.3-11.3-2.15-2.1-9.2 9.2-4.95-4.95-2.1 2.1ZM24 7H11h26Z"
            />
        </Svg>
    );
}

export default ReserveIcon;
