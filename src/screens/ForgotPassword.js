import { View, Text,ScrollView,TouchableOpacity } from 'react-native'
import React ,{useState}from 'react'
import MyTextInput from '../components/MyTextInput'
import {
    scale,
    verticalScale,
    moderateScale,
    moderateVerticalScale,
  } from 'react-native-size-matters';
import MyTouchableOpacity from '../components/MyTouchableOpacity'
import navigationstring from '../constants/navigationstring';
import { font } from '../constants/font';
import { COLORX } from '../constants/AppConstants';

const ForgotPassword = (props) => {
  const [state, setstate] = useState({
    Email:'',
    
  });
  const {
    Email,
    
  } = state;

  const updateState = data => setstate(state => ({...state, ...data}));
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView>
        <View
          style={{
            marginHorizontal: moderateScale(20),
            marginVertical: moderateVerticalScale(40),
            flex: 1,
          }}>
          <View>
            <Text
              style={{
                marginTop: moderateVerticalScale(20),
                fontSize: scale(font.heading_font),
                fontWeight: '700',
                color: 'black',
              }}>
              Forgot Password
            </Text>
          </View>
          <View style={{marginTop: moderateVerticalScale(10)}}>
            <Text style={{fontSize: scale(font.text_font),color: 'grey', fontWeight: '400'}}>
              You will recieve your reset password on your Email
            </Text>
          </View>
        </View>
        <View style={{flex: 1}}>
          <View style={{flex: 1}}>
            <View
              style={{
                marginHorizontal: moderateScale(15),
                marginVertical: moderateVerticalScale(15),
                flex: 1,
              }}>
              <MyTextInput
                mylabel="Email"
                placeholder="example@gmail.com"
                autoFocus={false}
                backgroundColor="#eeee"
                color="black"
                placeholderTextColor="silver"
                myonchangetext={e => updateState({Email:e})}
              />
            </View>
          </View>
          
          
        </View>
        <View style={{flex: 1, marginVertical: moderateVerticalScale(50)}}>
          <MyTouchableOpacity
            myText="Reset Passowrd"
            // mycss={{borderRadius: 10}}
            mymulticolor={[
              "orange",
              "orange",
              "orange"
            ]}
            myonpress={() => {
              props.navigation.navigate(navigationstring.OTP)
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            marginHorizontal: moderateScale(20),
            flexDirection: 'row',
          }}>
          
        </View>
      </ScrollView>
    </View>
  )
}

export default ForgotPassword