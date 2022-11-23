import * as React from "react";
import Svg, { Path } from "react-native-svg";

function CloseIcon({
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
                d="M12.45 37.65l-2.1-2.1L21.9 24 10.35 12.45l2.1-2.1L24 21.9l11.55-11.55 2.1 2.1L26.1 24l11.55 11.55-2.1 2.1L24 26.1z"
            />
        </Svg>
    );
}

export default CloseIcon;
