import { Text, View, StyleSheet } from "react-native";
import { Slot } from "../../models/Slot";
import { dark, secondary, white } from "../../utils/Theme";

function getHour(start: string): string {
    const date = new Date(start);
    const minutes = String(date.getMinutes()).padStart(2, "0").padEnd(2, "0");
    return `${date.getHours()}:${minutes}`;
}

export default function RoomTimeEntry({
    slot,
    free,
}: {
    slot: Slot;
    free: boolean;
}) {
    const isNow = (slot: Slot): boolean => {
        const now = new Date();
        const start = new Date(slot.start);
        const end = new Date(slot.end);
        return now >= start && now <= end;
    };

    return (
        <View>
            <View
                style={[
                    styles.timeSlot,
                    {
                        borderWidth: isNow(slot) ? 2 : 0,
                        borderColor: isNow(slot) ? secondary : white,
                    },
                ]}
            >
                <View style={styles.time}>
                    <Text style={styles.text}>
                        {slot.start === "0" ? "Opening" : getHour(slot.start)}
                    </Text>
                    <Text style={styles.text}>-</Text>
                    <Text style={styles.text}>
                        {slot.end === "9" ? "Closing" : getHour(slot.end)}
                    </Text>
                </View>
                <Text
                    // numberOfLines={1}
                    // ellipsizeMode="tail"
                    style={styles.slotDescription}
                >
                    {free
                        ? `Available from ${
                              slot.start === "0"
                                  ? "Opening"
                                  : getHour(slot.start)
                          } to ${
                              slot.end === "9" ? "Closing" : getHour(slot.end)
                          }`
                        : slot.description}
                </Text>
            </View>
        </View>
    );
}

export const styles = StyleSheet.create({
    content: {
        padding: 10,
        margin: 10,
        borderRadius: 10,
    },
    timeSlot: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: white,
    },
    slotDescription: {
        color: dark,
        flex: 1,
        marginLeft: 10,
        fontFamily: "Poppins_500Medium",
    },
    time: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRightWidth: 1,
        borderRightColor: dark,
        width: 70,
    },
    text: {
        color: dark,
        fontFamily: "Poppins_400Regular",
    },
});
