import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '../Routes';
import FirstScreen from '../Container/FirstScreen';
import Login from '../Container/Login';
import LoginMainScreen from '../Container/LoginMainScreen';
import SignUp from '../Container/SignUp';
import MainScreen from '../Container/MainScreen';
import Yarn from '../Container/Yarn';
import Fabric from '../Container/Fabric';
import ReviewScreen from '../Container/ReviewScreen';
import Checkout from '../Container/Checkout';
import MainTab from './MainTab';
import Payment from '../Container/Payment';
import ForgotPassword from '../Container/ForgotPassword';
import PdfScreen from '../Container/PdfScreen';
import OnBoard from '../Container/OnBoard';


const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={ROUTES.OnBoard}>
      <Stack.Screen name={ROUTES.OnBoard} component={OnBoard} options={{headerShown:false}}/>
      <Stack.Screen name={ROUTES.FirstScreen} component={FirstScreen} options={{headerShown:false}}/>
        <Stack.Screen name={ROUTES.Login} component={Login} options={{ headerShown: false}} />
        <Stack.Screen name={ROUTES.MainTab} component={MainTab} options={{headerShown:false}}/> 
        <Stack.Screen name={ROUTES.LoginMainScreen} component={LoginMainScreen} options={{headerShown:false}}/>
        <Stack.Screen name={ROUTES.ForgotPassword} component={ForgotPassword} options={{headerShown:false}}/>
        <Stack.Screen name={ROUTES.MainScreen} component={MainScreen} options={{headerShown:false}}/> 
        <Stack.Screen name={ROUTES.SignUp} component={SignUp} options={{headerShown:false}}/>
        <Stack.Screen name={ROUTES.Fabric} component={Fabric} options={{headerShown:false}}/>
        <Stack.Screen name={ROUTES.Yarn} component={Yarn} options={{headerShown:false}}/>
        <Stack.Screen name={ROUTES.Checkout} component={Checkout} options={{headerShown:false}}/> 
        <Stack.Screen name={ROUTES.ReviewScreen} component={ReviewScreen} options={{headerShown:false}}/>
        <Stack.Screen name={ROUTES.Payment} component={Payment} options={{headerShown:false}}/>
        <Stack.Screen name={ROUTES.PdfScreen} component={PdfScreen} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;