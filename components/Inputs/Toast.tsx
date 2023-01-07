import Toast from "react-native-root-toast";
import { width } from "../../utils/Theme";

export default function showToast(message: string, color: string): void {
    Toast.show(message, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        containerStyle: {
            backgroundColor: color,
            width: width - 20,
            borderRadius: 10,
            padding: 10,
            margin: 10,
            marginTop: 28,
        },
    });
}
