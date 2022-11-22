import { StyleSheet, Dimensions } from "react-native";
const{ width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'white'
    },
    button: {
        backgroundColor: 'rgba(243,248,255,2)',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 45,
        marginHorizontal: 20,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: 'white' 
    },
    buttonText: {
        fontSize: 20,
        color: 'rgba(56,73,86,1)',
        letterSpacing: 0.5
    },
    bottomContainer: {
        justifyContent: 'center',
        height: height * 0.38
    },
    textInput: {
        height: 40,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
        backgroundColor: 'rgba(243,248,255,2)',
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 25,
        paddingLeft: 10
    },
    formButton: {
        backgroundColor: 'rgba(243,248,255,2)',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 45,
        marginHorizontal: 20,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    formInputContainer: {
        marginBottom: 70,
        ...StyleSheet.absoluteFill,
        zIndex: -1,
        justifyContent: 'center'
    },
    closeButtonContainer: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignSelf: 'center',
        shadowColor: '#000',
        ShadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 20,
        top: -20
    }
});

export default styles;