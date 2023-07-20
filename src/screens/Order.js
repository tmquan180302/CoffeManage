import { useState, useRef, useEffect } from "react";
import { FlatList, StyleSheet, View, Text, TouchableOpacity, Image, Alert } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons"
import Spacer from "../components/Spacer";
import FormatCurrency from "../helpers/FormatCurrency";
import { useIsFocused } from "@react-navigation/native";

const Order = () => {
    const ref = useRef();
    const isFocused = useIsFocused();
    const [list, setList] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState(0);
    const statusOrder = [
        {
            id: 0,
            status: 'Đang thực hiện'
        },
        {
            id: 1,
            status: 'Đã hoàn tất'
        },
        {
            id: 2,
            status: 'Đã hủy'
        },
    ];


    const getList = () => {
        fetch('http://192.168.1.3:3000/api/getReceipt')
            .then(response => response.json())
            .then((data) => { setList(data); setLoading(false); })
            .then((error) => console.log(error))
    }
    useEffect(() => {
        getList()
    }, [isFocused]);




    const getInfoProductFromOrder = (id, status) => {
        let listProductDetail = [];
        const listOrderDetail = orderDetail.filter(item => item.idOrder === id);

        for (let item of listOrderDetail) {
            listProductDetail.push(product.find(it => it.id === item.idProduct));
        }

        switch (status) {
            case 'getName()': {
                let nameProduct = '';
                let totalProduct = listProductDetail.length;

                for (let item of listProductDetail) {
                    nameProduct += item.name + (totalProduct == 1 ? '' : ', ');
                    --totalProduct;
                    if (listProductDetail.length != 2 && listProductDetail.length - totalProduct == 2) {
                        nameProduct += ` ${totalProduct} sản phẩm khác`;
                        return nameProduct;
                    }
                }
                return nameProduct;
            }
            case 'getPrice()': {
                let totalPrice = 0;
                for (let item of listProductDetail) {
                    totalPrice += item.price;
                }
                return totalPrice;
            }
        }
    }

    const checkSeparator = (item) => {
        let list = [];
        if (item.statusOrder == selectedItem) {
            for (let obj of order) {
                if (obj.statusOrder == selectedItem) {
                    list.push(obj);
                }
            }
        }

        if (list.length == 1) {
            return false;
        }
        else if (list.findIndex(i => i.id == item.id) == list.length - 1) {
            return false;
        }
        else {
            return true;
        }
    }

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
            'Xóa Order?',
            `Bạn có muốn xóa Order có ID = ${idDelete}?`,
            [
                {
                    text: "Cancel",
                    onPress: () => ref.current?.close(),
                    style: 'cancel'
                },
                {
                    text: "OK",
                    onPress: () => {
                        fetch(`http://192.168.1.3:3000/api/${idDelete}/deleteReceipt`, {
                            method: 'GET',
                        }).then((res) => { getList() })
                    },
                }
            ]
        );
    }


    return (
        <View style={Styles.container}>

            <FlatList
                style={Styles.containerStatusOrder}
                data={statusOrder}
                renderItem={({ item }) => (
                    <TouchableOpacity style={[Styles.containerStatusOrderItem, selectedItem === item.id && Styles.selectedItem]} onPress={() => setSelectedItem(item.id)}>
                        <Text style={[Styles.statusOrder, selectedItem === item.id && Styles.selectedText]}>{item.status}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
            {isLoading
                ? <Text>Loading...</Text>
                : <FlatList
                    style={Styles.containerOrder}
                    data={list}
                    renderItem={({ item }) => (
                        <Swipeable ref={ref} renderRightActions={() => rightSwipe(item._id)}>
                            <View style={Styles.itemOrder}>
                                <View style={Styles.imgOrderContainer}>
                                    <Image
                                        style={Styles.imgOrder}
                                        source={{ uri: 'https://i.pinimg.com/564x/44/eb/bf/44ebbf137cf770e9a5c3ae39da5c323b.jpg' }}
                                    />
                                </View>
                                <View style={Styles.infoOrder}>
                                    <Text numberOfLines={2} style={Styles.infoNameProductOrder}>{item.selectedProduct}</Text>
                                    <Spacer height={10} />
                                    <Text style={Styles.infoDateTimeProductOrder}>{item.selectedCustomer}</Text>
                                    <Spacer height={10} />
                                    <Text style={Styles.infoDateTimeProductOrder}>{item.date}</Text>
                                </View>
                                <View style={Styles.infoPriceOrder}>
                                    <Text style={Styles.infoPriceProductOrder}>{item.total} vnđ</Text>
                                </View>
                                
                            </View>
                        </Swipeable>
                    )}
                    keyExtractor={item => item._id}
                    ListHeaderComponentStyle={Styles.listHeader}
                />
            }
        </View>
    );
}

export default Order;

const Styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    containerStatusOrder: {
        marginTop: 15,
        marginLeft: 15,
        maxHeight: 30,
    },
    containerStatusOrderItem: {
        // backgroundColor: '#dedede',
        borderRadius: 50,
        paddingHorizontal: 12,
        paddingVertical: 6,
        justifyContent: 'center',
        marginRight: 15,
    },
    statusOrder: {
        fontWeight: '400',
        fontSize: 14,
        color: '#FE8B00',
    },
    selectedItem: {
        backgroundColor: '#FE8B00'
    },
    selectedText: {
        color: '#F7F7F7'
    },
    containerOrder: {
        marginTop: 10,
        marginLeft: 15,
    },
    itemOrder: {
        flexDirection: 'row',
        // backgroundColor: 'red',
        minHeight: 90,
        alignItems: 'center',
        marginRight: 15,
        marginTop : 15
    },
    itemOrderSeparator: {
        flexDirection: 'row',
        // backgroundColor: 'red',
        minHeight: 90,
        alignItems: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: .3,
        marginRight: 15,
    },
    imgOrderContainer: {
        width: 50,
        height: 50,
    },
    imgOrder: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    infoOrder: {
        flex: 1,
        maxWidth: 250,
        marginLeft: 15,
        // backgroundColor: 'yellow',
    },
    infoNameProductOrder: {
        fontWeight: 'bold',
        fontSize: 16,
        flexWrap: 'wrap',
        lineHeight: 23,
    },
    infoDateTimeProductOrder: {
        color: '#333'
    },
    infoPriceOrder: {
        marginLeft: 'auto',
        alignItems: 'flex-end',
    },
    infoPriceProductOrder: {
        marginLeft: 10,
        marginTop: 20,
        color: '#333',
        alignContent: 'flex-end',
        fontSize: 16,
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