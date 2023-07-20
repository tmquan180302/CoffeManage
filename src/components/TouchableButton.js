import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const TouchableButon = (
    {
        title,
        textStyle,
        containerStyle,
        buttonStyle,
        ...rest
    }
) => {
    return (
        <View style={[Styles.container, containerStyle]}>
            <TouchableOpacity
                {...rest}
                style={[Styles.touchableStyle, buttonStyle]}
            >
                <View style={Styles.interaView}>
                    <Text style={[Styles.textStyle, textStyle]}>{title}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default TouchableButon;

const Styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 15,
        height: 50,
    },
    touchableStyle: {
        width: '100%',
        height: '100%',
        backgroundColor: '#226ddcff',
        borderRadius: 60,
    },
    interaView: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        // backgroundColor: '#226ddcff',
        borderRadius: 60,
    },
    textStyle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'balck',
        textTransform: 'uppercase',
    },
});