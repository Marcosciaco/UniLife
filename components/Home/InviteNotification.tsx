import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Dialog from "react-native-dialog";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, { FadeInLeft } from "react-native-reanimated";
import MailIcon from "../../assets/icons/mail";
import { Event } from "../../models/Event";
import { dark, light, secondary } from "../../utils/Theme";
import { getUsernameByEmail } from "../../utils/UserService";
import InviteConfirmationDialog from "./InviteConfirmationDialog";

export function InviteNotification({
    event,
    delay,
}: {
    event: Event;
    delay: number;
}): JSX.Element {
    const [username, setUsername] = React.useState<string>();
    const [visible, setVisible] = React.useState<boolean>();

    React.useEffect(() => {
        getUsernameByEmail(event.creator).then((username) => {
            setUsername(username);
        });
    }, []);

    return (
        <Animated.View entering={FadeInLeft.delay(delay + 500)}>
            <TouchableOpacity
                onPress={() => {
                    setVisible(true);
                }}
            >
                <Dialog.Container
                    visible={visible}
                    contentStyle={styles.dialog}
                    onBackdropPress={() => setVisible(false)}
                >
                    <InviteConfirmationDialog
                        event={event}
                    ></InviteConfirmationDialog>
                </Dialog.Container>
                <View style={styles.container}>
                    <MailIcon color={dark} height={30} width={30}></MailIcon>
                    <Text style={styles.inviteText}>Invite by </Text>
                    <Text style={styles.inviteName}>{username}</Text>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
}

export const styles = StyleSheet.create({
    container: {
        backgroundColor: light,
        borderRadius: 5,
        padding: 5,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    inviteName: {
        color: secondary,
        fontFamily: "Poppins_600SemiBold",
    },
    inviteText: {
        paddingLeft: 10,
        fontFamily: "Poppins_400Regular",
    },
    dialog: {
        backgroundColor: light,
        borderRadius: 5,
        padding: 5,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
});
