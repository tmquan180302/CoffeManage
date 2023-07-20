import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import MainDrawer from './src/components/MainDrawer';
import AddStaff from  './src/screens/AddStaff'
import AddCustomer from './src/screens/AddCustomer';
import AddReceipt from './src/screens/AddReceipt';
import AddProduct from './src/screens/AddProduct';

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen name='LoginScreen' component={Login} options={{headerShown: false,}}/>
          <Stack.Screen name='SignUpScreen' component={SignUp} options={{headerShown:false,}}/>
          <Stack.Screen name='MainDrawer' component={MainDrawer} options={{headerShown: false,}}/>
          <Stack.Screen name='AddStaff' component={AddStaff} />
          <Stack.Screen name='AddCustomer' component={AddCustomer} />
          <Stack.Screen name='AddReceipt' component={AddReceipt} />
          <Stack.Screen name='AddProduct' component={AddProduct} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;