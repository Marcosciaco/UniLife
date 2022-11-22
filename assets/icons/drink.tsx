import * as React from "react";
import Svg, { Path } from "react-native-svg";

function DrinkIcon({
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
                d="M12 42v-3h10.5V26.8L6 9V6h36v3L25.5 26.8V39H36v3zm2.05-28.75h19.9L38.1 9.2H9.9zM24 24.05l7.2-7.8H16.8zm0 0z"
            />
        </Svg>
    );
}

export default DrinkIcon;
