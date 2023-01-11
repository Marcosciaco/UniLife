import Animated, {
    interpolate,
    StyleProps,
    useAnimatedStyle,
    withDelay,
    withTiming,
} from "react-native-reanimated";
import { height } from "../../utils/Theme";

export function imageAnimatedStyle(
    imagePosition: Animated.SharedValue<number>
): StyleProps {
    return useAnimatedStyle((): StyleProps => {
        const interpolation = interpolate(
            imagePosition.value,
            [0, 1],
            [-height * 0.65, 0]
        );
        return {
            transform: [
                { translateY: withTiming(interpolation, { duration: 1000 }) },
            ],
        };
    });
}

export function buttonsAnimatedStyle(
    imagePosition: Animated.SharedValue<number>
): StyleProps {
    return useAnimatedStyle((): StyleProps => {
        const interpolation = interpolate(
            imagePosition.value,
            [0, 1],
            [500, 0]
        );
        return {
            opacity: withTiming(imagePosition.value, { duration: 500 }),
            transform: [
                { translateY: withTiming(interpolation, { duration: 1000 }) },
            ],
        };
    });
}

export function closeButtonContainerStyle(
    imagePosition: Animated.SharedValue<number>
): StyleProps {
    return useAnimatedStyle((): StyleProps => {
        const interpolation = interpolate(
            imagePosition.value,
            [0, 1],
            [180, 360]
        );
        return {
            opacity: withTiming(imagePosition.value === 1 ? 0 : 1, {
                duration: 800,
            }),
            transform: [
                {
                    rotate: withTiming(interpolation + "deg", {
                        duration: 1000,
                    }),
                },
            ],
        };
    });
}

export function formAnimatedStyle(
    imagePosition: Animated.SharedValue<number>
): StyleProps {
    return useAnimatedStyle((): StyleProps => {
        return {
            opacity:
                imagePosition.value === 0
                    ? withDelay(400, withTiming(1, { duration: 800 }))
                    : withTiming(0, { duration: 300 }),
        };
    });
}

export function formButtonAnimatedStyle(
    formButtonScale: Animated.SharedValue<number>
): StyleProps {
    return useAnimatedStyle(() => {
        return {
            transform: [{ scale: formButtonScale.value }],
        };
    });
}
