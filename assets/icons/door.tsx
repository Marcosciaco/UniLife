import * as React from "react";
import Svg, { Path } from "react-native-svg";

function DoorIcon({
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
                d="M6 42v-3h4.6V6h19.5v2.25h7.35V39H42v3h-7.55V11.25H30.1V42zm7.6-33v30zm8.95 17q.85 0 1.425-.575.575-.575.575-1.425 0-.85-.575-1.425Q23.4 22 22.55 22q-.85 0-1.425.575-.575.575-.575 1.425 0 .85.575 1.425Q21.7 26 22.55 26zM13.6 39h13.5V9H13.6z"
            />
        </Svg>
    );
}

export default DoorIcon;
