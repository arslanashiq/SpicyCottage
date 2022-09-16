import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import {imgx} from '../constants/Images';
import {URL} from '../constants/URLS';
import MyTextInput from '../components/MyTextInput';
import MyTextInputForPassword from '../components/MyTextInputForPassword';
import MyTouchableOpacity from '../components/MyTouchableOpacity';
import NavigationStrings from '../constants/navigationstring';
import {COLORX, Font, FONT} from '../constants/AppConstants';
import navigationstring from '../constants/navigationstring';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = props => {
  const [state, setstate] = useState({
    TogglePassView: true,
    Email: '',
    Password: '',
    IsLoading: false,
    IsPressed: false,
    Data: [],
  });
  const {Email, Password, TogglePassView, IsLoading, Data, IsPressed} = state;

  const updateState = data => setstate(state => ({...state, ...data}));

  const SaveUser = async user => {
    try {
      const myuser = JSON.stringify(user);
      await AsyncStorage.setItem('@UserData', myuser).then(() => {
        console.log('user Updated');
      });
    } catch (error) {
      console.log('error', error.message);
    }
  };

  const VerifyUser = () => {
    if (!IsLoading) {
      updateState({IsLoading: true});
      const url = URL.My_Database_Url + 'verifyuser';

      console.log('Into api');

      if (Email == '' || Password == '') {
        updateState({IsLoading: false});
        alert('Error');
      } else {
        const UploadDataCredentials = {
          email: Email,
          passwordHash: Password,
        };
        fetch(url, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(UploadDataCredentials),
        })
          .then(response => response.text())
          .then(async responseText => {
            let responseData = JSON.parse(responseText);
            if (responseData.status == 200) {
              console.log(responseData.user);
              SaveUser(responseData.user);
              props.navigation.replace(navigationstring.BOTTOMTABHOME);
            } else {
              updateState({IsLoading: false});

              Alert.alert('Invalid Email or Password');
            }
          })
          .catch(error => {
            updateState({IsLoading: false});
            alert('Request Error Check Your Internet');
            console.log(error, 'error from APi Check User');
          });
      }
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <ScrollView>
        <View
          style={{
            marginHorizontal: moderateScale(30),
            marginVertical: moderateVerticalScale(40),
            flex: 1,
          }}>
          <Text style={[Font.font24, {fontWeight: '700'}]}>Login Account</Text>
        </View>

        <View style={{flex: 1}}>
          <View
            style={{
              marginHorizontal: moderateScale(30),
              marginTop: moderateVerticalScale(15),
              flex: 1,
            }}>
            <MyTextInput 
              mylabel="Email"
              placeholder="Email Address"
              autoFocus={false}
              backgroundColor="white"
              color="black"
              placeholderTextColor="silver"
              myonchangetext={e => updateState({Email: e})}
            />
          </View>
        </View>

        <View style={{flex: 1}}>
          <View
            style={{
              marginHorizontal: moderateScale(30),
              marginTop: moderateVerticalScale(15),

              flex: 1,
            }}>
            <MyTextInputForPassword
              mylabel="Enter Password"
              // img={ShowPass}
              myicon2={TogglePassView ? imgx.hide_pass : imgx.show_pass}
              placeholder="••••••••"
              autoFocus={false}
              backgroundColor="white"
              color="black"
              placeholderTextColor="silver"
              iconpress={() => {
                updateState({TogglePassView: !TogglePassView});
              }}
              myonchangetext={e => updateState({Password: e})}
              secureTextEntry={TogglePassView}
            />
          </View>
        </View>

        <TouchableOpacity
          style={{
            marginHorizontal: moderateScale(30),
            marginTop: moderateVerticalScale(15),
            flexDirection: 'row-reverse',
          }}
          onPress={() =>
            props.navigation.navigate(navigationstring.FORGOTPASSWORD)
          }>
          <Text style={{color: 'orange', fontSize: 12}}>ForgetPassword?</Text>
        </TouchableOpacity>
        <View style={{flex: 1, marginVertical: moderateVerticalScale(60)}}>
        <MyTouchableOpacity
            disabled={IsLoading}
            myText="Login"
            // mycss={{borderRadius: 10}}
            mymulticolor={
              IsLoading
                ? ['#e3e3e3', '#e3e3e3', '#e3e3e3']
                : ['orange', 'orange', 'orange']
            }
            loader={IsLoading}
            myonpress={() => {
              VerifyUser();
            }}
          />
        </View>
      </ScrollView>

      <View
        style={{
          justifyContent: 'center',
          flex: 1,
          flexDirection: 'row',
          // backgroundColor:"red",
          alignItems: 'center',
        }}>
        <View>
          <Text
            style={{
              color: 'grey',
              fontSize: scale(12),
              fontWeight: '300',
            }}>
            Do not have an Account?{' '}
          </Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate(NavigationStrings.SIGNUP)}>
            <Text
              style={{
                fontSize: scale(12),
                fontWeight: '500',
                color: 'orange',
              }}>
              Signup Here
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
