import { Dimensions, StyleSheet } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import MoreIcon from "../../assets/icons/expand";
import LessIcon from "../../assets/icons/less";
import { dark, white } from "../../utils/Theme";

const { width } = Dimensions.get("window");

export default function Select({
    onChange,
    data,
}: {
    onChange: Function;
    data: string[];
}) {
    return (
        <SelectDropdown
            data={[...data]}
            defaultButtonText="Select Friend"
            onSelect={(selectedItem) => {
                onChange(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem) => {
                return selectedItem;
            }}
            rowTextForSelection={(item) => {
                return item;
            }}
            onChangeSearchInputText={() => {}}
            renderDropdownIcon={(isOpened) => {
                if (isOpened) {
                    return <LessIcon height={20} width={20} color={dark} />;
                } else {
                    return <MoreIcon height={20} width={20} color={dark} />;
                }
            }}
            buttonStyle={styles.buttonStyle}
            buttonTextStyle={styles.buttonTextStyle}
            rowStyle={styles.rowStyle}
            rowTextStyle={styles.rowTextStyle}
        />
    );
}

export const styles = StyleSheet.create({
    buttonStyle: {
        borderRadius: 10,
        marginBottom: 10,
        width: width - 75,
        height: 40,
        backgroundColor: white,
    },
    buttonTextStyle: {
        color: dark,
        fontSize: 16,
        textAlign: "center",
    },
    rowStyle: {
        backgroundColor: white,
        height: 40,
    },
    rowTextStyle: {
        color: dark,
        fontSize: 16,
        textAlign: "center",
    },
});
