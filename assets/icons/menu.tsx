import * as React from "react";
import Svg, { Path } from "react-native-svg";

function MenuIcon({
    color,
    height,
    width,
}: {
    color: string;
    height: number;
    width: number;
}) {
    return (
        <Svg height={height} width={width} viewBox="0 0 48 48">
            <Path
                fill={color}
                d="M6 36v-3h36v3Zm0-10.5v-3h36v3ZM6 15v-3h36v3Z"
            />
        </Svg>
    );
}

export default MenuIcon;
