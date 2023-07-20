import { useEffect, useRef, useState } from "react";
import { View, StyleSheet, FlatList, Text, Image, TouchableOpacity, Alert } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons"
import Spacer from "../components/Spacer";
import { useIsFocused } from "@react-navigation/native";

const Customer = () => {
    const ref = useRef();
    const isFocused = useIsFocused();
    const [list, setList] = useState([]);
    const [isLoading, setLoading] = useState(true);


    const getList = () => {
        fetch('http://192.168.1.3:3000/api/getCustomer')
            .then(response => response.json())
            .then((data) => { setList(data); setLoading(false); })
            .then((error) => console.log(error))
    }
    useEffect(() => {
        getList()
    }, [isFocused]);


    const rightSwipe = (id) => {
        return (
            <View style={Styles.containerSwpie}>
                <TouchableOpacity style={Styles.editSwipe} onPress={() => ref.current?.close()} >
                    <Ionicons name='create-sharp' color={'white'} size={30} />
                </TouchableOpacity>
                <TouchableOpacity style={Styles.deleteSwipe} onPress={() => onDelete(id)} >
                    <Ionicons name='trash-sharp' color={'white'} size={30} />
                </TouchableOpacity>
            </View>
        );
    }

    const onDelete = idDelete => {
        Alert.alert(
            'Xóa Customer?',
            `Bạn có muốn xóa Customer có ID = ${idDelete}?`,
            [
                {
                    text: "Cancel",
                    onPress: () => ref.current?.close(),
                    style: 'cancel'
                },
                {
                    text: "OK",
                    onPress: () => {
                        fetch(`http://192.168.1.3:3000/api/${idDelete}/deleteCustomer`, {
                            method: 'GET',
                        }).then((res) => { getList() })
                    },
                }
            ]
        );
    }

    return (
        <View style={Styles.container}>
            {isLoading
                ? <Text>Loading...</Text>
                : <FlatList
                    style={Styles.containerCustomer}
                    data={list}
                    renderItem={({ item }) => (
                        <Swipeable ref={ref} renderRightActions={() => rightSwipe(item._id)}>
                            <View style={Styles.item}>
                                <View style={Styles.avatarContainer}>
                                    <Image
                                        source={{ uri: 'https://i.pinimg.com/564x/64/37/05/64370541d9b8e5107b33afe98bc2b988.jpg' }}
                                        style={Styles.avatar}
                                    />
                                </View>
                                <View style={Styles.info}>
                                    <View style={Styles.rowInfo}>
                                        <Text style={Styles.name}>{item.name}</Text>
                                    </View>
                                    <Spacer height={5} />
                                    <View style={Styles.rowInfo}>
                                        <Text style={Styles.email}>{item.adress}</Text>
                                    </View>
                                    <Spacer height={5} />
                                    <View style={Styles.rowInfo}>
                                        <Text style={Styles.email}>{item.phone}</Text>
                                    </View>
                                </View>
                            </View>
                        </Swipeable>
                    )
                    }
                    keyExtractor={(item) => item.id}
                />
            }
        </View>
    )
}

export default Customer;

const Styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    containerCustomer: {
        marginTop: 10,
        flex: 1,
    },
    // listHeader: {
    //     height: 55,
    //     alignItems: 'center',
    //     justifyContent: "center",
    // },
    // listHeaderLine: {
    //     color: '#333',
    //     fontSize: 21,
    //     fontWeight: 'bold',
    // },
    item: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 15,
    },
    avatarContainer: {
        height: 120,
        width: 120,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 0,
    },
    info: {
        marginTop: 5,
    },
    rowInfo: {
        flexDirection: 'row',
    },
    name: {
        fontWeight: '600',
        fontSize: 16,
        marginLeft: 13,
    },
    email: {
        fontSize: 14,
        marginLeft: 13,
    },
    // address: {
    //     fontSize: 14,
    //     marginLeft: 13,
    // },
    containerSwpie: {
        backgroundColor: 'white',
        height: '100%',
    },
    editSwipe: {
        width: 100,
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0F9D58',
    },
    deleteSwipe: {
        width: 100,
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF4444',
    },
    // separator: {
    //     height: 1,
    //     width: '100%',
    //     backgroundColor: '#cccccc',
    // },
});