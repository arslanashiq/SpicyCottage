import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import {font} from '../constants/font';

const SettingTouchable = ({mytext, myicon, myonpress, myicon2}) => {
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: moderateScale(10),
        paddingVertical: moderateVerticalScale(12),
      }}>
      <TouchableOpacity onPress={myonpress}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View
            style={{
              paddingHorizontal: moderateScale(10),
              justifyContent: 'flex-start',
            }}>
            <Image source={myicon} />
          </View>
          <View style={{flex: 1}}>
            <Text
              style={{
                
                color: 'black',
                fontSize: scale(font.text_font),
                fontWeight: '400',
              }}>
              {mytext}
            </Text>
          </View>
          <View style={{justifyContent: 'flex-end'}}>
            <Image source={myicon2} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SettingTouchable;
