import { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, View, Image, Text, TouchableOpacity, Alert, } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons"
import Spacer from "../components/Spacer";
import { useIsFocused, useNavigation } from "@react-navigation/native";

const Staff = () => {
    const navigation = useNavigation();
    const ref = useRef();
    const isFocused = useIsFocused();
    const [list, setList] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const getList = () => {
        fetch('http://192.168.1.3:3000/api/getStaff')
            .then(response => response.json())
            .then((data) => { setList(data); setLoading(false); })
            .then((error) => console.log(error))
    }
    useEffect(() => {
        getList()
    }, [isFocused]);



    const rightSwipe = (item) => {
        return (
            <View style={Styles.containerSwpie}>
                <TouchableOpacity style={Styles.editSwipe} onPress={() => onEdit(item)} >
                    <Ionicons name='create-sharp' color={'white'} size={30} />
                </TouchableOpacity>
                <TouchableOpacity style={Styles.deleteSwipe} onPress={() => onDelete(item)} >
                    <Ionicons name='trash-sharp' color={'white'} size={30} />
                </TouchableOpacity>
            </View>
        );
    }

    const onDelete = (idDelete) => {
        Alert.alert(
            'Xóa Staff?',
            `Bạn có muốn xóa Staff có ID = ${idDelete}?`,
            [
                {
                    text: "Cancel",
                    onPress: () => ref.current?.close(),
                    style: 'cancel'
                },
                {
                    text: "OK",
                    onPress: () => {
                        fetch(`http://192.168.1.3:3000/api/${idDelete}/deleteStaff`, {
                            method: 'GET',
                        }).then((res) => { getList() })
                    },
                }
            ]
        );
    }

    const onEdit = (idEdit) => {
        navigation.navigate('AddStaff',{
            id : idEdit.id,
            password : idEdit.password,
            role : idEdit.role,
            name : idEdit.name,
            phone : idEdit.phone
        })
     }

    return (
        <View style={Styles.container}>
            {isLoading
                ? <Text>Loading...</Text>
                : <FlatList
                    style={Styles.containerStaff}
                    data={list}
                    renderItem={({ item }) => (
                        <Swipeable ref={ref} renderRightActions={() => rightSwipe(item._id)}>
                            <View style={Styles.item}>
                                <View style={Styles.avatarContainer}>
                                    <Image
                                        source={{ uri: 'https://i.pinimg.com/564x/6b/31/33/6b31330ed51b2641e2f19cd73da784d3.jpg' }}
                                        style={Styles.avatar}
                                    />
                                </View>
                                <View style={Styles.infoStaff}>
                                    <View style={Styles.rowInfoStaff}>
                                        <Text numberOfLines={2} style={Styles.name}>{item.name}</Text>
                                    </View>
                                    <Spacer height={5} />
                                    <View style={Styles.rowInfoStaff}>
                                        <Text style={Styles.position}>{item.role}</Text>
                                    </View>
                                    <View style={Styles.contactInfoStaff}>
                                        <View style={Styles.rowInfoStaff}>
                                            <Text style={Styles.phone}>Phone: {item.phone}</Text>
                                        </View>
                                        <Spacer height={2} />
                                        <View style={Styles.rowInfoStaff}>
                                            <Text style={Styles.email}>DateOfBirth: {item.dateOfBirth}</Text>
                                        </View>

                                    </View>
                                </View>
                            </View>
                        </Swipeable>
                    )}
                    keyExtractor={item => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                />}
        </View>
    );
}

export default Staff;

const Styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    containerStaff: {
        flex: 1,
        marginTop: 10,
    },
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
    infoStaff: {
        marginTop: 5,
    },
    rowInfoStaff: {
        flexDirection: 'row',
    },
    name: {
        fontWeight: '600',
        fontSize: 18,
        marginLeft: 13,
        flexWrap: 'wrap',
        flexShrink: 1,
    },
    position: {
        fontSize: 15,
        marginLeft: 13,
    },
    contactInfoStaff: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        marginBottom: 10,
    },
    phone: {
        marginLeft: 13,
        fontSize: 13,
    },
    email: {
        marginLeft: 13,
        fontSize: 13,
    },
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
});