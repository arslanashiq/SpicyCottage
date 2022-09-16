import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
// import NavigationStrings from '../constants/NavigationStrings';
const Header = ({
  Is_left_icon,
  left_onpress,
  left_style,
  left_icon,

  Is_header_center,
  header_style,
  header_text = '',

  Is_right_icon,
  right_onpress,
  right_style,
  right_icon,
}) => {
  const [state, setstate] = useState({
    Data: [],
  });
  const {Data} = state;
  const updateState = data => setstate(state => ({...state, ...data}));

  const CartToken = async () => {
    try {
      const myresponse = await AsyncStorage.getItem('@StoreData').then(
        value => {
          updateState({
            Data: JSON.parse(value),
          });

          console.log(Data,"Data in header")
        },
      );
    } catch (error) {
      console.log('Get store data error ', error.message);
    }
    console.log("myresponse",myresponse)
  };
  useEffect(() => {
    CartToken();

    
  }, []);

  return (
    <View
      style={{
        paddingTop: moderateVerticalScale(20),
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      {Is_left_icon ? (
        <TouchableOpacity onPress={left_onpress}>
          <Image style={left_style} source={left_icon} />
        </TouchableOpacity>
      ) : (
        <View></View>
      )}

      <View
        style={{
          flex: 1,
          alignItems: Is_header_center ? 'center' : 'flex-start',
          paddingLeft: !Is_header_center
            ? moderateScale(0)
            : Is_right_icon
            ? moderateScale(20)
            : moderateScale(0),
          paddingRight: !Is_header_center
            ? moderateScale(0)
            : Is_left_icon
            ? moderateScale(30)
            : moderateScale(0),
        }}>
        <Text style={header_style}>{header_text}</Text>
      </View>

      {Is_right_icon ? (
        <TouchableOpacity onPress={right_onpress}>
          <Image style={right_style} source={right_icon} />
        </TouchableOpacity>
      ) : (
        <View></View>
      )}
    </View>
  );
};

export default Header;
