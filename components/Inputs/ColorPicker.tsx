import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import ColorPickerEntry from "./ColorPickerEntry";

export default function ColorPicker({
    onChange,
    colors,
}: {
    onChange: Function;
    colors: string[];
}): JSX.Element {
    const [selectedColor, setSelectedColor] = useState<string>();

    return (
        <View style={styles.container}>
            <Text>Color:</Text>
            {colors.map((color) => {
                return (
                    <ColorPickerEntry
                        key={color}
                        color={color}
                        selected={selectedColor === color}
                        onPress={() => {
                            setSelectedColor(color);
                            onChange(color);
                        }}
                    />
                );
            })}
        </View>
    );
}

export const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 10,
        alignItems: "center",
    },
});
