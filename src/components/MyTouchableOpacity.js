import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  scale,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';

const MyTouchableOpacity = ({myText, myonpress, mycss, mymulticolor,...props}) => {
  return (
    <TouchableOpacity
      style={{marginHorizontal: moderateScale(30)}}
      onPress={myonpress}
      {...props}
      >
      <LinearGradient
        colors={mymulticolor}
        style={{...styles.mybtncss, ...mycss}}>
        <Text style={{fontSize: scale(14), fontWeight: '500',color:"white"}}>{myText}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default MyTouchableOpacity;

const styles = StyleSheet.create({
  mybtncss: {
    marginVertical: moderateVerticalScale(5),
    paddingVertical: moderateVerticalScale(12),
    paddingHorizontal: moderateScale(10),
    borderRadius: scale(10),
    alignItems: 'center',
  },
});
