import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';

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
