import {View, TextInput, Text} from 'react-native';
import React from 'react';
import {
  scale,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import {font} from '../constants/font';
const MyTextInput = ({
  mylabel,
  
  
  myonchangetext,
  ...props
}) => {
  return (
    <View style={{}}>
      <View
        style={{
          marginHorizontal: moderateScale(5),
          marginVertical: moderateVerticalScale(8),
        }}>
        <Text style={{fontSize: scale(font.text_font), color: 'black'}}>
          {mylabel}
        </Text>
      </View>
      <View style={{flex: 1}}>
        <TextInput
          style={{
            borderWidth:1,
            borderColor:'lightgrey',
            fontSize: scale(font.text_font),
            paddingHorizontal: moderateScale(14),
            paddingVertical: moderateVerticalScale(8),
            borderRadius: 10,
          }}
          
          onChangeText={myonchangetext}
          {...props}
        />
      </View>
    </View>
  );
};

export default MyTextInput;
