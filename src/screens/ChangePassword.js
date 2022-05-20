import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import MyTextInput from '../components/MyTextInput';
import {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import MyTouchableOpacity from '../components/MyTouchableOpacity';

const ChangePassword = () => {
  const [state, setstate] = useState({
    OldPassword: '',
    NewPassword: '',
    AgainNewPassword: '',
  });
  const {OldPassword, NewPassword, AgainNewPassword} = state;

  const updateState = data => setstate(state => ({...state, ...data}));

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView>
        <View
          style={{
            marginHorizontal: moderateScale(20),
            marginVertical: moderateVerticalScale(10),
            flex: 1,
          }}>
          <View>
            <Text
              style={{
                marginTop: moderateVerticalScale(20),
                fontSize: scale(25),
                fontWeight: '700',
                color: 'black',
              }}>
              Change Password
            </Text>
          </View>
          <View style={{marginTop: moderateVerticalScale(10)}}>
            <Text style={{color: 'grey', fontWeight: '400'}}>
              Enter new Password carefully
            </Text>
          </View>
        </View>
        <View style={{flex: 1}}>
          <View style={{flex: 1}}>
            <View
              style={{
                marginHorizontal: moderateScale(15),
                marginVertical: moderateVerticalScale(5),
                flex: 1,
              }}>
              <MyTextInput
                mylabel="Old Password"
                placeholder="********"
                autoFocus={false}
                backgroundColor="#eeee"
                color="black"
                placeholderTextColor="silver"
                myonchangetext={e => updateState({OldPassword: e})}
                secureTextEntry={true}
              />
            </View>
          </View>

          <View style={{flex: 1}}>
            <View
              style={{
                marginHorizontal: moderateScale(15),
                marginVertical: moderateVerticalScale(5),
                flex: 1,
              }}>
              <MyTextInput
                mylabel="New Password"
                placeholder="********"
                autoFocus={false}
                backgroundColor="#eeee"
                color="black"
                placeholderTextColor="silver"
                myonchangetext={e => updateState({NewPassword: e})}
                secureTextEntry={true}
              />
            </View>
          </View>

          <View style={{flex: 1}}>
            <View
              style={{
                marginHorizontal: moderateScale(15),
                marginVertical: moderateVerticalScale(5),
                flex: 1,
              }}>
              <MyTextInput
                mylabel="Confirm New Password"
                placeholder="********"
                autoFocus={false}
                backgroundColor="#eeee"
                color="black"
                placeholderTextColor="silver"
                myonchangetext={e => updateState({AgainNewPassword: e})}
                secureTextEntry={true}
              />
            </View>
          </View>
        </View>
        <MyTouchableOpacity
          myText="Reset Password"
          mycss={{borderRadius: 10}}
          mymulticolor={['orange', 'orange', 'orange']}
          myonpress={() => {
            console.log(OldPassword);
            console.log(NewPassword);
            console.log(AgainNewPassword);
          }}
        />
        <View
          style={{
            flex: 1,
            marginHorizontal: moderateScale(20),
            flexDirection: 'row',
          }}></View>
      </ScrollView>
    </View>
  );
};

export default ChangePassword;
