import {View, TextInput, TouchableOpacity, Image, Text} from 'react-native';
import React from 'react';
import {
  scale,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import {font} from '../constants/font';
const MyTextInputForPassword = ({
  mylabel,
  myicon2,
  myonchangetext,
  iconpress,
  ...props
}) => {
  return (
    <View style={{}}>
      <View
        style={{
          marginHorizontal: moderateScale(5),
          marginVertical: moderateVerticalScale(7),
        }}>
        <Text style={{fontSize: scale(font.text_font), color: 'black'}}>
          {mylabel}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          // justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TextInput
          style={{
            // borderWidth:1,
            borderWidth:1,
            flex: 1,
            borderColor: 'silver',
            fontSize: scale(font.text_font),
            paddingHorizontal: moderateScale(14),
            marginRight:0,
            paddingVertical: moderateVerticalScale(8),
            borderRadius: 10,
          }}
          onChangeText={myonchangetext}
          {...props}
        />
        
          <TouchableOpacity style={{
            position:"absolute",
            flex:1,
            paddingHorizontal:10,
            paddingVertical:15,
            right:1,

          }}
          onPress={iconpress}>
            <Image
              
              source={myicon2}
            />
          </TouchableOpacity>
      </View>
    </View>
  );
};

export default MyTextInputForPassword;
