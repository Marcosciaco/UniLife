import * as React from "react";
import Svg, { Path } from "react-native-svg";

function HomeIcon({
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
                d="M11 39h7.5V26.5h11V39H37V19.5L24 9.75 11 19.5zm-3 3V18L24 6l16 12v24H26.5V29.5h-5V42zm16-17.65z"
            />
        </Svg>
    );
}

export default HomeIcon;
