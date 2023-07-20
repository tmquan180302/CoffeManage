import 'react-native-gesture-handler';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Text, View, Image, StyleSheet, useWindowDimensions, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import Ionicons from "react-native-vector-icons/Ionicons"
import Spacer from './Spacer';
import Home from '../screens/Home';
import Product from '../screens/Product';
import Customer from '../screens/Customer';
import Order from '../screens/Order';
import Staff from '../screens/Staff';
import Report from '../screens/Report';

const Drawer = createDrawerNavigator();

const UserView = () => {
  return (
    <View style={Styles.containerHeader}>
      <Image
        source={{ uri: 'https://i.pinimg.com/564x/7d/f6/f0/7df6f0489da9c03c3db4888c1e3447ac.jpg' }}
        style={Styles.imgHeader} />
      <Text style={Styles.titleHeader}>Nhóm 1</Text>
      <Spacer height={5} />
      <Text>nhom1@gmail.com</Text>
    </View>
  );
}

const CustomDrawer = ({ navLogout, ...props }) => {
  return (
    <View style={{ flex: 1, }}>
      <UserView />
      <DrawerContentScrollView {...props} >
        <DrawerItemList state={props.state} descriptors={props.descriptors}
          {...props} />
      </DrawerContentScrollView>
      <DrawerItem label='Log Out'
        onPress={() => { navLogout.navigate('LoginScreen') }}
        icon={({ size, color }) => {
          return <Ionicons name='log-out' size={size} color={color} />
        }}
      />
    </View>
  );
}

const MainDrawer = () => {
  const dimension = useWindowDimensions();
  const drawerType = dimension.width >= 700 ? 'permanent' : 'front';
  const navigation = useNavigation();

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: Styles.drawerContainer,
        drawerType: { drawerType },
      }}
      drawerContent={(props) => <CustomDrawer navLogout={navigation} {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerIcon: ({ color, size }) => {
            return <Ionicons name='home' color={color} size={size} />
          },
          drawerActiveTintColor: '#A47C58',
          drawerLabelStyle: {
            fontSize: 17,
            fontWeight: 'bold',
          },
        }}
      />
      <Drawer.Screen
        name="Product"
        component={Product}
        options={{
          drawerIcon: ({ color, size }) => {
            return <Ionicons name='cart' color={color} size={size} />
          },
          drawerActiveTintColor: '#A47C58',
          drawerLabelStyle: {
            fontSize: 17,
            fontWeight: 'bold',
          },
          headerRight: () => (
            <TouchableHighlight onPress={()=> navigation.navigate('AddProduct')}>
              <Image source={require("../../assets/add_icon.png")} style={{ width: 25, height: 25, marginRight: 10 }} ></Image>
            </TouchableHighlight>
          )
        }}
      />
      <Drawer.Screen
        name="Customer"
        component={Customer}
        options={{
          drawerIcon: ({ color, size }) => {
            return <Ionicons name='person' color={color} size={size} />
          },
          drawerActiveTintColor: '#A47C58',
          drawerLabelStyle: {
            fontSize: 17,
            fontWeight: 'bold',
          },
          headerRight: () => (
            <TouchableHighlight onPress={()=> navigation.navigate('AddCustomer')}>
              <Image source={require("../../assets/add_icon.png")} style={{ width: 25, height: 25, marginRight: 10 }} ></Image>
            </TouchableHighlight>
          )
        }}
      />
      <Drawer.Screen
        name="Order"
        component={Order}
        options={{
          drawerIcon: ({ color, size }) => {
            return <Ionicons name='receipt' color={color} size={size} />
          },
          drawerActiveTintColor: '#A47C58',
          drawerLabelStyle: {
            fontSize: 17,
            fontWeight: 'bold',
          },
          headerRight: () => (
            <TouchableHighlight onPress={()=> navigation.navigate('AddReceipt')}>
              <Image source={require("../../assets/add_icon.png")} style={{ width: 25, height: 25, marginRight: 10 }} ></Image>
            </TouchableHighlight>
          )
        }}
      />
      <Drawer.Screen
        name="Staff"
        component={Staff}
        options={{
          drawerIcon: ({ color, size }) => {
            return <Ionicons name='people' color={color} size={size} />
          },
          drawerActiveTintColor: '#A47C58',
          drawerLabelStyle: {
            fontSize: 17,
            fontWeight: 'bold',
          },
          headerRight: () => (
            <TouchableHighlight onPress={()=> navigation.navigate('AddStaff')}>
              <Image source={require("../../assets/add_icon.png")} style={{ width: 25, height: 25, marginRight: 10 }} ></Image>
            </TouchableHighlight>
          )
        }}
      />
      <Drawer.Screen
        name="Report"
        component={Report}
        options={{
          drawerIcon: ({ color, size }) => {
            return <Ionicons name='analytics' color={color} size={size} />
          },
          drawerActiveTintColor: '#A47C58',
          drawerLabelStyle: {
            fontSize: 17,
            fontWeight: 'bold',
          },
          headerRight: () => (
            <TouchableHighlight onPress={()=> navigation.navigate('AddStaff')}>
              <Image source={require("../../assets/add_icon.png")} style={{ width: 25, height: 25, marginRight: 10 }} ></Image>
            </TouchableHighlight>
          )
        }}
      />
    </Drawer.Navigator>
  );
}

export default MainDrawer;

const Styles = StyleSheet.create({
  drawerContainer: {
    width: 280,
    backgroundColor: 'white',
  },
  containerHeader: {
    height: 225,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#A47C58',
    marginBottom: -20
  },
  imgHeader: {
    width: 125,
    height: 125,
    borderRadius: 100,
    borderColor: 'black',
    borderWidth: 4,
    marginBottom: 5,
    marginTop: 15,
  },
  titleHeader: {
    fontWeight: 'bold',
    fontSize: 26
  },
});
