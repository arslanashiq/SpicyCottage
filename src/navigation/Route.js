
import React from 'react';
import navigationstring from '../constants/navigationstring';
import {
  CHANGEPASSWORD,
  FORGOTPASSWORD,
  LOGIN,
  ONBOARDING,
  OTP,
  SETTING,
  SIGNUP,
  SPLASH,
  EDITPROFILE,
  CATEGORYDETAILSCREEN,
  ITEMDETAILSCREEN,
  CHECKOUTSCREEN,
  ADMINORDERREQUEST,
  ADMINORDERREQUESTDETAIL,
  

} from '../screens';
import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';
import BOTTOMTABHOME from './BOTTOMTAB'
import ADMINBOTTOMTAB from './ADMINBOTTOMTAB';


const Stack = createStackNavigator();

function Route() {
  return (
     <Stack.Navigator
      initialRouteName={navigationstring.SPLASH}
      screenOptions={{
        animationEnabled: true,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        ...TransitionPresets.SlideFromRightIOS,
        headerShown: false,
        headerMode: 'screen',
      }}>
        <Stack.Screen name={navigationstring.CHANGEPASSWORD} component={CHANGEPASSWORD}/>
        <Stack.Screen name={navigationstring.FORGOTPASSWORD} component={FORGOTPASSWORD} />
        <Stack.Screen  name={navigationstring.LOGIN} component={LOGIN} />
        <Stack.Screen name={navigationstring.ONBOARDING} component={ONBOARDING}/>
        <Stack.Screen name={navigationstring.OTP} component={OTP} />
        <Stack.Screen name={navigationstring.SETTING} component={SETTING} />
        <Stack.Screen name={navigationstring.SIGNUP} component={SIGNUP} />
        <Stack.Screen name={navigationstring.SPLASH} component={SPLASH} />
        <Stack.Screen name={navigationstring.ITEMDETAIL} component={ITEMDETAILSCREEN} />
        <Stack.Screen name={navigationstring.BOTTOMTABHOME} component={BOTTOMTABHOME} />
        <Stack.Screen name={navigationstring.EDITPROFILE} component={EDITPROFILE} />
        <Stack.Screen name={navigationstring.CATEGORYDETAIL} component={CATEGORYDETAILSCREEN} />
        <Stack.Screen name={navigationstring.CHECKOUT} component={CHECKOUTSCREEN} />




{/* Admin Screens */}
        <Stack.Screen name={navigationstring.ADMINBOTTOMTAB} component={ADMINBOTTOMTAB} />
        <Stack.Screen name={navigationstring.ADMINORDERREQUEST} component={ADMINORDERREQUEST} />
        <Stack.Screen name={navigationstring.ADMINORDERREQUESTDETAIL} component={ADMINORDERREQUESTDETAIL} />

        
      </Stack.Navigator>
      
  );
};

export default Route;
