import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState, useLayoutEffect} from 'react';
import {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import MyTextInputForPassword from '../components/MyTextInputForPassword';
import MyTouchableOpacity from '../components/MyTouchableOpacity';
import {URL} from '../constants/URLS';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {imgx} from '../constants/Images';
import navigationstring from '../constants/navigationstring';
const ChangePassword = (props) => {



  
  const [state, setstate] = useState({
    OldPassword: '',
    NewPassword: '',
    AgainNewPassword: '',
    User: [],
    TogglePassView1: true,
    TogglePassView2: true,
    TogglePassView3: true,
    DataFetched:false,
  });
  const {
    OldPassword,
    User,
    TogglePassView1,
    DataFetched,
    TogglePassView2,
    TogglePassView3,
    NewPassword,
    AgainNewPassword,
  } = state;

  const updateState = data => setstate(state => ({...state, ...data}));

  const updateUser = () => {
    console.log('ID', User.id);
    const url = URL.My_Database_Url + 'users/' + User.id;
    console.log('Url', url);
    if (OldPassword == '' || NewPassword == '' || AgainNewPassword == '' ) {
      alert("Please Fill all Feilds")
      return;
    } 
    else if (OldPassword!=User.passwordHash||NewPassword!=AgainNewPassword)
    {
      alert("Password do not Match")
    }
    else {
      console.log('Into api');
      const UploadDataCredentials = {
        first_name: User.first_name,
        last_name: User.last_name,
        email: User.email,
        passwordHash: NewPassword,
        bio: User.bio,
      };
      console.log(JSON.stringify(UploadDataCredentials));
      fetch(url, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(UploadDataCredentials),
      })
        .then(response => response.text())
        .then(async responseText => {
          let responseData = JSON.parse(responseText);
          console.log('responseData', responseData);
          if (responseData.status == 200) {
            AsyncStorage.removeItem('@UserData');
            props.navigation.replace(navigationstring.LOGIN);
          } else {
            console.log('fail');
          }
        })
        .catch(error => {
          console.log(error, 'error from APi UploadData1212');
        });
    }
  };
  const GetUser = async () => {
    try {
      const myuser = await AsyncStorage.getItem('@UserData');

      console.log('User State', User);

      setTimeout(() => {
        updateState({
          User: JSON.parse(myuser),
          DataFetched:true
        });

      }, 400);
    } catch (error) {
      console.log('error', error.message);
    }
  };
  useLayoutEffect(() => {
    GetUser();
  }, [DataFetched]);


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
              <MyTextInputForPassword
                mylabel="Old Password"
                // img={ShowPass}
                myicon2={TogglePassView1 ? imgx.hide_pass : imgx.show_pass}
                placeholder="••••••••"
                autoFocus={false}
                backgroundColor="white"
                color="black"
                placeholderTextColor="silver"
                iconpress={() => {
                  updateState({TogglePassView1: !TogglePassView1});
                }}
                myonchangetext={e => updateState({OldPassword: e})}
                secureTextEntry={TogglePassView1}
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
              <MyTextInputForPassword
                mylabel="New Password"
                // img={ShowPass}
                myicon2={TogglePassView2 ? imgx.hide_pass : imgx.show_pass}
                placeholder="••••••••"
                autoFocus={false}
                backgroundColor="white"
                color="black"
                placeholderTextColor="silver"
                iconpress={() => {
                  updateState({TogglePassView2: !TogglePassView2});
                }}
                myonchangetext={e => updateState({NewPassword: e})}
                secureTextEntry={TogglePassView2}
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
              <MyTextInputForPassword
                mylabel="Again New Password"
                // img={ShowPass}
                myicon2={TogglePassView3 ? imgx.hide_pass : imgx.show_pass}
                placeholder="••••••••"
                autoFocus={false}
                backgroundColor="white"
                color="black"
                placeholderTextColor="silver"
                iconpress={() => {
                  updateState({TogglePassView3: !TogglePassView3});
                }}
                myonchangetext={e => updateState({AgainNewPassword: e})}
                secureTextEntry={TogglePassView3}
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
            updateUser();
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
