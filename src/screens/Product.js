import { useState, useRef, useEffect } from "react";
import { FlatList, TouchableOpacity, View, Image, StyleSheet, Text, Alert } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons"
import Spacer from "../components/Spacer";
import FormatCurrency from "../helpers/FormatCurrency";
import { useIsFocused } from "@react-navigation/native";

const Product = () => {
    const ref = useRef();
    const [selectCategory, setSelectCategory] = useState(null);
    const isFocused = useIsFocused();
    const [product, setProduct] = useState([]);
    const [isLoading, setLoading] = useState(true);


    const getList = () => {
        fetch('http://192.168.1.3:3000/api/getProduct')
            .then(response => response.json())
            .then((data) => { setProduct(data); setLoading(false); })
            .then((error) => console.log(error))
    }
    useEffect(() => {
        getList()
    }, [isFocused]);


    const category = [
        {
            id: 0,
            name: 'Cafe',
            img: 'https://i.pinimg.com/564x/ef/87/39/ef8739578ff5ccfdf76b381bd4627ecb.jpg',
        },
        {
            id: 1,
            name: 'Hi-Tea Soda',
            img: 'https://i.pinimg.com/564x/e9/9c/8c/e99c8c7bb773ee8b62bb506398aaed52.jpg',
        },
        {
            id: 2,
            name: 'Cafe Cup',
            img: 'https://i.pinimg.com/474x/97/9a/12/979a12cae125784267bc3c83a648e479.jpg',
        },
        {
            id: 3,
            name: 'Frosty',
            img: 'https://i.pinimg.com/474x/b6/b7/fd/b6b7fd021bf9e617cbc140fb73774204.jpg',
        },
    ];

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
            'Xóa Product?',
            `Bạn có muốn xóa Product có ID = ${idDelete}?`,
            [
                {
                    text: "Cancel",
                    onPress: () => ref.current?.close(),
                    style: 'cancel'
                },
                {
                    text: "OK",
                    onPress: () => {
                        fetch(`http://192.168.1.3:3000/api/${idDelete}/deleteProduct`, {
                            method: 'GET',
                        }).then((res) => { getList() })
                    },
                }
            ]
        );
    }

    return (
        <View style={Styles.container}>
            <Text style={Styles.titleCategory}>Danh mục</Text>
            <FlatList
                style={Styles.containerCateogry}
                data={category}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={Styles.itemCategory}
                        onPress={() => setSelectCategory(selectCategory === item.id ? null : item.id)}
                    >
                        <View>
                            <Image
                                style={Styles.imgCategory}
                                source={{ uri: item.img }}
                            />
                            <Text style={Styles.nameCategory}>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
            />

            <Text style={Styles.titleProduct}>Sản phẩm</Text>
            {isLoading
                ? <Text>Loading...</Text>
                : <FlatList
                    style={Styles.containerProduct}
                    data={product}
                    renderItem={({ item }) => (


                        <Swipeable ref={ref} renderRightActions={() => rightSwipe(item._id)}>
                            <View style={Styles.itemProduct}>
                                <View style={Styles.imgProductContainer}>
                                    <Image
                                        source={{ uri: 'https://i.pinimg.com/564x/e9/9c/8c/e99c8c7bb773ee8b62bb506398aaed52.jpg' }}
                                        style={Styles.imgProduct}
                                    />
                                </View>
                                <View style={Styles.infoProduct}>
                                    <View style={Styles.rowInfoProduct}>
                                        <Text numberOfLines={2} style={Styles.nameProduct}>{item.name}</Text>
                                    </View>
                                    <Spacer height={5} />
                                    <View style={Styles.rowInfoProduct}>
                                        <Text style={Styles.priceProduct}>{FormatCurrency(item.price)}</Text>
                                    </View>
                                </View>
                            </View>
                        </Swipeable>

                    )}
                    keyExtractor={item => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                />
            }
        </View>
    );
}

export default Product;

const Styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    titleCategory: {
        marginTop: 10,
        marginLeft: 20,
        fontWeight: 'bold',
        fontSize: 23,
    },
    containerCateogry: {
        marginTop: 10,
        maxHeight: 150,
    },
    itemCategory: {
        marginLeft: 15,
        marginRight: 15,
    },
    imgCategory: {
        width: 100,
        height: 100,
        borderRadius: 50,
        textAlign: 'center',
    },
    nameCategory: {
        textAlign: 'center',
        marginTop: 15,
        fontWeight: '600',
    },
    titleProduct: {
        marginTop: 10,
        marginLeft: 20,
        fontWeight: 'bold',
        fontSize: 23,
    },
    containerProduct: {
        flex: 1,
        marginTop: 10,
    },
    itemProduct: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 15,
    },
    imgProductContainer: {
        height: 120,
        width: 120,
    },
    imgProduct: {
        width: 120,
        height: 120,
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 0,
    },
    infoProduct: {
        marginTop: 5,
    },
    rowInfoProduct: {
        flexDirection: 'row',
    },
    nameProduct: {
        fontWeight: '600',
        fontSize: 16,
        marginLeft: 13,
        flexWrap: 'wrap',
        flexShrink: 1,
    },
    priceProduct: {
        fontSize: 14,
        marginLeft: 13,
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