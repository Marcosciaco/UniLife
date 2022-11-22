import * as React from "react";
import Svg, { Path } from "react-native-svg";

function MailIcon({
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
                d="M7 40q-1.2 0-2.1-.9Q4 38.2 4 37V11q0-1.2.9-2.1Q5.8 8 7 8h34q1.2 0 2.1.9.9.9.9 2.1v26q0 1.2-.9 2.1-.9.9-2.1.9zm17-15.1L7 13.75V37h34V13.75zm0-3L40.8 11H7.25zM7 13.75V11v26z"
            />
        </Svg>
    );
}

export default MailIcon;
