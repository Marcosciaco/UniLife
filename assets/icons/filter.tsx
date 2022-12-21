import * as React from "react";
import Svg, { Path } from "react-native-svg";

function FilterIcon({
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
                d="M20 36v-3h8v3Zm-8-10.5v-3h24v3ZM6 15v-3h36v3Z"
            />
        </Svg>
    );
}

export default FilterIcon;
