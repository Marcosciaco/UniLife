import { Pressable, StyleSheet } from "react-native";
import ReserveIcon from "../../assets/icons/reserve";
import { Room } from "../../models/Room";
import { Slot } from "../../models/Slot";
import { reserveRoom } from "../../utils/RoomUtil";
import {
    secondary,
    dark,
    success,
    error,
    light,
    white,
} from "../../utils/Theme";
import { getCurrentUser } from "../../utils/UserService";
import showToast from "../Inputs/Toast";

export default function ReserveSlotButton({
    free,
    room,
    slot,
    onReserved,
}: {
    free: boolean;
    room: Room;
    slot: Slot;
    onReserved: () => void;
}): JSX.Element {
    return (
        <Pressable
            style={[
                styles.reserveButton,
                {
                    backgroundColor: free ? secondary : dark,
                },
            ]}
            disabled={!free}
            onPress={() => {
                getCurrentUser()
                    .then((user) => {
                        if (user) {
                            reserveRoom(room, slot, user)
                                .then(() => {
                                    showToast("Room reserved", success);
                                    onReserved();
                                })
                                .catch((errorMsg) => {
                                    showToast(errorMsg, error);
                                });
                        }
                    })
                    .catch((errorMsg) => {
                        showToast(errorMsg, error);
                    });
            }}
        >
            <ReserveIcon height={20} width={20} color={light} />
        </Pressable>
    );
}

export const styles = StyleSheet.create({
    reserveButton: {
        position: "absolute",
        right: 5,
        top: 5,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        height: 30,
        width: 30,
        color: white,
    },
});
