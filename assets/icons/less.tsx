import * as React from "react";
import Svg, { Path } from "react-native-svg";

function LessIcon({
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
                d="M14.15 30.75 12 28.6l12-12 12 11.95-2.15 2.15L24 20.85Z"
            />
        </Svg>
    );
}

export default LessIcon;
