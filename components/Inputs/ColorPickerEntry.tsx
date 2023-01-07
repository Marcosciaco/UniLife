import { Pressable } from "react-native";

export default function ColorPickerEntry({
    onPress,
    color,
    selected,
}: {
    onPress: Function;
    color: string;
    selected: boolean;
}) {
    return (
        <Pressable
            style={{
                backgroundColor: color,
                width: 30,
                height: 30,
                borderRadius: 30,
                borderWidth: 2,
                borderColor: selected ? "#C4C4C4" : "transparent",
            }}
            onPress={() => {
                onPress(color);
            }}
        ></Pressable>
    );
}