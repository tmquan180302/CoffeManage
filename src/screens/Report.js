import { StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import  FormatCurrency from '../helpers/FormatCurrency'

const Report = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [formattedDate, setFormattedDate] = useState('');
    // const currentTime = new Date();
    // const day = currentTime.getDate();
    // const month = currentTime.getMonth() + 1;
    // const year = currentTime.getFullYear();
    // const formattedMonth = month < 10 ? `0${month}` : `${month}`;
    // const formattedTime = `${day}/${formattedMonth}/${year}`;
    const product = [
        {
            id: 0,
            idCategory: 0,
            name: 'Cà Phê Đen Đá',
            img: 'https://product.hstatic.net/1000075078/product/1639377797_ca-phe-den-da_3cef58a697ce4f408c61f6f3198cf560_large.jpg',
            price: 29000,
            desc: 'Caramel Macchiato sẽ mang đến một sự ngạc nhiên thú vị, ...',
        },
        {
            id: 1,
            idCategory: 0,
            name: 'Bạc Xỉu',
            img: 'https://product.hstatic.net/1000075078/product/1639377904_bac-siu_aa82c34bdd2748acaf9b93c71d1bb4fc_large.jpg',
            price: 29000,
            desc: 'Caramel Macchiato sẽ mang đến một sự ngạc nhiên thú vị, ...',
        },
        {
            id: 2,
            idCategory: 0,
            name: 'Cà Phê Sữa Đá',
            img: 'https://product.hstatic.net/1000075078/product/1669736835_ca-phe-sua-da_c68396379e9a419f921c22fa51abe846_large.png',
            price: 29000,
            desc: 'Caramel Macchiato sẽ mang đến một sự ngạc nhiên thú vị, ...',
        },
        {
            id: 3,
            idCategory: 1,
            name: 'Hi-Tea Yuzu Trân Châu',
            img: 'https://product.hstatic.net/1000075078/product/1669736859_hi-tea-yuzu-tran-chau_00ccb318460c4f2893c7f07e33e43883_large.png',
            price: 59000,
            desc: 'Caramel Macchiato sẽ mang đến một sự ngạc nhiên thú vị, ...',
        },
        {
            id: 4,
            idCategory: 1,
            name: 'Hi-Tea Dâu Tây Mận Muối Aloe',
            img: 'https://product.hstatic.net/1000075078/product/1679067492_hitea-man-muoi-dau-tay-ver2_ac61907202e54ed6906630da54d677ec_large.jpg',
            price: 59000,
            desc: 'Caramel Macchiato sẽ mang đến một sự ngạc nhiên thú vị, ...',
        },
        {
            id: 5,
            idCategory: 3,
            name: 'Frosty Bánh Kem Dâu',
            img: 'https://product.hstatic.net/1000075078/product/1686021305_banh-kem-dau-new_3628161404464f73bdd6873cdc739544_large.jpg',
            price: 59000,
            desc: 'Caramel Macchiato sẽ mang đến một sự ngạc nhiên thú vị, ...',
        },
        {
            id: 6,
            idCategory: 3,
            name: 'Frosty Choco Chip',
            img: 'https://product.hstatic.net/1000075078/product/1686021314_choco-chip-new_13d8dd57d3ea4aa18412a616c9ceda61_large.png',
            price: 59000,
            desc: 'Caramel Macchiato sẽ mang đến một sự ngạc nhiên thú vị, ...',
        },
    ];
    const order = [
        {
            id: 0,
            statusOrder: 0,
            date: '18/05/2023',
            time: '15:03',
        },
        {
            id: 1,
            statusOrder: 0,
            date: '12/07/2022',
            time: '14:20',
        },
        {
            id: 2,
            statusOrder: 1,
            date: '18/05/2022',
            time: '20:29',
        },
        {
            id: 3,
            statusOrder: 2,
            date: '16/06/2023',
            time: '00:42',
        },
    ];
    const orderDetail = [
        {
            id: 0,
            idOrder: 0,
            idProduct: 3,
        },
        {
            id: 1,
            idOrder: 0,
            idProduct: 1,
        },
        {
            id: 2,
            idOrder: 0,
            idProduct: 5,
        },
        {
            id: 3,
            idOrder: 0,
            idProduct: 2,
        },
        {
            id: 4,
            idOrder: 0,
            idProduct: 2,
        },
        {
            id: 5,
            idOrder: 0,
            idProduct: 2,
        },
        {
            id: 6,
            idOrder: 1,
            idProduct: 4,
        },
        {
            id: 7,
            idOrder: 2,
            idProduct: 6,
        },
        {
            id: 8,
            idOrder: 2,
            idProduct: 0,
        },
        {
            id: 9,
            idOrder: 3,
            idProduct: 4,
        },
        {
            id: 10,
            idOrder: 3,
            idProduct: 6,
        },
    ];

    const handleDateChange = (event, date) => {
        if (date !== undefined) {
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            const formattedMonth = month < 10 ? `0${month}` : `${month}`;
            setFormattedDate(`${day}/${formattedMonth}/${year}`);
            setSelectedDate(date);
        }
    };


    const getTotalOrder = (status) => {
        let result = 0;
        for (let orderItem of order) {
            if (orderItem.date === formattedDate) {
                switch (status) {
                    case 'totalOrder': {
                        result++;
                        continue;
                    }
                    case 'totalProduct': {
                        for (let orderDetailItem of orderDetail) {
                            if (orderItem.id === orderDetailItem.idOrder) {
                                result++;
                            }
                        }
                        continue;
                    }
                    case 'revenue': {
                        for (let orderDetailItem of orderDetail) {
                            if (orderItem.id === orderDetailItem.idOrder) {
                                    result += product.find(p => p.id === orderDetailItem.idProduct).price;
                            }
                        }
                        continue;
                    }
                }
            }
        }
        return result;
    }

    return (
        <View style={Styles.container}>
            <View style={Styles.datePickerContainer}>
                <DateTimePicker
                    style={Styles.datePicker}
                    value={selectedDate}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                />
            </View>
            <View style={Styles.itemRow}>
                <Text style={Styles.title}>Số lượng đơn hàng</Text>
                <Text style={Styles.result}>{getTotalOrder('totalOrder')}</Text>
            </View>
            <View style={Styles.itemRow}>
                <Text style={Styles.title}>Số lượng sản phẩm</Text>
                <Text style={Styles.result}>{getTotalOrder('totalProduct')}</Text>
            </View>
            <View style={Styles.itemRow}>
                <Text style={Styles.title}>Doanh thu</Text>
                <Text style={Styles.result}>{FormatCurrency(getTotalOrder('revenue'))}</Text>
            </View>
        </View>
    )
}

export default Report;

const Styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    datePickerContainer: {
        width: '100%',
        alignItems: 'center',
        marginVertical: 10,
        // backgroundColor: 'red',
    },
    datePicker: {
        width: 100,
        // backgroundColor: 'red',
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        padding: 10,
        backgroundColor: 'white',
        borderTopWidth: .3,
        borderBottomWidth: .3,
        borderColor: '#ccc',
    },
    title: {
        fontSize: 16,
    },
    result: {
        fontSize: 16,
    },
});