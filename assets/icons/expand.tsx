import * as React from "react";
import Svg, { Path } from "react-native-svg";

function MoreIcon({
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
                d="m24 30.75-12-12 2.15-2.15L24 26.5l9.85-9.85L36 18.8Z"
            />
        </Svg>
    );
}

export default MoreIcon;
