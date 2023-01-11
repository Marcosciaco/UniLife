import { TouchableOpacity, StyleSheet } from "react-native";

export default function ColorPickerEntry({
    onPress,
    color,
    selected,
}: {
    onPress: Function;
    color: string;
    selected: boolean;
}): JSX.Element {
    return (
        <TouchableOpacity
            style={[
                styles.pressable,
                {
                    backgroundColor: color,
                    borderColor: selected ? "#C4C4C4" : "transparent",
                },
            ]}
            onPress={() => {
                onPress(color);
            }}
        ></TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    pressable: {
        width: 30,
        height: 30,
        borderRadius: 30,
        borderWidth: 2,
    },
});
